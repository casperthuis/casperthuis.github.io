function calculatescore(data){
	var scores = data.games;
        console.log(data.games.length)
        var scoresarray = new Array(data.games.length/2); 
        console.log(data.games[0])
        console.log(data.games[1])
        console.log(Math.abs(data.games[1]-data.games[2]));
        var j = 0;
        for (var i = 0; i < (data.games.length/2); i = i + 2){
            
           console.log(Math.abs(data.games[i]-data.games[i+1]));
           scoresarray[j] =  Math.abs(data.games[i]-data.games[i+1]);
           j++;
        };
        
        console.log(scoresarray)

}