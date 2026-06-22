import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import bkash from "../../../assets/BKash-bKash-Logo.wine.svg";
import nagad from "../../../assets/nagad.png";
import rocket from "../../../assets/rocket.png";
import Binance from "../../../assets/binance.jpg";
import logo from "../../../assets/logoWhite.png";
import stcPaymentInfo from "../../../assets/stcpay.png";
import { useAddBalanceMutation } from "../../../redux/features/balance/balance.api";
import Swal from "sweetalert2";
import "../dashboard.css";

const methodBgColor = (method: string): string => {
    if (method === "Nagad") return "#c0392b";
    if (method === "Bkash") return "#c2185b";
    if (method === "stc") return "#01c48c";
    if (method === "Binance") return "#f3ba2f";
    return "#7b1fa2";
};

const PaymentPage = () => {
    const binanceLogo = "https://cdn.freebiesupply.com/logos/large/2x/binance-coin-logo-svg-vector.svg";
    const stcPayLogo = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Stc_pay.svg/1280px-Stc_pay.svg.png";

    const location = useLocation();
    const { method, amount, total } = location.state || {};
    const [reference, setReference] = useState<string>("");
    const [addBalance] = useAddBalanceMutation();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        Swal.fire({
            title: 'Processing...',
            text: 'Please wait while we process your request',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        try {
            const balanceData = {
                amount: Number(amount),
                paidTaka: Number(total),
                paymentMethod: method,
                reference
            };

            await addBalance(balanceData).unwrap();

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Balance request Posted Successfully',
            });
            navigate("/dashboard");
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Balance request Failed',
            });
        }
    };

    return (
        <div className="d-page" style={{ background: 'transparent' }}>
            <div className="d-page-header">
                <h1 className="d-page-title">Complete Payment</h1>
                <p className="d-page-sub">Follow the steps below to complete your balance top-up.</p>
            </div>

            <div className="d-payment-card">
                <div style={{ padding: '24px' }}>

                    {/* Method logo */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                        <img
                            style={{ width: 140, maxHeight: 80, objectFit: 'contain' }}
                            src={
                                method === "Nagad" ? nagad
                                : method === "Rocket" ? rocket
                                : method === "Binance" ? binanceLogo
                                : method === "stc" ? stcPayLogo
                                : bkash
                            }
                            alt={method || "payment"}
                        />
                    </div>

                    {/* Info card */}
                    <div className="d-payment-info-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <img
                                style={{ borderRadius: '50%', width: 56, background: '#000', padding: 4 }}
                                src={logo}
                                alt="logo"
                            />
                            <div>
                                <p style={{ fontWeight: 600, color: '#e8f5ec', margin: 0, fontSize: 14 }}>liservice24.com</p>
                                <p style={{ color: '#74877b', margin: 0, fontSize: 12 }}>Official payment portal</p>
                            </div>
                        </div>
                        <div style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 24,
                            fontWeight: 700,
                            color: '#1fbf6c',
                        }}>
                            ${amount}
                        </div>
                    </div>

                    {/* Instructions strip */}
                    <div
                        className="d-payment-method-strip"
                        style={{ background: methodBgColor(method), borderRadius: 12, padding: 16 }}
                    >
                        {method === "Binance" ? (
                            <div style={{ background: '#f3ba2f', borderRadius: 10, padding: 12, display: 'flex', justifyContent: 'center' }}>
                                <img src={Binance} alt="Binance" style={{ maxWidth: '100%' }} />
                            </div>
                        ) : method === "stc" ? (
                            <div style={{ background: '#fff', borderRadius: 10, padding: 12, display: 'flex', justifyContent: 'center' }}>
                                <img src={stcPaymentInfo} alt="STC Pay" style={{ maxWidth: '100%' }} />
                            </div>
                        ) : (
                            <ul style={{ listStyle: 'disc', paddingLeft: 20, margin: 0 }}>
                                <li style={{ borderBottom: '1px solid rgba(255,165,0,0.4)', fontSize: 13, padding: '10px 0', color: '#fff' }}>
                                    {method === "Nagad" ? "*167#" : method === "Bkash" ? "*247#" : "*322#"} ডায়াল করে আপনার {method} মোবাইল মেনুতে যান অথবা {method} অ্যাপে যান ৷
                                </li>
                                <li style={{ borderBottom: '1px solid rgba(255,165,0,0.4)', fontSize: 13, padding: '10px 0', color: '#fff' }}>
                                    <span style={{ color: '#fbbf24', fontWeight: 700 }}>"Send Money" </span>ক্লিক করুন ৷
                                </li>
                                <li style={{ borderBottom: '1px solid rgba(255,165,0,0.4)', fontSize: 13, padding: '10px 0', color: '#fff' }}>
                                    প্রাপক নম্বর হিসেবে ওই নম্বর লিখুন{" "}
                                    <span style={{ color: '#fbbf24', fontWeight: 700 }}>
                                        {method === "Nagad" ? "01688943310" : method === "Bkash" ? "01618616066" : "018774443699"}
                                    </span>
                                </li>
                                <li style={{ borderBottom: '1px solid rgba(255,165,0,0.4)', fontSize: 13, padding: '10px 0', color: '#fff' }}>
                                    টাকার পরিমান{" "}
                                    <span style={{ color: '#fbbf24', fontWeight: 700 }}>৳{total}</span>
                                </li>
                                <li style={{ borderBottom: '1px solid rgba(255,165,0,0.4)', fontSize: 13, padding: '10px 0', color: '#fff' }}>
                                    নিশ্চিত করতে এখন আপনার {method} মোবাইল মেনু পিন লিখুন ৷
                                </li>
                                <li style={{ borderBottom: '1px solid rgba(255,165,0,0.4)', fontSize: 13, padding: '10px 0', color: '#fff' }}>
                                    সবকিছু ঠিক থাকলে আপনি {method} থেকে একটা নিশ্চিতকরণ বার্তা পাবেন ৷
                                </li>
                                <li style={{ fontSize: 13, padding: '10px 0', color: '#fff' }}>
                                    এখন উপরের বক্সে আপনার{" "}
                                    <span style={{ color: '#fbbf24', fontWeight: 700 }}>Transaction ID </span>
                                    দিন এবং নিচের{" "}
                                    <span style={{ color: '#fbbf24', fontWeight: 700 }}>VERIFY </span>
                                    বাটনে ক্লিক করুন ৷
                                </li>
                            </ul>
                        )}

                        <p style={{ textAlign: 'center', color: '#fff', fontWeight: 600, marginTop: 12, marginBottom: 8, fontSize: 13 }}>
                            ট্রানজেকশন আইডি দিন
                        </p>
                        <input
                            className="d-input"
                            type="text"
                            placeholder="ট্রানজেকশন আইডি দিন"
                            onChange={(e) => setReference(e.target.value)}
                        />
                    </div>

                    {/* Verify button */}
                    <div style={{ marginTop: 20 }}>
                        <button
                            disabled={!reference}
                            onClick={handleSubmit}
                            className="d-btn d-btn-primary"
                            style={{ width: '100%', fontSize: 15, padding: '13px' }}
                        >
                            VERIFY
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
