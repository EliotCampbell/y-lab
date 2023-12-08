import {memo} from "react";
import './style.css';
import {Link} from "react-router-dom";

//Можно мапить объект с элементами менюшки из пропсов
function Menu() {
  return (
      <div className={'Menu'}>
        <Link className={'Menu-item'} to={'/'}>Главная</Link>
      </div>
  );
}


export default memo(Menu);
