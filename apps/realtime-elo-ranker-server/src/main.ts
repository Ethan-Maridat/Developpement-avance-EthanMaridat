import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Active CORS pour éviter les erreurs de requête cross-origin
  await app.listen(8080);
}
bootstrap();
