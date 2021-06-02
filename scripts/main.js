// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp

function getCurrPage() {
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		if (tabcontent[i].style.display != "none") {
			if (i==0) {
				return  "Client"
			} else if (i==1) {
				return "Products"
			} else {
				return "Cart"
			}
		}
	}
}

function nextPage() {
	currPage = getCurrPage();
	tabcontent = document.getElementsByClassName("tabcontent");
	document.getElementById("next").disabled = false;
	document.getElementById("prev").disabled = false;
	document.getElementById("error").style.visibility="hidden";
	document.getElementById("success").style.visibility="hidden";

	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	if (currPage == "Client") {
		lactoseIntolerant = document.getElementById("LactoseIntolerant");
		nutAllergy = document.getElementById("NutAllergy");
		organic = document.getElementById("Organic");
		noPreference = document.getElementById("NoPreference");
		if (!lactoseIntolerant.checked && !nutAllergy.checked && !organic.checked && !noPreference.checked) {
			document.getElementById("error").style.visibility="visible";
			tabcontent[0].style.display = "block";
			document.getElementById("prev").disabled = true;
		} else {
			tabcontent[0].style.display = "none";
			tabcontent[1].style.display = "block";
		}
	} else if (currPage == "Products") {
		tabcontent[1].style.display = "none";
		tabcontent[2].style.display = "block";
		document.getElementById("next").disabled = true;
	} 
}

function prevPage() {
	currPage = getCurrPage();
	tabcontent = document.getElementsByClassName("tabcontent");
	document.getElementById("next").disabled = false;
	document.getElementById("prev").disabled = false;
	document.getElementById("error").style.visibility="hidden";
	document.getElementById("success").style.visibility="hidden";

	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	if (currPage == "Products") {
		tabcontent[1].style.display = "none";
		tabcontent[0].style.display = "block";
		document.getElementById("prev").disabled = true;
	} else if (currPage == "Cart") {
		tabcontent[2].style.display = "none";
		tabcontent[1].style.display = "block";
	}
}

function openPage() {
	page = document.getElementById("Client");
	page.style.display = "block";
	document.getElementById("error").style.visibility="hidden";
	document.getElementById("success").style.visibility="hidden";
	document.getElementById("prev").disabled = true;
}


	
// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos

function populateListProductChoices(slct1, slct2) {
    var s1 = document.getElementById(slct1);
    var s2 = document.getElementById(slct2);
	
	// s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
    s2.innerHTML = "";
		
	// obtain a reduced list of products based on restrictions
    var optionArray = restrictListProducts(products, s1.value);

	// for each item in the array, create a checkbox element, each containing information such as:
	// <input type="checkbox" name="product" value="Bread">
	// <label for="Bread">Bread/label><br>
		
	for (i = 0; i < optionArray.length; i++) {

		var div = document.createElement("div");

			
		var productName = optionArray[i].name;
		// create the checkbox and add in HTML DOM
		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.name = "product";
		checkbox.value = productName;
		div.appendChild(checkbox);
		
		// create a label for the checkbox, and also add in HTML DOM
		var label = document.createElement('label')
		label.htmlFor = productName;
		label.appendChild(document.createTextNode(productName));
		div.appendChild(label);
		div.appendChild(document.createElement("br")); 

		// create image
		var img = document.createElement("img");
		img.className = "images";
		img.src = optionArray[i].image;
		div.appendChild(img);
		
		div.style.textAlign = "center"
		div.style.border = "1px solid #b0b4a0"
		div.style.width = "400px"
		div.style.borderRadius = "10%"


		// create a breakline node and add in HTML DOM
		s2.appendChild(div)
		s2.appendChild(document.createElement("br")); 
		
	}
}

function setUnchecked1() {
	lactoseIntolerant = document.getElementById("LactoseIntolerant");
	nutAllergy = document.getElementById("NutAllergy");
	organic = document.getElementById("Organic");
	noPreference = document.getElementById("NoPreference");
	noPreference.checked=false;
	if (!lactoseIntolerant.checked && !nutAllergy.checked && !organic.checked) {
		noPreference.checked=true;
	}
}

function setUnchecked2() {
	lactoseIntolerant = document.getElementById("LactoseIntolerant");
	nutAllergy = document.getElementById("NutAllergy");
	organic = document.getElementById("Organic");
	noPreference = document.getElementById("NoPreference");
	lactoseIntolerant.checked=false;
	nutAllergy.checked=false;
	organic.checked=false;
	if (!noPreference.checked) {
		noPreference.checked=true;
	}
}

	
// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph) 
// We build a paragraph to contain the list of selected items, and the total price

function selectedItems(){

	document.getElementById("success").style.visibility="visible";
	
	var ele = document.getElementsByName("product");
	var chosenProducts = [];
	
	var c = document.getElementById('displayCart');
	c.innerHTML = "";
	
	// build list of selected item
	var para = document.createElement("P");
	para.innerHTML = "You selected:";
	para.appendChild(document.createElement("br"));
	for (i = 0; i < ele.length; i++) { 
		if (ele[i].checked) {
			para.appendChild(document.createTextNode(ele[i].value));
			para.appendChild(document.createElement("br"));
			chosenProducts.push(ele[i].value);
		}
	}
		
	// add paragraph and total price
	c.appendChild(para);
	c.appendChild(document.createTextNode("Total Price is " + getTotalPrice(chosenProducts)));
		
}