import './App.css';
import Registeration from './components/Registeration';
import store from './redux/store';
import { Provider } from 'react-redux';
function App() {
  return (
    <div className="App">
       welcome 
       <Provider store={store}>
            <Registeration/>
       </Provider>
    </div>
  );
}

export default App;
