var forms = document.querySelectorAll('.needs-validation')
const email = document.getElementById("email")



document.addEventListener("DOMContentLoaded", function () {


    

    forms[0].addEventListener('submit', function (event) {
  
        forms[0].classList.add('was-validated')
        datosFormulario = true
        if (!forms[0].checkValidity()) {
            datosFormulario = false
            event.preventDefault()
            event.stopPropagation()
        } else {
    
            localStorage.setItem("usuario_loggeado", email.value)
            window.location.href = 'pagina_principal.html'
        }
        
    })
})



