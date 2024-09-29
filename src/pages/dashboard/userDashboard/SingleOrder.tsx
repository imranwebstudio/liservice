import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
    serviceName: string;
    category: string;
    link: string;
    quantity: number;
    min: number;
    max: number;
    charge: number;
}

const SingleOrder: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log("Form Data:", data);
        // Here you can send the data to the backend or perform other actions
    };

    return (
        <div className="card  shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Buy Service</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Service Name */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Service Name</span>
                    </label>
                    <select {...register("serviceName", { required: "Service name is required" })} className="select select-bordered w-full ">
                        <option disabled selected>Pick your favorite Simpson</option>
                        <option>Facebook Boost</option>
                        <option>Youtube Boost</option>
                        <option>Instagram Boost</option>
                        <option>TikTok Boost</option>
                    </select>
                    {errors.serviceName && (
                        <span className="text-red-500 text-sm">{errors.serviceName.message}</span>
                    )}
                </div>

                {/* Category */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Category</span>
                    </label>
                    <select {...register("category", { required: "Service name is required" })} className="select select-bordered w-full ">
                        <option disabled selected>Pick your favorite Simpson</option>
                        <option>Facebook</option>
                        <option>Youtube</option>
                        <option>Instagram</option>
                        <option>TikTok</option>
                    </select>
                    {errors.category && (
                        <span className="text-red-500 text-sm">{errors.category.message}</span>
                    )}
                </div>
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Link</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered"
                        {...register("link", { required: "Category is required" })}
                    />
                    {errors.category && (
                        <span className="text-red-500 text-sm">{errors.category.message}</span>
                    )}
                </div>

                {/* Rate per 1000 */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Quantity</span>
                    </label>
                    <input
                        type="number"
                        className="input input-bordered"
                        {...register("link", {
                            required: "link is required",
                        })}
                    />
                    {errors.link && (
                        <span className="text-red-500 text-sm">{errors.link.message}</span>
                    )}
                    <p>Min: 100 - Max: 2147483647 </p>
                </div>


                {/* Average Time */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Charge</span>
                    </label>
                    <input
                        type="text"
                        readOnly
                        className="input input-bordered"
                        {...register("charge", { required: "Charge is required" })}
                    />
                    {errors.charge && (
                        <span className="text-red-500 text-sm">{errors.charge.message}</span>
                    )}
                </div>

                {/* Submit Button */}
                <div className="form-control mt-4">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SingleOrder;
