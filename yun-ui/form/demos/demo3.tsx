import React, { createRef, useState } from "react";
import { Form, FormItem, FormHeader, Input } from "future-mobile-react";

const Demo3 = () => {
	const formRef = createRef();
	const onSubmit = (result: any) => {
		alert(JSON.stringify(result))
	};

	const [rules, setRules] = useState<any>({
		username: [],
		password: [],
		email: [],
		address: []
	})

	const [initialValues, setInitialValues] = useState<any>({
		username: '',
		password: '',
		email: '',
		address: '中山路'
	})

	const [validateMessages, setValidateMessages] = useState<any>({
		// required: '${name} is required',
		len: '${name} length is unvalid',
		max: '${name} is to large',
		min: '${name} is to small',
		pattern: '${name} is not valid',
		string: '${name} is not a string',
		number: '${name} is not a number',
		url: '${name} is not a url',
		enonly: '${name} is enonly'
	})

	return (
		<Form
			rules={rules}
			initialValues={initialValues}
			onSubmit={onSubmit}
			className={'form'}
			ref={formRef}
			name={'demo3'}
			mode={'card'}
			validateMessages={validateMessages}
		>
			<FormHeader title={'用户信息'}></FormHeader>
			<FormItem required label={'usename'} name="username">
				<Input onChange={(e) => { }} />
			</FormItem>
			<FormItem initialValue={'456@qq.com'} label={'email'} rules={[{ pattern: /@qq.com$/, message: '邮箱格式错误' }]} name="email">
				<Input onChange={(e) => { }} />
			</FormItem>
			<FormItem label={'password'} rules={[{ len: 10, message: '长度为10', type: 'string' }]} name="password">
				<Input onChange={(e) => { }} />
			</FormItem>
			<FormHeader title={'地址信息'}></FormHeader>
			<FormItem layout={'horizontal'} label={'address'} name="address">
				<Input onChange={(e) => { }} />
			</FormItem>
		</Form>
	);
}
export default Demo3
