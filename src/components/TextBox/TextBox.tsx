import React, { FC } from 'react'
import PropTypes from 'prop-types'
import { ITextBoxProps } from '@Interface/ReusableComponentInterface/InputsInterface'

const TextBox: FC<ITextBoxProps> = props => {
  const { handleIconClick, handlechange, errorMessageComponent, icon, ...rest } = props

  return (
    <div className="inputField textbox-field">
      <label className="label-style fs-12 text-color3">{props.labelname}</label>
      <div className="input-group mb-0 pb-4 ">
        <input
          type={props.type}
          name={props.name}
          className="input-wrapper form-control text-color4 
          fs-14 px-0 border-top-0 border-end-0 border-start-0 rounded-0 border"
          placeholder={props.placeholder}
          aria-label="userName"
          onChange={handlechange}
          {...rest}
        />
        <i className="eye-icon" onClick={handleIconClick}>
          <span className={icon}></span>
        </i>
      </div>
      {errorMessageComponent && (errorMessageComponent)}
    </div>
  )
}

export default TextBox

TextBox.defaultProps = {
  type: 'text',
  labelname: 'label',
  placeholder: 'place holder',
}

TextBox.propTypes = {
  type: PropTypes.string,
  labelname: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
}
