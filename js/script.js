document.addEventListener("keyup",e =>{
    if(e.target.matches("#searchbar")){
 
     document.querySelectorAll(".producto").forEach(elemento =>{
         if(elemento.textContent.toLowerCase().includes(e.target.value.toLowerCase()))
         {
             elemento.classList.remove("ocultar")
         }
         else{
             elemento.classList.add("ocultar")
         }
         if(e.target.value===("")){
             elemento.classList.add("ocultar");
         }
     })
    }
 });
 