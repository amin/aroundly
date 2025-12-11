import config from "./aroundly.config.js";
import { FourSquare } from "./modules/foursquare.js";
import { MapBox } from "./modules/mapBox.js";

const map = new MapBox(document.querySelector("#map"), config.API_KEYS.MAPBOX);
const foursquare = new FourSquare(config.API_KEYS.FOURSQUARE);

const burger = document.querySelector(".help-burger");
const help = document.querySelector(".help");

burger.addEventListener("click", (e) => {
  help.classList.toggle("active");
});

map.getMap().on("click", async (e) => {
  const features = map.getMap().queryRenderedFeatures(e.point, {
    layers: ["pois-layer"],
  });

  if (features.length > 0) return;

  const { lat, lng } = e.lngLat;
  const { results } = await foursquare.getPointsOfInterest(lat, lng, 500);

  map.setLocations(results);
});
