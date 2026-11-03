const fs = require("fs-extra");
const path = require("path");
const https = require("https");
const axios = require("axios");

module.exports = {
  config: {
    name: "hentai",
    version: "1.0",
    author: "ARIYAN ",
    countDown: 5,
    role: 0,
    shortDescription: { en: "Send safe cute anime illustration" },
    longDescription: {
      en: "Fetches safe (non-R18) anime images from lolicon API",
    },
    category: "fun",
    guide: { en: "+hentai" },
  },

  onStart: async function ({ api, event, args, message, usersData }) {
    // ==========================================
    // ЁЯСС VIP CHECK LOGIC
    // ==========================================
    const uid = event.senderID;
    const userData = await usersData.get(uid);

    const vipExpires = Number(userData?.data?.vip?.expires || 0);

    // Permanent VIP рж╣рж▓рзЗ expires = 0
    const isPermanentVIP = userData?.data?.vip?.expires === 0;

    // Temporary VIP рж╣рж▓рзЗ expiry ржПржЦржирзЛ рж╢рзЗрж╖ рж╣рзЯржирж┐
    const isTempVIP = vipExpires > Date.now();

    if (!isPermanentVIP && !isTempVIP) {
      return message.reply(
        "рждрзБржЗ ржЧрж░рж┐ржм ЁЯжЖ " +
          "ржЧрж░рж┐ржм ржорж╛ржирзБрж╖ ржПржЧрзБрж▓рзЛ ржмрзНржпржмрж╣рж╛рж░ ржХрж░рждрзЗ ржкрж╛рж░рзЗ ржирж╛" +
          " ржзржирзЗрж░ ржорж╛рж▓рж┐ржХ рж╣рждрзЗ ржЪрж╛ржЗрж▓рзЗ ржЯрж╛ржЗржк /VIP"
      );
    }
    // ==========================================
    try {
      const res = await axios.post("https://api.lolicon.app/setu/v2", {
        r18: 0,
        num: 1,
      });

      if (!res.data || !res.data.data || res.data.data.length === 0) {
        return message.reply(
          "тЭМ ржХрзЛржирзЛ ржЫржмрж┐ ржкрж╛ржУрзЯрж╛ ржпрж╛рзЯржирж┐ред"
        );
      }

      const imageUrl =
        res.data.data[0].urls.original || res.data.data[0].urls.regular;
      const filePath = path.join(__dirname, "cache/hentai.jpg");

      const file = fs.createWriteStream(filePath);
      https
        .get(imageUrl, (resImg) => {
          resImg.pipe(file);
          file.on("finish", () => {
            const caption = ` тЬи ЁЭУТЁЭУ╛ЁЭУ╜ЁЭУо ЁЭУЧЁЭУоЁЭУ╖ЁЭУ╜ЁЭУкЁЭУ▓ ЁЭУСЁЭУкЁЭУлЁЭФВ тЬи `;
            message.reply({
              body: caption.trim(),
              attachment: fs.createReadStream(filePath),
            });
          });
        })
        .on("error", () => {
          message.reply(
            "тЭМ ржЫржмрж┐ ржбрж╛ржЙржирж▓рзЛржбрзЗ рж╕ржорж╕рзНржпрж╛ рж╣рзЯрзЗржЫрзЗред"
          );
        });
    } catch {
      message.reply(
        "тЭМ ржЫржмрж┐ ржЖржирждрзЗ рж╕ржорж╕рзНржпрж╛ рж╣рзЯрзЗржЫрзЗред"
      );
    }
  },
};
