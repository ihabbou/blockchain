var level = require('level'); 

var db = level("./tmp/data_2");

console.log('Displaying the entire blockchain from node 2: ');
console.log('This may contain failed blocks');

db.createReadStream({ })
	.on('data', function(data) {
		if (JSON.parse(JSON.parse(JSON.stringify(data)).value).version === 0) {
			console.log(data);
			console.log();
		}
	});


