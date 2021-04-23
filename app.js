class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
            this.currentOperand = '';
            this.previousOperand = '';
            this.operation = undefined;
    }

    delete() {
            this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    sqrt(currentOperand){
        const value = parseFloat(this.currentOperand);
        if (isNaN(value)) return
        this.currentOperand = Math.sqrt(value);
            console.log(this.currentOperand);
           calculator.updateDisplay();
    }

    exp(currentOperand){
        const value = parseFloat(this.currentOperand);
        if (isNaN(value)) return
        this.currentOperand = Math.exp(value);
            console.log(this.currentOperand);
           calculator.updateDisplay();
    }

    sin(currentOperand){
        const degreeSin = parseFloat(this.currentOperand);
        if (isNaN(degreeSin)) return
        const radSin = degreeSin*Math.PI/180;
        this.currentOperand = Math.sin(radSin).toFixed(3);
           calculator.updateDisplay();
    }

    cos(currentOperand){
        const degreeCos = parseFloat(this.currentOperand);
        if (isNaN(degreeCos)) return
        const radCos = degreeCos*Math.PI/180;
        this.currentOperand = Math.cos(radCos).toFixed(3);
           calculator.updateDisplay();
    }

    tan(currentOperand){
        const degreeTan = parseFloat(this.currentOperand);
        if (isNaN(degreeTan)) return
        const radTan = degreeTan*Math.PI/180;
        this.currentOperand = Math.tan(radTan).toFixed(3);
           calculator.updateDisplay();
    }
   ln(currentOperand){
        const value = parseFloat(this.currentOperand);
        if (isNaN(value)) return
        this.currentOperand = Math.log(value);
            console.log(this.currentOperand);
           calculator.updateDisplay();
    }

    log(currentOperand){
        const value = parseFloat(this.currentOperand);
        if (isNaN(value)) return
        this.currentOperand = Math.log(value)/Math.log(10);
            console.log(this.currentOperand);
           calculator.updateDisplay();
    }

    power(powValue){
        const value = parseFloat(this.currentOperand);
        if (isNaN(value)) return
       if (powValue === 2) {
           this.currentOperand = value*value;
       }
            console.log(this.currentOperand);
           calculator.updateDisplay();

    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
// Compute single value 
    compute() {
    let computation
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
        case '+':
            computation = prev + current
            break
            case '-':
            computation = prev - current
            break
            case '*':
            computation = prev * current
            break
            case '÷':
            computation = prev / current
            break
            case 'x^': 
            computation = Math.pow(prev, current)
            break
            default: 
            return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const piValue = document.querySelector('[data-pi]');
const sqrt = document.querySelector('[data-sqrt');
const powTwo = document.querySelector('[data-power');
const exp = document.querySelector('[data-exp');
const sin = document.querySelector('[data-sin');
const cos = document.querySelector('[data-cos');
const tan = document.querySelector('[data-tan');
const ln = document.querySelector('[data-ln');
const log = document.querySelector('[data-log');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

piValue.addEventListener('click', () => {
    calculator.appendNumber(22/7);
    calculator.updateDisplay(); 
})

sqrt.addEventListener('click', () => {
    calculator.sqrt();
})

powTwo.addEventListener('click', () => {
    calculator.power(2);
})

exp.addEventListener('click', () => {
    calculator.exp();
})

sin.addEventListener('click', () => {
    calculator.sin();
})

cos.addEventListener('click', () => {
    calculator.cos();
})

tan.addEventListener('click', () => {
    calculator.tan();
})

ln.addEventListener('click', () => {
    calculator.ln();
})

log.addEventListener('click', () => {
    calculator.log();
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})


deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})

