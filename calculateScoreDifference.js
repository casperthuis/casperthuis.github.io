/* Calculates the score difference for the scores matrix
	returns the scores difference in an array. It creates a
	dynamic array and loops by step 2 of the over i.
	J is created because the array is half the size of the old one.
    Input : scores[160][2].
    Output: scoredifference[160][1]
*/
function calculateScoreDifference(scores){
	var scoresDifferenceArray = new Array(scores.length); 
    
    for (var i = 0; i < scores.length; i++){
        scoresDifferenceArray[i] =  Math.abs(scores[i][0]-scores[i][1]);    
    };
    
    return scoresDifferenceArray;
}