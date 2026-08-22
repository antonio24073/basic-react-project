import { useState } from "react";
import type { BalanceProps } from "../../models/interfaces/BalanceProps/BalanceProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollar } from "@fortawesome/free-solid-svg-icons/faDollar";
import Button from "../Button/Button";
import { FormatMoney } from "../../utils/util";
import styled from "styled-components";
import type { FormContainerProps } from "../../models/interfaces/FormContainerProps/FormContainerProps";


export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Card = styled.div`
  background-color: #36383e;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  height: 300px;
  border-radius: 1.2rem;
  & h3 {
  margin-left: 1rem;
  font-weight: 500;
  font-size: 2.2rem;
  color: #dddcda;
  }
`;
export const CardHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -2rem;
  & h2 {
  margin-left: 1rem;
  font-weight: 500;
  font-size: 2.2rem;
  color: #dddcda;
  }
`;

export const FormContainer = styled.div<FormContainerProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
  & :hover {
    box-shadow: 0 0 0 0 #fff inset, #7af1a7 0 0 0 2px;
  }
  & .invalid input{
    background: ${(props: FormContainerProps) => 
        props.invalid ? "#e43f4d7a"  : ""};
    box-shadow: ${(props: FormContainerProps) =>
        props.invalid ? "inset #e43f4d 0 0 0 2px"  : ""};
  }
`;

export const FormInput = styled.input`
  box-shadow: inset #dddcda 0 0 0 2px;
  border: 0;
  background: rgba(0, 0, 0, 0);
  appearance: none;
  width: 50%;
  position: relative;
  border-radius: 10px;
  padding: 9px 12px;
  line-height: 1.4;
  color: #dddcda;
  font-size: 16px;
  font-weight: 400;
  height: 30px;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 0 0 0 #fff inset, #7af1a7 0 0 0 2px;
  }

  &:focus {
    background: #ffffff00;
    outline: 0;
    box-shadow: 0 0 0 0 #fff inset, #7af1a7 0 0 0 3px;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const Balance = ({ emitMovement, currentBalance }: BalanceProps) => {
    const [renderInputForm, setRenderInputForm] = useState(true);
    const [isFormValid, setIsFormValid] = useState(false);
    const [inputName, setInputName] = useState('');
    const [inputValue, setInputValue] = useState("");


    const hideInputForm = () => {
        setRenderInputForm(false);
        setIsFormValid(false);
        setInputName("");
        setInputValue("");
    };

    const handleRenderInputForm = () => {
        setRenderInputForm(!renderInputForm);
        if (renderInputForm) {
            hideInputForm();
        }
    };

    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (inputName.trim().length === 0 && inputValue.trim().length === 0) {
            setIsFormValid(false);
            return;
        }

        setRenderInputForm(!renderInputForm);
        emitMovement({
            name: inputName,
            value: inputValue,
            type: "Input",
        });

    };

    const handleInputNameForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        const eventTarget = event.currentTarget as HTMLInputElement;
        const eventValue = eventTarget.value;
        inputName.trim().length > 0 ? setIsFormValid(true) : setIsFormValid(false);
        setInputName(eventValue);
    }

    const handleInputValueForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        const eventTarget = event.currentTarget as HTMLInputElement;
        const eventValue = eventTarget.value;
        inputValue.trim().length > 0 ? setIsFormValid(true) : setIsFormValid(false);
        setInputValue(eventValue);
    }

    return <Container>
        <Card>
            <CardHeader>
                <FontAwesomeIcon icon={faDollar} color="#7af1a7" size="2x" />
                <h2>Saldo</h2>
            </CardHeader>

            <h3>{FormatMoney(currentBalance.toFixed(2))}</h3>
            
            {renderInputForm && (
                <Button
                    action={handleRenderInputForm}
                    title="Entrada"
                    priority="input"
                />
            )}
            {!renderInputForm && (
                <form onSubmit={formSubmitHandler}>
                    <FormContainer invalid={!isFormValid}>
                        <FormInput
                            type="text"
                            placeholder="Nome"
                            className="balance_input"
                            value={inputName}
                            onChange={handleInputNameForm}
                        />
                        <FormInput
                            type="text"
                            placeholder="Valor"
                            className="balance_input"
                            value={inputValue}
                            onChange={handleInputValueForm}
                        />
                    </FormContainer>
                    <ActionsContainer>
                        <Button
                            title="Cancelar"
                            priority="output"
                            action={handleRenderInputForm}
                        />
                        <Button
                            title="Adicionar"
                            priority="input"
                            type="submit"
                            disable={!isFormValid}
                        />
                    </ActionsContainer>
                </form>
            )}
        </Card>
    </Container>;
}
export default Balance;