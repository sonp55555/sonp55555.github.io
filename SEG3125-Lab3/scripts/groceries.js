	
// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

var products = [
	{
		name: "Broccoli",
		lactose: true,
		nut: true,
		price: 1.99
	},
	{
		name: "Brown Bread",
		lactose: true,
		nut: true,
		price: 2.35
	},
	{
		name: "Chocolate Chips",
		lactose: true,
		nut: true,
		price: 12.47
	},
	{
		name: "Pinapple Juice",
		lactose: true,
		nut: true,
		price: 13.97
	},
	{
		name: "Organic Raw Apple Cider Vinegar",
		lactose: true,
		nut: true,
		organic: true,
		price: 9.99
	},
	{
		name: "Organic Peanut Butter",
		lactose: true,
		nut: false,
		organic: true,
		price: 10.29
	},
	{
		name: "Organic Strawberry Yogurt",
		lactose: false,
		nut: true,
		organic: true,
		price: 3.99
	},
	{
		name: "Organic Crushed Tomatoes",
		lactose: true,
		nut: true,
		organic: true,
		price: 4.29
	},
	{
		name: "Whole Almonds",
		lactose: true,
		nut: false,
		price: 7.97
	},
	{
		name: "Peanut Butter",
		lactose: true,
		nut: false,
		price: 5.77
	},
	{
		name: "Fruit & Nut Trail Mix",
		lactose: true,
		nut: false,
		price: 8.97
	},
	{
		name: "Chocolate Milk",
		lactose: false,
		nut: true,
		price: 4.47
	},
	{
		name: "Plain Yogurt",
		lactose: false,
		nut: true,
		price: 1.97
	},
	{
		name: "Vanilla Ice Cream",
		lactose: false,
		nut: true,
		price: 6.77
	}
];
	


// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price


function restrictListProducts(prods, restriction) {
	let product_names = [];
	
	prods.sort(function(a,b){
		return a.price - b.price
		});
	
		for (let i=0; i<prods.length; i+=1) {
			if ((restriction == "Lactose-Intolerant Products") && (prods[i].lactose == true) && (prods[i].organic != true)){
				product_names.push({name:prods[i].name, price:prods[i].price});	
			}
			else if ((restriction == "Nut Free Products") && (prods[i].nut == true) && (prods[i].organic != true)){
				product_names.push({name:prods[i].name, price:prods[i].price});	
			}
			else if ((restriction == "Lactose-Intolerant & Nut Free Products") && (prods[i].lactose == true) && (prods[i].nut == true) && (prods[i].organic != true)){
				product_names.push({name:prods[i].name, price:prods[i].price});	
			}
			else if (restriction == "All Products"){
				product_names.push({name:prods[i].name, price:prods[i].price});	
			}
			else if (restriction == ""){
				product_names.push({name:prods[i].name, price:prods[i].price});	
			}
			else if ((restriction == "Only Organic Lactose-Intolerant Products") && (prods[i].lactose == true) && (prods[i].organic == true)){
				product_names.push({name:prods[i].name, price:prods[i].price});	
			}
			else if ((restriction == "Only Organic Nut Free Products") && (prods[i].nut == true) && (prods[i].organic == true)){
				product_names.push({name:prods[i].name, price:prods[i].price});	
			}
			else if ((restriction == "Only Organic Lactose-Intolerant & Nut Free Products") && (prods[i].lactose == true) && (prods[i].nut == true) && (prods[i].organic == true)){
				product_names.push({name:prods[i].name, price:prods[i].price});	
			}	
		}
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