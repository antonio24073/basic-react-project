import type { ButtonProps } from "../../models/interfaces/ButtonProps/ButtonProps";
import "./Button.css";

const Button = ({ title, priority, action, type, disable }: ButtonProps) => {
  return (
    <button
      className={`btn ${priority == "input" ? "greenBg" : "redBg"}`}
      onClick={action}
      type={type ? type : "button"}
      disabled={disable ? disable : false}
    >
      {title}
    </button>
  )  
}

export default Button;