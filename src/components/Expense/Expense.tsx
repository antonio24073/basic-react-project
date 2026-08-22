
import { useState } from "react";
import type { ExpenseProps } from "../../models/interfaces/ExpenseProps/ExpenseProps"
import "./Expense.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPercent } from "@fortawesome/free-solid-svg-icons/faPercent";
import Button from "../Button/Button";
import { FormatMoney } from "../../utils/util";
import {
    ActionsContainer,
    Card,
    CardHeader,
    Container,
    FormContainer,
    FormInput,
} from "../Balance/Balance";

const Expense = ({ emitMovement, currentExpenses, currentBalance }: ExpenseProps) => {
    const [renderInputForm, setRenderInputForm] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [inputName, setInputName] = useState("");
    const [inputValue, setInputValue] = useState("");

    const handleRenderInputForm = () => setRenderInputForm(!renderInputForm);

    const hideInputForm = () => {
        setRenderInputForm(false);
        setIsFormValid(false);
        setInputName("");
        setInputValue("");
    };


    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (inputName.trim().length === 0 && inputValue.trim().length === 0) {
            setIsFormValid(false);
            return;
        }

        if (currentBalance >= Number(inputValue)) {
            hideInputForm();
            emitMovement({
                name: inputName,
                value: inputValue,
                type: "Output",
            });
        } else {
            setIsFormValid(true);
        }


        currentExpenses = currentExpenses + parseFloat(inputValue);
        currentBalance = currentBalance - parseFloat(inputValue);
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
                <FontAwesomeIcon icon={faPercent} color="#E43F4d" size="2x" />
                <h2>Despesas</h2>
            </CardHeader>
            
            <h3>{FormatMoney(currentExpenses.toFixed(2))}</h3>

            {!renderInputForm && (
                <Button
                    action={handleRenderInputForm}
                    title="Saída"
                    priority="Output"
                    disable={currentBalance === 0}
                />
            )}
            {renderInputForm && (
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

export default Expense