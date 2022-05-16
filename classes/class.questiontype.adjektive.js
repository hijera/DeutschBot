const QuestionType = require("./class.questiontype");

module.exports = class QuestionAdjektive extends QuestionType {

    getQuestionData() {

        let variants = this.getRandomFromArray(this.wordsData, 4);
        variants = variants.map((item) => {
            return this.getTranslation(item)
        });
        let randomItem = this.wordsData[Math.floor(Math.random() * this.wordsData.length)];
        if (variants.indexOf(this.getTranslation(randomItem)) === -1) {
            variants[this.getRandomInt(4)] = this.getTranslation(randomItem);
        }
        let correct_id = variants.indexOf(this.getTranslation(randomItem));
        let question = "Укажите правильный перевод для прилагательного: " + randomItem.word;
        return {question: question, answer: correct_id, variants: variants};
    }
};