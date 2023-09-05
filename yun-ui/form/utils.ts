export function isObject(obj: any) {
	return obj !== null && typeof obj === 'object'
}

export function deepGet(obj: any, path: string) {
	const parts = path.split('.')
	const length = parts.length

	for (let i = 0; i < length; i++) {
		if (!isObject(obj)) return undefined
		obj = obj[parts[i]]
	}

	return obj
}

export function deepSet(obj: any, path: string, value: any) {
	if (!isObject(obj)) return obj

	const root = obj
	const parts = path.split('.')
	const length = parts.length

	for (let i = 0; i < length; i++) {
		const p = parts[i]

		if (i === length - 1) {
			obj[p] = value
		} else if (!isObject(obj[p])) {
			obj[p] = {}
		}

		obj = obj[p]
	}

	return root
}

export function getPropName(valueProp: string | ((type: any) => string), type: any) {
	return typeof valueProp === 'function' ? valueProp(type) : valueProp
}

export function getValueFromEvent(...args: any[]) {
	const e = args[0] as React.ChangeEvent<any>
	return e && e.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e
}

/**
 * 检测值是否为空
 */
export const isEmpty = (data: any, flag = true) => {
	if (!(data instanceof Object)) {
		flag = data !== 0 && !data;
		return flag;
	}
	for (let key in data) {
		if (!(data[key] instanceof Object)) {
			flag = data[key] !== 0 && !data[key];
		} else {
			isEmpty(data[key], flag);
		}
		if (flag === false) {
			break;
		}
	}
	return flag;
};

export const checkFnc: { [key: string]: Function } = {};

checkFnc.checkLen = ({ len, type, value }: { len: number, type: string, value: any }) => {
	switch(type) {
		case 'string':
			return value.length === len;
		case 'number':
			return value === len;
		case 'array':
			return value.length === len;
		default: 
			throw new Error('data is not valid type');
	}
} 

checkFnc.checkMax = ({max, type, value}: { max: number, type: string, value: any }) => {
	switch(type) {
		case 'string':
			return value.length <= max;
		case 'number':
			return value <= max;
		case 'array':
			return value.length <= max;
		default: 
			throw new Error('data is not valid type');
	}
}

checkFnc.checkMin = ({min, type, value}: {min: number, type: string, value: any}) => {
	switch(type) {
		case 'string':
			return value.length >= min;
		case 'number':
			return value >= min;
		case 'array':
			return value.length >= min;
		default: 
			throw new Error('data is not valid type');
	}
}

checkFnc.checkPattern = ({pattern, value}: {pattern: RegExp, value: any}) => {
	return pattern.test(value);
}

checkFnc.checkRequired = ({value}: {value: any}) => {
	return !isEmpty(value);
}

checkFnc.checkString = ({value}: {value: any}) => {
	return typeof value === 'string';
}

checkFnc.checkDate = ({value}: {value: any}) => {
	if(typeof value !== 'string') {
		return false;
	}
	return /^\d{4}([/:-\S])(1[0-2]|0?[1-9])\1(0?[1-9]|[1-2]\d|30|31) (?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(value);
}

checkFnc.checkEmail = ({value}: {value: any}) => {
	if(typeof value !== 'string') {
		return false;
	}
	return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
}

checkFnc.checkEnonly = ({value}: {value: any}) => {
	if(typeof value !== 'string') {
		return false;
	}
	return /^[\da-zA-Z~!@#$%^&*]$/.test(value);
}

checkFnc.checkNumber = ({value}: {value: any}) => {
	if(typeof value !== 'string' || typeof value !== 'number' || value === '') {
		return false;
	}
	return +value !== NaN;
}

checkFnc.checkUrl = ({value}: {value: any}) => {
	if(typeof value !== 'string') {
		return false;
	}
	return /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/.test(value);
}


export const isAsyncFunction = (fn:Function) => {
    let fnStr = fn.toString()     
    return Object.prototype.toString.call(fn) === '[object AsyncFunction]' || fnStr.includes("return _regenerator.default.async(function")
}

export const getMessage = (message:string, name:string) => {
	return message.replace(/\$\{name\}/g, name);
}