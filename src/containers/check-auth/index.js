import {useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import {useEffect} from "react";

const CheckAuth = ({children, redirectPath}) => {

  const navigate = useNavigate()

  const select = useSelector(state => ({
    isAuth: state.userSession.isAuth,
    waiting: state.userProfile.waiting,
  }));

  useEffect(() => {
    if (!select.isAuth && !select.waiting) {
      navigate(redirectPath);
    }
  }, [navigate, select.waiting, select.isAuth]);



  return <>{children}</>;
};

export default CheckAuth;