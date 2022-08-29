const URL_AUTOS = "https://japceibal.github.io/emercado-api/cats_products/101.json"

let categoriesAutosList = [];


function showProductsList(categoriesAutosList){
    //console.log(categoriesAutosList.products)
    let htmlContentToAppend = ""

    for(let i = 0; i < categoriesAutosList.products.length; i++){ 
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + categoriesAutosList.products[i].image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ categoriesAutosList.products[i].name+ ` `+ categoriesAutosList.products[i].currency +`-`+ categoriesAutosList.products[i].cost + `</h4> 
                        <p> `+ categoriesAutosList.products[i].description +`</p> 
                        </div>
                        <small class="text-muted">` + categoriesAutosList.products[i].soldCount +` vendidos </small> 
                    </div>

                </div>
            </div>
        </div>
        `
    }
    document.getElementById("101").innerHTML = htmlContentToAppend

}


document.addEventListener("DOMContentLoaded", function(){
    getJSONData(URL_AUTOS).then(resultado => {
        if (resultado.status == "ok"){
            categoriesAutosList = resultado.data
            showProductsList(categoriesAutosList)
        }
        else {
            alert("JSON incorrecto")
        }
    })
})
