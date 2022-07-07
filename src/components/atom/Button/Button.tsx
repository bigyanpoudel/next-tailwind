export interface IButtonProps {
  children: any;
  className: string;
}

export const Button = ({ children, className = "" }: IButtonProps) => (
  <button className={`btn ${className}`}>{children}</button>
);
