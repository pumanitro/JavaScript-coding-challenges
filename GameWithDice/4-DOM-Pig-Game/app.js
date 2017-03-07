/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';

document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

var score,currentScore,activePlayer;

score = [0,0];
currentScore = 0;
activePlayer = 0;

document.querySelector('.btn-roll').addEventListener('click', function() {
    var dice =  document.querySelector('.dice');
    dice.style.display = 'block';

    var rndNumber = Math.floor(Math.random() * 6) + 1;

    dice.src = 'dice-'+ rndNumber +'.png';

    if(rndNumber == 1)
    {
        nextRound();
    }
    else
    {
        currentScore += rndNumber;
        document.getElementById('current-'+activePlayer).textContent = currentScore;
    }

});

document.querySelector('.btn-hold').addEventListener('click',function(){

    score[activePlayer] += currentScore;

    document.getElementById('score-'+activePlayer).textContent = score[activePlayer];

    nextRound();

});

function nextRound()
{
    currentScore = 0;
    document.getElementById('current-'+activePlayer).textContent = 0;
    activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;

    //Change style for active player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}
