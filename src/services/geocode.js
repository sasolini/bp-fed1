import Geocode from "react-geocode";

const getGeocode = async (address) => {
  let location = {};
  console.log(address);
  Geocode.setApiKey("AIzaSyACiT4fpeXMVUi8RsKVi5TI27s30yVh87U");
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
