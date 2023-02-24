import mongoose from 'mongoose';
import { PORT } from './constants';
import * as dotenv from 'dotenv';
dotenv.config()

import * as serverService from './services/server.service';

const { DB_USERNAME, DB_PASSWORD, CLUSTER_URL } = process.env;

(async () => {
  try {
    await mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${CLUSTER_URL}`);
    serverService.server.listen(process.env.PORT || PORT, function () {
      console.log('Сервер ожидает подключения...');
    })
  } catch (error) {
    console.log(error);
  }
})();



process.on('SIGINT', async () => {
  await mongoose.disconnect();
  process.exit();
});
