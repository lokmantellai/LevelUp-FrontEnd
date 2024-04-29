import { createContext, useState } from 'react';

export const RegisterContext = createContext(null);
export const RegisterContextProvider = ({ children }) => {
    // set Data will be sent to api #registre
    const [data, setData] = useState({});
    const save = (name,value) => {
        data[name] = value;
        setData(data);
    }
    const clear = () => {
        setData(null);
    }
    const extract = () => {
        delete data.role;
        data["courses_of_interest"] = data["courses_of_interest"].join('#');
        return data;
    }
    return (
        <RegisterContext.Provider value={{ data, save, clear ,extract}}>
            {children}
        </RegisterContext.Provider>
    )
}