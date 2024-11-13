import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/auth.context'
import { ClassroomProvider } from './context/classroom.context'
import ClassroomPage from './pages/ClassroomPage'
import ClassroomFormPage from './pages/ClassroomFormPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'

import ProtectedRoute from './ProtectedRoute'
import Navbar from './components/Navbar'
function App(){
  return (
    <AuthProvider>
      <ClassroomProvider>
        <BrowserRouter>
        <main className = 'container mx-auto px-10'>
        <Navbar/>
          <Routes>
            <Route path = '/' element = {<HomePage/>}/>
            <Route path = '/login' element = {<LoginPage />}/>
            <Route path = '/register' element = {<RegisterPage />}/>

          <Route element = {<ProtectedRoute/>}>
            <Route path = '/classrooms' element = {<ClassroomPage />}/>
            <Route path = '/add-classroom' element = {<ClassroomFormPage />}/>
            <Route path = '/classrooms/:id' element = {<ClassroomFormPage />}/>
            <Route path = '/profile' element = {<ProfilePage/>}/>
          </Route>
        </Routes>
        </main>
      </BrowserRouter>
      </ClassroomProvider>
    </AuthProvider>
  )
}

export default App