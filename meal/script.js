const searchBtn = document.querySelector("#search-btn");
const mealList = document.querySelector("#meal");
const mealDetailsContent = document.querySelector("#meal-details-content");
const recipeCloseBtn = document.querySelector("#recipe-close-btn");

searchBtn.addEventListener("click", searchMeal);
mealList.addEventListener("click", getMealRecipe);

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
                                class="card-img-top" alt="testing-image">
                            <div class="card-body text-center">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <a href="#" class="btn btn-success recipe-btn">Get Recipe</a>
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
                                class="card-img-top" alt="testing-image">
                            <div class="card-body text-center">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <a href="#" class="btn btn-success recipe-btn">Get Recipe</a>
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

function mealRecipeModal(meal) {
    let html = "";
    html += `
        <div class="modal-header">
            <h5 class="modal-title">${meal.strMeal}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p>${meal.strInstructions}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    const myModal = new bootstrap.Modal(document.querySelector("#myModal"));
    myModal.show();
}