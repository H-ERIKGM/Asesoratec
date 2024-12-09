import { Link } from "react-router-dom";
import { useAuth } from "../context/auth.context";
function UserCard({userM}) {
    const {deleteUser} = useAuth() 
  return (
    <div className = "bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className = "flex justify-between">
                <h1 className = "text 2xl font-bold text-white">{userM.name}</h1>
                <div className = "flex gap-x-2 items-center">
                    <button className = "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md" onClick = {() =>{
                        deleteUser(userM._id)
                    }}>Eliminar</button>
                    <Link to = {`/users/${userM._id}`}
                    className = "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    >Editar</Link>
                </div>
            </header>
        </div>
  )
}

export default UserCard