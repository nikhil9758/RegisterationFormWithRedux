import './App.css';
import Registeration from './components/Registeration';
import store from './redux/store';
import { Provider } from 'react-redux';
function App() {
  return (
    <div className="App">
      <h1>USER REGISTERATION </h1>
       <Provider store={store}>
            <Registeration/>
       </Provider>
    </div>
  );
}

export default App;
