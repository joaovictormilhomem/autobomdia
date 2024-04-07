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

async function send(text, number) {
  console.log('Enviando mensagem para ' + number || process.env.RECEIVER_NUMBER)
  const chatId = (number || process.env.RECEIVER_NUMBER) + '@c.us';
  const selectedChat = await client.getChatById(chatId);
  if (!selectedChat) console.log('Chat não encontrado!');
  selectedChat.sendMessage(text);
};

async function getMessageAndSendNow() {
  console.log('Preparando mensagem de bom dia')
  const message = getTodayMessage();
  const fact = await getTranslatedFact();
  const weather = await getWeatherMessage();
  send(`Curiosidade do dia: ${fact} \n\n ${weather} \n\n ${message}`);
}

async function getMessageAndSendNowForMe() {
  console.log('Preparando mensagem de bom dia pra mim')
  const message = getTodayMessage();
  const fact = await getTranslatedFact();
  const weather = await getWeatherMessage();
  send(`Curiosidade do dia: ${fact} \n\n ${weather} \n\n ${message}`, process.env.MY_NUMBER);
}

client.on('ready', async () => {
  console.log('Client is ready');
  cron.schedule('0 6 * * *', async () => {
    console.log('Preparando mensagem de bom dia')
    const message = getTodayMessage();
    const fact = await getTranslatedFact();
    const weather = await getWeatherMessage();
    send(`Curiosidade do dia: ${fact} \n\n ${weather} \n\n ${message}`);
  })
});

client.on('message_create', (msg) => {
  if (msg.body === '!testapi') {
    console.log('Mensagem de teste recebida')
    msg.reply('ok')
  }
  if (msg.body === '!sendnow5530') {
    console.log('Mensagem de envio imediato recebida')
    getMessageAndSendNow()
  }
  if (msg.body === '!sendnowforme5530') {
    console.log('Mensagem de envio imediato para o meu número recebida')
    getMessageAndSendNowForMe()
  }
})

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.initialize();