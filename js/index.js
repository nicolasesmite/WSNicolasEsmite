const email = document.getElementById("email")
const password1 = document.getElementById("password1")
const boton = document.getElementById("regBtn")

boton.addEventListener("click", e=>{
    let entrar = false
    if(email.value.length == 0){
        entrar = true
        //alert("mail corto")

    }
    if(password1.value.length == 0 ){
        entrar = true
        //alert("contraseña corta")
    }
    if (!entrar){
        location.href = "pagina_principal.html"
    }
})