/*
Least squares method to obtain be best rating given the score.
This function take the match matrix and scoresdifference array
to compute the nessary rating. The computation that takes place
here is X^t*X*r = X^t*y. Where X is a sparse matrix with 1 on 
on the place where a team wins and -1 on a place where a team loses,
the rest are zeros. y is the a scoredifference vector. 
To get the least squares solution the matrix is interved and multiplied
by the y vector.  
Input : wMatrix[160][40] Sparse matrix
        scores[160][2]
Output : rating[40][1]
*/
function leastSquares(wMatrix,scores){
        // calculate score difference
        var scoresarray = calculateScoreDifference(scores);
        
        // transpose match matrix to obtain wtranpose for calculation.
        var wTranspose = math.transpose(wMatrix);
        
        // Create a matrix object to obtain size easily and get the value of the matrix again to obtain the array.
        wTranspose = math.matrix(wTranspose);
        var size = wTranspose.size();
        var wTransposeArray = wTranspose.valueOf();
        
        // Multiply the Wtranspose with the scoresarray to obtain the yvector
        var yVector = math.multiply(wTranspose,scoresarray).valueOf();
        
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