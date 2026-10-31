const fs = require("fs-extra");
const path = require("path");
const https = require("https");

module.exports = {
  config: {
    name: "help",
    aliases: ["menu", "commands"],
    version: "7.0",
    author: "MOHAMMAD ARIYAN",
    shortDescription: "Villain style command menu",
    longDescription: "Dark villain themed command menu",
    category: "system",
    guide: "{pn}help [command name]"
  },

  onStart: async function ({ message, args, prefix }) {
    const allCommands = global.GoatBot.commands;

    const fancyFont = (str) =>
      str.replace(/[A-Za-z]/g, c => {
        const map = {
          A:"𝐀",B:"𝐁",C:"𝐂",D:"𝐃",E:"𝐄",F:"𝐅",G:"𝐆",
          H:"𝐇",I:"𝐈",J:"𝐉",K:"𝐊",L:"𝐋",M:"𝐌",N:"𝐍",
          O:"𝐎",P:"𝐏",Q:"𝐐",R:"𝐑",S:"𝐒",T:"𝐓",U:"𝐔",
          V:"𝐕",W:"𝐖",X:"𝐗",Y:"𝐘",Z:"𝐙",
          a:"𝐚",b:"𝐛",c:"𝐜",d:"𝐝",e:"𝐞",f:"𝐟",g:"𝐠",
          h:"𝐡",i:"𝐢",j:"𝐣",k:"𝐤",l:"𝐥",m:"𝐦",n:"𝐧",
          o:"𝐨",p:"𝐩",q:"𝐪",r:"𝐫",s:"𝐬",t:"𝐭",u:"𝐮",
          v:"𝐯",w:"𝐰",x:"𝐱",y:"𝐲",z:"𝐳"
        };
        return map[c] || c;
      });

    const categoryFont = str => fancyFont(str);

    const cleanCategoryName = text =>
      text ? text.toLowerCase() : "others";

    if (args[0]) {
      const cmdName = args[0].toLowerCase();

      const cmd =
        allCommands.get(cmdName) ||
        [...allCommands.values()].find(c =>
          c.config.aliases?.includes(cmdName)
        );

      if (!cmd) {
        return message.reply(
`╭━━━〔 😈 ERROR 〕━━━╮
┃
┃ ❌ Command not found!
┃ ⚔️ Command: ${cmdName}
┃
┃ 🩸 Use ${prefix}help
┃ to see all commands.
╰━━━━━━━━━━━━━━━╯`
        );
      }

      const usage = typeof cmd.config.guide === "string"
        ? cmd.config.guide.replace("{pn}", cmd.config.name)
        : cmd.config.name;

      const infoMsg =
`╭━━━〔 😈 COMMAND INFO 〕━━━╮
┃
┃ ⚔️ Name     : ${cmd.config.name}
┃ 🌀 Aliases  : ${cmd.config.aliases?.join(", ") || "None"}
┃ 📂 Category : ${categoryFont((cmd.config.category || "Others").toUpperCase())}
┃ 🔖 Version  : v${cmd.config.version || "1.0"}
┃ 👑 Author   : ${cmd.config.author || "Unknown"}
┃
┣━━━〔 🩸 USAGE 〕━━━
┃
┃ ➤ ${prefix}${usage}
┃
┣━━━〔 📜 DESCRIPTION 〕━━━
┃
┃ ${cmd.config.longDescription || cmd.config.shortDescription || "No description"}
┃
╰━━〔 🔥 REM...X...ST 〕━━╯`;

      return message.reply(infoMsg);
    }

    const categories = {};

    for (const [name, cmd] of allCommands) {
      const cat = cleanCategoryName(cmd.config.category);

      if (!categories[cat]) categories[cat] = [];

      categories[cat].push(name);
    }

    let msg =
`╔════════════════════╗
║       😈 REM MENU
╠════════════════════╣
║ 👑 BOT   : REM...X...ST
║ 🧑‍💻 OWNER : MOHAMMAD ARIYAN
║ ⚡ PREFIX: ${prefix}
║ 📦 TOTAL : ${allCommands.size}
╚════════════════════╝

      🩸 WELCOME TO THE DARK SIDE 🩸
`;

    for (const cat of Object.keys(categories).sort()) {
      const catTitle = categoryFont(cat.toUpperCase());

      msg += `\n╭━━〔 🥀 ${catTitle} 〕━━╮\n`;

      for (const cmdName of categories[cat].sort()) {
        msg += `┃ 🕊️ ${fancyFont(cmdName)}\n`;
      }

      msg += `╰━━━━━━━━━━━━━━╯\n`;
    }

    msg +=
`\n╭━━〔 ⚔️ COMMAND GUIDE 〕━━╮
┃
┃ 🌀 ${prefix}help [command]
┃ 🔥 Example: ${prefix}help owner
┃
╰━━━━━━━━━━━━━━━━━━╯

👑 RULE THE DARKNESS | ARIYANX404`;

    const gifURL = "https://i.imgur.com/XCqHWLG.gif";
    const gifFolder = path.join(__dirname, "cache");
    const gifPath = path.join(gifFolder, "villain-menu.gif");

    await fs.ensureDir(gifFolder);

    try {
      await downloadGif(gifURL, gifPath);

      return message.reply({
        body: msg,
        attachment: fs.createReadStream(gifPath)
      });
    } catch (err) {
      console.error("GIF download failed:", err);
      return message.reply(msg);
    }
  }
};

function downloadGif(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);

    https.get(url, res => {
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error("GIF download failed"));
      }

      res.pipe(file);

      file.on("finish", () => {
        file.close(resolve);
      });

      file.on("error", err => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }).on("error", err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
    }
