require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('1.1 - FetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('1.2 - Ao chamar a função com o argumento `computador` a função fetch é chamada', () => {
    fetchProducts('computador');
    expect(fetch).toBeCalled();
  });
  it('1.3 - A função usa o endpoint `https://api.mercadolibre.com/sites/MLB/search?q=computador` ao chamarmos ela com o argumento `computador`', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toBeCalledWith(endpoint);
  });
  it('1.4 - O retorno da função chamada com o argumento `computador` é igual ao `computadorSearch`', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });
  it('1.5 - Ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const result = await fetchProducts();
    expect(result).toEqual(new Error('You must provide an url'));
  });
});
