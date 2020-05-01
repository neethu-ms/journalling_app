import "./QuestionAnswer/styles.scss";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
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
    width: "100%"
  };
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const [email, setEmail] = useState("");
  const [biodata, setBiodata] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const handleClickOpen = (actionWord) => {
    setOpen(true);
    setAction(actionWord);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle submit
  const handleSubmit = function () {
    if (action === "Login") {
      if (props.logInUser(email, password)) {
        setLoggedIn(true);
        handleClose();
      }
    } else {
      props.createUser(email, password, biodata);
      setLoggedIn(true);
      handleClose();
    }
  };

  // Handle logout
  const handleLogout = function () {
      props.logoutUser();
    setLoggedIn(false);
    handleClose();
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
            <i class="fas fa-globe" aria-hidden="true"></i>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Indezone Journaling
          </Typography>
          {!loggedIn && (
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
          {loggedIn && (
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
      {!loggedIn && (
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
              id="name"
              label="Password"
              type="password"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            />
            {action === "Register" && (
              <TextField
                margin="dense"
                id="name"
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

      {loggedIn && (
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
      {!loggedIn && (
        <Container className="logo" maxWidth="sm md lg">
          <img
            height="40%px"
            width="70%"
            align="center"
            src="images/indezone-journal-hero.png"
            alt="INDEZONE"
          />
        </Container>
      )}
    </header>
  );
}
