<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,24&height=240&section=header&text=REM%20X%20ST%20BOT&fontSize=62&fontAlignY=40&desc=Advanced%20Messenger%20Bot%20Framework&descAlignY=62&animation=fadeIn" alt="REM X ST BOT" width="100%">

<img src="https://i.imgur.com/6dO8Ozt.jpeg" alt="REM X ST BOT" width="220" height="220" style="border-radius: 50%;">

<h1>🤖 REM X ST BOT</h1>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=24&pause=1000&color=00F7FF&center=true&vCenter=true&width=650&lines=REM+X+ST+BOT;Fast+%7C+Modular+%7C+Powerful;E2EE+Supported+Messenger+Bot;Made+by+ARIYANX404" alt="Typing SVG">

<br>



![Stars](https://img.shields.io/github/stars/ariyanx404/rem-x-st?style=for-the-badge&color=gold)




![Forks](https://img.shields.io/github/forks/ariyanx404/rem-x-st?style=for-the-badge&color=blue)




![Issues](https://img.shields.io/github/issues/ariyanx404/rem-x-st?style=for-the-badge&color=red)




![License](https://img.shields.io/github/license/sheikhtamimlover/ST-BOT?style=for-the-badge)




![Node](https://img.shields.io/badge/Node.js-v22.19+-339933?style=for-the-badge&logo=node.js&logoColor=white)



**A customized multi-purpose chatbot framework for Facebook Messenger**
Forked from **ST-BOT** (by Sheikh Tamim), which is based on **Goat Bot V2** (by NTKhang).

[

![GitHub](https://img.shields.io/badge/GitHub-ariyanx404-181717?style=for-the-badge&logo=github)

](https://github.com/ariyanx404)

</div>

---

## 📖 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Configuration](#️-configuration)
- [E2EE Support](#-e2ee-support)
- [Writing Commands](#-writing-commands)
- [Premium System](#-premium-system)
- [Thread Approval](#-thread-approval)
- [Dashboard](#-dashboard)
- [Security Notes](#-security-notes)
- [Credits](#-credits)
- [License](#-license)

---

## 🚀 Features

- 🔐 **E2EE support** — End-to-end encrypted (Labyrinth) Messenger chats
- 🧩 **Modular command system** — add or remove commands easily
- ♻️ **Hot-reload** — scripts reload without restarting the bot
- 💎 **Premium system** — premium-only commands and user management
- ✅ **Thread approval** — control which groups can use the bot
- 🛡️ **Anti-react** — admin-only message management through reactions
- 📊 **Web dashboard** — live monitoring and management
- 🗄️ **MongoDB / SQLite** — flexible database options
- 🤖 **STAI** — built-in AI assistant (bring your own API key)
- 🔁 **Auto restart & watchdog** — self-healing
- 🪵 **Logging system** — configurable bot logs and startup notifications

---

## ⚡ Quick Start

**Requirements:** Node.js **v22.19 or newer**, Git

```bash
git clone https://github.com/ariyanx404/rem-x-st.git
cd rem-x-st
npm install
```

1. Open `config.json` and set:
   - `adminBot` → your Facebook UID
   - `botAccount` → email / password of the **bot account** (or put cookies in `account.txt`)
   - `database` → `sqlite` or `mongodb` (+ your own URI)
2. Start the bot:

```bash
npm start
```

> 💡 Use a **separate Facebook account** for the bot, never your main one.

---

## ⚙️ Configuration

Everything lives in `config.json` and `configCommands.json`.

| Setting | What it does |
|---|---|
| `prefix` | Default command prefix |
| `adminBot` | Bot admin UIDs |
| `usePrefix` | Require prefix globally / for admins |
| `database.type` | `json`, `sqlite` or `mongodb` |
| `dashBoard` | Enable dashboard, port, password |
| `threadApproval` | Only approved groups can use the bot |
| `antiReact` | Reaction-based unsend / remove (admins only) |
| `stai` | AI provider and API keys |
| `e2ee` | End-to-end encryption: enable, key storage (`memory` / `path`), device file path |

**Empty by default:** all passwords, tokens and API keys are blank. Fill them in **only on your own server**.

---

## 🔐 E2EE Support

REM X ST BOT supports Messenger end-to-end encrypted (E2EE / Labyrinth) chats.

```json
"e2ee": {
  "enable": true,
  "saveType": "path",
  "devicePath": "database/e2ee-device.json"
}
```

| Option | Meaning |
|---|---|
| `enable` | Turn E2EE on or off |
| `saveType` | `memory`: keys are lost on restart. `path`: keys are saved to a file and survive restarts (recommended) |
| `devicePath` | Where the device keys are saved (used when `saveType` is `path`) |

> ⚠️ `database/e2ee-device.json` holds your device keys. It is already in `.gitignore`. Never upload it.

---

## 📝 Writing Commands

Put new files in `scripts/cmds/`:

```javascript
module.exports = {
  config: {
    name: "hello",
    aliases: ["hi"],
    version: "1.0.0",
    author: "Your Name",
    countDown: 5,
    role: 0,            // 0: everyone, 1: group admin, 2: bot admin
    premium: false,
    description: "Say hello",
    category: "general",
    guide: "{pn}"
  },

  onStart: async function ({ message }) {
    message.reply("Hello from REM X ST BOT! 👋");
  }
};
```

Useful helpers: `message.reply()`, `message.send()`, `message.unsend()`, `message.reaction()`, `message.pr()`, `usersData.get()`, `threadsData.get()`.

---

## 💎 Premium System

| Who | Command |
|---|---|
| User | `premium request <message>` |
| Admin | `premium add <uid/@mention>` |
| Admin | `premium remove <uid/@mention>` |
| Admin | `premium list` / `premium pending` |

Make a command premium-only with `premium: true` in its `config`.

---

## ✅ Thread Approval

Enable in `config.json` → `threadApproval.enable`.

| Command | Action |
|---|---|
| `threadapprove list` | View threads |
| `threadapprove approve <tid>` | Approve a thread |
| `threadapprove unapprove <tid>` | Unapprove a thread |
| `threadapprove pending` | View pending threads |

---

## 📊 Dashboard

```json
"dashBoard": {
  "enable": true,
  "port": 3021,
  "passwordProtection": { "enable": true, "password": "set_a_strong_password" }
}
```

Always turn on password protection if the dashboard is reachable from the internet.

---

## 🔒 Security Notes

- **Never** commit `account.txt`, cookies, passwords, API keys or database URIs.
- `.gitignore` already protects the common session and secret files.
- If you ever leak a key, **revoke it immediately** and create a new one.

---

## 🙏 Credits

This project would not exist without:

| Role | Name | Link |
|---|---|---|
| Original creator | **NTKhang** | [Goat-Bot-V2](https://github.com/ntkhang03/Goat-Bot-V2) |
| Enhanced fork | **Sheikh Tamim** | [ST-BOT](https://github.com/sheikhtamimlover/ST-BOT) |
| This fork | **ARIYANX404** | [rem-x-st](https://github.com/ariyanx404/rem-x-st) |

Please keep these credits when you copy, modify or share this project.

---

## 📄 License

Released under the **MIT License**. See [LICENSE](./LICENSE).

<div align="center">

**⭐ If you like this project, give it a star! ⭐**

*Made with ❤️ by ARIYANX404*

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,24&height=120&section=footer" width="100%">

</div>
