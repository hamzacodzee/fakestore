import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Protected from './components/Protected';
import Signup from './components/Signup';
import MyAppBar from './components/MyAppBar';
import Edit from './components/Edit';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import DatePicker from './components/DatePicker';



function App() {
  return (
    <div className="App">

      <MyAppBar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Protected Component={Home} />} />
        <Route path="/edit" element={<Protected Component={Edit} />} />
        <Route path="/age" element={<DatePicker />} />


      </Routes>
      <ToastContainer autoClose={3000} position="top-center" theme="colored" />
    </div>
  );
}

export default App;
