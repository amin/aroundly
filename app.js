import { FourSquare } from "./js/foursquare.js";
import { MapBox } from "./js/mapBox.js";

const map = new MapBox(
  document.querySelector("#map"),
  "pk.eyJ1IjoiYW1pbmNpZGVudCIsImEiOiJjbWl5ZXN2cDIwY2x3M2tza2lkdTRqZThmIn0.qndu1m-lL94-22IAdeOE8g"
);

const fq = new FourSquare("3UPNNKDSQ3HQAXI3FSQMC5SQ2TYVENNJ0KNNI0K1D5CRCYNF");

map.getMap().on("click", async (e) => {
  const { lat, lng } = e.lngLat;

  const { results } = await fq.getPointsOfInterest(lat, lng);

  const locations = results.map((poi) => {
    return [poi.longitude, poi.latitude];
  });

  map.highlightLocations(locations);
});
