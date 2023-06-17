interface FormItemProps {
  label?: string;
  error?: string;
  children: JSX.Element;
}

const InputWrapper = ({ label, error, children }: FormItemProps) => {
  return (
    <div className="input-wrapper">
      {label ? <label className="input-wrapper__label">{label}</label> : null}
      <div className="input-wrapper__input">{children}</div>
      {error ? <div className="input-wrapper__error">{error}</div> : null}
    </div>
  );
};

export default InputWrapper;
