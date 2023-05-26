// Selector Padre
const parentCarrito = document.querySelector('.carrito');
// Cantidad de div
const divsCarrito = parentCarrito.childElementCount ;

let total = document.getElementById("total");

let btnComprar = document.getElementById("btnConsCarr");

// console.log(divs)

for(let i=0; i<divsCarrito; i++){
    let button= document.querySelector(`.quitarDelCarrito${i}`)
    button.addEventListener('click', async (e)=>{
        e.preventDefault()
        let precioARestar = parseInt(button.parentElement.parentElement.childNodes[3].childNodes[3].textContent);
        let newTotal= parseInt(total.textContent) - precioARestar;
        total.textContent = newTotal.toString(); 
        let idProduct= {id: button.id};
        button.parentElement.parentElement.className = "none";
        button.parentElement.parentElement.innerHTML = "";
        await fetch('/cart', {
            method:'POST',
            body:JSON.stringify(idProduct) ,
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res=>{console.log(res)})
        .catch(err=> console.log(err))
        
    })
}

