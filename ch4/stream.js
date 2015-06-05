d3.csv('../data/movies.csv', movieChart);

function movieChart(data) {
	// scales
	var xScale = d3.scale.linear().domain([1, 8]).range([20, 470]);
	// yScale may map to Higher value to Lower value since it is more natural
	var yScale = d3.scale.linear().domain([0, 100]).range([480, 20]);

	// color ramp
	var fillScale = d3.scale.linear()
						.domain([0, 5])
						.range(['lightgrey', 'black']);

	var n = 0;
	// iterate through the headers
	for(var x in data[0]) {
		if(x !== 'day') {
			var movieArea = d3.svg.area()
								.x(function(d) {
									return xScale(d.day);
								})
								.y(function(d) {
									return yScale(simpleStacking(d, x));
								})
								// define where the bottom of the path is
								.y0(function(d) {
									return yScale(simpleStacking(d, x) - d[x]);
								})
								.interpolate('cardinal');

			// create line
			d3.select('svg')
				.append('path')
				.style('id', x + 'Area')
				// apply the line gen
				.attr('d', movieArea(data))
				.attr('fill', fillScale(n))
				.attr('stroke', 'black')
				.attr('stroke-width', 3)
				.style('opacity', .5);

			n++;
		}
	}

	function simpleStacking(incomingData, incomingAttribute) {
		var newHeight = 0;
		for(x in incomingData) {
			if(x != 'day') {
				newHeight += parseInt(incomingData[x]);
				if(x == incomingAttribute) {
					break;
				}
			}
		}

		return newHeight;
	}
}