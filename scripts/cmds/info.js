const moment = require("moment-timezone");

const OWNER = {
  name: "𝐀𝐡𝐦𝐞𝐝'𝐬 𝐒𝐇𝐈𝐒𝐇𝐈𝐑",
  role: "𝐁𝐎𝐓 𝐎𝐖𝐍𝐄𝐑",
  from: "𝐒𝐢𝐫𝐚𝐣𝐠𝐚𝐧𝐣, 𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡 🇧🇩",
  status: "𝐊𝐞𝐞𝐩 𝐂𝐚𝐥𝐦 & 𝐂𝐨𝐝𝐞 𝐎𝐧",
  github: "𝐂𝐨𝐦𝐢𝐧𝐠 𝐒𝐨𝐨𝐧",
  image: "https://i.imgur.com/Boccigo.jpeg"
};

async function sendInfo({ message }) {
  const now = moment().tz("Asia/Dhaka");

  const uptime = process.uptime();
  const s = Math.floor(uptime % 60);
  const m = Math.floor((uptime / 60) % 60);
  const h = Math.floor((uptime / 3600) % 24);
  const d = Math.floor(uptime / 86400);

  const botName =
    global.GoatBot.config.nickNameBot || "𝐒𝐇𝐈𝐒𝐇𝐈𝐑 𝐁𝐎𝐓";

  const prefix =
    global.GoatBot.config.prefix || "/";

  const body = `
╭━━━━━━━━━━━━━━━━━━━━╮
       👑 𝐒𝐇𝐈𝐒𝐇𝐈𝐑 𝐁𝐎𝐓
    ✦ 𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍 ✦
╰━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 🤖 𝐁𝐎𝐓 𝐃𝐄𝐓𝐀𝐈𝐋𝐒 〕━━━╮

  ✧ 𝐁𝐨𝐭 𝐍𝐚𝐦𝐞 : ${botName}
  ✧ 𝐏𝐫𝐞𝐟𝐢𝐱   : ${prefix}
  ✧ 𝐔𝐩𝐭𝐢𝐦𝐞   : ${d}d ${h}h ${m}m ${s}s

╰━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 👑 𝐎𝐖𝐍𝐄𝐑 𝐃𝐄𝐓𝐀𝐈𝐋𝐒 〕━━╮

  ✧ 𝐍𝐚𝐦𝐞   : ${OWNER.name}
  ✧ 𝐑𝐨𝐥𝐞   : ${OWNER.role}
  ✧ 𝐅𝐫𝐨𝐦   : ${OWNER.from}
  ✧ 𝐒𝐭𝐚𝐭𝐮𝐬 : ${OWNER.status}

╰━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 🌐 𝐎𝐓𝐇𝐄𝐑 𝐈𝐍𝐅𝐎 〕━━━╮

  ✧ 𝐆𝐢𝐭𝐇𝐮𝐛 : ${OWNER.github}
  ✧ 𝐃𝐚𝐭𝐞   : ${now.format("DD MMMM YYYY")}
  ✧ 𝐓𝐢𝐦𝐞   : ${now.format("hh:mm:ss A")}

╰━━━━━━━━━━━━━━━━━━━━╯

   ♛ 𝐌𝐀𝐃𝐄 𝐖𝐈𝐓𝐇 ❤️ 𝐁𝐘 𝐒𝐇𝐈𝐒𝐇𝐈𝐑
       ✦ 𝐓𝐇𝐀𝐍𝐊𝐒 𝐅𝐎𝐑 𝐔𝐒𝐈𝐍𝐆 ✦
`;

  try {
    const stream = await global.utils.getStreamFromURL(
      OWNER.image
    );

    return message.reply({
      body,
      attachment: stream
    });
  } catch (error) {
    return message.reply(body);
  }
}

module.exports = {
  config: {
    name: "info",
    version: "3.0.0",
    author: "SHISHIR",
    countDown: 10,
    role: 0,
    shortDescription: "𝐒𝐇𝐈𝐒𝐇𝐈𝐑 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎",
    longDescription: "𝐁𝐨𝐭 & 𝐎𝐰𝐧𝐞𝐫 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧",
    category: "owner",
    guide: {
      en: "{pn}"
    }
  },

  onStart: sendInfo,

  onChat: async function ({ event, message }) {
    if (
      event.body &&
      event.body.trim().toLowerCase() === "info"
    ) {
      return sendInfo({ message });
    }
  }
};
