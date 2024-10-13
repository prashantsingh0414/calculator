import React, { useState } from "react";

const Calculator = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");

    const handleClick = (value) => {
        setInput((prev) => prev + value);
    };

    const handleClear = () => {
        setInput("");
        setResult("");
    };

    const handleDelete = () => {
        setInput((prev) => prev.slice(0, -1));
    };

    // Function to calculate the result based on the input string
    const calculate = (inputString) => {
        try {
            const tokens = inputString.match(/(\d+|\D)/g);
            if (!tokens) {
                return "Error";
            }

            let values = [];
            let ops = [];

            const precedence = {
                '+': 1,
                '-': 1,
                '*': 2,
                '/': 2,
                '(': 0,
            };

            const applyOperation = (a, b, op) => {
                switch (op) {
                    case '+': return a + b;
                    case '-': return a - b;
                    case '*': return a * b;
                    case '/': return b === 0 ? "Error" : a / b;
                    default: return 0;
                }
            };

            for (let token of tokens) {
                if (/\d/.test(token)) {
                    values.push(parseFloat(token)); // Push numbers onto the values stack
                } else if (token === '(') {
                    ops.push(token); // Push '(' onto the ops stack
                } else if (token === ')') {
                    while (ops.length && ops[ops.length - 1] !== '(') {
                        const b = values.pop();
                        const a = values.pop();
                        const op = ops.pop();
                        const result = applyOperation(a, b, op);
                        values.push(result);
                    }
                    ops.pop(); // Pop the '('
                } else if (/[+\-*/]/.test(token)) {
                    while (ops.length && precedence[ops[ops.length - 1]] >= precedence[token]) {
                        const b = values.pop();
                        const a = values.pop();
                        const op = ops.pop();
                        const result = applyOperation(a, b, op);
                        values.push(result);
                    }
                    ops.push(token); // Push the current operator
                }
            }

            // Process any remaining operators
            while (ops.length) {
                const b = values.pop();
                const a = values.pop();
                const op = ops.pop();
                const result = applyOperation(a, b, op);
                values.push(result);
            }

            return values.length ? values[0] : "Error"; // Return the final result
        } catch (error) {
            return "Error"; // Handle any errors during calculation
        }
    };

    // Handle the "=" button click to calculate and display the result
    const handleEqual = () => {
        const calculationResult = calculate(input);
        setResult(calculationResult);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl font-bold mb-6 text-center">Calculator</div>
                <div className="mb-4">
                    <input
                        type="text"
                        value={input}
                        placeholder="0"
                        className="w-full p-2 mb-2 border border-gray-300 rounded-lg text-right text-xl"
                        readOnly
                    />
                    <div className="text-right text-lg">{result && `= ${result}`}</div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    <button onClick={handleClear} className="bg-red-400 text-white p-4 rounded-lg">C</button>
                    <button onClick={handleDelete} className="bg-gray-400 text-white p-4 rounded-lg">DEL</button>
                    <button onClick={() => handleClick("/")} className="bg-gray-400 text-white p-4 rounded-lg">/</button>
                    <button onClick={() => handleClick("*")} className="bg-gray-400 text-white p-4 rounded-lg">*</button>

                    <button onClick={() => handleClick("7")} className="bg-gray-200 p-4 rounded-lg">7</button>
                    <button onClick={() => handleClick("8")} className="bg-gray-200 p-4 rounded-lg">8</button>
                    <button onClick={() => handleClick("9")} className="bg-gray-200 p-4 rounded-lg">9</button>
                    <button onClick={() => handleClick("-")} className="bg-gray-400 text-white p-4 rounded-lg">-</button>

                    <button onClick={() => handleClick("4")} className="bg-gray-200 p-4 rounded-lg">4</button>
                    <button onClick={() => handleClick("5")} className="bg-gray-200 p-4 rounded-lg">5</button>
                    <button onClick={() => handleClick("6")} className="bg-gray-200 p-4 rounded-lg">6</button>
                    <button onClick={() => handleClick("+")} className="bg-gray-400 text-white p-4 rounded-lg">+</button>

                    <button onClick={() => handleClick("1")} className="bg-gray-200 p-4 rounded-lg">1</button>
                    <button onClick={() => handleClick("2")} className="bg-gray-200 p-4 rounded-lg">2</button>
                    <button onClick={() => handleClick("3")} className="bg-gray-200 p-4 rounded-lg">3</button>
                    <button
                        onClick={handleEqual} // Call the handleEqual function on click
                        className="bg-blue-500 text-white p-4 row-span-2 rounded-lg"
                    >
                        =
                    </button>

                    <button onClick={() => handleClick("0")} className="bg-gray-200 p-4 rounded-lg col-span-2">0</button>
                    <button onClick={() => handleClick(".")} className="bg-gray-200 p-4 rounded-lg">.</button>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
