import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/auth.context'
import ClassroomPage from './pages/ClassroomPage'
import ClassroomFormPage from './pages/ClassroomFormPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'

import ProtectedRoute from './ProtectedRoute'
function App(){
  return (
    <AuthProvider>
      <classroomProvider>
        <BrowserRouter>
          <Routes>
            <Route path = '/' element = {<HomePage/>}/>
            <Route path = '/login' element = {<LoginPage />}/>
            <Route path = '/register' element = {<RegisterPage />}/>

          <Route element = {<ProtectedRoute/>}>
            <Route path = '/classroom' element = {<ClassroomPage />}/>
            <Route path = '/add-classroom' element = {<ClassroomFormPage />}/>
            <Route path = '/classroom/:id' element = {<ClassroomFormPage />}/>
            <Route path = '/profile' element = {<ProfilePage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      </classroomProvider>
    </AuthProvider>
  )
}

export default App