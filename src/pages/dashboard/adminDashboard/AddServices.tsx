import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
    serviceName: string;
    category: string;
    ratePer1000: number;
    min: number;
    max: number;
    avgTime: string;
}

const AddServices: React.FC = () => {
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
        <div className="card w-full max-w-lg bg-base-100 shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Add New Service</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Service Name */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Service Name</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered"
                        {...register("serviceName", { required: "Service name is required" })}
                    />
                    {errors.serviceName && (
                        <span className="text-red-500 text-sm">{errors.serviceName.message}</span>
                    )}
                </div>

                {/* Category */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Category</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered"
                        {...register("category", { required: "Category is required" })}
                    />
                    {errors.category && (
                        <span className="text-red-500 text-sm">{errors.category.message}</span>
                    )}
                </div>

                {/* Rate per 1000 */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Rate per 1000</span>
                    </label>
                    <input
                        type="number"
                        className="input input-bordered"
                        {...register("ratePer1000", {
                            required: "Rate per 1000 is required",
                            min: { value: 0, message: "Must be a positive number" },
                        })}
                    />
                    {errors.ratePer1000 && (
                        <span className="text-red-500 text-sm">{errors.ratePer1000.message}</span>
                    )}
                </div>

                {/* Min */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Min </span>
                    </label>
                    <input
                        type="number"
                        className="input input-bordered"
                        {...register("min", {
                            required: "Minimum likes is required",
                            min: { value: 10, message: "Must be at least 10" },
                        })}
                    />
                    {errors.min && (
                        <span className="text-red-500 text-sm">{errors.min.message}</span>
                    )}
                </div>

                {/* Max */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Max</span>
                    </label>
                    <input
                        type="number"
                        className="input input-bordered"
                        {...register("max", {
                            required: "Maximum likes is required",
                            validate: (value) => {
                                const minLikes = Number(value); // Ensure value is a number
                                // const maxLikes = Number(value);
                                return minLikes > 10 || "Maximum likes must be greater than Minimum likes";
                            },
                        })}
                    />
                    {errors.max && (
                        <span className="text-red-500 text-sm">{errors.max.message}</span>
                    )}
                </div>

                {/* Average Time */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Average Time</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered"
                        {...register("avgTime", { required: "Average time is required" })}
                    />
                    {errors.avgTime && (
                        <span className="text-red-500 text-sm">{errors.avgTime.message}</span>
                    )}
                </div>

                {/* Submit Button */}
                <div className="form-control mt-4">
                    <button type="submit" className="btn btn-primary">
                        Add Service
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddServices;
