const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const catList = document.getElementById("cat");
const mealList = document.getElementById("meal");
const latestMealList = document.getElementById("latest");
const popularMealList = document.getElementById("popular");
const areaList = document.getElementById("areas");
const ingredientList = document.getElementById("ingredients");
const catDetailsContent = document.getElementById("cat-details-content");
const mealDetailsContent = document.getElementById("meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

const APIUrl = "https://www.themealdb.com/api/json/v2/9973533/";

searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchBtn.click();
  }
});
searchBtn.addEventListener("click", searchMeal);
mealList.addEventListener("click", getMealRecipe);
latestMealList.addEventListener("click", getMealRecipe);
popularMealList.addEventListener("click", getMealRecipe);

function highlightKeyword(keyword) {
  let lowerCaseKeyword = keyword.toLowerCase();
  let mealTitles = document.querySelectorAll("#meal h5.card-title");
  [].forEach.call(mealTitles, function (mealTitle) {
    let innerHTML = mealTitle.innerHTML;
    let lowerCaseInnerHTML = innerHTML.toLowerCase();
    let index = lowerCaseInnerHTML.indexOf(lowerCaseKeyword);
    if (index >= 0) {
      innerHTML =
        innerHTML.substring(0, index) +
        "<span class='highlight'>" +
        innerHTML.substring(index, index + keyword.length) +
        "</span>" +
        innerHTML.substring(index + keyword.length);
      mealTitle.innerHTML = innerHTML;
    }
  });
}
function listAllCategories() {
  fetch(APIUrl + `categories.php`)
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.categories) {
        // console.log(data.meals);
        data.categories.forEach((cat) => {
          let catDesc = cat.strCategoryDescription.replace("'", "&#39;");
          html += `
                    <div class="col-xxl-3 col-xl-4 col-md-6 col-sm-12 mb-3">
                        <div class="card" data-id="${cat.idCategory}">
                            <img onclick='catModal(\`${cat.strCategory}\`, \`${catDesc}\`);' src="${cat.strCategoryThumb}"
                                class="card-img-top" alt="${cat.strCategory}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${cat.strCategory}</h5>
                                <button onclick='catModal(\`${cat.strCategory}\`, \`${catDesc}\`);' class="btn btn-secondary mb-3 w-100"><i class="fa-regular fa-circle-question"></i> Details</button>
                                <a href="javascript:void(0);" onclick="searchMealByCategory('${cat.strCategory}')" class="btn btn-success btn-lg recipe-btn w-100"><i class="fa-solid fa-cookie"></i> Get Recipes</a>
                            </div>
                        </div>
                    </div>
                    `;
          catList.innerHTML = html;
        });
      } else {
        html = "Sorry, we didn't find any category";
        catList.innerHTML = html;
      }
    });
}

function listAllAreas() {
  fetch(APIUrl + `list.php?a=list`)
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        // console.log(data.meals);
        data.meals.forEach((area) => {
          html += `
                    <button onclick="filterMealByArea(\`${area.strArea}\`);" class="btn btn-sm btn-secondary mb-2">${area.strArea}</button>
                    `;
          areaList.innerHTML = html;
        });
      } else {
        html = "Sorry, we didn't find any area";
        areaList.innerHTML = html;
      }
    });
}

function listAllIngredients() {
  fetch(APIUrl + `list.php?i=list`)
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        // console.log(data.meals);
        data.meals.forEach((ingredient) => {
          html += `
                    <button onclick="filterMealByIngredient(\`${ingredient.strIngredient}\`);" class="btn btn-sm btn-secondary mb-2">${ingredient.strIngredient}</button>
                    `;
          ingredientList.innerHTML = html;
        });
      } else {
        html = "Sorry, we didn't find any ingredient";
        ingredientList.innerHTML = html;
      }
    });
}

