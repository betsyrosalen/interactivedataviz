/* CONSTANTS AND GLOBALS */
// const width = ;
// const height = ;

/* LOAD DATA */

// d3.csv('../[PATH_TO_YOUR_DATA]', d3.autoType)
//   .then(data => {
//     console.log("data", data)

//     /* SCALES */
//     /** This is where you should define your scales from data to pixel space */
    

//     /* HTML ELEMENTS */
//     /** Select your container and append the visual elements to it */

//   }) 



  
  // 1 VARIABLES

  const width = window.innerWidth *.08;
  const height = window.innerHeight /3;

  // 2 DATA

  d3.csv('../data/squirrelActivities.csv', d3.autoType).then(data=> {
    console.log("data", data)
  

  // 3 SCALES

  const xSCale = d3.scaleBand()
  .domain(data.map(d=> d.activity))
  .range([0, width])

  const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d=> d.count)]) // domain relates to data
  .range([height, 0]) // range relates to visuals

  // 4 ELEMENTS APPEND


  // 5 SELECT - JOIN - DRAW



  // 6 ATTTRIBUTES

  })