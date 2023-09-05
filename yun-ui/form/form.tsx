
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import classNames from 'classnames';
import FormStore from './formStore'
import FormStoreContext from './formStoreContext'
import FormOptionsContext from './formOptionsContext'

import { cloneDeep, isEqual } from 'lodash';

export interface FormProps {
	mode?: 'card' | 'default';
	className?: string;
	style?: React.CSSProperties;
	rules?: any;
	children?: React.ReactNode;
	initialValues?: any;
	layout?: 'vertical' | 'horizontal';
	requiredMarkStyle?: 'asterisk' | 'text-required' | 'text-optional';
	name?: string;
	onSubmit?: (data:any, e: any) => void;
	validateMessages?: any;
}

const Form = forwardRef((props: FormProps, ref) => {
	const { mode, className = '', children, initialValues = {}, rules = {}, onSubmit, validateMessages = {}, style, ...options } = props;
	
	const [initStatus, setInitStatus] = useState(false);
	const [initRules, setInitRules] = useState({});
	const [initValues, setInitValues] = useState({});
	const [initMessages, setInitMessages] = useState({});

	const [formData, setFormData] = useState<FormStore>();
	useEffect(() => {
		console.log(initStatus, 'initStatus')
		if(!initStatus) {
			setFormData(new FormStore(cloneDeep(initialValues), cloneDeep(rules)));
			setInitRules(cloneDeep(rules));
			setInitValues(cloneDeep(initialValues));
			setInitMessages(cloneDeep(validateMessages));
			setInitStatus(true);
		} else {
			if(!(isEqual(rules, initRules) && isEqual(initValues, initialValues) && isEqual(initMessages, validateMessages))) {
				console.log(123)
				setFormData(new FormStore(cloneDeep(initialValues), cloneDeep(rules)));
				setInitRules(cloneDeep(rules));
				setInitValues(cloneDeep(initialValues));
				setInitMessages(cloneDeep(validateMessages));
			} 
		}
	}, [rules, initialValues, validateMessages])
	
	
	const onFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		e.stopPropagation();
		formData?.validateFields().then((res) => {
			if(!res.valid) {
				return;
			}
			onSubmit && onSubmit(res, e);
		})
	}

	useImperativeHandle(ref, () => {
		return formData as FormStore;
	})

	return (
		<FormStoreContext.Provider value={formData}>
			<FormOptionsContext.Provider value={{...options, initialValues}}>
				<form className={classNames({
					'ftm-form': true,
					'ftm-form__card': mode === 'card'
				}, className)} onSubmit={onFormSubmit}>
					{children}
				</form>
			</FormOptionsContext.Provider>
		</FormStoreContext.Provider>
	)
})

export default Form
