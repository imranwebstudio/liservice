import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Container from "../utils/Container";
import { Link } from "react-router-dom";

const Register = () => {
    const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Register forms
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();

    // Handle form submission
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (isLogin) {
            // Handle login logic
            const loginData = {
                username: data.username,
                password: data.password
            }
            console.log("Login Data:", loginData);
        } else {
            console.log("Register Data:", data);
        }
        reset(); // Reset form after submission
    };

    return (
        <Container>
            <Link to="/" className="btn btn-secondary normal-case text-xl">Home</Link>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl font-bold text-primary ">{isLogin ? "Login" : "Register"} now!</h1>
                        <p className="py-6">
                            {isLogin
                                ? "Login to your account to get started with our services."
                                : "Create your account to get started with our services."}
                        </p>
                        <div className="py-4">
                            {isLogin ? (
                                <p>
                                    Don't have an account?{" "}
                                    <button onClick={() => setIsLogin(false)} className="link link-hover">
                                        Register here
                                    </button>
                                </p>
                            ) : (
                                <p>
                                    Already have an account?{" "}
                                    <button onClick={() => setIsLogin(true)} className="link link-hover">
                                        Login here
                                    </button>
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="card w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                            {/* Username should be displayed for both login and register */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="username"
                                    className="input input-bordered"
                                    {...register("username", { required: "Username is required" })}
                                />
                                {typeof errors.username?.message === "string" && (
                                    <span className="text-red-500 text-sm">{errors.username.message}</span>
                                )}
                            </div>

                            {/* Email field is only required for registration */}
                            {!isLogin && (
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="email"
                                        className="input input-bordered"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Invalid email address"
                                            }
                                        })}
                                    />
                                    {typeof errors.email?.message === "string" && (
                                        <span className="text-red-500 text-sm">{errors.email.message}</span>
                                    )}
                                </div>
                            )}

                            {/* Password field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        }
                                    })}
                                />
                                {typeof errors.password?.message === "string" && (
                                    <span className="text-red-500 text-sm">{errors.password.message}</span>
                                )}
                            </div>

                            {/* Confirm password field, only for registration */}
                            {!isLogin && (
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Confirm Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="confirm password"
                                        className="input input-bordered"
                                        {...register("confirmPassword", {
                                            required: "Please confirm your password",
                                            validate: (value) => value === watch("password") || "Passwords do not match"
                                        })}
                                    />
                                    {typeof errors.confirmPassword?.message === "string" && (
                                        <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
                                    )}
                                </div>
                            )}

                            {isLogin && (
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            )}

                            <div className="form-control mt-6">
                                <button className="btn btn-primary" type="submit">{isLogin ? "Login" : "Register"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Register;
