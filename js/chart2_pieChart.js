// Chart background
d3.select('#pie_chart')
.style('background-image', 'radial-gradient(circle, rgb(80,80,80) 20%, rgb(34,34,34))')
.style('padding-top', '5px')
.style('width', 'mae-content')

// Chart title
d3.select('#pie_chart').append('h6')
                    .text('Chart 2 - The proportion of satisfied/neutral or unsatisfied')
                    .style('text-align', 'center')
                    .style('font-weight', 'bold')
                    .style('color', 'white')

var svgwidth_pie = 500;
var svgheight_pie = 500;
var padding_pie = 220;

var svg_pie = d3.select("#pie_chart")
            .append('svg')
            .attr('width', svgwidth_pie)
            .attr('height', svgheight_pie)
            .attr('id', 'pieChartItself')

var inner_width_pie = svgwidth_pie - padding_pie;
var inner_height_pie = svgheight_pie -padding_pie;

var g_pie = svg_pie.append("g")
            .attr("transform", "translate(100, 150)")
            .attr("class", "graph")

var radius_pie = Math.min(inner_width_pie, inner_height_pie) / 2;
        var satisfied =0;
        var unsatisfied=0;
d3.csv('./customer_satisfaction.csv').then(function(data){


     let groups = data.map(d => d.satisfaction);             
    
     groups.forEach(element => {

        if(element.length == 9){
            satisfied++;
        } else{
            unsatisfied++;   
        }
});

satisf=Math.round((satisfied*100)/(satisfied+unsatisfied));
unsatisf=Math.round((unsatisfied*100)/(unsatisfied+satisfied));
 
var data = {
    a: unsatisf,
    b: satisf    
}
    console.log(data)
var color = d3.scaleOrdinal()
            .range(['#FF8300', '#145DA0']);

            var pie = d3.pie()
        .value(d => {
            return d[1];
        });
var arcGenerator = d3.arc()
                    .innerRadius(0)
                    .outerRadius(radius_pie) 

        g_pie.selectAll('.graph')
    .data(pie(Object.entries(data)))
    .join('path')
    .attr('d',  arcGenerator)
    .transition()
    .duration(1000)
    .attr('transform', `translate(${inner_width_pie/2}, ${inner_height_pie/3})`)
    .attr('fill', function(d){
        return color(d.data[1])
    })

    console.log(data)
    // d3.select(".graph")
    // .append('g')
    // .append('text')
    // .transition()
    // .duration(1000)
    // .attr('x', 0)
    // .attr('y', -padding_pie/2)
    // .text('The proportion of satisfied/neutral or unsatisfied')
    // .attr('fill', 'white')
    // .style('font-size',20)
    
    d3.select(".graph")
    .append('g')
    .append('text')
    .transition()
    .duration(1000)
    .attr('x', padding_pie/3)
    .attr('y', -padding_pie/3)
    .text('customer responded')
    .attr('fill', 'white')
    .style('font-size',20)
    

    g_pie.append('g')
    .attr('transform', `translate(${inner_width_pie/2}, ${inner_height_pie/3})`)
    .selectAll('.graph')
    .data(pie(Object.entries(data)))
    .join('text')
    .transition()
    .duration(1000)
    .text(function(d){
        return d.data[1]+'% '
    })
    .attr("transform", function(d){
        return `translate(${arcGenerator.centroid(d)})`
    })
    .style("font-size", 17)
    .style("text-anchor", "middle")
    .style("fill", "white")

    var keys = [ "neutral or dissatisfied","satisfied"];
    var colors = ["#FF8300", '#145DA0'];

    var color = d3.scaleOrdinal()
                    .domain(keys)
                    .range(colors);
    var squareSize = 10;
    g_pie.selectAll('rect')
        .data(keys)
        .join('rect')
        .transition()
        .duration(1000)
        .attr('x', (d, i) => 5 + (i * (squareSize+padding_pie)))
        .attr('y', inner_height_pie)
        .attr('width', squareSize)
        .attr('height', squareSize)
        .style('fill', function(d){
            return color(d)
        })
            

        g_pie.selectAll(".gragh")
            .data(keys)
            .join('text')
            .transition()
            .duration(1000)
            .attr('x', (d, i) => 25 + (i * (squareSize +padding_pie)))
            .attr('y', inner_height_pie+5)
            .style("fill","white")
            
            .text(function(d){
                return d
            })
            .style("alignment-baseline", "middle")





            svg_pie.append('g')
            .attr('class', 'graph')
                .selectAll('text')
                .data(slices)
                .enter()
                    .append('text')
                    .text(function(d) { return '• ' + d.data.product; })
                    .attr('fill', function(d) { return color(d.data.product); })
                    .attr('y', function(d, i) { return 20 * (i + 1); })


        })

