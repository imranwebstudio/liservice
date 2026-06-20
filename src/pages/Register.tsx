/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { useForgotPasswordMutation, useLoginMutation, useRegisterMutation } from "../redux/features/auth/authApi";
import Swal from "sweetalert2";
import { setUser } from "../redux/features/auth/authSlice";
import logo1 from '../assets/logoWhite.png';
import { FiArrowLeft, FiEye, FiEyeOff, FiLock, FiMail, FiPhone, FiUser } from "react-icons/fi";

type FormMode = 'login' | 'register' | 'forgot';

const Register = () => {
    const [mode, setMode] = useState<FormMode>('login');
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const dispatch = useAppDispatch();
    const [login] = useLoginMutation();
    const [registerUser] = useRegisterMutation();
    const [forgotPassword] = useForgotPasswordMutation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const switchMode = (next: FormMode) => { setMode(next); reset(); };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (mode === 'forgot') {
            Swal.fire({ title: 'Sending reset link…', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
            const res = await forgotPassword({ email: data.email });
            if (res?.data) {
                Swal.fire({ icon: 'success', title: 'Reset Link Sent', text: `Check ${data.email} for the reset link.` });
            } else {
                Swal.fire({ icon: 'error', title: 'Failed', text: 'Could not find that email address.' });
            }
            return;
        }

        if (mode === 'login') {
            Swal.fire({ title: 'Signing in…', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
            try {
                const res = await login({ userName: data.userName, password: data.password }).unwrap();
                dispatch(setUser({ user: res.data.data, tokens: res.data.tokens }));
                Swal.fire({ icon: 'success', title: 'Welcome back!' });
                navigate("/service");
            } catch (error: any) {
                Swal.fire({ icon: 'error', title: 'Login Failed', text: error?.data?.error || 'Invalid credentials' });
            }
            return;
        }

        // register
        Swal.fire({ title: 'Creating account…', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
        try {
            const res = await registerUser(data).unwrap();
            dispatch(setUser({ user: res.data.data, tokens: res.data.tokens }));
            Swal.fire({ icon: 'success', title: 'Account Created!' });
            navigate("/service");
        } catch {
            Swal.fire({ icon: 'error', title: 'Registration Failed', text: 'Please try again.' });
        }
    };

    const titles: Record<FormMode, { heading: string; sub: string }> = {
        login: { heading: 'Welcome back', sub: 'Sign in to access your dashboard and services.' },
        register: { heading: 'Create an account', sub: 'Join thousands of customers growing with Li Service 24.' },
        forgot: { heading: 'Reset password', sub: 'Enter your email and we\'ll send a reset link.' },
    };

    return (
        <div className="min-h-screen bg-base-200/40 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Back to Home */}
                <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-base-content/50 hover:text-base-content mb-6 transition-colors">
                    <FiArrowLeft className="w-4 h-4" /> Back to home
                </Link>

                {/* Card */}
                <div className="bg-base-100 rounded-2xl border border-base-200 shadow-xl overflow-hidden">
                    {/* Top Brand Bar */}
                    <div className="bg-linear-to-r from-indigo-600 to-indigo-800 px-6 py-5 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center overflow-hidden">
                            <img src={logo1} alt="Li Service 24" className="w-8 h-8 object-contain" />
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm">Li Service 24</p>
                            <p className="text-white/50 text-xs">Premium SMM Panel</p>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Heading */}
                        <div className="mb-6">
                            <h1 className="text-xl font-bold">{titles[mode].heading}</h1>
                            <p className="text-sm text-base-content/50 mt-1">{titles[mode].sub}</p>
                        </div>

                        {/* Tab Switcher (login / register only) */}
                        {mode !== 'forgot' && (
                            <div className="flex rounded-xl bg-base-200/60 p-1 mb-6">
                                <button
                                    onClick={() => switchMode('login')}
                                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'login' ? 'bg-base-100 shadow text-base-content' : 'text-base-content/50 hover:text-base-content'}`}
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => switchMode('register')}
                                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'register' ? 'bg-base-100 shadow text-base-content' : 'text-base-content/50 hover:text-base-content'}`}
                                >
                                    Register
                                </button>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Forgot Password: email only */}
                            {mode === 'forgot' && (
                                <div>
                                    <label className="text-xs font-medium text-base-content/60 mb-1.5 block">Email Address</label>
                                    <div className="relative">
                                        <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/30" />
                                        <input type="email" {...register('email')} placeholder="you@example.com" className="input input-bordered w-full pl-9 text-sm" required />
                                    </div>
                                </div>
                            )}

                            {/* Login + Register shared fields */}
                            {mode !== 'forgot' && (
                                <>
                                    <div>
                                        <label className="text-xs font-medium text-base-content/60 mb-1.5 block">Username</label>
                                        <div className="relative">
                                            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/30" />
                                            <input
                                                type="text"
                                                placeholder="your_username"
                                                className="input input-bordered w-full pl-9 text-sm"
                                                {...register("userName", { required: "Username is required" })}
                                            />
                                        </div>
                                        {errors.userName?.message && <p className="text-error text-xs mt-1">{String(errors.userName.message)}</p>}
                                    </div>

                                    {mode === 'register' && (
                                        <>
                                            <div>
                                                <label className="text-xs font-medium text-base-content/60 mb-1.5 block">Full Name</label>
                                                <div className="relative">
                                                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/30" />
                                                    <input
                                                        type="text"
                                                        placeholder="Your Name"
                                                        className="input input-bordered w-full pl-9 text-sm"
                                                        {...register("name", { required: "Name is required" })}
                                                    />
                                                </div>
                                                {errors.name?.message && <p className="text-error text-xs mt-1">{String(errors.name.message)}</p>}
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-base-content/60 mb-1.5 block">Email</label>
                                                <div className="relative">
                                                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/30" />
                                                    <input
                                                        type="email"
                                                        placeholder="you@example.com"
                                                        className="input input-bordered w-full pl-9 text-sm"
                                                        {...register("email", { required: "Email is required" })}
                                                    />
                                                </div>
                                                {errors.email?.message && <p className="text-error text-xs mt-1">{String(errors.email.message)}</p>}
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-base-content/60 mb-1.5 block">Phone</label>
                                                <div className="relative">
                                                    <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/30" />
                                                    <input
                                                        type="text"
                                                        placeholder="+880..."
                                                        className="input input-bordered w-full pl-9 text-sm"
                                                        {...register("phone", { required: "Phone is required" })}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <div>
                                        <label className="text-xs font-medium text-base-content/60 mb-1.5 block">Password</label>
                                        <div className="relative">
                                            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/30" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                className="input input-bordered w-full pl-9 pr-10 text-sm"
                                                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })}
                                            />
                                            <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-base-content transition-colors">
                                                {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        {errors.password?.message && <p className="text-error text-xs mt-1">{String(errors.password.message)}</p>}
                                    </div>

                                    {mode === 'register' && (
                                        <div>
                                            <label className="text-xs font-medium text-base-content/60 mb-1.5 block">Confirm Password</label>
                                            <div className="relative">
                                                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/30" />
                                                <input
                                                    type={showConfirm ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    className="input input-bordered w-full pl-9 pr-10 text-sm"
                                                    {...register("confirmPassword", {
                                                        required: "Please confirm your password",
                                                        validate: v => v === watch("password") || "Passwords do not match",
                                                    })}
                                                />
                                                <button type="button" onClick={() => setShowConfirm(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-base-content transition-colors">
                                                    {showConfirm ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                            {errors.confirmPassword?.message && <p className="text-error text-xs mt-1">{String(errors.confirmPassword.message)}</p>}
                                        </div>
                                    )}
                                </>
                            )}

                            <button type="submit" className="btn btn-primary w-full rounded-xl font-semibold mt-2">
                                {mode === 'forgot' ? 'Send Reset Link' : mode === 'login' ? 'Sign In' : 'Create Account'}
                            </button>
                        </form>

                        {/* Bottom Links */}
                        <div className="mt-5 text-center text-xs text-base-content/40 space-y-2">
                            {mode === 'login' && (
                                <button onClick={() => switchMode('forgot')} className="hover:text-primary transition-colors">
                                    Forgot your password?
                                </button>
                            )}
                            {mode === 'forgot' && (
                                <button onClick={() => switchMode('login')} className="hover:text-primary transition-colors">
                                    Back to sign in
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
