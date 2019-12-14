export declare type CreateModule<Config> = (initConfig: Config) => (props: Partial<Config>) => HTMLElement;
export interface TextConfig {
    label: string;
    value: string;
    onInput: (value: string) => void;
    placeholder?: string;
    autocomplete?: string;
    inputmode?: string;
    disabled?: boolean;
}
export declare const createTextInput: CreateModule<TextConfig>;
export interface NumberConfig {
    label: string;
    value: number;
    onInput: (value: number) => void;
    type?: 'number' | 'range';
    placeholder?: string;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
}
export declare const createNumberInput: CreateModule<NumberConfig>;
export interface PasswordConfig {
    label: string;
    value: string;
    onInput: (value: string) => void;
    placeholder?: string;
    autocomplete?: 'new-password' | 'current-password';
    disabled?: boolean;
}
export declare const createPasswordInput: CreateModule<PasswordConfig>;
export interface SearchConfig {
    label: string;
    value: string;
    onInput: (value: string) => void;
    options?: string[];
    placeholder?: string;
    autocomplete?: string;
    inputmode?: string;
    disabled?: boolean;
}
export declare const createSearchInput: CreateModule<SearchConfig>;
export interface CheckboxConfig {
    label: string;
    value: boolean;
    onInput: (value: boolean) => void;
    disabled?: boolean;
}
export declare const createCheckbox: CreateModule<CheckboxConfig>;
export interface RadioConfig {
    value: string;
    options: string[];
    onInput: (value: string) => void;
    disabled?: boolean;
}
export declare const createRadioInput: CreateModule<RadioConfig>;
export interface SelectOptionGroup {
    label: string;
    options: string[];
    disabled?: boolean;
}
export interface SelectConfig {
    label: string;
    onInput: (value: string) => void;
    value: string | false;
    options: (string | SelectOptionGroup)[];
    disabled?: boolean;
}
export declare const createSelectInput: CreateModule<SelectConfig>;
export interface ButtonConfig {
    label: string;
    onInput: () => void;
    disabled?: boolean;
}
export declare const createButton: CreateModule<ButtonConfig>;
