import './FinanceControl.css'
import type { FinanceControlProps } from '../../models/interfaces/FinanceControlProps/FinanceControlProps';
import type { Movement } from '../../models/interfaces/Movement/Movement';
import Balance from '../Balance/Balance';
import Expense from '../Expense/Expense';

const FinanceControl = ({
    handleSetMovement,
    balance,
    expenses,
}: FinanceControlProps) => {
    const receiveNewMovement = (movement: Movement) => {
        movement && handleSetMovement(movement);
    };
    return (
        <div className="container_finances">
         <Balance currentBalance={balance} emitMovement={receiveNewMovement}></Balance>
         <Expense currentBalance={balance} currentExpenses={expenses} emitMovement={receiveNewMovement}></Expense>
        </div>
    )
}

export default FinanceControl