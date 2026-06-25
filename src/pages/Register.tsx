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
        forgot: { heading: 'Reset password', sub: "Enter your email and we'll send a reset link." },
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
            style={{ background: 'var(--site-bg)' }}
        >
            {/* Mesh blobs */}
            <div className="absolute inset-0 z-0 pointer-events-none blur-[70px] opacity-85 overflow-hidden">
                <div className="blob-a absolute w-140 h-140 left-[6%] top-0 rounded-full"
                    style={{ background: 'radial-gradient(circle at 30% 30%, rgba(52,217,126,0.55), transparent 70%)', mixBlendMode: 'screen' }} />
                <div className="blob-b absolute w-120 h-120 right-[2%] top-30 rounded-full"
                    style={{ background: 'radial-gradient(circle at 60% 40%, rgba(45,212,207,0.45), transparent 70%)', mixBlendMode: 'screen' }} />
                <div className="blob-c absolute w-105 h-105 left-[38%] top-[55%] rounded-full"
                    style={{ background: 'radial-gradient(circle at 50% 50%, rgba(31,191,108,0.4), transparent 70%)', mixBlendMode: 'screen' }} />
            </div>

            {/* Grid overlay */}
            <div className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
                    backgroundSize: '64px 64px',
                    maskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, black 30%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, black 30%, transparent 80%)',
                }} />

            {/* Grain overlay */}
            <div className="absolute inset-0 z-[1] opacity-[0.035] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

            <div className="w-full max-w-md relative z-10">
                {/* Back to Home */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 text-sm mb-6 transition-colors"
                    style={{ color: 'var(--site-t2)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--site-t0)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--site-t2)')}
                >
                    <FiArrowLeft className="w-4 h-4" /> Back to home
                </Link>

                {/* Card */}
                <div
                    className="rounded-2xl overflow-hidden shadow-2xl bg-black/10 backdrop:blur-[30px] border border-white/10"
                    style={{  border: '1px solid var(--site-border)' }}
                >
                    {/* Top Brand Bar */}
                    <div
                        className="px-6 py-5 flex items-center gap-3"
                        style={{ background: 'linear-gradient(90deg, #188A50, #0ea847)' }}
                    >
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden" style={{ background: 'rgba(255,255,255,0.15)' }}>
                            <img src={logo1} alt="Li Service 24" className="w-8 h-8 object-contain" />
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm">Li Service 24</p>
                            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>Premium SMM Panel</p>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Heading */}
                        <div className="mb-6">
                            <h1 className="text-xl font-bold" style={{ color: 'var(--site-t0)' }}>{titles[mode].heading}</h1>
                            <p className="text-sm mt-1" style={{ color: 'var(--site-t2)' }}>{titles[mode].sub}</p>
                        </div>

                        {/* Tab Switcher */}
                        {mode !== 'forgot' && (
                            <div
                                className="flex rounded-xl p-1 mb-6"
                                style={{ background: 'var(--site-bg)' }}
                            >
                                <button
                                    onClick={() => switchMode('login')}
                                    className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                                    style={
                                        mode === 'login'
                                            ? { background: 'linear-gradient(90deg, #188A50, #0ea847)', color: '#ffffff' }
                                            : { color: 'var(--site-t2)', background: 'transparent' }
                                    }
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => switchMode('register')}
                                    className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                                    style={
                                        mode === 'register'
                                            ? { background: 'linear-gradient(90deg, #188A50, #0ea847)', color: '#ffffff' }
                                            : { color: 'var(--site-t2)', background: 'transparent' }
                                    }
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
                                    <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--site-t2)' }}>Email Address</label>
                                    <div className="relative">
                                        <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--site-t2)' }} />
                                        <input
                                            type="email"
                                            {...register('email')}
                                            placeholder="you@example.com"
                                            required
                                            className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
                                            style={{
                                                background: 'var(--site-bg)',
                                                border: '1px solid var(--site-border)',
                                                color: 'var(--site-t0)',
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {mode !== 'forgot' && (
                                <>
                                    <div>
                                        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--site-t2)' }}>Username</label>
                                        <div className="relative">
                                            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--site-t2)' }} />
                                            <input
                                                type="text"
                                                placeholder="your_username"
                                                className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
                                                style={{
                                                    background: 'var(--site-bg)',
                                                    border: '1px solid var(--site-border)',
                                                    color: 'var(--site-t0)',
                                                }}
                                                {...register("userName", { required: "Username is required" })}
                                            />
                                        </div>
                                        {errors.userName?.message && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{String(errors.userName.message)}</p>}
                                    </div>

                                    {mode === 'register' && (
                                        <>
                                            <div>
                                                <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--site-t2)' }}>Full Name</label>
                                                <div className="relative">
                                                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--site-t2)' }} />
                                                    <input
                                                        type="text"
                                                        placeholder="Your Name"
                                                        className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
                                                        style={{
                                                            background: 'var(--site-bg)',
                                                            border: '1px solid var(--site-border)',
                                                            color: 'var(--site-t0)',
                                                        }}
                                                        {...register("name", { required: "Name is required" })}
                                                    />
                                                </div>
                                                {errors.name?.message && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{String(errors.name.message)}</p>}
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--site-t2)' }}>Email</label>
                                                <div className="relative">
                                                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--site-t2)' }} />
                                                    <input
                                                        type="email"
                                                        placeholder="you@example.com"
                                                        className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
                                                        style={{
                                                            background: 'var(--site-bg)',
                                                            border: '1px solid var(--site-border)',
                                                            color: 'var(--site-t0)',
                                                        }}
                                                        {...register("email", { required: "Email is required" })}
                                                    />
                                                </div>
                                                {errors.email?.message && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{String(errors.email.message)}</p>}
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--site-t2)' }}>Phone</label>
                                                <div className="relative">
                                                    <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--site-t2)' }} />
                                                    <input
                                                        type="text"
                                                        placeholder="+880..."
                                                        className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
                                                        style={{
                                                            background: 'var(--site-bg)',
                                                            border: '1px solid var(--site-border)',
                                                            color: 'var(--site-t0)',
                                                        }}
                                                        {...register("phone", { required: "Phone is required" })}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <div>
                                        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--site-t2)' }}>Password</label>
                                        <div className="relative">
                                            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--site-t2)' }} />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                className="w-full pl-9 pr-10 py-2.5 rounded-lg text-sm outline-none transition-colors"
                                                style={{
                                                    background: 'var(--site-bg)',
                                                    border: '1px solid var(--site-border)',
                                                    color: 'var(--site-t0)',
                                                }}
                                                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(p => !p)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                                                style={{ color: 'var(--site-t2)' }}
                                            >
                                                {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        {errors.password?.message && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{String(errors.password.message)}</p>}
                                    </div>

                                    {mode === 'register' && (
                                        <div>
                                            <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--site-t2)' }}>Confirm Password</label>
                                            <div className="relative">
                                                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--site-t2)' }} />
                                                <input
                                                    type={showConfirm ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    className="w-full pl-9 pr-10 py-2.5 rounded-lg text-sm outline-none transition-colors"
                                                    style={{
                                                        background: 'var(--site-bg)',
                                                        border: '1px solid var(--site-border)',
                                                        color: 'var(--site-t0)',
                                                    }}
                                                    {...register("confirmPassword", {
                                                        required: "Please confirm your password",
                                                        validate: v => v === watch("password") || "Passwords do not match",
                                                    })}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirm(p => !p)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                                                    style={{ color: 'var(--site-t2)' }}
                                                >
                                                    {showConfirm ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                            {errors.confirmPassword?.message && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{String(errors.confirmPassword.message)}</p>}
                                        </div>
                                    )}
                                </>
                            )}

                            <button
                                type="submit"
                                className="w-full py-2.5 rounded-xl text-sm font-semibold mt-2 transition-opacity hover:opacity-90 active:scale-[0.98]"
                                style={{ background: 'linear-gradient(90deg, #188A50, #06B913)', color: '#ffffff' }}
                            >
                                {mode === 'forgot' ? 'Send Reset Link' : mode === 'login' ? 'Sign In' : 'Create Account'}
                            </button>
                        </form>

                        {/* Bottom Links */}
                        <div className="mt-5 text-center text-xs space-y-2" style={{ color: 'var(--site-t2)' }}>
                            {mode === 'login' && (
                                <button
                                    onClick={() => switchMode('forgot')}
                                    className="transition-colors hover:underline"
                                    style={{ color: 'var(--site-t2)' }}
                                    onMouseEnter={e => (e.currentTarget.style.color = '#34d97e')}
                                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--site-t2)')}
                                >
                                    Forgot your password?
                                </button>
                            )}
                            {mode === 'forgot' && (
                                <button
                                    onClick={() => switchMode('login')}
                                    className="transition-colors"
                                    style={{ color: 'var(--site-t2)' }}
                                    onMouseEnter={e => (e.currentTarget.style.color = '#34d97e')}
                                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--site-t2)')}
                                >
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
