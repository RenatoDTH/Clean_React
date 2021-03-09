import React, { InputHTMLAttributes, useContext, useRef } from 'react';
import Context from '@/presentation/contexts/form/form-context';
import Styles from './input-styles.scss';

type Props = InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context);
  const inputRef = useRef<HTMLInputElement>();
  const error = state[`${props.name}Error`];

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
  };

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleInputFocus = (): void => {
    inputRef.current.focus();
  };

  return (
    <div
      className={Styles.inputWrap}
      data-testid={`${props.name}-wrap`}
      data-status={error ? 'invalid' : 'valid'}
    >
      <input
        {...props}
        ref={inputRef}
        title={error}
        placeholder=" "
        data-testid={`${props.name}`}
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
      />
      <label
        data-testid={`${props.name}-label`}
        onClick={handleInputFocus}
        onKeyPress={handleInputFocus}
        title={error}
      >
        {props.placeholder}
      </label>
    </div>
  );
};

export default Input;
