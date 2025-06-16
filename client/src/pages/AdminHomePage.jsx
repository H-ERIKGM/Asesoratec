import { Link } from "react-router-dom";
import usersImg from './img/32441.png'
import scheduleImg from './img/4368667.png'
import historicalImg from './img/32284.png'
function AdminHomePage(){
    return (
        <div className='flex h-[calc(80vh)] items-center justify-around px-20'>
            <Link to="/users">
                <div className="transition-transform duration-300 ease-in-out hover:scale-110">
                    <img src={usersImg} alt="Users" className="transition-transform duration-300 ease-in-out hover:scale-110" style={{ width: '200px', height: 'auto' }} />
                    <label className="flex gap-x-2 py-3 justify-center text-black font-bold ">Usuarios</label>
                </div>
            </Link>
            <Link to="/counselings">
                <div className="transition-transform duration-300 ease-in-out hover:scale-110">
                    <img src={scheduleImg} alt="Schedule" className="transition-transform duration-300 ease-in-out hover:scale-110" style={{ width: '200px', height: 'auto' }} />
                    <label className="flex gap-x-2 py-3 justify-center text-black font-bold">Administración de horarios</label>
                </div>
            </Link>
            <Link to="/historical">
                <div className="transition-transform duration-300 ease-in-out hover:scale-110">
                    <img src={historicalImg} alt="Schedule" className="transition-transform duration-300 ease-in-out hover:scale-110" style={{ width: '200px', height: 'auto' }} />
                    <label className="flex gap-x-2 py-3 justify-center text-black font-bold">Historial</label>
                </div>
            </Link>
        </div>
    )
}

export default AdminHomePage