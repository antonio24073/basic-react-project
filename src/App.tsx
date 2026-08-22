
import './App.css'
import Header from './components/Header/Header'
import FinanceControl from './components/FinanceControl/FinanceControl'
import { useState } from 'react';
import type { Movement } from './models/interfaces/Movement/Movement';
import Movements from './components/Movements/Movements';
import { FormatMoney } from './utils/util';


function App() {
  const [currentBalance, setCurrentBalance] = useState(0); // state saldo atual
  const [currentExpenses, setCurrentExpenses] = useState(0); // state de despesas atual
  const [movementsItems, setMovementsItems] = useState<Array<Movement>>([]); // state de movimentações

  const setNewMovement = (movement: Movement) => {
    if (movement) {
      setMovementsItems((prevMoviments) => {
        const movements = [...prevMoviments];
        movements.unshift({
          name: movement.name,
          value: FormatMoney(movement.value),
          type: movement.type,
          id: crypto.randomUUID(),
        });
        return movements;
      });
      movement.type === "Input" && setCurrentBalance(
        (prevBalance) => prevBalance + Number(movement.value)
      );
    }
    if (movement.type === "Output") {
      setCurrentExpenses(
        (prevExpenses) => prevExpenses + Number(movement.value)
      );
      currentBalance > 0 &&
        setCurrentBalance(
          (prevBalance) => prevBalance - Number(movement.value)
        );
    }
  };


  return (
    <div>
      <Header />
      <FinanceControl
        handleSetMovement={setNewMovement}
        balance={currentBalance}
        expenses={currentExpenses}
      />
      <Movements movementsList={movementsItems} />
    </div>
  );
}

export default App
