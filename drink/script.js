const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const catList = document.getElementById("cat");
const drinkList = document.getElementById("drink");
const latestDrinkList = document.getElementById("latest");
const popularDrinkList = document.getElementById("popular");
const alcoholicList = document.getElementById("alcoholic");
const glassList = document.getElementById("glass");
const ingredientList = document.getElementById("ingredients");
const catDetailsContent = document.getElementById("cat-details-content");
const drinkDetailsContent = document.getElementById("drink-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

const APIUrl = 'https://www.thecocktaildb.com/api/json/v2/9973533/';

searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchBtn.click();
    }
});
searchBtn.addEventListener("click", searchDrink);
drinkList.addEventListener("click", getDrinkRecipe);
latestDrinkList.addEventListener("click", getDrinkRecipe);
popularDrinkList.addEventListener("click", getDrinkRecipe);

function highlightKeyword(keyword) {
    let lowerCaseKeyword = keyword.toLowerCase();
    let drinkTitles = document.querySelectorAll("#drink h5.card-title");
    [].forEach.call(drinkTitles, function(drinkTitle) {
        let innerHTML = drinkTitle.innerHTML;
        let lowerCaseInnerHTML = innerHTML.toLowerCase();
        let index = lowerCaseInnerHTML.indexOf(lowerCaseKeyword);
        if (index >= 0) { 
            innerHTML = innerHTML.substring(0, index) + "<span class='highlight'>" + innerHTML.substring(index, index + keyword.length) + "</span>" + innerHTML.substring(index + keyword.length);
            drinkTitle.innerHTML = innerHTML;
        }
    });
}
function listAllCategories() {
    fetch(APIUrl + `list.php?c=list`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.drinks) {
                // console.log(data.drinks);
                data.drinks.forEach(cat => {
                    html += `
                    <button onclick="filterDrinkByCategory(\`${cat.strCategory}\`);" class="btn btn-sm btn-secondary mb-2">${cat.strCategory}</button>
                    `;
                    catList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didn\'t find any category';
                catList.innerHTML = html;
            }
        });
}

function listAllAlcoholic() {
    fetch(APIUrl + `list.php?a=list`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.drinks) {
                // console.log(data.drinks);
                data.drinks.forEach(drink => {
                    html += `
                    <button onclick="filterDrinkByAlcoholic(\`${drink.strAlcoholic}\`);" class="btn btn-sm btn-secondary mb-2">${drink.strAlcoholic}</button>
                    `;
                    alcoholicList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didn\'t find any alcoholic';
                alcoholicList.innerHTML = html;
            }
        });
}

function listAllIngredients() {
    fetch(APIUrl + `list.php?i=list`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.drinks) {
                // console.log(data.drinks);
                data.drinks.forEach(ingredient => {
                    html += `
                    <button onclick="filterDrinkByIngredient(\`${ingredient.strIngredient1}\`);" class="btn btn-sm btn-secondary mb-2">${ingredient.strIngredient1}</button>
                    `;
                    ingredientList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didn\'t find any ingredient';
                ingredientList.innerHTML = html;
            }
        });
}

function listAllGlasses() {
    fetch(APIUrl + `list.php?g=list`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.drinks) {
                // console.log(data.drinks);
                data.drinks.forEach(drink => {
                    html += `
                    <button onclick="filterDrinkByGlass(\`${drink.strGlass}\`);" class="btn btn-sm btn-secondary mb-2">${drink.strGlass}</button>
                    `;
                    glassList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didn\'t find any glass';
                glassList.innerHTML = html;
            }
        });
}

function filterDrinkByCategory(cat) {
    fetch(APIUrl + `filter.php?c=${cat}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.drinks) {
                // console.log(data.drinks);
                data.drinks.forEach(drink => {
                    html += `
                    <div class="col-xxl-3 col-xl-4 col-md-6 col-sm-12 mb-3">
                        <div class="card" data-id="${drink.idDrink}">
                            <img src="${drink.strDrinkThumb}"
                                class="card-img-top" alt="${drink.strDrink}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${drink.strDrink}</h5>
                                <a href="javascript:void(0);" class="btn btn-success btn-lg recipe-btn w-100"><i class="fa-solid fa-wine-glass"></i> Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
                    drinkList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didn\'t find any drink. Show <a href="javascript:void(0);" style="width: fit-content;padding-left: 5px;padding-right: 0;" onclick="showRandomDrinks();">random drinks</a>!';
                drinkList.innerHTML = html;
            }
            document.getElementById('drink').scrollIntoView();
        });
}

