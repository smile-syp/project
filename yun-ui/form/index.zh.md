# Form 表单

### 基础使用
<code src="./demos/demo1.tsx"></code>

### 自定义校验及组件
<code src="./demos/demo2.tsx"></code>

### 表单数据更新规则
<code src="./demos/demo3.tsx"></code>

### Form 属性

| 属性      | 说明      | 类型      | 默认值        |
| --------- | --------- | --------- | ------------ |
| mode      | 表单类型      | `'default' \| 'card'`     | `'default'` |
| className | 表单的class   | `'string'`   |   -   |
| rules     | 验证规则     | `'Rule[]'`     |   -   |
| initialValues  | 表单默认值，只有初始化及重置是生效   | `'object'`    |   -   |
| layout    | 排列方式      | `'vertical' \| 'horizontal'`     | `'vertical'` |
| requiredMarkStyle     | 必填项标记样式    | `'asterisk' \| 'text-required' \| 'text-optional'`    | `'asterisk'`  |
| name      | 作为表单元素id前缀    | `'string'`   |   -   |
| onSubmit  | 表单提交触发的方法    | `'function({valid: boolean}, event: React.FormEvent)'`    |   -   |
| validateMessages  | 验证提示模板    | `'ValidateMessages'`    |   -   |

### FormInstatnce 方法

| 属性      | 说明      | 类型      |
| --------- | --------- | --------- |
| getFieldValue | 获取字段值    | `'(name: string) => any'`  |
| getFieldsValue  | 获取全部字段    | `'() => any'`  |
| setFieldValue  | 设置表单数据的值    | `'(name: string, value: any, validate: boolean) => void'`  |
| setFieldsValue  | 设置表单数据的值    | `'(Array<{name: string, value: any, validate: boolean}>) => void'`  |
| validateField  | 触发单个字段的校验    | `'(name: string) => Promise'`  |
| validateFields  | 触发整个表单的校验    | `'() => Promise'`  |
| resetFields  | 重置表单数据    | `'() => void'`  |
| scrollToField    | 滚动到某个表单的位置   |   `'(id: string) => void'` |
| getFieldsError  | 获取当前错误信息    | `'() => FiledError[]'`  |

### CSS 变量

| 属性               | 说明     | 默认值                    | 全局变量                        |
| ------------------ | -------- | ------------------------- | ------------------------------- |
|          -         |      -     |                -           |              -                 |

### FormItem 属性

| 属性      | 说明      | 类型      | 默认值        |
| --------- | --------- | --------- | ------------ |
| label     | 标签名称      | `'ReactNode'`     | - |
| labelWidth     | 标签长度      | `'string'`     | - |
| style     | 样式      | `'React.CSSProperties'`     | - |
| layout    | 排列方式      | `'vertical' \| 'horizontal'`     | 默认使用Form的layout |
| name      | 字段的名称    | `'string'`   |   -   |
| className | 表单项的class   | `'string'`   |   -   |
| required  | 是否必填，如果存在rules，则合并rules   | `'boolean'`   |   `'false'`   |
| rules  | 验证规则，如果与Form的initialValues冲突，使用当前的值   | `'Rule[]'`   |   默认使用form的rules   |
| initialValue  | 默认值，如果与Form的initialValues冲突，使用当前的值   | `'any'`   |   默认使用Form的值   |
| suffix  | 表单项页脚   | `'ReactNode'`   |   -   |
| trigger  | 设置收集字段的时机   | `'string'`   | `'onChange'`   |
| validateTrigger  | 设置校验字段的时机   | `'array'`   | `'onChange'`   |
| valueProp  | 自定义受控组件的value   | `'string'`   | `'value'`   |
| valueGetter  | 自定义受控组件的onChange   | `'string'`   | `'onChange'`   |
| hasFeedback  | 是否显示错误反馈   | `'boolean'`   | `'true'`   |

### FormHeader
用于表单分组

| 属性      | 说明      | 类型      | 默认值        |
| --------- | --------- | --------- | ------------ |
| title     |   分组标题    | `'ReactNode'`     | - |
| style     |   样式    | `'React.CSSProperties'`     | - |
| className     |   分组的class    | `'string'`     | - |
| children     |   子组件    | `'ReactNode'`     | - |


通用类型定义

### Rule

| 属性   | 说明      | 类型      | 
| --------- | --------- | --------- |
| required  | 是否必填  |   `'boolean'` |
| string  | 是否为字符串  |   `'boolean'` |
| number  | 是否为数字  |   `'boolean'` |
| len    | 必须设置type string 类型时为字符串长度；number 类型时为确定数字； array 类型时为数组长度   | `'number'`   |
| max    | 必须设置type string 类型为字符串最大长度；number 类型时为最大值；array 类型时为数组最大长度   | `'number'`  |
| min    | 必须设置type string 类型为字符串最小长度；number 类型时为最小值；array 类型时为数组最小长度   | `'number'`  |
| pattern   | 正则表达式    | `'RegExp'`    |
| date  | 是否为日期类型  | `'boolean'`  |
| url  | 是否为url  | `'boolean'`  |
| enonly  | 只允许英文  | `'boolean'`  |
| email  | 是否为邮箱  | `'boolean'`  |
| type  | 字段类型  | `'string' \| 'number' \| 'array' \| 'object' \| 'boolean'`  |
| validator | 自定义校验    | `'(value) => Promise<string\|boolean> \| string \| boolean'`    |
| warningOnly   | 仅警告不阻塞表单提交  |   `'boolean'` |
| message    |  错误信息  | `'string'`  |

### ValidateMessages
<a href="http://git.vemic.com/MIC/future-mobile/future-mobile-react/-/blob/master/src/components/form/local/zh.ts" target="_blank">Link</a>