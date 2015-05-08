/*
Least squares method to obtain be best rating given the score.
This function take the match matrix and scoresdifference array
to compute the nessary rating.
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
        
        // My own matrix multiplication because of the dimesions that do not match of the match matrix and the scoresarray. The problem is that transpose function doenst work on 1d arrays hence the multiplication needs to be preform by this function.
        var sum = 0;
        yVector = new Array();
        for(var i = 0; i < size[0]-1;i++){
            for(var j = 0;j < scoresarray.length;j++){
                sum = sum + wTransposeArray[i][j]*scoresarray[j];
            }
            yVector[i] = sum;
            sum = 0;   
        }
        

        // mulitply match matrix with its transpose to obtain x.
        var xMatrix = math.multiply(wTranspose, wMatrix);    
        // Change last element in 0
        yVector[yVector.length] = 0;
    
        
        // add a rows of one to the last row.
        xMatrix = xMatrix.valueOf(); 
        for(var i = 0; i < size[0];i++){
            xMatrix[(size[0]-1)][i] = 1;
        }
        
        // The least squares method by inv(x)*y one would get the best solution. return the solution.
        inv = math.inv(xMatrix);
        return math.multiply(inv,yVector);

    };