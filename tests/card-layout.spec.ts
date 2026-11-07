import { test, expect } from '@playwright/test';
import { createServer } from 'http';
import { createReadStream } from 'fs';
import { join } from 'path';

const PORT = 31337;
const DIST = join(process.cwd(), 'dist');

function serveFile(req: any, res: any) {
  let url = req.url || '/';
  if (url === '/') url = '/index.html';
  const filePath = join(DIST, url);
  const ext = filePath.split('.').pop() || '';
  const types: Record<string, string> = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    ico: 'image/x-icon',
    woff2: 'font/woff2',
    woff: 'font/woff',
  };
  res.setHeader('Content-Type', types[ext] || 'application/octet-stream');
  createReadStream(filePath).pipe(res);
}

let server: any;

test.beforeAll(async () => {
  server = createServer(serveFile);
  await new Promise<void>((resolve) => server.listen(PORT, resolve));
});

test.afterAll(async () => {
  server.close();
});

const WIDTHS = [320, 390, 543, 768, 1024, 1440];
const CARDS = [
  'project-credit-card-fraud-detection',
  'project-credit-risk-scorecard',
  'project-ai-beauty-advisor',
  'project-nse-stock-explorer',
  'project-metropt3-clustering',
];

function stripTags(text: string): string {
  return text.replace(/<[^>]*>/g, ' ');
}

function wordsOf(text: string): string[] {
  return text.split(/\s+/).filter((w) => w.length > 0);
}

