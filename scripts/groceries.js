// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

var products = [
	{
		name: "Yogurt (12x100g) - $4.99",
		lactoseIntolerant: false,
		nutAllergy: true,
        organic: false,
		price: 4.99,
		image: "images/yogurt.jpg"
	},
	{
		name: "Almonds (450g) - $7.00",
		lactoseIntolerant: true,
		nutAllergy: false,
        organic: true,
		price: 7.00,
		image: "images/almonds.jpg"
	},
	{
		name: "Salmon (1.25kg) - $10.00",
		lactoseIntolerant: true,
		nutAllergy: true,
        organic: false,
		price: 10.00,
		image: "images/salmon.jpg"
	},
    {
		name: "Milk (4x1L) - $4.00",
		lactoseIntolerant: false,
		nutAllergy: true,
        organic: false,
		price: 4.00,
		image: "images/milk.jpg"
	},
    {
		name: "Kale (340g) - $6.50",
		lactoseIntolerant: true,
		nutAllergy: true,
        organic: true,
		price: 6.50,
		image: "images/kale.jpg"
	},
    {
		name: "Chips (215g) - $2.50",
		lactoseIntolerant: true,
		nutAllergy: true,
        organic: false,
		price: 2.50,
		image: "images/chips.jpg"
	},
    {
		name: "Walnuts (300g) - $1.25",
		lactoseIntolerant: true,
		nutAllergy: false,
        organic: true,
		price: 1.25,
		image: "images/walnuts.jpg"
	},
    {
		name: "Rice (1.81kg) - $6.25",
		lactoseIntolerant: true,
		nutAllergy: true,
        organic: false,
		price: 6.25,
		image: "images/rice.jpg"
	},
    {
		name: "Grapes (700g) - $3.75",
		lactoseIntolerant: true,
		nutAllergy: true,
        organic: true,
		price: 3.75,
		image: "images/grapes.jpg"
	},
    {
		name: "Beef (600g) - $12.00",
		lactoseIntolerant: true,
		nutAllergy: true,
        organic: false,
		price: 12.00,
		image: "images/beef.jpg"
	}
];


	
// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, restriction) {
	let product_names = [];
	lactoseChecked = document.getElementById('LactoseIntolerant').checked;
	nutChecked = document.getElementById('NutAllergy').checked;
	organicChecked = document.getElementById('Organic').checked;

	for (let i=0; i<prods.length; i+=1) {
		let itemAdd = true;
		
		if ((prods[i].lactoseIntolerant == false) && (lactoseChecked)) {
			itemAdd = false;
		}
		if ((prods[i].nutAllergy == false) && (nutChecked)) {
			itemAdd = false;
		}
		if ((prods[i].organic == false) && (organicChecked)) {
			itemAdd = false;
		}

		if (itemAdd) {
			product_names.push({name: prods[i].name, price: prods[i].price, image: prods[i].image});
		}
	}
	product_names.sort(
		function(a,b){
			return a.price - b.price;
		}
	);
	return product_names;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
	totalPrice = 0;
	for (let i=0; i<products.length; i+=1) {
		if (chosenProducts.indexOf(products[i].name) > -1){
			totalPrice += products[i].price;
		}
	}
	return totalPrice;
}