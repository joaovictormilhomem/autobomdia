import cron from 'node-cron';
import qrcode from 'qrcode-terminal';
import whatsapp from 'whatsapp-web.js';
import { getTranslatedFact } from './facts.js';
import { getTodayMessage } from './messages.js';
import { getWeatherMessage } from './weather.js';
import dotenv from 'dotenv'; dotenv.config();

console.log('Iniciando o bot...')

const { Client, LocalAuth } = whatsapp;
// const remotePath = 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html';
const client = new Client({
  authStrategy: new LocalAuth({ dataPath: "sessions", }),
  // restartOnAuthFail: true,
  // webVersionCache: { type: 'remote', remotePath }
});

async function send(text, number) {
  console.log('Enviando mensagem para ' + number)
  const chatId = (number) + '@c.us';
  const selectedChat = await client.getChatById(chatId);
  if (!selectedChat) console.log('Chat não encontrado!');
  selectedChat.sendMessage(text);
};

async function getMessageAndSendNow() {
  console.log('Preparando mensagem de bom dia')
  const message = getTodayMessage();
  const fact = await getTranslatedFact();
  const weather = await getWeatherMessage();
  send(`Curiosidade do dia: ${fact} \n\n ${weather} \n\n ${message}`, process.env.RECEIVER_NUMBER);
}

async function getMessageAndSendNowForMe() {
  console.log('Preparando mensagem de bom dia pra teste')
  const message = getTodayMessage();
  const fact = await getTranslatedFact();
  const weather = await getWeatherMessage();
  send(`Curiosidade do dia: ${fact} \n\n ${weather} \n\n ${message}`, process.env.MY_NUMBER);
}

client.on('ready', async () => {
  console.log('Client is ready');
  cron.schedule('0 6 * * *', async () => {
    console.log('Mensagem automática de bom dia acionada')
    getMessageAndSendNow()
  })
});

client.on('message_create', async (msg) => {
  if (msg.body === '!sendnowforher') {
    console.log('Mensagem de envio imediato recebida')
    getMessageAndSendNow()
  }
  if (msg.body === '!sendnowforme') {
    console.log('Mensagem de envio imediato para o meu número recebida')
    getMessageAndSendNowForMe()
  }
  if (msg.body === '!testapistatus') {
    console.log('Mensagem de teste recebida')
    msg.reply('ok')
  }
  if (msg.body === '!testapiweather') {
    console.log('Mensagem de teste da api de clima recebida')
    const weather = await getWeatherMessage();
    send(weather, process.env.MY_NUMBER)
  }
  if (msg.body === '!testapifacts') {
    console.log('Mensagem de teste da api de clima recebida')
    const fact = await getTranslatedFact();
    send(fact, process.env.MY_NUMBER)
  }
  if (msg.body === '!help') {
    const descriptionOfCommands = [
      '!sendnowforher: Envia mensagem de bom dia para o número de destino.\n',
      '!sendnowforme: Envia mensagem de bom dia para mim.\n',
      '!testapistatus: Verifica se a API está respondendo.\n',
      '!testapiweather: Envia mensagem de clima atual.\n',
      '!testapifacts: Envia mensagem de fato aleatório.\n'
    ]
    send(descriptionOfCommands.join(''), process.env.MY_NUMBER)
  }
})

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.initialize();