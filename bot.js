const mineflayer = require('mineflayer')

function createBot() {
    const bot = mineflayer.createBot({
        host: 'Floralya.aternos.me', // À METTRE À JOUR AVEC L'IP DIRECTE (.host)
        port: 24217,                         // À METTRE À JOUR AVEC LE PORT À 5 CHIFFRES
        username: 'Flora',                   // Ton nouveau pseudo
        version: '1.21.10',
        auth: 'offline'
    })

    // 1. Actions à la connexion (Login + Saut Anti-AFK)
    bot.on('spawn', () => {
        console.log("Flora est en ligne !")
        
        setTimeout(() => {
            bot.chat('/login 1234')          // Ton nouveau mot de passe
            console.log("Login effectué avec 1234")
        }, 1500)

        // Saut pour ne pas être kické pour inactivité
        setInterval(() => {
            bot.setControlState('jump', true)
            setTimeout(() => bot.setControlState('jump', false), 500)
        }, 20000) // Un saut toutes les 20 secondes
    })

    // 2. Réactions au Chat
    bot.on('chat', (username, message) => {
        if (username === bot.username) return // Ne pas se répondre à soi-même

        const msg = message.toLowerCase()

        if (msg.includes('salut') || msg.includes('bonjour')) {
            bot.chat(`Bonjour ${username} ! Je suis Flora, prête à aider.`)
        }

        if (msg.includes('flora tu es là')) {
            bot.chat("Oui, je suis connectée et je surveille la zone !")
        }
    })

    // 3. Gestion des erreurs et relance automatique
    bot.on('error', (err) => console.log("Erreur détectée :", err.message))
    bot.on('kicked', (reason) => console.log("Bot expulsé :", reason))
    
    bot.on('end', () => {
        console.log("Connexion coupée. Tentative de retour dans 5 secondes...")
        setTimeout(createBot, 5000)
    })
}

createBot()
