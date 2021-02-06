console.log('Client side javascript file is loaded! che jaleb')

const weatherForm = document.querySelector('form')
 const search = document.querySelector('input')
 const messageError=document.querySelector('#message-error')
 const messageResult=document.querySelector('#message-result')

 messageResult.textContent='is loading...'
 messageError.textContent=''
 
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(search.value)
       fetch('/weather?location='+search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageError.textContent=data.error
            } else {
                
                messageResult.textContent=data.result.name
             
                            }
        })
    })
     })


