/* Function reads Scores played by the teams and calculates the difference.
 */

function calculatescore(callback){

        $.getJSON('test.json', function(scores) {
         callback(scores);   
        //console.log(scores.games);

        var scores = scores.games;
        //console.log(scores.games.length)
        var scoresarray = new Array(scores.games.length/2); 
        //console.log(scores.games[0])
        //console.log(scores.games[1])
        //console.log(Math.abs(scores.games[1]-scores.games[2]));
        var j = 0;
        for (var i = 0; i < scores.games.length; i = i + 2){
            
           //console.log(Math.abs(scores.games[i]-scores.games[i+1]));
           scoresarray[j] =  Math.abs(scores.games[i]-scores.games[i+1]);
           j++;
        };
        //console.log(scores)
        //console.log(scoresarray)      
  		});
};
