import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config.json";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
}));

function UserForm({ user, setMapAddress }) {
  const classes = useStyles();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [active, setActive] = useState(false);
  let history = useHistory();

  const values = {
    fname: fullName,
    email,
    phone,
    address,
  };

  useEffect(() => {
    if (user) {
      setFullName(user.fname ? user.fname : "");
      setEmail(user.email ? user.email : "");
      setPhone(user.phone ? user.phone : "");
      setAddress(user.address ? user.address : "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: newUser } = await axios.post(
        config.ApiURL + "/user",
        values
      );
      user = newUser;
      setActive(true);
    } catch (err) {
      alert("Ups, something went wrong!");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(config.ApiURL + `/user/${user._id}`);
      history.replace("/");
    } catch {
      alert("Something failed while deleting a user");
    }
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit} noValidate>
      <TextField
        id="fullName"
        name="fullName"
        label="Name"
        variant="filled"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        fullWidth
      />
      <TextField
        id="email"
        name="email"
        label="Email"
        variant="filled"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        id="phone"
        name="phone"
        label="Phone Number"
        variant="filled"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        fullWidth
      />
      <TextField
        id="address"
        name="address"
        label="Address"
        variant="filled"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton
                aria-label="search"
                onClick={() => setMapAddress(address)}
                disabled={!address}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Grid
        container
        spacing={0}
        direction="row"
        justify="space-between"
        alignItems="flex-start"
        alignContent="stretch"
        wrap="nowrap"
      >
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
        <Button
          type="button"
          onClick={handleDelete}
          variant="outlined"
          color="primary"
          disabled={!user || active}
        >
          Delete
        </Button>
      </Grid>
    </form>
  );
}

export default UserForm;
