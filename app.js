import { FourSquare } from "./js/foursquare.js";
import { MapBox } from "./js/mapBox.js";

const map = new MapBox(
  document.querySelector("#map"),
  "pk.eyJ1IjoiYW1pbmNpZGVudCIsImEiOiJjbWl5ZXN2cDIwY2x3M2tza2lkdTRqZThmIn0.qndu1m-lL94-22IAdeOE8g"
);

const fq = new FourSquare("3UPNNKDSQ3HQAXI3FSQMC5SQ2TYVENNJ0KNNI0K1D5CRCYNF");

fq.getPointsOfInterest(57.7089, 11.9746);
