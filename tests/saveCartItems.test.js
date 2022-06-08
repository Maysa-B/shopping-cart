const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('4.1 - Com o argumento `<ol><li>Item</li></ol>` a função localStorage.setItem é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toBeCalled();
  });
  it('4.2 - Ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro `cartItems` e o segundo sendo o valor passado como argumento para saveCartItems', () => {
    const key = 'cartItems';
    const value = '<ol><li>Item</li></ol>'
    saveCartItems(value);
    expect(localStorage.setItem).toBeCalledWith(key, value);
  });
});
