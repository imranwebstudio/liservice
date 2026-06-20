/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Container from "../../utils/Container";
import { useBuyServiceMutation, useGetServicesQuery } from "../../redux/features/service/service.api";
import Loading from "../../utils/Loading";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import Swal from "sweetalert2";
import { catagories } from "../dashboard/adminDashboard/AddServices";

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
    const [category, setCategory] = useState({ category: "" });
    const { data, isLoading } = useGetServicesQuery(category);
    const [buyService, { isLoading: buyingService }] = useBuyServiceMutation();

    const [selectedService, setSelectedService] = useState<IService | null>(null);
    const [quantity, setQuantity] = useState(0);
    const [link, setLink] = useState(''); // State to hold the user's link input
    const [price, setPrice] = useState(0);

    const openModal = (service: IService) => {
        setSelectedService(service);
        setPrice(service.price);
        setLink('');
        setQuantity(service.min); // Start with minimum quantity
    };




    const closeModal = () => {
        setSelectedService(null);
    };

    // Calculate price when quantity or selectedService changes
    useEffect(() => {
        if (selectedService) {
            const pricePerUnit = selectedService.price / 1000;
            setPrice(quantity * pricePerUnit);
        }
    }, [quantity, selectedService]);

    const handleSubmit = async () => {
        if (buyingService) {
            return;
        }

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
            await buyService({ id: selectedService?._id, buyInfo: { link, quantity, price } }).unwrap();

            Swal.fire({
                icon: 'success',
                title: 'Order Successful!',
                text: 'Your service has been successfully purchased.',
            });
            closeModal();
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Order Failed',
                text: error?.data?.error || 'An error occurred while processing your order.',
            });
        }
    };

    const categoryImages = {
        facebook: "https://images.macrumors.com/t/3SwpDI7nrMQeeIro9X7SbILE4_I=/1600x0/article-new/2021/03/Facebook-Feature.jpg",
        instagram: "https://www.internetmatters.org/wp-content/uploads/2020/01/instalogo.png",
        youtube: "https://images.macrumors.com/t/oVY3CeutZiDKCY3YZHL7LEoRf54=/1600x0/article-new/2021/09/General-YouTube-Feature-1.jpg",
        telegram: "https://static1.anpoimages.com/wordpress/wp-content/uploads/2022/03/Telegram-featured.jpg",
        tiktok: "https://www.manchesterdigital.com/storage/15585/alexander-shatov-I4p0FcjDBJI-unsplash.jpg",
        whatsapp: "https://images.macrumors.com/t/vidUYJg5x6IPyS6kgo7Voj5JaXk=/1600x0/article-new/2021/03/Whatsapp-Feature.jpg",
        snapchat: "https://engage.sinch.com/sites/default/files/styles/small/public/image/2023-12/Was%20ist%20Snapchat.jpg?itok=ifJAOVyr",
        twitter: "https://kendesk.co.ke/wp-content/uploads/X-Twitter.jpg",
        linkedin: "https://irishtechnews-ie.exactdn.com/wp-content/uploads/2015/12/linkedin-earnings1-759x500.png?lossy=1&ssl=1",
    };


    if (isLoading) {
        return <Loading />;
    }

    return (
        <Container className="container mx-auto p-4 ">
            {/* Category Tabs */}
            <div role="tablist" className="tabs tabs-boxed mb-10 md:my-10 flex justify-center flex-wrap gap-1">
                <button role="tab" className={`tab ${category.category === "" && "tab-active"}`} onClick={() => setCategory({ category: "" })}>All</button>
                {catagories?.map((cat: string) => (
                    <button key={cat} role="tab" className={`tab ${category.category === cat && "tab-active"}`}
                        onClick={() => setCategory({ category: cat })}>{cat}</button>
                ))}
            </div>

            {/* Services List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6">
                {!data?.data?.length ? (
                    <div className="col-span-full flex flex-col items-center justify-center w-full h-[50vh] my-10">
                        <img src={"https://cdn.dribbble.com/users/721524/screenshots/4117132/untitled-1-_1_.png"} alt="No data found" className="h-60 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No Services Found</h3>
                        <p className="mb-6">We couldn't find any services matching your search. Please try a different category or check back later.</p>
                        <button className="btn btn-primary" onClick={() => setCategory({ category: "" })}>View All Services</button>
                    </div>
                ) : (
                    data?.data?.map((service: IService) => (
                        <div key={service._id} className="card card-compact w-80 shadow-3xl rounded-2xl shadow-slate-500 flex flex-col justify-between">
                            <figure className="w-full h-48">
                                <img
                                    className="w-full h-full object-cover"
                                    src={
                                        service.image || categoryImages[service?.category as keyof typeof categoryImages] || ""
                                    }
                                    alt={service.name}
                                />
                            </figure>
                            <div className="card-body flex-grow flex flex-col justify-between">
                                <h2 className="card-title">{service.name}</h2>
                                <div className="text-sm text-gray-600">
                                    <p>Price: ${service.price} per 1000</p>
                                    <p>Min: {service.min}</p>
                                    <p>Max: {service.max}</p>
                                    <p>Avg. Time: {service.avgTime}</p>
                                </div>
                                <div className="card-actions justify-end mt-4">
                                    <button onClick={() => openModal(service)} className="btn btn-primary">
                                        Create Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal */}
            {selectedService && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
                    <div className="bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            Order for: {selectedService.name} <span>${price.toFixed(2)}</span>
                        </h3>
                        <input
                            type="text"
                            placeholder="Enter your link here"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            className="input input-bordered w-full mb-4"
                        />
                        <input
                            type="number"
                            placeholder="Enter your quantity here"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="input input-bordered w-full mb-4"
                        />
                        <div className="mb-4">
                            <RangeSlider
                                value={[selectedService.min, quantity]}
                                onInput={(value: any[]) => setQuantity(value[1])}
                                min={selectedService.min}
                                max={selectedService.max}
                                thumbsDisabled={[true, false]}
                            />
                            <div className="text-center mt-2 text-lg font-semibold">
                                Selected Quantity: {quantity}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button onClick={closeModal} className="btn btn-primary btn-outline mr-2">
                                Cancel
                            </button>
                            <button disabled={!link} onClick={handleSubmit} className="btn btn-primary">
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
