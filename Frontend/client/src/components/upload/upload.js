import React, { useRef, useState } from 'react';
import './upload.css';
import axios from "../../axios/axios";
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth, notify } from '../../Redux/login/action';
import { authLoading } from '../../Redux/login/action';
import { ToastContainer, toast } from 'react-toastify'; // Toast notifications
import 'react-toastify/dist/ReactToastify.css'; // CSS for toast notifications
import { CircularProgress } from '@mui/material';
axios.defaults.withCredentials = true;


const FileUploadComponent = () => {
  const { user, loading, success} = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [courseName, setCourseName] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('video/') || file.type === 'application/pdf') {
        setSelectedFile(file);
        setError('');
      } else {
        setError('Invalid file type. Only videos and PDFs are allowed.');
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('courseName', courseName);
    formData.append('file', selectedFile);
    dispatch(authLoading(true))
    axios.post('http://localhost:5000/api/v1/upload', formData)
      .then(data => {
        dispatch(authLoading(false))
        console.log(data);
        alert('File uploaded successfully!');
      })
      .catch(error => {
        dispatch(authLoading(false))
        console.log("error.response?.status",error)
        if (error.response?.status === 401 && error.response.data.message === 'User does not have privilege!') {
          dispatch(notify("Your Are Not Authorized to upload file"))
          navigate('/home', { replace: true })
 
        }
        else if (error.response?.status === 401){
          localStorage.removeItem('token');
          dispatch(auth(null))
          toast.error('User not authenticated. The token sent is expired.');
          setTimeout(() => {
                
          }, 3000);
          navigate('/join/login-popup', { replace: true })  
        }
        console.error('Error uploading file:', error);
        alert('Failed to upload file.');
      });
  };

  return (
    <div className="file-upload-container">
        <ToastContainer/>

      <form onSubmit={handleSubmit} className="file-upload-form">
        <h2>Upload a File</h2>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Course Name:
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </label>
        <label>
          File:
          <input
            type="file"
            onChange={handleFileChange}
            required
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="submit-button" disabled={loading}>
        {loading ? (
          <CircularProgress style={{ color: "white" }} />
          ) : 
          "Upload"

        }</button>
      </form>
    </div>
  );
};

export default FileUploadComponent;
