

module.exports = function() {
    this.Telegraf = require('telegraf');
    this.dotenv= require('dotenv');
    this.dotenv.config();
    this.Markup = require('telegraf/markup');
    this.Stage = require("telegraf/stage");
    this.WizardScene = require("telegraf/scenes/wizard");
    this.Scene = require('telegraf/scenes/base');
    this.axios = require('axios');
    this.HttpsProxyAgent=   require("https-proxy-agent");
    this.SocksAgent = require('socks5-https-client/lib/Agent');
    this.extra = require('telegraf/extra');
    this.markup = extra.markdown();
    this.fs = require('fs');
    this.Telegram = require('telegraf/telegram');
    this.HttpProxyAgent = require('http-proxy-agent');
    this.session = require('telegraf/session');
    this.wordsData=require("./words.json");
    this.Question  = require("./class.question");
    this.QuestionType=require('./classes/class.questiontype');
    this.QuestionArtikell=require('./classes/class.questiontype.artikel');
    this.QuestionAdjektive=require("./classes/class.questiontype.adjektive");
    this.question=new Question();
    this.question.add(new QuestionArtikell('../words.json'));
    this.question.add(new QuestionAdjektive('../words_adjektive.json'));
    this.getCorrectIdArticle=function(item)
    {
        if (item.sex=="n")
            return "das";
        if (item.sex=="m")
            return "der";
        if (item.sex=="f")
            return "die";
    };
    this.sendQuiz=function(telegram,ctx,user)
    {
        let user_id=user.id;
        let variants=["das","der","die"];
        let randomItem= wordsData[Math.floor(Math.random() * wordsData.length)];
        let correct_id=variants.indexOf(getCorrectIdArticle(randomItem));
        let question="Укажите правильный артикль для слова: "+randomItem.word;
        telegram.sendQuiz(""+user_id,question,["das","der","die"],{correct_option_id:correct_id,is_anonymous:false});
    }
};