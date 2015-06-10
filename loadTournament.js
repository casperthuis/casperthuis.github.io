function loadTournament(tournamentName, tournament, canvas){
	
	tournament = readAPI(tournamentName);
	
	wMatrix = tournament.createWMatrix();
    sMatrix = tournament.createSMatrix();
    ratings = leastSquares(wMatrix,sMatrix);
    
    tournament.listScoresInTable(tournament.teamName);

    canvas.currentRating = ratings;

    var opponents = tournament.getOpponents(tournament.TeamIndex);
    var scoresDifference = tournament.obtainScoresDifference(tournament.teamIndex);
    
    canvas.updateCanvas(ratings, tournament.teamIndex, opponents, scoresDifference);
    //canvas.updateCirclesColor(tournament.teamIndex, opponents);
    //canvas.updateLegend(opponents, tournament.teamNames, tournament.TeamIndex, tournament.ranks);
    
}