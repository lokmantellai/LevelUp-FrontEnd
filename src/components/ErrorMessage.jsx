function ErrorMessage({ errors, others }) {
    errors = {}
    console.log(errors,'erro');
    // Handling Errors 
    let message;
    if (others == "")        
        message = new Set();
    else 
        message = new Set([others]);
    Object.values(errors).forEach(el => {
        message.add(el.message);
    })
    if (message.has("Email is already used") && message.has("Please enter a valid email address"))
        message.delete("Please enter a valid email address");
    if(message.size > 0)
        return (
        <div className='error-section flex flex-col justify-center items-center rounded-md  w-full text-[#A88622] bg-[#FFFBED] mb-5 py-1'>
            {Array.from(message).map((el, ind) => { return <TextMessage text={el} key={ind} />})}
        </div>
            )
    else
        return (<></>)
}

function TextMessage({text}) {
    return (
        <div className='w-full flex justify-center items-center  text-sm text-[#A88622] py-2 px-4'>{ text }</div>
    )
}

export default ErrorMessage