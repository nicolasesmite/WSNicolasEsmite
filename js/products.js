const URL_AUTOS = "https://japceibal.github.io/emercado-api/cats_products/101.json"

let categoriesList = [];


function showProductsList(categoriesList){
    //console.log(categoriesAutosList.products)
    let htmlContentToAppend = ""

    for(let i = 0; i < categoriesList.products.length; i++){ 
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + categoriesList.products[i].image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ categoriesList.products[i].name+ ` `+ categoriesList.products[i].currency +`-`+ categoriesList.products[i].cost + `</h4> 
                        <p> `+ categoriesList.products[i].description +`</p> 
                        </div>
                        <small class="text-muted">` + categoriesList.products[i].soldCount +` vendidos </small> 
                    </div>

                </div>
            </div>
        </div>
        `
    }
    document.getElementById(localStorage.getItem("catID")).innerHTML = htmlContentToAppend

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
