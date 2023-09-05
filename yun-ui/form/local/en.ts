export type ValidateMessage = {
    [key: string]: string
}

const validateMessages: ValidateMessage = {
    required: '${name} is required',
    string: '${name} is must be a string',
    number: '${name} is must be a number', 
    len: '${name} length does not match', 
    max: '${name} exceeds the maximum value', 
    min: '${name} exceeds the minimum value', 
    pattern: '${name} is not valid', 
    date: '${name} is not a legal date',
    url: '${name} is not a legal URL',
    enonly: '${name} is enonly',
    email: '${name} is not a legal email',
    default: '${name} is not valid'
}

export default validateMessages;