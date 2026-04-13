import 'dotenv/config';
export declare const env: {
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    DATABASE_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    LOG_LEVEL: "error" | "fatal" | "warn" | "info" | "debug" | "trace";
};
