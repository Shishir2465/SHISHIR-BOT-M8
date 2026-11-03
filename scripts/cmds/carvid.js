const videos = [
  "https://files.catbox.moe/0l9p9g.mp4",
  "https://files.catbox.moe/g9xgk3.mp4",
  "https://files.catbox.moe/i9kq9l.mp4",
  "https://files.catbox.moe/bkptki.mp4",
  "https://files.catbox.moe/4hym9o.mp4",
  "https://files.catbox.moe/h1t0eq.mp4",
  "https://files.catbox.moe/nissh7.mp4",
  "https://files.catbox.moe/zl5ceb.mp4",
  "https://files.catbox.moe/phs9mi.mp4",
  "https://files.catbox.moe/tsxlst.mp4",
  "https://files.catbox.moe/kkwag1.mp4",
  "https://files.catbox.moe/qv3a4k.mp4",
  "https://files.catbox.moe/cgrnco.mp4",
  "https://files.catbox.moe/2gm6qo.mp4",
  "https://files.catbox.moe/vtu3lf.mp4",
  "https://files.catbox.moe/xse9eq.mp4",
  "https://files.catbox.moe/zj15wi.mp4",
  "https://files.catbox.moe/hl7wlb.mp4",
  "https://files.catbox.moe/aacdpe.mp4",
  "https://files.catbox.moe/jtqocc.mp4",
  "https://files.catbox.moe/uhcagr.mp4",
  "https://files.catbox.moe/9b8q7k.mp4",
  "https://files.catbox.moe/u0z1jk.mp4",
  "https://files.catbox.moe/2451le.mp4",
  "https://files.catbox.moe/yfpgti.mp4",
  "https://files.catbox.moe/zrdk4n.mp4",
  "https://files.catbox.moe/rblguk.mp4",
  "https://files.catbox.moe/mo1sfj.mp4",
  "https://files.catbox.moe/92398l.mp4",
  "https://files.catbox.moe/copb3j.mp4",
  "https://files.catbox.moe/4bpi79.mp4",
  "https://files.catbox.moe/r2vjo8.mp4",
  "https://files.catbox.moe/c4l7oz.mp4",
  "https://files.catbox.moe/3hp1ae.mp4",
  "https://files.catbox.moe/oomw3m.mp4",
  "https://files.catbox.moe/9byqs5.mp4",
  "https://files.catbox.moe/3brs55.mp4",
  "https://files.catbox.moe/s2hfbb.mp4",
  "https://files.catbox.moe/xpe5vr.mp4",
  "https://files.catbox.moe/gmhvn4.mp4",
  "https://files.catbox.moe/ji8ed0.mp4",
  "https://files.catbox.moe/f8libl.mp4",
  "https://files.catbox.moe/mgds7o.mp4",
  "https://files.catbox.moe/1zkv6q.mp4",
  "https://files.catbox.moe/2chyto.mp4",
  "https://files.catbox.moe/aqkgum.mp4",
  "https://files.catbox.moe/8q2wp7.mp4",
  "https://files.catbox.moe/tentry.mp4",
  "https://files.catbox.moe/58sy32.mp4",
  "https://files.catbox.moe/p3cm9k.mp4",
  "https://files.catbox.moe/mftdop.mp4",
  "https://files.catbox.moe/0rawho.mp4"
];

module.exports = {
  config: {
    name: "carvid",
    version: "3.0.0",
    author: "𝐒𝐇𝐈𝐒𝐇𝐈𝐑",
    countDown: 5,
    role: 0,
    shortDescription: "Premium Car Video",
    longDescription: "Random luxury car video collection",
    category: "𝗘𝗡𝗧𝗘𝗥𝗧𝗔𝗜𝗡𝗠𝗘𝗡𝗧",
    guide: "{pn}"
  },

  onStart: async function ({ message }) {
    try {
      const video = videos[Math.floor(Math.random() * videos.length)];

      const attachment = await global.utils.getStreamFromURL(video);

      message.reply({
        body:
`╭━━━〔 🏎️ 𝐂𝐀𝐑 𝐕𝐈𝐃𝐄𝐎 〕━━━╮
┃
┃  ✦ 𝐁𝐑𝐀𝐍𝐃 : 𝐒𝐇𝐈𝐒𝐇𝐈𝐑
┃  ✦ 𝐌𝐎𝐃𝐄 : 𝐑𝐀𝐍𝐃𝐎𝐌 𝐕𝐈𝐃𝐄𝐎
┃  ✦ 𝐂𝐎𝐋𝐋𝐄𝐂𝐓𝐈𝐎𝐍 : ${videos.length} 𝐕𝐈𝐃𝐄𝐎𝐒
┃
┃  🏁 𝐄𝐍𝐉𝐎𝐘 𝐓𝐇𝐄 𝐑𝐈𝐃𝐄!
┃  👑 𝐎𝐖𝐍𝐄𝐑 : 𝐒𝐇𝐈𝐒𝐇𝐈𝐑
┃
╰━━━━━━━━━━━━━━━━━━━━╯`,
        attachment
      });

    } catch (error) {
      message.reply(
        "╭━━〔 ⚠️ 𝐄𝐑𝐑𝐎𝐑 〕━━╮\n┃ 𝐕𝐈𝐃𝐄𝐎 𝐒𝐄𝐍𝐃 𝐅𝐀𝐈𝐋𝐄𝐃!\n┃ 𝐓𝐑𝐘 𝐀𝐆𝐀𝐈𝐍.\n╰━━━━━━━━━━━━━━╯"
      );
    }
  }
};
