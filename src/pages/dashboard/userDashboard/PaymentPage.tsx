import { useLocation, useNavigate } from "react-router-dom";
import Container from "../../../utils/Container";
import { useState } from "react";
import bkash from "../../../assets/BKash-bKash-Logo.wine.svg";
import nagad from "../../../assets/nagad.png";
import rocket from "../../../assets/rocket.png";
import Binance from "../../../assets/binance.jpg";
import logo from "../../../assets/logoWhite.png";
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
                amount: Number(amount),
                paidTaka: Number(total),
                paymentMethod: method,
                reference
            }

            await addBalance(balanceData).unwrap();

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Balance request Posted Successfully',
            })
            navigate("/dashboard");
        } catch (error) {
            console.log("error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Balance request Failed',
            })
        }
    };

    return (
        <Container className=" max-w-[600px] mx-auto ">
                <div className=" my-2 mx-2 p-4 rounded-md border border-blue-600">
                    {/* 1 step  */}
                    <div>
                        <ul className="w-full border border-gray-300 rounded-xl menu menu-horizontal flex justify-between ">
                            <li>
                                <a>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <div className="flex">
                                <li>
                                    <a>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </a>
                                </li>

                                <li>
                                    <a>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                            />
                                        </svg>
                                    </a>
                                </li>
                            </div>
                        </ul>
                    </div>

                    {/* 2 step  */}

                    <div className="mt-5 flex justify-center items-center">
                        <img
                            className=" w-[150px] "
                            src={method === "Nagad" ? nagad : method === "Rocket" ? rocket : bkash}
                            alt="NAGAD"
                        />
                    </div>

                    {/* 3 step  */}

                    <div className="mt-8">
                        <div className="flex  gap-5">
                            <div className="flex border  w-[70%] border-gray-300 p-2 rounded-md gap-3 items-center ">
                                <div>
                                    <img
                                        className="rounded-full w-[70px] bg-black p-1"
                                        src={logo}
                                        alt=""
                                    />
                                </div>
                                <div className="text-start">
                                    <h1 className="font-bold">liservice24.com</h1>

                                </div>
                            </div>

                            <div className="">
                                <h1 className=" p-6 border rounded-md border-gray-300  text-3xl">${amount}</h1>
                            </div>
                        </div>
                    </div>

                    {/* 4step  */}
                    <div className="mt-5">
                        {
                            method === "Binance" ? <div>
                                <img src={Binance} alt="" />
                            </div> :
                                <div className={`w-full ${method === "Nagad" ? "bg-red-600" : method === "Bkash" ? "bg-[#e0126d]" : "bg-[#8c3494]"} text-white rounded-md p-2 text-start`}>
                                    {/* Apply list-disc and list-inside to the ul */}
                                    <ul className="list-disc list-inside text-md mt-3">
                                        <li className="border-b border-b-orange-400 text-sm py-3">
                                            {method === "Nagad" ? "*167#" : method === "Bkash" ? "*247#" : "*322#"} ডায়াল করে আপনার {method} মোবাইল মেনুতে যান অথবা {method} অ্যাপে যান ৷
                                        </li>
                                        <li className="border-b border-b-orange-400 text-sm py-3">
                                            <span className="text-orange-400 font-bold">
                                                "Send Money"{" "}
                                            </span>
                                            ক্লিক করুন ৷
                                        </li>
                                        <li className="border-b border-b-orange-400 text-sm py-3">
                                            প্রাপক নম্বর হিসেবে ওই নম্বর লিখুন{" "}
                                            <span className="text-orange-400 font-bold">{
                                                method === "Nagad" ? "01688943310" : method === "Bkash" ? "01618616066" : "018774443699"
                                            }</span>
                                        </li>
                                        <li className="border-b border-b-orange-400 text-sm py-3">
                                            টাকার পরিমান{" "}
                                            <span className="text-orange-400 font-bold"> ৳{total}</span>
                                        </li>
                                        <li className="border-b border-b-orange-400 text-sm py-3">
                                            নিশ্চিত করতে এখন আপনার {method} মোবাইল মেনু পিন লিখুন ৷
                                        </li>
                                        <li className="border-b border-b-orange-400 text-sm py-3">
                                            সবকিছু ঠিক থাকলে আপনি {method} থেকে একটা নিশ্চিতকরণ বার্তা পাবেন
                                            ৷
                                        </li>
                                        <li className="border-b border-b-orange-400 text-sm py-3">
                                            এখন উপরের বক্সে আপনার{" "}
                                            <span className="text-orange-400 font-bold">
                                                Transaction ID
                                            </span>{" "}
                                            দিন এবং নিচের{" "}
                                            <span className="text-orange-400 font-bold"> VERIFY </span>
                                            বাটনে ক্লিক করুন ৷
                                        </li>
                                    </ul>
                                    <h1 className="text-center p-2 font-bold">ট্রানজেকশন আইডি দিন</h1>
                                    <input
                                        className="w-full p-2 rounded-md text-gray-400"
                                        type="text"
                                        placeholder="ট্রানজেকশন আইডি দিন"
                                        onChange={(e) => setReference(e.target.value)}
                                    />
                                </div>
                        }
                    </div>

                    {/* step  */}

                    <div className="mt-5">
                        <button disabled={!reference} onClick={handleSubmit} className="w-full  bg-red-600 text-white font-semibold rounded-md btn hover:bg-red-700 text-center p-2">
                            VERIFY
                        </button>
                    </div>
                </div>
        </Container>
    );
};

export default PaymentPage;
