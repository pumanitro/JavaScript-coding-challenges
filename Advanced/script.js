//question - string, answers - array of strings, correctAnswer - int (array index)
var Question = function(question,answers,correctAnswer)
{
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
};

var questionName = new Question("What is my name ?",["Patryk","Oskar","Piotr"],0);
var questionDogName = new Question("What is my dog name ?",["Pinia","Max","Kolo"],0);
var questionColor = new Question("What is my favourite color ?",["Green","Blue","Red"],1);

var allQuestions = {
    listOfQuestions : [questionName,questionDogName,questionColor],
    questionNumber : 0,
    showRandomQuestion : function(){
      var randPos = Math.floor(Math.random() * 3);
      this.questionNumber++;

      console.log(this.questionNumber+'. '+this.listOfQuestions[randPos].question);
      console.log('a) '+this.listOfQuestions[randPos].answers[0]);
      console.log('b) '+this.listOfQuestions[randPos].answers[1]);
      console.log('c) '+this.listOfQuestions[randPos].answers[2]);
    }
};

allQuestions.showRandomQuestion();