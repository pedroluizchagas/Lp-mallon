// eslint-disable-next-line @typescript-eslint/no-require-imports
const mallevoPreset = require('@mallevo/config-tailwind')
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  presets: [mallevoPreset],
}

export default config
