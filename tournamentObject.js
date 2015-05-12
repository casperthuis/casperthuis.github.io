/*  TournamentObject function creates an object a tournament. 
        It has 5 variables: 
        - teamNames(list containing teamnames)
        - tournamentName
        - matchMatrix(contains the datamatrix which is the JSON file)
        - originalMatchMatrix(maybe need for a reset)
        - wMatrix(a 160 by 40 sparse matrix need to compute least squares)
        - sMatrix(a 160 by 2 matrix with the scores of the matches)
        Input: Datamatrix, teamNames, tournamentName
        Output: Object
*/
function tournamentObject(dataMatrix, teamNames, tournamentName){
      this.teamNames = teamNames;
      this.tournamentName = tournamentName;
      this.matchMatrix = dataMatrix;
      this.originalMatchMatrix = dataMatrix;
      


      /*  CreatewMatrix function create the w matrix needed for the least squares 
          function. It does this by looking at the first team won or lose index. If it has
          a 1 it won and the other teams lost and vise versa. The calls both the teams number
          and in puts a 1 or -1 at the index in the matrix. The rest is already intialized as 0. 
          Input: None
          Output: Wmatrix[160][40]
      */
      this.createWMatrix = function(){
        wMatrix = math.zeros(this.matchMatrix.length, teamNames.length).valueOf();
        for(var i = 0; i < this.matchMatrix.length; i++){
 
          
          score1 = this.matchMatrix[i][3];
          score2 = this.matchMatrix[i][4];
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
          Output: Smatrix[160][2]
      */
      this.createSMatrix = function(){
        sMatrix = math.zeros(this.matchMatrix.length, 2).valueOf();
        for(var i = 0; i < this.matchMatrix.length; i++){
          sMatrix[i][0] = this.matchMatrix[i][3];
          sMatrix[i][1] = this.matchMatrix[i][4];
        }
        return sMatrix;     
      }


      /* NOT FULLY TESTED YET*/
      /*  updateMatchMatrix function updates the match matrix based on the scores.
          The user can change the score of the match matrix, but who won has
          doesnt change.
          Input: None
          Output: Update the matrix wins and loses based on the new score.    
      */
      this.updateMatchMatrix = function(){
        for(var i = 0; i < this.matchMatrix.length; i++){
          scoreTeam1 = this.matchMatrix[i][5];
          scoresTeam2 = this.matchMatrix[i][6];
          if(scoreTeam1 > scoresTeam2){
            this.matchMatrix[i][3] = 1;
            this.matchMatrix[i][4] = -1;
          }else if(scoresTeam1 < scoreTeam2){
            this.matchMatrix[i][3] = -1;
            this.matchMatrix[i][4] = 1;
          }
          /*
          When there has been a tie
          else{
            this.matchMatrix[i][3] = -1;
            this.matchMatrix[i][4] = 1;
          }
          */
        }      
      }

    }