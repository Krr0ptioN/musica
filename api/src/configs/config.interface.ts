import { BackendConfig } from './backend.interface';
import { CorsConfig } from './cors.interface';
import { SwaggerConfig } from './swagger.interface';
import { SecurityConfig } from './security.interface';
import { HelmetConfig } from './helmet.interface';
import { AdminConfig } from './admin.interface';

export interface Config {
  backend: BackendConfig;
  cors: CorsConfig;
  swagger: SwaggerConfig;
  security: SecurityConfig;
  helmet: HelmetConfig;
  admin: AdminConfig;
}
