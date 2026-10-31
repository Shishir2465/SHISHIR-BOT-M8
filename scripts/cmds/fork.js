const fs = require("fs-extra");
const https = require("https");
const path = require("path");

const GIF_URL = "https://i.imgur.com/9ANbdwY.gif";

async function sendGif(message, text) {
    const cacheDir = path.join(__dirname, "cache");
    const gifPath = path.join(cacheDir, "fork.gif");

    await fs.ensureDir(cacheDir);

    try {
        await downloadGif(GIF_URL, gifPath);

        return message.reply({
            body: text,
            attachment: fs.createReadStream(gifPath)
        });
    } catch (err) {
        console.error("Fork GIF error:", err);
        return message.reply(text);
    }
}

function downloadGif(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);

        https.get(url, res => {
            if (res.statusCode !== 200) {
                file.close();
                fs.unlink(dest, () => {});
                return reject(new Error("GIF download failed: " + res.statusCode));
            }

            res.pipe(file);

            file.on("finish", () => file.close(resolve));

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

module.exports = {
    config: {
        name: "fork",
        aliases: ["forklink", "source"],
        version: "1.3",
        author: "ARIYAN",
        countDown: 5,
        role: 0,
        description: {
            en: "Get the fork link of the bot!"
        },
        category: "info",
        guide: {
            en: "{pn}"
        }
    },

    onStart: async function ({ message }) {

        const text =
            `🌸 𝑾𝒉𝒐𝒂! 𝑺𝒐 𝒄𝒖𝒕𝒆~ 🎀\n\n` +
            `✨ **𝑭𝒐𝒓𝒌 link!** 🚀\n` +
            `🔗 **https://github.com/ariyanx404/REM-X-ST-BOT-.git:**\n` +
            `📺 **YouTube Link:** Coming Soon\n\n` +
            `💖 𝑺𝒕𝒂𝒚 𝒕𝒖𝒏𝒆𝒅 𝒇𝒐𝒓 𝒎𝒐𝒓𝒆 𝒂𝒘𝒆𝒔𝒐𝒎𝒆 𝒖𝒑𝒅𝒂𝒕𝒆𝒔!`;

        return sendGif(message, text);
    }
};
