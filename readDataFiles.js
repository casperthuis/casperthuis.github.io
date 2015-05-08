function readDataFiles(scoresFile,matchfile,teamFile){
	
/* 
	Read the datafiles needed for least squares. 
	It reads 3 files: the score file, matchfile(sparse matrix) and the teamnames.
	it return these in an array [scores,matches,teamnames].
	It reads json files.	
*/

	// Names of files
	// scoresFile = "scores.json";
	// matchFile = "wmatrix.json";
	// teamFile =  "teamnames.json";

	// Reading score file
    var scores = {};
        $.ajax({
        url: scoresFile,
        beforeSend: function(xhr){
            if (xhr.overrideMimeType)
            {
                xhr.overrideMimeType("application/json");
            }
        },
        async: false,
        dataType: 'json',
        success: function(data) {
            scores = data.games;
        }
    });
   
   	// Reading matchfile
    var wMatrix = {};    
        $.ajax({
        url: matchFile,
        beforeSend: function(xhr){
            if (xhr.overrideMimeType)
            {
                xhr.overrideMimeType("application/json");
            }
        },
        async: false,
        dataType: 'json',
        success: function(data) {
            wMatrix = data.wMatrix;
        }
    });
 
    // Reading teamnamesfile
    var teamnames = {};    
        $.ajax({
        url: teamFile,
        beforeSend: function(xhr){
            if (xhr.overrideMimeType)
            {
                xhr.overrideMimeType("application/json");
            }
        },
        async: false,
        dataType: 'json',
        success: function(data) {
            teamnames = data.teamnames;
        }
    });
        
    return [scores, wMatrix, teamnames]    

};