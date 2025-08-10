// src/components/atom/Button/Button.jsx
import "./Button.css";

function Button({ 
  children, 
  variant = "primary",
  size = "medium",
  onClick,
  href,
  disabled = false,
  type = "button"
}) {
  const buttonClassName = `btn btn-${variant} btn-${size} ${disabled ? 'btn-disabled' : ''}`.trim();
  
  if (href) {
    return (
      <a 
        href={href} 
        className={buttonClassName}
      >
        {children}
      </a>
    );
  }
  
  return (
    <button 
      className={buttonClassName}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;