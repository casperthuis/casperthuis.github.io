/* List scores function takes the team, matchmatrix, scores 
and the team of interest to determine which matches have been 
played by the team, against whom and with what score.


*/

function listScoresNew(tournament, teamName){
      
      // Get team number
      index = tournament.teamNames.indexOf(teamName);
    
      
      gamesPlayedByTeam = new Array();

      for( var i = 0; i < tournament.matchMatrix.length;i++){
        if(tournament.matchMatrix[i][1] === index  || tournament.matchMatrix[i][2] === index ){
          gamesPlayedByTeam[gamesPlayedByTeam.length] = i;
        }
      }

      

      for(var i = 0; i < gamesPlayedByTeam.length;i++){
      
        currentGame = tournament.matchMatrix[gamesPlayedByTeam[i]];
        
        var table = document.getElementById("gameTable");
        var tr = table.insertRow(i+1);
        tr.className = "gamesRow";
        var th1 = document.createElement("th");
        var gameNumber = document.createTextNode(i+1); 
        th1.appendChild(gameNumber);
        var th2 = document.createElement("th");
        var teamNumber1 = document.createTextNode(teamNames[currentGame[1]]);
        th2.appendChild(teamNumber1);
        var th3 = document.createElement("th");
        var teamNumber2 = document.createTextNode(teamNames[currentGame[2]]);
        th3.appendChild(teamNumber2);
        var th4 = document.createElement("th");
        var th5 = document.createElement("th");
        var th6 = document.createElement("th");
        var th7 = document.createElement("th");
        var roundNumber = document.createTextNode(currentGame[6]);
        th7.appendChild(roundNumber);
        createButton(currentGame[3], th4, gamesPlayedByTeam[i], 1);
        createButton(currentGame[4], th5, gamesPlayedByTeam[i], 2);
        

        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        tr.appendChild(th4);
        tr.appendChild(th5);
        tr.appendChild(th6);
        tr.appendChild(th7);
      
      }

} 


function createButton(score, element, gamePlayed, team){
  var buttonplus = $("<button> + </button>");
  var buttonmin = $("<button> - </button>");
  var scoreTeam = document.createTextNode(score);
  element.appendChild(scoreTeam);
  
  buttonplus.click(function() {
        score = tournament.changeValues(gamePlayed,team,"+");
        element.innerHTML = "";
        var scoreTeam = document.createTextNode(score);
        element.appendChild(scoreTeam);
        buttonplus.appendTo(element);
        buttonmin.appendTo(element);
        
  });
  buttonmin.click(function() {
        score = tournament.changeValues(gamePlayed,team,"-");
        element.innerHTML = "";
        var scoreTeam = document.createTextNode(score);
        element.appendChild(scoreTeam);
        buttonplus.appendTo(element);
        buttonmin.appendTo(element);
        
  });
  buttonplus.appendTo(element);
  buttonmin.appendTo(element);
};   



   