const mineflayer = require('mineflayer')

function createBot() {
    const bot = mineflayer.createBot({
        host: 'Floralya.aternos.me', // À METTRE À JOUR AVEC L'IP DIRECTE (.host)
        port: 24217,                         // À METTRE À JOUR AVEC LE PORT À 5 CHIFFRES
        username: 'Flora',                   
        version: '1.21.10',
        auth: 'offline'
    })

    // 1. Connexion, Login et Discrétion
    bot.on('spawn', () => {
        console.log("Flora est connectée !")
        
        setTimeout(() => {
            // Étape 1 : Se connecter
            bot.chat('/login Florabot')
            console.log("Login effectué.")

            // Étape 2 : Devenir invisible (Vanish)
            setTimeout(() => {
                bot.chat('/vanish')
                console.log("Commande /vanish envoyée pour la discrétion.")
            }, 1000)

        }, 1500)

        // Saut Anti-AFK toutes les 20 secondes
        setInterval(() => {
            bot.setControlState('jump', true)
            setTimeout(() => bot.setControlState('jump', false), 500)
        }, 20000)
    })

    // 2. Réactions au Chat
    bot.on('chat', (username, message) => {
        if (username === bot.username) return 

        const msg = message.toLowerCase()

        // Le bot ne répond que si on cite son nom pour rester discret
        if (msg.includes('flora')) {
            if (msg.includes('salut') || msg.includes('coucou')) {
                bot.chat(`Salut ${username} ! Je suis là, mais en mode discret.`)
            }
        }
    })

    // 3. Gestion des imprévus
    bot.on('error', (err) => console.log("Erreur :", err.message))
    bot.on('kicked', (reason) => console.log("Bot kické :", reason))
    
    bot.on('end', () => {
        console.log("Déconnexion. Retour dans 5 secondes...")
        setTimeout(createBot, 5000)
    })
}

createBot()
