/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_CMS_BASE_URL: string;
  readonly VITE_DD_CLIENT_TOKEN: string;
  readonly VITE_DD_ENV: string;
  readonly VITE_DD_SAMPLE_RATE: number;
  readonly VITE_DD_REPLAY_SAMPLE_RATE: number;
  readonly VITE_GTM_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  dataLayer: unknown[];
}
