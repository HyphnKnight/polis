export declare type EventCallback = (event: Event) => void;
export interface Tag {
    name: string;
    attributes: {
        [prop: string]: string | number | boolean | EventCallback;
    };
    children: Array<Tag | HTMLTag | string>;
}
export interface HTMLTag {
    name: string;
    element: HTMLElement;
}
export declare const isTag: (unknown: any) => unknown is Tag;
export declare const isHTMLTag: (unknown: any) => unknown is HTMLTag;
