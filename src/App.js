import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Protected from './components/Protected';
// import MyAppBar from './components/MyAppBar';


function App() {
  return (
    <div className="App">

      {/* <MyAppBar /> */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Protected Component={Home} />} />
      </Routes>

    </div>
  );
}

export default App;