function filterDrinkByAlcoholic(alcoholic) {
    fetch(APIUrl + `filter.php?a=${alcoholic}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.drinks) {
                // console.log(data.drinks);
                data.drinks.forEach(drink => {
                    html += `
                    <div class="col-xxl-3 col-xl-4 col-md-6 col-sm-12 mb-3">
                        <div class="card" data-id="${drink.idDrink}">
                            <img src="${drink.strDrinkThumb}"
                                class="card-img-top" alt="${drink.strDrink}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${drink.strDrink}</h5>
                                <a href="javascript:void(0);" class="btn btn-success btn-lg recipe-btn w-100"><i class="fa-solid fa-wine-glass"></i> Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
                    drinkList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didn\'t find any drink. Show <a href="javascript:void(0);" style="width: fit-content;padding-left: 5px;padding-right: 0;" onclick="showRandomDrinks();">random drinks</a>!';
                drinkList.innerHTML = html;
            }
            document.getElementById('drink').scrollIntoView();
        });
}

function filterDrinkByIngredient(ingredient) {
    fetch(APIUrl + `filter.php?i=${ingredient}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.drinks) {
                // console.log(data.drinks);
                data.drinks.forEach(drink => {
                    html += `
                    <div class="col-xxl-3 col-xl-4 col-md-6 col-sm-12 mb-3">
                        <div class="card" data-id="${drink.idDrink}">
                            <img src="${drink.strDrinkThumb}"
                                class="card-img-top" alt="${drink.strDrink}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${drink.strDrink}</h5>
                                <a href="javascript:void(0);" class="btn btn-success btn-lg recipe-btn w-100"><i class="fa-solid fa-wine-glass"></i> Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
                    drinkList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didn\'t find any drink. Show <a href="javascript:void(0);" style="width: fit-content;padding-left: 5px;padding-right: 0;" onclick="showRandomDrinks();">random drinks</a>!';
                drinkList.innerHTML = html;
            }
            document.getElementById('drink').scrollIntoView();
        });
}

function filterDrinkBygGlass(glass) {
    fetch(APIUrl + `filter.php?g=${glass}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.drinks) {
                // console.log(data.drinks);
                data.drinks.forEach(drink => {
                    html += `
                    <div class="col-xxl-3 col-xl-4 col-md-6 col-sm-12 mb-3">
                        <div class="card" data-id="${drink.idDrink}">
                            <img src="${drink.strDrinkThumb}"
                                class="card-img-top" alt="${drink.strDrink}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${drink.strDrink}</h5>
                                <a href="javascript:void(0);" class="btn btn-success btn-lg recipe-btn w-100"><i class="fa-solid fa-wine-glass"></i> Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
                    drinkList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didn\'t find any drink. Show <a href="javascript:void(0);" style="width: fit-content;padding-left: 5px;padding-right: 0;" onclick="showRandomDrinks();">random drinks</a>!';
                drinkList.innerHTML = html;
            }
            document.getElementById('drink').scrollIntoView();
        });
}

function showLatestDrinks() {
    fetch(APIUrl + `latest.php`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.drinks) {
                // console.log(data.drinks);
                data.drinks.forEach(drink => {
                    html += `
                    <div class="col-xxl-3 col-xl-4 col-md-6 col-sm-12 mb-3">
                        <div class="card" data-id="${drink.idDrink}">
                            <img src="${drink.strDrinkThumb}"
                                class="card-img-top" alt="${drink.strDrink}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${drink.strDrink}</h5>
                                <a href="javascript:void(0);" class="btn btn-success btn-lg recipe-btn w-100"><i class="fa-solid fa-wine-glass"></i> Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
                    latestDrinkList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didn\'t find any drink. Show <a href="javascript:void(0);" style="width: fit-content;padding-left: 5px;padding-right: 0;" onclick="showRandomDrinks();">random drinks</a>!';
                latestDrinkList.innerHTML = html;
            }
        });
}

function showPopularDrinks() {
    fetch(APIUrl + `popular.php`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.drinks) {
                // console.log(data.drinks);
                data.drinks.forEach(drink => {
                    html += `
                    <div class="col-xxl-3 col-xl-4 col-md-6 col-sm-12 mb-3">
                        <div class="card" data-id="${drink.idDrink}">
                            <img src="${drink.strDrinkThumb}"
                                class="card-img-top" alt="${drink.strDrink}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${drink.strDrink}</h5>
                                <a href="javascript:void(0);" class="btn btn-success btn-lg recipe-btn w-100"><i class="fa-solid fa-wine-glass"></i> Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
                    popularDrinkList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didn\'t find any drink. Show <a href="javascript:void(0);" style="width: fit-content;padding-left: 5px;padding-right: 0;" onclick="showRandomDrinks();">random drinks</a>!';
                popularDrinkList.innerHTML = html;
            }
        });
}

