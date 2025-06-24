/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Link } from "react-router-dom";

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
        <div className="card bg-base-100 shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Add Balance</h2>

            {/* Payment Method */}
            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Payment Method</span>
                </label>
                <select
                required
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="select select-bordered w-full"
                >
                    <option disabled value="">
                        Pick your payment method
                    </option>
                    <option value="Binance">Binance</option>
                    <option value="Bkash">Bkash</option>
                    <option value="Nagad">Nagad</option>
                    <option value="Rocket">Rocket</option>
                    <option value="stc">STC Pay</option>
                </select>
            </div>

            {/* Amount */}
            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Dollar Amount</span>
                </label>
                <input
                    type="text"
                    className="input input-bordered"
                    placeholder="Enter amount in Dollar $"
                    onChange={(e) => calculateTotal(e.target.value)}
                />
            </div>

            {/* Extra Fee (1.85%) */}
            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text line-through ">Extra Fee  (1.85%)</span>
                </label>
                <input
                    // value={extraFee.toFixed(2)}
                    placeholder="NO EXTRA FEE"
                    readOnly
                    type="text"
                    className="input input-bordered"
                />
            </div>

            {/* Total */}
            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Total Price in taka</span>
                </label>
                <input
                    value={total.toFixed(2)}
                    placeholder="Total Price in taka"
                    readOnly
                    type="text"
                    className="input input-bordered"
                />
            </div>

            {/* Terms and Conditions */}
            <div className="form-control mb-4">
                <label className="label cursor-pointer justify-start gap-4">
                    <input
                        onChange={() => setAccepted(!accepted)}
                        type="checkbox"
                        className="checkbox checkbox-primary"
                    />
                    <span className="text-xl">Accept the terms and conditions</span>
                </label>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-4">
                {accepted && method && amount  ? (
                    <Link
                        to="/payment"
                        state={{ method, amount,  total }} // Passing all values to the payment page
                        className="btn btn-primary"
                    >
                        Go to Payment
                    </Link>
                ) : (
                    <button className="btn btn-primary" disabled>
                        Go to Payment
                    </button>
                )}
            </div>
        </div>
    );
};

export default AddBalance;
