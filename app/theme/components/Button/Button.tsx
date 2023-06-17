import classNames from "classnames";

interface ButtonProps {
  children: JSX.Element | string;
  appearance?: string;
  className?: string;
  [key: string]: any;
}

export default function Button({
  children,
  appearance,
  className,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      {...buttonProps}
      className={classNames("button", {
        ...(appearance ? { [`button--${appearance}`]: true } : null),
        ...(className ? { [className]: true } : {}),
      })}
    >
      {children}
    </button>
  );
}
