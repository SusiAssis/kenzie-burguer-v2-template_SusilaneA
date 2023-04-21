import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";
import { StyledInputContainer } from "../../../styles/form";
import { StyledParagraph } from "../../../styles/typography";

interface IInputsProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef(
  (
    { id, label, children, error, ...rest }: IInputsProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div>
        <StyledInputContainer>
          <input type="text" id={id} placeholder="" ref={ref} {...rest} />
          {label ? <label htmlFor={id}>{label}</label> : null}
          {children}
        </StyledInputContainer>
        {error ? (
          <StyledParagraph fontColor="red">{error}</StyledParagraph>
        ) : null}
      </div>
    );
  }
);

export default Input;
