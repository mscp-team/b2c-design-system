import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'br.com.segurosunimed.b2c',
  appName: 'B2C Design System',
  webDir: 'dist/b2c-design-system/browser',
  server: {
    androidScheme: 'https',
  },
};

export default config;
