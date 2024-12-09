import { createContext, useContext, useState } from "react";
import { createUsersRequest, getUsersRequest, deleteUsersRequest, getUserRequest, updateUsersRequest } from "../api/users";

const UserAdmContext = createContext();

export const UseUsers = () => {
    const context = useContext(UserAdmContext);
    if (!context) {
        throw new Error("UseUser must be used within a UserProvider");
    }
    return context;
};

export function UserProvider({ children }) {
    const [users, setUsers] = useState([]);
    const [teachers, setTeachers] = useState([]); // Nuevo estado para almacenar solo los profesores

    const getUsers = async () => {
        try {
            const res = await getUsersRequest();
            setUsers(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getTeachers = async () => {
        try {
            const res = await getUsersRequest();
            const filteredTeachers = res.data.filter((user) => user.role === "teacher"); // Filtra usuarios con rol "teacher"
            setTeachers(filteredTeachers);
        } catch (error) {
            console.error("Error fetching teachers:", error);
        }
    };

    const createUser = async (user) => {
        try {
            const res = await createUsersRequest(user);
            console.log(res);
        } catch (error) {
            console.error("Error creating User:", error.response?.data || error.message);
        }
    };

    const deleteUser = async (id) => {
        try {
            const res = await deleteUsersRequest(id);
            if (res.status === 204) setUsers(users.filter((user) => user._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const getUser = async (id) => {
        try {
            const res = await getUserRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const updateUser = async (id, user) => {
        try {
            await updateUsersRequest(user, id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <UserAdmContext.Provider
            value={{
                users,
                teachers, // Exponer los profesores filtrados
                createUser,
                getUsers,
                getTeachers, // Nueva función para obtener profesores
                deleteUser,
                getUser,
                updateUser,
            }}
        >
            {children}
        </UserAdmContext.Provider>
    );
}
