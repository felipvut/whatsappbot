const  { Client }  = require('whatsapp-web.js');
import express from "express";
import cors from 'cors';

const  qrcode  = require('qrcode-terminal');
const port= 3000

const app = express()
require('dotenv').config()

const client = new Client();
app.listen(port, () => {
    console.log("Server is running in port " + port)
    runWhatsappBot()
})

function runWhatsappBot() {
    client.on('qr', (qr) => {
        qrcode.generate(qr, {small: true});
    });

    client.on('ready', () => {
        console.log('Client is ready!');
    });

    client.on('message', msg => {
        const channelId = process.env.ChannelID
        if(msg != channelId) {
            client.sendMessage(channelId, msg.body)
        }
    });

    client.initialize();
}

app.use(cors())

app.use(express.json())