import { useEffect } from "react"
import { useAuth } from "../context/auth.context" 
import UserCard from "../components/UserCard"
function UsersPage() {
    const { getUsers, user } = useAuth();

    useEffect(() => {
        getUsers();
    }, []);

    if (!Array.isArray(user)) {
        console.error('Error: `users` no es un arreglo', user);
        return <h1>Error al cargar los datos.</h1>;
    }

    if (user.length === 0) {
        return <h1>Sin registros :(</h1>;
    }

    return (
        <div className="grid sm:grid-cols-2 grid-cols-3 gap-2">
            {user.map((userM) => (
                <UserCard userM={userM} key={userM._id} />
            ))}
        </div>
    );
}

export default UsersPage