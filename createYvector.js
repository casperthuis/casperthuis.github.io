function createYvector(wTranspose, scoresarray){
	var size = wTranspose.size();
    var wTransposeArray = wTranspose.valueOf();
        //console.log(wTranspose.valueOf());

        console.log(wTransposeArray[0])
        console.log(scoresarray)
        var sum = 0;
        yVector = new Array();
        for(var i = 0; i < size[0];i++){
            for(var j = 0;j < scoresarray.length;j++){
                //console.log(j);
                //console.log(wTransposeArray[i][j])
                //console.log(scoresarray[j])
                sum = sum + wTransposeArray[i][j]*scoresarray[j];
            }
            yVector[i] = sum;
            sum = 0;   
        }
        console.log(yVector);

}