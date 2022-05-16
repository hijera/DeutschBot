require('./require.js')();


const LocalSession = require('telegraf-session-local');
const property = 'data';
const {quiz} = require("./scene.quiz.js");
let proxyInfo = {};
let proxyInfoTg = {};
if (typeof process.env.proxy_host != 'undefined') {
    if (process.env.proxy_type === "socks5") {
        const socksAgent = new SocksAgent({
            socksHost: process.env.proxy_host,
            socksPort: process.env.proxy_port,
            socksUsername: process.env.proxy_login,
            socksPassword: process.env.proxy_password,
        });
        proxyInfo = {
            telegram: {agent: socksAgent}
        };
        proxyInfoTg = {
            agent: socksAgent
        };
    } else if (process.env.proxy_type === "https") {
        const httpsAgent = new HttpsProxyAgent({
            host: process.env.proxy_host,
            post: process.env.proxy_port
        });

        proxyInfo = {
            telegram: httpsAgent
        };
        proxyInfoTg = {
            agent: httpsAgent
        };
    } else if (process.env.proxy_type === "http") {
        const httpAgent = new HttpProxyAgent("http://" + process.env.proxy_host + ":" + process.env.proxy_port);

        proxyInfo = {
            telegram: httpAgent
        };
        proxyInfoTg = {
            agent: httpAgent
        };
    }
}


const bot = new Telegraf(process.env.BOT_TOKEN, proxyInfo);
const telegram = new Telegram(process.env.BOT_TOKEN, proxyInfoTg);
question.telegram = telegram;

const localSession = new LocalSession({
    // Database name/path, where sessions will be located (default: 'sessions.json')
    database: 'db.json',
    // Name of session property object in Telegraf Context (default: 'session')
    property: 'session',
    // Type of lowdb storage (default: 'storageFileSync')
    storage: LocalSession.storageFileAsync,
    // Format of storage/database (default: JSON.stringify / JSON.parse)
    format: {
        serialize: (obj) => JSON.stringify(obj, null, 2), // null & 2 for pretty-formatted JSON
        deserialize: (str) => JSON.parse(str),
    },
    // We will use `messages` array in our database to store user messages using exported lowdb instance from LocalSession via Telegraf Context
    state: {messages: []}
});

// Wait for database async initialization finished (storageFileAsync or your own asynchronous storage adapter)
localSession.DB.then(DB => {
    // Database now initialized, so now you can retrieve anything you want from it


});


const stage = new Stage();
stage.register(quiz);


stage.command("quiz", ctx => {
    ctx.scene.enter("quiz");
});

stage.command("start", ctx => {
    ctx.scene.enter("quiz");
});

bot.on("poll_answer", (ctx) => {
    let answers = ctx.update.poll_answer.option_ids;
    question.sendQuiz("" + ctx.update.poll_answer.user.id);
});

bot.use(session());
bot.use(stage.middleware());
bot.startPolling();