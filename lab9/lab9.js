let dataRequest = new XMLHttpRequest();
let clientData;
let numResults;

const searchBy = 'Results using: ';

const searchHeadings = '<th>Client ID</th>'
					+ '<th>First Name</th>'
					+ '<th>Last Name</th>'
					+ '<th>Address</th>'
					+ '<th>Postal Code</th>'
					+ '<th>Phone Number</th>'
					+ '<th>Type</th>';

// Main function called once the page is loaded, sets listeners and reads JSON
function setEventListeners() {
	document.getElementById('name').addEventListener('input', function() {searchName(this.value);});
	document.getElementById('id').addEventListener('input', function() {searchID(this.value);});
	document.getElementById('phone').addEventListener('input', function() {searchPhone(this.value);});
	
    dataRequest.onreadystatechange = function() {
        if (dataRequest.readyState == 4 && dataRequest.status == 200) {
        clientData = JSON.parse(dataRequest.responseText);
        }
    };
    dataRequest.open('GET', 'ClientData.json', true);
    dataRequest.send();
}

// Searches JSON for client name and prints to window (shows all relevant results)
function searchName(name) {
	clearSearch();
	if (name) {
		name = name.toLowerCase();
		numResults = 0;
		let client;
		let results = '';
		for (let i = 0; i < clientData.length; i++) {
			client = clientData[i];
			if (client.lastName.toLowerCase().startsWith(name)) {
				results += '<tr>' + getClientString(client) + '</tr>';
				numResults++;
			}			
		}
		if (numResults) {
			document.getElementById('searchCriteria').textContent = searchBy + 'Name';
			document.getElementById('numResults').textContent = `Showing ${numResults} ${numResults > 1 ? 'matches': 'match'}`;
			document.getElementById('searchHeadings').innerHTML = searchHeadings;
    		document.getElementById('searchResults').innerHTML += results;
		} else {
			document.getElementById('numResults').textContent = 'No results found';
		}
		
	}
}	

// Searches JSON for Client ID and prints to window (shows exact match only)
function searchID(id) {
	clearSearch();
	if (id) {
		numResults = 0;
		let client;
		let results = '';
		for (let i = 0; i < clientData.length; i++) {
			client = clientData[i];
			if (client.id == id) {
				results += '<tr>' + getClientString(client) + '</tr>';
				numResults++;
			}
		}
    	if (numResults) {
			document.getElementById('searchCriteria').textContent = searchBy + 'Client ID';
			document.getElementById('numResults').textContent = `Showing ${numResults} ${numResults > 1 ? 'matches': 'match'}`;
			document.getElementById('searchHeadings').innerHTML = searchHeadings;
    		document.getElementById('searchResults').innerHTML += results;
		} else {
			document.getElementById('numResults').textContent = 'No results found';
		}
	}
}

// Searches JSON for client phone and prints to window (shows all relevant results)
function searchPhone(phone) {
	clearSearch();
	if (phone) {
		numResults = 0;
		let client;
		let results = '';
		for (let i = 0; i < clientData.length; i++) {
			client = clientData[i];
			if (client.phone.replaceAll('-', '').includes(phone.replaceAll('-', ''))) {
				results += '<tr>' + getClientString(client) + '</tr>';
				numResults++;
			}			
		}
    	if (numResults) {
			document.getElementById('searchCriteria').textContent = searchBy + 'Name';
			document.getElementById('numResults').textContent = `Showing ${numResults} ${numResults > 1 ? 'matches': 'match'}`;
			document.getElementById('searchHeadings').innerHTML = searchHeadings;
    		document.getElementById('searchResults').innerHTML += results;
		} else {
			document.getElementById('numResults').textContent = 'No results found';
		}
	}
}

// Clears the window of search results and table headings
function clearSearch() {
	document.getElementById('searchCriteria').textContent = '';
	document.getElementById('numResults').textContent = '';
	document.getElementById('searchHeadings').innerHTML = '';
	document.getElementById('searchResults').innerHTML = '';
}

// Converts the client object to an innerHTML string
function getClientString(client) {
	let clientString;
	clientString = '<td>';
	clientString += client.id;
	clientString += '</td><td>';
	clientString += client.firstName;
	clientString += '</td><td>';
	clientString += client.lastName;
	clientString += '</td><td>';
	clientString += client.address;
	clientString += '</td><td>';
	clientString += client.postalCode;
	clientString += '</td><td>';
	clientString += client.phone;
	clientString += '</td><td>';
	clientString += client.type;
	clientString += '</td>';
	return clientString;
}

setEventListeners();