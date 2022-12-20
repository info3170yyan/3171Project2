// Chart background
d3.select('#donut_chart')
.style('background-image', 'radial-gradient(circle, rgb(255,255,255) 20%, rgb(193,193,193))')
.style('padding-top', '5px')

// Chart title
d3.select('#donut_chart').append('h6')
                    .text('Chart 5 - Average Statisfacation Rate')
                    .style('text-align', 'center')
                    .style('font-weight', 'bold')

// Chart legend 
d3.select('#donut_chart').append('div')
                    .attr('id', 'legend')
                    .style('background-color', 'rgb(246,246,246, 0.5)')
                    .style('width', 'fit-content')
                    .style('padding', '5px')
                    .style('float', 'right')
                    .style('margin', '0 auto')
                    .style('margin-top', '180px')
                    .style('margin-right', '10px')
// Legend 1
d3.select('#legend').append('div')
                .attr('id', 'legend1')
d3.select('#legend1').append('svg')
                .attr('id', 'svg1')
                .attr('width', '7')
                .attr('height', '7')
d3.select('#svg1').append('rect')
            .attr('width', '7')
            .attr('height', '7')
            .style('fill', 'rgb(255,202,8)')
d3.select('#legend1').append('span')
                .attr('id', 'span1')
d3.select('#span1').text(' Eco')
            .style('font-size', 'x-small')
            .style('font-weight', 'bold')

// Legend 2
d3.select('#legend').append('div')
                .attr('id', 'legend2')
d3.select('#legend2').append('svg')
                .attr('id', 'svg2')
                .attr('width', '7')
                .attr('height', '7')
d3.select('#svg2').append('rect')
            .attr('width', '7')
            .attr('height', '7')
            .style('fill', 'rgb(206,141,62)')
d3.select('#legend2').append('span')
                .attr('id', 'span2')
d3.select('#span2').text(' Business')
            .style('font-size', 'x-small')
            .style('font-weight', 'bold')

// Legend 2
d3.select('#legend').append('div')
                .attr('id', 'legend3')
d3.select('#legend3').append('svg')
                .attr('id', 'svg3')
                .attr('width', '7')
                .attr('height', '7')
d3.select('#svg3').append('rect')
            .attr('width', '7')
            .attr('height', '7')
            .style('fill', 'rgb(249,147,29)')
d3.select('#legend3').append('span')
                .attr('id', 'span3')
d3.select('#span3').text(' Eco Plus')
            .style('font-size', 'x-small')
            .style('font-weight', 'bold')

// Dount chart
// set the dimensions and margins of the graph
var svgwidth_donut = 550;
var svgheight_donut = 550;
var padding_donut = 10;

var svg_donut = d3.select("#donut_chart")
        .append('svg')
        .attr('width', svgwidth_donut)
        .attr('height', svgheight_donut)
        .attr('id', 'donutItself')

var inner_width_donut = svgwidth_donut - padding_donut;
var inner_height_donut = svgheight_donut - padding_donut;

var g_donut = svg_donut.append("g")
        .attr("transform", "translate(260, 290)")
        .attr("class", "graph")
        
var radius_donut = Math.min(inner_width_donut, inner_height_donut) / 2;

// Create data

d3.csv('./customer_satisfaction.csv').then(function(data){
let retrivedData = {
    eco: 0,
    ecoP: 0,
    bus: 0,
}
let total = 0;
data.forEach(function(d){
    total++;
    if(d.satisfaction === 'satisfied'){
        if(d.Class === 'Eco'){
            retrivedData.eco++;
        }
        else if(d.Class === 'Eco Plus'){
            retrivedData.ecoP++;
        }
        else{
            retrivedData.bus++
        }
    }
})
console.log(retrivedData);

// set the color scale
let color = d3.scaleOrdinal()
            .range(['rgb(255,202,8)', 'rgb(206,141,62)', 'rgb(249,147,29)']);

// Compute the position of each group on the pie:
let pie = d3.pie()
            .value(d => {
                return d[1];
            });

let arc = d3.arc()
            .innerRadius(radius_donut * 0.33)
            .outerRadius(radius_donut * 0.6) 
let labelArc = d3.arc()
                .innerRadius(radius_donut * 0.9)
                .outerRadius(radius_donut * 0.9)

g_donut.selectAll('.graph')
        .data(pie(Object.entries(retrivedData)))
        .join('path')
        .attr('d', arc )
        .attr('fill', function(d){
            console.log(d.data[1])
            return color(d.data[1])
        })

g_donut.selectAll('.allPolylines')
    .data(pie(Object.entries(retrivedData)))
    .join('polyline')
    .attr("stroke", "gray")
    .attr("fill", 'none')
    .attr('stroke-width', 1)
    .attr('points', function(d) {
    console.log(d)
    var posA = arc.centroid(d);
    var posB = labelArc.centroid(d);
    var posC = labelArc.centroid(d);
    console.log('positionsA', posA)
    console.log('positionsB', posB)

    console.log('positionsC', posC)

    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2

    posC[0] = radius_donut * 0.95 * (midangle < Math.PI ? 1: -1)
    return [posA, posB, posC]
})    

g_donut.selectAll('.allLabels')
    .data(pie(Object.entries(retrivedData)))
    .join('text')
    .text(d => {
        if(d.data[0] === 'eco'){
            let percentage = (d.data[1] / total).toFixed(2)*100
            return  `${percentage} %`;
        }
        else if(d.data[0] === 'ecoP'){
            let percentage = (d.data[1] / total).toFixed(2)*100
            return  `${percentage} %`;
        }
        else{
            let percentage = (d.data[1] / total).toFixed(2)*100
            return  `${percentage} %`;
        }
    // return d.data[0]
    })
    .attr('margin-bottom', '5px')
    .attr('transform', function(d){
        const pos = labelArc.centroid(d)
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0]= radius_donut * 0.95 *( midangle < Math.PI ? 1:-1);
        return `translate(${pos})`;


    let zoom = d3.zoom()
                    .extent([[0,0], [width, height]])
                    .scaleExtent([1, 8])
                    .on("zoom", zoomed)
    svg_donut.call(zoom)

    function zoomed({transform}) {
        console.log(transform)

        g_donut.attr("transform", `translate(${transform.x}, ${transform.y}) scale(${transform.k})`)
    }
})
})