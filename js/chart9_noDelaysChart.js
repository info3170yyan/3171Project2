// Chart background
d3.select('#noDelaysChart')
.style('background-image', 'radial-gradient(circle, rgb(255,255,255) 20%, rgb(193,193,193))')
.style('padding-top', '5px')
.style('width', 'mae-content')

// Chart title
d3.select('#noDelaysChart').append('h6')
                    .text('Chart 9 - Number of customers who did not experience any departure or arrival delays')
                    .style('text-align', 'center')
                    .style('font-weight', 'bold')

var svg_single_value02 = d3.select('#noDelaysChart')
                                    .append('svg_single_value02')
                                    // .style('background-color', '#ffffff')
                                    .style('background-color', 'rgb(250, 232, 218)')
                                    .style('border', 'solid 2px rgb(245,134,52)')
                                    .style('box-shadow', '2px 2px 2px black')
                                    .attr("viewBox", `0 0 300 300`)
                                    .style('margin-left', '15%')
        var g_single_value02 = svg_single_value02.append("g_single_value02")
                                                .attr("transform", "translate(100, 100)")
                                                .attr("class", "graph")
                                                .style("padding", "30px 30px 30px 30px")
        var getCount = function(data, val)
            {
                var count = 0;
                var length = data.length;

                for (var x = 0; x < length; x++)
                {
                    if (d3.map(data, d=> d['Total Departure and Arrival Delay in Minutes'])[x] == val)
                        count++;
                }

                return count;
            }// Helper function

        d3.csv('./customer_satisfaction.csv').then(function(dataSource){
        var numNoDelays = getCount(dataSource,0);
        console.log(typeof(totalNumberFlightDistance));
        g_single_value02.append("tspan")
                        .attr("dy", "0rem")
                        .attr("class", "text")
                        .attr("font-size", "6rem")
                        .attr("dy", "15")
                        .text("Number of customers who did not experience any departure or arrival delays: ")
                        .style("font-weight", "700")
                        .style('margin-top', '20px')


        g_single_value02.append("line")
                        .attr("class", "mean-line")

        g_single_value02.append("tspan")
                        .attr("dy", "1rem")
                        .text(numNoDelays)

        })