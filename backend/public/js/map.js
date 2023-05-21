import {queryCoffeeForMap,queryNegativeForMap,queryEntertainmentForMap} from "../api/axios.js"

// import {mapFeature} from "../js/helper.js"


// map feature
const mapStyle = [
  {
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ visibility: "on" }, { color: "#fcfcfc" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ visibility: "on" }, { color: "#bfd4ff" }],
  },
];

let map;

// let censusMin = Number.MAX_VALUE,
//   censusMax = -Number.MAX_VALUE;

function initMap() {
  
  // load the map
  map = new google.maps.Map(document.getElementById("map"), {
      // australia map
    center: { lat: -25, lng: 135 },
    zoom: 4,
    styles: mapStyle,
  });
  // set up the style rules and events for google.maps.Data
  map.data.setStyle(styleFeature);
  map.data.addListener("mouseover", mouseInToRegion);
  map.data.addListener("mouseout", mouseOutOfRegion);

  // update map according to the scenario
  const selectBox = document.getElementsByClassName("map")

  // add event listener to update data
  for (let i = 0; i <selectBox.length;i++){
    google.maps.event.addDomListener(selectBox[i], "click", () => {
      loadCensusData(selectBox[i].getAttribute("value"));
    });
  }

  // state polygons only need to be loaded once, do them now
  loadMapShapes();

}

/** Loads the state boundary polygons from a GeoJSON source. */
function loadMapShapes() {
  map.data.loadGeoJson(
    "/data/aus_lga.geojson",
    { idPropertyName: "Name" }
  )
  // console.log(mao.dta.getFeatureById)
  // wait for the request to complete by listening for the first feature to be
  // added
  google.maps.event.addListenerOnce(map.data, "addfeature", () => {
    google.maps.event.trigger(
      document.getElementById("census-variable"),
      "change"
    );
  });

}

/**
 * Loads the census data from a simulated API call to the US Census API.
 *
 * @param {string} variable
 */
async function loadCensusData(scenario) {
  // load the requested variable from the census API (using local copies)
  let response;
  if (scenario == "coffee"){
    response = await queryCoffeeForMap()
  }
  else if(scenario == "negative"){
    response = await queryNegativeForMap()
  }
  else if (scenario == "entertainment"){
    response = await queryEntertainmentForMap()
  }
  console.log("uphair")
  let dataFeature = []
  for(let key in response){
    dataFeature.push(response[key].key)
    let state = await map.data.getFeatureById(response[key].key)
      if (state) {
        state.setProperty("census_variable", response[key].value);
      }
  }
  let a = await generateMapFeature()
  console.log("data: ",a )
  const left = findArrayDifference(dataFeature,a)
  console.log(left)
  for(let key in left){
    console.log("left: ",left[key])
    let state = await map.data.getFeatureById(left[key])
      if (state) {
        console.log("state: ",state)
        state.setProperty("census_variable", 0);
      }
  }
  
      

}

/** Removes census data from each shape on the map and resets the UI. */
function clearCensusData() {
  censusMin = Number.MAX_VALUE;
  censusMax = -Number.MAX_VALUE;
  map.data.forEach((row) => {
    row.setProperty("census_variable", undefined);
  });
  document.getElementById("data-box").style.display = "none";
  document.getElementById("data-caret").style.display = "none";
}

/**
 * Applies a gradient style based on the 'census_variable' column.
 * This is the callback passed to data.setStyle() and is called for each row in
 * the data set.  Check out the docs for Data.StylingFunction.
 *
 * @param {google.maps.Data.Feature} feature
 */
function styleFeature(feature) {
  const low = [5, 69, 54]; // color of smallest datum
  const high = [151, 83, 34]; // color of largest datum
  // delta represents where the value sits between the min and max
  const censusMax = 100;
  const censusMin = 10;
  const delta =
    (feature.getProperty("census_variable") - censusMin) /
    (censusMax - censusMin);
  const color = [];

  for (let i = 0; i < 3; i++) {
    // calculate an integer color based on the delta
    color.push((high[i] - low[i]) * delta + low[i]);
  }

  // determine whether to show this shape or not
  let showRow = true;

  if (
    feature.getProperty("census_variable") == null ||
    isNaN(feature.getProperty("census_variable"))
  ) {
    showRow = false;
  }

  let outlineWeight = 0.5,
    zIndex = 1;

  if (feature.getProperty("state") === "hover") {
    outlineWeight = zIndex = 2;
  }
  return {
    strokeWeight: outlineWeight,
    strokeColor: "#green",
    zIndex: zIndex,
    fillColor: "hsl(" + color[0] + "," + color[1] + "%," + color[2] + "%)",
    fillOpacity: 0.75,
    visible: showRow,
  };
}

/**
 * Responds to the mouse-in event on a map shape (state).
 *
 * @param {?google.maps.MapMouseEvent} e
 */
function mouseInToRegion(e) {
  const censusMax = 1000;
  const censusMin = 0;
  // set the hover state so the setStyle function can change the border
  e.feature.setProperty("state", "hover");
  // console.log("cen:", e.feature.getProperty("census_variable"));
  let percent =
    100*((e.feature.getProperty("census_variable") - censusMin)/(censusMax-censusMin))

  // update the label
  document.getElementById("data-label").textContent =
    e.feature.getProperty("STATE_NAME");
  document.getElementById("data-value").textContent = e.feature
    .getProperty("census_variable")
    .toLocaleString();

  document.getElementById("data-box").style.display = "block";
  document.getElementById("data-caret").style.display = "block";
  document.getElementById("data-caret").style.paddingLeft = percent + "%";
}

/**
 * Responds to the mouse-out event on a map shape (state).
 *
 */
function mouseOutOfRegion(e) {
  // reset the hover state, returning the border to normal
  e.feature.setProperty("state", "normal");
}

async function generateMapFeature(){
  await fetch('/data/aus_lga.geojson').then(function(response) {
    return response.json();
  }).then(function(geo) {
    // JSON data is available here
    let mapFeature = []
    const region = geo.features
    region.forEach(function(feature) {
        // Access properties of each feature
        var properties = feature.properties;
        mapFeature.push(properties.Name)
      });
    return mapFeature
    })
  .catch(function(error) {
    console.log('Error:', error);
  });
}
function findArrayDifference(arr1, arr2) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  return [...arr1.filter(item => !set2.has(item)), ...arr2.filter(item => !set1.has(item))];
}
window.initMap = initMap
// function generateData

