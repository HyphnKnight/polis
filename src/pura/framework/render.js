import { filter, forEach, map, unique, } from '../array';
import { isBoolean, isString, } from '../is/type';
import { attachEvent } from './events';
import { isHTMLTag, isTag, } from './types';
const getAttributes = (el) => {
    const result = {};
    forEach([...Array.from(el.attributes)], (node) => result[node.nodeName] = node.nodeValue || '');
    return result;
};
// This is ok because this will only ever come from one location.
let scriptCache;
export const renderToBody = (tag) => {
    scriptCache = scriptCache || map(filter([...document.body.childNodes], (node) => !!node && !!node.tagName && node.tagName.toLowerCase() === 'script'), (node) => ({
        name: 'script',
        element: node,
    }));
    if (tag.children.indexOf(scriptCache[0]) === -1) {
        tag.children.push(...scriptCache);
    }
    render(tag, document.body);
    return document.body;
};
const applyTagPropsToElement = (tag, target) => {
    forEach(unique([
        ...Object.keys(getAttributes(target)),
        ...Object.keys(tag.attributes),
    ]), (propName) => {
        if (typeof tag.attributes[propName] === 'undefined' || tag.attributes[propName] === false) {
            target.removeAttribute(propName);
        }
        else if (propName.toLowerCase().slice(0, 2) === 'on') {
            attachEvent(target, propName.slice(2).toLowerCase(), tag.attributes[propName]);
        }
        else if (isBoolean(tag.attributes[propName])) {
            if (!tag.attributes[propName] && !!target.getAttribute(propName)) {
                target.removeAttribute(propName);
            }
            else if (tag.attributes[propName] && !target.getAttribute(propName)) {
                target.setAttribute(propName, String(tag.attributes[propName]));
            }
        }
        else if (target.getAttribute(propName) !== String(tag.attributes[propName])) {
            target.setAttribute(propName, String(tag.attributes[propName]));
        }
    });
    return target;
};
export const render = (tag, target) => {
    if (tag.name !== target.nodeName) {
        throw new Error(`Render attempting to render a ${target.nodeName} as ${tag.name}`);
    }
    else if (target.id !== '' && (tag.attributes.id || '') !== target.id) {
        throw new Error(`Render attempting to render tag with id #${tag.attributes.id} to an element with the id of #${target.id}`);
    }
    applyTagPropsToElement(tag, target);
    let activeTags = [
        [target, tag.children],
    ];
    while (activeTags.length) {
        const nextTags = [];
        let atIndex = -1;
        while (++atIndex < activeTags.length) {
            const [parent, childTags] = activeTags[atIndex];
            const childNodes = [...parent.childNodes];
            let childTagIndex = -1;
            while (++childTagIndex < childTags.length) {
                const childTag = childTags[childTagIndex];
                const childElement = childNodes[childTagIndex];
                if (isString(childTag)) {
                    if (childElement && childElement.nodeType === Node.TEXT_NODE) {
                        if (childTag !== '') {
                            if (childElement.nodeValue !== childTag)
                                childElement.nodeValue = childTag;
                        }
                        else {
                            childElement.remove();
                        }
                    }
                    else {
                        while (childNodes[childTagIndex]) {
                            const removeEl = childNodes.pop();
                            if (removeEl)
                                removeEl.remove();
                        }
                        if (childTag !== '') {
                            parent.appendChild(document.createTextNode(childTag));
                        }
                    }
                }
                else if (isTag(childTag)) {
                    let tagRef = childElement;
                    if (!childElement || childElement.nodeType !== Node.ELEMENT_NODE || childElement.tagName !== childTag.name) {
                        while (childNodes[childTagIndex]) {
                            const removeEl = childNodes.pop();
                            if (removeEl)
                                removeEl.remove();
                        }
                        tagRef = document.createElement(childTag.name);
                        parent.appendChild(tagRef);
                    }
                    applyTagPropsToElement(childTag, tagRef);
                    if (childTag.children.length) {
                        nextTags.push([
                            tagRef,
                            childTag.children,
                        ]);
                    }
                }
                else if (isHTMLTag(childTag) && childTag.element !== childElement) {
                    while (childNodes[childTagIndex]) {
                        const removeEl = childNodes.pop();
                        if (removeEl)
                            removeEl.remove();
                    }
                    parent.appendChild(childTag.element);
                }
            }
        }
        activeTags = nextTags;
    }
    return target;
};
