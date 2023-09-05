const validateMessages = {
    required: '${name}不能为空',
    string: '${name}只能为字符串',
    number: '${name}只能为数字', 
    len: '${name}长度错误', 
    max: '${name}超出最大值', 
    min: '${name}小于最小值', 
    pattern: '${name}填写不合法', 
    date: '${name}不是一个有效的日期',
    url: '${name}不是一个合法的URL',
    enonly: '${name}只能填写英文',
    email: '${name}不是一个合法的邮箱',
    default: '${name}不合法'
}

export default validateMessages;