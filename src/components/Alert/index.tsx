import React, { useEffect, useState } from 'react'

const AlertComponent: React.FC<{ message: string }> = (props) => {
    const [preview, setPreview] = useState(false)

    const loadPreview = () => {
        setPreview(!!props.message);
        setTimeout(() => {
            setPreview(false);
        }, 300000);
    }

    useEffect(() => {
        if (props.message && props.message?.length > 0) loadPreview()
    }, [props.message])

    if (!preview) return null;
    return (
        <div className="alert alert-danger alert-position animate__animated animate__fadeInRight" role="alert">
            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
            {props.message}
            <i className="fa fa-times" aria-hidden="true" onClick={() => setPreview(false)}></i>
        </div>
    )
}

export default AlertComponent
