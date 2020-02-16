import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { imageFileFilter, editFileName } from '../utils/file-uploading.utils';

@Controller('image')
export class ImageController {
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files/images',
        filename: editFileName
      }),
      fileFilter: imageFileFilter
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
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './files/images',
        filename: editFileName
      }),
      fileFilter: imageFileFilter
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
