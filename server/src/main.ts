import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', `${process.env.CLIENT_URL}`);
    next();
  });

  app.enableCors({
    origin: `${process.env.CLIENT_URL}`,
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, X-App-Token',
  });

  await app.listen(3001, () => console.log(`App started on port: 3001`));
}
bootstrap();
