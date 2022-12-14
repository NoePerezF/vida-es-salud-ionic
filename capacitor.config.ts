import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'vida-es-salud-i',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    androidScheme: "http",
    allowNavigation: ["http://tt-server.ddns.net:8081"],
    cleartext: true,
  },
};

export default config;
