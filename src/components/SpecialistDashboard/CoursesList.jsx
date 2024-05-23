import { useState } from "react"
import Cours from "./Cours"


export default function CoursesList({ data, onCourseClick }) {



    const handleClick = (e) => {
        onCourseClick(e)
    }

    console.log('data from courses list :', data)

    return (
        <div>
            {data.map((e, index) =>
                <Cours key={e.id} data={e} index={index} onClick={(e) => handleClick(e)} />
            )}
        </div>
    )
}