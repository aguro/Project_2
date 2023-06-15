# CALCULATOR 

The Calculator is designed to perform basic mathematical computations and serves as a showcase for unit and integration testing. It provides functionality for common arithmetic operations, allowing users to perform calculations easily. The primary objective of developing this calculator is to demonstrate the implementation of unit tests and integration tests.

### Running project 

Run `npm start` in the project directory. After running the command, the application will start automatically at `http://localhost:8080/`. The application will be automatically reload if you change any of the source files.

### Running test

Run the tests by executing the command `npm test` in the project directory. Expect to see the test results displayed in the console, indicating whether all the tests passed successfully.

### Generating Code Coverage Report

To generate a code coverage report, run the following command `npm run report` in the project directory. This command runs the Jest framework with the --collectCoverage option, collecting code coverage information during the tests. The code coverage report is available in the coverage directory of the project. 

### Description of functionality

The calculator provides the ability to input data using buttons. It has buttons for entering numbers and mathematical operators. The calculator allows performing basic mathematical operations such as addition, subtraction, multiplication and division.

Protection against invalid inputs:

1. Blocking the input of two consecutive operators (except for minus).
2. Blocking the input of a minus sign after another minus sign or a decimal point.
3. Blocking the input of an operator directly after a minus sign.
4. Blocking the input of an operator as the first character if the input field is empty.
5. locking the input of more than one decimal point in a number or if the decimal point occurs at the end of a number.

Error handling:

1. In case of an invalid equation, the calculator displays a syntax error message.
2. In case of division by zero, the calculator displays an error message.

"Calculate" button: The calculator has a "Calculate" button that performs calculations on the entered equation.

"Clear" button: The calculator has a "Clear" button that clears the result field.

### Summary

This calculator includes a set of basic math functions to demonstrate unit and integration tests to validate their correct functionality.