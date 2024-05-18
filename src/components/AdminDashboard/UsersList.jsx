import User from "./User"


export default function UsersList({ data, onCourseClick }) {
    console.log("data for Users List",data)
    const handleClick = (e) => {
        onCourseClick(e)
    }
    
    return (
        <div>
            {data.map((e, index) =>
                <User key={e.id} data={e} index={index} onClick={(e) => handleClick(e)} />
            )}
        </div>
    )
}