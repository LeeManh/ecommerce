import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRES_IN: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.string(),
  SECRET_API_KEY: z.string(),
  OTP_EXPIRES_IN: z.string(),
  RESEND_API_KEY: z.string(),
});

class EnvConfig {
  private static instance: EnvConfig;
  public readonly config: z.infer<typeof envSchema>;

  private constructor() {
    this.loadEnvFile();
    this.config = this.validateEnv(process.env);
  }

  private loadEnvFile(): void {
    config({ path: '.env' });
    if (!fs.existsSync(path.resolve('.env'))) {
      console.error('File not found: .env');
      process.exit(1);
    }
  }

  private validateEnv(env: NodeJS.ProcessEnv): z.infer<typeof envSchema> {
    const result = envSchema.safeParse(env);
    if (!result.success) {
      console.error('The declared values in the .env file are invalid:');
      result.error.errors.forEach((err) => {
        console.error(`${err.path.join('.')}: ${err.message}`);
      });
      process.exit(1);
    }
    return result.data;
  }

  public static getInstance(): EnvConfig {
    if (!EnvConfig.instance) {
      EnvConfig.instance = new EnvConfig();
    }
    return EnvConfig.instance;
  }
}

const envConfig = EnvConfig.getInstance().config;

export default envConfig;
