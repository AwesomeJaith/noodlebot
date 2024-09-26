const { Events, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  name: Events.MessageUpdate,
  async execute(oldMessage, newMessage) {
    const dumpChannelId = "1288746613203931137";
    const diffLogChannelId = "1288702256895623211";

    if (oldMessage.author.bot || oldMessage.content === newMessage.content) {
      return;
    }

    try {
      const message1 = oldMessage.content;
      const message2 = newMessage.content;

      const data = {
        beforeText: message1,
        afterText: message2,
      };

      const url = `http://localhost:3000/difference`;
      const response = await axios.post(url, data);

      const { imageId, imageUrl } = response.data;

      console.log("Image Id:", imageId);

      const attachment = new AttachmentBuilder(imageUrl, {
        name: `${imageId}.png`,
      });

      const dumpChannel = await newMessage.guild.channels.fetch(dumpChannelId);
      const sentMessage = await dumpChannel.send({
        files: [attachment],
      });

      const discordImageUrl = sentMessage.attachments.first().url;

      const oldMessageLink = `https://discord.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id}`;

      const diffEmbed = new EmbedBuilder()
        .setAuthor({
          name: oldMessage.author.username,
          iconURL: oldMessage.author.displayAvatarURL(),
        })
        .setColor("ffd166")
        .setTitle(`Message Edited in ${oldMessageLink}`)
        .setImage(discordImageUrl)
        .addFields(
          { name: "Before", value: message1, inline: true },
          { name: "After", value: message2, inline: true }
        )
        .setTimestamp();

      const diffLogChannel =
        await newMessage.guild.channels.fetch(diffLogChannelId);
      await diffLogChannel.send({ embeds: [diffEmbed] });

      const deleteUrl = `http://localhost:3000/images/${imageId}`;
      await axios.delete(deleteUrl);
    } catch (error) {
      console.error("Error sending image or creating embed:", error);
    }
  },
};
