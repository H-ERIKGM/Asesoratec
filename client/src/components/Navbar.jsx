import { Link } from "react-router-dom";
import { useAuth } from "../context/auth.context";
//import { ButtonLink } from "./ui/ButtonLink";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user)

  return (
    <nav className="bg-red-950 my-3 flex justify-between py-5 px-10 rounded-lg">
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? "/classrooms" : "/"}>Salones</Link>
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              Bienvenido {user.name}
            </li>
            <li>
              <Link to="/add-classroom">Añadir clase</Link>
            </li>
            <li>
              <Link to="/" onClick={() => logout()}>
                Cerrar sesión
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Iniciar sesión</Link>
            </li>
            <li>
              <Link to="/register">Registrarse</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;