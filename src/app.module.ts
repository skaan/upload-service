import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ImageModule } from './image/image.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
    ImageModule,
    VideoModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
