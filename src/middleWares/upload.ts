import fs from 'fs';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { checkBody } from '../services/error.service';
import * as fileService from '../services/file.service';

const storage = multer.diskStorage({
  destination: (req, file, next) => {
    fs.mkdir('files/', (err) => {
      next(null, 'files/')
    });

  },
  filename: (req, fileFromReq, next) => {
    const taskId = req.body.taskId
    const { originalname } = fileFromReq;
    next(null, `${taskId}-${originalname}`);
  }
})



export const upload = multer({
  storage: storage,
  fileFilter: async (req, fileFromReq, next) => {
    if (fileFromReq.mimetype == 'image/png' || fileFromReq.mimetype == 'image/jpeg') {
      const taskId = req.body.taskId;
      const name = fileFromReq.originalname;
      const existFile = await fileService.findOneFile({ taskId, name });
      if (existFile) {
        req.params.error = "File already exist";
        next(null, false);
      }

      next(null, true)
    } else {
      req.params.error = "Incorrect file extension";
      next(null, false);
    }

  }
})