/*
Least squares method to obtain be best rating given the score.
This function take the match matrix and scoresdifference array
to compute the nessary rating. The computation that takes place
here is X^t*X*r = X^t*y. Where X is a sparse matrix with 1 on 
on the place where a team wins and -1 on a place where a team loses,
the rest are zeros. y is the a scoredifference vector. 
To get the least squares solution the matrix is interved and multiplied
by the y vector.  
Input : wMatrix[matches][teams] Sparse matrix
        scores[matches][2]
Output : rating[teams][1]
*/
function leastSquares(wMatrix,scores,roundNumber){
        // calculate score difference
        if(roundNumber == 1){
            return leastSquaresNoInterdependance(wMatrix, scores);
        }       
        var scoresDifference = calculateScoreDifference(scores);
        
       
        // transpose match matrix to obtain wtranpose for calculation.
        var wTranspose = math.transpose(wMatrix);
    
        // Create a matrix object to obtain size easily and get the value of the matrix again to obtain the array.
        var wTranspose = math.matrix(wTranspose);
        var size = wTranspose.size();
        
       
        // Multiply the Wtranspose with the scoresarray to obtain the yvector
        var yVector = math.multiply(wTranspose,scoresDifference).valueOf();
         console.log("stop")
        // mulitply match matrix with its transpose to obtain x.
        var xMatrix = math.multiply(wTranspose, wMatrix);    
         
        // Change last element in 0
        yVector[yVector.length-1] = 0;
        
        // add a rows of one to the last row.
        xMatrix = xMatrix.valueOf(); 
        for(var i = 0; i < size[0];i++){
            xMatrix[(size[0]-1)][i] = 1;
        }
        
        // The least squares method by inv(x)*y one would get the best solution. return the solution.
        inv = math.inv(xMatrix);
        return math.multiply(inv,yVector).valueOf();

    };


    /* Calculates the score difference for the scores matrix
    returns the scores difference in an array. It creates a
    dynamic array and loops by step 2 of the over i.
    J is created because the array is half the size of the old one.
    Input : scores[Matches][2].
    Output: scoredifference[matches][1]
*/
function calculateScoreDifference(scores){
    var scoresDifferenceArray = new Array(scores.length); 
    
    for (var i = 0; i < scores.length; i++){
        scoresDifferenceArray[i] =  Math.abs(scores[i][0]-scores[i][1]);    
    };
    
    return scoresDifferenceArray;
}


function leastSquaresNoInterdependance(wMatrix, scores){
    var scoresDifference = calculateScoreDifference(scores);
    
    var ratings = new Array();
    for(var i  = 0; i < wMatrix.length; i++){
        var ratingDifference = scoresDifference[i]/2;
        var indexTeamWin = wMatrix[i].indexOf(1);
        var indexTeamLose = wMatrix[i].indexOf(-1);
        ratings[indexTeamWin] = ratingDifference;
        ratings[indexTeamLose] = -ratingDifference; 
    }
    return ratings;
}