d3.csv('../data/boxplot.csv', boxplot);

function boxplot(data) {
	var xScale = d3.scale.linear().domain([1, 8]).range([20, 470]);
	// scale is inverted, so higher values are drawn higher up and lower values toward the bottom
	var yScale = d3.scale.linear().domain([0, 100]).range([480, 20]);

	var yAxis = d3.svg.axis()
					.scale(yScale)
					.orient('right')
					.ticks(10)
					.tickSize(-470);

	d3.select('svg')
		.append('g')
		.attr('transform', 'translate(470, 0)')
		.attr('id', 'yAxisG')
		.call(yAxis);

	var xAxis = d3.svg.axis()
					.scale(xScale)
					.orient('bottom')
					.tickSize(-470)
					.tickValues([1, 2, 3, 4, 5, 6, 7]);

	d3.select('svg')
		.append('g')
		.attr('transform', 'translate(0, 480)')
		.attr('id', 'xAxisG')
		.call(xAxis);

	// line style
	d3.selectAll('path.domain')
		.style('fill', 'none')
		.style('stroke', 'black');

	d3.select('svg')
		.selectAll('circle.median')
		.data(data)
		.enter()
		.append('circle')
		.attr('class', 'tweets')
		.attr('r', 5)
		.attr('cx', function(d) { return xScale(d.day); })
		.attr('cy', function(d) { return yScale(d.median); })
		.style('fill', 'darkgrey');

	// draw the box
	d3.select('svg')
		.selectAll('g.box')
		.data(data)
		.enter()
		.append('g')
		.attr('class', 'box')
		.attr('transform', function(d) {
			return 'translate(' + xScale(d.day) + ', ' + yScale(d.median) + ')';
		})
		.each(function(d, i) {
			// line.range
			d3.select(this)
				.append('line')
				.attr('class', 'range')
				.attr('x1', 0)
				.attr('x2', 0)
				.attr('y1', yScale(d.max) - yScale(d.median))
				.attr('y2', yScale(d.min) - yScale(d.median))
				.style('stroke', 'black')
				.style('stroke-width', '4px');

			// line.max
			d3.select(this)
				.append('line')
				.attr('class', 'max')
				.attr('x1', -10)
				.attr('x2', 10)
				.attr('y1', yScale(d.max) - yScale(d.median))
				.attr('y2', yScale(d.max) - yScale(d.median))
				.style('stroke', 'black')
				.style('stroke-width', '4px');

			// line.min
			d3.select(this)
				.append('line')
				.attr('class', 'min')
				.attr('x1', -10)
				.attr('x2', 10)
				.attr('y1', yScale(d.min) - yScale(d.median))
				.attr('y2', yScale(d.min) - yScale(d.median))
				.style('stroke', 'black')
				.style('stroke-width', '4px');

			// this represents the box
			d3.select(this)
				.append('rect')
				.attr('class', 'range')
				.attr('width', 20)
				.attr('height', yScale(d.q1) - yScale(d.q3))
				// offset
				.attr('x', -10)
				.attr('y', yScale(d.q3) - yScale(d.median))
				// styles
				.style('fill', 'white')
				.style('stroke', 'black');

			// line.median
			d3.select(this)
				.append('line')
				.attr('class', 'median')
				.attr('x1', -10)
				.attr('x2', 10)
				.attr('y1', 0)
				.attr('y2', 0)
				.style('stroke', 'orange')
				.style('stroke-width', '2px');
		});
}