// Bar Chart
var svgwidth_bar = 700;
                var svgheight_bar = 500;
                var padding_bar = 100;

                var svg_bar = d3.select('#h_bar_chart')
                            .append('svg')
                            .attr('width', svgwidth_bar)
                            .attr('height', svgheight_bar)
                            .attr('id', 'barChartItself')
                var inner_width_bar = svgwidth_bar - padding_bar;
                var inner_height_bar = svgheight_bar - padding_bar;
                var g_bar = svg_bar.append('g')
                            .attr('transform', 'translate(50, 50)')
                            .attr('class', 'graph');
                // ----- Helper function------

                //x-axis label         
                
                d3.csv('./num-of-satisfactory-level-by-category.csv').then(function(data){
                    console.log(data);
                //get x-axis
                var groups = data.map(d => d.Categories)
                console.log(groups);
                var xscale = d3.scaleBand()
                                .domain(groups)
                                .range([0, inner_width_bar])
                                .padding([0.1])
                var xaxis = d3.axisBottom()
                            .scale(xscale);
                //x-axis label         
                g_bar.append('text')
                .attr("x", 20 )
                    .attr("y",  10 )
                    .style("text-anchor", "middle")
                    .text("Date");
                g_bar.append('g')
                    .attr('transform',"translate(0," + inner_height_bar + ")")
                    .call(xaxis)
                //Graph title
                g_bar.append('text')
                .attr("x", 350 )
                    .attr("y",  10 )
                    .style("text-anchor", "middle")
                    .style("font-size", "1.2rem")
                    .text("Chart 3 - Number of satification level by categories")
                    .style('font-weight', 'bold')
                    .style('font-family', 'Alatsi')
                var yscale = d3.scaleLinear()
                                .domain([0, 50])
                                .range([inner_height_bar,0])
                var yaxis = d3.axisLeft()
                                .scale(yscale);
                g_bar.append('g')
                .call(yaxis);
                var subgroups = data.columns.slice(1);
                var xscaleSubGroup = d3.scaleBand()
                    .domain(subgroups)
                    .range([0, xscale.bandwidth()]);
                var color = d3.scaleOrdinal()
                            .domain(subgroups)
                            .range(['#F58634', '#2D2926', '#939FA5','#29B6F6','#51BE56','#FFC107'])
                g_bar.append('g')
                .selectAll('g')
                .data(data)
                .join('g')
                .attr('transform', d => `translate(${xscale(d.Categories)}, 0)`)
                .selectAll('rect')
                .data(function(d){
                    return subgroups.map(function(key){
                        return {
                            'category': key, 'num':d[key]
                        }
                    })
                })
                .join('rect')
                .attr('x', d => xscaleSubGroup(d.category))
                .attr('y', d => yscale(d.num))
                .attr('width', xscaleSubGroup.bandwidth())
                .attr('height', d => inner_height_bar - yscale(d.num))
                .attr('fill', d => color(d.category))
                // -----------legend------------------------

                })

// Legend
var svgwidth = 160;
                var svgheight = 180;
                var padding = 200;

                var svg = d3.select("#h_legend")
                            .append('svg')
                            .attr("width", svgwidth)
                            .attr("height", svgheight)

                var inner_width = svgwidth - padding;
                var inner_height = svgheight - padding;

                var g = svg.append("g")
                            .attr("transform", "translate(20, 20)")
                            // .attr("transform", "translate(100, 100)")
                            .attr("class", "graph")
                            .attr('id', 'bar_legend')

                g.append("circle")
                    // .attr('cx', 300)
                    // .attr('cy', 330)
                    .attr('cx', 0)
                    .attr('cy', 0)
                    .attr('r', 6)
                    .style('fill', '#F58634 ')
                g.append('circle')
                    // .attr('cx', 300)
                    // .attr('cy', 360)
                    .attr('cx', 0)
                    .attr('cy', 30)
                    .attr('r', 6)
                    .style('fill', '#2D2926')

                g.append('circle')
                // .attr('cx', 300)
                // .attr('cy', 390)
                .attr('cx', 0)
                .attr('cy', 60)
                .attr('r', 6)
                .style('fill', '#939FA5')
                g.append('circle')
                    // .attr('cx', 500)
                    // .attr('cy', 330)
                    .attr('cx', 0)
                    .attr('cy', 90)
                    .attr('r', 6)
                    .style('fill', '#29B6F6')
                g.append('circle')
                // .attr('cx', 500)
                // .attr('cy', 360)
                .attr('cx', 0)
                .attr('cy', 120)
                .attr('r', 6)
                .style('fill', '#51BE56')
                g.append('circle')
                // .attr('cx', 500)
                // .attr('cy', 390)
                .attr('cx', 0)
                .attr('cy', 150)
                .attr('r', 6)
                .style('fill', '#FFC107')

                g.append('text')
                        // .attr('x', 320)
                        // .attr('y', 330)
                        .attr('x', 20)
                        .attr('y', 0)
                        .text('Satifictory level 0')
                        .style("font-size", "15px")
                        .attr('alignment-baseline', 'middle')
                g.append('text')
                        // .attr('x', 320)
                        // .attr('y', 360)
                        .attr('x', 20)
                        .attr('y', 30)
                        .text('Satifictory level 1')
                        .style("font-size", "15px")
                        .attr('alignment-baseline', 'middle')
                g.append('text')
                // .attr('x', 320)
                // .attr('y', 390)
                .attr('x', 20)
                .attr('y', 60)
                .text('Satifictory level 2')
                .style("font-size", "15px")
                .attr('alignment-baseline', 'middle')
                g.append('text')
                // .attr('x', 520)
                // .attr('y', 330)
                .attr('x', 20)
                .attr('y', 90)
                .text('Satifictory level 3')
                .style("font-size", "15px")
                .attr('alignment-baseline', 'middle')
                g.append('text')
                // .attr('x', 520)
                // .attr('y', 360)
                .attr('x', 20)
                .attr('y', 120)
                .text('Satifictory level 4')
                .style("font-size", "15px")
                .attr('alignment-baseline', 'middle')
                g.append('text')
                // .attr('x', 520)
                // .attr('y', 390)
                .attr('x', 20)
                .attr('y', 150)
                .text('Satifictory level 5')
                .style("font-size", "15px")
                .attr('alignment-baseline', 'middle')