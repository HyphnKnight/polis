import { filter, forEach, map } from '../array';
import { isString } from '../is/type';
const isNode = typeof window === 'undefined';
const success = (description) => !isNode
    ? console.log(`  %c[PASS] %c${description}`, `color:green;`, `color:black;`)
    : console.log(`  \x1b[32m[PASS]\x1b[0m ${description}`);
const fail = (description, message) => !isNode
    ? console.log(`  %c[FAIL] %c${description}\n    ${message}`, `color:red;`, `color:black;`)
    : console.log(`  \x1b[31m[FAIL]\x1b[0m ${description}\n    ${message}`);
const suiteLog = (title, percentage) => {
    if (isNode) {
        if (percentage === 100) {
            console.log(`\x1b[32m${title}\x1b[0m`);
        }
        else {
            console.log(`${title} \x1b[31m[${percentage}%]\x1b[0m`);
        }
    }
    else {
        if (percentage === 100) {
            console.log(`%c${title}`, `color:green;`);
        }
        else {
            console.log(`${title} %c[${percentage}%]`, `color:red;`);
        }
    }
};
export const suite = (title, tests) => {
    try {
        const results = map(tests, (testDetails) => test(testDetails[0], testDetails[1]));
        const correct = filter(results, (x) => x[0]).length;
        const percentage = Math.floor(correct / tests.length * 100);
        suiteLog(title, percentage);
        forEach(results, (result) => result[0]
            ? success(result[1])
            : fail(result[1], result[2]));
        return percentage === 100;
    }
    catch (e) {
        fail(title, isString(e) ? e : e.message);
        return false;
    }
};
export const suiteAsync = async (title, tests) => {
    try {
        const results = await Promise.all(map(tests, (testDetails) => testAsync(testDetails[0], testDetails[1])));
        const correct = filter(results, (x) => x[0]).length;
        const percentage = Math.floor(correct / tests.length * 100);
        suiteLog(title, percentage);
        forEach(results, (result) => result[0]
            ? success(result[1])
            : fail(result[1], result[2]));
        return percentage === 100;
    }
    catch (e) {
        fail(title, isString(e) ? e : e.message);
        return false;
    }
};
const test = (description, testFunction) => {
    try {
        testFunction();
        return [true, description];
    }
    catch (e) {
        return [false, description, isString(e) ? e : e.message];
    }
};
const testAsync = async (description, testFunction) => {
    try {
        await testFunction();
        return [true, description];
    }
    catch (e) {
        return [false, description, isString(e) ? e : e.message];
    }
};
