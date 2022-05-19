declare namespace NodeJS {
  export interface ProcessEnv {
    SESSION_SECRET: string;
    JWT_SECRET: string;
  }
}
