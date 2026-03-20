function createBot() {
    const bot = mineflayer.createBot({
        host: 'Floralya.aternos.me', // Juste l'adresse ici
        port: 24217,                // Le port va sur sa propre ligne
        username: 'Flora_Bot',
        version: '1.20.1',          // Il est fortement conseillé de préciser la version du serveur
        auth: 'offline'             // Doit être à l'intérieur des accolades
    })

    bot.on('spawn', () => {
        console.log("Le bot est connecté !");
        setInterval(() => {
            bot.setControlState('jump', true)
            setTimeout(() => bot.setControlState('jump', false), 500)
        }, 10000)
    })

    // Gestion d'erreur pour voir pourquoi ça plante
    bot.on('error', (err) => console.log('Erreur :', err));
    bot.on('kicked', (reason) => console.log('Kické pour :', reason));

    bot.on('end', () => {
        console.log("Déconnecté, tentative de reconnexion...");
        setTimeout(createBot, 5000);
    })
}
