const CART_ID = 25801
let CART_URL = CART_INFO_URL + "25801" + ".json"
CART_INFO = {}
var forms = document.querySelectorAll('.needs-validation')



forms[1].addEventListener('submit', function (event) {
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      })
})



function disableForm(id){
  
  if (id === 'CuentaBancaria'){
    document.getElementById("CuentaBanc").checked = false
    document.getElementById("Credito").checked = true
  }
  if (id === 'CreditoTarj'){
    document.getElementById("CuentaBanc").checked = true
    document.getElementById("Credito").checked = false
  }
  
}



function courierCost(percentage) {

  let unitCost = parseInt(localStorage.getItem("unitCost"))
  let totalCost = (document.getElementById("form1").value) * unitCost
  let courierCost = (totalCost/100) * percentage
  let total = totalCost + courierCost

  let htmlContentToAppend = `
  <div class = "row"> 
  <p class="col-lg-6"> Costo Unitario </p>
  <p class="col-lg-6"> ${unitCost} </p>
  </div><hr>

  <div class ="row">
  <p class="col-lg-6"> Costo de Envio </p>
  <p class="col-lg-6"> ${courierCost} </p>
  </div><hr>


  <div class="row">
  <p class="col-lg-6"> Costo Total </p>
  <p class="col-lg-6"> ${total} </p>
  </div><hr>
  
  `
  
  document.getElementById("Costs").innerHTML = htmlContentToAppend
}

function showRealCost(){
    let quantity = document.getElementById("form1").value
    let htmlContentToAppend = `<h6 class="mb-0">${CART_INFO.articles[0].currency + (quantity * CART_INFO.articles[0].unitCost)}</h6>`
    document.getElementById("total_product").innerHTML = htmlContentToAppend 
}


function showCartInfo(){
    let htmlContentToAppend = ""
    localStorage.setItem("unitCost",CART_INFO.articles[0].unitCost)
    htmlContentToAppend = `
                           

    
    <div class="d-flex justify-content-between align-items-center mb-5" >
    <h3 class="fw-bold mb-0 text-black">Carrito de compras</h3>
    <h5 class="fw-bold mb-0 text-black">Artículos a comprar</h5>
    </div>

    <div class="col-12 d-flex justify-content-between align-items-center" >
    <h6 class="col-3 fw-bold mb-0 text-black"></h6>
    <h6 class="col-3 fw-bold mb-0 text-black">Producto</h6>
    <h6 class="col-2 col-lg-2 col-xl-3 fw-bold mb-0 text-black">Precio Unitario</h6>
    <h6 class="col-2 col-lg-1 col-xl-2 fw-bold mb-0 text-black">Cantidad</h6>
    <h6 class="col-2 col-lg-2 col-xl-2 fw-bold mb-0 text-black">Subtotal</h6>
    </div>
    
      <hr class="my-3">

      <div class="d-flex justify-content-between align-items-center">
        <div class="col-md-2 col-lg-2 col-xl-2">
          <img
            src="${CART_INFO.articles[0].image}"
            class="img-fluid rounded-3" alt="${CART_INFO.articles[0].name}">
        </div>
        <div class="col-2 col-lg-2 col-xl-2 offset-lg-1">
          <h6 class="text-black mb-0">${CART_INFO.articles[0].name}</h6>
        </div>
        <div class="col-2 col-lg-2 col-xl-2 offset-lg-1">
          <h6 class="text-black mb-0">${CART_INFO.articles[0].currency + CART_INFO.articles[0].unitCost}</h6>
        </div>
        <div class="col-2 col-lg-2 col-xl-2 d-flex">
        <button class="btn btn-link px-1"
          onclick="this.parentNode.querySelector('input[type=number]').stepDown(); showRealCost();courierCost((document.querySelector('input[type=radio][name=courier]:checked')).value);">
          <i class="fas fa-minus"></i>
        </button>

        <input id="form1" min="0" name="quantity" value="1" type="number"
          class="form-control form-control-sm" />

        <button class="btn btn-link px-1"
          onclick="this.parentNode.querySelector('input[type=number]').stepUp(); showRealCost();courierCost((document.querySelector('input[type=radio][name=courier]:checked')).value);">
          <i class="fas fa-plus"></i>
        </button>
        </div>
        <div class="col-2 col-lg-2 col-xl-2 offset-lg-1" id ="total_product">
        <h6 class="mb-0">${CART_INFO.articles[0].currency + (CART_INFO.articles[0].count * CART_INFO.articles[0].unitCost)}</h6>
        </div>
        </div>`
        
        document.getElementById("cart_info").innerHTML = htmlContentToAppend
}



document.addEventListener("DOMContentLoaded", function(){

    getJSONData(CART_URL).then(function(resultado){
        if (resultado.status === "ok"){
            CART_INFO = resultado.data
            showCartInfo(CART_INFO)
            
        }
        else {
            alert("JSON incorrecto")

        }
    })
})

