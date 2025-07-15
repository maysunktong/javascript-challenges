const searchbar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");
const display = document.getElementById("content");
let searchKeyword;
const API_KEY = "b75eca1cb17f4b1a912ff6df7c777a78";

async function getNewsData() {
  const searchKeyword = searchbar.value.trim();

  if (!searchKeyword) {
    display.innerHTML = "No search results";
  }

  display.innerHTML = `<p class="spinning"></p>`;

  const url = `https://newsapi.org/v2/everything?q=${searchKeyword}&sortBy=popularity&apiKey=${API_KEY}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("News not found!");
    }

    const data = await res.json();

    if (!data.articles || data.articles.length === 0) {
      display.innerHTML = "No news articles found.";
      return;
    }

    const articles = data.articles
      .slice(0, 5)
      .map((article) => {
        return `
        <div class="article">
          <h2>${article.title}</h2>
          <p><strong>Author:</strong> ${article.author || "Unknown"}</p>
          <p><strong>Source:</strong> ${article.source.name}</p>
          <img src="${
            article.urlToImage
          }" alt="news image" style="max-width: 100%;">
          <p>${article.description}</p>
          <a href="${article.url}" target="_blank">Read more</a>
        </div>
        <hr/>
      `;
      })
      .join("");

    display.innerHTML = `Found ${data.totalResults}articles related to keyword '${searchKeyword}':
    ${articles}`;
    
    searchbar.value = ""
  } catch (error) {
    console.error(error.message);
    display.innerHTML = `Error: ${error.message}`;
  }
}

searchbar.addEventListener("keydown", (e) => {
  if (e.code === "Enter") getNewsData();
});

searchButton.addEventListener("click", getNewsData);
