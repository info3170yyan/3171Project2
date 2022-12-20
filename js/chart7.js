// Chart background
d3.select('#chart7')
.style('background-image', 'radial-gradient(circle, rgb(255,255,255) 20%, rgb(193,193,193))')
.style('padding-top', '5px')

// // Chart title
// d3.select('#chart7').append('h6')
//                     .text('Chart 7 - Number of Loyal Customers')
//                     .style('text-align', 'center')
//                     .style('font-weight', 'bold')

// var svgwidth_7 = 300;
// var svgheight_7 = 200;
// var padding_7 = 220;

// d3.select("#chart7")
//     .append('div')
//     .attr('id', 'chart7Div')
//     .style('margin-top', '15px')
//     .style('margin-left', '25%')

// d3.select("#chart7Div")
//             .append('svg')
//             .attr('width', svgwidth_7)
//             .attr('height', svgheight_7)
//             .attr('id', 'chart7Left')
//             .style('background-color', 'rgb(245,134,52)')
//             .style('border-radius', '20px 0px 0px 20px')
//             .style('float', 'left')


// // d3.select('#chart7Div')
// //     .append('svg')
// //     .attr('width', svgwidth_7 * 0.5)
// //     .attr('height', svgheight_7)
// //     .attr('id', 'chart7Right')
// //     // .style('background-image', 'radial-gradient(circle, rgb(255,255,255) 20%, rgb(193,193,193))')
// //     .style('background-color', 'white')
// //     .style('border-radius', '0px 20px 20px 0px')
// //     .style('border', 'solid 2px rgb(245,134,52)')
// //     // .style('float', 'left')
// //     // .style('margin', '20px')

// d3.csv('./customer_satisfaction.csv').then(function(data){
//     let numLoyal = 0;
//     data.forEach(function(d){
//         if(d.CustomerType === 'Loyal Customer'){
//             numLoyal++;
//         }
//     })
//     d3.select('#chart7Div')
//         .append('div')
//         .attr('id', 'chart7Right')
//         .attr('width', 'max-content')
//         .attr('height', svgheight_7)
//         .style('background-color', 'blue')

//     d3.select('#chart7Right')
//         .append('span')
//         .text(numLoyal.toString())
//         .attr('id', 'num')

//     d3.select('#num')
//         // .style('margin-top', '-20%')
//         .style('font-weight', 'bold')
//         .style('font-size', '140px')

// })

var svg_lc_width = 400;
var svg_lc_height = 200;
var padding_lc = 20;

var svg_lc = d3.select("#chart7itself")
            .append('svg')
            .attr('width', svg_lc_width)
            .attr('height', svg_lc_height);

var inner_width_lc = svg_lc_width - padding_lc;
var inner_height_lc = svg_lc_height -padding_lc;

var g_lc = svg_lc.append("g")
            .attr("transform", "translate(50, 50)")
            .attr("class", "graph")


            

var xscale_lc = d3.scaleBand()
                .range([0, inner_width_lc])
                .paddingInner(0.5)
                .paddingOuter(0.2)

var yscale_lc = d3.scaleLinear()
                .range([inner_height_lc, 0])


function triggerTransition(info) {
    var loyalCustomers_lc =0;
    var disloyalCustomers_lc=0;
    d3.csv('./customer_satisfaction.csv').then(function(data){  
        var groups_lc =data.map(d => d.CustomerType) /*['Customer Type']*/
        console.log(groups_lc[0])
        groups_lc.forEach(element => {
            if(element.length === 14){
                loyalCustomers_lc++;
            } else{
                disloyalCustomers_lc++;   
            } 
        });

    // d3.select(".graph")
    //     .append('g')
    //     .append('text')
    //     .attr('x', 0)
    //     .attr('y',0 )
    //     .text('Number of loyal Customer')
    //     .style('font-size',20)
                

    // d3.select(".graph")
    //     .append('g')
    //     .append('text')
    //     .attr('x', 0)
    //     .attr('y',40 )
    //     .text('Customer Type')
                            
    
    //----------------

    

    var newData_lc=[loyalCustomers_lc,disloyalCustomers_lc];
    var Loyalty_lc=["Loyal Cutomers","Disloyal Customers"];
    var color_lc=["orange","green"];

    
    g_lc.append('g_lc')
        .append('text')
        .data(Loyalty_lc)
        .attr('x', 0)
        .attr('y', 70)
        .attr('stroke', '#000')
        .text(function(d) {
            return Loyalty_lc[info]   
        });
    

    var graph = g_lc.selectAll(".graph")
                .data(newData_lc)
                .enter()
                .append('g')

        graph.append("rect")
            .attr("class", "bar")
            .attr('x', 130)
            .attr('y',50)
            .attr('width', 100)
            .attr('height',30)
            .transition()
            .delay(200)
            .duration(2000)
            .attr('fill',function(d) {
                return color_lc[info];    
            });
            

        graph.append('text')
            .attr('x', 150)
            .attr('y', 50)
            .attr('dx', ".55em")
            .attr('dy', 20)
            .text(function(d) {
                return newData_lc[info];
                
            })
            .attr('fill', 'white')
    
    })   
}
    
triggerTransition(0);