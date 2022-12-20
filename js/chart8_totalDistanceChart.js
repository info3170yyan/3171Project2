// Chart background
d3.select('#totalDistanceChart')
.style('background-image', 'radial-gradient(circle, rgb(255,255,255) 20%, rgb(193,193,193))')
.style('padding-top', '5px')
.style('width', 'mae-content')

// Chart title
d3.select('#totalDistanceChart').append('h6')
                    .text('Chart 8 - Number of customers who did not experience any departure or arrival delays')
                    .style('text-align', 'center')
                    .style('font-weight', 'bold')

var svg_sv_width = 500;
var svg_sv_height = 500;
var svg_single_value01 = d3.select('#totalDistanceChart')
                            .append('svg_single_value01')
                            // .style('background-color', '#ffffff')
                            .style('background-color', 'rgb(250, 232, 218)')
                            .style('border', 'solid 2px rgb(245,134,52)')
                            .style('box-shadow', '2px 2px 2px black')
                            .attr('width', svg_sv_width)
                            .attr('height', svg_sv_height)
                            .style('margin-left', '30%')

var g_single_value01 = svg_single_value01.append("g_single_value01")
                                        .attr("transform", "translate(100, 100)")
                                        .attr("class", "graph")
                                        .style("padding", "30px 30px 30px 30px")

d3.csv('./customer_satisfaction.csv').then(function(dataSource){
var totalNumberFlightDistance = d3.sum(dataSource, d => d['Flight Distance']);
console.log(typeof(totalNumberFlightDistance));
g_single_value01.append("tspan")
                .attr("dy", "0rem")
                .attr("class", "text")
                .attr("font-size", "6rem")
                .attr("dy", "15")
                .text("Total number of flight distance: ")
                .style("font-weight", "700")


g_single_value01.append("line")
                .attr("class", "mean-line")

g_single_value01.append("tspan")
                .attr("dy", "1rem")
                .text(totalNumberFlightDistance  + " km")

})