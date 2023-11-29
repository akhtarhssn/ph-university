import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.database_URL as string);

    app.listen(config.port, () => {
      console.log(`App is listening on port http://localhost:${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
