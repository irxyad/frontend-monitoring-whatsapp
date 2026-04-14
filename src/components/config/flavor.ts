type Flavor = 'development' | 'production';

interface FlavorConfig {
  flavor: Flavor;
  appName: string;
  apiBaseUrl: string;
  enableLogs: boolean;
}

const configs: Record<Flavor, FlavorConfig> = {
  development: {
    flavor: 'development',
    appName: import.meta.env.VITE_APP_NAME,
    apiBaseUrl: import.meta.env.VITE_API_URL,
    enableLogs: true,
  },
  production: {
    flavor: 'production',
    appName: import.meta.env.VITE_APP_NAME,
    apiBaseUrl: import.meta.env.VITE_API_URL,
    enableLogs: false,
  },
};

const currentFlavor = (import.meta.env.VITE_FLAVOR as Flavor) ?? 'development';
export const isModeDev = currentFlavor === 'development';
export const flavorConfig = configs[currentFlavor];
