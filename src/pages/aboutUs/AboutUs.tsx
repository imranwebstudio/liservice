import React from "react";
import Container from "../../utils/Container";

const AboutUs: React.FC = () => {
    return (
        <Container>
            <div className="max-w-3xl mx-auto p-6 text-justify shadow-md rounded-lg">
                <h1 className="text-4xl font-bold text-center text-primary mb-6">About Us</h1>

                <p className="text-lg leading-7 mb-4">
                    <strong>LI SERVICE 24</strong> is an online platform that offers a wide range of social media services for various platforms such as Facebook, Instagram, Twitter, TikTok, YouTube, and more. We provide a variety of services including likes, followers, views, comments, and shares that can help businesses and individuals increase their social media engagement and brand visibility.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">Affordable Pricing</h2>
                <p className="text-lg leading-7 mb-4">
                    One of the major benefits of using <strong>LI SERVICE 24</strong> is our competitive pricing. We offer affordable rates that make our services accessible even to small businesses or individuals working with tight budgets. Whether you're a startup or an influencer, our cost-effective solutions are designed to help you grow.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">User-Friendly Interface</h2>
                <p className="text-lg leading-7 mb-4">
                    Our platform is designed with simplicity in mind. With a user-friendly interface and an intuitive dashboard, placing orders, tracking progress, and managing your social media marketing campaigns has never been easier. The system is straightforward and accessible, even to users with minimal technical skills.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">Fast Delivery</h2>
                <p className="text-lg leading-7 mb-4">
                    At <strong>LI SERVICE 24</strong>, we understand the importance of quick results. That's why we pride ourselves on our fast delivery times. Our services are delivered within the shortest possible time frame, helping you increase your social media engagement and brand visibility rapidly.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">Excellent Customer Support</h2>
                <p className="text-lg leading-7 mb-4">
                    Our customer support team is always ready to assist you with any queries or issues you may encounter. Whether you need help placing an order or have a question about your service, our experts are available through email, live chat, or ticket support, ensuring you get timely and effective assistance.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">Conclusion</h2>
                <p className="text-lg leading-7 mb-4">
                    <strong>LI SERVICE 24</strong> is a reliable and affordable option for individuals and businesses looking to boost their social media presence. With competitive prices, fast service delivery, and excellent customer support, we are committed to helping you achieve your social media marketing goals.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">Terms of Service</h2>
                <p className="text-lg leading-7 mb-4">
                    By placing an order with our panel, you automatically accept all the below-listed terms of service, whether you read them or not. We reserve the right to modify these Terms of Service without notice. It is your responsibility to review the terms regularly to stay up to date with any changes.
                </p>

                <ul className="list-disc ml-6 mb-4">
                    <li>You agree to use our website in a manner consistent with the terms set by social media platforms.</li>
                    <li>Rates are subject to change without notice. Your payment is non-refundable once a deposit is made.</li>
                    <li>We do not guarantee specific delivery times, though we aim to meet your expectations as closely as possible.</li>
                    <li>Orders placed in our system will not be refunded or canceled after they are placed unless the order is non-deliverable.</li>
                    <li>Misplaced or private account orders will not qualify for refunds. Ensure all details are correct before placing your order.</li>
                    <li>Fraudulent activity will lead to account termination and removal of any services provided.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6 mb-4">Refund Policy</h2>
                <p className="text-lg leading-7 mb-4">
                    We do not offer refunds to your payment method. Once a deposit is completed, there is no way to reverse it. You must use the balance for services available on the platform. Any chargebacks or disputes filed against us after a deposit will result in the termination of your account and future services.
                </p>
            </div>
        </Container>
    );
};

export default AboutUs;
