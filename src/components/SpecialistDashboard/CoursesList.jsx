import Cours from "./Cours"


export default function CoursesList({ data, onCourseClick }) {



    return (
        <div>
            {data.map((e, index) =>
                <Cours key={e.id} data={e} index={index} handleClick={(e) => onCourseClick(e)} />
            )}
        </div>
    )
}