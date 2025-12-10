import { FourSquare } from "./modules/foursquare.js";
import { MapBox } from "./modules/mapBox.js";

const map = new MapBox(
  document.querySelector("#map"),
  "pk.eyJ1IjoiYW1pbmNpZGVudCIsImEiOiJjbWl5ZXN2cDIwY2x3M2tza2lkdTRqZThmIn0.qndu1m-lL94-22IAdeOE8g"
);

const fq = new FourSquare("3UPNNKDSQ3HQAXI3FSQMC5SQ2TYVENNJ0KNNI0K1D5CRCYNF");

map.getMap().on("click", async (e) => {
  const features = map.getMap().queryRenderedFeatures(e.point, {
    layers: ["pois-layer"],
  });

  if (features.length > 0) return;

  const { lat, lng } = e.lngLat;
  const { results } = await fq.getPointsOfInterest(lat, lng);

  map.setLocations(results);
});
