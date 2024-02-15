const Allproducts = [
    {
        id: 1,
        name: 'Bolacha trakinas',
        rate: '5',
        value: '15,00'
    },
    {
        id: 2,
        name: 'Pão doce',
        rate: '5',
        value: '15,00'
    },
    {
        id: 3,
        name: 'Arroz',
        rate: '5',
        value: '15,00'
    },
    {
        id: 4,
        name: 'Salsicha',
        rate: '5',
        value: '15,00'
    },
    {
        id: 5,
        name: 'Feijão camil',
        rate: '5',
        value: '17,00'
    },
    {
        id: 6,
        name: 'Carne bovina',
        rate: '4',
        value: '13,00'
    },
];

const iconCart = document.querySelector('.cart')
const sidebarCart = document.querySelector('.sidebar')
iconCart.addEventListener('click', function(){
    sidebarCart.classList.toggle('active');
})
const countProducts = document.querySelector('#count-products');

// Função para renderizar a lista de produtos na página
function renderProducts() {
    const contentProducts = document.querySelector('.wrapper-products');
    let contentHTML = '';

    Allproducts.forEach(item => {
        contentHTML += `
            <div class="product">
                <div class="image">
                    <img src="public/img/1.jpg">
                </div>
                <li>${item.name}</li>
                <span>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    (${item.rate})
                </span>
                <div class="info">
                    <label for="quantity-products">
                        Quantidade
                    </label> 
                    <input type="number" value="1">
                    <div class="footer">
                        <p>R$${item.value}</p>
                        <button id="${item.id}">Adicionar</button> 
                    </div>
                </div>
            </div>`;
    });

    contentProducts.innerHTML = contentHTML;
}

// FUNÇÃO PARA ADICIONAR ITENS AO CARRINHO DE COMPRAS
function addToCart(itemId, itemName, itemQuantity) {
    const arrayFromStorage = JSON.parse(localStorage.getItem("productsCart")) || [];
    const isInCart = arrayFromStorage.some(item => item.id === itemId);

    if (isInCart) {
        alert('Este item já está no carrinho!');
        return;
    }

    const newItem = { id: itemId, name: itemName, quantify: itemQuantity };
    arrayFromStorage.push(newItem);
    localStorage.setItem('productsCart', JSON.stringify(arrayFromStorage));

    countProducts.innerHTML = `${arrayFromStorage.length}`
    updateCartDisplay(arrayFromStorage);
}

// FUNÇÃO PARA ATUALIZAR O CARRINHO DE COMPRAS
function updateCartDisplay(cartItems) {
    const contentCartAllProducts = document.querySelector('.products-in-cart');
    let contentCartHTML = '';

    cartItems.forEach(item => {
        contentCartHTML += 
        `<li>
            <span>${item.name}</span>
            <label for="quantify-product">Qtd.</label>
            <input data-id="${item.id}" id="quantify-product" type="number" value="${item.quantify}">
            <svg id="button" data-id="${item.id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
        </li>`;
    });

    contentCartAllProducts.innerHTML = contentCartHTML;

    const inputQuantifyProductsInCart = document.querySelectorAll('.products-in-cart li input');
    inputQuantifyProductsInCart.forEach(input => {
        input.addEventListener('blur', function() {
            const itemId = this.getAttribute('data-id');
            const newValue = parseInt(this.value);

            let arrayFromStorage = JSON.parse(localStorage.getItem("productsCart"));

            const index = arrayFromStorage.findIndex(item => item.id === itemId);
            if (index !== -1) {
                arrayFromStorage[index].quantify = newValue;
                localStorage.setItem("productsCart", JSON.stringify(arrayFromStorage));
            }
        });
    });


    const deleteProductsInCart = document.querySelectorAll('.products-in-cart li svg#button');
    deleteProductsInCart.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const itemId = this.getAttribute('data-id');
            let arrayFromStorage = JSON.parse(localStorage.getItem("productsCart"));
            const index = arrayFromStorage.findIndex(item => item.id === itemId);
            if (index !== -1) {
                arrayFromStorage.splice(index, 1);
                localStorage.setItem("productsCart", JSON.stringify(arrayFromStorage));
                updateCartDisplay(arrayFromStorage);
            } else {
                console.log("Item não encontrado no carrinho.");
            }
            countProducts.innerHTML = `${arrayFromStorage.length}`
        });
    });
}

// Função para inicializar a página
function initializePage() {
    renderProducts();

    const buttonCart = document.querySelectorAll('.wrapper-products button');
    const quantifyProducts = document.querySelectorAll('.wrapper-products input');

    buttonCart.forEach((btnAdd, index) => {
        btnAdd.addEventListener('click', function(e) {
            e.preventDefault();
            const itemId = btnAdd.id;
            const itemName = Allproducts.find(product => product.id == itemId).name;
            const itemQuantity = quantifyProducts[index].value;
            addToCart(itemId, itemName, itemQuantity);
        });
    });

    
    updateCartDisplay(JSON.parse(localStorage.getItem("productsCart")) || []);
    countProducts.innerHTML = `${JSON.parse(localStorage.getItem("productsCart")).length}`

}

initializePage();