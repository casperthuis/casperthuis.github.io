/* Calculates the score difference for the scores matrix
	returns the scores difference in an array. It creates a
	dynamic array and loops by step 2 of the over i.
	J is created because the array is half the size of the old one.
*/
function calculateScoreDifference(scores){
	var scoresarray = new Array(scores.length); 
    console.log(scores.length);
    //var j = 0;
    for (var i = 0; i < scores.length; i++){
        scoresarray[i] =  Math.abs(scores[i][0]-scores[i][1]);
        //j++;
    };
    console.log(scoresarray)
    return scoresarray;
}