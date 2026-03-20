const mineflayer = require('mineflayer')

function createBot(){
const bot = mineflayer.createBot({
  host: 'tonserveur.aternos.me',
  username: 'AFK_Bot'
})

bot.on('spawn', () => {
  setInterval(() => {
    bot.setControlState('jump', true)
    setTimeout(() => bot.setControlState('jump', false), 500)
  }, 10000)
})

bot.on('end', () => setTimeout(createBot, 5000))
}

createBot()
