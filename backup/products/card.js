window.addEventListener('load', function(){
    new Glider(document.querySelector('.product-glider-content'), {
        slidesToShow: 5,
        slidesToScroll: 2.5,
        draggable: true,
        arrows: false,
        exactWidth:false,
        scrollPropagate: false,
        eventPropagate: true,
        scrollLock: false,
        arrows: {
          prev: '.glider-prev',
          next: '.glider-next'
        }
      });


      // Filter add class Active click
      var itemsCategories = this.document.querySelectorAll(".product-item")
      
      itemsCategories.forEach( (item,index) => {
         item.addEventListener("click", function()  {
            
             let itemsCategoriesArray = [...itemsCategories]
             
             let removeSelectedInArray = itemsCategoriesArray.filter(i => i != item )
                 
             removeSelectedInArray.forEach(item => {
                 item.classList.remove("active")
             })
             item.classList.add("active")
         })
      })

      
  })

