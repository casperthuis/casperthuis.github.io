/*
	The read API function reads in the API from league vine and filters the correct
	information. With the Url add the tournament. WATCH OUT SOME VARIABLE CAN BE NULL,
	WHEN THIS HAPPEND THE FUNCTION STOPS! NEEDS TO BE FIXED.
	After which a tournament object is returned.	

*/
function readAPI(){
		
		// Create Stream to read in files.
		$.ajax({
        //url: "data/apifilewithbugs.json",
        // Women 2013 windmill
        //url: "https://api.leaguevine.com/v1/games/?tournament_id=19177&fields=[id%2Ctournament%2Cgame_site%2Cstart_time%2C%20swiss_round%2C%20team_1_id%2Cteam_2_id%2Cteam_1%2Cteam_2%2Cteam_1_score%2Cteam_2_score]&order_by=[start_time]&limit=200",
        
        // Mixed 2013 windmill
        //url: "https://api.leaguevine.com/v1/games/?tournament_id=19178&fields=[id%2Ctournament%2Cgame_site%2Cstart_time%2C%20swiss_round%2C%20team_1_id%2Cteam_2_id%2Cteam_1%2Cteam_2%2Cteam_1_score%2Cteam_2_score]&order_by=[start_time]&limit=200",
        
        // Open 2013 windmill
        //url: "https://api.leaguevine.com/v1/games/?tournament_id=19176&fields=[id%2Ctournament%2Cgame_site%2Cstart_time%2C%20swiss_round%2C%20team_1_id%2Cteam_2_id%2Cteam_1%2Cteam_2%2Cteam_1_score%2Cteam_2_score]&order_by=[start_time]&limit=200",
         url: "data/windmillWindUp2013Open.json",
        // Women 2012 windmill
        //url: "https://api.leaguevine.com/v1/games/?tournament_id=18094&fields=[id%2Ctournament%2Cgame_site%2Cstart_time%2C%20swiss_round%2C%20team_1_id%2Cteam_2_id%2Cteam_1%2Cteam_2%2Cteam_1_score%2Cteam_2_score]&order_by=[start_time]&limit=200",
        
        // Mixed 2012 windmill
        //url: "https://api.leaguevine.com/v1/games/?tournament_id=18093&fields=[id%2Ctournament%2Cgame_site%2Cstart_time%2C%20swiss_round%2C%20team_1_id%2Cteam_2_id%2Cteam_1%2Cteam_2%2Cteam_1_score%2Cteam_2_score]&order_by=[start_time]&limit=200",
        
        // Open 2012 windmill
        // url: "https://api.leaguevine.com/v1/games/?tournament_id=18091&fields=[id%2Ctournament%2Cgame_site%2Cstart_time%2C%20swiss_round%2C%20team_1_id%2Cteam_2_id%2Cteam_1%2Cteam_2%2Cteam_1_score%2Cteam_2_score]&order_by=[start_time]&limit=200",
         
        
        beforeSend: function(xhr){
            if (xhr.overrideMimeType)
            {
                xhr.overrideMimeType("application/json");
            }
        },
        async: false,
        dataType: 'json',

        success: function(data) {
        	// Create global dataMatrix, teamNames and tournament variables.
            //test = data; 
            dataMatrix = new Array();
            teamNames = new Array();
            tournamentName = data.objects[0].tournament.name;
            test = data;
            //Create a list of the teamNames to create indexs of the teamNames
            for(var i = 0; i < data.objects.length;i++){
              var teamName1 = data.objects[i].team_1.short_name;
              var teamName2 = data.objects[i].team_2.short_name;
              if($.inArray(teamName1,teamNames) === -1){
                teamNames[teamNames.length] = teamName1; 
              }
              if($.inArray(teamName2,teamNames) === -1){
                teamNames[teamNames.length] = teamName2; 
              }
            }
            
            /* Create a matchMatrix with the following objects
            	- id of match
            	- team index 1
            	- team index 2
            	- team score 1
            	- team score 2
            	- start time of match
            	- round number
            	this matrix have the size of all the match by 7.
            	WHEN LOCATION WORK ADD IN LAST POSISTION SO THAT OTHER FUNCTION KEEP WORKING!!	
            	*/
            
            
            for(var i = 0; i < data.objects.length;i++){
              //console.log(i);
              //console.log(!data.objects[i].swiss_round_id);
              if(!data.objects[i].swiss_round_id){
                continue;
              }
              var id = data.objects[i].id;
              var teamName = data.objects[i].team_1.short_name;
              var team1Index = teamNames.indexOf(teamName);
              var teamName = data.objects[i].team_2.short_name;
              var team2Index = teamNames.indexOf(teamName);
              var score1 = data.objects[i].team_1_score;
              var score2 = data.objects[i].team_2_score;
              /* CURRENT LOCATION DOENST WORK FOR UNKNOW REASONS */
              //location = //data.objects[i].game_site.event_site.name //+ ": " + data.objects[i].game_site.name;
              //console.log(location = data.objects[i].game_site.name);
              
              
              
              var round = data.objects[i].swiss_round.round_number;
              
              
              var startTime = data.objects[i].start_time;

              dataMatrix[dataMatrix.length] = [id,team1Index,team2Index,score1,score2,startTime,round];
             
            }
              
        }
    });
    
		var tournament = new tournamentObject(dataMatrix,teamNames,tournamentName);
        
    return tournament;
};