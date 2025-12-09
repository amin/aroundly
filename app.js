import { Vasttrafik } from "./js/vasttrafik.js";
import { MapBox } from "./js/mapBox.js";

const vt = new Vasttrafik(
  "X01lYWhuVVIzUEk5Mlk0QWRNcmhnSHBZdkRnYTpIcjZJRWd2cWZLaUdiZndnYTZfdGxKZl9wZlVh"
);

const map = new MapBox(
  document.querySelector("#map"),
  "pk.eyJ1IjoiYW1pbmNpZGVudCIsImEiOiJjbWl5ZXN2cDIwY2x3M2tza2lkdTRqZThmIn0.qndu1m-lL94-22IAdeOE8g"
);