function showRandomDrinks() {
    fetch(APIUrl + `randomselection.php`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.drinks) {
                // console.log(data.drinks);
                data.drinks.forEach(drink => {
                    html += `
                    <div class="col-xxl-3 col-xl-4 col-md-6 col-sm-12 mb-3">
                        <div class="card" data-id="${drink.idDrink}">
                            <img src="${drink.strDrinkThumb}"
                                class="card-img-top" alt="${drink.strDrink}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${drink.strDrink}</h5>
                                <a href="javascript:void(0);" class="btn btn-success btn-lg recipe-btn w-100"><i class="fa-solid fa-wine-glass"></i> Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
                    drinkList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didn\'t find any drink. Show <a href="javascript:void(0);" style="width: fit-content;padding-left: 5px;padding-right: 0;" onclick="showRandomDrinks();">random drinks</a>!';
                drinkList.innerHTML = html;
            }
        });
}
function searchDrink() {
    const searchInputText = searchInput.value.trim();
    if (searchInputText != '') {
        fetch(APIUrl + `search.php?s=${searchInputText}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.drinks) {
                // console.log(data.drinks);
                data.drinks.forEach(drink => {
                    html += `
                    <div class="col-xxl-3 col-xl-4 col-md-6 col-sm-12 mb-3">
                        <div class="card" data-id="${drink.idDrink}">
                            <img src="${drink.strDrinkThumb}"
                                class="card-img-top" alt="${drink.strDrink}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${drink.strDrink}</h5>
                                <a href="javascript:void(0);" class="btn btn-success btn-lg recipe-btn w-100"><i class="fa-solid fa-wine-glass"></i> Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
                    drinkList.innerHTML = html;
                    highlightKeyword(searchInputText);
                })
            } else {
                html = 'Sorry, we didn\'t find any drink. Show <a href="javascript:void(0);" style="width: fit-content;padding-left: 5px;padding-right: 0;" onclick="showRandomDrinks();">random drinks</a>!';
                drinkList.innerHTML = html;
            }
            document.getElementById('drink').scrollIntoView();
        });
    } else {
        drinkList.innerHTML = 'Please insert a keyword, or show <a href="javascript:void(0);" style="width: fit-content;padding-left: 5px;padding-right: 0;" onclick="showRandomDrinks();">random drinks</a>!';
    }
}
function searchDrinkByFirstLetter(letter) {
    fetch(APIUrl + `search.php?f=${letter}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.drinks) {
                // console.log(data.drinks);
                data.drinks.forEach(drink => {
                    html += `
                    <div class="col-xxl-3 col-xl-4 col-md-6 col-sm-12 mb-3">
                        <div class="card" data-id="${drink.idDrink}">
                            <img src="${drink.strDrinkThumb}"
                                class="card-img-top" alt="${drink.strDrink}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${drink.strDrink}</h5>
                                <a href="javascript:void(0);" class="btn btn-success btn-lg recipe-btn w-100"><i class="fa-solid fa-wine-glass"></i> Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
                    drinkList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didn\'t find any drink. Show <a href="javascript:void(0);" style="width: fit-content;padding-left: 5px;padding-right: 0;" onclick="showRandomDrinks();">random drinks</a>!';
                drinkList.innerHTML = html;
            }
            document.getElementById('drink').scrollIntoView();
        });
}
function searchDrinkByCategory(cat) {
    fetch(APIUrl + `filter.php?c=${cat}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.drinks) {
                // console.log(data.drinks);
                data.drinks.forEach(drink => {
                    html += `
                    <div class="col-xxl-3 col-xl-4 col-md-6 col-sm-12 mb-3">
                        <div class="card" data-id="${drink.idDrink}">
                            <img src="${drink.strDrinkThumb}"
                                class="card-img-top" alt="${drink.strDrink}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${drink.strDrink}</h5>
                                <a href="javascript:void(0);" class="btn btn-success btn-lg recipe-btn w-100"><i class="fa-solid fa-wine-glass"></i> Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
                    drinkList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didn\'t find any drink. Show <a href="javascript:void(0);" style="width: fit-content;padding-left: 5px;padding-right: 0;" onclick="showRandomDrinks();">random drinks</a>!';
                drinkList.innerHTML = html;
            }
            document.getElementById('drink').scrollIntoView();
        });
}

function getDrinkRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let drinkItem = e.target.parentElement.parentElement;
        fetch(APIUrl + `lookup.php?i=${drinkItem.dataset.id}`)
            .then(response => response.json())
            .then(data => drinkRecipeModal(data.drinks[0]));
        // .then(data => console.log(data.drinks));
    }
}

function getYoutubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
}

function catModal(cat, desc) {
    let html = "";
    html += `
        <div class="modal-header">
            <h5 class="modal-title">${cat}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p>${desc}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    `;
    catDetailsContent.innerHTML = html;
    const catModal = new bootstrap.Modal(document.getElementById("catModal"));
    catModal.show();
}
function drinkRecipeModal(drink) {
    let html = "";
    html += `
        <div class="modal-header">
            <h5 class="modal-title">${drink.strDrink} - ${drink.strAlcoholic} - ${drink.strCategory}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p>${drink.strInstructions}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    `;
    drinkDetailsContent.innerHTML = html;
    const drinkModal = new bootstrap.Modal(document.getElementById("drinkModal"));
    drinkModal.show();
}
showLatestDrinks();
showPopularDrinks();
showRandomDrinks();
listAllIngredients();
listAllGlasses();
// listAllAlcoholic();
listAllCategories();