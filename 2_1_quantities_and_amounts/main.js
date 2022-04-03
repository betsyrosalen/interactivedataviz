/* CONSTANTS AND GLOBALS */
const width = window.innerWidth *.8 ;
const height = window.innerHeight * .6;
const margin = {top: 20, right: 30, bottom: 80, left: 60};

/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', d3.autoType)
.then(data => {
  console.log("data", data);

  /* SCALES */

  // xscale - linear, count 
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])  //data
    .range([margin.left, width-margin.right]); //svg

  // yscale - categorical, activity
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.activity))
    .range([margin.top, height-margin.bottom]) // visual variable
    .paddingInner(.15);

  const colorScale = d3.scaleOrdinal(d3.schemeAccent)
/*     .domain()
    .range() */

  /* AXES */

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  /* HTML ELEMENTS */

  // svg
  const svg = d3.select("#container")
    .append("svg")
      .attr("width", width)
      .attr("height", height);

  const xAxisGroup = svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0,${height-margin.bottom +10})`)
    .call(xAxis);

  const yAxisGroup = svg.append("g")
    .attr("class", "yAxis")
    .attr("transform", `translate(${margin.left-1}, 0)`)
    .call(yAxis);


  /*     svg.append("g")
    .call(d3.axisLeft(yScale))
    .attr("transform", "translate(0," + height + ")") */

  // bars
  svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", margin.left)
    .attr("y", d => yScale(d.activity))
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", d => colorScale(d.activity))
    ;

})