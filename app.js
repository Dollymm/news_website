const API_KEY="e7a03050e659456fa6c5ef29211f972b";
const url="https://newsapi.org/v2/everything?q";
window.addEventListener('load',()=> fetchNews("india"));

async function fetchNews(query){
    const res= await fetch(`${url}=${query}&apiKey=${API_KEY}`);
    const data=  await res.json();
     // console.log(data);
     bindData(data.articles);
}
function bindData(articles){
    const cardsContainer= document.getElementById('card-continer')
    const newsCardsTemplate=document.getElementById('template-news-card');
     cardsContainer.innerHTML="";
    articles.foreach(article=>{
        if(!article.urlToImage) return;
        const cardClone=newsCardsTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone,article){
    const newsImg =cardClone.querySelector('#news-img');
    const newsTitle =cardClone.querySelector('#news-title');
    const newsSource =cardClone.querySelector('#news-source');
    const newsDesc =cardClone.querySelector('#news-desc');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

     const date =new Date (article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
     });
     newsSource.innerHTML=`${article.source.name} . ${date}`;
      cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
      });
}
function onNavItemClick(id){
    fetchNews(id);
}
let curSelectedNav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav= navItem;
    curSelectedNav.classList.add('active');
}
 const searchButton= document.getElementById('search-button');
 const searchText= document.getElementById('search-text');

 searchButton.addEventListener("click",()=>{
    const query =searchText.Value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav=null;0

 })