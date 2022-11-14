PNombre = document.getElementById("PNombre")
SNombre = document.getElementById("SNombre")
PApellido = document.getElementById("PApellido")
SApellido = document.getElementById("SApellido")
Telefono = document.getElementById("Tel")




document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("validationCustom05").value = localStorage.getItem("usuario_loggeado")

    PNombre.value = localStorage.getItem("PNombre")
    SNombre.value = localStorage.getItem("SNombre")
    PApellido.value = localStorage.getItem("PApellido")
    SApellido.value = localStorage.getItem("SApellido")
    Telefono.value = localStorage.getItem("Tel")


    var forms = document.querySelectorAll('.needs-validation')
  
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }

          if (PNombre.value !== undefined){
            localStorage.setItem("PNombre",PNombre.value)
          }
          if (SNombre.value !== undefined){
            localStorage.setItem("SNombre",SNombre.value)
          }
          if (PApellido.value !== undefined){
            localStorage.setItem("PApellido",PApellido.value)
          }
          if (SApellido.value !== undefined){
            localStorage.setItem("SApellido",SApellido.value)
          }
          if (Telefono.value !== undefined){
            localStorage.setItem("Tel",Telefono.value)
          }
          

          form.classList.add('was-validated')
        
        }, false)
      })

    



document.getElementById("Usuario").innerHTML =  localStorage.getItem("usuario_loggeado")

})

