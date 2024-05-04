import { createContext, useState } from 'react';

export const RegisterContext = createContext(null);
export const RegisterContextProvider = ({ children }) => {
    // set Data will be sent to api #registre
    const [data, setData] = useState({});
    const [all, setAll] = useState();
    const [prev, setPrev] = useState();
    const [current, setCurrent] = useState();
    const [ModulesSelected, setModulesSelected] = useState([]);
    const save = (name, value) => {
        data[name] = value;
        setData(data);
    }
    const clear = () => {
        setData(null);
    }
    const extract = () => {
        delete data.role;
        if(data.courses_of_interest != null)
            data["courses_of_interest"] = data["courses_of_interest"].join('#');
        return data;
    }
    const saveTemp = (modules) => {
        setModulesSelected(modules);
    }
    const setProgress = (all , prev , current) => {
        setAll(all);
        setPrev(prev);
        setCurrent(current);
    }
    return (
        <RegisterContext.Provider value={{ data, save, clear, extract, all, current, prev , setProgress , saveTemp , ModulesSelected}}>
            {children}
        </RegisterContext.Provider>
    )
}