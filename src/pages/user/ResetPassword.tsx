
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useResetPasswordMutation } from '../../redux/features/auth/authApi';
import { useNavigate, useParams } from 'react-router-dom';


interface FormData {
    newPassword: string;
    confirmPassword: string;
}

const ResetPassword = () => {
    const token = useParams<{ token: string }>().token;
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
    const [resetPassword] = useResetPasswordMutation();
    const newPassword = watch('newPassword');
    const confirmPassword = watch('confirmPassword');
    const navigate  = useNavigate();
    const onSubmit = async (data: FormData) => {
        if (data.newPassword !== data.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Passwords do not match!',
            });
        } else {

            const res = await resetPassword({ password: data.newPassword, token  }).unwrap();

            console.log(res);

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Password has been reset!',
            });
            navigate("/login");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Reset Password</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">New Password</label>
                        <input
                            className="input input-bordered w-full bg-gray-200 text-black"
                            type="password"
                            {...register('newPassword', { required: true })}
                        />
                        {errors.newPassword && <span className="text-red-500 text-sm">This field is required</span>}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            className="input input-bordered w-full bg-gray-200 text-black"
                            type="password"
                            {...register('confirmPassword', { required: true })}
                        />
                        {errors.confirmPassword && <span className="text-red-500 text-sm">This field is required</span>}
                        {newPassword && confirmPassword && newPassword !== confirmPassword && (
                            <span className="text-red-500 text-sm">Passwords do not match</span>
                        )}
                    </div>
                    <button type="submit" className="w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;