import React, { createRef, useState } from "react";
import { 
	Form, 
	FormItem, 
	FormHeader, 
	Input, 
	TextArea, 
	Radio, 
	Checkbox, 
	Cascader,
	Switch,
	FileUpload,
	CheckList, 
	Space, 
	Button 
} from "future-mobile-react";

const Demo1 = () => {
	const formRef = createRef<any>();

	const [initialValues, setInitialValues] = useState<any>({
		username: '法外狂徒张三',
		password: '123456',
		email: '',
		sex: 0,
		favorite: [],
		country: '',
		address: '',
		detailAddress: '',
		pic: []
	})

	const onSubmit = (result: any) => {
		alert(JSON.stringify(result))
	};

	const [rules, setRules] = useState<any>({
		email: [{ email: true }],
		address: [{ len: 1, message: 'length is 1', type: 'string' }],
		detailAddress: [{ max: 20, type: 'string' }],
		pic: [{ min: 2, type: 'array' }, { max: 3, type: 'array' }]
	})

	const resetFields = (e: any) => {
		e.preventDefault();
		formRef.current?.resetFields();
	}

	return (
		<Form
			rules={rules}
			initialValues={initialValues}
			onSubmit={onSubmit}
			ref={formRef}
			name={'demo1'}
		>
			<FormHeader title={'用户信息'}></FormHeader>
			<FormItem required label={'姓名'} name="username">
				<Input />
			</FormItem>
			<FormItem label={'密码'} rules={[{ required: true }, { len: 10, message: '长度为10', type: 'string' }]} name="password">
				<Input type="password" />
			</FormItem>
			<FormItem label={'邮箱'} name="email">
				<Input />
			</FormItem>
			<FormItem label={'性别'} required name="sex">
				<Radio.Group>
					<Space direction='horizontal'>
						<Radio value={0}>男</Radio>
						<Radio value={1}>女</Radio>
					</Space>
				</Radio.Group>
			</FormItem>
			<FormItem label={'兴趣'} name="favorite">
				<Checkbox.Group>
					<Space direction='vertical'>
					{[{ label: '吃饭', value: 0 }, { label: '睡觉', value: 1 }, { label: '打豆豆', value: 2 }].map(item => (
						<Checkbox key={item.value} value={item.value}>
							{item.label}
						</Checkbox>
					))}
					</Space>
				</Checkbox.Group>
			</FormItem>
			<FormHeader title={'地址信息'}></FormHeader>
			<FormItem label={'所属国家'} name="country">
				<CheckList>
					<CheckList.Item value='zhongguo'>中国</CheckList.Item>
					<CheckList.Item value='riben'>日本</CheckList.Item>
					<CheckList.Item value='meiguo'>美国</CheckList.Item>
				</CheckList>
			</FormItem>
			{/* <FormItem label={'省市区'}>
		
			</FormItem> */}
			<FormItem label={'详细地址'} name="detailAddress">
				<TextArea maxLength={100} showCount placeholder="请输入" />
			</FormItem>

			<FormItem label={'请上传文件'} name="pic">
				<FileUpload></FileUpload>
			</FormItem>
			
			<FormHeader>
				<div style={{ display: 'flex', padding: '20px', justifyContent: 'space-around' }}>
					<Button type="submit">表单默认提交</Button>
					<Button onClick={resetFields}>重置表单</Button>
				</div>
			</FormHeader>
		</Form>
	);
}
export default Demo1
