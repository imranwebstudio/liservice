import Container from "../../utils/Container";
import dummy1 from "../../assets/jeanGray.jpg";
import dummy2 from "../../assets/alexendra.jpg";
import dummy3 from "../../assets/emma.jpg";

const services = [
    {
        id: 6550,
        title: "TikTok Video Views",
        banner: dummy1,
        rate: 0.0011,
        min: 100,
        max: 2147483647,
        avgTime: "15 minutes",

    },
    {
        id: 6544,
        title: "TikTok Likes",
        banner: dummy2,
        rate: 0.0850,
        min: 10,
        max: 1000000,
        avgTime: "3 hours and 16 minutes",
    },
    {
        id: 6545,
        title: "TikTok Likes ",
        banner: dummy3,
        rate: 0.1375,
        min: 10,
        max: 1000000,
        avgTime: "6 hours and 56 minutes",
    },
    // Add more service objects here...
];

const ServiceCards = () => {
    return (
        <Container className="container mx-auto p-4">
            <div className="flex flex-wrap justify-between items-center  gap-6">
                {services.map((service) => (
                    <div className="card card-compact w-80 shadow-xl">
                        <figure className="w-full h-48">
                            <img
                                className="w-full h-full object-cover"
                                src={service.banner} 
                                alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{service.title}</h2>
                            <p>Rate: {service.rate}</p>
                            <p>Min: {service.min}</p> <p>Max: {service.max}</p>
                            <p>Avg. Time: {service.avgTime}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Create Order</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default ServiceCards;
