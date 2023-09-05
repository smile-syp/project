// import React, { createRef, useEffect, useState } from "react";
// import { Form, FormItem, FormHeader, FormError, Input, Button } from "future-mobile-react";

// type CustomProp = {
//     onDataChange?: (val: any) => void;
//     onValidate?: () => void;
//     value?: string;
//     placeholder?: string;
// }

// // 自定义值的规则
// const Custom = (props: CustomProp) => {
//     return (
//         <div>
//             { props.value }
//             <br />
//             <Button style={{ marginTop: '10px' }} onClick={() => {
//                 props.onDataChange && props.onDataChange({target: {value: props.value === 'changedata' ? 'default' : 'changedata'}})
//             }}>onDataChange</Button> 
//             <br />
//             <Button style={{ marginTop: '10px' }} onClick={() => {
//                 props.onValidate && props.onValidate()
//             }}>onValidate</Button> 
//         </div>
//     )
// }

// type CustomDataProp = {
//     onChange?: (val: any) => void;
//     data?: string;
//     placeholder?: string;
// }

// const CustomData = (props: CustomDataProp) => {
//     return (
//         <div>
//             <input style={{ border: 0, outline: 0 }} value={props.data} onChange={(e) => {
//                 props.onChange && props.onChange({data: e.target.value + '123'})
//             }}></input>
//         </div>
//     )
// }

// const Demo2 = () => {
// 	const formRef = createRef();
// 	const onSubmit = (result: any) => {
// 		alert(JSON.stringify(result))
// 	};

// 	const [rules, setRules] = useState<any>({
// 		username: [],
// 		password: [],
// 		email: [{ required: true }],
// 		address: []
// 	})

// 	const [initialValues, setInitialValues] = useState<any>({
// 		username: '',
// 		password: '',
// 		email: '123456789@qq.com',
// 		address: '中山路'
// 	})


// 	const [itemRules, setItemRules] = useState<any>([])
	
// 	const getData = (object: any) => {
// 		return object.data;
// 	}


// 	return (
// 		<>
// 			<Form
// 				rules={rules}
// 				initialValues={initialValues}
// 				onSubmit={onSubmit}
// 				ref={formRef}
// 				name={'demo2'}
// 				layout={'horizontal'}
// 			>
// 				<FormHeader title={'用户信息'}></FormHeader>
// 				<FormItem hasFeedback={false} required label={'username'} labelWidth={'150px'} suffix={<span>这是一段描述文字</span>} name="username">
// 					<Input placeholder="请输入" />
// 				</FormItem>
// 				<FormError name={'username'} />
// 				<FormItem initialValue={'987654321@qq.com'} layout={'vertical'} label={'email 覆盖form属性'} rules={[{ validator:(val) => { return !!val }, message: '不能为空' }, { pattern: /@qq.com$/, message: '邮箱格式错误' }]} name="email">
// 					<Input />
// 				</FormItem>
// 				<FormItem initialValue={'default'} label={'password 修改change函数和validate函数'} layout={'vertical'} trigger={'onDataChange'} validateTrigger={['onValidate']} rules={[{ len: 10, message: '长度为10', type: 'string' }]} name="password">
// 					<Custom />
// 				</FormItem>
// 				<FormHeader title={'地址信息'}></FormHeader>
// 				<FormItem rules={itemRules} layout={'vertical'} valueProp={'data'} valueGetter={getData} label={'address 修改赋值参数和取值函数'} name="address">
// 					<CustomData />
// 				</FormItem>
// 				<FormHeader>
// 					<div style={{ display: 'flex', paddingBottom: '8px', flexFlow: 'wrap' }}>
// 						<Button type="submit">submit</Button>
// 					</div>
// 				</FormHeader>
// 			</Form>
// 		</>
// 	);
// }
// export default Demo2
