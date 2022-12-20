// Chart background
d3.select('#area_chart')
.style('background-image', 'radial-gradient(circle, rgb(255,255,255) 20%, rgb(193,193,193))')
.style('padding-top', '5px')
.style('width', 'mae-content')

// Chart title
d3.select('#area_chart').append('h6')
                    .text('Chart 6 - The First 15 Disloyal Customer\'s 4 Ticket Prices')
                    .style('text-align', 'center')
                    .style('font-weight', 'bold')

var svgwidth_area = 500;
var svgheight_area = 500;
var padding_area = 100;
const margin_area = { top: 1, bottom: 0, left: 20, right: 0 };

var svg_area = d3.select("#area_chart")
            .append('svg')
            .attr('width', svgwidth_area)
            .attr('height', svgheight_area)
            .attr('viewBox', '0 0 500 500')
            .attr('id', 'area_chart_itself')

var inner_width_area = svgwidth_area - padding_area - margin_area.left - margin_area.right;
var inner_height_area = svgheight_area - padding_area - margin_area.top - margin_area.bottom;

var g_area = svg_area.append("g")
        .attr("transform", "translate(50, 50)")
        .attr("class", "graph");

d3.csv('./disloyal.csv').then(function(data) {
    console.log(data)
    data.forEach(function(d) {
        d.id = parseInt(d.id);
        d.first = parseInt(d.first)
        d.second = parseInt(d.second)
        d.third = parseInt(d.third)
        d.fourth = parseInt(d.fourth)
    })
    //create xaxis
    var xScale = d3.scaleLinear()
        .domain(d3.extent(data, function(d) {
            return d.id;
        }))
        .range([0, inner_width_area])

    var xAxis_area = d3.axisBottom(xScale)
                .tickValues([2,7,14,15,16,17,18,19,20,21,24,32,33,34,35])
    g_area.append("g")
        .attr("transform", 'translate(0, 400)')
        .call(xAxis_area)

    // xaxis label
    svg_area.append("text")
        .attr("text-anchor", "end")
        .attr("x", inner_width_area + 80)
        .attr("y", inner_height_area + margin_area.top + 50)
        .text("Id")
        .style("font-family", "'Calibri', sans-serif")
        .style("font-size", "12px")

    //create yaxis
    var yScale_area = d3.scaleLinear()
                    .domain([0, d3.max(data, function(d) {
                        return d.first + d.second + d.third + d.fourth;
                    })]) 
                    .range([inner_height_area, 0])
    var yAxis = d3.axisLeft(yScale_area)
    g_area.append("g").call(yAxis)
    
    // yaxis label
    svg_area.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "translate(-300, -360)")
        .attr("x", inner_width_area)
        .attr("y", inner_height_area)
        .text("Ticket Prices")
        .style("font-family", "'Calibri', sans-serif")
        .style("font-size", "12px")

    var keysToStack = ['first', 'second', 'third', 'fourth'];

    var generateStack = d3.stack().keys(keysToStack)(data);
    console.log('generateStack', generateStack);

    var generateArea = d3.area()
                            .x((d) => xScale(d.data.id))
                            .y0((d) => yScale_area(d[0]))
                            .y1((d) => yScale_area(d[1]))
    var color_area = d3.scaleOrdinal()
                    .domain(keysToStack)
                    .range(['#F58634', '#F9B17D', '#F5D5AE', '#FEE7D8']);
    g_area.append('g')
    .selectAll('path')
    .data(generateStack)
    .join("path")
    .attr("d", generateArea)
    .style("fill", (d) => color_area(d.key))
    .attr("stroke", "#FFFFFF") 
    .attr("stroke-width", 2)

    // make legend
    var legend = ["1st Ticket Price", "2nd Ticket Price", "3rd Ticket Price", "4th Ticket Price"];

    var legendColor = d3.scaleOrdinal()
                    .domain(legend)
                    .range(['#F58634', '#F9B17D', '#F5D5AE', '#FEE7D8'])

    svg_area.selectAll('mycircle')
        .data(legend)
        .enter()
        .append("circle")
        .attr("cx", 350)
        .attr("cy", function(d,i) { return 50 + i*25 })
        .attr("r", 7)
        .style("fill", function(d) { return legendColor(d) })
    
    svg_area.selectAll('circlelabel')
        .data(legend)
        .enter()
        .append("text")
        .attr("x", 360)
        .attr("y", function(d,i) { return 50 + i*25 })
        .style("fill", "#363435")
        .text(function(d) { return d })
        .style("font-family", "'Calibri', sans-serif")
        .style("font-size", "14px")
        .attr("text-anchor", "right")
        .attr("alignment-baseline", "middle")
    
    svg_area.selectAll('.graph')
        .transition()
        .duration(800)
        .attr("x", function(d) {
            return xScale(d.id)
        })
        .attr("height", function(d){
            return inner_height_area - xScale(d.id)
        })
        .delay(function(d, i){
            return i * 100
        })
        
})