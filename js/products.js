const URL_AUTOS = "https://japceibal.github.io/emercado-api/cats_products/101.json"

let categoriesList = [];
let minCount = undefined;
let maxCount = undefined;


function showProductsList(){
    let htmlContentToAppend = ""
    for(let i = 0; i < categoriesList.products.length; i++){ 
        //establecemos filtros de busqueda segun costo
        if (((minCount == undefined) || (minCount != undefined && categoriesList.products[i].cost >= parseInt(minCount))) &&
           ((maxCount == undefined) || (maxCount != undefined && categoriesList.products[i].cost <= parseInt(maxCount)))){
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
         </div>`
        }
    }

    document.getElementById(localStorage.getItem("catID")).innerHTML = htmlContentToAppend

}



document.addEventListener("DOMContentLoaded", function(){
    getJSONData(URL_AUTOS).then(function(resultado){
        if (resultado.status === "ok"){
            categoriesList = resultado.data
            
        }
        else {
            alert("JSON incorrecto")
        }
    })

    document.getElementById("rangeFilterCount").addEventListener("click",function(){
            minCount = document.getElementById("rangeFilterCountMin".value);
            maxCount = document.getElementById("rangeFilterCountMax".value);
    
            //traemos datos de input max,min
            showProductsList()
    })
})
