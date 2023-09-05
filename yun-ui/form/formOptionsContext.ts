import React from 'react'

export interface FormOptions {
  layout?: 'vertical' | 'horizontal'; // 表单布局
  requiredMarkStyle?: 'asterisk' | 'text-required' | 'text-optional'; // 必填选填的标记样式
  name?: string; // 作为表单id前缀使用
  initialValues?: any;
}

const FormOptionsContext = React.createContext<FormOptions>({})

export default FormOptionsContext
