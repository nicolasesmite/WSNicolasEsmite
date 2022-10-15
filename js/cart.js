const CART_ID = 25801
let CART_URL = CART_INFO_URL + "25801" + ".json"
CART_INFO = {}

function showRealCost(){
    let quantity = document.getElementById("form1").value
    console.log(quantity)
    let htmlContentToAppend = `<h6 class="mb-0">${quantity * CART_INFO.articles[0].unitCost}</h6>`
    document.getElementById("total_product").innerHTML = htmlContentToAppend 
}


function showCartInfo(){
    let htmlContentToAppend = ""
    htmlContentToAppend = `<div class="d-flex justify-content-between align-items-center mb-5" >
    <h1 class="fw-bold mb-0 text-black">Carrito</h1>
    </div>
      <hr class="my-4">

      <div class="row mb-4 d-flex justify-content-between align-items-center">
        <div class="col-md-2 col-lg-2 col-xl-2">
          <img
            src="${CART_INFO.articles[0].image}"
            class="img-fluid rounded-3" alt="${CART_INFO.articles[0].name}">
        </div>
        <div class="col-md-3 col-lg-3 col-xl-3">
          <h6 class="text-black mb-0">${CART_INFO.articles[0].name}</h6>
        </div>
        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
        <button class="btn btn-link px-2"
          onclick="this.parentNode.querySelector('input[type=number]').stepDown(); showRealCost();">
          <i class="fas fa-minus"></i>
        </button>

        <input id="form1" min="0" name="quantity" value="1" type="number"
          class="form-control form-control-sm" />

        <button class="btn btn-link px-2"
          onclick="this.parentNode.querySelector('input[type=number]').stepUp(); showRealCost();">
          <i class="fas fa-plus"></i>
        </button>
      </div>
        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1" id ="total_product">
        <h6 class="mb-0">${CART_INFO.articles[0].count * CART_INFO.articles[0].unitCost}</h6>
        </div>
        </div>
        `
        
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