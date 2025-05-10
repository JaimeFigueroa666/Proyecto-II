const express = require("express");
const webpush = require("web-push");

const router = express.Router();

// Pegando as chaves do .env
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

// Configurando o Web Push
webpush.setVapidDetails("mailto:seuemail@example.com", publicVapidKey, privateVapidKey);

// Array para armazenar assinaturas
const subscriptions = [];

// Rota para receber a inscrição do usuário e armazená-la
router.post("/subscription", (req, res) => {
    const subscription = req.body;

    // Verifica se a assinatura já foi salva
    if (!subscriptions.find(sub => JSON.stringify(sub) === JSON.stringify(subscription))) {
        subscriptions.push(subscription);
    }

    res.status(201).json({ message: "Inscrição salva com sucesso!" });
});

// Rota para enviar notificações
router.post("/send-notification", async (req, res) => {
    const payload = JSON.stringify({
        title: "Notificação de Teste",
        body: "Isso é um teste de push notification!",
        icon: "/icone.png"
    });

    for (const subscription of subscriptions) {
        try {
            await webpush.sendNotification(subscription, payload);
        } catch (error) {
            console.error("Erro ao enviar notificação:", error);
        }
    }

    res.status(200).json({ message: "Notificação enviada!" });
});

// 🔥 Agora exporta o router apenas aqui no final
module.exports = router;
