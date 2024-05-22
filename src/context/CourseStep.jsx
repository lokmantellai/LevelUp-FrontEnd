import { createContext, useEffect, useState } from 'react';
import useAxios from '../api/useAxios';
import { useParams } from 'react-router-dom';
import { set } from 'lodash';

export const EnrollCourseContext = createContext(null);

export const EnrollCourseProvider = ({ children }) => {
    const { lessonId } = useParams();
    const { privateAxios } = useAxios();
    const [all, setAll] = useState(1);
    const [allContent, setAllContent] = useState();
    const [isLoading, setIsLoading] = useState(false);
    console.log();
    useEffect(() => {
        setIsLoading(true)
        privateAxios.get(`users/lessons/${lessonId}/slides/`)
            .then((res) => {
                console.log("Content ", res.data);
                setAllContent(res.data)
                setAll(res.data.length - 1);
                setIsLoading(false);
            }).catch(() => {
                setIsLoading(false)
            }).finally(() => {
                setIsLoading(false)
            })
    }, [])
    if (isLoading)
        return (
            <>Loading ...</>
        )
    console.log(allContent,"allcontent");
    return (
        <EnrollCourseContext.Provider value={{ all, allContent }}>
           {children}
        </EnrollCourseContext.Provider>
    )
}