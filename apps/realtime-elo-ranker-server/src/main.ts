import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Active les CORS pour les requêtes depuis un frontend

  const port = process.env.PORT || 8080;
  await app.listen(port);
  console.log(`🚀 Serveur en écoute sur http://localhost:${port}`);
}
bootstrap();
