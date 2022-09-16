
const URL_INDEX = ".json";
const ORDER_ASC_BY_PRICE = "costA"
const ORDER_DESC_BY_PRICE = "costD"
const ORDER_DESC_BY_SOLDCOUNT = "soldCount"

let currentProductsArray = [];
let ProductsList = [];
let minCount = undefined;
let maxCount = undefined;
let aSoldCount = undefined;
let CAT_ID = localStorage.getItem("catID");
let URL_DE_PRODUCTOS = PRODUCTS_URL + CAT_ID + URL_INDEX; //generamos una cadena de tipo string donde podamos variar el enlace segun el catID

function setProductId(id){
    localStorage.setItem("ProductID", id);
    window.location = "product-info.html"
    location.href = "product-info.html"
}

function sortProducts(criteria, ListaDeProductos){
    let result = [];
    let array_products = ListaDeProductos.products // se accede a el arreglo productos dentro de la lista

    if (criteria === ORDER_DESC_BY_PRICE){  // Se genera consulta critero y se ordena de forma descendente en cuanto a precio       
        result = array_products.sort(function(a, b) {
    
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_ASC_BY_PRICE){ // Se genera consulta critero y se ordena de forma ascendente en cuanto a precio
        result = array_products.sort(function(a, b) {
    
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_SOLDCOUNT){ // Se genera consulta critero y se ordena de forma descendente en cuanto a cantidad de vendidos
        result = array_products.sort(function(a, b) {
    
            if ( a.soldCount > b.soldCount ){ return -1; }
            if ( a.soldCount < b.soldCount ){ return 1; }
            return 0;
        });
    }

    return result;
}


function showProductsList(){
    let htmlContentToAppend = ""
    for(let i = 0; i < ProductsList.products.length; i++){ 
        //establecemos filtros de busqueda segun costo
        if (((minCount == undefined) || (minCount != undefined && ProductsList.products[i].cost >= minCount)) &&
           ((maxCount == undefined) || (maxCount != undefined && ProductsList.products[i].cost <= maxCount))){
         htmlContentToAppend += `
         <div div onclick="setProductId(${ProductsList.products[i].id})" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + ProductsList.products[i].image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ ProductsList.products[i].name+ ` `+ ProductsList.products[i].currency +`-`+ ProductsList.products[i].cost + `</h4> 
                        <p> `+ ProductsList.products[i].description +`</p> 
                        </div>
                        <small class="text-muted">` + ProductsList.products[i].soldCount +` vendidos </small> 
                    </div>

                </div>
            </div>
         </div>`
        }
    }

    document.getElementById(CAT_ID).innerHTML = htmlContentToAppend

}

function sortAndShowProducts(sortCriteria, ProductsArray){
    currentSortCriteria = sortCriteria;

    if(ProductsArray != undefined){
        ProductsList = ProductsArray.products;
    }

    currentProductsArray = sortProducts(currentSortCriteria, ProductsList);

    showProductsList();
}



document.addEventListener("DOMContentLoaded", function(){

    getJSONData(URL_DE_PRODUCTOS).then(function(resultado){
        if (resultado.status === "ok"){
            ProductsList = resultado.data
            showProductsList();
            
        }
        else {
            alert("JSON incorrecto")

        }
    })

    document.getElementById("rangeFilterCount").addEventListener("click",function(){
            minCount = document.getElementById("rangeFilterCountMin").value;
            maxCount = document.getElementById("rangeFilterCountMax").value;

            if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
                minCount = parseInt(minCount);
            }
            else{
                minCount = undefined;
            }
    
            if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
                maxCount = parseInt(maxCount);
            }
            else{
                maxCount = undefined;
            }
    
            //traemos datos de input max,min
            showProductsList()
    })

    document.getElementById("sortByCountUp").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortByCountDown").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortBySoldCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_SOLDCOUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){ //utilizamos boton limpiar para borrar datos ingresados y mostrar todos los productos
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });
})
