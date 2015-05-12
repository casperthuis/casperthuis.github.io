/* List scores function takes the team, matchmatrix, scores 
and the team of interest to determine which matches have been 
played by the team, against whom and with what score.
STILL CONTAIN ERRORS AT DETERMINING OPPONENTS!

*/

function listScoresNew(tournament , teamName){
      
      // Get team number
      index = tournament.teamNames.indexOf(teamName);
      //console.log(index)
      gamesPlayedByTeam = new Array();

      for( var i = 0; i < tournament.matchMatrix.length;i++){
        if(tournament.matchMatrix[i][1] === index + 1 || tournament.matchMatrix[i][2] === index + 1){
          gamesPlayedByTeam[gamesPlayedByTeam.length] = i;
        }
      }

      //console.log(gamesPlayedByTeam);


       j = 0;
      for(var i = 0; i < gamesPlayedByTeam.length;i++){
          var table = document.getElementById("gameTable");
          var row = table.insertRow(i+1);
          row.className = "gamesRow";
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);
          var cell6 = row.insertCell(5);
          cell1.innerHTML = i+1;
          cell2.innerHTML = tournament.teamNames[tournament.matchMatrix[gamesPlayedByTeam[i]][1]-1];
          cell3.innerHTML = tournament.teamNames[tournament.matchMatrix[gamesPlayedByTeam[i]][2]-1];
          cell4.innerHTML = tournament.matchMatrix[gamesPlayedByTeam[i]][3] + "     " + "<a href='#' class='btn btn-info btn-xs' class='scoresButtons'><span class='glyphicon glyphicon-plus'></span></a>" + "      " + "<a href='#' class='btn btn-info btn-xs'><span class='glyphicon glyphicon-minus'></span></a>";
          cell5.innerHTML = tournament.matchMatrix[gamesPlayedByTeam[i]][4] + "     " + "<a href='#' class='btn btn-info btn-xs' class='scoresButtons'><span class='glyphicon glyphicon-plus'></span></a>" + "      " + "<a href='#' class='btn btn-info btn-xs'><span class='glyphicon glyphicon-minus'></span></a>";
          cell6.innerHTML = "-"
      }    
     
      
    }