import {queryCoffeeForMap,queryNegativeForMap,queryEntertainmentForMap,queryBSD,querySmallBForInfo,
  queryBigBForInfo,queryHealthForMap,queryAlchoholForInfo,queryObesityForInfo,querySmokerForInfo,
  queryClimateForMap,
  queryBicForInfo,
  queryBusForInfo,
  queryScooterForInfo,
  queryTrainForInfo,
  queryTramForInfo,
  queryWalkForInfo,
  queryUnempForMap,} from "../api/axios.js"


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

// find the maxmium census Max
let censusMax = -Number.MAX_VALUE
let censusMin = Number.MAX_VALUE

// will call initMap to show the data once the api is done
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

  // add event listener to update data
  const selectBox = document.getElementById("mapInfo")

  window.addEventListener("load",()=>{
    console.log("select:", selectBox.getAttribute("value"))
    loadCensusData(selectBox.getAttribute("value"));
  })
  // state polygons only need to be loaded once, do them now
  loadMapShapes();

}

/** Loads the state boundary polygons from a GeoJSON source. */
function loadMapShapes() {
  map.data.loadGeoJson(
    "/data/aus_lga.geojson",
    { idPropertyName: "Name" }
  )

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
  let businessFeature = await generateBusiness(scenario)
  // get scenario data upon on page
  if (scenario == "1"){
    censusMax = 5
    censusMin = 0
    response = await queryCoffeeForMap()
    
  }
  else if(scenario == "2"){
    censusMax = 5
    censusMin = 0
    response = await queryNegativeForMap()

  }
  else if (scenario == "3"){
    censusMax = 5
    censusMin = 0
    response = await queryEntertainmentForMap()
    console.log("response1: ", response)
  }
  else if (scenario == "4"){
    censusMax = 35000
    censusMin = 1000
    response = await queryClimateForMap()

  }
  else if (scenario == "5"){
    censusMax = 35000
    censusMin = 1000
    response = await queryHealthForMap()
  }
  else if (scenario == "6"){
    censusMax = 35000
    censusMin = 1000
    response = await queryUnempForMap()

  }
  // data from couchdb, record all region with data
  let dataFeature = Object.keys(response)
  console.log("ob", response)
  // update the region value with data
  for (const [key, value] of Object.entries(response)) {
    // console.log("key", key)
    let state = await map.data.getFeatureById(key)
    if (state) {
      // get min value and max value
      // let censusVariable = value
      // if (censusVariable > censusMax) {
      //   censusMax = censusVariable;
      // }
      state.setProperty("census_variable", value);
    }
}
  for (const [key, value] of Object.entries(response)) {
      let state = await map.data.getFeatureById(key)
      if (state) {
        // get min value and max value
        let censusVariable = value
        if (censusVariable > censusMax) {
          censusMax = censusVariable;
        }
        state.setProperty("census_variable", value);
      }
  }
  // data from geojson, record all region in the map
  let mapFeature = await generateMapFeature()

  let unassign = mapFeature.filter(key => !dataFeature.includes(key))
  let unvisited = mapFeature.filter(key => !businessFeature.includes(key))

  console.log("un", unvisited)
  for(let key in unvisited){

    let state = await map.data.getFeatureById(unvisited[key])
      if (state) {
        state.setProperty("businessLevel", 0);
        state.setProperty("smallBusiness", 0);
        state.setProperty("bigBusiness", 0);
      }
  }
  for(let key in unassign){
    let state = await map.data.getFeatureById(unassign[key])
      if (state) {
        state.setProperty("census_variable", 0);
      }
  }
}

/**
 * Applies a gradient style based on the 'census_variable' column.
 * This is the callback passed to data.setStyle() and is called for each row in
 * the data set.  Check out the docs for Data.StylingFunction.
 *
 * @param {google.maps.Data.Feature} feature
 */
function styleFeature(feature) {
  // background: linear-gradient(to left, hsl(243.333, 100%, 7%), hsl(248.571, 86%, 26%), hsl(190.118, 100%, 50%) );
  const low = [190, 100, 50]; // color of smallest datum
  const high = [243, 100, 7]; // color of largest datum
  const delta =
    (feature.getProperty("census_variable")-censusMin)/censusMax;
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
    strokeColor: "black",
    zIndex: zIndex,
    fillColor: "hsl(" + color[0] + "," + color[1] + "%," + color[2] + "%)",
    fillOpacity: 0.75,
    visible: showRow,
  };
}

/**
 * Responds to the mouse-in event on a map shape (state).
 *
 * @param {?google.maps.MapMouseEvent} 
 */
function mouseInToRegion(e) {
  // const censusMax = 1;
  // const censusMin = 0;
  // set the hover state so the setStyle function can change the border
  e.feature.setProperty("state", "hover");
  // console.log("cen:", e.feature.getProperty("census_variable"));
  let percent =
    100*((e.feature.getProperty("census_variable")))

  let name = e.feature.getProperty("Name").split("(")
  // update the label
  document.getElementById("data-label").textContent =name[0].trim();
  document.getElementById("data-value").textContent = e.feature
    .getProperty("census_variable")
    .toLocaleString();

  document.getElementById("data-box").style.display = "block";
  document.getElementById("data-caret").style.display = "block";
  document.getElementById("data-caret").style.paddingLeft = percent + "%";

  let busniessLevel = e.feature.getProperty("businessLevel")
  let smallBusiness = e.feature.getProperty("smallBusiness") 
  let bigBusiness = e.feature.getProperty("bigBusiness")
  if (document.querySelector("#totalB span")){
  document.querySelector("#totalB span").textContent = busniessLevel + "%"
  document.querySelector("#bigB span").textContent = bigBusiness + "%"
  document.querySelector("#smallB span").textContent = smallBusiness + "%"
  }
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
  try {
    const response = await fetch('/data/aus_lga.geojson');
    const geo = await response.json();
    let mapFeature = [];
    const region = geo.features;
    region.forEach(function(feature) {
      var properties = feature.properties;
      mapFeature.push(properties.Name);
    });
    return mapFeature;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
}

async function generateHealth (){
  // queryAlchoholForInfo,
  // queryObesityForInfo,
  // querySmokerForInfo,
}
async function generateBusiness (scenario){
let businessLevel
let smallBusiness
let bigBusiness
if(scenario == "1" || scenario == "2" || scenario == "3"){
   businessLevel = await queryBSD()
   console.log("businesslevle", businessLevel)
   smallBusiness = await querySmallBForInfo()
   bigBusiness = await queryBigBForInfo()

} 
else if (scenario == "5"){
   businessLevel = await queryObesityForInfo()
   smallBusiness = await queryAlchoholForInfo()
   bigBusiness = await querySmokerForInfo()
   console.log("businesslevle", smallBusiness)
}
else if(scenario == "4"){
  businessLevel = await queryBusForInfo()
  smallBusiness = await queryTrainForInfo()
  bigBusiness = await queryTramForInfo()
}

  let businessFeature = []
// console.log("12",Object.keys(businessLevel))
  for(let key in businessLevel){
      businessFeature.push(key)
      let state = await map.data.getFeatureById(key)
      if(state){
        state.setProperty("businessLevel", businessLevel[key].toFixed(2));
        state.setProperty("smallBusiness", smallBusiness[key].toFixed(2));
        state.setProperty("bigBusiness", bigBusiness[key].toFixed(2));
      }  
  }

  return businessFeature
  
}

window.initMap = initMap

