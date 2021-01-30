export const required = (value: string): string | undefined => {
    if (value) return undefined;
    return 'Field is required';
}

export const maxSymbols = (max: number) => (value: string): string | undefined => {
    if (value && value.length > max) return `max size is ${max} symbols`;
    return undefined;
}