function filterMealByArea(area) {
  fetch(APIUrl + `filter.php?a=${area}`)
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        // console.log(data.meals);
        data.meals.forEach((meal) => {
          html += `
                    <div class="col-xxl-3 col-xl-4 col-md-6 col-sm-12 mb-3">
                        <div class="card" data-id="${meal.idMeal}">
                            <img src="${meal.strMealThumb}"
                                class="card-img-top recipe-img" alt="${meal.strMeal}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <a href="javascript:void(0);" class="btn btn-success btn-lg recipe-btn w-100"><i class="fa-solid fa-cookie"></i> Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
          mealList.innerHTML = html;
        });
      } else {
        html =
          'Sorry, we didn\'t find any meal. Show <a href="javascript:void(0);" style="width: fit-content;padding-left: 5px;padding-right: 0;" onclick="showRandomMeals();">random meals</a>!';
        mealList.innerHTML = html;
      }
      document.getElementById("meal").scrollIntoView();
    });
}

function filterMealByIngredient(ingredient) {
  fetch(APIUrl + `filter.php?i=${ingredient}`)
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        // console.log(data.meals);
        data.meals.forEach((meal) => {
          html += `
                    <div class="col-xxl-3 col-xl-4 col-md-6 col-sm-12 mb-3">
                        <div class="card" data-id="${meal.idMeal}">
                            <img src="${meal.strMealThumb}"
                                class="card-img-top recipe-img" alt="${meal.strMeal}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <a href="javascript:void(0);" class="btn btn-success btn-lg recipe-btn w-100"><i class="fa-solid fa-cookie"></i> Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
          mealList.innerHTML = html;
        });
      } else {
        html =
          'Sorry, we didn\'t find any meal. Show <a href="javascript:void(0);" style="width: fit-content;padding-left: 5px;padding-right: 0;" onclick="showRandomMeals();">random meals</a>!';
        mealList.innerHTML = html;
      }
      document.getElementById("meal").scrollIntoView();
    });
}

function showLatestMeals() {
  fetch(APIUrl + `latest.php`)
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        // console.log(data.meals);
        data.meals.forEach((meal) => {
          html += `
                    <div class="col-xxl-3 col-xl-4 col-md-6 col-sm-12 mb-3">
                        <div class="card" data-id="${meal.idMeal}">
                            <img src="${meal.strMealThumb}"
                                class="card-img-top recipe-img" alt="${meal.strMeal}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <a href="javascript:void(0);" class="btn btn-success btn-lg recipe-btn w-100"><i class="fa-solid fa-cookie"></i> Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
          latestMealList.innerHTML = html;
        });
      } else {
        html =
          'Sorry, we didn\'t find any meal. Show <a href="javascript:void(0);" style="width: fit-content;padding-left: 5px;padding-right: 0;" onclick="showRandomMeals();">random meals</a>!';
        latestMealList.innerHTML = html;
      }
    });
}

function showPopularMeals() {
  fetch(APIUrl + `popular.php`)
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        // console.log(data.meals);
        data.meals.forEach((meal) => {
          html += `
                    <div class="col-xxl-3 col-xl-4 col-md-6 col-sm-12 mb-3">
                        <div class="card" data-id="${meal.idMeal}">
                            <img src="${meal.strMealThumb}"
                                class="card-img-top recipe-img" alt="${meal.strMeal}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <a href="javascript:void(0);" class="btn btn-success btn-lg recipe-btn w-100"><i class="fa-solid fa-cookie"></i> Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
          popularMealList.innerHTML = html;
        });
      } else {
        html =
          'Sorry, we didn\'t find any meal. Show <a href="javascript:void(0);" style="width: fit-content;padding-left: 5px;padding-right: 0;" onclick="showRandomMeals();">random meals</a>!';
        popularMealList.innerHTML = html;
      }
    });
}

