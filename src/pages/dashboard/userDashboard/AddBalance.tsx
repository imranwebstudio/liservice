/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddBalance: React.FC = () => {
    const [method, setMethod] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [extraFee, setExtraFee] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    // Calculate extra fee (1.85%) and total
    const calculateTotal = (inputAmount: string) => {
        const parsedAmount = parseFloat(inputAmount);
        if (!parsedAmount || isNaN(parsedAmount)) return;

        setAmount(parsedAmount);
        const calculatedFee = Math.round(parsedAmount * 0.0185); // Extra fee (1.85%)
        setExtraFee(calculatedFee);
        setTotal(parsedAmount + calculatedFee);
    };

    return (
        <div className="card w-full max-w-lg bg-base-100 shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Add Balance</h2>

            {/* Payment Method */}
            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Payment Method</span>
                </label>
                <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="select select-bordered w-full"
                >
                    <option disabled value="">
                        Pick your payment method
                    </option>
                    <option value="Bkash">Bkash</option>
                    <option value="Nagad">Nagad</option>
                    <option value="Rocket">Rocket</option>
                </select>
            </div>

            {/* Amount */}
            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Amount</span>
                </label>
                <input
                    type="number"
                    className="input input-bordered"
                    placeholder="Enter amount"
                    onChange={(e) => calculateTotal(e.target.value)}
                />
            </div>

            {/* Extra Fee (1.85%) */}
            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Extra Fee (1.85%)</span>
                </label>
                <input
                    value={extraFee.toFixed(2)}
                    readOnly
                    type="text"
                    className="input input-bordered"
                />
            </div>

            {/* Total */}
            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Total Amount</span>
                </label>
                <input
                    value={total.toFixed(2)}
                    readOnly
                    type="text"
                    className="input input-bordered"
                />
            </div>

            {/* Terms and Conditions */}
            <div className="form-control mb-4">
                <label className="label cursor-pointer">
                    <input
                        required
                        type="checkbox"
                        className="checkbox checkbox-primary"
                    />
                    <span className="label-text">Accept the terms and conditions</span>
                </label>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-4">
                <Link
                    to="/payment"
                    state={{ method, amount, extraFee, total }} // Passing all values to the payment page
                    className="btn btn-primary"
                >
                    Go to Payment
                </Link>
            </div>
        </div>
    );
};

export default AddBalance;
