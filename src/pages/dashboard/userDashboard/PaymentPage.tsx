import { useLocation } from "react-router-dom";
import Container from "../../../utils/Container";
import { useState } from "react";
import bkash from "../../../assets/BKash-bKash-Logo.wine.svg";
import nagad from "../../../assets/nagad.png";
import rocket from "../../../assets/rocket.png";
import taka from "../../../assets/taka.svg";
const PaymentPage = () => {
    const location = useLocation();
    const { method, amount, extraFee, total } = location.state || {};
    const [refarence, setReference] = useState<string>("");

    const handleSubmit = () => {
        // Handle payment logic here
    };

    console.log("Method:", method);
    return (
        <Container className="flex justify-center items-center h-[50vh]">
            <div className="card w-96 bg-base-100 shadow-xl p-6 text-center">
                <img className="p-2 my-3" src={method === "Bkash" ? bkash : method === "Nagad" ? nagad : rocket} alt="" />
                <div className="flex justify-between">
                    <p className="border-2 p-2 rounded">
                         Transaction Id: 

                    </p>
                    <p className="border-2 p-2 rounded text-gray-500 flex justify-between gap-4 items-center">
                        <img src={taka} className="size-7 inline opacity-60" alt="" /> <span className="inline text-4xl">{amount}</span> 
                    </p>
                </div>
                <p>Total: {total}</p>
                <div className="form-control my-4 ">
                    <input
                        type="number"
                        className="input input-bordered"
                        placeholder="Reference Number"
                        onChange={(e) => setReference(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" onClick={handleSubmit}>
                    Pay
                </button>
            </div>
        </Container>
    );
};

export default PaymentPage;
