import {memo, useCallback} from "react";
import PropTypes from 'prop-types';
import './style.css';
import Pagination from "../pagination";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function List({list, renderItem}) {

  const store = useStore();

  const limit = 10

  const select = useSelector(state => ({
    count: state.catalog.count,
    currentPage: state.catalog.currentPage
  }));

  const callbacks = {
    updateList: useCallback((page, limit) => {
      store.actions.catalog.load(page, limit)
    }, [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <div className='List'>{
      list.map(item =>
        <div key={item._id} className='List-item'>
          {renderItem(item)}
        </div>
      )}
      <Pagination maxElements={select.count} currentPage={select.currentPage} onPageChange={callbacks.updateList} limit={limit}/>
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  renderItem: PropTypes.func,
};

List.defaultProps = {
  renderItem: (item) => {},
}

export default memo(List);
