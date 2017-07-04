const request =require('superagent');
const fs = require('fs');
const data = require('./store_directory.json');
let promises = [];
let success=0;
let failures =0;
foundGeometry = function(results){
	if(!results){
		return null;
	}
	for(var i=0;i<results.length;i++){
		if(results[i].geometry){
			return results[i].geometry;
		}
	}
	return null;
}
cleanString=function(input) {
    var output = "";
    for (var i=0; i<input.length; i++) {
        if (input.charCodeAt(i) <= 127) {
            output += input.charAt(i);
        }
    }
    return output;
}
let aggresive= false;

if(process.argv.length==3 &&  process.argv[2]=="aggressive") {
	aggresive = true;
}


for (let i = 0; i <data.length; i++) {
	let element = data[i];
	promises.push(
		new Promise(function(resolve){
			if(element.Lat) {
				success++;
				return resolve(element)
			}
			if(!element.Address){
				console.log("Without address");
				return resolve({
					Name:element.Name,
	   			Address: element.Address
				})
			}
			let address = element.Address.toLowerCase();
			address = address.replace(/á/gi,"a");
			address = address.replace(/é/gi,"e");
			address = address.replace(/í/gi,"i");
			address = address.replace(/ó/gi,"o");
			address = address.replace(/ú/gi,"u");
			address = address.replace(/ñ/gi,"n");
			address = address.replace(/°/gi,"o");
			address = address.replace(/\./gi," ");

			address = address.replace(/ +(?= )/g,'');
			var cp = address.indexOf("c.p");
			if(cp>0){
				address= address.substring(0,cp);
			}
			cp = address.indexOf(" cp.");
			if(cp>0){
				address= address.substring(0,cp);
			}
			cp = address.indexOf(" c p ");
			if(cp>0){
				address= address.substring(0,cp);
			}
			var entre = address.indexOf("entre las");
			if(entre>0){
				address= address.substring(0,entre);
			}
			entre = address.indexOf(" entre ");
			if(entre>0){
				address= address.substring(0,entre);
			}
			var esquina = address.indexOf("esquina");
			if(esquina>0){
				address= address.substring(0,esquina);
			}
			esquina = address.indexOf("esq");
			if(esquina>0){
				address= address.substring(0,esquina);
			}
			var col = address.indexOf("col.");
			if(col>0){
				address= address.substring(0,col);
			}
			col = address.indexOf(" col ");
			if(col>0){
				address= address.substring(0,col);
			}
			col = address.indexOf(" colonia ");
			if(col>0){
				address= address.substring(0,col);
			}
			if(aggresive){
				let comma = address.indexOf(",");
				if(comma>0){
					address= address.substring(0,comma);
				}
			}
			address = cleanString(address);
			//console.log('https://maps.googleapis.com/maps/api/geocode/json?address='+address);

			//resolve('https://maps.googleapis.com/maps/api/geocode/json?address='+address)
			setTimeout(function(){
				request
			   .get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBIlP3HX9LaZHImyvExIpG94jkaydx2dk8&address='+address)
			   .then(function(response){
			   	var result = response.body;
			   	let geometry = foundGeometry(result.results);
			   	if(!response.ok  || result.status =='ZERO_RESULTS' || geometry == null){
			   		console.log("Error with 1 "+element.Name,response);
			   		failures++;
			   		 resolve({
			   			Name:element.Name,
			   			Address: element.Address
			   		})
			   		return;
			   	}
			   	success++;

			   	resolve({
			   		Name:element.Name,
			   		Address: element.Address,
			   		Lat: geometry.location.lat,
			   		Lng: geometry.location.lng
			   	})
			   },function(err){
			   	console.log("Error with 2 "+element.Name,err);
			   	failures++;
			   	resolve({
			   			Name:element.Name,
			   			Address: element.Address
			   	})
			   })
		   },300);
		})
	);
}

function syncPromises(array) {
    let index = 0;
    let results = [];
    return new Promise(function(resolve){
	    let next =function(result) {
	    	console.log("Next... "+success+" "+failures);
	    		if(result){
	    			results.push(result);
	    		}
	        if (index < array.length) {
	        	//Avoid limit per second google maps
	        	array[index++].then(next);
	        	
	        }else{
	        	resolve(results);
	        }
	    }
	    next();
    });

}

syncPromises(promises)
.then(function(results) {
	console.log("Success "+success+ " Failures "+failures)
	fs.writeFile('store_directory_with_location.json', 
		//results.join("\n"), 
		JSON.stringify(results),
		(err) => {
	});
});