/* General Type Discovery */
export const is = (func = (x) => !!x) => (unknown) => func(unknown);
