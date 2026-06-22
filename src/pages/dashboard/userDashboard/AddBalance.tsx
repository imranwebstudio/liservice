/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../dashboard.css";

const AddBalance: React.FC = () => {
    const [method, setMethod] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [accepted, setAccepted] = useState<boolean>(false);

    const calculateTotal = (inputAmount: string) => {
        const parsedAmount = parseFloat(inputAmount);
        if (!parsedAmount || isNaN(parsedAmount)) return;

        setAmount(parsedAmount);
        const calculatedFee = Math.round(parsedAmount * 126);
        setTotal(calculatedFee);
    };

    return (
        <div className="d-page" style={{ background: 'transparent' }}>
            <div className="d-page-header">
                <h1 className="d-page-title">Add Balance</h1>
                <p className="d-page-sub">Choose your payment method and enter the amount to add.</p>
            </div>

            <div className="d-card" style={{ maxWidth: 540 }}>
                <div style={{ padding: '24px' }}>

                    {/* Payment Method */}
                    <div className="d-form-field">
                        <label className="d-label">Payment Method</label>
                        <select
                            required
                            value={method}
                            onChange={(e) => setMethod(e.target.value)}
                            className="d-select"
                        >
                            <option disabled value="">Pick your payment method</option>
                            <option value="Binance">Binance</option>
                            <option value="Bkash">Bkash</option>
                            <option value="Nagad">Nagad</option>
                            <option value="Rocket">Rocket</option>
                            <option value="stc">STC Pay</option>
                        </select>
                    </div>

                    {/* Dollar Amount */}
                    <div className="d-form-field">
                        <label className="d-label">Dollar Amount</label>
                        <input
                            type="text"
                            className="d-input"
                            placeholder="Enter amount in Dollar $"
                            onChange={(e) => calculateTotal(e.target.value)}
                        />
                    </div>

                    {/* Extra Fee */}
                    <div className="d-form-field">
                        <label className="d-label" style={{ textDecoration: 'line-through' }}>Extra Fee (1.85%)</label>
                        <input
                            placeholder="NO EXTRA FEE"
                            readOnly
                            type="text"
                            className="d-input"
                            style={{ opacity: 0.6 }}
                        />
                    </div>

                    {/* Total */}
                    <div className="d-form-field">
                        <label className="d-label">Total Price in Taka</label>
                        <input
                            value={total.toFixed(2)}
                            placeholder="Total Price in taka"
                            readOnly
                            type="text"
                            className="d-input"
                            style={{ color: '#1fbf6c', fontWeight: 600 }}
                        />
                    </div>

                    {/* Terms */}
                    <div className="d-form-field">
                        <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                className="d-checkbox"
                                onChange={() => setAccepted(!accepted)}
                            />
                            <span style={{ fontSize: 14, color: '#aebcb2' }}>Accept the terms and conditions</span>
                        </label>
                    </div>

                    {/* Submit */}
                    <div style={{ marginTop: 8 }}>
                        {accepted && method && amount ? (
                            <Link
                                to="/payment"
                                state={{ method, amount, total }}
                                className="d-btn d-btn-primary"
                                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                            >
                                Go to Payment
                            </Link>
                        ) : (
                            <button className="d-btn d-btn-primary" disabled style={{ width: '100%' }}>
                                Go to Payment
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBalance;
