import { debounce } from '../function';
const events = new Map();
const auditEvents = debounce((parent = document.body) => events.forEach((eventMap) => eventMap.forEach((_, el) => !parent.contains(el) && eventMap.delete(el))), 16, false, 320);
export const attachEvent = (el, type, func) => {
    let typeMap = events.get(type);
    if (!typeMap) {
        typeMap = new Map();
        events.set(type, typeMap);
        document.body.addEventListener(type, (event) => {
            const callback = typeMap.get(event.target);
            if (callback)
                callback(event);
        });
    }
    typeMap.set(el, func);
    auditEvents(document.body);
};
