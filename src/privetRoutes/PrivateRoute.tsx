import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import Swal from "sweetalert2";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  console.log("Private Route");
  const user = useAppSelector((state) => state.auth.user); // Adjust this to match your state structure
  console.log(user);

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
