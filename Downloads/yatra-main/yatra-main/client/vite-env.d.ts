/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_FIREBASE_APP_ID: string
  readonly VITE_FIREBASE_PROJECT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}