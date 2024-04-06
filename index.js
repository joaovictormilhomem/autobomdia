import cron from 'node-cron';
import qrcode from 'qrcode-terminal';
import whatsapp from 'whatsapp-web.js';
import { getTranslatedFact } from './facts.js';
import { getTodayMessage } from './messages.js';
import { getWeatherMessage } from './weather.js';
import dotenv from 'dotenv'; dotenv.config();

console.log('Iniciando o bot...')

const { Client, LocalAuth } = whatsapp;
const remotePath = 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html';
const client = new Client({
  authStrategy: new LocalAuth({ dataPath: "sessions", }),
  webVersionCache: { type: 'remote', remotePath }
});

async function send(text) {
  const chatId = process.env.RECEIVER_NUMBER + '@c.us';
  const selectedChat = await client.getChatById(chatId);
  if (!selectedChat) console.log('Chat não encontrado!');
  selectedChat.sendMessage(text);
};

async function getMessageAndSendNow() {
  const message = getTodayMessage();
  const fact = await getTranslatedFact();
  const weather = await getWeatherMessage();
  send(`Curiosidade do dia: ${fact} \n\n ${weather} \n\n ${message}`);
}

client.on('ready', async () => {
  console.log('Client is ready!');
  cron.schedule('0 6 * * *', async () => {
    const message = getTodayMessage();
    const fact = await getTranslatedFact();
    const weather = await getWeatherMessage();
    send(`Curiosidade do dia: ${fact} \n\n ${weather} \n\n ${message}`);
  })
});

client.on('message_create', (msg) => {
  if (msg.body === '!testapi')
    msg.reply('ok')
  if (msg.body === '!sendnow5530')
    getMessageAndSendNow()
})

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.initialize();