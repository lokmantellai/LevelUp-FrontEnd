
const TimeCounter = ({ spent, type }) => {
    const goal = (type == 'daily') ? 120 : (type == 'weekly') ? 840 : 3360;

    const percentage = parseInt(spent * 100 / goal)

    const circleWidth = 200;
    const radius = 85;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - (dashArray * percentage) / 100;





    function result(minutes) {
        // Calculate hours and minutes
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        // Construct the result string
        let result = '';
        if (hours > 0) {
            result += `${hours}h`;
            if (remainingMinutes > 0) {
                result += ` & ${remainingMinutes}min`;
            }
        } else {
            result = `${remainingMinutes}min`;
        }
        return result;
    }

    return (

        <div>
            <svg



                width={circleWidth}
                height={circleWidth}
                viewBox={`0 0 ${circleWidth} ${circleWidth}`}
            >
                <circle
                    cx={circleWidth / 2}
                    cy={circleWidth / 2}
                    strokeWidth="10px"
                    r={radius}
                    className="circle-bg"
                />

                <circle
                    cx={circleWidth / 2}
                    cy={circleWidth / 2}
                    strokeWidth="10px"
                    r={radius}
                    className="circle-pr"
                    style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset,
                    }}
                    transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
                />

                <text x="50%" y="50%" dy="0.3em" textAnchor="middle" fill="#00333D" className="circle-text">
                    {result(spent)}
                </text>


            </svg>

        </div>

    )
};

export default TimeCounter;
