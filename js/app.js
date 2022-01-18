const cards = document.querySelector('#cards');
const templateCard = document.querySelector('#template').content;
const Fragment = document.createDocumentFragment();
const templateFooter = document.querySelector("#template-footer").content;
const templateCarrito = document.querySelector("#template-carrito").content;
const items = document.querySelector("#items");
const footer = document.querySelector("#footer");

let carrito = {}
document.addEventListener("DOMContentLoaded", ()=>{
    getData();
})

cards.addEventListener("click", e=>{
    addCarrito(e);
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
    cards.appendChild(Fragment)
}



const addCarrito = e=>{
     //console.log(e.target)

    //console.log(e.target.classList.contains('btn-success'));

    if(e.target.classList.contains('btn-success')){

        setCarrito(e.target.parentElement)
    }
    e.stopPropagation();
}

const setCarrito = objeto =>{

    //console.log(objeto);

    const producto ={
        id: objeto.querySelector(".btn-success").dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad+1
    }
    carrito[producto.id] = {...producto}
    pintarCarito()
    //console.log(producto)
}

const pintarCarito = ()=>{

    console.log(carrito)
}