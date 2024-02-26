
// Template string -> li.innerHTML = '<a href= " ${inpt.value}" target = "_blank"   rel= "noreferrer noopener">  ${inpt.value}</a>'l
let myLinks = [];
const button = document.getElementById("save-button");
const del = document.getElementById("delete-button");
const tab = document.getElementById("tab-button");
const inpt = document.getElementById("input-tag");
const uL = document.getElementById("ul");
let aux = 0;

showLS();
if(inpt.value[0] === "$" && inpt.value[1] === "-")
{
    let y = inpt.value[2];
    myLinks.splice(aux,1);
    getelementById("" + aux).innerHTML = "";
    localStorage.setItem("Cache",JSON.stringify(myLinks));
}

button.addEventListener("click",function(){
    if(inpt.value !== "")
    {   
        myLinks.push(inpt.value);
        localStorage.setItem("Cache",JSON.stringify(myLinks));
        let li = document.createElement("li");
        li.setAttribute("id",aux);
        //aux++;
        li.innerHTML = "<a href=" + wrapLink(inpt.value) + " target = \"_blank\" " + "rel= \"noreferrer noopener\" " + ">" + wrapLink(inpt.value) + "</a>";
        uL.appendChild(li);
        inpt.value = "";
    }    
})

del.addEventListener("dblclick",function(){
    localStorage.clear("Cache");
    uL.innerHTML = "";
    myLinks = [];
    aux = 0;
})

tab.addEventListener("click",function(){
        chrome.tabs.query({active:true,currentWindow:true},function(tabs){
            myLinks.push(tabs[0].url)
            localStorage.setItem("Cache", JSON.stringify(myLinks) )
            let li = document.createElement("li");
            li.setAttribute("id","Links")
            li.innerHTML = "<a href=" + tabs[0].url + " target = \"_blank\" " + "rel= \"noreferrer noopener\" " + ">" + wrapLink(tabs[0].url) + "</a>";
            uL.appendChild(li);
        })
})

function showLS(){
    let aux = JSON.parse(localStorage.getItem("Cache") );
    if (aux !== null)
    {   
        let li = "";
        for(let i = 0; i < Object.keys(aux).length; i++)
        {
            li += " <li> <a href=" + aux[i] + " target = \"_blank\" " + "rel= \"noreferrer noopener\" " + ">" + wrapLink(aux[i]) + "</a> </li>";
            myLinks.push(aux[i]); 
        }
        uL.innerHTML += li;
    }
}

function wrapLink(link){

    let index = link.indexOf("?");
    if(index !== -1)
    { 
       return link.substring(0,index) + "...";
    }
    else{
        return link;
    }
}