import React, { startTransition } from 'react';
import './style.css';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Nav, Col, Row, Image } from 'react-bootstrap';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import thunk from 'redux-thunk';
import { PropTypes } from 'prop-types';


//REACT-REDUX part1 ends

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			largeText: "0",
			smallText: "",
			smallTextArr: [],
			operation: false,
			isNumberTyped: false,
			isEqualsTyped: false,
			isDecimalTyped: true,
			isZeroTyped: true,
			total: "",
			getRidOfafterVal: false
		};
		this.clear = this.clear.bind(this);
		this.numberFunc = this.numberFunc.bind(this);
		this.one = this.one.bind(this);
		this.two = this.two.bind(this);
		this.three = this.three.bind(this);
		this.four = this.four.bind(this);
		this.five = this.five.bind(this);
		this.six = this.six.bind(this);
		this.seven = this.seven.bind(this);
		this.eight = this.eight.bind(this);
		this.nine = this.nine.bind(this);
		this.zero = this.zero.bind(this);
		this.decimal = this.decimal.bind(this);

		this.divide = this.divide.bind(this);
		this.multiply = this.multiply.bind(this);
		this.subtract = this.subtract.bind(this);
		this.add = this.add.bind(this);
		this.equals = this.equals.bind(this);
		this.typedOperation = this.typedOperation.bind(this);
		this.numberWorks = this.numberWorks.bind(this);
		this.overrideLargeTextError = this.overrideLargeTextError.bind(this);
		this.overridePlusMinus = this.overridePlusMinus.bind(this);
	}

	overridePlusMinus(val){
		this.setState({largeText: val, isEqualsTyped: false});
		//if(this.state.isEqualsTyped === true){
		//}
	}

	overrideLargeTextError(val){
		if(this.state.isEqualsTyped === true){
			this.setState({largeText: val, isEqualsTyped: false});
		}
	}

	numberWorks(n){
		const zeroRegex = /([\+|-|\*|\/](0))$/gi;
		const strictlyZeroRegex = /0/gi;
		if(zeroRegex.test(this.state.smallText)){
			this.state.smallTextArr.pop();
			console.log("first if statement of "+n);
			console.log(this.state.smallTextArr);
			this.numberFunc(n);
		}else if(this.state.smallText.length === 1 && strictlyZeroRegex.test(this.state.smallText)){
			this.state.smallTextArr.pop();
			console.log("first if statement of "+n);
			console.log(this.state.smallTextArr);
			this.numberFunc(n);
		}else{
			this.numberFunc(n);
		}
	}

	typedOperation(o){
		if(this.state.smallTextArr[this.state.smallTextArr.length - 1] !== "/" && this.state.smallTextArr[this.state.smallTextArr.length - 1] !== "*"){
			this.numberFunc(o);
			this.setState({isNumberTyped: false , isDecimalTyped: true});
		}else{
			if(o === "/"){
				this.state.smallTextArr.pop();
				this.numberFunc(o);
				console.log("/ was typed");
				this.setState({isDecimalTyped: true});
			}else if(o === "*"){
				this.state.smallTextArr.pop();
				this.numberFunc(o);
				console.log("/ was typed");
				this.setState({isDecimalTyped: true});
			}else if(o === "=" && (this.state.smallText !== "/" && this.state.smallText !== "*")){
				if(this.state.isNumberTyped === true){
					this.numberFunc(o);
					this.setState({
						isNumberTyped: false,
						isDecimalTyped: true
					});
				}
			}
		}

	}

	numberFunc(n) {
		if(this.state.isEqualsTyped === true){
			console.log(this.state.total);
			this.state.smallTextArr.push(n);
			const operationRegex = /[\*\/\+\-]/gi;
			if(operationRegex.test(n)){
				this.state.smallTextArr.unshift(this.state.total);
				this.setState(state => {
					if(n==="*"){
						return {largeText: "x", smallText: state.smallTextArr.join(""), operation: false,
						isNumberTyped: true,
						isEqualsTyped: true, total: ""}
					}else{
						return {largeText: n, smallText: state.smallTextArr.join(""), operation: false,
						isNumberTyped: true,
						isEqualsTyped: true, total: ""}
					}
				});
			}else{
				this.setState(state => {
					if(n==="*"){
						return {
							largeText: "x",
							smallText: state.smallTextArr.join(""),
							operation: false,
							isNumberTyped: true,
							isEqualsTyped: false,
							total: ""
						};
					}else{
						return {
							largeText: n,
							smallText: state.smallTextArr.join(""),
							operation: false,
							isNumberTyped: true,
							isEqualsTyped: false,
							total: ""
						};
					}
				});
			}

		}
		const operationArr = ["/", "*", "-", "+", "="];
		if(operationArr.includes(n)){
			console.log("if(operationArr.includes(n)) Executed")
			this.setState({largeText: "", operation: true});
		}
		if(this.state.largeText.length < 20){
			if(this.state.largeText === "0"){
				this.state.smallTextArr.push(n);
				//this.setState(state => ({largeText: n, smallText: state.smallTextArr.join(""), isNumberTyped: true}));
				this.setState(state => {
					if(n==="*"){
						return {largeText: "x", smallText: state.smallTextArr.join(""), isNumberTyped: true}
					}else{
						return {largeText: n, smallText: state.smallTextArr.join(""), isNumberTyped: true}
					}
				});
			}else{
				console.log("this.state.operation" + this.state.operation);
				if(this.state.operation === true){
					this.setState({largeText: "", operation: false, isNumberTyped: true});
				}
				this.state.smallTextArr.push(n);
				//this.setState(state => ({smallText: state.smallTextArr.join(""), largeText: state.largeText.concat(n)}));
				this.setState(state => {
					if(n==="*"){
						return {smallText: state.smallTextArr.join(""), largeText: state.largeText.concat("x")}
					}else{
						return {smallText: state.smallTextArr.join(""), largeText: state.largeText.concat(n)};
					}
				});
			}
		}else if(this.state.largeText.length >= 20){
			setTimeout(()=>{
				$('#large-text').text("DIGIT LIMIT MET");
				setTimeout(()=>{
					$('#large-text').text(this.state.largeText);
				}, 1000);
			}, 0);
		}
	}
		divide(){
		const operationRegex = /[\/\+\-\*]/ig;
		if(this.state.smallText.length === 1 && operationRegex.test(this.state.smallText)){
			this.state.smallTextArr.pop();
			this.typedOperation("/");
		}else{
			this.typedOperation("/");
			this.overrideLargeTextError("/");
		}
	}
	multiply(){  
		const operationRegex = /[\/\+\-\*]/ig;
		if(this.state.smallText.length === 1 && operationRegex.test(this.state.smallText)){
			this.state.smallTextArr.pop();
			this.typedOperation("*");
		}else{
			this.typedOperation("*");
			this.overrideLargeTextError("x");
		}
	}
	subtract(){
		const operationRegex = /[\/\+\-\*]/ig;
		const multDivRegex = /[\/\*]/ig;
		const plusNumberRegex = /[\+0-9]/ig;
		if((this.state.smallText.length === 1 && operationRegex.test(this.state.smallText)) || this.state.smallText.length === 0){
			try{
				this.state.smallTextArr.pop();
				this.numberFunc("-");
				this.setState({
					isDecimalTyped: true
				});
			}catch(e){
				console.log(e);
			}
		}else if(multDivRegex.test(this.state.smallText[this.state.smallText.length - 1]) || plusNumberRegex.test(this.state.smallText[this.state.smallText.length - 1])){
			this.numberFunc("-");
			this.setState({
				isDecimalTyped: true
			});
		}else if(this.state.isEqualsTyped === true){
			this.numberFunc("-");
			this.setState({
				isDecimalTyped: true
			});
			this.overridePlusMinus("-");
		}
	}
	add(){  
		const operationRegex = /[\/\+\-\*]/ig;
		const multDivRegex = /[\/\*\-]/ig;
		const numberRegex = /[0-9]/ig;
		const multSubRegex = /(\*\-)$/ig;
		if((this.state.smallText.length === 1 && operationRegex.test(this.state.smallText)) || this.state.smallText.length === 0){
			try{
				this.state.smallTextArr.pop();
				this.numberFunc("+");
				this.setState({
					isDecimalTyped: true
				});
			}catch(e){
				console.log(e);
			}
		}else if(multSubRegex.test(this.state.smallText)){
			this.state.smallTextArr.pop();
			this.state.smallTextArr.pop();
			this.numberFunc("+");
			this.setState({
				isDecimalTyped: true
			});
		}else if(multDivRegex.test(this.state.smallText[this.state.smallText.length - 1])){
			this.state.smallTextArr.pop();
			this.numberFunc("+");
			this.setState({
				isDecimalTyped: true
			});
		}else if(numberRegex.test(this.state.smallText[this.state.smallText.length - 1])){
			this.numberFunc("+");
			this.setState({
				isDecimalTyped: true
			});
		}else if(this.state.isEqualsTyped === true){
			this.numberFunc("+");
			this.setState({
				//isDecimalTyped: true,
			});
			this.overridePlusMinus("+");
		}
	}
	equals(){
			let results = eval(this.state.smallText);
			this.typedOperation(" = ");
		this.setState(state => ({
			smallText: state.smallText.concat(results),
			smallTextArr: [],
			largeText: results,
			isEqualsTyped: true,
			isDecimalTyped: true,
			total: results
		}));  
	}
	one() {
		this.numberWorks("1");
	}
	two() {
		this.numberWorks("2");
	}
	three() {
		this.numberWorks("3");
	}
	four() {
		this.numberWorks("4");
	}
	five() {
		this.numberWorks("5");
	}
	six() {
		this.numberWorks("6");
	}
	seven() {
		this.numberWorks("7");
	}
	eight() {
		this.numberWorks("8");
	}
	nine() {
		this.numberWorks("9");
	}
	zero() {
		this.numberWorks("0");
	}
	decimal() {
		let myOperations = ['/', '*', '-', '+'];
		let myNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
		if(this.state.isDecimalTyped === true){
			if(myOperations.includes(this.state.smallText[this.state.smallText.length - 1]) || this.state.smallText === ""){
				this.state.smallTextArr.push("0.");
				this.setState(state => ({
					smallText: state.smallTextArr.join(""),
					largeText: "0.",
					isDecimalTyped: false
				}));
			}else if(myNumbers.includes(this.state.smallText[this.state.smallText.length - 1])){
				this.state.smallTextArr.push(".");
				this.setState(state => ({
					smallText: state.smallTextArr.join(''),
					largeText: state.largeText.concat('.'),
					isDecimalTyped: false
				}));
			}
		}
	}
	clear() {
		this.setState({
			largeText: "0",
			smallText: "",
			smallTextArr: [],
			operation: false,
			isNumberTyped: false,
			isEqualsTyped: false,
			isDecimalTyped: true,
			isZeroTyped: true
		});
	}
	componentDidMount() {
		$('body').addClass("bodyColor");
	}

	render() {
		return (
			<div className="calculator-container">
				<div className="calculator">
					<div id="calculator-components">
						<div id="myDisplay">
							<div id='first-div'>
								<p  id='small-text-p' className='screen-text'><span id="small-text">{this.state.smallText}</span></p>
							</div>
							<div>
								<p id='large-text-p' className='screen-text'><span id="display">{this.state.largeText}</span></p>
							</div>
						</div>
						<div id="buttons">
							<button id="clear" onClick={this.clear}>AC</button>
							<button id="divide" onClick={this.divide} className='operation'>/</button>
							<button id="multiply" onClick={this.multiply} className='operation'>X</button>
							<button id="seven" onClick={this.seven} className='num-keys'>7</button>
							<button id="eight" onClick={this.eight} className='num-keys'>8</button>
							<button id="nine" onClick={this.nine} className='num-keys'>9</button>
							<button id="subtract" onClick={this.subtract} className='operation'>-</button>
							<button id="four" onClick={this.four} className='num-keys'>4</button>
							<button id="five" onClick={this.five} className='num-keys'>5</button>
							<button id="six" onClick={this.six} className='num-keys'>6</button>
							<button id="add" onClick={this.add} className='operation'>+</button>
							<button onClick={this.one} id="one" className='num-keys'>1</button>
							<button id="two" onClick={this.two} className='num-keys'>2</button>
							<button id="three" onClick={this.three} className='num-keys'>3</button>
							<button id="equals" onClick={this.equals} className='operation'>=</button>
							<button id="zero" onClick={this.zero} className='num-keys'>0</button>
							<button id="decimal" onClick={this.decimal} className='num-keys'>.</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

