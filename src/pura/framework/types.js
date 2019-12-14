import { isString, } from '../is/type';
export const isTag = (unknown) => !!unknown &&
    !unknown.nodeType &&
    isString(unknown.name) &&
    !!unknown.attributes &&
    !!unknown.children;
export const isHTMLTag = (unknown) => !!unknown &&
    isString(unknown.name) &&
    !!unknown.element;
