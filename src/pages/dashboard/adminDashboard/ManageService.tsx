/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";
import { useDeleteServiceMutation, useGetServicesQuery, useUpdateServiceMutation } from "../../../redux/features/service/service.api";
import Loading from "../../../utils/Loading";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues } from "./AddServices";
import { FaSearch } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import "../dashboard.css";

const categories = ["feature", "facebook", "instagram", "youtube", "tiktok", "telegram", "linkedin"];

const ManageService = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
    const { data, isLoading } = useGetServicesQuery({});
    const [deleteService] = useDeleteServiceMutation();
    const [selectedForUpdate, setSelectedForUpdate] = useState<any>(null);
    const [updateService] = useUpdateServiceMutation();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredServices = data?.data?.services?.filter((service: any) => {
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
            confirmButtonColor: '#149656',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Deleting...',
                    text: 'Please wait',
                    allowOutsideClick: false,
                    didOpen: () => { Swal.showLoading(); }
                });
                try {
                    await deleteService(id).unwrap();
                    Swal.fire('Deleted!', 'Service has been deleted.', 'success');
                } catch (error) {
                    Swal.fire('Error!', 'An error occurred while deleting the service.', 'error');
                }
            }
        });
    };

    const onSubmit: SubmitHandler<FormValues> = async (formData) => {
        const service = {
            name: formData.name,
            image: formData.image,
            description: formData.description,
            price: Number(formData.price),
            category: formData.category,
            min: Number(formData.min),
            max: Number(formData.max),
            avgTime: formData.avgTime,
            isDeleted: false
        };

        Swal.fire({
            title: 'Processing Service...',
            text: 'Please wait while we process your Service',
            allowOutsideClick: false,
            didOpen: () => { Swal.showLoading(); }
        });

        const dataToBeUpdated = { id: selectedForUpdate._id, service };
        try {
            await updateService(dataToBeUpdated).unwrap();
            setSelectedForUpdate(null);
            Swal.fire({ icon: 'success', title: 'Service Updated Successfully!', text: 'Your service has been successfully updated.' });
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Update Failed', text: 'There was an error processing your service. Please try again.' });
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="d-page" style={{ background: 'transparent' }}>
            {/* Header */}
            <div className="d-card" style={{ marginBottom: 16 }}>
                <div className="d-card-header">
                    <div>
                        <h1 className="d-card-title">Manage Services</h1>
                        <p className="d-card-sub">Manage and update your services here</p>
                    </div>
                    <div className="d-search-wrap" style={{ width: 260 }}>
                        <span className="d-search-icon"><FaSearch size={13} /></span>
                        <input
                            type="text"
                            placeholder="Search services..."
                            className="d-search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Desktop Table */}
            <div className="ms-table-wrap d-table-wrap" style={{ display: 'none' }}>
                <table className="d-table">
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
                        {filteredServices?.map((service: any, index: number) => (
                            <tr key={service._id}>
                                <td>{index + 1}</td>
                                <td className="d-td-primary">{service.name}</td>
                                <td style={{ color: '#1fbf6c', fontWeight: 600 }}>${service.price}</td>
                                <td>
                                    <span className="d-badge d-badge-green">{service?.userIds?.length ?? 0}</span>
                                </td>
                                <td>{service.avgTime}</td>
                                <td>{service.min}</td>
                                <td>{service.max}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: 6 }}>
                                        <button
                                            className="d-btn d-btn-primary d-btn-sm"
                                            onClick={() => setSelectedForUpdate(service)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="d-btn d-btn-danger d-btn-sm"
                                            onClick={() => handleDeleteService(service._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="ms-cards">
                {filteredServices?.map((service: any, index: number) => (
                    <div key={service._id} className="d-mobile-card">
                        <div className="d-mobile-card-row">
                            <span className="d-mobile-card-label">#{index + 1}</span>
                            <span className="d-badge d-badge-green">{service?.userIds?.length ?? 0} sales</span>
                        </div>
                        <div className="d-mobile-card-row">
                            <span className="d-mobile-card-label">Name</span>
                            <span className="d-mobile-card-value" style={{ color: '#e8f5ec', fontWeight: 500 }}>{service.name}</span>
                        </div>
                        <div className="d-mobile-card-row">
                            <span className="d-mobile-card-label">Price</span>
                            <span style={{ color: '#1fbf6c', fontWeight: 700, fontSize: 16 }}>${service.price}</span>
                        </div>
                        <div className="d-field-row" style={{ gap: 8, marginBottom: 10 }}>
                            <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 10, padding: '8px 12px' }}>
                                <p style={{ fontSize: 10, color: '#4d6455', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Avg Time</p>
                                <p style={{ color: '#1fbf6c', fontWeight: 600, fontSize: 13, margin: 0 }}>{service.avgTime}</p>
                            </div>
                            <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 10, padding: '8px 12px' }}>
                                <p style={{ fontSize: 10, color: '#4d6455', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Min / Max</p>
                                <p style={{ color: '#1fbf6c', fontWeight: 600, fontSize: 13, margin: 0 }}>{service.min} / {service.max}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button className="d-btn d-btn-primary d-btn-sm" onClick={() => setSelectedForUpdate(service)}>Update</button>
                            <button className="d-btn d-btn-danger d-btn-sm" onClick={() => handleDeleteService(service._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {(!filteredServices || filteredServices.length === 0) && (
                <div className="d-empty">
                    <h3>No services found</h3>
                    <p>Try adjusting your search.</p>
                </div>
            )}

            {/* Update Modal */}
            {selectedForUpdate && (
                <div className="d-modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setSelectedForUpdate(null); }}>
                    <div className="d-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="d-modal-header">
                            <h2 className="d-modal-title">Update Service</h2>
                            <button className="d-modal-close" onClick={() => setSelectedForUpdate(null)}>
                                <CgClose />
                            </button>
                        </div>
                        <div className="d-modal-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="d-form-field">
                                    <label className="d-label">Service Name</label>
                                    <input type="text" className="d-input" {...register("name", { required: "Service name is required" })} />
                                    {errors.name && <span className="d-error-text">{errors.name.message}</span>}
                                </div>
                                <div className="d-form-field">
                                    <label className="d-label">Image URL</label>
                                    <input type="text" className="d-input" {...register("image")} />
                                </div>
                                <div className="d-form-field">
                                    <label className="d-label">Description</label>
                                    <textarea className="d-textarea" {...register("description", { required: "Description is required" })} />
                                    {errors.description && <span className="d-error-text">{errors.description.message}</span>}
                                </div>
                                <div className="d-form-field">
                                    <label className="d-label">Category</label>
                                    <select className="d-select" {...register("category", { required: "Category is required" })}>
                                        <option disabled value="">Select Category</option>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    {errors.category && <span className="d-error-text">{errors.category.message}</span>}
                                </div>
                                <div className="d-form-field">
                                    <label className="d-label">Price</label>
                                    <input type="text" className="d-input" {...register("price", { required: "Price is required" })} />
                                    {errors.price && <span className="d-error-text">{errors.price.message}</span>}
                                </div>
                                <div className="d-field-row">
                                    <div className="d-form-field">
                                        <label className="d-label">Min</label>
                                        <input type="number" className="d-input" {...register("min", { required: "Minimum value is required", min: { value: 10, message: "Must be at least 10" } })} />
                                        {errors.min && <span className="d-error-text">{errors.min.message}</span>}
                                    </div>
                                    <div className="d-form-field">
                                        <label className="d-label">Max</label>
                                        <input type="number" className="d-input" {...register("max", { required: "Maximum value is required", validate: (value) => value > 10 || "Maximum must be greater than 10" })} />
                                        {errors.max && <span className="d-error-text">{errors.max.message}</span>}
                                    </div>
                                </div>
                                <div className="d-form-field">
                                    <label className="d-label">Average Time (in hours)</label>
                                    <input type="text" className="d-input" {...register("avgTime", { required: "Average time is required", min: { value: 1, message: "Time must be at least 1 hour" } })} />
                                    {errors.avgTime && <span className="d-error-text">{errors.avgTime.message}</span>}
                                </div>
                                <div className="d-modal-footer" style={{ padding: 0, marginTop: 8 }}>
                                    <button type="button" className="d-btn d-btn-ghost" onClick={() => setSelectedForUpdate(null)}>Close</button>
                                    <button type="submit" className="d-btn d-btn-primary">Update Service</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .ms-table-wrap { display: none; }
                .ms-cards { display: block; }
                @media (min-width: 768px) {
                    .ms-table-wrap { display: block; }
                    .ms-cards { display: none; }
                }
            `}</style>
        </div>
    );
};

export default ManageService;
