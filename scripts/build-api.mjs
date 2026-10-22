import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

const entries = [
  { in: 'api_src/auth/teacher.ts', out: 'api/auth/teacher.js' },
  { in: 'api_src/bank.ts', out: 'api/bank.js' },
  { in: 'api_src/classes.ts', out: 'api/classes.js' },
  { in: 'api_src/config.ts', out: 'api/config.js' },
  { in: 'api_src/exam/start.ts', out: 'api/exam/start.js' },
  { in: 'api_src/exam/submit.ts', out: 'api/exam/submit.js' },
  { in: 'api_src/health.ts', out: 'api/health.js' },
  { in: 'api_src/submissions.ts', out: 'api/submissions.js' },
  { in: 'api_src/teachers.ts', out: 'api/teachers.js' }
];

async function build() {
  console.log('🚀 Bundling Vercel Serverless Functions with esbuild...');

  // Ensure target directories exist
  fs.mkdirSync('api/auth', { recursive: true });
  fs.mkdirSync('api/exam', { recursive: true });

  for (const entry of entries) {
    if (!fs.existsSync(entry.in)) {
      console.warn(`⚠️ Source file ${entry.in} does not exist, skipping.`);
      continue;
    }

    await esbuild.build({
      entryPoints: [entry.in],
      outfile: entry.out,
      bundle: true,
      platform: 'node',
      target: 'node18',
      format: 'esm',
      packages: 'external',
      banner: {
        js: '// Pre-bundled Vercel Serverless Function (AntiCheatExamPro)\n'
      }
    });
    console.log(`✅ Bundled: ${entry.in} -> ${entry.out}`);
  }

  // Remove raw .ts files from api/ so Vercel only sees bundled .js serverless functions
  function cleanTsFiles(dir) {
    if (!fs.existsSync(dir)) return;
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        cleanTsFiles(fullPath);
      } else if (item.name.endsWith('.ts')) {
        fs.unlinkSync(fullPath);
      }
    }
  }

  cleanTsFiles('api');
  console.log('✨ Vercel Serverless Functions build complete! All endpoints ready in /api as standalone ESM.');
}

build().catch((err) => {
  console.error('❌ Failed to build API functions:', err);
  process.exit(1);
});
