/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { useLoginMutation, useRegisterMutation } from "../redux/features/auth/authApi";
import Swal from "sweetalert2";
import { setUser } from "../redux/features/auth/authSlice";
import Container from "../utils/Container";

const Register = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register forms
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Confirm password visibility

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (isLogin) {
      const loginData = { userName: data.userName, password: data.password };
      Swal.fire({
        title: 'Logging in...',
        text: 'Please wait while we process your request',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      try {
        const res = await login(loginData).unwrap();
        dispatch(setUser({ user: res.data.data, tokens: res.data.tokens }));

        if (res.success) {
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
          });
          navigate("/");
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: res.message || 'Invalid credentials',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Please check your credentials',
        });
      }
    } else {

      Swal.fire({
        title: 'Registering....',
        text: 'Please wait while we process your request',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      try {
        const res = await registerUser(data).unwrap();
        dispatch(setUser({ user: res.data.data, tokens: res.data.tokens }));

        if (res.success) {
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
          });
          navigate("/");
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: res.message || 'Invalid credentials',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Register Failed',
          text: 'Please check your credentials',
        });
      }
    }

    reset();
  };

  return (
    <Container>
      <Link to="/" className="btn my-10 normal-case text-xl mb-4">Home</Link>
      <div className="hero">
        <div className={`hero-content flex-col lg:flex-row-reverse bg-blue-600`}>
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold  text-white">{isLogin ? "Login" : "Register"} now!</h1>
            <p className="py-6 text-white">
              {isLogin
                ? "Login to your account to get started with our services."
                : "Create your account to get started with our services."
              }
            </p>
            <div className="py-4 text-white">
              {isLogin ? (
                <p>Don't have an account?{" "}
                  <button onClick={() => setIsLogin(false)} className="link link-hover text-white bg-red-700 px-2">Register here</button>
                </p>
              ) : (
                <p>Already have an account?{" "}
                  <button onClick={() => setIsLogin(true)} className="link link-hover text-white bg-red-700 px-2">Login here</button>
                </p>
              )}
            </div>
          </div>

          <div className="card w-full max-w-sm shadow-2xl bg-white rounded-lg">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              {/* Username Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="username"
                  className="input input-bordered bg-gray-200 text-black"
                  {...register("userName", { required: "Username is required" })}
                />
                {errors.userName?.message && <span className="text-red-500 text-sm">{String(errors.userName.message)}</span>}
              </div>

              {/* Name Input */}
              {!isLogin && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="name"
                    className="input input-bordered bg-gray-200 text-black"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && <span className="text-red-500 text-sm">{String(errors.name.message)}</span>}
                </div>
              )}

              {/* Email Input (only for register) */}
              {!isLogin && (
                <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered bg-gray-200 text-black"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address"
                      }
                    })}
                  />
                  {errors.email && <span className="text-red-500 text-sm">{String(errors.email.message)}</span>}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Phone</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Phone"
                    className="input input-bordered bg-gray-200 text-black"
                    {...register("phone", {
                      required: "phone Number is required",
                    })}
                  />
                  {errors.email && <span className="text-red-500 text-sm">{String(errors.email.message)}</span>}
                </div>
                </>
              )}

              {/* Password Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    className="input input-bordered w-full bg-gray-200 text-black"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-sm"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.password && <span className="text-red-500 text-sm">{String(errors.password.message)}</span>}
              </div>

              {/* Confirm Password (only for register) */}
              {!isLogin && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="confirm password"
                      className="input input-bordered w-full bg-gray-200 text-black"
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) => value === watch("password") || "Passwords do not match",
                      })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center text-sm"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="text-red-500 text-sm">{String(errors.confirmPassword.message)}</span>}
                </div>
              )}

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button className="btn btn-primary w-full" type="submit">
                  {isLogin ? "Login" : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Register;
