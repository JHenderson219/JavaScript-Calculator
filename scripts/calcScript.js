$(document).ready(function() {
	var clickNumber = 0;
	var currentCalc = [];
	//Make generic "clicked" functions for numebers and operators, then call them on click events with jQuery.
	/*function numberClicked(num){
		if (clickNumber===0){
			$("#calcScreen").empty().append(num).addClass("text-right");
			currentCalc.push(num);
			clickNumber++;
		} else if (clickNumber > 0){
			$("#calcScreen").append(num);
			currentCalc.push(num);
			clickNumber++;
		}
	}*/

	$("#btn7").on('click',function(){
		if (clickNumber===0){
			$("#calcScreen").empty().append(7).addClass("text-right");
			currentCalc.push(7);
			clickNumber++;
		} else if (clickNumber > 0){
			$("#calcScreen").append(7);
			currentCalc.push(7);
			clickNumber++;
		}
	});

});