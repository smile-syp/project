import { type } from '@future/core/dist/types/util/common';
import classNames from 'classnames';
import React, { useContext } from 'react';

import FormOptionsContext from './formOptionsContext';

type FormErrorProps = {
    name: string;
    className?: string;
    style?: React.CSSProperties;
}

const FormError = (props: FormErrorProps) => {

    const options = useContext(FormOptionsContext); // form公用参数

    return (
        <div style={props.style} id={(options.name ? options.name + '.' + props.name : props.name) + '_error'} className={classNames({
            'form-error': true
        }, props.className)}></div>
    )
}

export default FormError;