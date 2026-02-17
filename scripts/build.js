const { spawnSync } = require('node:child_process')

delete process.env.__NEXT_PRIVATE_STANDALONE_CONFIG

const nextBin = require.resolve('next/dist/bin/next')
const result = spawnSync(process.execPath, [nextBin, 'build'], {
  stdio: 'inherit',
  env: process.env,
})

if (result.error) {
  console.error(result.error)
}

process.exit(result.status ?? 1)
