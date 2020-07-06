import React from 'react';

const ErrorText = (props) => {
    return (
        <div style={{ color: 'red' }}>
            {props.children}
        </div>
    )
}

export default ErrorText;