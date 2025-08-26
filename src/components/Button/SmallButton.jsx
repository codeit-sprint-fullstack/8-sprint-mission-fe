import "./Button.css";

function SmallButton({ children }) {
  return (
    <>
      <button className="small">{children}</button>
    </>
  );
}
export default SmallButton;
