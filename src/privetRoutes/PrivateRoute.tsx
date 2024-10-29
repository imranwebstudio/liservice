import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import Swal from "sweetalert2";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const user = useAppSelector((state) => state.auth.user); 

  if (user) {
    return children;
  } else {

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You need to login first',
    });
  }


  return <Navigate to="/register" />;
};

export default PrivateRoute;
