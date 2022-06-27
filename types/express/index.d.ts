declare namespace Express {
  interface User {
    sub: string;
    provider: string;
    username: string;
  }
}
