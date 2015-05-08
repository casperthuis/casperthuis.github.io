/* Calculates the score difference for the scores matrix
	returns the scores difference in an array. It creates a
	dynamic array and loops by step 2 of the over i.
	J is created because the array is half the size of the old one.
*/
function calculateScoreDifference(scores){
	var scoresarray = new Array((scores.length/2)); 
    
    var j = 0;
    for (var i = 0; i < (scores.length); i = i + 2){
        scoresarray[j] =  Math.abs(scores[i]-scores[i+1]);
        j++;
    };

    return scoresarray;
}