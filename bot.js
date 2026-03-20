const mineflayer = require('mineflayer')

function createBot() {
    const bot = mineflayer.createBot({
        host: 'bot-minecraft',
        port: 24217,
        username: 'Flora_Bot',
        auth: 'offline', // Très important pour Aternos
        version: '1.21.10' // Vérifie bien que ton serveur est dans cette version
    })

    bot.on('spawn', () => {
        console.log("Connecté au serveur ! Le bot commence à sauter.");
        setInterval(() => {
            bot.setControlState('jump', true)
            setTimeout(() => bot.setControlState('jump', false), 500)
        }, 10000)
    })

    // Ces lignes vont t'aider à débugger sur Railway si ça crash encore
    bot.on('error', (err) => console.log('Erreur détectée :', err))
    bot.on('kicked', (reason) => console.log('Bot expulsé pour :', reason))

    bot.on('end', () => {
        console.log("Connexion perdue. Reconnexion dans 5 secondes...")
        setTimeout(createBot, 5000)
    })
}

createBot()
