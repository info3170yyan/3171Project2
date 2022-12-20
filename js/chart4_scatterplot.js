// Chart background
d3.select('#scatterplot')
.style('background-image', 'radial-gradient(circle, rgb(255,255,255) 20%, rgb(193,193,193))')
.style('padding-top', '5px')

// Chart title
d3.select('#scatterplot').append('h6')
                    .text('Chart 4 - Relationship between delay time and satisfactory')
                    .style('text-align', 'center')
                    .style('wfont-eight', 'bold')

var svgwidth_chart4 = 500;
var svgheight_chart4 = 500;
var padding_chart4 = 100;

var svg_chart4 = d3.select("#scatterplot")
                .append('svg')
                .attr('width', svgwidth_chart4)
                .attr('height', svgheight_chart4)
                .attr('id', 'chart4Itself')

var inner_width_chart4 = svgwidth_chart4 - padding_chart4;
var inner_height_chart4 = svgheight_chart4 - padding_chart4;

var g_chart4 = svg_chart4.append('g')
                        .attr('transform', 'translate(50, 50)')
                        .attr('class', 'graph');

// _chart4
d3.csv("./customer_satisfaction.csv").then(function(data){
    var xscale_chart4 = d3.scaleLinear()
                .domain([0, d3.max(data, d=>parseInt(d.TotalDepartureandArrivalDelayinMinutes))])
                .domain([0, 293])
                .range([0, inner_width_chart4])
            
    var xaxis_chart4 = d3.axisBottom()
                .scale(xscale_chart4)

    g_chart4.append('g')
    .attr("transform", "translate(0," + inner_width_chart4 + ")")
    .call(xaxis_chart4)

    var yscale_chart4 = d3.scaleLinear()
                        .domain([0, d3.max(data, d => parseInt(d.AverageSatisfaction))])
                        .domain([0, 4.79])
                        .range([inner_height_chart4, 0]);

    var yaxis_chart4 = d3.axisLeft()
    .scale(yscale_chart4);

    g_chart4.append('g')
    .call(yaxis_chart4)

    g_chart4.append('g')
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr("r", 3)
        .attr('cx', d => xscale_chart4(d.TotalDepartureandArrivalDelayinMinutes))
        .attr('cy', d => yscale_chart4(d.AverageSatisfaction))
        .style('fill', "red")
    })