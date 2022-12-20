// Chart background
d3.select('#chart1_bar')
.style('background-image', 'radial-gradient(circle, rgb(255,255,255) 20%, rgb(193,193,193))')
.style('padding-top', '5px')

// Chart title
d3.select('#chart1_bar_itself').append('h6')
                    .text('Chart 1 - Relationship between delay time and satisfactory')
                    .style('text-align', 'center')
                    .style('wfont-eight', 'bold')

var svgwidth_c1bar = 2000;
var svgheight_c1bar = 500;
var padding_c1bar = 100;

var svg_c1bar = d3.select('#chart1_bar_itself')
    .append('svg')
    .attr('width', '100%')
    .attr('height', svgheight_c1bar)
    .style('overflow', 'auto')
    // .style('white-space', 'nowrap')
    // .style('overflow-y', 'hidden')

// svg_c1bar.append("text") 
// .attr("class", "chart-title")
// .attr("x", 30)
// .attr('y', 30)
// .text('22F Grade');

var inner_width_c1bar = svgwidth_c1bar - padding_c1bar; //400
var inner_height_c1bar = svgheight_c1bar - padding_c1bar; //400

var g_c1bar = svg_c1bar.append('g')
.attr('class', 'group')
.attr("transform", "translate(50, 50)")

var xscale_c1bar = d3.scaleBand()
.range([0, inner_width_c1bar])
.paddingInner(0.5)
.paddingOuter(0.2)

var yscale_c1bar = d3.scaleLinear()
.range([inner_height_c1bar, 0])

// _c1bar
d3.csv('./customer_satisfaction.csv').then(function(data){
    console.log(data)
    xscale_c1bar.domain(data.map(d => d.id))

    var xaxis_c1bar = d3.axisBottom()
                    .scale(xscale_c1bar)

    g_c1bar.append('g')
        .attr('transform', 'translate(0,' + inner_height_c1bar + ')' )
        .call(xaxis_c1bar)
        .append('text')
        .attr('x', inner_width_c1bar/2)
        .attr('y', 40)
        .attr('stroke', '#000')
        .text('PASSENGER')

    yscale_c1bar.domain([0, d3.max(data, d => parseInt(d.FlightDistance))])

    var yaxis_c1bar = d3.axisLeft()
                        .scale(yscale_c1bar)

    g_c1bar.append('g')
        .call(yaxis_c1bar)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -170)
        .attr('y', -30)
        .attr('stroke', '#000')
        .text('DISTANCE')

    var graph_c1bar = g_c1bar.selectAll(".graph")
    .data(data)
    .enter()
    .append('g')

    graph_c1bar.append("rect")
        .attr("class", "bar")
        .attr('x', function(d) { return xscale_c1bar(d.id)})
        .attr('y', function(d) { return yscale_c1bar(parseInt(d.FlightDistance))})
        .attr('width', xscale_c1bar.bandwidth())
        .attr('height', function(d) { return inner_height_c1bar - yscale_c1bar(parseInt(d.FlightDistance))})
        .attr('fill', 'rgb(249,147,29, 0.7)')

    graph_c1bar.append('text')
        .attr('x', function(d) { return xscale_c1bar(d.id)})
        .attr('y', function(d) {return yscale_c1bar(parseInt(d.FlightDistance))})
        .attr('dx', ".45em")
        .attr('dy', ".95em")
        .text(function(d) {
            return d.FlightDistance;
        })
        .attr('fill', '#000')
})