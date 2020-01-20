var counter = document.getElementById('counter');
var count = document.querySelectorAll('#count');
var contar = 0;

//Contador en todos los botones de agregar
for(i = 0; i < count.length;i++) {
  count[i].addEventListener('click', function(){
    contar = contar + 1;
    counter.innerHTML = contar;
  });
}

//Despliegue de carrito
var carro = document.getElementsByClassName('carro');
var carroBtn = document.getElementsByClassName('carroBtn');

carroBtn[0].addEventListener('click', function () {
  carro[0].classList.toggle('d-none');
});
counter.addEventListener('click', function () {
  carro[0].classList.toggle('d-none');
});

//Agregar items al carro. Agregamos un event on click a todos los botones de agregar y les asignamos la funcion agregarAlCarro
var agregarBtn = document.getElementsByClassName('agregar-btn');
for (var i = 0; i < agregarBtn.length; i++) {
  var boton = agregarBtn[i];
  boton.addEventListener('click', agregarAlCarro);
}
//Tomamos los datos del producto clickeado.
function agregarAlCarro(event) {
  var boton = event.target;
  var producto = boton.parentElement.parentElement;
  var titulo = producto.getElementsByClassName('producto-titulo')[0].innerText;
  var desc = producto.getElementsByClassName('producto-desc')[0].innerText;
  var price = producto.getElementsByClassName('producto-price')[0].innerText;
  var img = producto.getElementsByClassName('card-img-top')[0].src;
  //una vez capturado los elementos del producto que "agreguemos", los mandamos al carrito a traves de una funcion
  agregarMiniatura(titulo, desc, price, img);
  subtotal();
}

function agregarMiniatura(titulo, desc, price, img) {
  //creamos un div
  var cartRow = document.createElement('div');
  //le agregamos el style de "cart-card" para que tenga el estilo en el carro
  cartRow.classList.add('cart-card');
  //capturamos el div donde van los productos en el carro
  var carro = document.getElementsByClassName('contenido')[0];
  //"molde" del row para el carro
  var cartRowContents = `
    <div id="cart-card" class="row align-items-center w-100">
      <div class="col">
        <img src="${img}" alt="" style="max-width: 65px;">
      </div>
      <div class="col">
        <span>${desc}</span>
        <br>
        <span class="prdPrice">${price}</span>
      </div>
      <div class="col">
        <span id="clickable" onclick="eliminar(event)" class="cartRemove">Quitar</span>
      </div>
    </div>`
  //Insertamos dentro del div que creamos el "molde" con los datos.
  cartRow.innerHTML = cartRowContents;
  carro.append(cartRow);
};
//Esta funcion hace que el boton eliminar del carrito, elimine el item.
function eliminar (event) {
  var botonClickeado = event.target;
  botonClickeado.parentElement.parentElement.remove();
  contar = contar - 1;
  counter.innerHTML = contar;
  subtotal();
};

//Funcion para calcular el subtotal. Analiza los items del carrito, captura el precio de cada item agregado y los suma.
function subtotal () {
  var carro = document.getElementsByClassName('carro')[0];
  var items = carro.getElementsByClassName('cart-card');
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    var priceElement = items[i].getElementsByClassName('prdPrice')[0];
    var precio = parseFloat(priceElement.innerText.replace('$', ''));
    total = total + precio;
  }
  document.getElementById('subtotal').innerText = '$' + total;
};
