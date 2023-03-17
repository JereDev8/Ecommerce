const form= document.getElementById('form-login')

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const datos = new FormData(form);
    // console.log(datos)
    let data={};
    datos.forEach((value, key)=>{
        data[key]= value
    })
    fetch('/login', {
        method:'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-type':'application/json'
        }
    })
    .then(res=> console.log(res))
    .catch(err=> console.log(err))
})