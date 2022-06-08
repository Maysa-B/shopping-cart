// atualiza a constante que é utilizada mais de duas vezes
const getCurrItems = () => {
  const result = document.querySelectorAll('.cart__item');
  return result;
};

// muda o número de itens do carrinho
function changeNumberItens() {
  const container = document.querySelector('.number-items');
  const tamanho = getCurrItems().length;

  if (tamanho === 0) {
    container.style.display = 'none';
  } else {
    container.style.display = 'flex';
  }
  
  container.innerText = tamanho;
}

// enviando os elementos para o saveCartItems
const enviaParaSalvar = () => {
  const elements = document.querySelectorAll('.cart__item');
  const arrayValues = [];
  elements.forEach((curr) => arrayValues.push(curr.innerHTML));
  return arrayValues;
};

// aqui está sendo criada a imagem do catálogo
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// criando elementos variados
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// função que atualiza o preço dos elementos do carrinho
const moneyGasto = async () => {
  const itens = getCurrItems();
  const container = document.querySelector('.total-price');
  const arrayValor = [];

  if (itens.length === 0) container.innerText = 0;

  itens.forEach((curr) => {
    const number = (curr.innerText).split('$');
    arrayValor.push(number[1]);
  });

  const valor = arrayValor.reduce((acc, curr) => parseFloat(acc) + parseFloat(curr));
  container.innerText = `${valor}`;
};

// remove elemento do carrinho
function cartItemClickListener(event) {
  if (event.target.className !== 'cart__item') {
    event.target.parentNode.remove();
  } else {
    event.target.remove();
  }

  moneyGasto();
  saveCartItems(enviaParaSalvar());
  changeNumberItens();
}

// criando os elementos que irão dentro do cart
const createCartItemElement = async ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  const img = document.createElement('img');
  const it = await fetchItem(sku);
  img.src = it.secure_thumbnail;
  li.className = 'cart__item';
  const txt = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  li.appendChild(createCustomElement('p', 'txt', txt));
  li.appendChild(img);
  return li;
};

// quem chama a função anterior para criar os elementos do cart
const addTocar = async (event) => {
  const skuId = event.target.parentNode.firstChild.innerText;
  const it = await fetchItem(skuId);
  const li = await createCartItemElement({ sku: it.id, name: it.title, salePrice: it.price });
  const container = document.querySelector('.cart__items');
  container.appendChild(li);
  moneyGasto();
  saveCartItems(enviaParaSalvar());
  changeNumberItens();
};

// criando o catálogo
function createProductItemElement({ sku, name, image }) {
  const container = document.querySelector('.items');
  const section = document.createElement('section');
  section.className = 'item';
  const txt = 'Adicionar ao carrinho!';
  const clas = 'item__add';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', clas, txt)).addEventListener('click', addTocar);

  return container.appendChild(section);
}

// adiciona o evento aos elementos do carrinho (usado para quando a página é recarregada)
const addListenerCart = () => {
  getCurrItems().forEach((curr) => curr.addEventListener('click', cartItemClickListener));
};

// limpa o carrinho de compras
function clearCart() {
  const deletar = getCurrItems();
  deletar.forEach((curr) => curr.remove());
  moneyGasto();
  changeNumberItens();
  localStorage.clear();
}

// adiciona o caregando... a página
function loading() {
  const container = document.querySelector('.items');
  const element = document.createElement('p');
  element.innerText = 'carregando...';
  element.className = 'loading';
  container.appendChild(element);
}

// retira o carregando... da página
function removeLoading() {
  const remove = document.querySelector('.loading');
  remove.remove();
}

// cria os elementos do carrinho uma vez que a página é recarregada
function recriaCart(storage) {
  if (storage === '') return 0;
  const elements = storage.split('>,');
  const container = document.querySelector('.cart__items');

  elements.forEach((curr, id) => {
    if (id !== elements.length - 1) {
      const li = document.createElement('li');
      li.className = 'cart__item';
      li.innerHTML = `${curr}">`;
      container.appendChild(li);
    } else {
      const li = document.createElement('li');
      li.className = 'cart__item';
      li.innerHTML = curr;
      container.appendChild(li);
    }
  });
  changeNumberItens();
}

// tudo que é carregado ao carregar a página
window.onload = async () => {
  loading();
  const produtos = await fetchProducts('computador');
  removeLoading();
  produtos.results.forEach((curr, id) => {
    if (id <= 49) {
      createProductItemElement({ sku: curr.id, name: curr.title, image: curr.thumbnail });
    }
  });
  recriaCart(getSavedCartItems());
  addListenerCart();
  moneyGasto();
};

const openAndCloseCart = () => {
  const header = document.querySelector('.container-cartTitle');
  const cart = document.querySelector('.cart');

  if (cart.style.display === 'flex') {
    header.style.display = 'none';
    cart.style.display = 'none';
  } else {
    header.style.display = 'flex';
    cart.style.display = 'flex';
  }
};

// evento do botão que esvazia o carrinho
const buttonClear = document.querySelector('.empty-cart');
buttonClear.addEventListener('click', clearCart);

// evento no carinho abre e fecha o cart
const carrinho = document.querySelector('.material-icons');
carrinho.addEventListener('click', openAndCloseCart);
