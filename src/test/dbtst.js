var level = require('level'); 

var db = level("./tmp/data_0");

var blo;
db.get("1c55c9732326e1cce9b785b0a115158d1f67dbef51101468cd6bc132a7df84fb").then((bloc) => {
	console.log('bloc', bloc);
	blo = bloc;
});

console.log('blo', blo);


