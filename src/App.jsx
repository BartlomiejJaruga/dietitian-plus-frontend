import { Routes, Route } from 'react-router-dom'
import HomePage from '@pages/HomePage/HomePage'
import AuthPage from '@pages/AuthPage/AuthPage'
import NotFoundPage from '@pages/NotFoundPage/NotFoundPage'
import DietitianRoute from '@routes/DietitianRoute'
import DietitianDashboardPage from '@pages/DietitianDashboardPage/DietitianDashboardPage'
import UnauthorizedPage from '@pages/UnauthorizedPage/UnauthorizedPage'

import { useState } from 'react'
import './App.scss'

function App() {

  return (
      <>
          <Routes>
              {/* PUBLIC routes */}
              <Route path='/' element={<HomePage/>} />    
              <Route path='/auth' element={<AuthPage/>} />
              <Route path='/unauthorized' element={<UnauthorizedPage/>} />    
              <Route path='*' element={<NotFoundPage/>} />

              {/* Protected DIETITIAN routes */}
              <Route element={<DietitianRoute/>}>
                  <Route path="/dietitian/:dietitianId/dashboard" element={<DietitianDashboardPage/>} />
              </Route>
          </Routes>
      </>
  )
}

export default App
