export declare const suite: (title: string, tests: [string, () => void][]) => boolean;
export declare const suiteAsync: (title: string, tests: [string, () => Promise<void>][]) => Promise<boolean>;
