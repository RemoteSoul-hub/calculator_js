// Class constructor for the Calculator
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){   /*Takes the current and previous values */
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();  /* calls clear method every time the calculator is initialized */
    }

    // Clears both values and the operation symbol 
    clear() {
            this.currentOperand = '';
            this.previousOperand = '';
            this.operation = undefined;
    }
 // Delete button that removes the latest character of the currentOperand string 
    delete() {
            this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
// insert a number value //
    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return   // prevents from having many '.' characters in one number //
        this.currentOperand = this.currentOperand.toString() + number.toString();  // adds the number next to the already existing value on the active (current) slot
    }
// inserts the kind of operation to apply on the numbers //
    chooseOperation(operation) {
        if(this.currentOperand === '') return  // if the current slot is empty, and a symbol is picked, nothing happens
        if(this.previousOperand !== '') {  // if the previousOperand carries a value, call computing method 
            this.compute()
        }
        this.operation = operation;   // for the compute method 
        this.previousOperand = this.currentOperand; // copies the current to the previous slot
        this.currentOperand = ''; // empties the current
    }
// Compute single value 
    compute() {
    let computation = 0;  // variable for the result of the operation
    const prev = parseFloat(this.previousOperand); // turns the previous to a number
    const current = parseFloat(this.currentOperand); // turns current to a number
    if (isNaN(prev) || isNaN(current)) return // if one of the two is not a number, do nothing
    switch (this.operation) {
        case '+':
            computation = prev + current;
            break
            case '-':
            computation = prev - current;
            break
            case '*':
            computation = prev * current;
            break
            case '÷':
            computation = prev / current;
            break
            default: 
            return
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null){
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        }
        
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
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