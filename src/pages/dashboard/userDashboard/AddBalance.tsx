import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";



const AddBalance: React.FC = () => {
    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log("Form Data:", data);
        // Here you can send the data to the backend or perform other actions
    };

    return (
        <div className="card w-full max-w-lg bg-base-100 shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Payment</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Service Name */}
                <div className="form-control mb-4">
                    <select {...register("paymentMethod", { required: "Payment method is required" })} className="select select-bordered w-full ">
                        <option disabled selected>Pick your payment method</option>
                        <option>Bkash</option>
                        <option>Nagad</option>
                        <option>Rocket</option>
                    </select>
                </div>

                {/* Amount */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Amount</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered"
                        {...register("amount", { required: "Amount is required" })}
                    />
                </div>

                {/* extra fee */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Extra fee</span>
                    </label>
                    <input
                        type="number"
                        className="input input-bordered"
                        {...register("extraFee", {
                            required: "extra fee is required",
                            min: { value: 0, message: "Must be a positive number" },
                        })}
                    />
                </div>

                {/* Total */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Total </span>
                    </label>
                    <input
                        type="number"
                        className="input input-bordered"
                        {...register("total", {
                            required: "Minimum likes is required",
                        })}
                    />
                </div>

                {/* Max */}
                <div className="form-control mb-4">
                        <label className="label cursor-pointer">
                            <input {...register("rememberMe", { required: true })} type="checkbox" defaultChecked className="checkbox checkbox-primary" />
                            <span className="label-text">Remember me</span>
                        </label>
                </div>
                <div className="form-control mt-4">
                    <button type="submit" className="btn btn-primary">
                        Add Service
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBalance;
