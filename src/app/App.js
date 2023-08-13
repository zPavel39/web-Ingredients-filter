import { useState } from 'react';
import './App.css';
import ModalFilter from '../components/modal-filter/ModalFilter';

function App() {
  const [activeModal, setActiveModal] = useState(false)

  const  callbacks = {
    setActiveModal: () => {
      setActiveModal(true)
    }
  }

  return (
    <div className="App">
      <button onClick={callbacks.setActiveModal}></button>
      {activeModal ? <ModalFilter/> : ''}
    </div>
  );
}

export default App;
