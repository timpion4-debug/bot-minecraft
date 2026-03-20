const mineflayer = require('mineflayer')

function createBot() {
    const bot = mineflayer.createBot({
        host: 'Floralya.aternos.me', // À CHANGER : Ex: neptune.aternos.host
        port: 24217,                         // À CHANGER : Le port à 5 chiffres
        username: 'Flora_Bot',
        version: '1.21.10',                   // À vérifier selon ton serveur
        auth: 'offline'
    })

    bot.on('spawn', () => {
        console.log("Connecté avec succès ! Le bot est dans la partie.")
        // Anti-AFK : Saute toutes les 10 secondes
        setInterval(() => {
            bot.setControlState('jump', true)
            setTimeout(() => bot.setControlState('jump', false), 500)
        }, 10000)
    })

    bot.on('error', (err) => {
        console.log("Erreur de connexion :", err.message)
    })

    bot.on('kicked', (reason) => {
        console.log("Expulsé du serveur :", reason)
    })

    bot.on('end', () => {
        console.log("Déconnecté. Tentative de reconnexion dans 5 secondes...")
        setTimeout(createBot, 5000)
    })
}

createBot()
