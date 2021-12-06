
import React, { useCallback, useState } from 'react';

type TextInputProps = {
  name: string;
  submitCallback: (name: string) => void;
  className?: string;
  buttonClassName?: string;
  inputClassName?: string;
}

const TextInput = ({ name, submitCallback, className, buttonClassName, inputClassName }: TextInputProps) => {
  const [listName, setListName] = useState(name);
  const [clicked, setClicked] = useState(false);

  const submitNameChange = useCallback(async () => {
    submitCallback(listName);
    setClicked(false);
  }, [listName]);

  return (
    <div className={`w-[100%] p-2 ${className}`}>
      {!clicked ?
        <button className={`w-[100%] font-bold ${buttonClassName}`} onClick={() => setClicked(true)}>
          {listName}
        </button>
        :
        <input className={`w-[100%]  ${inputClassName}`}
          onChange={e => setListName(e.target.value)}
          onSubmit={submitNameChange}
          onBlur={submitNameChange}
          onKeyDown={e => e.key === 'Enter' && submitNameChange()}
          type="text"
          autoFocus
          value={listName}
        />
      }
    </div>
  );
}

export default TextInput;
