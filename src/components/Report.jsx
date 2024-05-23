import { useState } from "react";

export default function Report() {
  // State to store the selected radio button value
  const [selectedOption, setSelectedOption] = useState("");

  // Handler function for radio button change event
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlesubmit = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <div className=" h-[100vh] p-24 flex justify-center">
        <div className="h-[90%] w-[75%]">
          <h1 className="text-3xl font-medium">Report</h1>
          <form className="h-full w-full flex flex-col ">
            <h3 className="text-xl m-4">Select an option:</h3>
            <div className="flex  gap-4 h-[10%] mx-4">
              <div>
                <input
                  type="radio"
                  id="option1"
                  name="options"
                  value="option1"
                  checked={selectedOption === "option1"}
                  onChange={handleChange}
                />
                <label htmlFor="option1" className="text-xl mx-2">
                  Course
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="option2"
                  name="options"
                  value="option2"
                  checked={selectedOption === "option2"}
                  onChange={handleChange}
                />
                <label htmlFor="option2" className="text-xl mx-2">
                  Student
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="option3"
                  name="options"
                  value="option3"
                  checked={selectedOption === "option3"}
                  onChange={handleChange}
                />
                <label htmlFor="option3" className="text-xl mx-2">
                  Teacher
                </label>
              </div>
            </div>
            <textarea className="h-[40%] border-2 rounded-[10px] text-2xl p-4 columns-5" placeholder="Write the name of the course with your complaint (e.g)"></textarea>
            <button
              className="w-[150px] h-[50px] bg-[#FCEE65] hover:opacity-80 rounded-[10px] text-lg font-medium self-end my-5"
              onClick={handlesubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
