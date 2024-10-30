/* eslint-disable @typescript-eslint/no-explicit-any */
{/* Importing necessary components and libraries */}
import Swal from "sweetalert2";
import { useDeleteServiceMutation, useGetServicesQuery, useUpdateServiceMutation } from "../../../redux/features/service/service.api";
import Container from "../../../utils/Container";
import Loading from "../../../utils/Loading";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues } from "./AddServices";

const ManageService = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
    const { data, isLoading } = useGetServicesQuery({});
    const [deleteService] = useDeleteServiceMutation();
    const [selectedForUpdate, setSelectedForUpdate] = useState<any>(null);
    const [updateService] = useUpdateServiceMutation();

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
            await updateService(dataToBeUpdated ).unwrap();

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
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
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
                        {data?.data?.map((service: any, index: number) => (
                            <tr key={service._id}>
                                <th>{index + 1}</th>
                                <td>{service.name}</td>
                                <td>{service.price}</td>
                                <td>{service?.userIds?.length}</td>
                                <td>{service.avgTime} hrs</td>
                                <td>{service.min}</td>
                                <td>{service.max}</td>
                                <td>
                                    <button
                                        className="btn btn-success btn-xs mr-2"
                                        onClick={() => setSelectedForUpdate(service)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDeleteService(service._id)}
                                        className="btn btn-danger btn-xs"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                        <div className="modal-action">
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
