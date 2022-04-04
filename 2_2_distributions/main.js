/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
height = window.innerHeight * 0.7,
margin = { top: 20, bottom: 60, left: 90, right: 100 },
radius = 5;

/* LOAD DATA */
const dataURL = "https://raw.githubusercontent.com/stedy/Machine-Learning-with-R-datasets/master/insurance.csv"
d3.csv(dataURL, d3.autoType).then(data => {
console.log(data)

/* SCALES */

// xscale  - linear,count
const xScale = d3.scaleLinear()
  .domain([d3.min(data.map(d => d.age))-2, d3.max(data.map(d => d.age))+2])
  .range([margin.left, width - margin.right])

// yscale - linear, amount
const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.charges)])
  .range([height - margin.bottom, margin.top])

const colorScale = d3.scaleOrdinal()
  .domain(["yes", "no"])
  .range(["red", "green"])

// const rScale = d3.scaleLinear()
const rScale = d3.scaleSqrt()
  .domain([d3.min(data.map(d => d.bmi)), d3.max(data.map(d => d.bmi))])
  .range([1, 25])

/* HTML ELEMENTS */

// svg
const svg = d3.select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)

// axis scales
const xAxis = d3.axisBottom(xScale)
svg.append("g")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(xAxis)

const yAxis = d3.axisLeft(yScale)
svg.append("g")
  .attr("transform", `translate(${margin.left},0)`)
  .call(yAxis)

// circles
const dot = svg
  .selectAll("circle")
  .data(data) 
  .join("circle")
  .attr("cx", d => xScale(d.age))
  .attr("cy", d => yScale(d.charges))
  .attr("r", d => rScale(d.bmi))
  .attr("fill", d => colorScale(d.smoker))
    .style("fill-opacity", 0.2)

// axis labels
// template code from: https://www.tomordonez.com/d3-bar-chart-title-and-labels/
  svg.append("text")
    .attr("transform", "translate(" + (width/2) + " ," + (height-10) + ")")
    .style("text-anchor", "middle")
    .text("Age")
    .style("font-size", "1.5em");
  
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(height/2))
    .attr("y", 25)
    .style("text-anchor", "middle")
    .text("Medical Costs")
    .style("font-size", "1.5em");


/* ADD LEGEND */
// code template from : https://d3-graph-gallery.com/graph/custom_legend.html

// create a list of keys
var keys = ["Smoker", "Non-Smoker"]

// Usually you have a color scale in your chart already
var color = d3.scaleOrdinal()
  .domain(keys)
  .range(["red", "green"]);

// Add dots.
svg.selectAll("dots")
  .data(keys)
  .enter()
  .append("circle")
    .attr("cx", 130)
    .attr("cy", function(d,i){ return 60 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("r", 7)
    .style("fill", function(d){ return color(d)})
    .style("fill-opacity", 0.5)

// Add labels.
svg.selectAll("labels")
  .data(keys)
  .enter()
  .append("text")
    .attr("x", 150)
    .attr("y", function(d,i){ return 62 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function(d){ return color(d)})
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    .style("fill-opacity", 0.5)


/* ADD SIZE LEGEND */
// https://www.youtube.com/watch?v=XmVPHq4NhMA
// https://vizhub.com/curran/92c34f62c0f948e89e87d28907c08715?edit=files&file=sizeLegend.js&mode=mini

const ticks = rScale.ticks(7)

// Add dots.
svg.selectAll("dots")
  .data(ticks)
  .enter()
  .append("circle")
    .attr("cx", width-90)
    .attr("cy", function(d,i){ return 60 + i*50}) 
    .attr("r", rScale)
    .style("fill", "black")
    .style("fill-opacity", 0.35)

// Add labels.
svg.selectAll("labels")
  .data(ticks)
  .enter()
  .append("text")
    .attr("x", width-60)
    .attr("y", function(d,i){ return 62 + i*50}) 
    .style("fill", "black")
    .text(d => "BMI = " + d)
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    .style("fill-opacity", 0.35)
});
