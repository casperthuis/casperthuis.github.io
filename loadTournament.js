function loadTournament(tournamentName, tournament, canvas){
	
	tournament = readAPI(tournamentName);
	console.log(tournament)
	var wMatrix = tournament.createWMatrix();
    var sMatrix = tournament.createSMatrix();
    var ratings = leastSquares(wMatrix,sMatrix);
    var maxRound = tournament.obtainMaxRoundsOfTeam(tournament.teamIndex);
    tournament.currentRound = maxRound;
    tournament.obtainRankTeams(ratings);
    tournament.listScoresInTable(tournament.teamName);

    canvas.currentRating = ratings;

    var opponents = tournament.getOpponents(tournament.TeamIndex,tournament.currentRound);
    var scoresDifference = tournament.obtainScoresDifference(tournament.teamIndex, tournament.currentRound);
   
    canvas.updateCanvas(canvas.currentRating, tournament.teamIndex, opponents, scoresDifference, tournament.teamNames, tournament.ranks);
    
    $( "#tags" ).autocomplete({
      source: tournament.teamNames
      });
    
    document.getElementById('pickTeamButton').onclick = function(){tournament.newGameTable(canvas);};
    
    //document.getElementById("pickTeamButton").setAttribute('onclick','tournament.newGameTable(canvas, canvas.currentRating)');
}