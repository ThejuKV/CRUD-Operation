import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';

const Userlist=()=>{

const [studentData,setStudentData]=useState([]);
const [deleteConfirmation, setDeleteConfirmation] = useState(null);
const [editData, setEditData] = useState(null);
const [showPopup, setShowPopup] = useState(false);

useEffect(()=> {
        fetch('http://localhost:8082/api/users')
        .then((response) => response.json())
        .then((studentData) => {
            setStudentData(studentData);
        })
        .catch((error) => {
            console.error('Error fetching data: ', error);
        });
      
},[]);

const handleDelete = (student_id) => {
            setDeleteConfirmation(student_id);
    };
    

const confirmDelete = (student_id) => {
    if (deleteConfirmation !== null) {
        fetch(`http://localhost:8082/api/deleteRow/${deleteConfirmation}`, {
            method: 'DELETE',
        })
        .then(() => {
            const updatedStudentData = studentData.filter((item) => item.student_id !== student_id);
            setStudentData(updatedStudentData);
        })
        .catch((error) => {
            console.error('Error deleting data: ', error);
        });

        setDeleteConfirmation(null);
    }
};

const handleEdit = (student_id) => {
    const selectedStudent = studentData.find((item) => item.student_id === student_id);
    setEditData(selectedStudent);
    setShowPopup(true);
  };

  const handleSaveEdit = () => {
    if (editData) {
      const { student_id, name, place, email } = editData;
  
      fetch(`http://localhost:8082/api/updateRow/${student_id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, place, email }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log('Data updated successfully:', result);
          
          const updatedStudentData = studentData.map((item) =>
                item.student_id === student_id ? { ...item, name, place, email } : item
                );
                setStudentData(updatedStudentData);
                setEditData(null);
                setShowPopup(false);
        })
        
        .catch((error) => {
          console.error('Error updating data:', error);
        });
    }
    
  };

  const handleCloseEdit = () => {
    setEditData(null);
    setShowPopup(false);
  };


return(
    
        <div className="d-flex container-fluid vh-100 justify-content-center align-content-center">
        <Link to={"/"}><button className='btn btn-primary '>Back</button></Link>
            <div className='row '>
                <div className='col'>
                    <h4 className='text-center mt-3'>Student List</h4>
                        <table className='table table-bordered'>
                        <thead>
                            <tr className='table-success m-2'>
                                {/* <th>Student Id</th> */}
                                <th>Student Name</th>
                                <th>Student Place</th>
                                <th>Student Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentData.map((item) => (
                            <tr key={item.student_id}>
                            {/* <td>{item.student_id}</td> */}
                            <td>{item.name}</td>
                            <td>{item.place}</td>
                            <td>{item.email}</td>
                            <td>

                    <button  className="btn btn-success m-1" onClick={() => handleEdit(item.student_id)}>Edit</button>
                    <button onClick={() => handleDelete(item.student_id)} className="btn btn-danger " data-userid={item.student_id}>Delete</button>

                    {deleteConfirmation === item.student_id && (
                      <div>
                        <p>Do you want to delete this row?</p>
                        <button onClick={confirmDelete} className='btn btn-dark m-1'>Yes</button>
                        <button onClick={() => setDeleteConfirmation(null)} className='btn btn-dark'>No</button>
                      </div>
                    )}
                    </td>
                    </tr>
                 ))}
                </tbody>
            </table>
        </div>
    </div>
    {editData && showPopup && (
        <div className="form-group m-3">
          <div className="popup-content">
          <button type="button" onClick={handleCloseEdit} class="btn-close" aria-label="Close"></button>
            {/* <span className="close" onClick={handleCloseEdit}>
              &times;
            </span> */}
            <h4>Update the student details</h4>
            <label>Name:</label>
            <input
              type="text"
              className='form-control'
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            />
            <label>Place:</label>
            <input
              type="text"
              className='form-control'
              value={editData.place}
              onChange={(e) => setEditData({ ...editData, place: e.target.value })}
            />
            <label>Email:</label>
            <input
              type="email"
              className='form-control'
              value={editData.email}
              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
            />
            <button className="btn btn-primary m-1" onClick={handleSaveEdit}>Update</button>
          </div>
        </div>
      )}
</div>
    
);
};

export default Userlist