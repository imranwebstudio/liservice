import { useState } from "react";
import Container from "../utils/Container";
import { Link } from "react-router-dom";

const Register = () => {
    const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Register forms

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
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">username</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="username"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    required
                                />
                                {!isLogin && (
                                    <label className="label">
                                        <span className="label-text">Confirm Password</span>
                                    </label>
                                )}
                                {!isLogin && (
                                    <input
                                        type="password"
                                        placeholder="confirm password"
                                        className="input input-bordered"
                                        required
                                    />
                                )}

                                {isLogin && (
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                )}
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">{isLogin ? "Login" : "Register"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Register;
