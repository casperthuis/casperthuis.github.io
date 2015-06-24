function canvas(height,width,border, radius,ratings){
	this.heightOfCanvas = height;
	this.widthOfCanvas = width;
	this.borderOfCanvas = border;
	this.LineHeight = this.widthOfCanvas-border;
	this.radiusOfCircles = radius;
	//this.colorSpectrum = ["#393b79","#5254a3","#6b6ecf","#9c9ede","#637939","#8ca252","#b5cf6b","#cedb9c","#8c6d31","#bd9e39","#e7ba52","#e7cb94","#843c39","#ad494a","#d6616b","#e7969c","#7b4173","#a55194","#ce6dbd","#de9ed6"];
	this.colorSpectrum = ["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#d6616b","#bcbd22","#17becf"]
	this.currentRating = ratings.slice();
	this.canvas = d3.select("#window")
					.append("svg")
              		.attr("width", width)
              		.attr("height", height);
    this.spacingOfLines = height/10;          		
    this.duration = 1000;
    this.delay = 1000;
    this.errors
    this.scores
    this.opponentsRatings
	this.createLines = function(i){
		

		var lineHeight = this.heightOfCanvas-border

		group = this.canvas.append("g")
            .attr("height", this.heightOfCanvas)
            .attr("width", this.widthOfCanvas)
            .attr("transform", "translate("+100*i+",0)");

        
                
		group.attr("transform", "translate(0,20)")
  		

  				

		var line = group.append("line")
		                .attr("y1", this.borderOfCanvas+20)
		                .attr("x1", this.LineHeight/2)
		                .attr("y2", this.borderOfCanvas+20)
		                .attr("x2", this.LineHeight/2)
		                .attr("stroke-width", 3)
		                .attr("stroke","dimgray")
		                .attr("stroke-dasharray", 5, 5)
		                .transition()
		                .duration(this.duration)
						.delay(this.delay)
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
		                .duration(this.duration)
						.delay(this.delay)
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
		                .duration(this.duration)
						.delay(this.delay)
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
		var max = d3.min(ratings);
		var min = d3.max(ratings);
		var radius = this.radiusOfCircles;
		var colorSpectrum = this.colorSpectrum; 
		 
		var div = d3.select("body")
  					.append("div")  // declare the tooltip div 
  					.attr("class", "tooltip") // apply the 'tooltip' class
  					.style("opacity", 0); 

  		

  		var scale = this.scaleRatings(ratings, min, max);

  		var players = opponents.slice();
  		players.unshift(teamIndex);
  		
		circles = group.selectAll("circle")
    				.data(scale)
  					.enter()
  					.append("circle")
    					.attr("fill", function(d,i) 
    						{
    							if(	$.inArray(i, players) != -1)
									{	
										var position = players.indexOf(i)
										return  colorSpectrum[position];}
								else if( i == teamIndex){
									return colorSpectrum[colorSpectrum.length-1]
								}		 
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
				    .duration(this.duration)
					.delay(this.delay)
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

	this.createLegend = function(opponents, teamNames, teamIndex, ranks){
		
		//opponents.sort(function(a, b){return a-b})
		var colorSpectrum = this.colorSpectrum;

		var players = opponents.slice();
  		players.unshift(teamIndex);
  		
		legend = this.canvas
					.append("g")
					.attr("class", "legend")
					.attr("height", 20)
					.attr("width", this.widthOfCanvas)
					.attr("transform","translate("+40+","+10+")");
		
		/*			
		legend.append("rect")			
				.attr("x", 0)
				.attr("y", 0)
				.attr("width", 200)
				.attr("height", 230)
				.attr("fill", "white")
				.attr('stroke', 'black')
    			.attr('stroke-dasharray', '10,5')
				.attr("stroke-width", 1);
		*/		
		legend.selectAll("circle")
				.data(players)
				.enter()
				.append("circle")
				.attr("cy", 0)
				.attr("cx", function(d,i){

					return (1500/10)*i;
				})
				.attr("stroke", "black")
				//.attr("cx", 10)
				//.attr("cy", function(d,i ){
					
				//	var startHeight = 400 + 20*i;
				//	var offset = 10+30*i
				//		return  offset;
				//})
				.attr("r", 8)
				.attr("fill", function(d,i){

					return colorSpectrum[i];
				})	

		legend.selectAll("text")
				.data(players)		
				.enter()
				.append("text")
				.attr("y", 5)
				.attr("x", function(d,i){
					return 15+(1500/10)*i;
				})
				//.attr("x", 30)
      			//.attr("y", function(d,i ){
				//	var offset = 14+ 30*i
				//	return  offset;
				//})
				.text(function(d,i){
					
					return teamNames[d] + "  : " +ranks[d];
				})

	}

	this.updateLegend = function(opponents, teamNames, teamIndex, ranks){
		
	

		var players = opponents.slice();
  		players.unshift(teamIndex);
  		
		var colorSpectrum = this.colorSpectrum;
		
		legend.selectAll("circle")
				.data(players)
				.enter()
				.append("circle")
				.attr("cy", 0)
				.attr("cx", function(d,i){

					return (1500/10)*i;
				})
				.attr("stroke", "black")
				//.attr("cx", 10)
				//.attr("cy", function(d,i ){
					
				//	var startHeight = 400 + 20*i;
				//	var offset = 10+30*i
				//		return  offset;
				//})
				.attr("r", 8)
				.attr("fill", function(d,i){
					return colorSpectrum[i];
				})	

		legend.selectAll("text")
				.data(players)		
				.enter()
				.append("text")
				.attr("y", 5)
				.attr("opacity", 0)
				.attr("x", function(d,i){
					return 15+(1500/10)*i;
				})
				//.attr("x", 30)
      			//.attr("y", function(d,i ){
				//	var offset = 14+ 30*i
				//	return  offset;
				//})
				.text(function(d,i){
					
					return teamNames[d] + "  : " +ranks[d];
				});	


		legend.selectAll("circle")
				.data(players)
				.transition()
				.delay(this.delay)
				.duration(this.duration)
				.attr("fill", function(d,i){
					
					return colorSpectrum[i];
				});

				// Opacity toevogen


		legend.selectAll("text")
				.data(players)
				.transition()
				.duration(1000)		
				.attr("opacity",0)
				.transition()
				.delay(this.delay)
				.duration(this.duration)
				.attr("opacity", 1)
				.text(function(d,i){
					return teamNames[d] + ": " +ranks[d];
				})

		legend.selectAll("text")
			.data(players)					
			.exit()
		    .transition().duration(this.duration)
			.attr("opacity", 0).transition().remove();

		legend.selectAll("circle")
			.data(players)					
			.exit()
		    .transition().duration(this.duration)
			.attr("opacity", 0).transition().remove();							

	}

	this.scaleRatings = function(ratingsUnscaled, min, max){


		var ratingsScaled = new Array();
		var linearScale = d3.scale.linear()
                    .domain([max, min])
                    .range([this.radiusOfCircles*2, this.LineHeight-this.radiusOfCircles]);

		for (var i = 0; i < ratingsUnscaled.length; i++) {
  			ratingsScaled[i] = linearScale(ratingsUnscaled[i]);
		}
		return ratingsScaled
	}


	this.scaleLineOnTeamOpponents = function(teamIndex, opponents){
		
		var ratings = this.currentRating;
		var opponentsRatings = new Array();
		for(var i = 0; i < opponents.length ;i++){
			opponentsRatings[i] = ratings[opponents[i]];
		}
		var ratingsScaled = this.scaleRatings(ratings, d3.min(opponentsRatings), d3.max(opponentsRatings));
		var radius = this.radiusOfCircles; 
		var colorSpectrum = d3.scale.category20();  
		
			group.selectAll("circle")
				.data(ratingsScaled)
				.transition()
				.duration(this.duration)
				.delay(this.delay)
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

	

	this.calculatedScoreDifferenceInRating = function(teamIndex , scoresDifference){
		var ratings = this.currentRating; 
		var ratingsOfScores = new Array();
		
		for(var i = 0; i < scoresDifference.length; i++){
		
			ratingsOfScores[ratingsOfScores.length] =  ratings[teamIndex] - scoresDifference[i];
		}
		return ratingsOfScores
	}

	this.drawMatchLines = function(teamIndex, opponents, scoresDifference){
		var max = d3.min(ratings);
		var min = d3.max(ratings);
		

		var opponentsRatings = new Array();
		var opponentsRatingsScaled = new Array();

		for(var i = 0; i < opponents.length ;i++){
			opponentsRatings[i] = ratings[opponents[i]];
		}

		this.opponentsRatings = opponentsRatings;
		var ratingsOfScores = this.calculatedScoreDifferenceInRating(teamIndex, scoresDifference);
		this.scores = ratingsOfScores;
		var errors = this.calculatedError(ratingsOfScores, opponentsRatings,teamIndex);
		this.errors = errors;
		var ratingsScaled = this.scaleRatings(ratings, min, max);
		
		for(var i = 0; i < opponents.length ;i++){
			opponentsRatingsScaled[i] = ratingsScaled[opponents[i]];
		}
		
		var scoreDifferenceScaled = this.scaleRatings(ratingsOfScores, min, max);
		
		var errorsScaled = this.scaleRatings(errors, min, max);
		
		this.DrawLineOfPickedTeam(ratingsScaled, teamIndex)

		this.DrawVerticalLinesOfOpponents(opponentsRatingsScaled)
		
		this.DrawRatingDifferenceLines(opponentsRatingsScaled, ratingsScaled, teamIndex, opponentsRatings)	        
		
		this.DrawScoreDifferenceLines(scoreDifferenceScaled,ratingsScaled, teamIndex, scoresDifference)        

		this.drawErrorLines(ratingsScaled, teamIndex, errorsScaled, errors, scoreDifferenceScaled, opponentsRatingsScaled)
		
	}

	this.calculatedError = function(ratingsOfScores, opponentsRatings, teamIndex){
		var ratings = this.currentRating; 
		var error = new Array();
		for(var i = 0; i < ratingsOfScores.length; i++){
			error[i] = ratingsOfScores[i] - opponentsRatings[i];
			error[i] = ratings[teamIndex] - error[i];
			
		}
		
		return error;
	}

	this.drawErrorLines = function(ratingsScaled, teamIndex, errorsScaled, errors, scoreDifferenceScaled,opponentsRatingsScaled){
		
		var scores = this.scores;
		var spacingOfLines = this.spacingOfLines;
		var ratings = this.currentRating;
		groupOfLineHorizontalError = this.canvas.append("g")  
		
		var div = d3.select("body")
  					.append("div")  // declare the tooltip div 
  					.attr("class", "tooltiplines") // apply the 'tooltip' class
  					.style("opacity", 0); 		
  		var errorsScaled =	new Array();
 		var postionArray = new Array();			
  		for(var i = 0; i < scoreDifferenceScaled.length ;i++){
  			if(opponentsRatingsScaled[i] < ratingsScaled[teamIndex] && opponentsRatingsScaled[i] < scoreDifferenceScaled[i] && scoreDifferenceScaled[i] < ratingsScaled[teamIndex]){
  				errorsScaled[i] = opponentsRatingsScaled[i];
  				postionArray[i] = 1; 
  			}else if(opponentsRatingsScaled[i] < ratingsScaled[teamIndex] && opponentsRatingsScaled[i] > scoreDifferenceScaled[i]){
  				errorsScaled[i] = scoreDifferenceScaled[i];
  				postionArray[i] = 2;
  			}else if(opponentsRatingsScaled[i] < ratingsScaled[teamIndex] && scoreDifferenceScaled[i] > ratingsScaled[teamIndex]){
  				errorsScaled[i] = opponentsRatingsScaled[i];
  				postionArray[i] = 3;
  			}else if(opponentsRatingsScaled[i] > ratingsScaled[teamIndex] && opponentsRatingsScaled[i] < scoreDifferenceScaled[i]){
  				errorsScaled[i] = scoreDifferenceScaled[i];
  				postionArray[i] = 4;
  			}else if(opponentsRatingsScaled[i] > ratingsScaled[teamIndex] && opponentsRatingsScaled[i] > scoreDifferenceScaled[i] && scoreDifferenceScaled[i] > ratingsScaled[i]){
				errorsScaled[i] = opponentsRatingsScaled[i];
  				postionArray[i] = 5;
  			}else if(opponentsRatingsScaled[i] > ratingsScaled[teamIndex] && scoreDifferenceScaled[i] < ratingsScaled[teamIndex]){
  				errorsScaled[i] = scoreDifferenceScaled[i];
  				postionArray[i] = 6;
  			}
  		}

  		
  		console.log(postionArray)
		groupOfLineHorizontalError.selectAll("line")
									.data(errorsScaled)
									.enter()
									.append("line")
									.attr("x1",function(d,i){
											if(postionArray[i] == 1){
												return scoreDifferenceScaled[i];
											}else if(postionArray[i] == 2){
												return opponentsRatingsScaled[i];
											}else if(postionArray[i] == 3){
												return scoreDifferenceScaled[i];
											}else if(postionArray[i] == 4){
												return opponentsRatingsScaled[i];
											}else if(postionArray[i] == 5){
												return scoreDifferenceScaled[i];
											}else if(postionArray[i] == 6){
												return opponentsRatingsScaled[i];
											}
										}) 
									.attr("x2",function(d,i){
											if(postionArray[i] == 1){
												return scoreDifferenceScaled[i];
											}else if(postionArray[i] == 2){
												return opponentsRatingsScaled[i];
											}else if(postionArray[i] == 3){
												return scoreDifferenceScaled[i];
											}else if(postionArray[i] == 4){
												return opponentsRatingsScaled[i];
											}else if(postionArray[i] == 5){
												return scoreDifferenceScaled[i];
											}else if(postionArray[i] == 6){
												return opponentsRatingsScaled[i];
											}
										})  
									.attr("y1", function(d,i){
										
										if(postionArray[i] == 1){
											return (spacingOfLines*2+5)+ spacingOfLines*i;
										}else if(postionArray[i] == 2){
											return (spacingOfLines*2)+ spacingOfLines*i;
										}else if(postionArray[i] == 3){
											return (spacingOfLines*2+10)+ spacingOfLines*i;
										}else if(postionArray[i] == 4){
											return (spacingOfLines*2)+ spacingOfLines*i; 
										}else if(postionArray[i] == 5){
											return (spacingOfLines*2+10)+ spacingOfLines*i;
										}else if(postionArray[i] == 6){
											return (spacingOfLines*2+10)+ spacingOfLines*i;
										}
										
									})
									.attr("y2", function(d,i){
										
										if(postionArray[i] == 1){
											return (spacingOfLines*2+5)+ spacingOfLines*i;
										}else if(postionArray[i] == 2){
											return (spacingOfLines*2)+ spacingOfLines*i;
										}else if(postionArray[i] == 3){
											return (spacingOfLines*2+10)+ spacingOfLines*i;
										}else if(postionArray[i] == 4){
											return (spacingOfLines*2)+ spacingOfLines*i; 
										}else if(postionArray[i] == 5){
											return (spacingOfLines*2+10)+ spacingOfLines*i;
										}else if(postionArray[i] == 6){
											return (spacingOfLines*2+10)+ spacingOfLines*i;
										}
										
									})
									.attr("stroke-width", 5)
							        .attr("stroke","blue")
							        .attr("opacity", 0.4)
							        
							        	//ratingsScaled[teamIndex])
						            
						            .on("mouseover", function(d,i) {      
				            			div.transition()        
							            .duration(200)      
							            .style("opacity", .9);      
							            div .html("Error: " + Math.round(errors[i]) + "\n Score: " + Math.round(scores[i]) + "\n Rating: " + Math.round(ratings[i]))  
							            .style("left", (d3.event.pageX) + "px")     
							            .style("top", (d3.event.pageY ) + "px");    
							        	
							        	})
							    	.on("mouseout", function(d,i) {
								        
								        div.transition()
								        .duration(500)
								        .style("opacity", 0);
								        
							    	})
									.transition()
									.duration(this.duration)
									.delay(this.delay*3)
									.attr("x2", function(d){
						            	return d;
						            });

						            
						            
									/*
		groupOfLineHorizontalError.selectAll("text")
							.data(errorsScaled)
							.enter()
							.append("text")
							.text(function(d,i){
								var text =  errors[i]; 
								return math.round(text*10)/10;
							})
							.attr("y", function(d,i){
						            	return (spacingOfLines*2)+ spacingOfLines*i;
						            })
							.attr("x", function(d){
								return (ratingsScaled[teamIndex] + d)/2;
							})
							.attr("fill", "black");		
	*/
	}

	this.DrawScoreDifferenceLines = function(scoreDifferenceScaled,ratingsScaled, teamIndex, scoresDifference){
		var spacingOfLines = this.spacingOfLines;
		var scores = this.scores
		var errors = this.errors
		var spacingOfLines = this.spacingOfLines;
		var ratings = this.currentRating;
		var div = d3.select("body")
  					.append("div")  // declare the tooltip div 
  					.attr("class", "tooltiplines") // apply the 'tooltip' class
  					.style("opacity", 0); 

		groupOfLineHorizontalScores = this.canvas.append("g")  

		groupOfLineHorizontalScores.selectAll("line")
									.data(scoreDifferenceScaled)
									.enter()
									.append("line")
									.attr("y1", function(d,i){
										return (spacingOfLines*2+5)+ spacingOfLines*i;
									})
						       		.attr("x1", ratingsScaled[teamIndex])
									.attr("x2", ratingsScaled[teamIndex])
						            .attr("y2", function(d,i){
						            	return (spacingOfLines*2+5)+ spacingOfLines*i;
						            })
						            .attr("stroke-width", 5)
							        .attr("stroke","red")
							        .attr("opacity", 0.4)
							        .on("mouseover", function(d,i) {      
				            			div.transition()        
							            .duration(200)      
							            .style("opacity", .9);      
							            div .html("Error: " + Math.round(errors[i]) + "\n Score: " + Math.round(scores[i]) + "\n Rating: " + Math.round(ratings[i]))  
							            .style("left", (d3.event.pageX) + "px")     
							            .style("top", (d3.event.pageY ) + "px");    
							        	
							        	})
							    	.on("mouseout", function(d,i) {
								        
								        div.transition()
								        .duration(500)
								        .style("opacity", 0);
								        
							    	})
							        .transition()
									.duration(this.duration)
									.delay(this.delay*3)
									.attr("x2", function(d){
						            	return d;
						            });
		/*							
		groupOfLineHorizontalScores.selectAll("text")
							.data(scoreDifferenceScaled)
							.enter()
							.append("text")
							.text(function(d,i){
								var text =  scoresDifference[i]; 
								return math.round(text*10)/10;
							})
							.attr("y", function(d,i){
						            	return (spacingOfLines*2)+ spacingOfLines*i;
						            })
							.attr("x", function(d){
								return (ratingsScaled[teamIndex] + d)/2;
							})
							.attr("fill", "black");	
		*/						

	}
 
	this.DrawRatingDifferenceLines = function(opponentsRatingsScaled,ratingsScaled, teamIndex, opponentsRatings){
		var spacingOfLines = this.spacingOfLines;
		var errors = this.errors
		var spacingOfLines = this.spacingOfLines;
		var scores = this.scores
		var ratings = this.currentRating;
		var div = d3.select("body")
  					.append("div")  // declare the tooltip div 
  					.attr("class", "tooltiplines") // apply the 'tooltip' class
  					.style("opacity", 0); 
		groupOfLineHorizontalRating = this.canvas.append("g")  

		groupOfLineHorizontalRating.selectAll("line")
									.data(opponentsRatingsScaled)
									.enter()
									
									.append("line")
									.attr("y1", function(d,i){
										return (spacingOfLines*2)+ spacingOfLines*i;
									})
						       		.attr("x1", ratingsScaled[teamIndex])
									.attr("x2", ratingsScaled[teamIndex])
						            .attr("y2", function(d,i){
						            	return (spacingOfLines*2)+ spacingOfLines*i;
						            })
						            .attr("stroke-width", 5)
							        .attr("stroke","green")
							        .attr("opacity", 0.4)
							        .on("mouseover", function(d,i) {      
				            			div.transition()        
							            .duration(200)      
							            .style("opacity", .9);      
							            div .html("Error: " + Math.round(errors[i]) + "\n Score: " + Math.round(scores[i]) + "\n Rating: " + Math.round(ratings[i]))  
							            .style("left", (d3.event.pageX) + "px")     
							            .style("top", (d3.event.pageY ) + "px");    
							        	
							        	})
							    	.on("mouseout", function(d,i) {
								        
								        div.transition()
								        .duration(500)
								        .style("opacity", 0);
								        
							    	})
							        .transition()
									.duration(this.duration)
									.delay(this.delay*3)
									.attr("x2", function(d){
						            	return d;
						            });
									/*
		groupOfLineHorizontalRating.selectAll("text")
							.data(opponentsRatingsScaled)
							.enter()

							.append("text")
							.text(function(d,i){
								var text =  ratings[teamIndex] - opponentsRatings[i]; 
								return math.round(text*10)/10;
							})
							.attr("y", function(d,i){
						            	return (spacingOfLines*2)+ spacingOfLines*i;
						            })
							.attr("x", function(d){
								return (ratingsScaled[teamIndex] + d)/2;
							})
							.attr("fill", "black");
							*/
	}


	this.DrawVerticalLinesOfOpponents = function(opponentsRatingsScaled){

		var spacingOfLines = this.spacingOfLines;
		groupOfLineVertical = this.canvas.append("g");

		groupOfLineVertical.selectAll("line")
					.data(opponentsRatingsScaled)
					.enter()
					.append("line")
					.attr("y1", this.borderOfCanvas+this.radiusOfCircles*3)

		            .attr("x1", function(d){
		            	return d
		            })
		            .attr("x2", function(d){
		            	return d
		            })
		            .attr("y2", this.borderOfCanvas+this.radiusOfCircles*3)
		            .attr("stroke-width", 3)
			        .attr("stroke","dimgray")
			        .attr("stroke-dasharray", 3, 3)
			        .attr("opacity", 0.5)
			        .transition()
			        .delay(this.duration)
			        .duration(this.delay*2)
			        .attr("y2", function(d,i){
		            	return (spacingOfLines*2)+ spacingOfLines*i;
		            });

		     	    

	}


	this.DrawLineOfPickedTeam = function(ratingsScaled, teamIndex){
		

		groupOfLineVerticalTeamPicked = this.canvas.append("g");

	
		groupOfLineVerticalTeamPicked.selectAll("line")
									.data([ratingsScaled[teamIndex]])
									.enter()
									.append("line")
									.attr("y1", this.borderOfCanvas+this.radiusOfCircles*4)
									.attr("x1", function(d){
		            					return d;
						            })
									.attr("x2", function(d){

						            	return d;
						            })
						            .attr("y2", this.borderOfCanvas+this.radiusOfCircles*4)
						            .attr("stroke-width", 3)
							        .attr("stroke","dimgray")
							        .attr("stroke-dasharray", 3, 3)
							        .attr("opacity", 0.5)
							        .transition()
							        .delay(this.duration)
							        .duration(this.delay*2)
							        .attr("y2", this.heightOfCanvas);
		       
	}



	this.updateCanvas = function(ratings, teamIndex, opponents, scoresDifference, teamNames, ranks){
		/* Creating varaibles*/
		var ratings = this.currentRating;
		var min = d3.min(ratings);
		var max = d3.max(ratings);
		var opponentsRatings = new Array();
		var opponentsRatingsScaled = new Array();
		// Obtain ratings of opponents
		for(var i = 0; i < opponents.length ;i++){
			opponentsRatings[i] = ratings[opponents[i]];
		}
		// Compute the  score difference and error in relative to the team that is picked 
		
		var ratingsOfScores = this.calculatedScoreDifferenceInRating(teamIndex, scoresDifference);
		var errors = this.calculatedError(ratingsOfScores, opponentsRatings, teamIndex);

		// Scale the ratings , errors and score difference
		var errorsScaled = this.scaleRatings(errors, max, min);
		var ratingsScaled = this.scaleRatings(ratings, max, min);
		var scoreDifferenceScaled = this.scaleRatings(ratingsOfScores, max, min);
			
		// Create a array of the scale ratings of the opponents
		for(var i = 0; i < opponents.length ;i++){
			opponentsRatingsScaled[i] = ratingsScaled[opponents[i]];
		}
		// update the groups of the canvas
		this.updateCircles(ratingsScaled, teamIndex, opponents);
		this.updateVerticalLines(ratingsScaled, opponentsRatingsScaled, teamIndex);
		this.updateHorizontalLines(opponentsRatingsScaled, scoreDifferenceScaled, errorsScaled,ratingsScaled, teamIndex);
		this.updateLegend(opponents, teamNames, teamIndex, ranks);
	}


	this.updateCircles = function(ratingsScaled){
		

     	group.selectAll("circle")
              .data(ratingsScaled)
              .transition()
              .duration(this.duration)
              .attr("cx", function(d)  {  return d }); 

        //this.updateLines(ratings, teamIndex, opponents, scoresDifference)      
	}


	this.updateVerticalLines = function(ratingsScaled, opponentsRatingsScaled, teamIndex){
		// Update the line of the team that is currently selected
		var spacingOfLines = this.spacingOfLines;

		

		groupOfLineVerticalTeamPicked.selectAll("line")
									.data([ratingsScaled[teamIndex]])
									.transition()
									.duration(this.duration)
			  						.delay(this.delay)
						       		.attr("x1", function(d){
						            	return d;
						            })
									.attr("x2", function(d){
						            	return d;
						            });


		groupOfLineVertical.selectAll("line")
					.data(opponentsRatingsScaled)
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
		            	return (spacingOfLines*2)+ spacingOfLines*i;
		            })	
		            .attr("stroke-width", 3)
			        .attr("stroke","dimgray")
			        .attr("stroke-dasharray", 3, 3)
			        .attr("opacity", 0)
			        .transition()
			        .duration(this.duration)
			        .attr("opacity",0.5);							
								
		// Update the line of opponents of the team that is currently selected
		groupOfLineVertical.selectAll("line")
							.data(opponentsRatingsScaled)
							.transition()
							.duration(this.duration)
			  				.delay(this.delay)
						    .attr("x1", function(d){
						        return d;
						    })
							.attr("x2", function(d){
						        return d;
						    });

		groupOfLineVertical.selectAll("line")
							.data(opponentsRatingsScaled)					
							.exit()
						    .transition().duration(this.duration)
							.attr("opacity", 0).transition().remove();				    
	}

	this.updateHorizontalLines = function(opponentsRatingsScaled, scoreDifferenceScaled, errorsScaled,ratingsScaled, teamIndex){
		

		var errorsScaled =	new Array();
 		var postionArray = new Array();			
  		var errorsScaled =	new Array();
 		var postionArray = new Array();			
  		for(var i = 0; i < scoreDifferenceScaled.length ;i++){
  			if(opponentsRatingsScaled[i] < ratingsScaled[teamIndex] && opponentsRatingsScaled[i] < scoreDifferenceScaled[i] && scoreDifferenceScaled[i] < ratingsScaled[teamIndex]){
  				errorsScaled[i] = opponentsRatingsScaled[i];
  				postionArray[i] = 1; 
  			}else if(opponentsRatingsScaled[i] < ratingsScaled[teamIndex] && opponentsRatingsScaled[i] > scoreDifferenceScaled[i]){
  				errorsScaled[i] = scoreDifferenceScaled[i];
  				postionArray[i] = 2;
  			}else if(opponentsRatingsScaled[i] < ratingsScaled[teamIndex] && scoreDifferenceScaled[i] > ratingsScaled[teamIndex]){
  				errorsScaled[i] = opponentsRatingsScaled[i];
  				postionArray[i] = 3;
  			}else if(opponentsRatingsScaled[i] > ratingsScaled[teamIndex] && opponentsRatingsScaled[i] < scoreDifferenceScaled[i]){
  				errorsScaled[i] = scoreDifferenceScaled[i];
  				postionArray[i] = 4;
  			}else if(opponentsRatingsScaled[i] > ratingsScaled[teamIndex] && opponentsRatingsScaled[i] > scoreDifferenceScaled[i] && scoreDifferenceScaled[i] > ratingsScaled[i]){
				errorsScaled[i] = opponentsRatingsScaled[i];
  				postionArray[i] = 5;
  			}else if(opponentsRatingsScaled[i] > ratingsScaled[teamIndex] && scoreDifferenceScaled[i] < ratingsScaled[teamIndex]){
  				errorsScaled[i] = scoreDifferenceScaled[i];
  				postionArray[i] = 6;
  			}
  		}
  		console.log(postionArray)

		var spacingOfLines = this.spacingOfLines;

		groupOfLineHorizontalScores.selectAll("line")
									.data(scoreDifferenceScaled)
									.enter()
									.append("line")
									.attr("y1", function(d,i){
										return (spacingOfLines*2+5)+ spacingOfLines*i;
									})
						       		.attr("x1", ratingsScaled[teamIndex])
									.attr("x2", ratingsScaled[teamIndex])
						            .attr("y2", function(d,i){
						            	return (spacingOfLines*2+5)+ spacingOfLines*i;
						            })
						            .attr("stroke-width", 5)
							        .attr("stroke","red")
							        .attr("opacity", 0.4)
							        .transition()
									.duration(this.duration)
									.delay(this.delay)
									.attr("x2", function(d){
						            	return d;
						            });

		groupOfLineHorizontalRating.selectAll("line")
									.data(opponentsRatingsScaled)
									.enter()
									
									.append("line")
									.attr("y1", function(d,i){
										return (spacingOfLines*2)+ spacingOfLines*i;
									})
						       		.attr("x1", ratingsScaled[teamIndex])
									.attr("x2", ratingsScaled[teamIndex])
						            .attr("y2", function(d,i){
						            	return (spacingOfLines*2)+ spacingOfLines*i;
						            })
						            .attr("stroke-width", 5)
							        .attr("stroke","green")
							        .attr("opacity", 0.4)
							        .transition()
									.duration(this.duration)
									.delay(this.delay)
									.attr("x2", function(d){
						            	return d;
						            });

		groupOfLineHorizontalError.selectAll("line")
									.data(errorsScaled)
									.enter()
									.append("line")
									.attr("x1",function(d,i){
											if(postionArray[i] == 1){
												return scoreDifferenceScaled[i];
											}else if(postionArray[i] == 2){
												return opponentsRatingsScaled[i];
											}else if(postionArray[i] == 3){
												return scoreDifferenceScaled[i];
											}else if(postionArray[i] == 4){
												return opponentsRatingsScaled[i];
											}else if(postionArray[i] == 5){
												return scoreDifferenceScaled[i];
											}else if(postionArray[i] == 6){
												return opponentsRatingsScaled[i];
											}
										}) 
									.attr("x2",function(d,i){
											if(postionArray[i] == 1){
												return scoreDifferenceScaled[i];
											}else if(postionArray[i] == 2){
												return opponentsRatingsScaled[i];
											}else if(postionArray[i] == 3){
												return scoreDifferenceScaled[i];
											}else if(postionArray[i] == 4){
												return opponentsRatingsScaled[i];
											}else if(postionArray[i] == 5){
												return scoreDifferenceScaled[i];
											}else if(postionArray[i] == 6){
												return opponentsRatingsScaled[i];
											}
										})  
									.attr("y1", function(d,i){
										
										if(postionArray[i] == 1){
											return (spacingOfLines*2+5)+ spacingOfLines*i;
										}else if(postionArray[i] == 2){
											return (spacingOfLines*2)+ spacingOfLines*i;
										}else if(postionArray[i] == 3){
											return (spacingOfLines*2+10)+ spacingOfLines*i;
										}else if(postionArray[i] == 4){
											return (spacingOfLines*2)+ spacingOfLines*i; 
										}else if(postionArray[i] == 5){
											return (spacingOfLines*2+10)+ spacingOfLines*i;
										}else if(postionArray[i] == 6){
											return (spacingOfLines*2+10)+ spacingOfLines*i;
										}
										
									})
									.attr("y2", function(d,i){
										
										if(postionArray[i] == 1){
											return (spacingOfLines*2+5)+ spacingOfLines*i;
										}else if(postionArray[i] == 2){
											return (spacingOfLines*2)+ spacingOfLines*i;
										}else if(postionArray[i] == 3){
											return (spacingOfLines*2+10)+ spacingOfLines*i;
										}else if(postionArray[i] == 4){
											return (spacingOfLines*2)+ spacingOfLines*i; 
										}else if(postionArray[i] == 5){
											return (spacingOfLines*2+10)+ spacingOfLines*i;
										}else if(postionArray[i] == 6){
											return (spacingOfLines*2+10)+ spacingOfLines*i;
										}
										
									})
									
									.attr("stroke-width", 5)
							        .attr("stroke","blue")
							        .attr("opacity", 0.4)
									.transition()
									.duration(this.duration)
									.delay(this.delay)
									.attr("x2", function(d){
						            	return d;
						            });							

		groupOfLineHorizontalRating.selectAll("line")
							.data(opponentsRatingsScaled)
							.transition()
							.duration(this.duration)
			  				.delay(this.delay)
						    .attr("x1", ratingsScaled[teamIndex])
							.attr("x2", function(d){
						        return d;
						    });				    											            

		groupOfLineHorizontalScores.selectAll("line")
									.data(scoreDifferenceScaled)
									.transition()
									.duration(this.duration)
			  						.delay(this.delay)
						    		.attr("x1", ratingsScaled[teamIndex])
									.attr("x2", function(d){
						        		return d;
						    		});	

		groupOfLineHorizontalError.selectAll("line")
									.data(errorsScaled)
									.transition()
									.duration(this.duration)
			  						.delay(this.delay)
						    		.attr("x1",function(d,i){
											if(postionArray[i] == 1){
												return scoreDifferenceScaled[i];
											}else if(postionArray[i] == 2){
												return opponentsRatingsScaled[i];
											}else if(postionArray[i] == 3){
												return scoreDifferenceScaled[i];
											}else if(postionArray[i] == 4){
												return opponentsRatingsScaled[i];
											}else if(postionArray[i] == 5){
												return scoreDifferenceScaled[i];
											}else if(postionArray[i] == 6){
												return opponentsRatingsScaled[i];
											}
										})
									.attr("y1", function(d,i){
										
										if(postionArray[i] == 1){
											return (spacingOfLines*2+5)+ spacingOfLines*i;
										}else if(postionArray[i] == 2){
											return (spacingOfLines*2)+ spacingOfLines*i;
										}else if(postionArray[i] == 3){
											return (spacingOfLines*2+10)+ spacingOfLines*i;
										}else if(postionArray[i] == 4){
											return (spacingOfLines*2)+ spacingOfLines*i; 
										}else if(postionArray[i] == 5){
											return (spacingOfLines*2+10)+ spacingOfLines*i;
										}else if(postionArray[i] == 6){
											return (spacingOfLines*2+10)+ spacingOfLines*i;
										}
										
									})
									.attr("y2", function(d,i){
										
										if(postionArray[i] == 1){
											return (spacingOfLines*2+5)+ spacingOfLines*i;
										}else if(postionArray[i] == 2){
											return (spacingOfLines*2)+ spacingOfLines*i;
										}else if(postionArray[i] == 3){
											return (spacingOfLines*2+10)+ spacingOfLines*i;
										}else if(postionArray[i] == 4){
											return (spacingOfLines*2)+ spacingOfLines*i; 
										}else if(postionArray[i] == 5){
											return (spacingOfLines*2+10)+ spacingOfLines*i;
										}else if(postionArray[i] == 6){
											return (spacingOfLines*2+10)+ spacingOfLines*i;
										}
										
									})	 
									.attr("x2", function(d){
						        		return d;
						    		});			

		groupOfLineHorizontalError.selectAll("line")
			.data(errorsScaled)					
			.exit()
		    .transition().duration(this.duration)
			.attr("opacity", 0).transition().remove();

		groupOfLineHorizontalRating.selectAll("line")
			.data(opponentsRatingsScaled)					
			.exit()
		    .transition().duration(this.duration)
			.attr("opacity", 0).transition().remove();
			
		groupOfLineHorizontalScores.selectAll("line")
			.data(scoreDifferenceScaled)					
			.exit()
		    .transition().duration(this.duration)
			.attr("opacity", 0).transition().remove();								    		
	}

	



	this.updateCircles = function(ratingsScaled,teamIndex, opponents){
		var radius = this.radiusOfCircles; 
		var colorSpectrum = this.colorSpectrum;
		var players = opponents.slice();

		var div = d3.select("body")
  					.append("div")  // declare the tooltip div 
  					.attr("class", "tooltip") // apply the 'tooltip' class
  					.style("opacity", 0); 

  		players.unshift(teamIndex);



  		circles = group.selectAll("circle")
    				.data(ratingsScaled)
  					.enter()
  					.append("circle")
    					.attr("fill", function(d,i) 
    						{
    							if(	$.inArray(i, players) != -1)
									{	
										var position = players.indexOf(i)
										return  colorSpectrum[position];
									}	 
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
				    .duration(this.duration)
					.delay(this.delay)

		group.selectAll("circle")
				.data(ratingsScaled)
				.on("mouseover", function(d,i) {      
				            div.transition()        
				            .duration(200)      
				            .style("opacity", .9);      
				            div.html(teamNames[i])  
				            .style("left", (d3.event.pageX) + "px")     
				            .style("top", (d3.event.pageY ) + "px");    
				        })
				.on("mouseout", function(d,i) {
				        div.transition()
				        .duration(500)
				        .style("opacity", 0);
				    })
				.transition()
				.duration(this.duration)
				.delay(this.delay)
				.attr("cx", function(d)  {  return d })
				.attr("fill", function(d,i) 
    						{
    							if(	$.inArray(i, players) != -1)
									{	
										var position = players.indexOf(i)
										return  colorSpectrum[position];
									}		 
    							else 
    								{ return "dimgrey";} 
    						})
				.attr("opacity",function(d,i) 
    						{
    							if($.inArray(i, players) != -1 )
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

			group.selectAll("circle")
			.data(ratingsScaled)					
			.exit()
		    .transition().duration(this.duration)
			.attr("opacity", 0).transition().remove();			



	}

	this.fullTournamentAnimation = function(tournament){
		var rating = currentRating;
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

		
		var counter = 0
		group.selectAll("circle")
				.transition()
				.attr("cx", 0)
				.duration(2000)
				.each("end", function(){
					
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
				
				return;
			}
			counter++;
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