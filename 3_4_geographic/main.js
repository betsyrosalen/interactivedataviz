/**
 * CONSTANTS AND GLOBALS
 * */
const width = window.innerWidth * 0.7,
height = window.innerHeight * 0.9,
margin = { top: 20, bottom: 20, left: 20, right: 20 };

let svg;

/**
* APPLICATION STATE
* */
let state = {
    geojson: null,
    markets: null,
    // extremes: null,
    hover: {
      Latitude: null,
      Longitude: null,
      County: null,
    },
};
   

/**
* LOAD DATA
* Using a Promise.all([]), we can load more than one dataset at a time
* */
Promise.all([
 d3.json("../data/NYC zipcode geodata/us-county-boundaries(NY).geojson"),
 d3.json("https://data.ny.gov/resource/qq4h-8p86.json") // https://data.ny.gov/Economic-Development/Farmers-Markets-in-New-York-State/qq4h-8p86
]).then(([geojson, farmMarkets]) => {
 state.geojson = geojson;
 state.markets = farmMarkets;
 init();
});


/**
* INITIALIZING FUNCTION
* this will be run *one time* when the data finishes loading in
* */
function init() {
  // our projection and path are only defined once, and we don't need to access them in the draw function,
 // so they can be locally scoped to init()
 const projctn = d3.geoAlbersUsa().fitSize([width, height], state.geojson);
 const path = d3.geoPath().projection(projctn);

 console.log("geojson: ", state.geojson);
 console.log("markets: ", state.markets);

 // create an svg element in our main `d3-container` element
 svg = d3
   .select("#container")
   .append("svg")
   .attr("width", width)
   .attr("height", height);

 svg
   .selectAll(".county")
   // all of the features of the geojson, meaning all the counties as individuals
   .data(state.geojson.features)
   .join("path")
   .attr("d", path)
   .attr("class", "county")
   .attr("fill", "steelblue")
   .on("mouseover", (mouseEvent, d) => {
     // when the mouse rolls over this feature, do this
     state.hover["County"] = d.properties.name;
     draw(); // re-call the draw function when we set a new hoveredState
   });

 // EXAMPLE 1: going from Lat-Long => x, y
 // for how to position a dot
 svg
   .selectAll("circle")
   .data(state.markets)
   .join("circle")
   .attr("r", 5)
   .attr("fill", "rgb(163, 205, 171)")
   .style("fill-opacity", 0.65)
   .attr("transform", d => {
     const [x, y] = projctn([d.longitude, d.latitude]);
     return `translate(${x}, ${y})`;
   });

   // EXAMPLE 2: going from x, y => lat-long
 // this triggers any movement at all while on the svg
 svg.on("mousemove", (mouseEvent) => {
    // we can d3.pointer to tell us the exact x and y positions of our cursor
    const [mx, my] = d3.pointer(mouseEvent);
    // projection can be inverted to return [lat, long] from [x, y] in pixels
    const proj = projctn.invert([mx, my]);
    state.hover["Longitude"] = proj[0];
    state.hover["Latitude"] = proj[1];
    draw();
  });

 draw(); // calls the draw function
}

/**
* DRAW FUNCTION
* we call this every time there is an update to the data/state
* */
function draw() {
 // return an array of [key, value] pairs
 hoverData = Object.entries(state.hover);

  d3.select("#hover-content")
    .selectAll("div.row")
    .data(hoverData)
    .join("div")
    .attr("class", "row")
    .html(
      d =>
        // each d is [key, value] pair
        d[1] // check if value exist
          ? `${d[0]}: ${d[1]}` // if they do, fill them in
          // : null // otherwise, show nothing
          : `${d[0]}:` // otherwise, show nothing
    );
}