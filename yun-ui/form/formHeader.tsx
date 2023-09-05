import classNames from "classnames";
import React, { ReactNode } from "react";

interface FormHeaderProps {
	title?: string; // 标签名称
	style?: React.CSSProperties;
	className?: string; // 样式class
	children?: ReactNode;
}

const FormHeader = (props: FormHeaderProps) => {
	const { title = '', style = {}, className = '', children } = props;
    return (
        <div className={classNames({
			'ftm-form-header': true
		}, className)} style={style}>
			{title && <div className="ftm-form-header__title">{title}</div>}
			{children}
		</div>
    )
}

export default FormHeader;