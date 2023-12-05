import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      list: [],
      count: 0,
      currentPage: 1
    }
  }

  async load(page = 1, limit = 10) {
    const response = await fetch(`api/v1/articles?limit=10&skip=${page*limit-10}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      currentPage: page
    }, 'Загружены товары из АПИ c пагинацией');
  }
}

export default Catalog;
