/*  TournamentObject function creates an object a tournament. 
        It has 5 variables: 
        - teamNames(list containing teamnames)
        - tournamentName
        - matchMatrix(contains the datamatrix which is the JSON file)
        - originalMatchMatrix(maybe need for a reset)
        - wMatrix(a m(matches) by n(teams) sparse matrix need to compute least squares)
        - sMatrix(a m(matches) by 2 matrix with the scores of the matches)
        Input: Datamatrix, teamNames, tournamentName
        Output: Object
*/
function tournamentObject(dataMatrix, teamNames, tournamentName){
      this.teamNames = teamNames;
      this.tournamentName = tournamentName;
      this.matchMatrix = dataMatrix;
      this.originalMatchMatrix = dataMatrix;
      this.numberOfRounds = dataMatrix[dataMatrix.length-1][6];
      this.numberOfMatchesPerRound = dataMatrix.length/this.numberOfRounds;


      /*  CreatewMatrix function create the w matrix needed for the least squares 
          function. It does this by looking at the first team won or lose index. If it has
          a 1 it won and the other teams lost and vise versa. The calls both the teams number
          and in puts a 1 or -1 at the index in the matrix. The rest is already intialized as 0. 
          Input: None
          Output: Wmatrix[matches][teams]
      */
      this.createWMatrix = function(){

        var wMatrix = math.zeros(this.matchMatrix.length, teamNames.length).valueOf();
        for(var i = 0; i < this.matchMatrix.length; i++){
 
          
          var score1 = this.matchMatrix[i][3];
          var score2 = this.matchMatrix[i][4];
          if(score1 > score2){
            
            var teamWin = this.matchMatrix[i][1];
            var teamLose = this.matchMatrix[i][2];
            
          }else{
            
            var teamWin = this.matchMatrix[i][2];
            var teamLose = this.matchMatrix[i][1];
          }

          for(var j = 0; j < this.teamNames.length; j++){
            if(j === teamWin){
            wMatrix[i][j] = 1;
                 
            }else if(j === teamLose){
            wMatrix[i][j] = -1;
            }
          }
        }
        return wMatrix;
      }


      this.createWMatrixWithRounds = function(round){

        var wMatrix = math.zeros(this.numberOfMatchesPerRound*round, teamNames.length).valueOf();
        for(var i = 0; i < this.numberOfMatchesPerRound*round; i++){
 
          
          var score1 = this.matchMatrix[i][3];
          var score2 = this.matchMatrix[i][4];
          if(score1 > score2){
            
            var teamWin = this.matchMatrix[i][1];
            var teamLose = this.matchMatrix[i][2];
            
          }else{
            
            var teamWin = this.matchMatrix[i][2];
            var teamLose = this.matchMatrix[i][1];
          }

          for(var j = 0; j < this.teamNames.length; j++){
            if(j === teamWin){
            wMatrix[i][j] = 1;
                 
            }else if(j === teamLose){
            wMatrix[i][j] = -1;
            }
          }
        }
        return wMatrix;
      }

      /*  CreateSMatrix function creates the correct s matrix that is needed for 
          the least sqaure algorithm. This function needs to be called before least 
          squares to that the correct scores are given.
          Input: None.
          Output: Smatrix[matches][2]
      */
      this.createSMatrix = function(){
        var sMatrix = math.zeros(this.matchMatrix.length, 2).valueOf();
        for(var i = 0; i < this.matchMatrix.length; i++){
          sMatrix[i][0] = this.matchMatrix[i][3];
          sMatrix[i][1] = this.matchMatrix[i][4];
        }
        return sMatrix;     
      }

      this.createSMatrixWithRounds = function(round){
        var sMatrix = math.zeros(this.numberOfMatchesPerRound*round, 2).valueOf();
        for(var i = 0; i < this.numberOfMatchesPerRound*round; i++){
          sMatrix[i][0] = this.matchMatrix[i][3];
          sMatrix[i][1] = this.matchMatrix[i][4];
        }
        return sMatrix;     
      }

      /*
        newGameTable function creates a new table when a other team has been picked. It removes the old table and call the
        function to make a new one. It also checks whether the input 
        Input: None
        Output: None
      */

     this.newGameTable = function() {

      var teamName = document.getElementById("tags").value;
      // Check if the input is empty or contains a name that ins't a team
      if(teamName === "" /*|| $.inArray(this.teamNames, teamName) === -1*/){
        alert('No team has been picked');
      }else{
      $("tr").remove(".gamesRow");
        listScoresNew(tournament, teamName);
      }
    }

    /*
    changeValues function is the function called by the + or - button to increase score 
    a team. It changes the values of the team by 1. It searches the match and get the team index( 1 or 2)
    and change it value. If higher 15 it gives a alert if lower then 0 it also does this.
    Input: matchIndex(from zero to m-1), TeamIndex(1 or 2), operation(+ or -) 
    */
      this.changeValues = function(matchIndex,teamIndex,operation){
          
          var matchArray = tournament.matchMatrix[matchIndex];
          if(operation === "+"){
            if(this.matchMatrix[matchIndex][teamIndex+2] > 14 ){
              alert('Score cannot go higher then 15');
              return this.matchMatrix[matchIndex][teamIndex+2];
            }else{
            //console.log(matchArray = tournament.matchMatrix[matchIndex]);
            return this.matchMatrix[matchIndex][teamIndex+2] += 1;
            }
          }else{
            //console.log(matchArray = tournament.matchMatrix[matchIndex]);
            if(this.matchMatrix[matchIndex][teamIndex+2] < 1){
              alert('Score cannot go lower then zero');
              return this.matchMatrix[matchIndex][teamIndex+2]
            }else{
              return this.matchMatrix[matchIndex][teamIndex+2] -= 1;
            }
          }
      }

      /*
        The listScoresInTable function list the scores in the table. It gets a teamName find the relevant information
        the table has this format
        table number, teamName1, teamName2, Score1, Score2, Location(currently Not working), Round 
      */

      this.listScoresInTable = function(teamName){
        // Get team number
        var index = this.teamNames.indexOf(teamName);
    
        // Create empty array for the matches that have been played by the team
        var gamesPlayedByTeam = new Array();

        // Fill the array with matches of the team that it played. It loops over all the matches and checks whether 
        // the teams has played as team 1([i][1]) or as team2[i][2]. If that is the case add to the array
        for( var i = 0; i < this.matchMatrix.length;i++){
          if(this.matchMatrix[i][1] === index  || this.matchMatrix[i][2] === index ){
            gamesPlayedByTeam[gamesPlayedByTeam.length] = i;
          }
        }

      
        // Loops over all the games played by the team and adds them to the website.
        // It creates 7 cell per row and as many rows as there are matches.
  
        for(var i = 0; i < gamesPlayedByTeam.length;i++){
          // Get the game information of the gameplayed and put it in currentgame variable
          var currentGame = this.matchMatrix[gamesPlayedByTeam[i]];
          // find table.
          var table = document.getElementById("gameTable");
          // add extra row
          var tr = table.insertRow(i+1);
          tr.className = "gamesRow";
          
          // This add the information to the cells
          var th1 = document.createElement("th");
          var gameNumber = document.createTextNode(i+1); 
          th1.appendChild(gameNumber);
          var th2 = document.createElement("th");
          // get team 1 name
          var teamNumber1 = document.createTextNode(this.teamNames[currentGame[1]]);
          th2.appendChild(teamNumber1);
          var th3 = document.createElement("th");
          // get team 2 name
          var teamNumber2 = document.createTextNode(this.teamNames[currentGame[2]]);
          th3.appendChild(teamNumber2);
          
          // create score button to create a cell with a element
          var th4 = document.createElement("th");
          var th5 = document.createElement("th");
          createButton(currentGame[3], th4, gamesPlayedByTeam[i], 1);
          createButton(currentGame[4], th5, gamesPlayedByTeam[i], 2);
          
          // Add location(not working) and rounnumber
          var th6 = document.createElement("th");
          var th7 = document.createElement("th");
          var roundNumber = document.createTextNode(currentGame[6]);
          th7.appendChild(roundNumber);
          

          // Appending the information to the elements
          tr.appendChild(th1);
          tr.appendChild(th2);
          tr.appendChild(th3);
          tr.appendChild(th4);
          tr.appendChild(th5);
          tr.appendChild(th6);
          tr.appendChild(th7);
        
        }
      }
}


