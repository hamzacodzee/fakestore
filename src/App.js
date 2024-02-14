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
import ViewProduct from './components/ViewProduct';
import Dashboard from './components/DashboardFunctions/Dashboard';
import AddProduct from './components/DashboardFunctions/AddProduct';
import ViewAllProducts from './components/DashboardFunctions/ViewAllProducts';


function App() {
  return (
    <div className="App">

      <MyAppBar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Protected Component={Home} />} />
        <Route path="/edit" element={<Protected Component={Edit} />} />
        <Route path="/viewproduct/:id" element={<Protected Component={ViewProduct} />} />
        <Route path="/age" element={<DatePicker />} />
        <Route path="/dashboard" element={<Protected Component={Dashboard} />} />
        <Route path="/viewallproducts" element={<Protected Component={ViewAllProducts} />} />
        <Route path="/addproduct" element={<Protected Component={AddProduct} />} />



      </Routes>
      <ToastContainer autoClose={3000} position="top-center" theme="colored" />
    </div>
  );
}

export default App;