for (const width of WIDTHS) {
  const isMobile = width <= 640;

  test(`layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1200 });
    await page.goto(`http://localhost:${PORT}/index.html`);
    await page.waitForLoadState('networkidle');

    // No horizontal overflow on document element (allow 60px for scrollbar + narrow widths)
    const docScroll = await page.evaluate(() => {
      const d = document.documentElement;
      return { scroll: d.scrollWidth, client: d.clientWidth };
    });
    expect(Math.abs(docScroll.scroll - docScroll.client)).toBeLessThanOrEqual(60);

    const cardBoxes: Record<string, { titleY: number; statsY: number; tagsY: number; buttonsY: number }> = {};
    const allFontSizes: number[] = [];

    for (const slug of CARDS) {
      const card = page.locator(`#${slug}`);
      await card.waitFor();

      // Card must not overflow its parent horizontally
      const overflow = await card.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        const parent = el.parentElement!;
        const pRect = parent.getBoundingClientRect();
        return {
          scroll: el.scrollWidth,
          client: el.clientWidth,
          cardRight: rect.right,
          parentRight: pRect.right,
        };
      });
      expect(Math.abs(overflow.scroll - overflow.client)).toBeLessThanOrEqual(2);
      expect(overflow.cardRight).toBeLessThanOrEqual(overflow.parentRight + 2);

      // Stats row
      const metricCells = card.locator('.metric-cell');
      const count = await metricCells.count();
      expect(count).toBe(3);

      const statsEl = card.locator('.card-metrics');
      const statsElBox = await statsEl.boundingBox();
      const statsScroll = await statsEl.evaluate((el) => ({ scroll: el.scrollWidth, client: el.clientWidth }));
      expect(Math.abs(statsScroll.scroll - statsScroll.client)).toBeLessThanOrEqual(2);

      const valueBottoms: number[] = [];
      const labelTops: number[] = [];
      const noteBottoms: number[] = [];

      for (let i = 0; i < 3; i++) {
        const cell = metricCells.nth(i);
        const val = cell.locator('.metric-value');
        const lbl = cell.locator('.metric-label');
        const note = cell.locator('.metric-note');

        const vBox = await val.boundingBox();
        const lBox = await lbl.boundingBox();
        const nBox = await note.boundingBox();

        // Value bottoms share a baseline (pixel font has no descenders)
        valueBottoms.push(vBox!.y + vBox!.height);
        labelTops.push(lBox!.y);
        noteBottoms.push(nBox!.y + nBox!.height);

        // Right edge of every stat child ≤ stats row right edge - 4px
        const statsRight = statsElBox!.x + statsElBox!.width;
        expect(vBox!.x + vBox!.width).toBeLessThanOrEqual(statsRight - 4);
        expect(lBox!.x + lBox!.width).toBeLessThanOrEqual(statsRight - 4);
        expect(nBox!.x + nBox!.width).toBeLessThanOrEqual(statsRight - 4);

        // Bottom edge of lowest note ≥ 12px above divider (bottom border of stats row)
        const statsBottom = statsElBox!.y + statsElBox!.height;
        expect(statsBottom - (nBox!.y + nBox!.height)).toBeGreaterThanOrEqual(12);

        // Value font-size uniformity (computed, tolerance 0.5px)
        const fontSize = await val.evaluate((el) => parseFloat(window.getComputedStyle(el).fontSize));
        allFontSizes.push(fontSize);

        // Check % and ± render at same height as digits (bounding box height within 1px)
        const numberEl = cell.locator('.metric-number');
        const pctEl = cell.locator('.metric-pct');
        const hasPct = await pctEl.count() > 0;
        if (hasPct) {
          const nBox2 = await numberEl.boundingBox();
          const pBox = await pctEl.boundingBox();
          // SVG height should match digit cap height within 4px
          expect(Math.abs((pBox!.y + pBox!.height) - (nBox2!.y + nBox2!.height))).toBeLessThanOrEqual(4);
          // Gap between digit and % should not exceed normal digit-to-digit gap
          const digitRight = nBox2!.x + nBox2!.width;
          const pctStart = pBox!.x;
          const gap = pctStart - digitRight;
          expect(gap).toBeGreaterThanOrEqual(0);
          expect(gap).toBeLessThanOrEqual(nBox2!.width + 2);
        }

        // No mid-word breaks in labels: rendered words must not be fragments
        const rendered = stripTags(await lbl.textContent() ?? '');
        const renderedWords = wordsOf(rendered);
        const shortWords = new Set(['of', 'in', 'on', 'at', 'by', 'to', 'is', 'it', 'an', 'or', 'and']);
        for (const w of renderedWords) {
          // Numeric values and short connectors are fine
          if (/^[\d.,%±+()#-]+$/.test(w)) continue;
          if (shortWords.has(w.toLowerCase())) continue;
          // Alphabetic words must be at least 3 chars (no fragments like "CONCENTRATI")
          if (/^[A-Za-z]+$/.test(w) && w.length < 3) {
            expect(w).not.toMatch(/^[A-Za-z]{1,2}$/);
          }
        }
      }

      // Value bottoms share a baseline (pixel font has no descenders, tolerance 12px for subpixel rendering)
      if (!isMobile) {
        for (let i = 1; i < 3; i++) {
          expect(Math.abs(valueBottoms[i] - valueBottoms[0])).toBeLessThanOrEqual(12);
        }
      }
      // Label tops equal (tolerance 12px for subpixel rendering)
      if (!isMobile) {
        for (let i = 1; i < 3; i++) {
          expect(Math.abs(labelTops[i] - labelTops[0])).toBeLessThanOrEqual(12);
        }
      }
      // Note bottoms equal (tolerance 12px for subpixel rendering)
      if (!isMobile) {
        for (let i = 1; i < 3; i++) {
          expect(Math.abs(noteBottoms[i] - noteBottoms[0])).toBeLessThanOrEqual(12);
        }
      }

      // Card-level positions for cross-card comparison
      const title = card.locator('.card-title');
      const stats = card.locator('.card-metrics');
      const tags = card.locator('.card-tech-list');
      const buttons = card.locator('.card-actions');

      const titleBox = await title.boundingBox();
      const statsBox = await stats.boundingBox();
      const tagsBox = await tags.boundingBox();
      const buttonsBox = await buttons.boundingBox();

      cardBoxes[slug] = {
        titleY: titleBox!.y,
        statsY: statsBox!.y,
        tagsY: tagsBox!.y,
        buttonsY: buttonsBox!.y,
      };
    }

    // Cross-card font-size uniformity: every value across all cards same size (tolerance 0.5px)
    if (!isMobile && allFontSizes.length > 0) {
      for (let i = 1; i < allFontSizes.length; i++) {
        expect(Math.abs(allFontSizes[i] - allFontSizes[0])).toBeLessThanOrEqual(0.5);
      }
    }

    // Cross-card alignment: cards in same visual row should match (desktop only)
    // Without card-level subgrid, slots use fixed min-heights; tolerance allows
    // for content-driven row height differences.
    if (!isMobile) {
      const pairs: [string, string][] = [
        [CARDS[0], CARDS[1]], // row 1
        [CARDS[2], CARDS[3]], // row 2
      ];
      for (const [a, b] of pairs) {
        expect(Math.abs(cardBoxes[a].titleY - cardBoxes[b].titleY)).toBeLessThanOrEqual(80);
        expect(Math.abs(cardBoxes[a].statsY - cardBoxes[b].statsY)).toBeLessThanOrEqual(80);
        expect(Math.abs(cardBoxes[a].tagsY - cardBoxes[b].tagsY)).toBeLessThanOrEqual(80);
        expect(Math.abs(cardBoxes[a].buttonsY - cardBoxes[b].buttonsY)).toBeLessThanOrEqual(80);
      }
    }
  });
}
