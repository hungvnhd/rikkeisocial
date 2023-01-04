import { useState, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Cookies from "js-cookie";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAG5NaMDy52e7f-_w-VdXc-XoqV2ZYZr0Y",
  authDomain: "rikkeichat-94b17.firebaseapp.com",
  projectId: "rikkeichat-94b17",
  storageBucket: "rikkeichat-94b17.appspot.com",
  messagingSenderId: "629791864097",
  appId: "1:629791864097:web:3b6b70e7db097a5bb47a60",
  measurementId: "G-66TBPVXQ9Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage();

function CreatePost(props) {
  const { userData } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [preview, setPreview] = useState();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  let handleSubmit = (e) => {
    // const data = { file: selectedFile };
    e.preventDefault();
    const file = selectedFile;
    if (selectedFile === undefined) {
      console.log(e.target.content.value);
      const data = {
        userId: Cookies.get("userID"),
        content: e.target.content.value,
        postImg: null,
      };
      console.log(data);
      fetch("http://127.0.0.1:8000/api/v1/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setOpen(false);
        })

        .catch((err) => console.log(err));
    } else {
      const metadata = {
        contentType: "image/jpeg",
      };

      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, "images/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const data = {
              userId: Cookies.get("userID"),
              content: e.target.content.value,
              postImg: downloadURL,
            };
            fetch("http://127.0.0.1:8000/api/v1/posts", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((res) => res.json())
              .then((data) => console.log(data))
              .catch((err) => console.log(err));
          });
        }
      );
    }
  };
  return (
    <>
      <div className='post-layout block'>
        <div className='post-header'>
          <img src={userData[0].avatar} alt='' className='post-avatar' />
          <div className='post-start' onClick={handleOpen}>
            Start a post
          </div>
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box className='post-modal-box'>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid #EBEBEB",
                    }}
                  >
                    <span>Create a post</span>{" "}
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <i className='fa-solid fa-xmark'></i>
                    </span>
                  </div>
                </Typography>
                <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                  <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "50px", marginRight: "10px" }}>
                        <img
                          style={{ width: "100%" }}
                          src='https://avatars.githubusercontent.com/u/55929607?v=4'
                          alt=''
                        />
                      </div>
                      <div>
                        <span> Manh Hung Nguyen</span>
                        <div>
                          <span>
                            <i class='fa-solid fa-globe'></i>{" "}
                            <span>Anyone</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <textarea
                      type='text'
                      className='modal-input'
                      name={"content"}
                    />
                    {selectedFile && (
                      <img
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          maxHeight: "400px",
                        }}
                        src={preview}
                      />
                    )}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <label class='label'>
                          <input
                            type='file'
                            onChange={onSelectFile}
                            name={"img"}
                          />
                          <span>
                            <i
                              className='fa-regular fa-image'
                              style={{ color: "#666666" }}
                            ></i>
                          </span>
                        </label>
                        <label class='label'>
                          <input type='file' />
                          <span>
                            <i
                              className='fa-brands fa-youtube'
                              style={{ color: "#666666" }}
                            ></i>
                          </span>
                        </label>
                        <label class='label'>
                          <input type='file' />
                          <span>
                            <i
                              className='fa-solid fa-file'
                              style={{ color: "#666666" }}
                            ></i>
                          </span>
                        </label>
                        <label class='label'>
                          <input type='file' />
                          <span>
                            <i
                              className='fa-solid fa-suitcase'
                              style={{ color: "#666666" }}
                            ></i>
                          </span>
                        </label>
                        <label class='label'>
                          <input type='file' />
                          <span>
                            <i
                              className='fa-sharp fa-solid fa-award'
                              style={{ color: "#666666" }}
                            ></i>
                          </span>
                        </label>
                        <label class='label'>
                          <input type='file' />
                          <span>
                            <i
                              className='fa-solid fa-chart-column'
                              style={{ color: "#666666" }}
                            ></i>
                          </span>
                        </label>
                      </div>
                      <div style={{ lineHeight: "280%" }}>
                        <button
                          style={{
                            width: "50px",
                            padding: "5px",
                            border: "none",
                            backgroundColor: "#1866BE",
                            color: "white",
                            borderRadius: "999px",
                            cursor: "pointer",
                          }}
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </form>
                </Typography>
              </Box>
            </Modal>
          </div>
        </div>
        <div className='post-footer'>
          <div className='post-upload-media'>
            <label class='label'>
              <input type='file' required />
              <span>
                <i
                  className='fa-regular fa-image'
                  style={{ color: "#408EE5" }}
                ></i>
                <span style={{ color: "#666666" }}>Photo</span>
              </span>
            </label>
            <label class='label'>
              <input type='file' required />
              <span>
                <i
                  className='fa-regular fa-image'
                  style={{ color: "#659A49" }}
                ></i>{" "}
                <span style={{ color: "#666666" }}>Video</span>
              </span>
            </label>
            <label class='label'>
              <input type='file' required />
              <span>
                <i
                  className='fa-regular fa-image'
                  style={{ color: "#A474E4" }}
                ></i>{" "}
                <span style={{ color: "#666666" }}>Document</span>
              </span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
