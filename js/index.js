var forms = document.querySelectorAll('.needs-validation')
const email = document.getElementById("email")


    

    forms[0].addEventListener('submit', function (event) {

        forms[0].classList.add('was-validated')
        event.preventDefault()
        event.stopPropagation()
  
    
        if (!forms[0].checkValidity()) {
            datosFormulario = false
            
        } else {
            localStorage.setItem("usuario_loggeado", email.value)
            location.href = "pagina_principal.html"

        }


         
        
    })




