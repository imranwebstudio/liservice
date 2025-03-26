/* eslint-disable @typescript-eslint/no-explicit-any */
{/* Importing necessary components and libraries */ }
import Swal from "sweetalert2";
import { useDeleteServiceMutation, useGetServicesQuery, useUpdateServiceMutation } from "../../../redux/features/service/service.api";
import Container from "../../../utils/Container";
import Loading from "../../../utils/Loading";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues } from "./AddServices";
import { FaSearch } from "react-icons/fa";

const ManageService = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
    const { data, isLoading } = useGetServicesQuery({});
    const [deleteService] = useDeleteServiceMutation();
    const [selectedForUpdate, setSelectedForUpdate] = useState<any>(null);
    const [updateService] = useUpdateServiceMutation();
    const [searchQuery, setSearchQuery] = useState("");

    // Filter services based on search query
    const filteredServices = data?.data?.filter((service: any) => {
        if (!service) return false;
        
        const searchLower = searchQuery.toLowerCase();
        return (
            (service.name?.toLowerCase() || '').includes(searchLower) ||
            (service.price?.toString() || '').includes(searchLower) ||
            (service.category?.toLowerCase() || '').includes(searchLower) ||
            (service.description?.toLowerCase() || '').includes(searchLower) ||
            (service.avgTime?.toLowerCase() || '').includes(searchLower) ||
            (service.min?.toString() || '').includes(searchLower) ||
            (service.max?.toString() || '').includes(searchLower)
        );
    });

    useEffect(() => {
        if (selectedForUpdate) {
            reset({
                name: selectedForUpdate.name,
                image: selectedForUpdate.image,
                description: selectedForUpdate.description,
                price: selectedForUpdate.price,
                category: selectedForUpdate.category,
                min: selectedForUpdate.min,
                max: selectedForUpdate.max,
                avgTime: selectedForUpdate.avgTime,
            });
        }
    }, [selectedForUpdate, reset]);

    const handleDeleteService = async (id: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Deleting...',
                    text: 'Please wait',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                try {
                    await deleteService(id).unwrap();

                    Swal.fire(
                        'Deleted!',
                        'Service has been deleted.',
                        'success'
                    );
                } catch (error) {
                    console.log(error);
                    Swal.fire(
                        'Error!',
                        'An error occurred while deleting the service.',
                        'error'
                    );
                }
            }
        });
    };

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setSelectedForUpdate(null);
        const service = {
            name: data.name,
            image: data.image,
            description: data.description,
            price: Number(data.price),
            category: data.category,
            min: Number(data.min),
            max: Number(data.max),
            avgTime: data.avgTime,
            isDeleted: false
        };



        Swal.fire({
            title: 'Processing Service...',
            text: 'Please wait while we process your Service',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const dataToBeUpdated = {
            id: selectedForUpdate._id,
            service
        }
        try {
            await updateService(dataToBeUpdated).unwrap();

            Swal.fire({
                icon: 'success',
                title: 'Service Updated Successfully!',
                text: 'Your service has been successfully updated.',
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'There was an error processing your service. Please try again.',
            });
        }
    };

    const categories = ["feature", "facebook", "instagram", "youtube", "tiktok", "telegram", "linkedin"];

    if (isLoading) return <Loading />;

    return (
        <Container>
            <div className="sticky top-0 z-10">

            <div className="bg-base-200 rounded-lg p-6">
                <h1 className="text-3xl font-bold text-center text-primary">Manage Service</h1>
                <p className="text-center text-gray-600 mt-2">Manage and update your services here</p>
            </div>

            {/* Search Box */}
            <div className="mb-6 bg-white rounded-lg p-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search services..."
                        className="input input-bordered w-full pl-10 focus:border-primary focus:ring-1 focus:ring-primary"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
            </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-lg p-4">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Total Sell</th>
                            <th>Avg. Time</th>
                            <th>Min</th>
                            <th>Max</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredServices?.map((service: any, index: number) => (
                            <tr key={service._id} className="hover:bg-base-200 transition-colors duration-200">
                                <th className="font-bold">{index + 1}</th>
                                <td className="font-medium">{service.name}</td>
                                <td className="text-primary font-semibold">${service.price}</td>
                                <td>
                                    <span className="badge badge-primary">{service?.userIds?.length}</span>
                                </td>
                                <td>{service.avgTime}</td>
                                <td>{service.min}</td>
                                <td>{service.max}</td>
                                <td className="flex gap-2">
                                    <button
                                        className="btn btn-success btn-sm hover:scale-105 transition-transform duration-200"
                                        onClick={() => setSelectedForUpdate(service)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDeleteService(service._id)}
                                        className="btn btn-error btn-sm hover:scale-105 transition-transform duration-200"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4 p-4">
                {filteredServices?.map((service: any, index: number) => (
                    <div key={service._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="card-body">
                            <div className="flex justify-between items-start ">
                                <div>
                                    <h2 className="card-title text-xl text-primary">{service.name}</h2>
                                    <p className="text-sm text-gray-500">Service #{index + 1}</p>
                                </div>
                                <div className="flex flex-col items-end basis-36">
                                    <span className="text-2xl font-bold text-primary">${service.price}</span>
                                    <span className="badge badge-primary mt-1 ">{service?.userIds?.length || 0} Sales</span>
                                </div>
                            </div>
                            <div className="divider my-2"></div>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <div className="bg-base-200 p-3 rounded-lg">
                                    <p className="text-sm text-gray-500">Average Time</p>
                                    <p className="font-semibold text-primary">{service.avgTime}</p>
                                </div>
                                <div className="bg-base-200 p-3 rounded-lg">
                                    <p className="text-sm text-gray-500">Min/Max</p>
                                    <p className="font-semibold text-primary">{service.min}/{service.max}</p>
                                </div>
                            </div>
                            <div className="card-actions justify-end mt-4">
                                <button
                                    className="btn btn-success btn-sm hover:scale-105 transition-transform duration-200"
                                    onClick={() => setSelectedForUpdate(service)}
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDeleteService(service._id)}
                                    className="btn btn-error btn-sm hover:scale-105 transition-transform duration-200"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* DaisyUI Modal for Update Service */}
            <dialog id="update_service_modal" className="modal" open={Boolean(selectedForUpdate)}>
                <div className="modal-box">
                    <h2 className="text-2xl font-bold my-4">Update Service</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <select {...register("category", { required: "Category is required" })} className="select select-bordered w-full">
                                <option disabled>Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered"
                                {...register("price", { required: "Price is required" })}
                            />
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
                                type="text"
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

                        <div className="modal-action ">
                            <button type="submit" className="btn btn-primary">Update Service</button>
                            <button type="button" className="btn" onClick={() => setSelectedForUpdate(null)}>Close</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </Container>
    );
};

export default ManageService;
