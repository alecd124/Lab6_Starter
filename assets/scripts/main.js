// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
	// A9. TODO - Complete the functionality as described in this function
	let recipeJSON = localStorage.getItem('recipes')

	if (!recipeJSON) {
		return [];
	}

	let recipes = JSON.parse(recipeJSON);
	return recipes
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
	// A10. TODO - Get a reference to the <main> element
	let main = document.querySelector('main')
	// A11. TODO - Loop through each of the recipes in the passed in array,
	
	for (let i = 0; i < recipes.length; i++) {
	let recipe = recipes[i]
	let card = document.createElement('recipe-card')
	card.data = recipe;
	main.appendChild(card);
	}
	//            create a <recipe-card> element for each one, and populate
	//            each <recipe-card> with that recipe data using element.data = ...
	//            Append each element to <main>
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
	// EXPLORE - START (All explore numbers start with B)
	// B1. TODO - Complete the functionality as described in this function
	//            header. It is possible in only a single line, but should
	//            be no more than a few lines.
	localStorage.setItem('recipes',JSON.stringify(recipes));
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
	let form = document.getElementById('new-recipe');
	form.addEventListener('submit', (e) => {
		e.preventDefault(); // stops browser from reloading, handling w js 

	let formData = new FormData(form);

	const recipeObject = {};
	formData.forEach((value, key) => { // goes through every input and puts each one into recipe obj
		recipeObject[key] = value;
	});

	recipeObject.rating = Number(recipeObject.rating);
	recipeObject.numRatings = Number(recipeObject.numRatings);

	let newCard = document.createElement('recipe-card');
	newCard.data = recipeObject;

	document.querySelector('main').appendChild(newCard);

	let recipes = getRecipesFromStorage();
	recipes.push(recipeObject);
	saveRecipesToStorage(recipes);

	});
	let clearLocStorageButton = document.querySelector('button.danger')

	clearLocStorageButton.addEventListener('click', ()=> { // reacts to button click 
		localStorage.clear(); // clear loc storage 
		document.querySelector('main').innerHTML = ''; // wipes recipe off screen
	});
}
