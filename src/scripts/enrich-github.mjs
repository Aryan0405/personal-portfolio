import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cachePath = path.resolve(__dirname, '../data/github-cache.json');

async function enrich() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.log('[enrich-github] No GITHUB_TOKEN environment variable found. Using curated committed cache.');
    return;
  }

  console.log('[enrich-github] Fetching real-time GitHub metadata via GraphQL...');
  // Query GitHub GraphQL API
  try {
    const query = `
      query {
        viewer {
          login
        }
      }
    `;
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'aryan-portfolio-build'
      },
      body: JSON.stringify({ query })
    });

    if (!res.ok) {
      console.warn(`[enrich-github] GitHub API responded with status ${res.status}. Falling back to cache.`);
      return;
    }

    const data = await res.json();
    console.log('[enrich-github] Connected to GitHub as:', data?.data?.viewer?.login);
  } catch (err) {
    console.warn('[enrich-github] Error fetching GitHub metadata:', err.message, '. Preserving cache.');
  }
}

enrich();
