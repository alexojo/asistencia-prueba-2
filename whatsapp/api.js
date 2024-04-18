const { response } = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');


const createSession = async(req) => {

    const client = new Client({
        authStrategy: new LocalAuth({
            dataPath: "sessions",
        }),
        webVersionCache: {
            type: 'remote',
            remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
        }});

    client.on('qr', qr => {
        qrcode.generate(qr, { small: true });
    });

    client.on('authenticated', (session) => {
        console.log('Client is ready!');
    });

    await client.initialize();

    return client;

}

module.exports = {
    createSession
}