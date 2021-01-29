import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import UserForm from "../components/user-form";
import Map from "../components/map";
import Grid from "@material-ui/core/Grid";
import { useLocation } from "react-router-dom";
import axios from "axios";
import config from "../config.json";

const UserPage = () => {
  const { userId } = useLocation();
  const [user, setUser] = useState({});
  console.log(userId);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: user } = await axios.get(
          config.ApiURL + "/user/" + userId
        );

        setUser(user);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, []);

  return (
    <Layout>
      <Grid container spacing={2} direction="column" alignContent="center">
        <Grid item xs={10} md={8} lg={6}>
          <UserForm user={user} />
        </Grid>
        <Grid item>
          <Map mapAddress={user.address} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default UserPage;
