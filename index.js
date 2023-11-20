let myUrl=[]
let inputBtn=document.getElementById("input-btn")
let inputEl=document.getElementById("input-el")
let ulEl=document.getElementById("ul-el")
let urlFromLocalStorage=JSON.parse(localStorage.getItem("myUrl"))
let deleteBtn=document.getElementById("delete-btn")
let tabBtn=document.getElementById("tab-btn")


if(urlFromLocalStorage){
    myUrl=urlFromLocalStorage
    render(myUrl)
}

inputBtn.addEventListener("click", function(){
    myUrl.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem("myUrl", JSON.stringify(myUrl))
    render(myUrl)

})

deleteBtn.addEventListener("click", function(){
    localStorage.clear()
    myUrl=[]
    render(myUrl)
})

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myUrl.push(tabs[0].url)
        localStorage.setItem("myUrl", JSON.stringify(myUrl) )
        render(myUrl)
    })
})

function render(url){
    let listItems=""
    for(let i=0; i<myUrl.length; i++){
        listItems+=`
        <li>
            <a href="${url[i]}" target="_blank">
                ${url[i]}
            </a>
        </li>`
    }
    ulEl.innerHTML=listItems
}