const api = "https://api.shrtco.de/v2/shorten?url="
const input = document.querySelector("#input")
const button = document.querySelector("#button")
const display = document.querySelector("#display")
const errorMessage = document.querySelector("#warning")
var shortLink = []
var fullLink = []

errorMessage.style.display = "none" //hide the error message

if(sessionStorage.getItem("shortLink") || sessionStorage.getItem("fullLink")) {
    shortLink = JSON.parse(sessionStorage.getItem("shortLink"))
    fullLink = JSON.parse(sessionStorage.getItem("fullLink"))
    

    shortLink.forEach((item, index) => {
        displayElements(fullLink[index], item, index)
   
        
        let btn = document.querySelectorAll(`.copy-button`)
        btn.forEach((copyBtn, index) => {
            copyBtn.addEventListener('click', () => {
            navigator.clipboard
            //copies the corresponding index of shortLink element
            .writeText(shortLink[index])
            .then(() => {
                copyBtn.innerHTML = "Copied"
                copyBtn.style.backgroundColor = 'hsl(255, 11%, 22%)'
            })
        })
    })
    })

}

button.addEventListener("click", (event) => {
    event.preventDefault() //stop the page from reloading
    fetch(api + input.value)
    .then(response => response.json())
    .then(data => {
        shortLink.push(data.result.full_short_link)
        fullLink.push(input.value)
    })
    .catch((err) => {
        console.log(err)
        errorMessage.style.display = "block" //display error message
    }) // I moved the .then scope, it seeems to have been what was causing the issue 

        display.innerHTML = "" //refresh the display

        //store the links in local storage
        sessionStorage.setItem("shortLink", JSON.stringify(shortLink))
        sessionStorage.setItem("fullLink", JSON.stringify(fullLink))
        

        shortLink.forEach((item, index) => {
            displayElements(fullLink[index], item, index)
       
            /**MY SOLUTION */
            // I used a querySelectorALl instead to select all the buttons at once instead of using the id
            let btn = document.querySelectorAll(`.copy-button`)
            btn.forEach((copyBtn, index) => {
                copyBtn.addEventListener('click', () => {
                navigator.clipboard
                //copies the corresponding index of shortLink element
                .writeText(shortLink[index])
                .then(() => {
                    copyBtn.innerHTML = "Copied"
                    copyBtn.style.backgroundColor = 'hsl(255, 11%, 22%)'
                })
            })
        })
    })
    
    
})


//Function for displaying the contents
function displayElements(x,y,z) {
    display.innerHTML += `
    <div class="display_content">
        <div id="url" class="ps-5">
            <p><span>Full Link:</span> ${x}</p>
        </div>

        <div id="shortened" class="d-flex ps-5">
            <p><span>Shortened Link:</span> ${y}</p>
            <button id="copyBtn${z}" class="btn ms-5 copy-button">Copy</button>
        </div>
    </div>
    `
}