import fs from 'fs';
import path from 'path';
import * as mimeTypes from 'mime-types';
import { errorLogManager } from 'database';

import { HTTP_URL, UPLOAD_FOLDER } from '../constant';

import saveFile from '../handlers/fileHandler';
import compressImage from '../handlers/photoHandler';
import compressVideo from '../handlers/videoHandler';

import type { Request, Response } from 'express';

class Controller {
  async post(req: Request, res: Response) {
    try {
      const { file, fileName, fileType } = req.body;

      if (req.ip === HTTP_URL) {
        return res.status(403).send({ message: 'Invalid access' });
      }

      const type = fileType.split('/')[0];

      switch (type) {
        case 'image': {
          compressImage(file)
            .then((name) => res.status(200).send({ message: name }))
            .catch((err) => {
              errorLogManager.addToLogs('Error uploading photo.', err);
              res.status(500).send({ message: 'Error' });
            });
          break;
        }
        case 'video': {
          compressVideo(file, fileName)
            .then((name) => res.status(200).send({ message: name }))
            .catch((err) => {
              errorLogManager.addToLogs('Error uploading video', err);
              res.status(500).send({ message: 'Error' });
            });
          break;
        }
        default: {
          saveFile(file, fileName)
            .then((name) => res.status(200).send({ message: name }))
            .catch((err) => {
              errorLogManager.addToLogs('Error uploading file', err);
              res.status(500).send({ message: 'Error' });
            });
          break;
        }
      }
    } catch (error) {
      errorLogManager.addToLogs(
        'Error in controller post',
        JSON.stringify(error),
      );
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
  async get(req: Request, res: Response) {
    try {
      const fileId = req.params.fileId;
      const filePath = path.join(UPLOAD_FOLDER, fileId);

      try {
        await new Promise((resolve, reject) => {
          fs.access(filePath, (err) => {
            if (err) reject(err);
            resolve(filePath);
          });
        });

        const contentType =
          mimeTypes.lookup(filePath) || 'application/octet-stream';

        res.setHeader('Content-Type', contentType);

        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
      } catch (error) {
        console.error('Error accessing file:', error);
        res.status(404).send('File not found');
      }
    } catch (error) {
      errorLogManager.addToLogs(
        'Error in controller get',
        JSON.stringify(error),
      );
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const { fileId } = req.params;

      const pathToFile = `${UPLOAD_FOLDER}/${fileId}`;

      if (req.ip === HTTP_URL) {
        return res.status(403).send({ message: 'Invalid access' });
      }

      try {
        fs.unlinkSync(pathToFile);
        res.status(200).send({ message: 'Success' });
      } catch (error) {
        errorLogManager.addToLogs(
          'Error in controller delete. Cant delete file',
          JSON.stringify(error),
        );
        res.status(500).send({ message: 'Delete error' });
      }
    } catch (error) {
      errorLogManager.addToLogs(
        'Error in controller delete',
        JSON.stringify(error),
      );
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
}

const controller = new Controller();

export default controller;
