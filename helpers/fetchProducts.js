const fetchProducts = async (query) => {
  try {
    const link = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    const getProduct = await fetch(link);
    const changeToJson = await getProduct.json();
    return changeToJson;
  } catch (erro) {
    return erro;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
