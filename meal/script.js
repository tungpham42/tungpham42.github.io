const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const catList = document.getElementById("cat");
const mealList = document.getElementById("meal");
const latestMealList = document.getElementById("latest");
const areaList = document.getElementById("areas");
const ingredientList = document.getElementById("ingredients");
const catDetailsContent = document.getElementById("cat-details-content");
const mealDetailsContent = document.getElementById("meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

const APIUrl = 'https://www.themealdb.com/api/json/v2/9973533/';

searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchBtn.click();
    }
});
searchBtn.addEventListener("click", searchMeal);
mealList.addEventListener("click", getMealRecipe);
latestMealList.addEventListener("click", getMealRecipe);

function listAllCategories() {
    fetch(APIUrl + `categories.php`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.categories) {
                // console.log(data.meals);
                data.categories.forEach(cat => {
                    let catDesc = cat.strCategoryDescription.replace("'", "&#39;");
                    html += `
                    <div class="col-md-3 mb-3">
                        <div class="card" data-id="${cat.idCategory}">
                            <img src="${cat.strCategoryThumb}"
                                class="card-img-top" alt="${cat.strCategory}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${cat.strCategory}</h5>
                                <button onclick='catModal(\`${cat.strCategory}\`, \`${catDesc}\`);' class="btn btn-secondary btn-sm mb-3 w-100"><i class="fa-regular fa-circle-question"></i> Details</button>
                                <a href="javascript:void(0);" onclick="searchMealByCategory('${cat.strCategory}')" class="btn btn-success recipe-btn w-100"><i class="fa-solid fa-circle-info"></i> Get Recipes</a>
                            </div>
                        </div>
                    </div>
                    `;
                    catList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didn\'t find any category';
                catList.innerHTML = html;
            }
        });
}

function listAllAreas() {
    fetch(APIUrl + `list.php?a=list`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                // console.log(data.meals);
                data.meals.forEach(area => {
                    html += `
                    <button onclick="filterMealByArea(\`${area.strArea}\`);" class="btn btn-sm btn-secondary mb-2">${area.strArea}</button>
                    `;
                    areaList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didn\'t find any area';
                areaList.innerHTML = html;
            }
        });
}

function listAllIngredients() {
    fetch(APIUrl + `list.php?i=list`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                // console.log(data.meals);
                data.meals.forEach(ingredient => {
                    html += `
                    <button onclick="filterMealByIngredient(\`${ingredient.strIngredient}\`);" class="btn btn-sm btn-secondary mb-2">${ingredient.strIngredient}</button>
                    `;
                    ingredientList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didn\'t find any ingredient';
                ingredientList.innerHTML = html;
            }
        });
}

function filterMealByArea(area) {
    fetch(APIUrl + `filter.php?a=${area}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                // console.log(data.meals);
                data.meals.forEach(meal => {
                    html += `
                    <div class="col-md-3 mb-3">
                        <div class="card" data-id="${meal.idMeal}">
                            <img src="${meal.strMealThumb}"
                                class="card-img-top" alt="${meal.strMeal}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <a href="javascript:void(0);" class="btn btn-success recipe-btn w-100"><i class="fa-solid fa-circle-info"></i> Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
                    mealList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didn\'t find any meal. Show <a href="javascript:void(0);" style="width: fit-content;" onclick="showRandomMeals();">random meals</a>!';
                mealList.innerHTML = html;
            }
            document.getElementById('meal').scrollIntoView();
        });
}

function filterMealByIngredient(ingredient) {
    fetch(APIUrl + `filter.php?i=${ingredient}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                // console.log(data.meals);
                data.meals.forEach(meal => {
                    html += `
                    <div class="col-md-3 mb-3">
                        <div class="card" data-id="${meal.idMeal}">
                            <img src="${meal.strMealThumb}"
                                class="card-img-top" alt="${meal.strMeal}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <a href="javascript:void(0);" class="btn btn-success recipe-btn w-100"><i class="fa-solid fa-circle-info"></i> Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
                    mealList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didn\'t find any meal. Show <a href="javascript:void(0);" style="width: fit-content;" onclick="showRandomMeals();">random meals</a>!';
                mealList.innerHTML = html;
            }
            document.getElementById('meal').scrollIntoView();
        });
}

