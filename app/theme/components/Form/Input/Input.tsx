import InputWrapper from "../InputWrapper";

interface InputProps {
  label?: string;
  error?: string;
  [key: string]: any;
}

const Input = ({ label, error, ...inputProps }: InputProps) => {
  return (
    <InputWrapper label={label} error={error}>
      <input {...inputProps} className="input" spellCheck={false} />
    </InputWrapper>
  );
};

export default Input;
