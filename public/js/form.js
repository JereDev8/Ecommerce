
const form= document.getElementById('formu')

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    let producto= {}
    let data= new FormData(form)
    data.forEach((value, key)=> producto[key]= value)
    console.log(producto)
    fetch('/vender', {
        method: 'post',
        body: JSON.stringify(producto),
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then(result=> result.json())
    .then(json=> console.log(json))
})
