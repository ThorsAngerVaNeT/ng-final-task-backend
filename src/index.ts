import mongoose from 'mongoose';
import { CLUSTER_URL, DB_PASSWORD, DB_USERNAME, PORT } from './constants';

import * as serverService from './services/server.service';


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
