// var sandwiches = [
//     { name: "Thesis", price: 7.95, size: "large" },
//     { name: "Dissertation", price: 8.95, size: "large" },
//     { name: "Highlander", price: 6.50, size: "small" },
//     { name: "Just Tuna", price: 6.50, size: "small" },
//     { name: "So-La", price: 7.95, size: "large" },
//     { name: "Special", price: 12.50, size: "small" }
// ];
// var svg = d3.select("body").append("svg")
//     .attr("width", 500)
//     .attr("height", 100);
//
// svg.selectAll("circle").data(sandwiches).enter().append("circle")
//     .attr("cx", function(d, index) {
//         return (50 + index * 70);})
//     .attr("cy", 50)
//     .attr("r", function (d){
//         if(d.size === "large"){
//             return 30;
//         } else return 15;
//     })
//     .attr("fill", function (d){
//         if(d.price < 7.00){
//             return "blue";
//         } else return "pink";
//     })
//     .attr("stroke", "black" )

var euCity;
d3.csv("data/cities.csv")
    .then(data => {
        console.log("Data loading complete. Work with dataset.");
        euCity = filterObg(data)
        console.log(euCity)
        addCountData(euCity)
        strToNum(euCity)
        drewCircles(euCity)
    })
    .catch(error => {
        console.error("Error loading the data");
    });

// console.log("Do something else, without the data");

function filterObg(data)
{
    return data.filter(city => city.eu === 'true');
}

function addCountData(data){
    d3.select("body").append("p").text(data.length);
}

function strToNum(data){
    for(var i = 0; i < data.length; i ++) {
        data[i].population = +data[i].population;
        data[i].x = +data[i].x;
        data[i].y = +data[i].y;
    }
}

function drewCircles(data){
    var svg1 = d3.select("body").append("svg")
        .attr("width", 700)
        .attr("height", 550);
    svg1.selectAll("circle").data(data).enter().append("circle")
        .attr("cx", function(d, x) {
            return d.x;})
        .attr("cy", function(d, y) {
            return d.y;})
        .attr("r", function (d){
            if(d.population < 1000000){
                return 4;
            } else return 8;
        })
        .attr("fill", "pink")
        .attr("stroke", "black" )
    svg1.selectAll("text").data(data).enter().append("text")
        .attr("class", "city-label")
        .attr("visibility", function (d){
            if(d.population < 1000000){
                return "hidden";
            } else return "visible";})
        .attr("x", function(d, x) {
            return d.x;})
        .attr("y", function(d, y) {
            return d.y;})
        .text(function(d) {
            return d.city;})
}





