const productItem = document.querySelector(".card-body_shop")
const cartItem = document.querySelector(".card-body_cart")
const totalPrice = document.querySelector(".card-title-amount")
const buttonChange = document.querySelector(".item_button")


function renderProduct() {
  shoes.forEach((product) => {
   // document.getElementById(product.id) = JSON.parse(localStorage.getItem("BUTTON"))
    productItem.innerHTML += `
        <div class="card-body_item">
            <div class="item_image" style="background-color: ${product.color} ">
            <img src= ${product.image} alt="${product.name}">
            </div>
            <div class="item_name"> ${product.name}</div>
            <div class="item_content">${product.description}</div>
            <div class="item_bottom">
            <div class="item_price">$ ${product.price}</div>
            <div class="item_button" id=${product.id} onclick = addToCard(${product.id}) >ADD TO CART</div>
            </div>
        </div> 
        `
  })
}

renderProduct()


let cart = []
var dataString  =  localStorage.getItem("CART")
//check if cart is empty or not
if(dataString){
  cart = JSON.parse(dataString)
}else{
  cart = []
}

cart.forEach(item => {
  buttonDisable(document.getElementById(item.id));
})


updateCart()

//Add product to cart
function addToCard(id) {
  //check if product is already exist in card
  if (cart.some((item) => item.id === id)) {
    console.log("Product already exists in card");
  } else {
    const item = shoes.find((product) => product.id === id)
    cart.push({
      ...item,
      numberOfUnits: 1
    })
    localStorage.setItem("CART", JSON.stringify(cart))
    buttonDisable(document.getElementById(id))
  }  
  updateCart()
}


function buttonDisable(x) {
  x.classList.add("noHover")
  x.classList.add("innactive")
  x.innerHTML = `<div class="shop-item-button-cover">
                <div class="shop-item-button-cover-check-icon"></div>
                </div>`
  //localStorage.setItem("BUTTON", JSON.stringify(document.querySelector(x)))
}


function updateCart() {
  renderCart()
  renderTotalPrice()
}


function renderTotalPrice() {
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.numberOfUnits;
  })
  totalPrice.innerHTML = `$${total.toFixed(2)}`
}


function renderCart() {
  //clear all
  cartItem.innerHTML = "";
  if (cart.length === 0) cartItem.innerHTML = `<p>Your cart is empty.</p>`

  cart.forEach(item => {
    cartItem.innerHTML += `<div class="cart-item">
        <div class="cart-item-left">
          <div class="cart-item-img" style="background-color: ${item.color};">
            <div class="cart-item-img-block" >
              <img src="${item.image}" alt="${item.name}">
            </div>
          </div>
        </div>
        <div class="cart-item-right">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price}</div>
          <div class="cart-item-action">
            <div class="cart-item-count">
              <div class="cart-item-count-button" onclick = changeNumber("-",${item.id}) >-</div>
              <div class="cart-item-count-number">${item.numberOfUnits}</div>
              <div class="cart-item-count-button" onclick = changeNumber("+",${item.id})>+</div>
            </div>
            <div class="cart-item-remove" onclick= removeItemCart(${item.id})>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAB2AAAAdgB+lymcgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALISURBVHic7Zs9bxNBEIYfgyUKAhhQUhDRICEBCh0fgkhBNIT8gPwZ6Gig5y8QCUhH5AqE3EZJgQRKEDSpKEAQkTMdcijGRvi8Z+/e3eze4X2kKe40t/Pu+LRfN4bIdNNQbLsJ3ATOFWznC7AJ/C6syCMngC3gsCTb7LdZGx5SXucH9kBD6BGNRoGrNWlTLQEa7R5VaFMtAbXBZwLWkVnHxtZ9iZr6N6Bp6TcHXAOOW/qfz7i36un5X8A28NXSfywrQJfypzVtS4D7ZSRgpwKdyWsfJnXOZincxf7VrxoJcHKcg80g2ClFShg6ZTQyD2xQr3GgC7yi+EYs8t+TZ329gKwJfiLzbRU4Cywh/fmuGegpw/PssmYwS5aAfURTD3ikFegKo4PNe61gDrxjWFMPuGj7sMte4JLh3mWH57VYSF03cDg7cEmAabxQ2aM7UkjX1O8GfSRgHmgjM8YO4wfOFWC379umYguZVcyrrkm0U/4JMGvwm2N0tblh0b5Jk+222csbcCd1PYOsI9KYzhvuqij6Bx8JMO0kZyz91HehcRAMLSA0MQGhBYQmJiC0gNDEBIQWEJqYgNACQhMTEFpAaGICQgsITUxAaAGhiQnwEMP0+axr6af+6c1HAjqp6wQpo02zxWhi3moIykveU+FBfUGCfEq7N8Z3GSlrSbD/vl/oVNiFvAnQpvLH4pUmJsDBN2tEDlnHn1UBZppljLgkYC/j/i2HNspmMeP+nkawY8ABowPOa41gFjSQaTKt5wDRqsKaIeAh8Bjd/x+laQBPMrQ80wy8iJSgmAK/QWpzW4rxW8gndNMvPyiPua0YH4DnGcGrYGuK/f7LGeBjgM5Nsl3gtGK/h7gAfFbukIt96mvySgt4WVB4UesBL4BTyn0dy42+iEGxog/bR8ai60XFlzl1NZFiyllknNDgB/ANKbaq1V9pI1XlD82w8ru3YIVHAAAAAElFTkSuQmCC" class="cart-item-remove-icon">
            </div>
          </div>
        </div> 
      </div>
        `
  })
}


function changeNumber(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits
    if (item.id === id) {
      if (action === "-" && numberOfUnits >= 0) {
        numberOfUnits--;
      }
      else if (action === "+") {
        numberOfUnits++;
      }
    }
    return {
      ...item,
      numberOfUnits,
    }

  })
  if (action === "-" ) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].numberOfUnits === 0) {
        document.getElementById(id).classList.remove("innactive")
        document.getElementById(id).classList.remove("noHover")
        document.getElementById(id).innerHTML = 'ADD TO CART'
        cart.splice(i, 1)
        localStorage.setItem("CART", JSON.stringify(cart))
      }
    }
  }
  updateCart();
}


function removeItemCart(id) {
  cart = cart.filter(item => item.id !== id)
  localStorage.setItem("CART", JSON.stringify(cart))
  updateCart()
  document.getElementById(id).classList.remove("innactive")
  document.getElementById(id).classList.remove("noHover")
  document.getElementById(id).innerHTML = 'ADD TO CART'
}

