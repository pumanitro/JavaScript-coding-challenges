(function quizInConsole(){

    var points = 0;

    //question - string, answers - array of strings, correctAnswer - int (array index)
    var Question = function(question,answers,correctAnswer)
    {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;

        this.isCorrect = function(answer){

            var ansIndex;

            if(answer == 'a') ansIndex = 0;
            else if(answer == 'b') ansIndex = 1;
            else ansIndex = 2;

            return ansIndex == this.correctAnswer;
        };
    };

    var questionName = new Question("What is my name ?",["Patryk","Oskar","Piotr"],0);
    var questionDogName = new Question("What is my dog name ?",["Pinia","Max","Kolo"],0);
    var questionColor = new Question("What is my favourite color ?",["Green","Blue","Red"],1);

    var allQuestions = {
        listOfQuestions : [questionName,questionDogName,questionColor],
        questionNumber : 0,
        showRandomQuestion : function(){
          var randPos = Math.floor(Math.random() * this.listOfQuestions.length);
          this.questionNumber++;

          console.log(this.questionNumber+'. '+this.listOfQuestions[randPos].question);
          console.log('a) '+this.listOfQuestions[randPos].answers[0]);
          console.log('b) '+this.listOfQuestions[randPos].answers[1]);
          console.log('c) '+this.listOfQuestions[randPos].answers[2]);

          return this.listOfQuestions[randPos];
        }
    };

    var answer;

    while(answer != 'exit')
    {
        var choosenQuestion = allQuestions.showRandomQuestion();

        answer = prompt("Please enter correct answer (a,b,c)");

        if (answer) {
            if(choosenQuestion.isCorrect(answer))
            {
                console.log('Correct answer!');
                points++;
            }
            else
                console.log('Uncorrect answer :(');
        }

        console.log('You have ' + points + ' '+ (points==1 ? 'point' : 'points') + '.');
    }


})();