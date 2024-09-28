const { Events, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const axios = require("axios");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
const api_port = process.env.API_PORT;
const dumpChannelId = process.env.DUMP_CHANNEL_ID;
const diffLogChannelId = process.env.DIFF_LOG_CHANNEL_ID;
console.log(api_port);

module.exports = {
  name: Events.MessageUpdate,
  async execute(oldMessage, newMessage) {
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

      const url = `http://api:${api_port}/difference`;
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

      const deleteUrl = `http://api:${api_port}/images/${imageId}`;
      await axios.delete(deleteUrl);
    } catch (error) {
      console.error("Error sending image or creating embed:", error);
    }
  },
};
