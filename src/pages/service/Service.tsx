/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState } from "react";
import Container from "../../utils/Container";
import { useBuyServiceMutation, useGetServicesQuery } from "../../redux/features/service/service.api";
import Loading from "../../utils/Loading";
import Swal from "sweetalert2";

export interface IService {
    _id: string;
    name: string;
    price: number;
    category: string;
    description: string;
    min: number;
    max: number;
    avgTime: number;
    image: string;
}

const ServiceCards = () => {
    const { data, isLoading } = useGetServicesQuery({});
    const [buyService, { isLoading: buyingService }] = useBuyServiceMutation();

    const [selectedService, setSelectedService] = useState<IService | null>(null);
    const [link, setLink] = useState(""); // State to hold the user's link input

    const openModal = (service: IService) => {
        setSelectedService(service);
        setLink(""); 
    };

    const closeModal = () => {
        setSelectedService(null);
    };

    const handleSubmit = async () => {
        if (buyingService) {
            return;
        }

        // Ensure the link is provided
        if (!link) {
            Swal.fire({
                icon: 'error',
                title: 'Link Required',
                text: 'Please provide a valid link before submitting.',
            });
            return;
        }

        Swal.fire({
            title: 'Processing Order...',
            text: 'Please wait while we process your order',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            // Make the API request to buy the service
            await buyService({ id: selectedService?._id, link }).unwrap();

            Swal.fire({
                icon: 'success',
                title: 'Order Successful!',
                text: 'Your service has been successfully purchased.',
            });
            closeModal();
        } catch (error: any) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Order Failed',
                text: error?.data?.error || 'An error occurred while processing your order.',
            });
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Container className="container mx-auto p-4 my-16">
            <div className="flex flex-wrap items-center gap-6">
                {data?.data?.map((service: IService) => (
                    <div key={service._id} className="card card-compact w-80 shadow-xl">
                        <figure className="w-full h-48">
                            <img className="w-full h-full object-cover" src={service.image} alt={service.name} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{service.name}</h2>
                            <p>Price: {service.price}</p>
                            <p>Min: {service.min}</p>
                            <p>Max: {service.max}</p>
                            <p>Avg. Time: {service.avgTime}</p>
                            <div className="card-actions justify-end">
                                <button onClick={() => openModal(service)} className="btn btn-primary">
                                    Create Order
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedService && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
                    <div className="bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Order for {selectedService.name}</h3>
                        <input
                            type="text"
                            placeholder="Enter your link here"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            className="input input-bordered w-full mb-4"
                        />
                        <div className="flex justify-end">
                            <button onClick={closeModal} className="btn btn-primary btn-outline mr-2">
                                Cancel
                            </button>
                            <button onClick={handleSubmit} className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default ServiceCards;
