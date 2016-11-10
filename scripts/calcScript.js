
$(document).ready(function() {
	var holdNum = 0;
	var currentNum = 0;
	var currentOperator;
	var operationReady = false;
	var calcIsReset = true;
	var operatorReady = true;
	var result = 0;

	function resetCalc(){
		currentNum = 0;
		holdNum = 0;
		calcIsReset = true;
		operationReady = false;
		operatorReady = true;
		currentOperator = undefined;
		result = 0; 
		$("#calcScreen").empty().append(0);
		console.log("Reset Complete!")
	}

	function resetAfterEquals(){
		calcIsReset = true;
		operationReady = false;
		operatorReady = true;
		currentOperator = undefined;
		console.log("Reset after Equals complete!");
	}
	function decimalClicked(dec){
		console.log("decimal clicked!");
	}
	function numberClicked(num){
	console.log("number clicked!")
	if (calcIsReset === true){
		console.log("Is calc reset? "+ calcIsReset);
		$("#calcScreen").empty().append(num).addClass("text-right");
		holdNum = currentNum;
		currentNum = num.toString();
		calcIsReset = false;
		console.log("holdNum is "+holdNum);
		console.log("current number is "+currentNum);
	} else if (calcIsReset === false){
		console.log("Is calc reset? "+ calcIsReset);
		$("#calcScreen").append(num);
		currentNum = currentNum.concat(num.toString());
		console.log("holdNum is "+holdNum);
		console.log("current number is "+currentNum);
		}
	}
	
	function operatorClicked(op){
		console.log("Operator "+op+" clicked!");
		console.log ("Is operationReady? "+operationReady);
		console.log ("Is operatorReady? "+operatorReady);
		if (operatorReady === true && operationReady === false){
			holdNum = currentNum;
			currentOperator = op;
			$("#calcScreen").empty().append(0).addClass("text-right");
			calcIsReset = true;
			operatorReady = false;
			operationReady = true;
			console.log("holdNum is "+holdNum);
			console.log("current number is "+currentNum);
			console.log("currentOperator is " + op);
		} else if (operatorReady === false && operationReady === true){
			console.log("Chaining operation..."+holdNum.toString()+currentOperator+currentNum.toString());
			runCalc(holdNum,currentOperator,currentNum);
			$("#calcScreen").empty().append(currentNum).addClass("text-right");
			resetAfterEquals();
		} else if (operatorReady === false){
			currentOperator = op;
		}
	}
	
	function runCalc(num1,operand,num2){ //MAKE SURE TO RESET ALL WHEN CALC ORDERED
		var calcResult = eval(num1+operand+num2);
		currentNum = calcResult;
		return calcResult;
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
	$("#btnDivide").click(function(){  //DIVIDE IS HERE
		operatorClicked("/");
	});
	$("#btn4").click(function(){
		numberClicked(4);
	});
	$("#btn5").click(function(){
		numberClicked(5);
	});
	$("#btn6").click(function(){
		numberClicked(6);
	});
	$("#btnTimes").click(function(){  //TIMES IS HERE
		operatorClicked("*");
	});
	$("#btn1").click(function(){
		numberClicked(1);
	});
	$("#btn2").click(function(){
		numberClicked(2);
	});
	$("#btn3").click(function(){
		numberClicked(3);
	});
	$("#btnMinus").click(function(){  //MINUS IS HERE
		operatorClicked("-");
	});
	$("#btn0").click(function(){
		if(calcIsReset===true){
		} else if (calcIsReset===true){
		numberClicked(0);	
		}
	});
	$("#btnPeriod").click(function(){  //PERIOD/DECIMAL IS HERE
	
	});
	
	$("#btnPlus").click(function(){  //PLUS IS HERE
		operatorClicked("+");
	});
	$("#btnEquals").click(function(){  //EQUALS IS HERE
		if (currentOperator != undefined){
		console.log("Equals Executing...");
		var result = runCalc(holdNum,currentOperator,currentNum);
		$("#calcScreen").empty().append(result);
		console.log("result of calculation is: "+result);
		console.log("current num is now: "+currentNum);
		resetAfterEquals();
		} else {
		alert("Please select an operator first! Calculator has been reset.")
		resetCalc();
		}
	});
});
