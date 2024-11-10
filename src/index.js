import https from 'https';
import fs from 'fs';
import app from './app.js';
import { connectDB } from './db.js';

connectDB();

const httpsOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/api.asesoratec.click/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/api.asesoratec.click/fullchain.pem')
};

const HTTPS_PORT = 443;

https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
    console.log(`Servidor HTTPS en ejecución en el puerto ${HTTPS_PORT}`);
});

import express from 'express';
const httpApp = express();
httpApp.use((req, res) => {
    res.redirect(`https://${req.headers.host}${req.url}`);
});
const HTTP_PORT = 80;
httpApp.listen(HTTP_PORT, () => {
    console.log(`Redirigiendo tráfico HTTP a HTTPS en el puerto ${HTTP_PORT}`);
});