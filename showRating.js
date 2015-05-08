function showRating(teamNames){
	for(i = 0; i < teamNames.length; i++){
        var node = document.createElement("LI");
        var textNode = document.createTextNode(teamNames[i]);
        node.appendChild(textNode);
        var ratingNode = document.createTextNode(" " + Math.round(ratings[i]*10)/10);
        node.appendChild(ratingNode);
        document.getElementById("list").appendChild(node);
    } 
}