export default function Icon({
  className,
  children,
  variant = "contained",
  ...props
}) {
  return (
    <span
      className={`material-icons ${variant} ${className ? className : ""}`}
      {...props}
    >
      {children}
    </span>
  );
}
