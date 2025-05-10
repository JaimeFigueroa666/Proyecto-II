const PUBLIC_VAPID_KEY = "BGD4pr49QBxBPgQsZECnjeyHsa3GifYRh049IH-sf4wnkjSIz6sXrEvMDk8azZ7gPjsMF2r49bYPvh42rihxSf4";

const subscription = async () => {
    try {
        console.log("Registrando Service Worker...");
        const register = await navigator.serviceWorker.register("/worker.js", {
            scope: "/"
        });
        console.log("Service Worker registrado com sucesso!");

        // Listen Push Notifications
        console.log("Solicitando permissão para Push Notifications...");
        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
        });

        console.log("Inscrição realizada:", subscription);

        // Enviar assinatura para o servidor
        const response = await fetch("/subscription", {
            method: "POST",
            body: JSON.stringify(subscription),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await response.json();
        console.log("Resposta do servidor:", result);
    } catch (error) {
        console.error("Erro ao registrar push notification:", error);
    }
};

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// Lógica para envio de mensagens (verificar se a rota no servidor existe)
const form = document.querySelector("#myform");
const message = document.querySelector("#message");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("/send-notification", { // Alterei de "/new-message" para "/send-notification"
            method: "POST",
            body: JSON.stringify({ message: message.value }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await response.json();
        console.log("Mensagem enviada:", result);
    } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
    }

    form.reset();
});

// Verifica se o navegador suporta Service Workers e inicia a inscrição
if ("serviceWorker" in navigator) {
    subscription().catch(err => console.error("Erro ao iniciar inscrição:", err));
}
