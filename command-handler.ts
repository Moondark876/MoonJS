import { Client } from 'discord.js'
import fs from 'fs'
import getFiles from './get-files'

export default (client: Client) => {
    const commands = {} as {
        [key: string]: any
    }
    
    const suffix = '.ts'
    const commandFiles = getFiles('./commands', suffix)

    for (const command of commandFiles) {
        let commandFile = require(command)
        if (commandFile.default) commandFile = commandFile.default

        const split = command.replace(/\\/g, '/').split('/')
        const commandName = split[split.length - 1].replace(suffix, '')
        commands[commandName.toLowerCase()] = commandFile
    }

    client.on('messageCreate', (message) => {
        if (message.author.bot || !message.content.startsWith(';')) {
            return
        }
    
        const args = message.content.slice(1).split(/ +/)
        const commandName = args.shift()!.toLowerCase()
    
        if (!commands[commandName]) {
            return
        }

        try {
            commands[commandName].callback(message, ...args)
        } catch (error) {
            console.error(error)
        }
    }) 
}
    //     else if (message.content === ";ping") {
    //         let embed = new DiscordJS.MessageEmbed()
    //         .setTitle("🏓 Pong! 🏓")
    //         .setColor('AQUA')
    //         .addField("Latency", '`' + (Date.now() - message.createdTimestamp).toString() + 'ms`')
    //         let msg = message.channel.send({embeds: [embed]})
    //     }
    //     else if (message.content === ";invite") {
    //         let embed = new DiscordJS.MessageEmbed()
    //     .setTitle("Invite Link")
    //     .setURL("https://discord.com/api/oauth2/authorize?client_id=946797787004149831&permissions=8&scope=bot")
    //     .setColor('AQUA')
    //     .setDescription("https://discord.com/api/oauth2/authorize?client_id=946797787004149831&permissions=8&scope=bot")
    //         message.channel.send({embeds: [embed]})
    //     }