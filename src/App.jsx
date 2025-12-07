import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import LoginPage from './pages/Login';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import QuizzesPage from './pages/QuizzesPage';

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <HomePage />
          </>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path='/profile' element={<ProfilePage/>}/>
      <Route path ='/quizzes' element={<QuizzesPage/>}/>
    </Routes>
  );
  
}

