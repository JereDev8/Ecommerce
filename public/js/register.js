// const formulario= document.getElementById('formu')

// formulario.addEventListener('submit', (e)=>{
//     e.preventDefault()
//     let datos= new FormData(formulario)
//     let data= {}
//     datos.forEach((value, key)=>{
//         data[key]= value
//     })
//     // console.log(data)
//     fetch('/register', {
//         method:'POST',
//         body: JSON.stringify(data),
//         headers: {
//             'Content-type': 'application/json'
//         }
//     })
//     .then(res=>{console.log(res.json())})
//     .catch(err=> console.log(err))
// })


const form = document.getElementById('formu');

form.addEventListener('submit',async evt=>{
    evt.preventDefault();
    const data = new FormData(form);
    const response = await fetch('/register',{
        method:'POST',
        body:data
    })
    const result = await response.json();
    if(result.status==="success")
        window.location.replace('/login');
            // alert(result.error);
})