function showRandomMeals() {
  fetch(APIUrl + `randomselection.php`)
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        // console.log(data.meals);
        data.meals.forEach((meal) => {
          html += `
                    <div class="col-xxl-3 col-xl-4 col-md-6 col-sm-12 mb-3">
                        <div class="card" data-id="${meal.idMeal}">
                            <img src="${meal.strMealThumb}"
                                class="card-img-top recipe-img" alt="${meal.strMeal}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <a href="javascript:void(0);" class="btn btn-success btn-lg recipe-btn w-100"><i class="fa-solid fa-cookie"></i> Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
          mealList.innerHTML = html;
        });
      } else {
        html =
          'Sorry, we didn\'t find any meal. Show <a href="javascript:void(0);" style="width: fit-content;padding-left: 5px;padding-right: 0;" onclick="showRandomMeals();">random meals</a>!';
        mealList.innerHTML = html;
      }
    });
}
function searchMeal() {
  const searchInputText = searchInput.value.trim();
  if (searchInputText != "") {
    fetch(APIUrl + `search.php?s=${searchInputText}`)
      .then((response) => response.json())
      .then((data) => {
        let html = "";
        if (data.meals) {
          // console.log(data.meals);
          data.meals.forEach((meal) => {
            html += `
                    <div class="col-xxl-3 col-xl-4 col-md-6 col-sm-12 mb-3">
                        <div class="card" data-id="${meal.idMeal}">
                            <img src="${meal.strMealThumb}"
                                class="card-img-top recipe-img" alt="${meal.strMeal}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <a href="javascript:void(0);" class="btn btn-success btn-lg recipe-btn w-100"><i class="fa-solid fa-cookie"></i> Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
            mealList.innerHTML = html;
            highlightKeyword(searchInputText);
          });
        } else {
          html =
            'Sorry, we didn\'t find any meal. Show <a href="javascript:void(0);" style="width: fit-content;padding-left: 5px;padding-right: 0;" onclick="showRandomMeals();">random meals</a>!';
          mealList.innerHTML = html;
        }
        document.getElementById("meal").scrollIntoView();
      });
  } else {
    mealList.innerHTML =
      'Please insert a keyword, or show <a href="javascript:void(0);" style="width: fit-content;padding-left: 5px;padding-right: 0;" onclick="showRandomMeals();">random meals</a>!';
  }
}
function searchMealByFirstLetter(letter) {
  fetch(APIUrl + `search.php?f=${letter}`)
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        // console.log(data.meals);
        data.meals.forEach((meal) => {
          html += `
                    <div class="col-xxl-3 col-xl-4 col-md-6 col-sm-12 mb-3">
                        <div class="card" data-id="${meal.idMeal}">
                            <img src="${meal.strMealThumb}"
                                class="card-img-top recipe-img" alt="${meal.strMeal}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <a href="javascript:void(0);" class="btn btn-success btn-lg recipe-btn w-100"><i class="fa-solid fa-cookie"></i> Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
          mealList.innerHTML = html;
        });
      } else {
        html =
          'Sorry, we didn\'t find any meal. Show <a href="javascript:void(0);" style="width: fit-content;padding-left: 5px;padding-right: 0;" onclick="showRandomMeals();">random meals</a>!';
        mealList.innerHTML = html;
      }
      document.getElementById("meal").scrollIntoView();
    });
}
function searchMealByCategory(cat) {
  fetch(APIUrl + `filter.php?c=${cat}`)
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        // console.log(data.meals);
        data.meals.forEach((meal) => {
          html += `
                    <div class="col-xxl-3 col-xl-4 col-md-6 col-sm-12 mb-3">
                        <div class="card" data-id="${meal.idMeal}">
                            <img src="${meal.strMealThumb}"
                                class="card-img-top recipe-img" alt="${meal.strMeal}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <a href="javascript:void(0);" class="btn btn-success btn-lg recipe-btn w-100"><i class="fa-solid fa-cookie"></i> Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `;
          mealList.innerHTML = html;
        });
      } else {
        html =
          'Sorry, we didn\'t find any meal. Show <a href="javascript:void(0);" style="width: fit-content;padding-left: 5px;padding-right: 0;" onclick="showRandomMeals();">random meals</a>!';
        mealList.innerHTML = html;
      }
      document.getElementById("meal").scrollIntoView();
    });
}

function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(APIUrl + `lookup.php?i=${mealItem.dataset.id}`)
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data.meals[0]));
    // .then(data => console.log(data.meals));
  }
  if (e.target.classList.contains("recipe-img")) {
    let mealItem = e.target.parentElement;
    fetch(APIUrl + `lookup.php?i=${mealItem.dataset.id}`)
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data.meals[0]));
    // .then(data => console.log(data.meals));
  }
}

function getYoutubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
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
  const iframeMarkup =
    '<iframe width="560" height="315" src="//www.youtube.com/embed/' +
    videoId +
    '" frameborder="0" allowfullscreen></iframe>';
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
function setEqualHeight(selector, offset = 0) {
  const elements = document.querySelectorAll(selector);
  let maxHeight = 0;

  elements.forEach((element) => {
    element.style.height = ""; // Reset height to recalculate properly
    const elementHeight = element.getBoundingClientRect().height;
    maxHeight = Math.max(maxHeight, elementHeight);
  });

  elements.forEach((element) => {
    element.style.height = maxHeight + offset + "px";
  });
}

function setEqualHeightOnEvents() {
  function updateHeights() {
    setEqualHeight("h5.card-title");
  }

  function setEvents() {
    window.addEventListener("load", updateHeights);
    window.addEventListener("resize", updateHeights);
    $(document).on("ajaxComplete", updateHeights);
  }

  updateHeights(); // Initial call to set equal heights
  setEvents(); // Set event listeners
}

// Call the function to set equal heights on page load and events
setEqualHeightOnEvents();
showLatestMeals();
showPopularMeals();
showRandomMeals();
listAllIngredients();
listAllAreas();
listAllCategories();
