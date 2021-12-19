
import React, { useCallback, useState } from 'react';

type TextInputProps = {
  name: string;
  submitCallback: (name: string) => void;
  className?: string;
  buttonClassName?: string;
  inputClassName?: string;
  inputType?: 'text' | 'textarea';
}

const TextInput = ({ name, submitCallback, className, buttonClassName, inputClassName, inputType = 'text' }: TextInputProps) => {
  const [elementValue, setListName] = useState(name);
  const [clicked, setClicked] = useState(false);

  const submitNameChange = useCallback(async () => {
    submitCallback(elementValue);
    setClicked(false);
  }, [elementValue]);

  const inputElement = inputType === 'text' ?
    <input className={`w-[100%]  ${inputClassName}`}
      onChange={e => setListName(e.target.value)}
      onSubmit={submitNameChange}
      onBlur={submitNameChange}
      onKeyDown={e => e.key === 'Enter' && submitNameChange()}
      type='text'
      autoFocus
      value={elementValue}
    />
    :
    <textarea className={`w-[100%]  ${inputClassName}`}
      onChange={e => setListName(e.target.value)}
      onSubmit={submitNameChange}
      onBlur={submitNameChange}
      onKeyDown={e => e.key === 'Enter' && submitNameChange()}
      autoFocus
      value={elementValue}
    />;

  return (
    <div className={`w-[100%] p-2 ${className}`}>
      {!clicked ?
        <button className={`w-[100%] font-bold ${buttonClassName}`} onClick={() => setClicked(true)}>
          {elementValue}
        </button>
        :
        inputElement
      }
    </div>
  );
}

export default TextInput;
