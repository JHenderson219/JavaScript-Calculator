$(document).ready(function() {
	var holdNum = 0;
	var currentNum = 0;
	var currentOperator;
	var operationReady = false;
	var calcIsReset = true;
	var operatorReady = false;
	var hasDecimal = false;
	var multDiv = /[*/]/gi;
	
	//Resets all variables for the application
	function resetCalc(){
		currentNum = 0;
		holdNum = 0;
		calcIsReset = true;
		operationReady = false;
		operatorReady = false;
		currentOperator = undefined;
		hasDecimal = false;
		$("#calcScreen").empty().append(0).addClass("text-right");
		console.log("Reset Complete!")
	}
	//Resets a limited set of variable to continue calculations after the equals button is clicked.
	function resetAfterEquals(){
		calcIsReset = true;
		operationReady = true;
		operatorReady = false;
		currentOperator = undefined;
		hasDecimal = false;
		currentNum = 0;
		console.log("Reset after Equals complete!");
		console.log("holdNum is "+holdNum);
		console.log("current number is "+currentNum);
	}
	//Resets a limited set of variable to continue calculations in succession
	function resetForOperationChain(){
		calcIsReset = true;
		operationReady = true;
		operatorReady = true;
		hasDecimal = false;
		console.log("Reset for operation chain complete!")
		console.log("holdNum is "+holdNum);
		console.log("current number is "+currentNum)
	}

	//If calculator is reset, and the current number doesn't have a decimal,
	//adds decimal to number and allows making a longer decimal number.
	//If the calculator is not reset and the current number in the screen does not have a decimal, adds a decimal
	//
	function decimalClicked(dec){
		console.log("Decimal clicked!");
		if (!hasDecimal && calcIsReset){ //if it doesn't have a decimal, and the calc is reset, add a decimal to the end
			currentNum = 0;
			currentNum = currentNum.toString().concat(dec);
			$("#calcScreen").empty().append(currentNum).addClass("text-right");
			hasDecimal = true;
			calcIsReset = false;
			console.log("Calc was at zero and decimal was added! New num is: "+currentNum);
		} else if (!hasDecimal && !calcIsReset){ //if it doesn't have a decimal, but the calc is not reset, add a decimal to the end
			currentNum = currentNum.concat(dec);
			$("#calcScreen").append(dec);
			hasDecimal = true;
			console.log ("Calc was not reset and decimal was added! New num is: "+currentNum);
		}
	}

	//Given a number, if an operation is ready and no operator is selected, resets the calculator and runs again
	//If the calculator is reset, replaces the default zero with the number clicked on screen and updates current num.
	//If the calculator is not reset, appends the number to the current number.
	function numberClicked(num){
	console.log("number clicked!")
	if (operationReady && !operatorReady){
		console.log("Operation ready but no operator. Reset needed!");
		resetCalc();
		numberClicked(num);
	}else if (calcIsReset){
		console.log("Is calc reset? "+ calcIsReset);
		$("#calcScreen").empty().append(num).addClass("text-right");
		currentNum = num.toString();
		calcIsReset = false;
		console.log("holdNum is "+holdNum);
		console.log("current number is "+currentNum);
	} else if (!calcIsReset){
		console.log("Is calc reset? "+ calcIsReset);
		$("#calcScreen").append(num);
		currentNum = currentNum.concat(num.toString());
		console.log("holdNum is "+holdNum);
		console.log("current number is "+currentNum);
		}
	}
	
	//Given a selected operator:
	//If it is the first operation between clears, moves current number to hold number and readies to accept next number
	//If it is the second operation caused by chanining operators, performs the calculation and updates screen, if not dividing by zero.
	//If it is the second operation and is caused by use of the equals sign, as above for second operations, except resets different variables to allow chaining properly.
	function operatorClicked(op){
			console.log("Operator is:"+op);
			if (!operatorReady && !operationReady){ //FIRST OPERATION BETWEEN CLEARS
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
		} else if (operatorReady && operationReady){ //OPERATION IS BEING CHAINED WITH OPERATORS
			console.log("Chaining operation..."+holdNum.toString()+currentOperator+currentNum.toString());
			if (currentNum === 0 || holdNum===0 && op === "/"){
				alert("Can not divide by zero!");
				return;
			}
			holdNum = runCalc(holdNum,currentOperator,currentNum);
			hasDecimal = false;
			currentNum = 0;
			$("#calcScreen").empty().append(holdNum).addClass("text-right");
			currentOperator = op;
			operatorReady = true;
			operationReady = true;
			resetForOperationChain();
		} else if (!operatorReady && operationReady){ //OPERATION BEING CHAINED AFTER AND EQUALS
			console.log("Chaining operation after equals..."+holdNum.toString()+currentOperator+currentNum.toString());
			currentNum = 0;
			hasDecimal = false;
			currentOperator = op;
			resetForOperationChain();
		} else if (operatorReady){ //Currently impossible to trigger; overrides operator
			currentOperator = op;
		}
		console.log("Operator "+op+" clicked!");
		console.log ("Ready to perform operation? "+operationReady);
		console.log ("Operator selected? "+operatorReady);
	}
	
	//Calculates the result of the current operation.

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
		} else if (calcIsReset===false){
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

	
	//Tap Events for Buttons
	$("#btnClear").on("tap",function(){
		resetCalc();
	});
	$("#btn7").on("tap",function(){
		numberClicked(7);
	});
	$("#btn8").on("tap",function(){
		numberClicked(8);
	});
	$("#btn9").on("tap",function(){
		numberClicked(9);
	});
	$("#btnDivide").on("tap",function(){  //DIVIDE IS HERE
		operatorClicked("/");
	});
	$("#btn4").on("tap",function(){
		numberClicked(4);
	});
	$("#btn5").on("tap",function(){
		numberClicked(5);
	});
	$("#btn6").on("tap",function(){
		numberClicked(6);
	});
	$("#btnTimes").on("tap",function(){  //TIMES IS HERE
		operatorClicked("*");
	});
	$("#btn1").on("tap",function(){
		numberClicked(1);
	});
	$("#btn2").on("tap",function(){
		numberClicked(2);
	});
	$("#btn3").on("tap",function(){
		numberClicked(3);
	});
	$("#btnMinus").on("tap",function(){  //MINUS IS HERE
		operatorClicked("-");
	});
	$("#btn0").on("tap",function(){
		if(calcIsReset===true){
		} else if (calcIsReset===false){
		numberClicked(0);	
		}
	});
	$("#btnPeriod").on("tap",function(){  //PERIOD/DECIMAL IS HERE
		decimalClicked(".");
	});
	
	$("#btnPlus").on("tap",function(){  //PLUS IS HERE
		operatorClicked("+");
	});
	$("#btnEquals").on("tap",function(){  //EQUALS IS HERE
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
