console.log('client sided javascript is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2') //# is used to target id, . is used to target class




weatherForm.addEventListener('submit',(e)=>{   //event listener is anything to do with that element, there is a different eventlistener for hovering over something or scrolling
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch("http://localhost:3000/weather?address="+location).then(( response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        }
        else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})