import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import Swal from "sweetalert2";
import { selectUser } from "../redux/features/auth/authSlice";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const user = useAppSelector(selectUser); 

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
