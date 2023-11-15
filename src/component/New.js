import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const New=()=>{
    const [selectedname, setSelectedname] = useState("");
    const [selectedmail, setSelectedmail] = useState("");
    const [selectedplace, setSelectedplace] = useState("");
    const [selectedpassword,setSelectedpassword] = useState("");



  const handleSubmit = async (e) => {
      e.preventDefault();
  
  const data = {
        name: selectedname,
        email: selectedmail,
        place:selectedplace,
        password:selectedpassword
      };
  
      console.log("Data to be sent to the backend:", data);

      try {
        const response = await fetch(
          "http://localhost:8082/api/postdata",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
  
        if (response.status === 200) {
          alert("Data submitted successfully");
          setSelectedname("");
          setSelectedmail("");
          setSelectedplace("");
          setSelectedpassword("");
          // setData((prevData) => ([...prevData, data] ));

      } else {
        alert("Error submitting data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting data");
    }
  };
  
    return(
        <div className='d-flex  vh-100 bg-dark justify-content-center align-items-center'>
            <div className='w-90 h-45 bg-white rounded p-3 block'>
            <form onSubmit={handleSubmit} >
            <div className="d-flex flex-column m-2 ">
            <label>Student Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter the student name:"
              value={selectedname}
              onChange={(e) => setSelectedname(e.target.value)}
              required/>


            <label>Student Place:</label>
            <input
              type="text"
              id="place"
              name="place"
              placeholder="Enter the student place:"
              value={selectedplace}
              onChange={(e) => setSelectedplace(e.target.value)}
              required/>


            <label>Student Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter the student email:"
              value={selectedmail}
              onChange={(e) => setSelectedmail(e.target.value)}
              required/>

            <label>Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter new password:"
              value={selectedpassword}
              onChange={(e) => setSelectedpassword(e.target.value)}
              required/>
            </div>
            <div >
                <button className=" btn btn-success submit-btn m-1 " type="submit">Submit</button>
            </div>
            <div >
              <Link to={"./Userlist"} className='btn btn-primary'>View users</Link>
            </div>
           
            </form>
            </div>
        </div>
    )
};

export default New;