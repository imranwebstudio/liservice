/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "../../utils/Container";
import { useBuyServiceMutation, useGetServicesQuery } from "../../redux/features/service/service.api";
import Loading from "../../utils/Loading";
import Swal from "sweetalert2";

interface IService {
    _id: string;
    name: string;
    price: number;
    min: number;
    max: number;
    avgTime: number;
    image: string
}


const ServiceCards = () => {
    const { data, isLoading } = useGetServicesQuery(undefined)
    const [buyService, { isLoading: buyingService }] = useBuyServiceMutation()

    const handleOrderRequest = async (id: string) => {
        if (buyingService) {
            return;
        }

        // Show a loading alert before the request
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
             await buyService(id).unwrap();

            // On success, show a success alert
            Swal.fire({
                icon: 'success',
                title: 'Order Successful!',
                text: 'Your service has been successfully purchased.',
            });

        } catch (error: any) {
            // On error, show an error alert
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Order Failed',
                text: 'There was an error processing your order. Please try again.',
            });
        }
    };



    if (isLoading) {
        return <Loading />;
    }
    return (
        <Container className="container mx-auto p-4">
            <div className="flex flex-wrap  items-center  gap-6">
                {data?.data?.map((service: IService) => (
                    <div className="card card-compact w-80 shadow-xl">
                        <figure className="w-full h-48">
                            <img
                                className="w-full h-full object-cover"
                                src={service.image}
                                alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{service.name}</h2>
                            <p>Price: {service.price}</p>
                            <p>Min: {service.min}</p> <p>Max: {service.max}</p>
                            <p>Avg. Time: {service.avgTime}</p>
                            <div className="card-actions justify-end">
                                <button onClick={() => handleOrderRequest(service?._id)} className="btn btn-primary">Create Order</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default ServiceCards;
