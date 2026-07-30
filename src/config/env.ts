function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const env = {
  FIREBASE_PROJECT_ID: getEnv("FIREBASE_PROJECT_ID"),
  FIREBASE_CLIENT_EMAIL: getEnv("FIREBASE_CLIENT_EMAIL"),
  FIREBASE_PRIVATE_KEY: getEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n"),
  DATABASE_URL: getEnv("DATABASE_URL"),
  PORT: Number(process.env.PORT ?? 4001),
};