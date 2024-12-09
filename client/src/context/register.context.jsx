import { createContext, useContext, useState } from "react";
import {createRegisterRequest, 
    getRegistersRequest, 
    deleteRegisterRequest, 
    getRegisterRequest, 
    updateRegisterRequest} from '../api/register'
const registerContext = createContext();

export const useRegister = () => {
    const context = useContext(registerContext);
    if(!context){
        throw new Error("useRegister must be used within a RegisterProvider");
    }
    return context;
}

export function RegisterProvider({children}){
    const [registers, setRegisters] = useState([]);

    const getRegisters = async () => {
        try{
            const res = await getRegistersRequest();
            setRegisters(res.data)
        }catch(error){
            console.error(error);
        }
    };

    const deleteRegisters = async (id) => {
        try {
          const res = await deleteRegisterRequest(id);
          if (res.status === 204) setRegisters(registers.filter((register) => register._id !== id));
        } catch (error) {
          console.log(error);
        }
    };

    const createRegister = async (register) => {
        const res = await createRegisterRequest(register);
        
    };

    const getRegister = async (id) => {
        try {
          const res = await getRegisterRequest(id);
          return res.data;
        } catch (error) {
          console.error(error);
        }
    };

    const updateRegister = async (id, register) => {
        try {
          await updateRegisterRequest(id, register);
        } catch (error) {
          console.error(error);
        }
    };

    return(
        <registerContext.Provider 
        value = {{
            registers,
            createRegister,
            getRegisters,
            deleteRegisters,
            getRegister,
            updateRegister
            }}
            >
            {children}
        </registerContext.Provider>
    )
}