const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "info",
    version: "1.0.0",
    author: "ARIYANX404",
    countDown: 20,
    role: 0,
    shortDescription: "Bot and owner information",
    longDescription: "Shows bot info, uptime and owner details.",
    category: "owner",
    guide: {}
  },

  onStart: async function ({ message }) {
    const ownerName = "ARIYANX404";
    const github = "https://github.com/ariyanx404/rem-x-st";

    const now = moment().tz("Asia/Dhaka");
    const date = now.format("MMMM Do YYYY");
    const time = now.format("h:mm:ss A");

    const uptime = process.uptime();
    const s = Math.floor(uptime % 60);
    const m = Math.floor((uptime / 60) % 60);
    const h = Math.floor((uptime / 3600) % 24);
    const d = Math.floor(uptime / 86400);

    return message.reply(
`╔═《✨ REM X ST BOT ✨》═╗

⬓ 🤖 Bot Name : 『 ${global.GoatBot.config.nickNameBot} 』
⬓ ☄️ Prefix   : 『 ${global.GoatBot.config.prefix} 』
⬓ ⚡ Uptime   : 『 ${d}d ${h}h ${m}m ${s}s 』
⬓ 🗓️ Date     : 『 ${date} 』
⬓ ⏰ Time     : 『 ${time} 』

⬓ 👑 Owner    : 『 ${ownerName} 』
⬓ 🌐 GitHub   : 『 ${github} 』

Credits:• Sheikh Tamim (ST-BOT)
╚═══════════════════╝`
    );
  },

  onChat: async function ({ event, message }) {
    if (event.body && event.body.toLowerCase() === "info")
      this.onStart({ message });
  }
};
