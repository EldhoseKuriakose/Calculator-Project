class Calculator {
    constructor(previousOperandElement, currentOperantElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperantElement = currentOperantElement;
        this.clear();
    }

    clear() {
        this.currentOperant = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperant = this.currentOperant.toString().slice(0, -1);
    }

    append(num) {
        if(num === '.' && this.currentOperant.includes('.')) {
            return;
        }
        if(num === '+/-' && this.currentOperant !== '0'){
            this.currentOperant = 0 - this.currentOperant;
        }else {
            this.currentOperant = this.currentOperant.toString() + num.toString();
        }
    }

    selectOperation(op) {
        if(this.currentOperant === '') {
            return;
        }
        if (this.previousOperand !== '') {
            this.calculate();
        }
        this.operation = op;
        this.previousOperand = this.currentOperant;
        this.currentOperant = '';
    }

    calculate() {
        let calculation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperant);
        if(isNaN(prev) || isNaN(curr)) {
            return;
        }
        switch(this.operation) {
            case '+':
                calculation = prev + curr;
                break;
            case '-':
                calculation = prev - curr;
                break;
            case '*':
                calculation = prev * curr;
                break;
            case '/':
                calculation = prev / curr;
                break;
            case '%':
                calculation = (prev / 100) * curr;
                break;
            default:
                break;
        }
        this.currentOperant = calculation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDispNum(num) {
        const stringNum = num.toString();
        const intDigits = parseFloat(stringNum.split('.')[0]);
        const decDigits = stringNum.split('.')[1];
        let intDisp;
        if(isNaN(intDigits)) {
            intDisp = '';
        }else {
            intDisp = intDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if(decDigits != null) {
            return `${intDisp}.${decDigits}`;
        }else {
            return intDisp;
        }
    }

    updateDisp() {
        this.currentOperantElement.innerText = this.getDispNum(this.currentOperant);
        if(this.operation != null) {
            this.previousOperandElement.innerText = `${this.getDispNum(this.previousOperand)} ${this.operation}`;
        }else {
            this.previousOperandElement.innerText = '';
        }
    }
}

var numButtons = document.getElementsByClassName('number');
var operator = document.getElementsByClassName('operator');
var equalsButton = document.getElementsByClassName('equals');
var deleteButton = document.getElementsByClassName('delete-data');
var allClear = document.getElementsByClassName('all-clear');
var previousOperandElement = document.getElementById('previous-operand');
var currentOperantElement = document.getElementById('current-operand');

const calculator = new Calculator(previousOperandElement, currentOperantElement);


Array.prototype.forEach.call(numButtons, button => {
    button.addEventListener('click', () => {
        calculator.append(button.innerText);
        calculator.updateDisp();
    });
});

Array.prototype.forEach.call(operator, button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.innerText);
        calculator.updateDisp();
    });
});

equalsButton[0].addEventListener('click', button => {
    calculator.calculate();
    calculator.updateDisp();
});

allClear[0].addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisp();
});

deleteButton[0].addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisp();
});