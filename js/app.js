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

items.addEventListener("click",(e)=>{
    btnAccion(e);
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

    console.log(carrito);

    items.innerHTML = ''
    Object.values(carrito).forEach(producto=>{
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
        const clone = templateCarrito.cloneNode(true)
        Fragment.appendChild(clone)
    })
    items.appendChild(Fragment);

    pintarFooter();

}

const pintarFooter =()=>{
    footer.innerHTML = '';
    if(Object.keys(carrito).length === 0){
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacio - comience a comprar!</th>
        `
        return
    }
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad})=> acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio})=> acc + cantidad * precio, 0)
    //console.log(nPrecio);

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad;
    templateFooter.querySelector('span').textContent = nPrecio;

    const clone = templateFooter.cloneNode(true);
    Fragment.appendChild(clone);
    footer.appendChild(Fragment)

    const btnVaciar = document.querySelector('#vaciar-carrito');
    btnVaciar.addEventListener("click",()=>{
        carrito = {}
        pintarCarito();
        
    })
}

const btnAccion =  e=>{
    
    if(e.target.classList.contains('btn-info')){
        console.log(carrito[e.target.dataset.id])

        const producto = carrito[e.target.dataset.id]
        producto.cantidad = carrito[e.target.dataset.id].cantidad + 1;
        carrito[e.target.dataset.id] = {...producto}
        pintarCarito();
    }
    if(e.target.classList.contains('btn-danger')){
        const producto = carrito[e.target.dataset.id]
         producto.cantidad--
        if(producto.cantidad === 0){
            delete carrito[e.target.dataset.id]
        }
        pintarCarito()
    }

    e.stopPropagation()
}