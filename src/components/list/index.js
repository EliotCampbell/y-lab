import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import Pagination from "../pagination";

function List({list, renderItem, onPageChange, params}) {

  return (
    <div className='List'>{
      list.map(item =>
        <div key={item._id} className='List-item'>
          {renderItem(item)}
        </div>
      )}
      {onPageChange && <Pagination maxElements={params.count} currentPage={params.currentPage} onPageChange={onPageChange}/>}
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
