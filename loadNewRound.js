function loadNewRound(roundNumber, tournament, canvas){
	console.log(roundNumber);
	

	var sMatrix = tournament.createSMatrixWithRounds(roundNumber)
	var wMatrix = tournament.createWMatrixWithRounds(roundNumber)

	
	if(roundNumber == 1){
		var ratings = leastSquaresNoInterdependance(wMatrix, sMatrix);
	}else{
		var ratings = leastSquares(wMatrix,sMatrix);
	}

	
	
	tournament.currentRound = roundNumber;
	tournament.listScoresInTable(tournament.teamName);
    canvas.currentRating = ratings.slice();
  
    var opponents = tournament.getOpponents(tournament.TeamIndex, tournament.currentRound);
    var scoresDifference = tournament.obtainScoresDifference(tournament.teamIndex, tournament.currentRound);
    
    
    
    canvas.updateCanvas(canvas.currentRating, tournament.teamIndex, opponents, scoresDifference, tournament.teamNames, tournament.ranks);
    

}