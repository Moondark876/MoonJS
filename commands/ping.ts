import DiscordJS, { Message } from 'discord.js'

export default {
    callback: (message: Message, ...args: string[]) => {
        let embed = new DiscordJS.MessageEmbed()
            .setTitle("🏓 Pong! 🏓")
            .setColor('AQUA')
            .addField("Latency", '`' + (Date.now() - message.createdTimestamp).toString() + 'ms`')
            message.channel.send({embeds: [embed]})
    }
}
