export interface IButtonProps {
  children: any;
  className: string;
  btnType: "primary" | "secondary" | "accent" | "ghost" | "success" | "error";
  onClick: any;
}

export const Button = ({
  children,
  className = "",
  btnType = "primary",
  ...props
}: IButtonProps) => (
  <button className={`btn btn-${btnType} ${className}`} {...props}>
    {children}
  </button>
);
