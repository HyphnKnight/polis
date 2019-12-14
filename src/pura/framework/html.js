import { forEach } from '../array';
import { isArray, isBoolean, isFunction, isNode, isNullOrUndefined, isNumber, isString, } from '../is/type';
import { uniqueId } from '../string';
import { isTag, } from './types';
const isAlphaChar = (c) => c >= 'A' && c <= 'z';
const isWhitespaceChar = (c) => c === '\n' ||
    c === ' ' ||
    c === '\t';
const isNumberChar = (c) => c >= '0' && c <= '9';
const events = new Map();
const tags = new Map();
const primitives = new Map();
const parseParameter = (parameter) => {
    if (isNullOrUndefined(parameter)) {
        return null;
    }
    else if (isString(parameter)) {
        return String(parameter);
    }
    else if (isNumber(parameter) || isBoolean(parameter)) {
        const paramKey = `prm_${uniqueId()}_`;
        primitives.set(paramKey, parameter);
        return paramKey;
    }
    else if (isFunction(parameter)) {
        const eventKey = `evt_${uniqueId()}_`;
        events.set(eventKey, parameter);
        return eventKey;
    }
    else if (isTag(parameter)) {
        const tagKey = `tag_${uniqueId()}_`;
        tags.set(tagKey, parameter);
        return tagKey;
    }
    else if (isArray(parameter) && parameter.length) {
        let html = '';
        forEach(parameter, (param) => html += parseParameter(param));
        return html;
    }
    else if (isNode(parameter)) {
        const tagKey = `tag_${uniqueId()}_`;
        const newHTMLTag = {
            name: parameter.tagName,
            element: parameter,
        };
        tags.set(tagKey, newHTMLTag);
        return tagKey;
    }
    return null;
};
export const tag = (str, ...parameters) => {
    let html = '';
    let i = -1;
    while (++i < str.length) {
        html += str[i];
        const parameter = parseParameter(parameters[i]);
        if (parameter !== null)
            html += parameter;
    }
    html = html.trim();
    if (html[0] !== '<') {
        throw new Error(`Invalid first character, must be a '<' found a ${html[0]}`);
    }
    const content = [];
    let activeTag = null;
    let cIndex = -1;
    let char = '';
    let activeString = '';
    let attrName = '';
    let buildingTag = '';
    i = -1;
    while (i < html.length) {
        char = html[++i];
        activeString = '';
        if (char === '<' && html[i + 1] === '/') {
            // end tag
            ++i;
            char = html[++i];
            // loop past whitespace
            while (isWhitespaceChar(char))
                char = html[++i];
            // check for proper tag name start char
            if (!isAlphaChar(char)) {
                throw new Error(`Invalid tag name discovered first character can't be ${char}`);
            }
            // loop through tag name
            while (!isWhitespaceChar(char) && (isAlphaChar(char) || char === '-' || isNumberChar(char)) && char) {
                activeString += char;
                char = html[++i];
            }
            // loop past whitespace
            while (isWhitespaceChar(char))
                char = html[++i];
            if (char === '>') {
                activeTag = content[cIndex];
                activeString = activeString.toUpperCase();
                if (activeTag.name === activeString) {
                    activeString = '';
                    const parent = content[--cIndex];
                    if (!parent) {
                        return activeTag;
                    }
                    else {
                        parent.children.push(activeTag);
                    }
                }
                else {
                    throw new Error(`Invalid html attempting to close ${activeString} before closing ${content[cIndex].name}.`);
                }
            }
            else {
                throw new Error(`Invalid end tag discovered expected closing '>' found ${char}.`);
            }
        }
        else if (char === '<') {
            // tag
            activeString = '';
            char = html[++i];
            // check for proper tag name start char
            if (!isAlphaChar(char)) {
                throw new Error(`Invalid tag name discovered first character can't be ${char}.`);
            }
            // loop through tag name
            while (!isWhitespaceChar(char) && (isAlphaChar(char) || char === '-' || isNumberChar(char)) && char) {
                activeString += char;
                char = html[++i];
            }
            // check for valid next char
            if (isWhitespaceChar(char) || char === '/' || char === '>') {
                activeTag = {
                    name: activeString.toUpperCase(),
                    attributes: {},
                    children: [],
                };
                content[++cIndex] = activeTag;
                activeString = '';
                // loop past whitespace
                while (isWhitespaceChar(char))
                    char = html[++i];
                // loop through attributes
                // stop if find end of tag
                while (!(char === '>' || (char === '/' && html[i + 1] === '>'))) {
                    // loop past whitespace
                    while (isWhitespaceChar(char))
                        char = html[++i];
                    if (!isAlphaChar(char)) {
                        throw new Error(`Invalid property name discovered first character can't be ${char}.`);
                    }
                    // loop through property name
                    while (!isWhitespaceChar(char) && (isAlphaChar(char) || char === '-' || isNumberChar(char)) && char) {
                        activeString += char;
                        char = html[++i];
                    }
                    attrName = activeString;
                    activeString = '';
                    // loop past whitespace
                    while (isWhitespaceChar(char))
                        char = html[++i];
                    // is valued attribute
                    if (char === '=') {
                        char = html[++i];
                        // loop past whitespace
                        while (isWhitespaceChar(char))
                            char = html[++i];
                        if (char === '"') {
                            char = html[++i];
                            while (char !== '"' || html[i - 1] === '\\') {
                                activeString += char;
                                char = html[++i];
                            }
                            char = html[++i];
                            if (events.has(activeString)) {
                                activeTag.attributes[attrName] = events.get(activeString);
                            }
                            else if (primitives.has(activeString)) {
                                activeTag.attributes[attrName] = primitives.get(activeString);
                            }
                            else {
                                activeTag.attributes[attrName] = activeString;
                            }
                            activeString = '';
                        }
                        else {
                            throw new Error(`Invalid property value must be wrapped in quotes.`);
                        }
                    }
                    else {
                        activeTag.attributes[attrName] = true;
                    }
                    // loop past whitespace
                    while (isWhitespaceChar(char))
                        char = html[++i];
                }
                if (char !== '>') {
                    // this is self closing
                    ++i;
                    if (content[cIndex - 1]) {
                        const parent = content[--cIndex];
                        parent.children.push(activeTag);
                    }
                    else {
                        if (cIndex !== 0) {
                            throw new Error(`Unclosed tag ${content[cIndex].name}.`);
                        }
                        else {
                            return content[cIndex];
                        }
                    }
                }
            }
            else {
                throw new Error(`Invalid tag name discovered ${activeString + char}.`);
            }
        }
        else {
            // string handling
            while (char !== '<' && char) {
                if (char === 't' && html[i + 1] === 'a' && html[i + 2] === 'g' && html[i + 3] === '_' && html[i + 13] === '_') {
                    buildingTag = html.slice(i, i + 14);
                    i += 13;
                    const insertTag = tags.get(buildingTag);
                    if (insertTag) {
                        content[cIndex].children.push(activeString, insertTag);
                        activeString = '';
                    }
                    else {
                        activeString += buildingTag;
                    }
                }
                else if (char === 'p' && html[i + 1] === 'r' && html[i + 2] === 'm' && html[i + 3] === '_' && html[i + 13] === '_') {
                    buildingTag = html.slice(i, i + 14);
                    i += 13;
                    const insertString = primitives.get(buildingTag);
                    activeString += insertString;
                }
                else {
                    activeString += char;
                }
                char = html[++i];
            }
            if (char === '<') {
                --i;
                content[cIndex].children.push(activeString);
            }
        }
    }
    if (cIndex !== 0) {
        throw new Error(`Unclosed tag ${content[cIndex].name}.`);
    }
    else {
        return content[cIndex];
    }
};
