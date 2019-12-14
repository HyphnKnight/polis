import { Tag } from './types';
export declare type EventCallback = (event: Event) => void;
export declare const tag: (str: TemplateStringsArray, ...parameters: (string | number | boolean | HTMLElement | Tag | EventCallback | (string | number | boolean | HTMLElement | Tag | EventCallback | null | undefined)[] | null | undefined)[]) => Tag;
