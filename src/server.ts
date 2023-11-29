import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.database_URL as string);

    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`App is listening on port http://localhost:${config.port}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

main();
