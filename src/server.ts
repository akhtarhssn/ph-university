import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_URL as string);

    server = app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`App is listening on port http://localhost:${config.port}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log(
    '😈😈Unhandled rejection Detected 😈 shutting down the server...💤💤💤💤💤',
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