function showLatestMeals() {
    fetch(APIUrl + `latest.php`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                // console.log(data.meals);
                data.meals.forEach(meal => {
                    html += `
                    <div class="col-md-3 mb-3">
                        <div class="card" data-id="${meal.idMeal}">
                            <img src="${meal.strMealThumb}"
                                class="card-img-top" alt="${meal.strMeal}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <a href="javascript:void(0);" class="btn btn-success recipe-btn w-100"><i class="fa-solid fa-circle-info"></i> Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
                    latestMealList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didn\'t find any meal. Show <a href="javascript:void(0);" style="width: fit-content;" onclick="showRandomMeals();">random meals</a>!';
                latestMealList.innerHTML = html;
            }
        });
}

function showRandomMeals() {
    fetch(APIUrl + `randomselection.php`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                // console.log(data.meals);
                data.meals.forEach(meal => {
                    html += `
                    <div class="col-md-3 mb-3">
                        <div class="card" data-id="${meal.idMeal}">
                            <img src="${meal.strMealThumb}"
                                class="card-img-top" alt="${meal.strMeal}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <a href="javascript:void(0);" class="btn btn-success recipe-btn w-100"><i class="fa-solid fa-circle-info"></i> Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
                    mealList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didn\'t find any meal. Show <a href="javascript:void(0);" style="width: fit-content;" onclick="showRandomMeals();">random meals</a>!';
                mealList.innerHTML = html;
            }
        });
}
function searchMeal() {
    const searchInputText = searchInput.value.trim();
    if (searchInputText != '') {
        fetch(APIUrl + `search.php?s=${searchInputText}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                // console.log(data.meals);
                data.meals.forEach(meal => {
                    html += `
                    <div class="col-md-3 mb-3">
                        <div class="card" data-id="${meal.idMeal}">
                            <img src="${meal.strMealThumb}"
                                class="card-img-top" alt="${meal.strMeal}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <a href="javascript:void(0);" class="btn btn-success recipe-btn w-100"><i class="fa-solid fa-circle-info"></i> Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
                    mealList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didn\'t find any meal. Show <a href="javascript:void(0);" style="width: fit-content;" onclick="showRandomMeals();">random meals</a>!';
                mealList.innerHTML = html;
            }
            document.getElementById('meal').scrollIntoView();
        });
    } else {
        mealList.innerHTML = 'Please insert a keyword, or show <a href="javascript:void(0);" style="width: fit-content;" onclick="showRandomMeals();">random meals</a>!';
    }
}
function searchMealByFirstLetter(letter) {
    fetch(APIUrl + `search.php?f=${letter}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                // console.log(data.meals);
                data.meals.forEach(meal => {
                    html += `
                    <div class="col-md-3 mb-3">
                        <div class="card" data-id="${meal.idMeal}">
                            <img src="${meal.strMealThumb}"
                                class="card-img-top" alt="${meal.strMeal}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <a href="javascript:void(0);" class="btn btn-success recipe-btn w-100"><i class="fa-solid fa-circle-info"></i> Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
                    mealList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didn\'t find any meal. Show <a href="javascript:void(0);" style="width: fit-content;" onclick="showRandomMeals();">random meals</a>!';
                mealList.innerHTML = html;
            }
            document.getElementById('meal').scrollIntoView();
        });
}
function searchMealByCategory(cat) {
    fetch(APIUrl + `filter.php?c=${cat}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                // console.log(data.meals);
                data.meals.forEach(meal => {
                    html += `
                    <div class="col-md-3 mb-3">
                        <div class="card" data-id="${meal.idMeal}">
                            <img src="${meal.strMealThumb}"
                                class="card-img-top" alt="${meal.strMeal}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <a href="javascript:void(0);" class="btn btn-success recipe-btn w-100"><i class="fa-solid fa-circle-info"></i> Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
                    mealList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didn\'t find any meal. Show <a href="javascript:void(0);" style="width: fit-content;" onclick="showRandomMeals();">random meals</a>!';
                mealList.innerHTML = html;
            }
            document.getElementById('meal').scrollIntoView();
        });
}

function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(APIUrl + `lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals[0]));
        // .then(data => console.log(data.meals));
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
function mealRecipeModal(meal) {
    const videoId = getYoutubeId(meal.strYoutube);
    const iframeMarkup = '<iframe width="560" height="315" src="//www.youtube.com/embed/' 
    + videoId + '" frameborder="0" allowfullscreen></iframe>';
    let html = "";
    html += `
        <div class="modal-header">
            <h5 class="modal-title">${meal.strMeal} - ${meal.strArea} - ${meal.strCategory}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p class="text-center">
                <div class="video-container">${iframeMarkup}</div>
            </p>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    const mealModal = new bootstrap.Modal(document.getElementById("mealModal"));
    mealModal.show();
}
showLatestMeals();
showRandomMeals();
listAllIngredients();
listAllAreas();
listAllCategories();