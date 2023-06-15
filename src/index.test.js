import { clickButton, calculate, validateInput, addMissingParentheses, displayResult, clearResult, setupEventListeners } from './index.js';

let textarea;

describe('clickButton function', () => {
  beforeEach(() => {
    textarea = { value: '' };
  });

  it('should append the value to the textarea when the next value is valid', () => {
    const value = '+';
    textarea.value = '1+2';
    clickButton(textarea, value);
    expect(textarea.value).toBe('1+2+');
  });

  it('should not append the value to the textarea when the next value is invalid', () => {
    const value = '+';
    textarea.value = '1+2+';
    clickButton(textarea, value);
    expect(textarea.value).toBe('1+2+');
  });
});

describe('calculate function', () => {
  beforeEach(() => {
    textarea = { value: '' };
    jest.spyOn(window, 'alert').mockImplementation(() => { });
  });

  afterEach(() => {
    window.alert.mockRestore();
  });

  it('should calculate and display the result for a valid equation', () => {
    textarea.value = '1+2';

    calculate(textarea);
    expect(textarea.value).toBe(3);
  });

  it('should display a syntax error alert for an invalid equation', () => {
    textarea.value = '1+2+';
    const errorInvalidSyntax = 'Invalid equation. Cannot end with an operator.';

    calculate(textarea);
    expect(window.alert).toHaveBeenCalledWith(errorInvalidSyntax);
  });

  it('should not calculate or display result for empty input', () => {
    calculate(textarea);
    expect(textarea.value).toBe('');
  });
});

describe('validateInput function', () => {
  beforeEach(() => {
    textarea = { value: '' };
  });

  it('should return false if currentChar is operator and lastChar is operator (without minus)', () => {
    const textarea = { value: '1*' };
    const currentChar = '/';
    const lastChar = '*';

    const result = validateInput(textarea, currentChar, lastChar);

    expect(result).toBe(false);
  });

  it('should return true if currentChar is minus and lastChar is annother operator', () => {
    const textarea = { value: '1*' };
    const currentChar = '-';
    const lastChar = '*';

    const result = validateInput(textarea, currentChar, lastChar);

    expect(result).toBe(true);
  });

  it('should return false if currentChar is "-" and lastChar is "-"', () => {
    const textarea = { value: '1+2-' };
    const currentChar = '-';
    const lastChar = '-';

    const result = validateInput(textarea, currentChar, lastChar);

    expect(result).toBe(false);
  });

  it('should return false if currentChar is "." and lastChar is "-"', () => {
    const textarea = { value: '1+2-' };
    const currentChar = '.';
    const lastChar = '-';

    const result = validateInput(textarea, currentChar, lastChar);

    expect(result).toBe(false);
  });

  it('should return false if current character is "-" and last character is "."', () => {
    textarea.value = '1+2.';
    const currentChar = '-';
    const lastChar = '.';

    const result = validateInput(textarea, currentChar, lastChar);
    expect(result).toBe(false);
  });

  it('should return false if lastChar is "-" and currentChar is an operator other than "-"', () => {
    textarea.value = '1+2-';
    const currentChar = '+';
    const lastChar = '-';

    const result = validateInput(textarea, currentChar, lastChar);

    expect(result).toBe(false);
  });

  it('should return false if currentChar is "." and there is already a decimal point or it appears at the end of a number', () => {
    const textarea = { value: '1.2' };
    const currentChar = '.';
    const lastChar = '2';

    const result = validateInput(textarea, currentChar, lastChar);

    expect(result).toBe(false);
  });

  it('should return false if currentChar is an operator and textarea value is empty', () => {
    const textarea = { value: '' };
    const currentChar = '/';
    const lastChar = '';

    const result = validateInput(textarea, currentChar, lastChar);

    expect(result).toBe(false);
  });
});

describe('addMissingParentheses function', () => {
  it('should add missing parentheses in the equation', () => {
    const result = addMissingParentheses('1+2*3-7+5.5/-0.5');
    expect(result).toBe('1+(2*3)-7+(5.5/-0.5)');
  });
});

describe('displayResult function', () => {
  beforeEach(() => {
    textarea = { value: '' };
  });

  it('should display the result if the result is a valid number', () => {
    const validResult = '42';

    displayResult(validResult, textarea);
    expect(textarea.value).toBe(validResult);
  });

  it('should display error message if the result is NaN  or infinite', () => {
    const errorDivByZero = "Error: Dividing by zero... Seriously?";
    const invalidResult = NaN || Infinity;

    displayResult(invalidResult, textarea);
    expect(textarea.value).toBe(errorDivByZero);
  });
});

describe('clearResult function', () => {
  beforeEach(() => {
    textarea = { value: '1+2' };
  });

  it('should clear the textarea value', () => {
    clearResult(textarea);
    expect(textarea.value).toBe('');
  });
});

describe('integration testing', () => {
  let calculateButton;
  let clearButton;

  beforeEach(() => {
    document.body.innerHTML = `
      <textarea id="result" readonly></textarea>
      <input type="button" class="button number-button" value="1">
      <input type="button" class="button number-button" value="2">
      <input type="button" class="button function-button" value="+">
      <input type="button" class="function-button" id="calculate-button" value="=">
      <input type="button" id="clear-button" value="C">
    `;

    const setup = setupEventListeners();
    textarea = setup.textarea;
    calculateButton = setup.calculateButton;
    clearButton = setup.clearButton;
  });

  it('should add the value of the buttons to the textarea', () => {
    clickButton(textarea, '1');
    clickButton(textarea, '+');
    clickButton(textarea, '2');

    expect(textarea.value).toBe('1+2');
  })

  it('should perform calculation and display result when Calculate button is clicked', () => {
    clickButton(textarea, '1');
    clickButton(textarea, '+');
    clickButton(textarea, '2');

    calculateButton.click();

    expect(parseFloat(textarea.value)).toBe(3);
  });

  it('should clear the textarea when Clear button is clicked', () => {
    clickButton(textarea, '1');
    clickButton(textarea, '+');
    clickButton(textarea, '2');

    clearButton.click();

    expect(textarea.value).toBe('');
  });
});
