

module.exports=class Question {
    constructor(telegram='')
    {
        this.questionTypes=[];
        this.telegram=telegram;
    };

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    add(item)
    {
        this.questionTypes.push(item);
    };
    getRandomQuestion()
    {
        const random=this.getRandomInt(this.questionTypes.length);
      const question=  this.questionTypes[random];
      return question.getQuestionData();
    }
    sendQuiz(user_id)
    {
       const data=this.getRandomQuestion();
        this.telegram.sendQuiz(""+user_id,data.question,data.variants,{correct_option_id:data.answer,is_anonymous:false});
    };
}