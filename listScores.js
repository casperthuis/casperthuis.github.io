/* List scores function takes the team, matchmatrix, scores 
and the team of interest to determine which matches have been 
played by the team, against whom and with what score.
STILL CONTAIN ERRORS AT DETERMINING OPPONENTS!

*/

function listScores(teams, matchMatrix, scores, teamName){
      
      // Get team number
      index = teams.indexOf(teamName);
      // Get team matches
      // Tranpose for easy find which matches have been played
      matchMatrixTranspose = math.transpose(matchMatrix);
      
      // Find the array that contains all the match of that team
      teamMatchArray = matchMatrixTranspose[index]; 
      
      indexMatches = new Array();
      wins = new Array();
      

      for (var i = 0; i < teamMatchArray.length; i++){
        if(teamMatchArray[i] === 1){
          indexMatches[indexMatches.length] = i;
          wins[wins.length] = i;
        }else if(teamMatchArray[i] === -1){
          indexMatches[indexMatches.length] = i;
        }
      }
    
      // Get opponents names
      opponents = new Array();
      for (var i = 0; i < indexMatches.length; i++){
        matchArray = matchMatrix[indexMatches[i]];
        for(var j = 1; j < matchArray.length; j++){
          if(matchArray[j] === 1 || matchArray[j] === -1 ){
            opponents[opponents.length] = j;
          }
        }
      }
  

      // Get team scores
      scoreFor = new Array();
      scoreAgainst = new Array();
      for (var i = 0; i < indexMatches.length; i++){
        score1 = scores[indexMatches[i]*2];
        score2 = scores[(indexMatches[i]*2)+1];
        scoreFor[scoreFor.length] = score1;
        scoreAgainst[scoreAgainst.length] = score2;
      }
      score = [scoreFor,scoreAgainst];
     
      // location


      // add to website
      j = 0;
      for(var i = 0; i < indexMatches.length;i++){
          var table = document.getElementById("gameTable");
          var row = table.insertRow(i+1);
          row.className = "gamesRow";
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);
          cell1.innerHTML = i+1;
          cell2.innerHTML = teams[opponents[i]];
          if(wins[j] === indexMatches[i]){
            cell3.innerHTML = score[0][i] + "     " + "<a href='#' class='btn btn-info btn-xs' class='scoresButtons'><span class='glyphicon glyphicon-plus'></span></a>" + "      " + "<a href='#' class='btn btn-info btn-xs'><span class='glyphicon glyphicon-minus'></span></a>";
            cell4.innerHTML = score[1][i] + "     " + "<a href='#' class='btn btn-info btn-xs' class='scoresButtons' ><span class='glyphicon glyphicon-plus'></span></a>" + "      " + "<a href='#' class='btn btn-info btn-xs'><span class='glyphicon glyphicon-minus'></span></a>";
            j++;  
          }else{
            cell3.innerHTML = score[1][i] + "     " + "<a href='#' class='btn btn-info btn-xs' class='scoresButtons' ><span class='glyphicon glyphicon-plus'></span></a>" + "      " + "<a href='#' class='btn btn-info btn-xs'><span class='glyphicon glyphicon-minus'></span></a>";
            cell4.innerHTML = score[0][i] + "     " + "<a href='#' class='btn btn-info btn-xs' class='scoresButtons' ><span class='glyphicon glyphicon-plus'></span></a>" + "      " + "<a href='#' class='btn btn-info btn-xs'><span class='glyphicon glyphicon-minus'></span></a>";  
          }
          //var button = document.createElement("input");
          //button.type = "button";
          //button.value = "im a button";
          cell5.innerHTML = "-"
          
          

      }
    }