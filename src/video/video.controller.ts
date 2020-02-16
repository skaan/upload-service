import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { videoFileFilter, editFileName } from '../utils/file-uploading.utils';

@Controller('video')
export class VideoController {
  @Post()
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: './files/videos',
        filename: editFileName
      }),
      fileFilter: videoFileFilter
    })
  )
  async uploadedImage(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename
    };
    return response;
  }

  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('video', 20, {
      storage: diskStorage({
        destination: './files/videos',
        filename: editFileName
      }),
      fileFilter: videoFileFilter
    })
  )
  async uploadMultipleImages(@UploadedFiles() files) {
    const response = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename
      };
      response.push(fileReponse);
    });
    return response;
  }
}
