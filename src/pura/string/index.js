import { filter, find } from '../array';
export const uniqueId = () => Math.random().toString(36).substr(2, 9);
export const abstractSearch = (term) => (str) => {
    const prepedTerm = stripPunctuation(term).toLowerCase();
    const prepedStr = stripPunctuation(str).toLowerCase();
    return !!find(prepedTerm.split(' '), (subTerm) => prepedStr.indexOf(subTerm) !== -1);
};
export const stripPunctuation = (str) => str.replace(/["'.,\/#!$%\^&\*;:’{}=\-_`~()]/g, '');
export const camelCase = (str) => stripPunctuation(str).replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => index === 0 ?
    letter.toLowerCase() :
    letter.toUpperCase()).replace(/\s+/g, '');
export const symbolCase = (str) => filter(stripPunctuation(str).toUpperCase().split(' '), (word) => word !== '').join('_');
export const snakeCase = (str) => filter(stripPunctuation(str).toLowerCase().split(' '), (word) => word !== '').join('_');
export const dashCase = (str) => filter(stripPunctuation(str).toLowerCase().split(' '), (word) => word !== '').join('-');
