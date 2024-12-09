import { useEffect } from "react"
import { UseUsers } from "../context/UserAdmContext";
import UserCard from "../components/UserCard"
import { Link } from "react-router-dom"
function UserAdmPage(){
    const {getUsers, users} = UseUsers();
    useEffect(() => {
        getUsers()
    }, []);

    if(users.length == 0) return (<h1>No users</h1>);
    
    return (
        <div>
            <h1 className="text-2xl text-center text-black font-bold py-7">Materías</h1>
            <div className="grid grid-cols-3 gap-1">
                {users.map((userM) => (
                <UserCard userM = {userM} key= {userM._id}/>
                ))}
            </div>
        </div>
    )
}
export default UserAdmPage