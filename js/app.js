const items = document.querySelector('#items');
const templateCard = document.querySelector('#template').content;
const Fragment = document.createDocumentFragment();
document.addEventListener("DOMContentLoaded", ()=>{
    getData();
})
const getData = async()=>{
    try{

        const data = await fetch("api.json");
        const getData = await data.json();
        //console.log(getData)
        setData(getData)
    }
    catch(err){

        console.log(err)
    }
}

const setData = (data)=>{
    //console.log(data)
    data.forEach(products=>{
        //console.log(products)

        templateCard.querySelector('h5').innerHTML = products.title;
        templateCard.querySelector('p').innerHTML = products.precio;
        templateCard.querySelector('img').setAttribute("src", products.thumbnailUrl);
        templateCard.querySelector('button').dataset.id = products.id;

        const clone = templateCard.cloneNode(true);
        Fragment.appendChild(clone)
    })
    items.appendChild(Fragment)
}