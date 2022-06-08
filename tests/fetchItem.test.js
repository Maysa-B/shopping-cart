require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('2.1 - Fetchitem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('2.2 - Ao chamar a função com o argumento `MLB1615760527` a função fetch é chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  });
  it('2.3 - A função usa o endpoint `https://api.mercadolibre.com/items/MLB1615760527` ao chamarmos ela com o argumento `MLB1615760527`', () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith(endpoint);
  });
  it('2.4 - O retorno da função chamada com o argumento `MLB1615760527` é igual ao `item`', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });
  it('2.5 - Ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const result = await fetchItem();
    expect(result).toEqual(new Error('You must provide an url'));
  });
});
