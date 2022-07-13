import DiscordJS, { Message } from 'discord.js'

export default {
    callback: (message: Message) => {
        let embed = new DiscordJS.MessageEmbed()
            .setTitle("Invite Link")
            .setURL("https://discord.com/api/oauth2/authorize?client_id=946797787004149831&permissions=8&scope=bot%20application.commands")
            .setColor('AQUA')
            .setDescription("https://discord.com/api/oauth2/authorize?client_id=946797787004149831&permissions=8&scope=bot%20application.commands")
        message.channel.send({embeds: [embed]})
    }
}
