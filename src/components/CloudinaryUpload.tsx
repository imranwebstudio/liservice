import { useRef, useState } from "react";
import { store } from "../redux/store";

interface Props {
    value?: string;
    onChange: (url: string) => void;
    previewSize?: number;
    placeholder?: string;
}

async function getSignature() {
    const tokenObj  = (store.getState().auth as any)?.tokens as { accessToken: string } | null;
    const token     = tokenObj?.accessToken;
    const base      = import.meta.env.VITE_BASE_API_URL ?? "http://localhost:5000";
    const res       = await fetch(`${base}/api/v1/upload/sign`, {
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error("Failed to get upload signature");
    const json = await res.json();
    return json.data as {
        timestamp:  number;
        signature:  string;
        folder:     string;
        api_key:    string;
        cloud_name: string;
    };
}

export default function CloudinaryUpload({ value, onChange, previewSize = 120, placeholder = "Click or drag image here" }: Props) {
    const inputRef                  = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError]         = useState("");

    const upload = async (file: File) => {
        setUploading(true);
        setError("");
        try {
            const sig  = await getSignature();
            const form = new FormData();
            form.append("file",      file);
            form.append("timestamp", String(sig.timestamp));
            form.append("signature", sig.signature);
            form.append("api_key",   sig.api_key);
            form.append("folder",    sig.folder);

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${sig.cloud_name}/image/upload`,
                { method: "POST", body: form }
            );
            if (!res.ok) throw new Error("Upload failed");
            const data = await res.json();
            onChange(data.secure_url as string);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Upload error");
        } finally {
            setUploading(false);
        }
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) upload(file);
        e.target.value = "";
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) upload(file);
    };

    return (
        <div className="flex flex-col gap-2">
            <div
                onClick={() => !uploading && inputRef.current?.click()}
                onDragOver={e => e.preventDefault()}
                onDrop={onDrop}
                className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-(--db-line2) bg-(--db-input) cursor-pointer transition-colors hover:border-(--db-g5) hover:bg-[rgba(31,191,108,0.05)]"
                style={{ minHeight: previewSize + 32, padding: 12 }}
            >
                {uploading ? (
                    <span className="text-(--db-t2) text-sm animate-pulse">Uploading…</span>
                ) : value ? (
                    <img src={value} alt="uploaded"
                        className="object-contain rounded-lg bg-white"
                        style={{ width: previewSize, height: previewSize }} />
                ) : (
                    <>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-(--db-t2)">
                            <rect x="3" y="3" width="18" height="18" rx="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                        </svg>
                        <span className="text-(--db-t2) text-xs text-center">{placeholder}</span>
                    </>
                )}
            </div>

            {value && !uploading && (
                <button type="button" onClick={() => onChange("")}
                    className="text-xs text-red-400 hover:text-red-300 self-start transition-colors">
                    ✕ Remove image
                </button>
            )}

            {error && <p className="text-red-400 text-xs">{error}</p>}
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
        </div>
    );
}
