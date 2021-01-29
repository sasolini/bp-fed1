import React, { useState } from "react";
// import getGeocode from "../services/geocode";
import Layout from "../components/layout";
import UserForm from "../components/user-form";
import Map from "../components/map";
import Grid from "@material-ui/core/Grid";

const HomePage = (params) => {
  const [mapAddress, setMapAddress] = useState("");

  return (
    <Layout>
      <Grid container spacing={2} direction="column" alignContent="center">
        <Grid item xs={10} md={8} lg={6}>
          <UserForm setMapAddress={setMapAddress} />
        </Grid>
        {mapAddress && (
          <Grid item>
            <Map mapAddress={mapAddress} />
          </Grid>
        )}
      </Grid>
    </Layout>
  );
};

export default HomePage;
