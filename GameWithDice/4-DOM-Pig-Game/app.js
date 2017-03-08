/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score,currentScore,activePlayer,stillPlaying, totalScore = 100;

gameInit();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(stillPlaying)
    {
        var dice =  document.querySelector('.dice');
        var dice2 =  document.querySelector('.dice2');

        dice.style.display = 'block';
        dice2.style.display = 'block';

        var rndNumber = Math.floor(Math.random() * 6) + 1;
        var rndNumber2 = Math.floor(Math.random() * 6) + 1;

        dice.src = 'dice-'+ rndNumber +'.png';
        dice2.src = 'dice-'+ rndNumber2 +'.png';

        if(rndNumber2 == 6 && rndNumber == 6)
        {
            score[activePlayer] = 0;
            document.getElementById('score-'+activePlayer).textContent = score[activePlayer];
            nextRound();
        }

        if(rndNumber == 1 || rndNumber2 == 1)
        {
            nextRound();
        }
        else
        {
            currentScore += rndNumber + rndNumber2;
            document.getElementById('current-'+activePlayer).textContent = currentScore;
        }

    }

});

document.querySelector('.btn-hold').addEventListener('click',function(){

    if(stillPlaying)
    {
        score[activePlayer] += currentScore;

        document.getElementById('score-'+activePlayer).textContent = score[activePlayer];

        if(score[activePlayer] >= totalScore)
        {
            document.getElementById('name-'+activePlayer).textContent = 'WINNER!';
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');

            stillPlaying = false;
        }
        else
            nextRound();
    }

});

document.querySelector('.btn-new').addEventListener('click', gameInit);

document.getElementById('totalScore').addEventListener('change',function(){

    totalScore = document.getElementById('totalScore').value;
});

function gameInit()
{
    score = [0,0];
    currentScore = 0;
    activePlayer = 0;
    stillPlaying = true;

    document.getElementById('totalScore').value = totalScore;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.add('active');


}


function nextRound()
{
    currentScore = 0;
    document.getElementById('current-'+activePlayer).textContent = '0';
    activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;

    //Change style for active player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}
