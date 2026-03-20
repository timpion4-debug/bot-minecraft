const mineflayer = require('mineflayer')

function createBot() {
    const bot = mineflayer.createBot({
        host: 'Floralya.aternos.me', 
        port: 24217,                         
        username: 'Flora_Bot',
        version: '1.21.10',                   
        auth: 'offline'
    })

    bot.on('spawn', () => {
        console.log("Le bot a spawn. Tentative de login...")
        
        // On attend 500ms pour être sûr que le chat est prêt
        setTimeout(() => {
            bot.chat('/login 123')
            console.log("Commande /login envoyée.")
        }, 500)

        // Ton système Anti-AFK (saut)
        setInterval(() => {
            bot.setControlState('jump', true)
            setTimeout(() => bot.setControlState('jump', false), 500)
        }, 10000)
    })

    bot.on('error', (err) => console.log("Erreur :", err.message))
    bot.on('kicked', (reason) => console.log("Kické :", reason))
    bot.on('end', () => {
        console.log("Déconnecté. Reconnexion...");
        setTimeout(createBot, 5000)
    })
}

createBot()
