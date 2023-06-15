const errorDivByZero = "Error: Dividing by zero... Seriously?";
const errorInvalidSyntax = 'Invalid equation. Cannot end with an operator.';

function setupEventListeners() {
  const textarea = document.getElementById('result');
  const buttons = document.querySelectorAll('.button');
  const calculateButton = document.getElementById('calculate-button');
  const clearButton = document.getElementById('clear-button');

  buttons.forEach((button) => {
    if (typeof button.addEventListener === 'function') {
      button.addEventListener('click', () => {
        const event = new Event('click');
        event.value = button.value;
        clickButton(textarea, event.value)
      });
    }
  });

  if (textarea) {
    calculateButton.addEventListener('click', () => {
      calculate(textarea);
    });

    clearButton.addEventListener('click', () => {
      clearResult(textarea);
    });
  }

  return {
    textarea,
    calculateButton,
    clearButton,
  };
}

function clickButton(textarea, value) {
  if (validateInput(textarea, value)) {
    textarea.value += value;
  }
}

function calculate(textarea) {
  const result = textarea.value;

  if (result) {
    try {
      const modifiedResult = addMissingParentheses(result);
      const finalResult = eval(modifiedResult);
      const roundedResult = parseFloat(finalResult.toFixed(9));

      displayResult(roundedResult, textarea);
    } catch (error) {
      alert(errorInvalidSyntax);
    }
  }
}

function validateInput(textarea, value) {
  const lastChar = textarea.value.slice(-1);
  const currentChar = value;
  const operatorsWithoutMinus = ['+', '*', '/', '.'];
  const regEx = /\.\d*\.|\.\d*$/;

  if (operatorsWithoutMinus.includes(lastChar) && operatorsWithoutMinus.includes(currentChar)) {
    return false;
  }

  if ((currentChar === ('-') || currentChar === '.') && (lastChar === '-' || lastChar === '.')) {
    return false;
  }

  if ((lastChar === '-' && operatorsWithoutMinus.includes(currentChar))) {
    return false;
  }

  if (currentChar === '.' && textarea.value.match(regEx)) {
    return false;
  }

  if (operatorsWithoutMinus.includes(currentChar) && textarea.value === '') {
    return false;
  }

  return true;
}

function addMissingParentheses(result) {
  const modifiedResult = result.replace(/(\d+(\.\d+)?([\/*]|[\/*]\-)\d+(\.\d+)?)/g, '($1)');
  return modifiedResult;
}

function displayResult(result, textarea) {
  if (isNaN(result) || !isFinite(result)) {
    textarea.value = errorDivByZero;
  } else {
    textarea.value = result;
  }
}

function clearResult(textarea) {
  textarea.value = "";
}

setupEventListeners();

export { clickButton, calculate, validateInput, addMissingParentheses, displayResult, clearResult, setupEventListeners };
