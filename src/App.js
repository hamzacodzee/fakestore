import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Protected from './components/Protected';

const Base64ImageConverter = lazy(() => import('./components/Random/Base64ImageConverter'));
const RowExpand = lazy(() => import('./components/Random/RowExpand'));
const DynamicInput = lazy(() => import('./components/Random/DynamicInput'));
const AxiosPrac = lazy(() => import('./components/Random/AxiosPrac'));
const PersistRedux = lazy(() => import('./components/PersistRedux/PersistRedux'));
const Home = lazy(() => import('./components/Home'));
const Login = lazy(() => import('./components/Login'));
const Signup = lazy(() => import('./components/Signup'));
const MyAppBar = lazy(() => import('./components/MyAppBar'));
const Edit = lazy(() => import('./components/Edit'));
const DatePicker = lazy(() => import('./components/DatePicker'));
const ViewProduct = lazy(() => import('./components/ViewProduct'));
const Dashboard = lazy(() => import('./components/DashboardFunctions/Dashboard'));
const ViewAllProducts = lazy(() => import('./components/DashboardFunctions/ViewAllProducts'));
const Category = lazy(() => import('./components/DashboardFunctions/Category'));
const FirebaseImageUpload = lazy(() => import('./components/FirebaseImageUpload/FirebaseImageUpload'));
const EventManager = lazy(() => import('./components/EventManager/EventManager'));
const EventDate = lazy(() => import('./components/EventDate'));
const AllProducts = lazy(() => import('./components/AllProducts'));
const StudData = lazy(() => import('./components/Random/StudData'));
const CSCity = lazy(() => import('./components/Random/CSCity'));
const CSCityProper = lazy(() => import('./components/Random/CSCityProper'));
const DateSort = lazy(() => import('./components/Random/DateSort'));
const MultipleFilter = lazy(() => import('./components/MultipleFilter/MultipleFilter'));



function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Protected Component={Home} />} />
          <Route path="/edit" element={<Protected Component={Edit} />} />
          <Route path="/viewproduct/:id" element={<Protected Component={ViewProduct} />} />
          <Route path="/age" element={<DatePicker />} />
          <Route path="/dashboard" element={<Protected Component={Dashboard} />} />
          <Route path="/viewallproducts" element={<Protected Component={ViewAllProducts} />} />
          <Route path="/category" element={<Protected Component={Category} />} />
          <Route path="/image" element={<Protected Component={FirebaseImageUpload} />} />
          <Route path="/event" element={<Protected Component={EventManager} />} />
          <Route path="/eventdate" element={<Protected Component={EventDate} />} />
          <Route path="/allproducts" element={<Protected Component={AllProducts} />} />
          <Route path="/studdata" element={<Protected Component={StudData} />} />
          <Route path="/country" element={<Protected Component={CSCity} />} />
          <Route path="/csc" element={<Protected Component={CSCityProper} />} />
          <Route path="/datesort" element={<Protected Component={DateSort} />} />
          <Route path="/axios" element={<Protected Component={AxiosPrac} />} />
          <Route path="/persist" element={<Protected Component={PersistRedux} />} />
          <Route path="/multifilter" element={<Protected Component={MultipleFilter} />} />
          <Route path="/rowexpand" element={<Protected Component={RowExpand} />} />
          <Route path="/dynamicinput" element={<DynamicInput />} />
          <Route path="/base64" element={<Base64ImageConverter />} />
        </Routes>
      </Suspense>


      <ToastContainer autoClose={3000} position="top-center" theme="colored" />
    </div>
  );
}

export default App;
