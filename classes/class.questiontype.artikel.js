const QuestionType = require("./class.questiontype");

module.exports = class QuestionArtikell extends QuestionType {
    getCorrectIdArticle() {
        if (item.sex === "n")
            return "das";
        if (item.sex === "m")
            return "der";
        if (item.sex === "f")
            return "die";
    };

    getQuestionData() {

        let variants = ["das", "der", "die"];
        let randomItem = this.wordsData[Math.floor(Math.random() * this.wordsData.length)];
        let correct_id = variants.indexOf(getCorrectIdArticle(randomItem));
        let question = "Укажите правильный артикль для слова: " + randomItem.word;
        return {question: question, answer: correct_id, variants: variants};
    };
};

