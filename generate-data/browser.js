
const generateBiodata = require('./generate-biodata');

const config = {
	default: {
		layout: {
			margin: {
				l: 60,
				r: 30,
				b: 60,
				t: 30
			},
			xaxis: {
				range: [ new Date('2009-01-01').getTime(), Date.now() ]
			}
		}
	},
	'a1c': {
		trace: {
			line: {
				shape: 'spline',
				color: 'red'
			}
		},
		layout: {
			yaxis: {
				range: [ 2, 10.5 ]
			}
		}
	},
	'waist': {
		trace: {
			line: {
				shape: 'spline',
				color: 'green'
			}
		},
		layout: {
			yaxis: {
				range: [ 25, 50 ]
			}
		}
	},
	'systolic': {
		trace: {
			line: {
				shape: 'spline',
				color: 'blue'
			}
		},
		layout: {
			yaxis: {
				range: [ 2, 10.5 ]
			}
		}
	},
	'diastolic': {
		trace: {
			line: {
				shape: 'spline',
				color: 'orange'
			}
		},
		layout: {
			yaxis: {
				range: [ 2, 10.5 ]
			}
		}
	},
	'hdl': {
		trace: {
			line: {
				shape: 'spline',
				color: '#ff9900'
			}
		},
		layout: {
			yaxis: {
				range: [ 0, 100 ]
			}
		}
	},
	'triglycerides': {
		trace: {
			line: {
				shape: 'spline',
				color: 'purple'
			}
		},
		layout: {
			yaxis: {
				range: [ 0, 400 ]
			}
		}
	}
}

function generate() {
	const plots = document.getElementById('plots');
	plots.innerHTML = '';

	const biodata = generateBiodata();

	const traces = biodata.dataset.map(
		data => trace(data.type, data.data.map(
			({ date, value }) => ({ x: date, y: value })
		))
	);

	traces.forEach(trace => {
		const element = document.createElement('div');
		element.style.display = 'inline-block';
		element.style.width = '400px';
		element.style.height = '300px';
		plots.appendChild(element);

		const layout = Object.assign({
			title: trace.name
		}, config.default.layout, (config[trace.name] || {}).layout || {});

		Plotly.newPlot(element, [ trace ], layout);
	});

	document.getElementById('data').innerText = JSON.stringify(biodata, null, '   ');

	document.getElementById('heading').innerHTML = biodata._gender + ', score: ' + biodata._healthscore + ', trajectory: <span style="color: ' + (trajectoryColors[biodata._trajectory] || '') + ';">' + biodata._trajectory + '</span>';
}

const trajectoryColors = {
	increase: 'red',
	decrease: 'green'
};

function trace(name, data) {
	return Object.assign({
		x: data.map(d => d.x),
		y: data.map(d => d.y),
		name,
		type: 'scatter',
		line: {
			shape: 'spline'
		},
	}, (config[name] || {}).trace || {});
}

generate();

window.generate = generate;
