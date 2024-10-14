import { useLocation, useNavigate } from "react-router-dom";
import Container from "../../../utils/Container";
import { useState } from "react";
import bkash from "../../../assets/BKash-bKash-Logo.wine.svg";
import nagad from "../../../assets/nagad.png";
import rocket from "../../../assets/rocket.png";
import taka from "../../../assets/taka.svg";
import { useAddBalanceMutation } from "../../../redux/features/balance/balance.api";
import Swal from "sweetalert2";
const PaymentPage = () => {
    const location = useLocation();
    const { method, amount, total } = location.state || {};
    const [reference, setReference] = useState<string>("");
    const [addBalance] = useAddBalanceMutation();

    const navigate = useNavigate();
    const handleSubmit = async () => {
        Swal.fire({
            title: 'processing...',
            text: 'Please wait while we process your request',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        try {
            const balanceData = {
                amount: total,
                paymentMethod: method
            }

            await addBalance(balanceData).unwrap();

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Balance request Posted Successfully',
            })
            navigate("/");
        } catch (error) {
            console.log("error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Balance request Failed',
            })
        }
        console.log("Reference:", reference);
    };

    return (
        <Container className="flex justify-center items-center h-[50vh]">
            <div className="card w-96 bg-base-100 shadow-xl p-6 text-center">
                <img className="p-2 my-3" src={method === "Bkash" ? bkash : method === "Nagad" ? nagad : rocket} alt="" />
                <div className="flex justify-between">
                    <p className="border-2 p-2 rounded text-gray-500 flex justify-between gap-4 items-center">
                        <img src={taka} className="size-7 inline opacity-60" alt="" /> <span className="inline text-4xl">{amount}</span>
                    </p>
                </div>
                <p>Total: {total}</p>
                <div className="form-control my-4 ">
                    <input
                        type="text"
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
