/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateServiceMutation } from "../../../redux/features/service/service.api";
import Swal from "sweetalert2";

export interface FormValues {
    _id: string;
    name: string;
    image?: string;
    userId?: string[];
    description: string;
    category: string;
    price: number;
    min: number;
    max: number;
    avgTime: number;
    isDeleted?: boolean;
}

export const catagories = [
    "feature", "facebook", "instagram", "youtube", "tiktok",
    "telegram", "linkedin", "twitter", "whatsapp", "snapchat",
];

const CATEGORY_ICONS: Record<string, string> = {
    feature: "⭐", facebook: "📘", instagram: "📸", youtube: "▶️",
    tiktok: "🎵", telegram: "✈️", linkedin: "💼", twitter: "🐦",
    whatsapp: "💬", snapchat: "👻",
};

const fieldBase: React.CSSProperties = {
    width: '100%',
    background: 'var(--db-input)',
    border: '1px solid var(--db-line2)',
    borderRadius: 10,
    padding: '10px 14px',
    fontSize: 14,
    color: 'var(--db-t0)',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: "'Inter', sans-serif",
};

const labelBase: React.CSSProperties = {
    display: 'block',
    fontSize: 12.5,
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    color: 'var(--db-t2)',
    marginBottom: 7,
};

const AddServices: React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
    const [addService, { isLoading }] = useCreateServiceMutation();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const serviceData = {
            name: data.name,
            image: data.image,
            description: data.description,
            price: Number(data.price),
            category: data.category,
            min: Number(data.min),
            max: Number(data.max),
            avgTime: data.avgTime,
            isDeleted: false,
        };

        Swal.fire({
            title: 'Adding Service…',
            text: 'Please wait',
            allowOutsideClick: false,
            background: '#0c1310',
            color: '#f3fbf5',
            didOpen: () => Swal.showLoading(),
        });

        try {
            await addService(serviceData).unwrap();
            reset();
            Swal.fire({
                icon: 'success',
                title: 'Service Added!',
                text: 'The service has been successfully created.',
                background: '#0c1310',
                color: '#f3fbf5',
                iconColor: '#34d97e',
                confirmButtonColor: '#34d97e',
            });
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: 'There was an error creating the service. Please try again.',
                background: '#0c1310',
                color: '#f3fbf5',
                iconColor: '#f4677a',
                confirmButtonColor: '#f4677a',
            });
        }
    };

    return (
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
            {/* Card */}
            <div style={{
                background: 'linear-gradient(160deg, var(--db-bg1) 0%, var(--db-bg0) 100%)',
                border: '1px solid var(--db-line)',
                borderRadius: 20,
                overflow: 'hidden',
            }}>
                {/* Card header */}
                <div style={{
                    padding: '22px 28px 20px',
                    borderBottom: '1px solid var(--db-line)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                }}>
                    <span style={{
                        width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                        background: 'rgba(52,217,126,0.12)',
                        border: '1px solid rgba(52,217,126,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d97e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                    </span>
                    <div>
                        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, color: 'var(--db-t0)', margin: 0 }}>
                            Add New Service
                        </h2>
                        <p style={{ fontSize: 13, color: 'var(--db-t2)', margin: 0 }}>
                            Fill in the details below to create a new service listing
                        </p>
                    </div>
                </div>

                {/* Form body */}
                <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

                    {/* Service Name */}
                    <div>
                        <label style={labelBase}>Service Name <span style={{ color: 'var(--db-red)' }}>*</span></label>
                        <input
                            type="text"
                            placeholder="e.g. Instagram Followers – Real & Active"
                            style={fieldBase}
                            onFocus={e => (e.target.style.borderColor = '#34d97e')}
                            onBlur={e => (e.target.style.borderColor = 'var(--db-line2)')}
                            {...register("name", { required: "Service name is required" })}
                        />
                        {errors.name && <p style={{ margin: '5px 0 0', fontSize: 12.5, color: 'var(--db-red)' }}>{errors.name.message}</p>}
                    </div>

                    {/* Image URL */}
                    <div>
                        <label style={labelBase}>Image URL <span style={{ fontSize: 11, fontWeight: 400, textTransform: 'none', color: 'var(--db-t2)' }}>(optional)</span></label>
                        <input
                            type="text"
                            placeholder="https://..."
                            style={fieldBase}
                            onFocus={e => (e.target.style.borderColor = '#34d97e')}
                            onBlur={e => (e.target.style.borderColor = 'var(--db-line2)')}
                            {...register("image")}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label style={labelBase}>Description <span style={{ color: 'var(--db-red)' }}>*</span></label>
                        <textarea
                            rows={3}
                            placeholder="Describe what this service provides…"
                            style={{ ...fieldBase, resize: 'vertical', minHeight: 88, lineHeight: 1.6 }}
                            onFocus={e => (e.target.style.borderColor = '#34d97e')}
                            onBlur={e => (e.target.style.borderColor = 'var(--db-line2)')}
                            {...register("description", { required: "Description is required" })}
                        />
                        {errors.description && <p style={{ margin: '5px 0 0', fontSize: 12.5, color: 'var(--db-red)' }}>{errors.description.message}</p>}
                    </div>

                    {/* Category */}
                    <div>
                        <label style={labelBase}>Category <span style={{ color: 'var(--db-red)' }}>*</span></label>
                        <select
                            style={{ ...fieldBase, cursor: 'pointer' }}
                            onFocus={e => (e.target.style.borderColor = '#34d97e')}
                            onBlur={e => (e.target.style.borderColor = 'var(--db-line2)')}
                            {...register("category", { required: "Category is required" })}
                        >
                            <option value="" disabled>Select a category…</option>
                            {catagories.map(cat => (
                                <option key={cat} value={cat} style={{ background: '#0c1310' }}>
                                    {CATEGORY_ICONS[cat]} {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                        {errors.category && <p style={{ margin: '5px 0 0', fontSize: 12.5, color: 'var(--db-red)' }}>{errors.category.message}</p>}
                    </div>

                    {/* Divider */}
                    <div style={{ borderTop: '1px solid var(--db-line)', margin: '0 -2px' }} />

                    {/* 2-col grid: Price + Avg Time */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div>
                            <label style={labelBase}>Price (USD) <span style={{ color: 'var(--db-red)' }}>*</span></label>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                style={fieldBase}
                                onFocus={e => (e.target.style.borderColor = '#34d97e')}
                                onBlur={e => (e.target.style.borderColor = 'var(--db-line2)')}
                                {...register("price", { required: "Price is required", min: { value: 0, message: "Must be positive" } })}
                            />
                            {errors.price && <p style={{ margin: '5px 0 0', fontSize: 12.5, color: 'var(--db-red)' }}>{errors.price.message}</p>}
                        </div>
                        <div>
                            <label style={labelBase}>Avg. Time (hours) <span style={{ color: 'var(--db-red)' }}>*</span></label>
                            <input
                                type="number"
                                placeholder="e.g. 24"
                                style={fieldBase}
                                onFocus={e => (e.target.style.borderColor = '#34d97e')}
                                onBlur={e => (e.target.style.borderColor = 'var(--db-line2)')}
                                {...register("avgTime", { required: "Avg time is required", min: { value: 1, message: "At least 1 hour" } })}
                            />
                            {errors.avgTime && <p style={{ margin: '5px 0 0', fontSize: 12.5, color: 'var(--db-red)' }}>{errors.avgTime.message}</p>}
                        </div>
                    </div>

                    {/* 2-col grid: Min + Max */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div>
                            <label style={labelBase}>Min Order <span style={{ color: 'var(--db-red)' }}>*</span></label>
                            <input
                                type="number"
                                placeholder="e.g. 100"
                                style={fieldBase}
                                onFocus={e => (e.target.style.borderColor = '#34d97e')}
                                onBlur={e => (e.target.style.borderColor = 'var(--db-line2)')}
                                {...register("min", { required: "Min is required", min: { value: 10, message: "At least 10" } })}
                            />
                            {errors.min && <p style={{ margin: '5px 0 0', fontSize: 12.5, color: 'var(--db-red)' }}>{errors.min.message}</p>}
                        </div>
                        <div>
                            <label style={labelBase}>Max Order <span style={{ color: 'var(--db-red)' }}>*</span></label>
                            <input
                                type="number"
                                placeholder="e.g. 10000"
                                style={fieldBase}
                                onFocus={e => (e.target.style.borderColor = '#34d97e')}
                                onBlur={e => (e.target.style.borderColor = 'var(--db-line2)')}
                                {...register("max", { required: "Max is required", validate: v => Number(v) > 10 || "Must be greater than 10" })}
                            />
                            {errors.max && <p style={{ margin: '5px 0 0', fontSize: 12.5, color: 'var(--db-red)' }}>{errors.max.message}</p>}
                        </div>
                    </div>

                    {/* Submit */}
                    <div style={{ paddingTop: 4 }}>
                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                height: 46,
                                borderRadius: 12,
                                border: 'none',
                                background: isLoading ? 'rgba(52,217,126,0.35)' : 'linear-gradient(90deg,#34d97e,#2dd4cf)',
                                color: '#06150d',
                                fontWeight: 700,
                                fontSize: 14.5,
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 8,
                                transition: 'opacity 0.2s',
                                fontFamily: "'Space Grotesk',sans-serif",
                            }}
                        >
                            {isLoading ? (
                                <>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                                    </svg>
                                    Adding…
                                </>
                            ) : (
                                <>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                                    </svg>
                                    Add Service
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddServices;
