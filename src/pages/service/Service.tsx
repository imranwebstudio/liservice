
const services = [
    {
        id: 6550,
        title: "TikTok Video Views [Max Unlimited]",
        rate: 0.0011,
        min: 100,
        max: 2147483647,
        avgTime: "15 minutes",
    },
    {
        id: 6544,
        title: "TikTok Likes [Max 250K]",
        rate: 0.0850,
        min: 10,
        max: 1000000,
        avgTime: "3 hours and 16 minutes",
    },
    {
        id: 6545,
        title: "TikTok Likes [Max: 100K] | SuperInstant",
        rate: 0.1375,
        min: 10,
        max: 1000000,
        avgTime: "6 hours and 56 minutes",
    },
    // Add more service objects here...
];

const ServiceCards = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {services.map((service) => (
                    <div className="card card-compact bg-base-100 w-96 shadow-xl">
                        <figure>
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
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
        </div>
    );
};

export default ServiceCards;
