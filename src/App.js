import {useState} from 'react';
// import {Alert, Col, Row ,Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

import Login from './LoginScreen/Login'
import BackTesting from './MainComponents/AbelianBackTestingAPP'
import LiveTrading from './MainComponents/AbelianLiveTradingAPP'


function App() {
  const [UserIsLoggedIn, setUserIsLoggedIn] = useState({isLoggedIn: false})
  const [SelectedBackEnd, setSelectedBackEnd] = useState('Please Select a Backend')

  //Conditional Rendering Login Component
  let LoginMount = UserIsLoggedIn.isLoggedIn === false ?
  <Login LogInStatus={setUserIsLoggedIn} Callback={setSelectedBackEnd}></Login> :
  null

  //Conditional Rendering BackTesting FrameWork
  let BackTestingMount = UserIsLoggedIn.isLoggedIn === true && SelectedBackEnd === 'Abelian Backtesting'?
  <BackTesting Callback={setSelectedBackEnd}></BackTesting> :
  null

  //Conditional Rendering LiveTrading FrameWork
  let LiveTradingMount = UserIsLoggedIn.isLoggedIn === true && SelectedBackEnd === 'Abelian LiveTrading'?
  <LiveTrading Callback={setSelectedBackEnd}></LiveTrading> :
  null

  return (
    <div className="App">
      {LoginMount}
      {BackTestingMount}
      {LiveTradingMount}
    </div>
  );
}

export default App;