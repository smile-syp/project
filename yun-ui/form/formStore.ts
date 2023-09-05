import { deepGet, deepSet, checkFnc, isAsyncFunction, getMessage } from './utils';
import { cloneDeep } from 'lodash';

import validateMessages from './local/en';

export type Rules = {
	required?: boolean,
	string?: boolean,
	number?: boolean,
	len?: number, 
	max?: number,
	min?: number,
	pattern?: RegExp,
	date?: boolean,
	url?: boolean,
	enonly?: boolean,
	email?: boolean,
	type?: 'string' | 'number' | 'boolean' | 'array' | 'object',
	validator?: (value: any) => Promise<string | boolean> | string | boolean,
	warningOnly?: boolean,
	message?: string
}

export type FormListener = (name: string) => void;
export type FormRules = { [key: string]: Rules[] };
export type FormData = { [key: string]: any };
export type FormErrors = { [key: string]: string | undefined };
export type FieldData = {
	value: any,
	rules: Rules[],
	id: string,
	required: boolean
};

declare global {
	interface Window {
		scrollIntoView: Function;
	}
}

class FormStore {
	private initialValues: FormData; // form初始值
	private formRules: FormRules; // form的rules
	private values: any; // 表单项配置与值
	private errors: FormErrors = {}; // 错误信息 
	private listeners: FormListener[] = []; // 表单值改变触发的监听

	public constructor(values: FormData, rules: FormRules = {}) {
		this.initialValues = cloneDeep(values) as any;
		this.values = {};
		this.formRules = cloneDeep(rules);
	}

	/**
	 * 添加表单元素
	 * @param name 
	 * @param value 
	 */
	public addField(name: string, fieldData: FieldData) {
		this.values[name] = cloneDeep(fieldData);
		this.initialValues[name] = fieldData.value;
		if(fieldData.rules.length) {
			this.formRules[name] = cloneDeep(fieldData.rules);
		}
	}

	/**
	 * 移除表单元素
	 * @param name 
	 */
	public removeField(name: string) {
		delete this.values[name];
		delete this.initialValues[name];
	}

	/**
	 * 获取单个表单元素的值
	 * @param name 
	 * @returns 
	 */
	public getFieldValue(name: string) {
		return deepGet(this.values, name + '.value');
	}

	/**
	 * 获取全部元素表单的值
	 * @returns 
	 */
	public getFieldsValue() {
		let tempData: any = {};
		for(let key in this.values) {
			tempData[key] = this.values[key].value;
		}
		return tempData;
	}

	/**
	 * 设置值，判断是否触发校验
	 * @param name 
	 * @param value 
	 * @param validate 
	 */
	public setFieldValue(name: any, value: any, validate: boolean = true) {
		if (typeof name === 'string') {
			deepSet(this.values, name + '.value', value);
			this.notify(name);
			if (validate) {
				this.validateField(name)
			}
		}
	}

	/**
	 * 批量设置值
	 * @param value 
	 */
	public setFieldsValue(value: any) {
		Object.keys(value).forEach((n) => this.setFieldValue(value[n].name, value[n].value, !!value[n].validate))
	}

	/**
	 * 校验单个选项值
	 * @param name 
	 * @returns Promise
	 */
	public validateField(name: string): Promise<{valid: boolean,message: string, warningOnly: boolean, id?: string}> {
		return new Promise(async resolve => {
			if(this.values[name] === undefined) {
				delete this.errors[name];
				this.notify(name);
				resolve({valid: true, message: '', warningOnly: false})
				return;
			}

			const rules = this.formRules[name] || [];
			const isRequired = this.values[name].required;
			const value = this.values[name].value;
			const id = this.values[name].id;


			// 校验
			let message = getMessage(validateMessages.required, name); 
			// item required
			if(isRequired && !checkFnc.checkRequired({value})) {
				this.errors[name] = message;
				this.notify(name);
				resolve({valid: false, message, warningOnly: false, id });
				return;
			}
			// 校验数组
			for(let i = 0; i < rules.length; i++) {
				// 必填
				let warningOnly = !!rules[i].warningOnly;
				let message = String(rules[i].message || '');
				
				const RULES_KEY = Object.keys(validateMessages);
				const keys = Object.keys(rules[i]);
				for(let j = 0; j < keys.length; j++) {
					const keyName = keys[i];
					if(RULES_KEY.indexOf(keyName) !== -1 && !checkFnc['check' + (keyName.slice(0,1).toUpperCase() + keyName.slice(1))]({ value, [keyName]: rules[i][keyName as keyof Rules], type: rules[i].type })) {
						message = message || getMessage(validateMessages[keyName], name);
						this.errors[name] = message;
						this.notify(name);
						resolve({valid: false, message, warningOnly, id});
						return;
					}
				}

				if(rules[i].validator) {
					let valid = false; 
					let fn = rules[i].validator as Function;
					if(isAsyncFunction(fn)) {
						valid = await fn(value);
					} else {
						valid = fn(value);
					}
					if(valid !== true) {
						message = message || valid || getMessage(validateMessages.default, name);
						this.errors[name] = message;
						this.notify(name);
						resolve({valid: false, message, warningOnly, id});
						return;
					}
				}
			}

			delete this.errors[name];
			this.notify(name);
			resolve({valid: true, message: '', warningOnly: false})
		})
	}

	public validateFields(): Promise<{valid: boolean}> {
		return new Promise(resolve => {
			let arr: Promise<{valid: boolean, message: string, warningOnly: boolean, id?: string}>[] = [];
			for(var key in this.formRules) {
				arr.push(this.validateField(key))
			}
			Promise.all([...arr]).then(res => {
				let status = false;
				res.map(v => {
					if(!v.valid && !v.warningOnly) {
						if(!status) {
							this.scrollToField(String(v.id));
						}
						status = true;
						resolve({valid: false});
					} else {
						
					}
				})
				resolve({valid: true});
			}).catch(err => {
				console.log(err)
			})
		})
	}

	/**
	 * 通知表单元素更新value和状态
	 * @param name
	 */
	private notify(name: string) {
		this.listeners.forEach((listener) => listener(name))
	}

	/**
	 * 初始化表单
	 */
	public resetFields() {
		this.errors = {};
		for(let key in this.values) {
			this.values[key].value = cloneDeep(this.initialValues[key]);
		}
		this.notify('*');
	}

	/**
	 * 获取当前报错信息
	 * @returns 
	 */
	public getFieldsError(): FormErrors {
		return this.errors;
	}

	/**
	 * 获取表单元素报错信息
	 * @param name 
	 * @returns 
	 */
	public getFieldError(name: string) {
		return this.errors[name] || '';
	}

	/**
	 * 滚动到对应位置
	 * @param id 
	 */
	public scrollToField(id:string) {
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" })
	}

	/**
	 * 注册每个表单元素的onChange事件
	 * @param listener 
	 * @returns 
	 */
	public subscribe(listener: FormListener) {
		this.listeners.push(listener)

		return () => {
			const index = this.listeners.indexOf(listener)
			if (index > -1) this.listeners.splice(index, 1)
		}
	}
}

export default FormStore;