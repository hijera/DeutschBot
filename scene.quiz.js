require('./require.js')();



let quiz = new WizardScene(
    "quiz",
    (ctx)=>{
        question.sendQuiz(""+ctx.from.id);
    return ctx.wizard.next();
    },
    (ctx)=>{
        return ctx.scene.reenter();
    }
    );

module.exports={ quiz };