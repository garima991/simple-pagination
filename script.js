const content = document.querySelector(".content");
const url = "https://dummyjson.com/recipes?limit=1000";
let page = 0;
const pageSize = 8;
// let totalPageCount = 0;


const prev = document.getElementById("prev");
const next = document.getElementById("next");
const one = document.getElementById("1");
const two = document.getElementById("2");
const three = document.getElementById("3");
const four = document.getElementById("4");

const pages = [one, two, three, four];

function fetchData(){
    fetch(url)
    .then((res) => res.json())
    .then(showData);
}

// function setDetails(data){
//     recipesData = data;
//     totalDataCount = recipesData.length;
//     totalPageCount = Math.ceil(totalDataCount/pageSize);
//     showData();
//     addPagination();
// }

function showData(data) {
    const recipesData = data.recipes;
    let newData = recipesData.slice(pageSize*page, pageSize*(page+1));
    pushCards(newData); 
}


function pushCards(recipes){
    recipes.forEach((item) => {
        console.log(item);
        const newCard = document.createElement("div");
        newCard.classList.add("card");
        newCard.innerHTML = item.name;
        content.append(newCard);
    });
}

function setActive(){
    if(page === 0){
        prev.style.visibility = "hidden";
    }
    else{
        prev.style.visibility = "visible";
    }
    if(page === 3){
        next.style.visibility = "hidden";
    }
    else{
        next.style.visibility = "visible";
    }
    pages.forEach(item => item.classList.remove("active"));
    pages[page].classList.add("active");
}

function run(){
    fetchData();
    setActive();  
}
run();

 
pages.forEach((item) => {
    item.addEventListener("click", () => {
        page = Number(event.target.innerText)-1;
        content.innerHTML = "";
        fetchData();
        setActive();
    })
})

prev.addEventListener("click", event => {
    if(page > 0)    page--;
    fetchData();
    setActive();
})

next.addEventListener("click", event => {
    if(page < pageSize)    page--;
    fetchData();
    setActive();
})
