import StoreModule from "../module";
import {buildCategoryTree} from "../../utils";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CategoriesState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
      waiting: true
    }
  }
  /**
   * Установка категорий
   * @returns {Promise<void>}
   */
  async setCategories() {
    try{
      //Фетч из апи
      await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`)
        .then(response => response.json())
        .then((data) => {
          if (data.result) {
            this.setState({
              ...this.getState(),
              categories: buildCategoryTree(data.result.items),
              waiting: false
            }, 'Загружен список категорий из АПИ');
          } else {
            throw new Error()
          }
        })
    } catch (error){
      this.setState({
        ...this.getState(),
        categories: [],
        waiting: false
      }, 'Загружен список категорий из АПИ');
      console.log(error.message)
    }
  }
}

export default CategoriesState;
