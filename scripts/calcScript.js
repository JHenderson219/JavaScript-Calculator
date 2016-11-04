
$(document).ready(function() {
	var placeNumber = 0;
	var currentCalc = [];
	var calcIsReset = true;
	function resetCalc(){
		currentCalc = [];
		calcIsReset = true;
		$("#calcScreen").empty().append(0);
	};
	function numberClicked(num){
	if (calcIsReset === true){
		$("#calcScreen").empty().append(num).addClass("text-right");
			currentCalc.push(num);
			calcIsReset = false;
	} else if (calcIsReset === false){
		$("#calcScreen").append(num);
		currentCalc.push(num);
		}
	}

	//Click Events for buttons.
	$("#btnClear").click(function(){
		resetCalc();
	});
	$("#btn7").click(function(){
		numberClicked(7);
	});
	$("#btn8").click(function(){
		numberClicked(8);
	});
	$("#btn9").click(function(){
		numberClicked(9);
	});
	/*$("#btnDivide").click(function(){  //DIVIDE IS HERE
	});*/
	$("#btn4").click(function(){
		numberClicked(4);
	});
	$("#btn5").click(function(){
		numberClicked(5);
	});
	$("#btn6").click(function(){
		numberClicked(6);
	});
	/*$("#btnTimes").click(function(){  //TIMES IS HERE
	});*/
	$("#btn1").click(function(){
		numberClicked(1);
	});
	$("#btn2").click(function(){
		numberClicked(2);
	});
	$("#btn3").click(function(){
		numberClicked(3);
	});
	/*$("#btnMinus").click(function(){  //MINUS IS HERE
	});*/
	$("#btn0").click(function(){
		numberClicked(0);
	})
	/*$("#btnPeriod").click(function(){  //PERIOD IS HERE
	});*/
	/*$("#btnPlus").click(function(){  //PLUS IS HERE
	});*/
	/*$("#btnEquals").click(function(){  //EQUALS IS HERE
	});*/
});
