let dataRequest = new XMLHttpRequest();
let clientData;

const searchBy = 'Results using: ';

const searchHeadings = '<tr><th>Client ID</th>'
    + '<th>First Name</th>'
    + '<th>Last Name</th>'
    + '<th>Address</th>'
    + '<th>Postal Code</th>'
    + '<th>First Name</th>'
    + '<th>Phone Number</th>'
    + '<th>Address</th>'
    + '<th>Type</th></tr>';

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

function searchName(name) {
	document.getElementById('searchCriteria').textContent = searchBy + 'Name';
    document.getElementById('searchResults').innerHTML = searchHeadings;
	let client;
    let results;
	for (let i = 0; i < clientData.length; i++) {
		client = clientData[i];
		if (client.lastName.startsWith(name)) {
            results += '<tr><td>';
            results += client.id;
            results += '</td><td>';
            results += client.firstName;
            results += '</td><td>';
            results += client.lastName;
            results += '</td><td>';
            results += client.address;
            results += '</td><td>';
            results += client.postalCode;
            results += '</td><td>';
            results += client.phone;
            results += '</td><td>';
            results += client.type;
            results += '</td></tr>';
		}			
	}
    document.getElementById('searchResults').innerHTML += results;


}
function searchIDNumber(idnumber) {

	//var r=JSON.parse(dataRequest.responseText);
	document.getElementById('searchvalue').innerHTML='Search by ID Number'+'<br>';
	//structure table
	var results='<tr><th>Full Name</th><th>Address</th><th>City </th><th>ID Number</th><th>Company</th></tr>';
	var searchid;
	for(var i=0; i<r.length; i++)
	{
		var client=r[i];
		searchid=client.idnumber;
		if(searchid.startsWith(idnumber))
		{

			results+='<tr><td>'
			results+=client.name;
			results+='</td><td>'
			results+=client.address
			results+='</td><td>'
			results+=client.city
			results+='</td><td>'
			results+=client.idnumber
			results+='</td><td>'
			results+=client.company
			results+='</td></tr>';
		}

	}
	document.getElementById('searchresults').innerHTML=results;


}

function searchCompanyName(company) {

	//var r=JSON.parse(dataRequest.responseText);
	document.getElementById('searchvalue').innerHTML='Search by Company name'+'<br>';
	//structure table
	var results='<tr><th>Full Name</th><th>Address</th><th>City </th><th>ID Number</th><th>Company</th></tr>';
	var searchcompany;
	for(var i=0; i<r.length; i++)
	{
		var client=r[i];
		searchcompany=client.company;
		if(searchcompany.startsWith(company))
		{

			results+='<tr><td>'
			results+=client.name;
			results+='</td><td>'
			results+=client.address
			results+='</td><td>'
			results+=client.city
			results+='</td><td>'
			results+=client.idnumber
			results+='</td><td>'
			results+=client.company
			results+='</td></tr>';
		}

	}
	document.getElementById('searchresults').innerHTML=results;


}

setEventListeners();
document.getElementById('searchResults').innerHTML = searchHeadings;