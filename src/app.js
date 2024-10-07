import express from 'express';
import { createServer } from 'http';
import dotenv from 'dotenv';
import initSocket from './init/socket.js';
import { loadGameAssets } from './init/assets.js';
import { createClient } from 'redis';

dotenv.config();

// Redis 연결==================
const redisClient = createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
  legacyMode: true,
});
redisClient.on('connect', () => {
  console.info('Redis connected!');
});
redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});
redisClient.connect().then(() => {
  console.log('Redis v4 연결 성공');
});
const redisCli = redisClient;
// ==========================
const app = express();
const sever = createServer(app);

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
// assets폴더가 public이 아닌 루트파일에 있을 시 express 설정
app.use('/assets', express.static('assets'));
initSocket(sever);

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

sever.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    const assets = await loadGameAssets();
    console.log(assets, 'Assets loaded Successfully');
  } catch (err) {
    console.log(err.message);
  }
});
