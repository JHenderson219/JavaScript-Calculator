$(document).ready(function() {
	var holdNum = 0;
	var currentNum = 0;
	var currentOperator;
	var operationReady = false;
	var calcIsReset = true;
	var operatorReady = false;
	var hasDecimal = false;

	function resetCalc(){
		currentNum = 0;
		holdNum = 0;
		calcIsReset = true;
		operationReady = false;
		operatorReady = false;
		currentOperator = undefined;
		hasDecimal = false;
		$("#calcScreen").empty().append(0);
		console.log("Reset Complete!")
	}

	function resetAfterEquals(){
		calcIsReset = true;
		operationReady = false;
		operatorReady = false;
		currentOperator = undefined;
		hasDecimal = false;
		console.log("Reset after Equals complete!");
	}
	function resetForOperationChain(){
		calcIsReset = true;
		operationReady = true;
		operatorReady = true;
		hasDecimal = false;
		console.log("Reset for operation chain complete!")
	}

	function decimalClicked(dec){
		console.log("Decimal clicked!");
		if (hasDecimal === false && calcIsReset === true){ //if it doesn't have a decimal, and the calc is reset, add a decimal to the end
			currentNum = 0
			currentNum = currentNum.toString().concat(dec);
			$("#calcScreen").empty().append(currentNum).addClass("text-right");
			hasDecimal = true;
			calcIsReset = false;
			console.log("Calc was at zero and decimal was added! New num is: "+currentNum);
		} else if (hasDecimal === false && calcIsReset === false){ //if it doesn't have a decimal, but the calc is not reset, add a decimal to the end
			currentNum = currentNum.concat(dec);
			$("#calcScreen").append(dec);
			hasDecimal = true;
			console.log ("Calc was not reset and decimal was added! New num is: "+currentNum);
		}else if (hasDecimal === true){//if it has a decimal, do nothing
		}
		
	}
	function numberClicked(num){
	console.log("number clicked!")
	if (calcIsReset === true){
		console.log("Is calc reset? "+ calcIsReset);
		$("#calcScreen").empty().append(num).addClass("text-right");
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
		if (operatorReady === false && operationReady === false){ //FIRST OPERATION BETWEEN CLEAR
			holdNum = currentNum;
			currentNum = 0;
			currentOperator = op;
			hasDecimal = false;
			calcIsReset = true;
			operatorReady = true;
			operationReady = true;
			console.log("holdNum is "+holdNum);
			console.log("current number is "+currentNum);
			console.log("currentOperator is " + op);
		} else if (operatorReady === true && operationReady === true){ //OPERATION IS BEING CHAINED
			console.log("Chaining operation..."+holdNum.toString()+currentOperator+currentNum.toString());
			holdNum = runCalc(holdNum,currentOperator,currentNum);
			hasDecimal = false;
			currentNum = 0;
			$("#calcScreen").empty().append(holdNum).addClass("text-right");
			currentOperator = op;
			operatorReady = true;
			operationReady = true;
			resetForOperationChain();
		} else if (operatorReady === false && operationReady === true){ //OPERATION BEING CHAINED FOR SECOND OR MORE TIME, READY TO RECIEVE OPERATOR AND READY TO CALCULATE
			console.log("Chaining operation second+ time..."+holdNum.toString()+currentOperator+currentNum.toString());
			holdNum = runCalc(holdNum,currentOperator,currentNum);
			currentNum = 0;
			hasDecimal = false;
			currentOperator = op;
			resetForOperationChain();
		} else if (operatorReady === true){ //Currently impossible to trigger; overrides operator
			currentOperator = op;
		}
		console.log("Operator "+op+" clicked!");
		console.log ("Ready to perform operation? "+operationReady);
		console.log ("Operator selected? "+operatorReady);
	}
	
	function runCalc(num1,operand,num2){ //MAKE SURE TO RESET ALL WHEN CALC ORDERED
		var calcResult = eval(num1+operand+num2);
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
		decimalClicked(".");
	});
	
	$("#btnPlus").click(function(){  //PLUS IS HERE
		operatorClicked("+");
	});
	$("#btnEquals").click(function(){  //EQUALS IS HERE
		if (currentOperator != undefined){
		console.log("Equals Executing...");
		var result = runCalc(holdNum,currentOperator,currentNum);
		holdNum = result;
		$("#calcScreen").empty().append(result);
		console.log("result of calculation is: "+result);
		console.log("current num is now: "+currentNum);
		console.log("hold num is now: "+holdNum);
		resetAfterEquals();
		} else {
		alert("Please select an operator first! Calculator has been reset.")
		resetCalc();
		}
	});
});
