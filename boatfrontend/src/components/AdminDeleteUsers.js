import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, Modal, Button, TextField } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  paperStyle: {
    padding: '50px 20px',
    width: 600,
    margin: '20px auto',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
}));

export default function AdminDeleteUsers() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [clickedUserName, setClickedUserName] = useState("");

  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInput(lowerCase);
  };

  async function deleteUser(user) {
    console.log(user);
    try {
      const result = await axios.delete(
        "http://localhost:8080/accounts/delete",
        {
          params: { username: user },
        }
      );
      console.log(result);
      console.log("res is", result.data);
      console.log("res is", result.status);
      fetch("http://localhost:8080/accounts/getAll")
        .then((res) => res.json())
        .then((result) => {
          setUsers(result);
        });
    } catch (error) {
      if (error.response) console.log("error is", error.response.data);
    }
  }

  useEffect(() => {
    fetch("http://localhost:8080/accounts/getAll")
      .then((res) => res.json())
      .then((result) => {
        setUsers(result);
      });
  }, []);

  const filteredData = users.filter((el) => {
    if (input === '') {
      return el;
    } else {
      return el.username.toLowerCase().includes(input);
    }
  });

  const ConfirmationModal = () => {
    const handleDelete = async () => {
      await deleteUser(clickedUserName);
      setModalOpen(false);
    };

    const handleCancel = () => {
      setModalOpen(false);
    };

    return (
      <Modal open={modalOpen} onClose={handleCancel}>
        <Paper className={classes.paperStyle}>
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this user?</p>
          <div className={classes.buttonContainer}>
            <Button onClick={handleDelete} color="secondary">
              Delete
            </Button>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
          </div>
        </Paper>
      </Modal>
    );
  };

  return (
    <Container>
      <ConfirmationModal />
      <h1>Home</h1>
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        />
      </div>
      <div className="flex-container">
        {filteredData.map((user) => (
          <div className="flex-card" key={user.username}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Cervantes_J%C3%A1uregui.jpg/1200px-Cervantes_J%C3%A1uregui.jpg"
              className="profile-image"
              alt="Profile"
            ></img>
            <div className="flex-details">
              <p>Username: {user.username}</p>
              <p>Role: {user.role}</p>
              <p>Email: {user.email}</p>
            </div>
            <a href="#" className="show-details">
              <p>Show more details</p>
            </a>
            <button
              type="button"
              onClick={() => {
                setModalOpen(true);
                setClickedUserName(user.username);
              }}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </Container>
  );
}


// import React, { useEffect, useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import { Container, Paper, Modal, Button } from '@material-ui/core';
// import axios from 'axios';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
//   paperStyle: {
//     padding: '50px 20px',
//     width: 600,
//     margin: '20px auto',
//   },
//   buttonContainer: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     marginTop: '20px',
//   },
// }));

// export default function AdminDeleteUsers() {
//   const classes = useStyles();
//   const [users, setUsers] = useState([]);
//   const [input, setInput] = useState('');
//   const [modalOpen, setModalOpen] = useState(false);
//   const [clickedUserName, setClickedUserName] = useState('');
//   const [selectedRole, setSelectedRole] = useState('');

//   const inputHandler = (e) => {
//     const lowerCase = e.target.value.toLowerCase();
//     setInput(lowerCase);
//   };

//   async function deleteUser(user) {
//     console.log(user);
//     try {
//       const result = await axios.delete('http://localhost:8080/accounts/delete', {
//         params: { username: user },
//       });
//       console.log(result);
//       console.log('res is', result.data);
//       console.log('res is', result.status);
//       fetch('http://localhost:8080/accounts/getAll')
//         .then((res) => res.json())
//         .then((result) => {
//           setUsers(result);
//         });
//     } catch (error) {
//       if (error.response) console.log('error is', error.response.data);
//     }
//   }

//   async function filterByRoleAndSort() {
//     try {
//       const response = await axios.get('http://localhost:8080/accounts/filterByRoleAndSort', {
//         //params: {
//           role: selectedRole,
//           //email: null,
//          // username: null,
//         //},
//       });
//       setUsers(response.data);
//     } catch (error) {
//       console.log('Error:', error);
//     }
//   }

//   useEffect(() => {
//     filterByRoleAndSort();
//   }, [selectedRole]);

//   const filteredData = users.filter((el) => {
//     if (input === '') {
//       return el;
//     } else {
//       return el.username.toLowerCase().includes(input);
//     }
//   });

//   const ConfirmationModal = () => {
//     const handleDelete = async () => {
//       await deleteUser(clickedUserName);
//       setModalOpen(false);
//     };

//     const handleCancel = () => {
//       setModalOpen(false);
//     };

//     return (
//       <Modal open={modalOpen} onClose={handleCancel}>
//         <Paper className={classes.paperStyle}>
//           <h2>Confirm Deletion</h2>
//           <p>Are you sure you want to delete this user?</p>
//           <div className={classes.buttonContainer}>
//             <Button onClick={handleDelete} color="secondary">
//               Delete
//             </Button>
//             <Button onClick={handleCancel} color="primary">
//               Cancel
//             </Button>
//           </div>
//         </Paper>
//       </Modal>
//     );
//   };

//   const handleRoleChange = (e) => {
//     setSelectedRole(e.target.value);
//   };

//   return (
//     <Container>
//       <ConfirmationModal />
//       <h1>Home</h1>
//       <div className="filter-container">
//         <label htmlFor="role-filter">Filter by Role:</label>
//         <select id="role-filter" value={selectedRole} onChange={handleRoleChange}>
//           <option value="">All</option>
//           <option value="Client">Client</option>
//           <option value="Owner">Owner</option>
//         </select>
//       </div>
//       <div className="search-container">
//         <label htmlFor="search-input">Search:</label>
//         <input type="text" id="search-input" value={input} onChange={inputHandler} />
//       </div>
//        <div className="flex-container">
//         {filteredData.map((user) => (
//           <div className="flex-card" key={user.username}>
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Cervantes_J%C3%A1uregui.jpg/1200px-Cervantes_J%C3%A1uregui.jpg"
//               className="profile-image"
//               alt="Profile"
//             ></img>
//             <div className="flex-details">
//               <p>Username: {user.username}</p>
//               <p>Role: {user.role}</p>
//               <p>Email: {user.email}</p>
//             </div>
//             <a href="#" className="show-details">
//               <p>Show more details</p>
//             </a>
//             <button
//               type="button"
//               onClick={() => {
//                 setModalOpen(true);
//                 setClickedUserName(user.username);
//               }}
//               className="delete-button"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
      
//     </Container>
//   );
// }





// import React, { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import { Container, Paper, Modal, Button, TextField } from "@material-ui/core";
// import axios from "axios";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },
//   paperStyle: {
//     padding: "50px 20px",
//     width: 600,
//     margin: "20px auto",
//   },
//   buttonContainer: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginTop: "20px",
//   },
// }));

// export default function AdminDeleteUsers() {
//   const classes = useStyles();
//   const [users, setUsers] = useState([]);
//   const [input, setInput] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [clickedUserName, setClickedUserName] = useState("");

//   const inputHandler = (e) => {
//     const lowerCase = e.target.value.toLowerCase();
//     setInput(lowerCase);
//   };

//   async function deleteUser(user) {
//     console.log(user);
//     try {
//       const result = await axios.delete(
//         "http://localhost:8080/accounts/delete",
//         {
//           params: { username: user },
//         }
//       );
//       console.log(result);
//       console.log("res is", result.data);
//       console.log("res is", result.status);
//       fetch("http://localhost:8080/accounts/getAll")
//         .then((res) => res.json())
//         .then((result) => {
//           setUsers(result);
//         });
//     } catch (error) {
//       if (error.response) console.log("error is", error.response.data);
//     }
//   }

//   function filterByRoleAndSort()

//   useEffect(() => {
//     fetch("http://localhost:8080/accounts/getAll")
//       .then((res) => res.json())
//       .then((result) => {
//         setUsers(result);
//       });
//   }, []);

//   const filteredData = users.filter((el) => {
//     if (input === "") {
//       return el;
//     } else {
//       return el.username.toLowerCase().includes(input);
//     }
//   });

//   const ConfirmationModal = () => {
//     const handleDelete = async () => {
//       await deleteUser(clickedUserName);
//       setModalOpen(false);
//     };

//     const handleCancel = () => {
//       setModalOpen(false);
//     };

//     return (
//       <Modal open={modalOpen} onClose={handleCancel}>
//         <Paper className={classes.paperStyle}>
//           <h2>Confirm Deletion</h2>
//           <p>Are you sure you want to delete this user?</p>
//           <div className={classes.buttonContainer}>
//             <Button onClick={handleDelete} color="secondary">
//               Delete
//             </Button>
//             <Button onClick={handleCancel} color="primary">
//               Cancel
//             </Button>
//           </div>
//         </Paper>
//       </Modal>
//     );
//   };

//   return (
//     <Container>
//       <ConfirmationModal />
//       <h1>Home</h1>
//       <div className="search">
//         <TextField
//           id="outlined-basic"
//           onChange={inputHandler}
//           variant="outlined"
//           fullWidth
//           label="Search"
//         />
//       </div>
//       <div className="filter-container">
//         <div className="filter-card">
//           <FormControl
//             id="outlined-basic"
//             variant="outlined"
//             fullWidth
//           >
//             <InputLabel>Filter by: Role</InputLabel>
//             <Select label="Filter by: Role--" value={role} onChange={handleRole}>
//               <MenuItem value={"Owner"}>Owner</MenuItem>
//               <MenuItem value={"Client"}>Client</MenuItem>
//             </Select>
//           </FormControl>
//         </div>
//       </div>
//       <div className="flex-container">
//         {filteredData.map((user) => (
//           <div className="flex-card" key={user.username}>
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Cervantes_J%C3%A1uregui.jpg/1200px-Cervantes_J%C3%A1uregui.jpg"
//               className="profile-image"
//               alt="Profile"
//             ></img>
//             <div className="flex-details">
//               <p>Username: {user.username}</p>
//               <p>Role: {user.role}</p>
//               <p>Email: {user.email}</p>
//             </div>
//             <a href="#" className="show-details">
//               <p>Show more details</p>
//             </a>
//             <button
//               type="button"
//               onClick={() => {
//                 setModalOpen(true);
//                 setClickedUserName(user.username);
//               }}
//               className="delete-button"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </Container>
//   );
// }
