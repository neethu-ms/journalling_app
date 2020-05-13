import "./QuestionAnswer/styles.scss";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { Alert } from "@material-ui/lab";
import {
  Button,
  TextField,
  AppBar,
  Container,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  logo: {
    top: 30,
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  const style = {
    background: "#03A9F4",
    position: "fixed",
    top: "0",
    width: "100%",
  };
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const [email, setEmail] = useState("");
  const [biodata, setBiodata] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleClickOpen = (actionWord) => {
    setOpen(true);
    setAction(actionWord);
    setMessage("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle submit
  const handleSubmit = function () {
    let valid=true;
    if (action === "Login") {
      props.logInUser(email, password).then((data) => {
        if (data) {
          handleClose();
        }
      });
    } else {
      if (email === null || email === "" || email.trim().length === 0) {
        setMessage(() => "Email or Password cannot be empty. ");
        valid=false;
      }
      if (
        password === null ||
        password === "" ||
        password.trim().length === 0
      ) {
        setMessage(() => "Email or Password cannot be empty. ");
        valid=false;
      }

      if (email !== "" && email.trim().length !== 0 && email.indexOf("@") === -1) {
        setMessage(() => "Invalid email id. ");
        valid=false;
      }
      if (valid) {
        props.createUser(email, password, biodata).then((data) => {
          if (data === "User Already Exists") {
            setMessage(() => data);
          }
          handleClose();
        });
      }
    }
  };

  // Handle logout
  const handleLogout = function () {
    props.logoutUser().then(() => {
      handleClose();
    });
  };

  return (
    <header>
      <AppBar position="static" style={style}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <i className="fas fa-globe" aria-hidden="true"></i>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Indezone Journaling
          </Typography>
          {!props.user && (
            <div>
              <Button
                color="inherit"
                onClick={(event) => handleClickOpen("Register")}
              >
                REGISTER
              </Button>
              <Button
                color="inherit"
                onClick={(event) => handleClickOpen("Login")}
              >
                LOGIN
              </Button>
            </div>
          )}
          {props.user && (
            <div>
              <h4 disabled={true}>Welcome {email}</h4>
              <Button
                color="inherit"
                onClick={(event) => handleClickOpen("Logout")}
              >
                LOGOUT
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {!props.user && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{action}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            />
            {action === "Register" && (
              <TextField
                margin="dense"
                id="biodata"
                label="Biodata(optional)"
                type="text"
                fullWidth
                onChange={(e) => setBiodata(e.target.value)}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={(event) => handleSubmit(event)} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {props.user && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{action}</DialogTitle>
          <DialogContent>Do you want to logout ?</DialogContent>
          <DialogActions>
            <Button onClick={(event) => handleLogout()} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {!props.user && (
        <Container className="logo">
          <img
            height="40%"
            width="70%"
            align="center"
            src="images/indezone-journal-hero.png"
            alt="INDEZONE"
          />
        </Container>
      )}

      {message && <Alert severity="error">{message}</Alert>}
    </header>
  );
}
