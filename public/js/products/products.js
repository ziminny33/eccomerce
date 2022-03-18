 

// product-container
// <div class="product-cart-item" data-theme="{{ $themeColor }}" style="border-top-color: {{ $themeColor }}">
//     <div class="product-cart-image">
//         <img src="{{ $image }}" alt="" srcset="">
//     </div>
//     <div class="product-cart-name">
//         {{ $name }}
//     </div>
//     <div class="product-cart-description-small">
//         {{ $descriptionSmall }}
//     </div>
//     <div class="product-cart-price">
//         {{ $price }}
//     </div>
//     <p class="product-cart-delivered">
//         <span>Entregue por:</span> {{ $delivered }}
//     </p>
//     <div class="product-cart-add-item" style="background-color: {{ $themeColor }}">
//         @include('utils.icon-cart',[ 'themeColor' => '#fff'])
//     </div>
// </div>


window.addEventListener("load" , () => {
    let url = 'http://ecommerce.trem.test/api/Item/Show'
    fetch(url, {

        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*",
            "X-Requested-With": "XMLHttpRequest",
        },
        method:'GET',
        credentials:'same-origin'

    }).then( async res => {
        const response = await res.json()
        console.log(response);
         if(response.Success) {
             if(response.Data.Data) {
                getProducts(response.Data.Data)
             }
         }
    }).catch(error => {
        console.log(error);
    }).finally( () => {
      
    })


    const getProducts = (items) => {
        let container = document.querySelector(".product-container")
        let content
        items.forEach(item => {
              content = document.createElement("div")
              content.classList.add('product-cart-item')
    
    
             let image = document.createElement("div")
             image.classList.add('product-cart-image')
             let innerImage = document.createElement("img")
             innerImage.setAttribute("src","/images/ham.png")
             image.appendChild(innerImage)
             content.appendChild(image)
    
             let name = document.createElement("div")
             name.classList.add('product-cart-name')
             name.textContent = item.Name
             content.appendChild(name)
    
             let description = document.createElement("div")
             description.classList.add('product-cart-description-small')
             description.innerHTML = limitLetters(item.Description,100)
             content.appendChild(description)
    
             let price = document.createElement("div")
            
             price.classList.add('product-cart-price')
             price.innerHTML = "R$ "+item.Amount
             content.appendChild(price)
    
             let delivered = document.createElement("div")
             delivered.classList.add('product-cart-delivered')
             delivered.innerHTML = "<span>Entregue por:</span> Alguma empresa"
             content.appendChild(delivered)
    
             let cartAbsoluteRight = document.createElement("div")
           
             cartAbsoluteRight.classList.add('product-cart-add-item')
             cartAbsoluteRight.innerHTML =  ""
             content.appendChild(cartAbsoluteRight)

             container.appendChild(content)
        });
        
    }

    const limitLetters = (string,limit) => {
         console.log(string.length);
        if(string.length >= limit) {
            let result = ""
            for (let index = 0; index <= limit; index++) {
                 
                result+=string[index];
            }
            return result+"..."
        }
        return string
    }
     
})

