/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";
import { useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import Loading from "../../../utils/Loading";
import CloudinaryUpload from "../../../components/CloudinaryUpload";
import "../dashboard.css";
import {
    useGetPaymentMethodsAdminQuery,
    useGetPaymentConfigQuery,
    useCreatePaymentMethodMutation,
    useUpdatePaymentMethodMutation,
    useDeletePaymentMethodMutation,
    useUpdatePaymentConfigMutation,
} from "../../../redux/features/payment/paymentMethod.api";

interface MethodForm {
    name:     string;
    color:    string;
    iconUrl:  string;
    qrCode:   string;
    number:   string;
    steps:    string;
    isActive: boolean;
}

interface ConfigForm {
    rate:    number;
    feeRate: number;
}

/* Renders icon: image if iconUrl looks like a URL, otherwise first letter of name */
function MethodIcon({ iconUrl, name, color, size = 32 }: { iconUrl?: string; name: string; color: string; size?: number }) {
    const isUrl = iconUrl && (iconUrl.startsWith('http') || iconUrl.startsWith('/') || iconUrl.startsWith('data:'));
    if (isUrl) {
        return (
            <span className="rounded-lg overflow-hidden shrink-0 flex items-center justify-center"
                style={{ width: size, height: size, background: color }}>
                <img src={iconUrl} alt={name} style={{ width: size, height: size, objectFit: 'contain' }} />
            </span>
        );
    }
    return (
        <span className="rounded-lg flex items-center justify-center text-sm font-bold text-white shrink-0"
            style={{ width: size, height: size, background: color }}>
            {name?.charAt(0)?.toUpperCase() ?? '?'}
        </span>
    );
}

const ManagePaymentMethods = () => {
    const [editTarget, setEditTarget] = useState<any>(null);
    const [showForm, setShowForm]     = useState(false);

    const { data: methodsData, isLoading } = useGetPaymentMethodsAdminQuery(undefined);
    const { data: configData }             = useGetPaymentConfigQuery(undefined);
    const [createMethod]  = useCreatePaymentMethodMutation();
    const [updateMethod]  = useUpdatePaymentMethodMutation();
    const [deleteMethod]  = useDeletePaymentMethodMutation();
    const [updateConfig]  = useUpdatePaymentConfigMutation();

    const methods: any[] = methodsData?.data ?? [];
    const config         = configData?.data  ?? { rate: 137, feeRate: 0.0185 };

    const { register, handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm<MethodForm>();
    const { register: regCfg, handleSubmit: handleCfg, formState: { isSubmitting: cfgSubmitting } } = useForm<ConfigForm>({
        values: { rate: config.rate, feeRate: config.feeRate },
    });

    /* live preview values */
    const watchedIconUrl = useWatch({ control, name: 'iconUrl', defaultValue: '' });
    const watchedColor   = useWatch({ control, name: 'color',   defaultValue: '#1fbf6c' });
    const watchedName    = useWatch({ control, name: 'name',    defaultValue: '' });

    const openCreate = () => {
        setEditTarget(null);
        reset({ name: '', color: '#1fbf6c', iconUrl: '', qrCode: '', number: '', steps: '', isActive: true });
        setShowForm(true);
    };

    const openEdit = (m: any) => {
        setEditTarget(m);
        reset({
            name:    m.name,
            color:   m.color,
            iconUrl: m.iconUrl ?? '',
            qrCode:  m.qrCode  ?? '',
            number:  m.number,
            steps:   (m.steps as string[]).join('\n'),
            isActive: m.isActive,
        });
        setShowForm(true);
    };

    const onSubmitMethod = async (data: MethodForm) => {
        const payload = {
            ...data,
            steps: data.steps.split('\n').map((s: string) => s.trim()).filter(Boolean),
        };
        try {
            if (editTarget) {
                await updateMethod({ id: editTarget._id, ...payload }).unwrap();
                Swal.fire({ icon: 'success', title: 'Updated!', timer: 1500, showConfirmButton: false });
            } else {
                await createMethod(payload).unwrap();
                Swal.fire({ icon: 'success', title: 'Created!', timer: 1500, showConfirmButton: false });
            }
            setShowForm(false);
            setEditTarget(null);
        } catch {
            Swal.fire({ icon: 'error', title: 'Failed', text: 'Something went wrong.' });
        }
    };

    const handleDelete = (id: string, name: string) => {
        Swal.fire({
            title: `Delete "${name}"?`,
            text: 'This cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#149656',
            confirmButtonText: 'Delete',
        }).then(async (res) => {
            if (res.isConfirmed) {
                try {
                    await deleteMethod(id).unwrap();
                    Swal.fire({ icon: 'success', title: 'Deleted!', timer: 1200, showConfirmButton: false });
                } catch {
                    Swal.fire({ icon: 'error', title: 'Error', text: 'Delete failed.' });
                }
            }
        });
    };

    const onSaveConfig = async (data: ConfigForm) => {
        try {
            await updateConfig({ rate: Number(data.rate), feeRate: Number(data.feeRate) }).unwrap();
            Swal.fire({ icon: 'success', title: 'Config Saved!', timer: 1500, showConfirmButton: false });
        } catch {
            Swal.fire({ icon: 'error', title: 'Failed', text: 'Could not save config.' });
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="d-page" style={{ background: 'transparent' }}>

            {/* ── Header ── */}
            <div className="d-card mb-4">
                <div className="d-card-header">
                    <div>
                        <h1 className="d-card-title">Payment Methods</h1>
                        <p className="d-card-sub">Add, edit, or remove payment options shown to users</p>
                    </div>
                    <button className="d-btn d-btn-primary" onClick={openCreate}>+ Add Method</button>
                </div>
            </div>

            {/* ── Methods list ── */}
            <div className="d-card mb-4">
                {methods.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-3">
                        <span className="text-4xl opacity-30">💳</span>
                        <p className="d-card-sub">No payment methods yet. Click "+ Add Method" to create one.</p>
                    </div>
                ) : (
                    <>
                        {/* Desktop table */}
                        <div className="pm-table-wrap d-table-wrap">
                            <table className="d-table w-full">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Icon / Name</th>
                                        <th>Number</th>
                                        <th>Steps</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {methods.map((m: any, i: number) => (
                                        <tr key={m._id}>
                                            <td className="text-(--db-t2) text-sm">{i + 1}</td>
                                            <td>
                                                <div className="flex items-center gap-2.5">
                                                    <MethodIcon iconUrl={m.iconUrl} name={m.name} color={m.color} size={32} />
                                                    <span className="d-td-primary font-semibold">{m.name}</span>
                                                </div>
                                            </td>
                                            <td className="text-sm text-(--db-t1) font-mono">{m.number}</td>
                                            <td className="text-sm text-(--db-t2)">{m.steps?.length ?? 0} steps</td>
                                            <td>
                                                <span className={`d-badge ${m.isActive ? 'd-badge-green' : 'd-badge-red'}`}>
                                                    {m.isActive ? 'Active' : 'Hidden'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="flex gap-2">
                                                    <button className="d-btn d-btn-amber d-btn-sm" onClick={() => openEdit(m)}>Edit</button>
                                                    <button className="d-btn d-btn-danger d-btn-sm" onClick={() => handleDelete(m._id, m.name)}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile cards */}
                        <div className="pm-cards" style={{ padding: 16 }}>
                            {methods.map((m: any, i: number) => (
                                <div key={m._id} className="d-mobile-card">
                                    <div className="d-mobile-card-row">
                                        <span className="d-mobile-card-label">#{i + 1} Method</span>
                                        <div className="flex items-center gap-2">
                                            <MethodIcon iconUrl={m.iconUrl} name={m.name} color={m.color} size={22} />
                                            <span className="d-mobile-card-value" style={{ color: '#e8f5ec' }}>{m.name}</span>
                                        </div>
                                    </div>
                                    <div className="d-mobile-card-row">
                                        <span className="d-mobile-card-label">Number</span>
                                        <span className="d-mobile-card-value" style={{ fontFamily: 'monospace' }}>{m.number}</span>
                                    </div>
                                    <div className="d-mobile-card-row">
                                        <span className="d-mobile-card-label">Steps</span>
                                        <span className="d-mobile-card-value">{m.steps?.length ?? 0} steps</span>
                                    </div>
                                    <div className="d-mobile-card-row">
                                        <span className="d-mobile-card-label">Status</span>
                                        <span className={`d-badge ${m.isActive ? 'd-badge-green' : 'd-badge-red'}`}>
                                            {m.isActive ? 'Active' : 'Hidden'}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                                        <button className="d-btn d-btn-amber d-btn-sm" style={{ flex: 1 }} onClick={() => openEdit(m)}>Edit</button>
                                        <button className="d-btn d-btn-danger d-btn-sm" style={{ flex: 1 }} onClick={() => handleDelete(m._id, m.name)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* ── Rate & Fee config ── */}
            <div className="d-card mb-4">
                <div className="d-card-header">
                    <div>
                        <h2 className="d-card-title">Rate & Fee Config</h2>
                        <p className="d-card-sub">Applied globally across all payment methods</p>
                    </div>
                </div>
                <form onSubmit={handleCfg(onSaveConfig)} className="p-6">
                    <div className="d-field-row">
                        <div className="d-form-field">
                            <label className="d-label">Conversion Rate (BDT per $1)</label>
                            <input className="d-input" type="number" step="0.01" min="1"
                                {...regCfg('rate', { required: true, min: 1 })} />
                        </div>
                        <div className="d-form-field">
                            <label className="d-label">Fee Rate (e.g. 0.0185 = 1.85%)</label>
                            <input className="d-input" type="number" step="0.0001" min="0" max="1"
                                {...regCfg('feeRate', { required: true, min: 0, max: 1 })} />
                        </div>
                    </div>
                    <button type="submit" className="d-btn d-btn-primary" disabled={cfgSubmitting}>
                        {cfgSubmitting ? 'Saving…' : 'Save Config'}
                    </button>
                </form>
            </div>

            {/* ── Create / Edit modal ── */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[20px] border border-white/[0.07] bg-[#0b160f]">
                        <div className="d-card-header sticky top-0 bg-[#0b160f] z-10">
                            <h2 className="d-card-title">{editTarget ? 'Edit Method' : 'New Method'}</h2>
                            <button className="d-btn d-btn-ghost d-btn-sm" onClick={() => setShowForm(false)}>✕ Cancel</button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmitMethod)} className="p-6 flex flex-col gap-4">

                            <div className="d-form-field">
                                <label className="d-label">Name (e.g. bKash)</label>
                                <input className="d-input" placeholder="bKash" {...register('name', { required: 'Name is required' })} />
                                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                            </div>

                            {/* Icon URL + color + live preview */}
                            <div className="d-form-field">
                                <label className="d-label">Icon Image URL</label>
                                <div className="flex gap-3 items-center">
                                    {/* preview */}
                                    <MethodIcon iconUrl={watchedIconUrl} name={watchedName} color={watchedColor} size={44} />
                                    <input className="d-input" type="url"
                                        placeholder="https://example.com/bkash-icon.png"
                                        {...register('iconUrl')} />
                                </div>
                                <p className="text-(--db-t2) text-xs mt-1.5">Paste a direct image link (.png, .svg, .webp). Leave blank to use the first letter of the name.</p>
                            </div>

                            <div className="d-form-field">
                                <label className="d-label">Brand Color (used as background)</label>
                                <div className="">
                                    <input className="d-input h-11 p-1 cursor-pointer w-20 shrink-0" type="color"
                                        {...register('color', { required: true })} /> <br/>
                                    <span className="text-(--db-t2) text-sm">Used as icon background and accent</span>
                                </div>
                            </div>

                            <div className="d-form-field">
                                <label className="d-label">QR Code <span className="text-(--db-t2) font-normal">(optional)</span></label>
                                <Controller
                                    control={control}
                                    name="qrCode"
                                    render={({ field }) => (
                                        <CloudinaryUpload
                                            value={field.value}
                                            onChange={field.onChange}
                                            previewSize={140}
                                            placeholder="Click or drag QR code image here"
                                        />
                                    )}
                                />
                            </div>

                            <div className="d-form-field">
                                <label className="d-label">Account Number</label>
                                <input className="d-input" placeholder="01XXXXXXXXX"
                                    {...register('number', { required: 'Number is required' })} />
                                {errors.number && <p className="text-red-400 text-xs mt-1">{errors.number.message}</p>}
                            </div>

                            <div className="d-form-field">
                                <label className="d-label">
                                    Steps — one per line. Use <code className="text-green-400">{'{number}'}</code> and <code className="text-green-400">{'{amount}'}</code> as placeholders.
                                </label>
                                <textarea className="d-textarea" rows={6}
                                    placeholder={"Dial *247# or open the bKash app.\nTap \"Send Money\".\nEnter number {number}.\nEnter amount {amount}.\nConfirm with your PIN.\nPaste your Transaction ID below."}
                                    {...register('steps', { required: 'Add at least one step' })} />
                                {errors.steps && <p className="text-red-400 text-xs mt-1">{errors.steps.message}</p>}
                            </div>

                            <label className="flex items-center gap-3 cursor-pointer select-none">
                                <input type="checkbox" className="w-4 h-4 accent-green-500" {...register('isActive')} />
                                <span className="d-label mb-0">Active (visible to users)</span>
                            </label>

                            <div className="flex gap-3 pt-2 pb-1">
                                <button type="submit" className="d-btn d-btn-primary flex-1" disabled={isSubmitting}>
                                    {isSubmitting ? 'Saving…' : editTarget ? 'Save Changes' : 'Create Method'}
                                </button>
                                <button type="button" className="d-btn d-btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
                .pm-table-wrap { display: none; }
                .pm-cards      { display: block; }
                @media (min-width: 768px) {
                    .pm-table-wrap { display: block !important; }
                    .pm-cards      { display: none   !important; }
                }
            `}</style>
        </div>
    );
};

export default ManagePaymentMethods;
