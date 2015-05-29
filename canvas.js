function canvas(height,width,border, radius,ratings){
	this.heightOfCanvas = height;
	this.widthOfCanvas = width;
	this.borderOfCanvas = border;
	this.LineHeight = this.widthOfCanvas-border;
	this.radiusOfCircles = radius;
	this.colorSpectrum = d3.scale.category20();
	this.currentRating = ratings;
	this.canvas = d3.select("#window")
					.append("svg")
              		.attr("width", width)
              		.attr("height", height);


	this.createLines = function(i){
		

		var lineHeight = this.heightOfCanvas-border

		group = this.canvas.append("g")
            .attr("height", this.heightOfCanvas)
            .attr("width", this.widthOfCanvas)
            .attr("transform", "translate("+100*i+",0)");

        
        /*          
		group.transition()
  				.attr("transform", "translate("10*i+",0)")
  				.delay(500);
  		*/

  				

		var line = group.append("line")
		                .attr("y1", this.borderOfCanvas+20)
		                .attr("x1", this.LineHeight/2)
		                .attr("y2", this.borderOfCanvas+20)
		                .attr("x2", this.LineHeight/2)
		                .attr("stroke-width", 3)
		                .attr("stroke","dimgray")
		                .attr("stroke-dasharray", 5, 5)
		                .transition()
		                .delay(500)
		                .duration(1000)
		                .attr("y1", this.borderOfCanvas+20)
		                .attr("x1", this.borderOfCanvas)
		                .attr("y2", this.borderOfCanvas+20)
		                .attr("x2", this.LineHeight);

		           
		var line = group.append("line")
			            .attr("y1", this.borderOfCanvas)
			            .attr("x1", this.LineHeight/2)
			            .attr("y2", this.borderOfCanvas+40)
			            .attr("x2", this.LineHeight/2)
			            .attr("stroke-width", 3)
			            .attr("stroke","dimgray")
			            .transition()
		                .delay(500)
		                .duration(1000)
		                .attr("y1", this.borderOfCanvas)
			            .attr("x1", this.borderOfCanvas)
			            .attr("y2", this.borderOfCanvas+40)
			            .attr("x2", this.borderOfCanvas);  

		var line = group.append("line")
			            .attr("y1", this.borderOfCanvas)
			            .attr("x1", this.LineHeight/2)
			            .attr("y2", this.borderOfCanvas + 40)
			            .attr("x2", this.LineHeight/2)
			            .attr("stroke-width", 3)
			            .attr("stroke","dimgray")
			            .transition()
		                .delay(500)
		                .duration(1000)
		                .attr("y1", this.borderOfCanvas)
			            .attr("x1", this.LineHeight)
			            .attr("y2", this.borderOfCanvas + 40)
			            .attr("x2", this.LineHeight);

	}

	this.createAxis = function(ratings){

		var axisScale = d3.scale.linear()
                          .domain([d3.min(ratings), d3.max(ratings)])
                          .range([this.borderOfCanvas, this.widthOfCanvas-this.borderOfCanvas]); 

        var xAxis = d3.svg.axis()
        			.ticks("30")
                   .scale(axisScale);

		var xAxisGroup = group.append("g")
  							.attr("heigt", this.heightOfCanvas)

  							.attr("transform", "translate(0,"+(this.heightOfCanvas-20)+")")
                            .style({ 'stroke': 'dimgrey', 'fill': 'none', 'stroke-width': '1px'})
                            .call(xAxis);	
	}

	this.createRatingCircles = function(ratings, opponents,teamNames, teamName){

		var teamIndex = teamNames.indexOf(teamName);
		radius = this.radiusOfCircles;
		colorSpectrum = d3.scale.category20();  
		console.log(teamIndex)
		var div = d3.select("body")
  					.append("div")  // declare the tooltip div 
  					.attr("class", "tooltip") // apply the 'tooltip' class
  					.style("opacity", 0); 

		var linearScale = d3.scale.linear()
                    .domain([d3.min(ratings), d3.max(ratings)])
                    .range([this.radiusOfCircles*2, this.LineHeight-this.radiusOfCircles]);

		for (var i = 0; i < ratings.length; i++) {
  			ratings[i] = linearScale(ratings[i]);
		}

		
		circles = group.selectAll("circle")
    				.data(ratings)
  					.enter()
  					.append("circle")
    					.attr("fill", function(d,i) 
    						{
    							if(	$.inArray(i, opponents) != -1 || i == teamIndex)
									{	
										return  colorSpectrum(i);} 
    							else 
    								{ return "dimgrey";} 
    						})
    					.attr("stroke","black")
    					.attr("cy", (this.borderOfCanvas) + 20)
    					.attr("opacity",function(d,i) 
    						{
    							if(	$.inArray(i, opponents) != -1 || i == teamIndex)
									{	
										return  0.9;} 
    							else 
    								{ return 0.2;} 
    						})
    					.attr("cx", this.LineHeight/2)
    					.attr("r", function(d,i)
						{
							if(i == teamIndex){
								return radius*2;
							}else{
								return radius;
							}
						})
				    	.on("mouseover", function(d,i) {      
				            div.transition()        
				            .duration(200)      
				            .style("opacity", .9);      
				            div .html(teamNames[i])  
				            .style("left", (d3.event.pageX) + "px")     
				            .style("top", (d3.event.pageY ) + "px");    
				        })
				    .on("mouseout", function(d,i) {
				        div.transition()
				        .duration(500)
				        .style("opacity", 0);
				    })         
				    .transition().attr("cx", function(d) 
				    	{return d })
				    .delay(500)
				    .duration(2000); 
	/*
	var text = group.selectAll("text")
                        .data(ratings)
                        .enter()
                        //.append("g")
                        .append("text")
                        .attr("x", this.LineHeight/2)
                		.attr("y", (this.borderOfCanvas) + 40);

     x =    -(this.widthOfCanvas/2);        		
     y = 	this.borderOfCanvas+50;
	var textLabels = text
                
                .text( function(d,i){
                  //if(	$.inArray(i, opponents) != -1)
					//				{
					console.log(i);
					console.log(teamNames[i]);	
										return  teamNames[i];//} 
   
    			})
         
                .attr("font-family", "sans-serif")
                .attr("font-size", "10px")
                .attr("fill", "black")
                
                //.transition()
                .attr("x", function(d) {return d })
                .attr("transform", function(d){

                	return "translate("+x+","+y+") rotate(10)";
                });
                //.delay(500)
				//.duration(2000); 
	*/
	}


	this.scaleLineOnTeamOpponents = function(teamIndex, opponents){
		var ratings = this.currentRating;
		console.log(ratings);

		
		var opponentsRatings = new Array();
		for(var i = 0; i < opponents.length ;i++){
			opponentsRatings[i] = ratings[opponents[i]];
		}
		console.log(opponentsRatings);

		var linearScale = d3.scale.linear()
                    .domain([d3.min(opponentsRatings), d3.max(opponentsRatings)])
                    .range([this.radiusOfCircles*2, this.LineHeight-this.radiusOfCircles]);

		for (var i = 0; i < ratings.length; i++) {
  			ratings[i] = linearScale(ratings[i]);
		}

		radius = this.radiusOfCircles; 
		colorSpectrum = d3.scale.category20();  
		
			group.selectAll("circle")
				.data(ratings)
				.transition()
				.duration(1000)
				.attr("cx", function(d){ return d})
				.attr("fill", function(d,i) 
    						{
    							if(	$.inArray(i, opponents) != -1 || i == teamIndex)
									{	
										return  colorSpectrum(i);
									} 
    							else 
    								{ return "dimgrey";} 
    						})
				.attr("opacity",function(d,i) 
    						{
    							if($.inArray(i, opponents) != -1 || i == teamIndex)
									{	
										return  0.9;} 
    							else 
    								{ return 0.2;} 
    						})
				.attr("r", function(d,i)
					{
						if(i == teamIndex){
							return radius*2;
						}else{
							return radius;
						}
					});

	}


	this.drawMatchLine = function(teamIndex, opponents){
		this.canvas = group.append("line")
		var ratings = this.currentRating;
		

		console.log("niks");

		ratingUnscaled = this.currentRating
		console.log(ratingUnscaled)
		var opponentsRatings = new Array();

		for(var i = 0; i < opponents.length ;i++){
			opponentsRatings[i] = ratings[opponents[i]];
		}
		

		var linearScale = d3.scale.linear()
                    .domain([d3.min(opponentsRatings), d3.max(opponentsRatings)])
                    .range([this.radiusOfCircles*2, this.LineHeight-this.radiusOfCircles]);

		for (var i = 0; i < ratings.length; i++) {
  			ratings[i] = linearScale(ratings[i]);
		}

		groupOfLineVertical = group.append("g");

		groupOfLineVertical.selectAll("line")
					.data(opponentsRatings)
					.enter()
					.append("line")
					.attr("y1", this.borderOfCanvas+this.radiusOfCircles*3)

		            .attr("x1", function(d){
		            	return d
		            })
		            .attr("x2", function(d){
		            	return d
		            })
		            .attr("y2", function(d,i){
		            	return (50)+ 30*i;
		            })
		            .attr("stroke-width", 3)
			        .attr("stroke","dimgray")
			        .attr("opacity", 0.6)
			        
		groupOfLineHorizontal = group.append("g")  

		groupOfLineHorizontal.selectAll("line")
									.data(opponentsRatings)
									.enter()
									.append("line")
									.attr("y1", function(d,i){
										return (50)+ 30*i;
									})
						       		.attr("x1", function(d){
						            	return ratings[teamIndex];
						            })
									.attr("x2", function(d){
						            	return d;
						            })
						            .attr("y2", function(d,i){
						            	return (50)+ 30*i;
						            })
						            .attr("stroke-width", 3)
							        .attr("stroke","dimgray")
							        .attr("stroke-dasharray", 2, 2)
							        .attr("opacity", 0.6);

		groupOfLineHorizontal.selectAll("text")
							.data(opponentsRatings)
							.enter()
							.append("text")
							.text(function(d){
								//return ratings[teamIndex] - d;
								return Math.floor(d);
							})
							.attr("y", function(d,i){
						            	return (50)+ 30*i;
						            })
							.attr("x", function(d){
								return (ratings[teamIndex] + d)/2;
							})
							.attr("fill", "black");		        

		groupOfLineVertical
			        .append("line")
		       		.attr("y1", this.borderOfCanvas+this.radiusOfCircles*4)
		       		.attr("x1", function(){
		            	return ratings[teamIndex];
		            	console.log(ratings[teamIndex])
		            })
					.attr("x2", function(){
		            	return ratings[teamIndex];
		            })
		            .attr("y2", 280)
		            .attr("stroke-width", 3)
			        .attr("stroke","dimgray")
			        .attr("opacity", 0.6)
		




	}




	this.updateCircles = function(ratings){
    	


		var linearScale = d3.scale.linear()
                    .domain([d3.min(ratings), d3.max(ratings)])
                    .range([this.radiusOfCircles*2, this.LineHeight-this.radiusOfCircles]);

		for (var i = 0; i < ratings.length; i++) {
  			ratings[i] = linearScale(ratings[i]);
		}

     	group.selectAll("circle")
              .data(ratings)
              .transition()
              .duration(1000)
 			  .delay(1000)	
              .attr("cx", function(d)  { return d });
              

	}

	this.updateCirclesColor = function(teamIndex, opponents){
		radius = this.radiusOfCircles; 
		colorSpectrum = d3.scale.category20();  
		console.log(teamIndex)
		group.selectAll("circle")
				.transition()
				.duration(1000)
				.attr("fill", function(d,i) 
    						{
    							if(	$.inArray(i, opponents) != -1 || i == teamIndex)
									{	
										return  colorSpectrum(i);
									} 
    							else 
    								{ return "dimgrey";} 
    						})
				.attr("opacity",function(d,i) 
    						{
    							if($.inArray(i, opponents) != -1 || i == teamIndex)
									{	
										return  0.9;} 
    							else 
    								{ return 0.2;} 
    						})
				.attr("r", function(d,i)
					{
						if(i == teamIndex){
							return radius*2;
						}else{
							return radius;
						}
					});
	}

	this.fullTournamentAnimation = function(tournament){
		
		var roundMatrix = new Array();
		for(var i = 1; i < tournament.numberOfRounds+1; i++){
			var wMatrix = tournament.createWMatrixWithRounds(i);
			var sMatrix = tournament.createSMatrixWithRounds(i);
			if(i == 1){

				var ratings = leastSquaresNoInterdependance(wMatrix,sMatrix);
			}else{
				var ratings = leastSquares(wMatrix, sMatrix);
			}
			var linearScale = d3.scale.linear()
                    .domain([d3.min(ratings), d3.max(ratings)])
                    .range([this.radiusOfCircles*2, this.LineHeight-this.radiusOfCircles]);

			for (var j = 0; j < ratings.length; j++) {
  				ratings[j] = linearScale(ratings[j]);
			}		

			roundMatrix[roundMatrix.length] = ratings;	
		
		}	

		

		console.log(roundMatrix)
		
		var counter = 0
		group.selectAll("circle")
				.transition()
				.attr("cx", 0)
				.duration(2000)
				.each("end", function(){
					console.log("in")
					d3.selectAll("circle")
					.data(roundMatrix[counter])
					.transition()
					.attr("cx", function(d){return d})
					.duration(1000)
					.each("end", next(counter+1))
				});
		
		function next(counter){
						d3.selectAll("circle")
						.data(roundMatrix[counter])
						.transition()
						.attr("cx", function(d){return d})
						.duration(1000)
		}					

		function repeat(roundMatrix, counter, maxrounds){
			if(counter == maxrounds-1){
				console.log("out")
				return;
			}
			counter++;
			console.log(roundMatrix[counter]);
			console.log(counter);
			d3.selectAll("circle")
			.data(roundMatrix[counter])
			.transition()
			.attr("cx", function(d){return d})
			.duration(1000)
			.each("end", repeat(roundMatrix, counter, maxrounds));	

		}		
				//.each(this.repeat(roundMatrix ,counter-1));
				//.each("start", this.repeat(roundMatrix, counter-1));

				
				/*
				
			
		}*/

	}

	
	this.repeat = function(roundMatrix, counter){

					
					/*
					if(counter < 1){
						d3.selectAll("circle")
						.data(roundMatrix[counter])
						.transition()
						.attr("cx", function(d)  { return d })
						.delay(2000)
						.duration(2000);	
					}else{
					console.log(counter)
					d3.selectAll("circle")
					.data(roundMatrix[counter])
					.transition()
					.attr("cx", function(d)  { return d })
					.delay(2000)
					.duration(2000)
					.each("end", this.repeat(roundMatrix,counter-1));
				}
				*/
	};
	
	this.copyGroup = function(){
		i = 1
		this.createLines();
		this.createRatingCircles(i);

	}

}