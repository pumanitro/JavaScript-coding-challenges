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

var allQuest = [questionName,questionDogName,questionColor];