import app from './app';
import http from 'http';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
