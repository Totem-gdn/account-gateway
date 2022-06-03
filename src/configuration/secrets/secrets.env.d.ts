declare namespace NodeJS {
  export interface ProcessEnv {
    REDIS_STORAGE_URI: string;
    SESSION_SECRET: string;
    JWT_SECRET: string;
  }
}
