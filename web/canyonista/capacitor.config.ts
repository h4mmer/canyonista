import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'guide.hammer.canyonista',
  appName: 'canyonista',
  webDir: 'dist/canyonista/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
