import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
//import contactsRouter from './routers/contacts.js';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';



export const setupServer = () => {

  const PORT = Number(getEnvVar('PORT', '5000'));
  const app = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(
    express.json({
    type: ['application/json', 'application/vnd.api+json'],
    limit: '100kb',
    }),
  );

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

// Додаємо форматування JSON-виводу з відступами
app.set('json spaces', 2);
  
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // Головний маршрут
  app.get('/', (req, res) => {
      res.json({ message: 'Hello world!' });
    });
  
  //app.use(contactsRouter);
  app.use(router);
  
 
  
  // Обробник помилок
  app.use(notFoundHandler);
  app.use(errorHandler);
  
  
  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  

};