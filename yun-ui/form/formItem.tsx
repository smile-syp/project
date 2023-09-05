import React, { cloneElement, isValidElement, useCallback, useContext, useEffect, useRef, useState } from 'react'
import classNames from 'classnames';
import FormStoreContext from './formStoreContext';
import useFieldChange from './useFieldChange';
import FormOptionsContext from './formOptionsContext';
import { getPropName, getValueFromEvent } from './utils';

import { Rules } from './formStore';
import { cloneDeep, isEqual } from 'lodash';

export interface FormItemProps {
	label?: React.ReactNode; // 标签名称
	labelWidth?: string;
	style?: React.CSSProperties;
	layout?: 'vertical' | 'horizontal'; // item布局
	name?: string; // 字段名称
	className?: string; // 样式class
	required?: boolean; // 是否必填
	rules?: Rules[]; // 校验规则
	initialValue?: any; // 默认值
	suffix?: React.ReactNode; // footer
	trigger?: string;
	validateTrigger?: Array<string>;
	children?: React.ReactNode;
	hasFeedback?: boolean; // 是否显示错误文案
	valueProp?: string | ((type: any) => string); // 使用原生表单元素
	valueGetter?: (...args: any[]) => any; // 使用原生表单元素
}

const FormItem = (props: FormItemProps) => {
	const defaultValidateTrigger = useRef(['onChange']);
	const {
		label,
		labelWidth,
		layout,
		style,
		name,
		className,
		required,
		rules = [],
		initialValue,
		suffix,
		trigger = 'onChange',
		validateTrigger = defaultValidateTrigger.current,
		valueProp = 'value',
		valueGetter = getValueFromEvent,
		children,
		hasFeedback = true
	} = props;

	const store = useContext(FormStoreContext); // formStore
	const options = useContext(FormOptionsContext); // form公用参数

	const [id] = useState((options.name ? options.name + '.' : '') + name);

	const getInitData = () => {
		if (initialValue || initialValue !== undefined) {
			return initialValue;
		}
		if (name && options.initialValues && options.initialValues[name] !== undefined) {
			return options.initialValues[name];
		}
	}
	const initData = getInitData();

	const initStatus = useRef(false);
	const [initRules, setInitRules] = useState({});
	const [initValue, setInitValue] = useState({});
	const [initChange, setInitChange] = useState(0);

	const [value, setValue] = useState(initData);
	const [error, setError] = useState<any>();

	useEffect(() => {
		const el = document.getElementById(id + '_error') as HTMLDivElement;
		if(error && el) {
			el.innerText = error;
		}
	}, [error])


	// 将item注册到formStore，逻辑属性发生变化会重新绑定逻辑
	useEffect(() => {
		if(!name || !store) {
			return;
		}
		if (!initStatus.current) {
			setInitRules(cloneDeep(rules));
			setInitValue(cloneDeep(initialValue));
			setValue(initData);
			store?.addField(name, {
				value: initData,
				rules: rules,
				id: id,
				required: !!required
			})
			initStatus.current = true;
		}
		return () => {
			setValue(initData);
			initStatus.current = false;
			setError('');
			name && store?.removeField(name);
		}
	}, [name, required, initChange, store])

	useEffect(() => {
		if(initStatus.current && !(isEqual(rules, initRules) && isEqual(initialValue, initValue))) {
			setInitChange(initChange + 1);
		}
	}, [rules, initialValue])

	// 从上而下数据流，区分赋值还是初始化化
	useFieldChange(store, name, (isReset: boolean) => {
		if (isReset) {
			setValue(store?.getFieldValue(String(name)))
			setError('')
		} else {
			setValue(store?.getFieldValue(String(name)))
			setError(store?.getFieldError(String(name)))
		}
	})

	let child: any = children;
	// 劫持表单元素，从下而上的数据流
	const callback = child.props[trigger];

	// 保持原有事件的调用，并根据事件是否触发校验
	const onChange = useCallback((e: any) => {
		callback && callback(e);
		return name && store && store.setFieldValue(name, valueGetter(e), validateTrigger.indexOf(trigger) !== -1)
	}, [name, store, trigger, validateTrigger, valueGetter])

	// 保持原有事件的调用
	const onValidate = useCallback((e: any) => {
		callback && callback();
		return name && store && store.validateField(name);
	}, [name, store])

	let obj: any = {};
	validateTrigger.map(v => {
		if (v !== trigger) {
			obj[v] = onValidate;
		}
	})

	if (name && store && isValidElement(child)) {
		// @ts-ignore
		const prop = getPropName(valueProp, child && child.name);
		const childProps = {
			[prop]: value,
			[trigger]: onChange,
			...obj
		}
		child = cloneElement(child, childProps)
	}

	return (
		<div className={classNames({
			'ftm-form-field': true,
			'ftm-form-field__horizontal': (layout || options.layout) === 'horizontal' ? true : false
		})}>
			<div className={classNames({
				'ftm-form-field-content': true
			}, className)} style={style}>
				{label !== undefined && (
					<div className={classNames({
						'ftm-form-field-content__label': true,
						'is-required': rules.some(v => v.required) || required
					})} style={labelWidth ? { width: labelWidth } : {}}>
						{label}<span className="is-required">{rules.some(v => v.required) || required ? '*' : ''}</span>
					</div>
				)}
				<div className={classNames({
					'ftm-form-field-content__control': true
				})} id={id}>{child}</div>

			</div>
			{
				hasFeedback && error && <div className={classNames({
					'ftm-form-field__error': true
				})}>{error}</div>
			}
			
			{suffix !== undefined && <div className={classNames({
				'ftm-form-field__suffix': true
			})}>{suffix}</div>}
		</div>

	)
}


export default FormItem;