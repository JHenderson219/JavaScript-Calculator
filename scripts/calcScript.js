
$(document).ready(function() {
	var placeNumber = 0;
	var currentNum = "";
	var currentCalc = [];
	var consolidatedCalc = [];
	var calcIsReset = true;
	var operators = /[+-/*]/gi;
	var decimal = /./gi;
	function resetCalc(){
		currentCalc = [];
		consolidatedCalc =[];
		currentNum = "";
		calcIsReset = true;
		$("#calcScreen").empty().append(0);
	}
	function numberClicked(num){
	if (calcIsReset === true){
		$("#calcScreen").empty().append(num).addClass("text-right");
			currentNum = num.toString();
			calcIsReset = false;
			console.log(currentNum);
	} else if (calcIsReset === false){
		$("#calcScreen").append(num);
		currentNum.concat(num.toString);
		console.log(currentNum);
		}
	}
	function operatorClicked(op){
		$("calcScreen").empty().append(0).addClass("text-right");
		currentCalc = op;
		calcIsReset = true;
	}
	function runCalc(){
		var consolidator = [];
		for (var i=0; i<currentCalc.length; i++){
		}
	}
	/*function runCalc(){ //OLD DUMB runCalc!!!
		var  consolidator = [];
		for (var i=0; i<currentCalc.length; i++){
			if (typeof currentCalc[i] === "number" && i===0){
				consolidator.push(currentCalc[i]);
				console.log("Is number and zero! Pushed "+currentCalc[i]+"!")
			} else if (currentCalc[i]===operators && i===0){
				consolidator.push(0);

				console.log("Is Operator and zero! Pushed "+0+"!")
				//DO SOMETHING WITH OPERATOR (currentCalc[i]);
			}else if (typeof currentCalc[i]=== "number" && i>0){
				consolidator.push(currentCalc[i]);
				console.log ("Is number and > 0! Pushed "+currentCalc[i]+"!");
			}else if (currentCalc[i]===operators && i>0){

				console.log("Is operator and > 0! Pushed "+currentCalc[i]+"!");
			}
		}
	}*/
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
		operatorClicked("/");
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
		operatorClicked("*");
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
		operatorClicked("-");
	});*/
	$("#btn0").click(function(){
		numberClicked(0);
	});
	/*$("#btnPeriod").click(function(){  //PERIOD/DECIMAL IS HERE
	});*/
	
	/*$("#btnPlus").click(function(){  //PLUS IS HERE
		operatorClicked("+");
	});*/
	/*$("#btnEquals").click(function(){  //EQUALS IS HERE
		runCalc();
	});*/
});
