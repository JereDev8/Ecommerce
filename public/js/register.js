const formulario= document.querySelector('.formu')

formulario.addEventListener('submit', (e)=>{
    e.preventDefault()
    const datos= new FormData(formulario)
    // const last_name= datos.get('last_name')
    // const name= datos.get('name')
    // const email= datos.get('email')
    // const password= datos.get('password')
    // console.log(last_name, name, email, password)
    // const user= {name, last_name, email, password}
    // console.log(user)
    let data= {};
    datos.forEach((value, key)=>{
        data[key]= value
    });
    fetch('/register', {
        method:'POST',
        body: JSON.stringify(data),
        headers:{
            "Content-Type": "application/json"
        }
    })
    .then(respuesta=> respuesta.json())
    .catch(err=> console.log(err))
})
