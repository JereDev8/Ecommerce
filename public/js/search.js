const iconoBuscar= document.querySelector('.icon-search')
const inpBusqueda= document.getElementById('inp-busqueda-prod')

iconoBuscar.addEventListener('click', (e)=>{
    const json= { value: inpBusqueda.value }
    fetch('/searchProduct',{
        method:'post',
        body: JSON.stringify(json), 
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then(res => {
        if (res.redirected) {
            window.location.href = res.url;
        }
    })
    .catch(err => {
        console.log(err);
    });
});

            
// })
// iconoBuscar.addEventListener('click', (e)=>{
            //     const json= { value: inpBusqueda.value }
            //     fetch('/redirect',{
                //         method:'post',
                //         body: JSON.stringify(json), 
                //         headers: {
                    //             'Content-Type':'application/json'
            //         }
            //     })
            //     .then(resul=> console.log(resul))
