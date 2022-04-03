/* CONSTANTS AND GLOBALS */
const width = window.innerWidth *.8 ;
const height = window.innerHeight * .6;
const margin = {top: 20, right: 30, bottom: 80, left: 60};

/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', d3.autoType)
.then(data => {
  console.log("data", data)

  /* SCALES */
  // xscale - linear, count 
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])  //data
    .range([0, width-margin.right])  //svg

  // yscale - categorical, activity
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.activity))
    .range([margin.top, height-margin.bottom]) // visual variable
    .paddingInner(.15)

  /* HTML ELEMENTS */
  // svg
  const svg = d3.select("#container")
    .append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      ;
  svg.append("g")
    .call(d3.axisBottom(xScale))
      .attr("transform", `translate(0,${height-margin.bottom +10})`)
  svg.append("g")
    .call(d3.axisLeft(yScale))
    /*     .attr("transform", "translate(0," + height + ")") */

  // bars
  svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", d => 0)
    .attr("y", d => yScale(d.activity))
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    ;

})