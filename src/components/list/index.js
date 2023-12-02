import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import {cn as bem} from "@bem-react/classname";

function List({...props}) {

  const cn = bem('List');

  return (
    <div className={cn()}>
      {
        props.list.map(item =>
            <div key={item.code} className={cn('item')}>
              <Item item={item}
                    buttonAction={props.itemAction}
                    buttonTitle={props.itemButtonTitle}/>
            </div>
        )
      }
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  itemAction: PropTypes.func,
  itemButtonTitle: PropTypes.string
};

List.defaultProps = {
  itemAction: () => {}
}

export default React.memo(List);
