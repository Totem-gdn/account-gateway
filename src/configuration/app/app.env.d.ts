declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    BASE_URL: string;
    REDIS_STORAGE_URI: string;
  }
}
