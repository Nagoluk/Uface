export const required = value => {

    if(value) return undefined;

    return "Field is required";
   
}

export const maxSymbols = (max) => (value) => {
   
    if(value && value.length > max) return `max size is ${max} symbols`;
    
    return undefined;
    
}