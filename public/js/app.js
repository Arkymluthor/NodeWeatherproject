console.log('Client side JS file')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{

//         console.log(data)

//     })

// })



const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

// messageOne.textContent = 'From Javascript'

// messageTwo.textContent=' From Javascript'



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading ...'
    messageTwo.textContent=' '

    fetch('/weather?address=' + search.value).then((response)=>{
   
    response.json().then((data)=>{
        if (data.error){
            messageOne.textContent= data.error
            //console.log("Invalid address")
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent=data.forecast



            //console.log(data.location)
            //console.log(data.forecast)
        }


    })
    })

    //console.log(location)

})



