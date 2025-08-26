import "./Button.css";

function SmallButton({ disabled = false, type = "button", children }) {
  return (
    <>
      <button disabled={disabled} type={type} className="small">
        {children}
      </button>
    </>
  );
}
export default SmallButton;
