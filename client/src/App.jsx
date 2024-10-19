import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/auth.context'
function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<h1>Home page</h1>}/>
        <Route path = '/login' element = {<LoginPage />}/>
        <Route path = '/register' element = {<RegisterPage />}/>
        <Route path = '/classroom' element = {<h1>Classroom</h1>}/>
        <Route path = '/add-classroom' element = {<h1>new classroom</h1>}/>
        <Route path = '/classroom/:id' element = {<h1>update classroom</h1>}/>
        <Route path = 'profile' element = {<h1>profile</h1>}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App