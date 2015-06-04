d3.csv('../data/tweetdata.csv', lineChart);

function lineChart(data) {
	var xScale = d3.scale.linear().domain([1, 10.5]).range([20, 480]);
	var yScale = d3.scale.linear().domain([0, 35]).range([480, 20]);

	var xAxis = d3.svg.axis()
					.scale(xScale)
					.orient('bottom')
					.tickSize(480)
					.tickValues([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

	d3.select('svg')
		.append('g')
		.attr('id', 'xAxisG')
		.call(xAxis);

	var yAxis = d3.svg.axis()
					.scale(yScale)
					.orient('right')
					.ticks(10)
					.tickSize(480);

	d3.select('svg')
		.append('g')
		.attr('id', 'yAxisG')
		.call(yAxis);

	// line style
	d3.selectAll('path.domain')
		.style('fill', 'none')
		.style('stroke', 'black');

	// draw circles
	d3.select('svg')
		.selectAll('circle.tweets')
		.data(data)
		.enter()
		.append('circle')
		.attr('class', 'tweets')
		.attr('r', 5)
		.attr('cx', function(d) { return xScale(d.day); })
		.attr('cy', function(d) { return yScale(d.tweets); })
		.style('fill', 'black');

	d3.select('svg')
		.selectAll('circle.retweets')
		.data(data)
		.enter()
		.append('circle')
		.attr('class', 'retweets')
		.attr('r', 5)
		.attr('cx', function(d) { return xScale(d.day); })
		.attr('cy', function(d) { return yScale(d.retweets); })
		.style('fill', 'lightgrey');

	d3.select('svg')
		.selectAll('circle.favorites')
		.data(data)
		.enter()
		.append('circle')
		.attr('class', 'favorites')
		.attr('r', 5)
		.attr('cx', function(d) { return xScale(d.day); })
		.attr('cy', function(d) { return yScale(d.favorites); })
		.style('fill', 'grey');

	// line generators
	var tweetLine = d3.svg.line()
						.x(function(d) {
							return xScale(d.day);
						})
						.y(function(d) {
							return yScale(d.tweets);
						})
						.interpolate('basis');

	var retweetLine = d3.svg.line()
						.x(function(d) {
							return xScale(d.day);
						})
						.y(function(d) {
							return yScale(d.retweets);
						})
						.interpolate('step');

	var favLine = d3.svg.line()
						.x(function(d) {
							return xScale(d.day);
						})
						.y(function(d) {
							return yScale(d.favorites);
						})
						.interpolate('cardinal');

	// draw lines
	d3.select('svg')
		.append('path')
		.attr('d', tweetLine(data))
		.attr('fill', 'none')
		.attr('stroke', 'darkred')
		.attr('stroke-width', 2);

	d3.select('svg')
		.append('path')
		.attr('d', retweetLine(data))
		.attr('fill', 'none')
		.attr('stroke', 'grey')
		.attr('stroke-width', 2);

	d3.select('svg')
		.append('path')
		.attr('d', favLine(data))
		.attr('fill', 'none')
		.attr('stroke', 'black')
		.attr('stroke-width', 2);
}