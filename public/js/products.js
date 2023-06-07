
console.log('si me tomó')


for(let i = 0; i < 8; i++){
    let cardImg= document.querySelector(`.card-img${i}`);
    cardImg.addEventListener('click', async (e)=>{
        const json= { id: cardImg.id }
    fetch('/redir-prods',{
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
    })
}