import Geocode from "react-geocode";
import config from "../config.json";

const getGeocode = async (address) => {
  let location = {};
  console.log(address);
  Geocode.setApiKey(config.GoggleMapApiKey);
  // Get latitude & longitude from address.
  await Geocode.fromAddress(address).then(
    (response) => {
      location = response.results[0].geometry;
    },
    (error) => {
      console.error(error);
    }
  );
  return location;
};

export default getGeocode;
