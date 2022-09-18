const searchBtn = document.querySelector("#search-btn");
const catList = document.querySelector("#cat");
const mealList = document.querySelector("#meal");
const areaList = document.querySelector("#areas");
const catDetailsContent = document.querySelector("#cat-details-content");
const mealDetailsContent = document.querySelector("#meal-details-content");
const recipeCloseBtn = document.querySelector("#recipe-close-btn");

searchBtn.addEventListener("click", searchMeal);
mealList.addEventListener("click", getMealRecipe);

function listAllCategories() {
    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.categories) {
                // console.log(data.meals);
                data.categories.forEach(cat => {
                    let catDesc = cat.strCategoryDescription.replace('\"', '&quot;');
                    html += `
                    <div class="col-md-3 mb-3">
                        <div class="card" data-id="${cat.idCategory}">
                            <img src="${cat.strCategoryThumb}"
                                class="card-img-top" alt="${cat.strCategory}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${cat.strCategory}</h5>
                                <button onclick='catModal(\`${cat.strCategory}\`, \`${catDesc}\`);' class="btn btn-secondary btn-sm mb-3 w-100">Details</button>
                                <a href="javascript:void(0);" onclick="searchMealByCategory('${cat.strCategory}')" class="btn btn-success recipe-btn w-100">Get Recipes</a>
                            </div>
                        </div>
                    </div>
                    `;
                    catList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didnt find any category';
                catList.innerHTML = html;
            }
        });
}

function listAllAreas() {
    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                // console.log(data.meals);
                data.meals.forEach(area => {
                    html += `
                    <button onclick="filterMealByArea(\`${area.strArea}\`);" class="btn btn-sm btn-secondary mb-3">${area.strArea}</button>
                    `;
                    areaList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didnt find any area';
                areaList.innerHTML = html;
            }
        });
}

function filterMealByArea(area) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
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
                                <a href="javascript:void(0);" class="btn btn-success recipe-btn">Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
                    mealList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didnt find any meal';
                mealList.innerHTML = html;
            }
            document.getElementById('meal').scrollIntoView();
        });
}

function searchMeal() {
    const searchInputText = document.querySelector("#search-input").value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputText}`)
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
                                <a href="javascript:void(0);" class="btn btn-success recipe-btn">Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
                    mealList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didnt find any meal';
                mealList.innerHTML = html;
            }
            document.getElementById('meal').scrollIntoView();
        });
}
function searchMealByFirstLetter(letter) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
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
                                <a href="javascript:void(0);" class="btn btn-success recipe-btn">Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
                    mealList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didnt find any meal';
                mealList.innerHTML = html;
            }
            document.getElementById('meal').scrollIntoView();
        });
}
function searchMealByCategory(cat) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
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
                                <a href="javascript:void(0);" class="btn btn-success recipe-btn">Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
                    mealList.innerHTML = html;
                })
            } else {
                html = 'Sorry, we didnt find any meal';
                mealList.innerHTML = html;
            }
            document.getElementById('meal').scrollIntoView();
        });
}

function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
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
    const catModal = new bootstrap.Modal(document.querySelector("#catModal"));
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
            <p class="text-center">${iframeMarkup}</p>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    const mealModal = new bootstrap.Modal(document.querySelector("#mealModal"));
    mealModal.show();
}