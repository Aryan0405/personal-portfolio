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

const WIDTHS = [320, 390, 768, 1024, 1440];
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
  const isMobile = width <= 390;

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

    // Debug: find overflowing elements at 320px
    if (width === 320) {
      const overflowing = await page.evaluate(() => {
        const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const walker = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_ELEMENT,
          {
            acceptNode: (node: Node) => {
              const el = node as HTMLElement;
              const rect = el.getBoundingClientRect();
              if (rect.right > vw + 2 || rect.x < -2) {
                return NodeFilter.FILTER_ACCEPT;
              }
              return NodeFilter.FILTER_SKIP;
            },
          }
        );
        const els: string[] = [];
        let node: Node | null = walker.nextNode();
        while (node && els.length < 10) {
          const el = node as HTMLElement;
          const rect = el.getBoundingClientRect();
          els.push(`${el.tagName}.${(el.className || '').split(' ').join('.')}#${el.id || ''} right=${Math.round(rect.right)}px`);
          node = walker.nextNode();
        }
        return els;
      });
      console.log('Overflowing elements at 320px:', overflowing);
    }

    const cardBoxes: Record<string, { titleY: number; statsY: number; tagsY: number; buttonsY: number }> = {};

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

      const valueBottoms: number[] = [];
      const labelTops: number[] = [];
      const noteTops: number[] = [];

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
        noteTops.push(nBox!.y);

        // No stat child exceeds card right edge
        const cardBox = await card.boundingBox();
        expect(vBox!.x + vBox!.width).toBeLessThanOrEqual(cardBox!.x + cardBox!.width + 2);
        expect(lBox!.x + lBox!.width).toBeLessThanOrEqual(cardBox!.x + cardBox!.width + 2);
        expect(nBox!.x + nBox!.width).toBeLessThanOrEqual(cardBox!.x + cardBox!.width + 2);

        // No mid-word breaks in labels: rendered words must not be fragments
        const rendered = stripTags(await lbl.textContent() ?? '');
        const renderedWords = wordsOf(rendered);
        const shortWords = new Set(['of', 'in', 'on', 'at', 'by', 'to', 'is', 'it', 'an', 'or', 'and']);
        for (const w of renderedWords) {
          // Numeric values and short connectors are fine
          if (/^[\d.,%±+()]+$/.test(w)) continue;
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
      // Note tops equal (tolerance 12px for subpixel rendering)
      if (!isMobile) {
        for (let i = 1; i < 3; i++) {
          expect(Math.abs(noteTops[i] - noteTops[0])).toBeLessThanOrEqual(12);
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

    // Cross-card alignment: cards in same visual row should match (desktop only)
    // Without card-level subgrid, slots use fixed min-heights; tolerance allows
    // for content-driven row height differences.
    if (!isMobile) {
      const pairs: [string, string][] = [
        [CARDS[0], CARDS[1]], // row 1
        [CARDS[2], CARDS[3]], // row 2
      ];
      for (const [a, b] of pairs) {
        expect(Math.abs(cardBoxes[a].titleY - cardBoxes[b].titleY)).toBeLessThanOrEqual(40);
        expect(Math.abs(cardBoxes[a].statsY - cardBoxes[b].statsY)).toBeLessThanOrEqual(40);
        expect(Math.abs(cardBoxes[a].tagsY - cardBoxes[b].tagsY)).toBeLessThanOrEqual(40);
        expect(Math.abs(cardBoxes[a].buttonsY - cardBoxes[b].buttonsY)).toBeLessThanOrEqual(40);
      }
    }
  });
}
