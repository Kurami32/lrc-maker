import { describe, it, expect, afterAll } from 'vitest';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const outDir = mkdtempSync(path.join(tmpdir(), 'lrc-maker-build-test-'));

afterAll(() => {
  rmSync(outDir, { recursive: true, force: true });
});

describe('prod build', () => {
  it('builds successfully', () => {
    expect(() =>
      execFileSync(
        'npx',
        ['vite', 'build', '--outDir', outDir, '--emptyOutDir', '--logLevel', 'silent'],
        { cwd: projectRoot, stdio: 'pipe' },
      ),
    ).not.toThrow();
  }, 120_000);
});
