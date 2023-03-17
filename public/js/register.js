const formulario= document.getElementById('formu')

formulario.addEventListener('submit', (e)=>{
    e.preventDefault()
    let datos= new FormData(formulario)
    let data= {}
    datos.forEach((value, key)=>{
        data[key]= value
    })
    // console.log(data)
    fetch('/register', {
        method:'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(res=>{})
    .catch(err=> console.log(err))
})