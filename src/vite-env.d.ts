/// <reference types="vite/client" />

type ViteBooleanString = 'true' | 'false';

declare interface ImportMetaEnv {
  readonly VITE_DEMO_MODE?: ViteBooleanString;
  readonly VITE_API_BASE_URL?: string;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
