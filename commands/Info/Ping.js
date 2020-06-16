module.exports = {
    name: "ping",
    category: "Info",
    description: "Returns latency and API ping",
    run: async (client, message, args) => {
        const msg = await message.channel.send(`🏓 Pinging....`);

        msg.edit(` Pong!
        Latency is ${Math.floor(msg.createdTimestap - message.createdTimestap)}ms
        API Latency is ${Math.round(client.ping)}ms`);
    }
}
