import { useAuth } from "../context/auth.context";

function ClassroomPage(){
    const {user} = useAuth();
    return (
        <div>ClassroomPage</div>
    )
}

export default ClassroomPage;