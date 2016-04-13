(function graphChart() {

  var makeReq = require(__dirname + '/request_data');
  var totalEnergy = 'http://api.eia.gov/geoset/?geoset_id=SEDS.TEPRB.A&regions=USA-AL,USA-AK,USA-AR,USA-AZ,USA-CA,USA-CO,USA-CT,USA-DC,USA-DE,USA-FL,USA-GA,USA-HI,USA-IA,USA-ID,USA-IL,USA-IN,USA-KS,USA-KY,USA-LA,USA-MA,USA-MD,USA-ME,USA-MI,USA-MN,USA-MO,USA-MS,USA-MT,USA-NC,USA-ND,USA-NE,USA-NH,USA-NJ,USA-NM,USA-NV,USA-NY,USA-OH,USA-OK,USA-OR,USA-PA,USA-RI,USA-SC,USA-SD,USA-TN,USA-TX,USA-UT,USA-VA,USA-VT,USA-WA,USA-WI,USA-WV,USA-WY&api_key=94C42DDBB679F7EEA2877FE3C4C74E9C&start=2009&end=2013';
  var totalRenewable = 'http://api.eia.gov/geoset/?geoset_id=SEDS.REPRB.A&regions=USA-AL,USA-AK,USA-AR,USA-AZ,USA-CA,USA-CO,USA-CT,USA-DC,USA-DE,USA-FL,USA-GA,USA-HI,USA-IA,USA-ID,USA-IL,USA-IN,USA-KS,USA-KY,USA-LA,USA-MA,USA-MD,USA-ME,USA-MI,USA-MN,USA-MO,USA-MS,USA-MT,USA-NC,USA-ND,USA-NE,USA-NH,USA-NJ,USA-NM,USA-NV,USA-NY,USA-OH,USA-OK,USA-OR,USA-PA,USA-RI,USA-SC,USA-SD,USA-TN,USA-TX,USA-UT,USA-VA,USA-VT,USA-WA,USA-WI,USA-WV,USA-WY&api_key=94C42DDBB679F7EEA2877FE3C4C74E9C&start=2009&end=2013';

  function parseData(obj) {
    var data = [];
    var parseResponse = JSON.parse(obj);
    var getDataSeries = parseResponse.geoset.series;
    return getDataSeries;
    //for (var prop in getDataSeries) {
      //var state = getDataSeries[prop];
      //var stateData = data.push(state.data);
    //}
    //var btus = [];
    //console.log(getDataSeries);
    //data.forEach(function(element) {
      //btus.push(element[0][1]);
    //});
    //return btus;
  }

  function displayData(dataSeries, state) {

    var graphData = dataSeries[state].data;

    var margin = {
      top: 20,
      right: 10,
      bottom: 30,
      left: 40
    };

    var width = parseInt(d3.select(".state-chart").style("width"), 10);
    width = width - margin.left - margin.right;

    var height = 300 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1)
        .domain(graphData.map(function(d) {
          return d[0];
        }));

    var y = d3.scale.linear()
        .range([height, 0])
        .domain([0, d3.max(graphData, function(d) {
          return d[1];
        })]);

    var barChart = d3.select(".bar-chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    barChart.selectAll(".bar")
        .data(graphData)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("y", function(d) {
          return y(d[1]);
        })
        .attr("x", function(d) {
          return x(d[0]);
        })
        .attr("height", function(d) {
          return height - y(d[1]);
        })
        .attr("width", x.rangeBand());

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format("s"));

    barChart.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

    barChart.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 5)
          .attr("dy", "10px")
          .style("text-anchor", "end")
          .text("BTUs");

  }

  makeReq('GET', totalEnergy)
  .then(function success(response) {
    var totalBtu = parseData(response);
    var stateBtu = displayData(totalBtu, "USA-AK");
  }, function failure(response) {
    console.error("Error", response.statusText);
  });

  makeReq('GET', totalRenewable)
  .then(function success(response) {
    var renewBtu = parseData(response);
  }, function failure(response) {
    console.error("Error", response.statusText);
  });

})();
