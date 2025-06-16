import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/auth.context'
import { ClassroomProvider } from './context/classroom.context'
import { RegisterProvider } from './context/register.context'
import ClassroomPage from './pages/ClassroomPage'
import ClassroomFormPage from './pages/ClassroomFormPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'
import AdminHomePage from './pages/AdminHomePage'
import HistoricalPage from './pages/HistoricalPage'
import UsersHomePage from './pages/UsersHomePage'
import RegisterCounselingPage from './pages/RegisterCounselingPage'
import { CounselingProvider } from "./context/counseling.context"
import SubjectPage from "./pages/SubjectPage"
import SubjectFormPage from "./pages/SubjectFormPage"
import { SubjectProvider } from "./context/SubjectContext"
import { UserProvider } from "./context/UserAdmContext"
import UserAdmFormPage from "./pages/UserAdmFormPage"
import UserAdmPage from "./pages/UserAdmPage"
import UserInfo from "./components/UserInfo"
import MenuTeacherPage from "./pages/MenuTeacherPage"
import CounselingFormPage from "./pages/CounselingFormPage"
import MenuUserPage from "./pages/MenuUserPage"
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import ProtectedRoute from './ProtectedRoute'
import Navbar from './components/Navbar'
import UsersPage from './pages/UsersPage'
function App(){
  return (
    <DndProvider backend={HTML5Backend}> 
      <AuthProvider>
        <UserProvider>
          <RegisterProvider>
            <SubjectProvider>
              <ClassroomProvider>
                <CounselingProvider>
                  <BrowserRouter>
                  <main className = 'container mx-auto px-10'>
                  <Navbar/>
                    <Routes>
                      <Route path = '/' element = {<HomePage/>}/>
                      <Route path = '/login' element = {<LoginPage />}/>
                      <Route path = '/register' element = {<RegisterPage />}/>

                      <Route 
                        element={<ProtectedRoute allowedRoles={["admin"]} />}
                      >
                        <Route path='/subjects' element={<SubjectPage/>} />
                        <Route path='/add-subject' element={<SubjectFormPage/>} />
                        <Route path='/subjects/:id' element={<SubjectFormPage/>} />
                        <Route path="/admin" element={<AdminHomePage />} />
                        <Route path="/historical" element={<HistoricalPage />} />
                        <Route path="/classrooms" element={<ClassroomPage />} />
                        <Route path="/add-classroom" element={<ClassroomFormPage />} />
                        <Route path="/classrooms/:id" element={<ClassroomFormPage />} />
                        <Route path='/users' element={<UserAdmPage/>} />
                        <Route path='/users/:id' element={<UserInfo/>} />
                        <Route path='/add-users' element={<UserAdmFormPage/>} />
                        <Route path='/counselings' element={<CounselingFormPage/>} />
                      </Route>

                      <Route 
                        element={<ProtectedRoute allowedRoles={["user"]} />}
                      >
                        <Route path="/registersCounseling" element={<RegisterCounselingPage />} />
                        <Route path='/user' element={<MenuUserPage/>} />
                      </Route>

                      <Route 
                        element={<ProtectedRoute allowedRoles={["teacher"]} />}
                      >
                        <Route path='/teacher' element={<MenuTeacherPage/>} />
                    </Route>
                    
                  </Routes>
                  </main>
                </BrowserRouter>
                </CounselingProvider>
              </ClassroomProvider>
            </SubjectProvider>
          </RegisterProvider>
        </UserProvider>
      </AuthProvider>
    </DndProvider>
  )
}

export default App