import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateServiceMutation } from "../../../redux/features/service/service.api";

interface FormValues {
    name: string;
    image?: string;
    userId?: string[];
    description: string;
    price: number;
    min: number;
    max: number;
    avgTime: number;
    isDeleted?: boolean;
}

const AddServices: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();
const [addService] = useCreateServiceMutation();


    const onSubmit: SubmitHandler<FormValues> = async (data) => {

        const serviceData = {
            name: data.name,
            image: data.image,
            description: data.description,
            price: Number(data.price),
            min: Number(data.min),
            max: Number(data.max),
            avgTime: Number(data.avgTime),
            isDeleted: false
        }
        const res = await addService(serviceData).unwrap();
        console.log("submission:", res);
    };

    return (
        <div className="card w-full shadow-xl p-6">
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
                        {...register("name", { required: "Service name is required" })}
                    />
                    {errors.name && (
                        <span className="text-red-500 text-sm">{errors.name.message}</span>
                    )}
                </div>

                {/* Image (optional) */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Image URL</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered"
                        {...register("image")}
                    />
                </div>

              
                {/* Description */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        className="textarea textarea-bordered"
                        {...register("description", { required: "Description is required" })}
                    />
                    {errors.description && (
                        <span className="text-red-500 text-sm">{errors.description.message}</span>
                    )}
                </div>

                {/* Price */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <input
                        type="number"
                        className="input input-bordered"
                        {...register("price", {
                            required: "Price is required",
                            min: { value: 0, message: "Price must be a positive number" },
                        })}
                    />
                    {errors.price && (
                        <span className="text-red-500 text-sm">{errors.price.message}</span>
                    )}
                </div>

                {/* Min */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Min</span>
                    </label>
                    <input
                        type="number"
                        className="input input-bordered"
                        {...register("min", {
                            required: "Minimum value is required",
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
                            required: "Maximum value is required",
                            validate: (value) =>
                                value > 10 || "Maximum must be greater than 10",
                        })}
                    />
                    {errors.max && (
                        <span className="text-red-500 text-sm">{errors.max.message}</span>
                    )}
                </div>

                {/* Average Time */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Average Time (in hours)</span>
                    </label>
                    <input
                        type="number"
                        className="input input-bordered"
                        {...register("avgTime", {
                            required: "Average time is required",
                            min: { value: 1, message: "Time must be at least 1 hour" },
                        })}
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
