import { EventCallback, Tag } from './types';
export declare const tag: (str: TemplateStringsArray, ...parameters: (string | number | boolean | HTMLElement | Tag | EventCallback | (string | number | boolean | HTMLElement | Tag | EventCallback | null | undefined)[] | null | undefined)[]) => Tag;
