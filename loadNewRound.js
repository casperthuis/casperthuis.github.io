function loadNewRound(roundNumber, tournament, canvas){
	console.log(roundNumber);
	

	var sMatrix = tournament.createSMatrixWithRounds(roundNumber)
	var wMatrix = tournament.createWMatrixWithRounds(roundNumber)

	
	if(roundNumber == 1){
		var ratings = leastSquaresNoInterdependance(wMatrix, sMatrix);
	}else{
		var ratings = leastSquares(wMatrix,sMatrix);
	}

	
	//tournament.listScoresInTable(tournament.teamName);
	tournament.currentRound = roundNumber;
	tournament.listScoresInTable(tournament.teamName);
    canvas.currentRating = ratings.splice();

    var opponents = tournament.getOpponents(tournament.TeamIndex);
    var scoresDifference = tournament.obtainScoresDifference(tournament.teamIndex);
    //console.log(tournament.teamName)
    //console.log(tournament.teamNames[tournament.teamIndex])
    //canvas.updateCirclesColor(tournament.teamIndex, opponents);
    canvas.updateCanvas(ratings, tournament.teamIndex, opponents, scoresDifference);
    

}