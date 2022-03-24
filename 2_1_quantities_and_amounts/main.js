/* CONSTANTS AND GLOBALS */
const width = window.innerWidth *.8 ;
const height = window.innerHeight * .6;
const margin = {top: 20, right: 30, bottom: 90, left: 90};

/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', d3.autoType)
.then(data => {
  console.log("data", data)

  /* SCALES */
  // xscale - categorical, activity
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])  //data
    .range([margin.left, width-margin.right])  //svg

  // yscale - linear,count
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
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      ;
  svg.append("g")
/*     .attr("transform", "translate(0," + height + ")") */
    .call(d3.axisBottom(xScale))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
  svg.append("g")
    .call(d3.axisLeft(yScale))

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