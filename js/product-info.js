let URL_INFO_PRODUCTS = PRODUCT_INFO_URL + localStorage.getItem("ProductID")+".json"
let URL_COMMENTS_PRODUCT = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("ProductID")+".json"
let ProductInfo = [];
let ProductComments = [];

function setProductId(id){
    localStorage.setItem("ProductID", id);
    window.location = "product-info.html"
    location.href = "product-info.html"
}

function showProductInfo(){
    let htmlContentToAppend = "" 
    htmlContentToAppend += `<h1>${ProductInfo.name}</h1>
     <div> ${ProductInfo.description} </div>
     <div> ${ProductInfo.cost} ${ProductInfo.currency} </div>
     <div> ${ProductInfo.soldCount} unidades vendidas  </div>`

     for(let i = 0; i < ProductInfo.images.length; i++){
        htmlContentToAppend+= `<div class="col-3">
        <img src="${ProductInfo.images[i]}" alt="product image" class="img-thumbnail"></div>`
        
     }

     for(let i = 0; i < ProductInfo.relatedProducts.length; i++){
         console.log(ProductInfo.relatedProducts[i].id)
         htmlContentToAppend += `<div class = "container">
                                  <div onclick="setProductId(${ProductInfo.relatedProducts[i].id})" class="list-group-item list-group-item-action">
                                    <div> ${ProductInfo.relatedProducts[i].name}
                                      <div><img src= "${ProductInfo.relatedProducts[i].image}" alt="product image" class = "col-3"</div>
                                    </div>
                                  </div>
                                 </div>`} 

    document.getElementById("product_info").innerHTML = htmlContentToAppend

}

function showProductComments(){
    let htmlContentToAppend = ""
    for(let i = 0; i < ProductComments.length; i++){

        htmlContentToAppend += `${ProductComments[i].user} ${ProductComments[i].dateTime}`

        for(let j = 0; j < ProductComments[i].score; j++){
            htmlContentToAppend += `<span class="fa fa-star checked"></span>`
        }
        for(let j=0; j < 5-(ProductComments[i].score);j++){
            htmlContentToAppend += `<span class="fa fa-star"></span>`
        }

        htmlContentToAppend += `<div> ${ProductComments[i].description}</div><br>`
     
    }

    htmlContentToAppend += `<h3>Comentar</h3><br>
    <div><label>Tu opinion:</label></div><br>
     <div><textarea></textarea></div><br>
      <div><label for="stars">Tu puntuación:</label>

      <select name="stars" id="stars">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select><br>

      <br><div><input type="submit" value="Enviar"></div>`
      


    document.getElementById("product_comments").innerHTML = htmlContentToAppend
}


document.addEventListener("DOMContentLoaded", function(){

    getJSONData(URL_INFO_PRODUCTS).then(function(resultado){
        if (resultado.status === "ok"){
            ProductInfo = resultado.data
            showProductInfo(ProductInfo)
            
        }
        else {
            alert("JSON incorrecto")

        }
    })

    getJSONData(URL_COMMENTS_PRODUCT).then(function(resultado){
        if (resultado.status === "ok"){
            ProductComments = resultado.data
            showProductComments(ProductComments);
            
            
        }
        else {
            alert("JSON incorrecto")

        }
    })
})