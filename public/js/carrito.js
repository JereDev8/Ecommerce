// Selector Padre
const parent = document.querySelector('.cont-cards-prods');

// Cantidad de div
const divs = parent.childElementCount;


// console.log(divs)

for(let i=0; i<divs; i++){
    let button= document.querySelector(`.boton-comprar${i}`)
    button.addEventListener('click', async (e)=>{
        let idProduct= {id: button.id}
        console.log(typeof idProduct)
        await fetch('/productos', {
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