/*
  The create Button function creates the score cell. It had 4 input elements
  the score, element(which cell), the information of the gamePlayed, and the team.
  It output the score and also creates to function of the buttons that have onclick activation.
  If the buttons are clicked the old content is removed and the new content is added.
  The new score is calculated by the changeValues function listed above.
  Input: Score, Element(in table), gamePlayed(game infomation), team
  Output: None
*/
function createButton(score, element, gamePlayed, team){
  // Create Html elements
  var buttonplus = $("<button> + </button>");
  var buttonmin = $("<button> - </button>");
  // add score
  var scoreTeam = document.createTextNode(score);
  element.appendChild(scoreTeam);
  
  // Function for a plus button
  buttonplus.click(function() {
        // change the score in the matchMatrix
        score = tournament.changeValues(gamePlayed,team,"+");
        // replace the innerHtml with new score and new buttons
        element.innerHTML = "";
        var scoreTeam = document.createTextNode(score);
        element.appendChild(scoreTeam);
        buttonplus.appendTo(element);
        buttonmin.appendTo(element);
        
  });

  // function for a minus button
  buttonmin.click(function() {
        // change the score in the matchMatrix
        score = tournament.changeValues(gamePlayed,team,"-");
        // replace the innerHtml with new score and new buttons
        element.innerHTML = "";
        var scoreTeam = document.createTextNode(score);
        element.appendChild(scoreTeam);
        buttonplus.appendTo(element);
        buttonmin.appendTo(element);
        
  });

  // Append the button function to the buttons
  buttonplus.appendTo(element);
  buttonmin.appendTo(element);
};   

