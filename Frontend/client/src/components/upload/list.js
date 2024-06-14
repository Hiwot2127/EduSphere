import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'; 
import './FileList.css';


axios.defaults.withCredentials = true;

const DisplayFiles = () => {
  const loading = useRef(true)
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/upload');
      setFiles(res.data.data);
      loading.current = false;
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const categorizedFiles = files.reduce((acc, file) => {
    if (!acc[file.resource_type]) {
      acc[file.resource_type] = [];
    }
    acc[file.resource_type].push(file);
    return acc;
  }, {});

  return (
    <Box className="file-display-container">
      {loading.current ? (
        <Box>
          <Skeleton variant="text" width={210} height={40} />
          <Skeleton variant="rectangular" width={210} height={118} />
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
      ) : (
        <>
          {['video', 'pdf'].map((type) => (
            <div key={type}>
              <Typography variant="h4" className="category-title">
                {type.charAt(0).toUpperCase() + type.slice(1)} Files
              </Typography>
              <div className={`file-list ${type}-list`}>
                {categorizedFiles[type] && categorizedFiles[type].map((file) => (
                  <div className="file-item" key={file.public_id}>
                    <h3>{file.title}</h3>
                    {type === 'video' && (
                      <div className="video-container">
                        <video controls poster={file.thumbnailUrl}>
                          <source src={file.secureUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <p>{file.courseName}</p>
                      </div>
                    )}
                    {type === 'pdf' && (
                      <div className="pdf-container">
                        <embed src={file.secureUrl} type="application/pdf" width="100%" height="400px" />
                        <p>If the PDF does not display, <a href={file.secureUrl} target="_blank" rel="noopener noreferrer">click here to download it</a>.</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </Box>
  );
};

export default DisplayFiles;
