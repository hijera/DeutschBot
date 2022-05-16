module.exports = class QuestionType {
    constructor(filename) {
        this.wordsData = require(filename);
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    add(item) {
        this.questionTypes.push(item);
    };

    getRandomFromArray(arr, n) {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    };

    getTranslation(item) {
        return (typeof item.translation == 'string') ? item.translation : ((Array.isArray(item.translation)) ? item.translation.join(',') : '');
    };
}