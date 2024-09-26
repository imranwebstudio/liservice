import { Link } from "react-router-dom";


const Info = () => {
  return (
    <div className="  p-6">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-500 to-blue-800 text-white flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold">Best SMM Panel in the World</h1>
        <p className="text-2xl mt-4">Boost your online presence with Li Service 24</p>
        <Link to="/services" className="mt-6 px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition">
          Explore Services
        </Link>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12">
        <h2 className="text-4xl font-bold text-center mb-8">Why Choose Li Service 24?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className=" shadow-lg p-6 rounded-lg">
            <h3 className="text-xl font-semibold">Comprehensive Range of Services</h3>
            <p className="mt-4">We offer a variety of social media services as likes, comments, followers, views, and more, to help you succeed.</p>
          </div>
          <div className=" shadow-lg p-6 rounded-lg">
            <h3 className="text-xl font-semibold">Affordable Pricing</h3>
            <p className="mt-4">We provide high-quality services at affordable prices so you can boost your online presence without breaking the bank.</p>
          </div>
          <div className=" shadow-lg p-6 rounded-lg">
            <h3 className="text-xl font-semibold">Easy Payment Options</h3>
            <p className="mt-4">Convenient payment methods like Bkash, Nagod, and Rocket ensure quick and secure transactions for all customers.</p>
          </div>
          <div className=" shadow-lg p-6 rounded-lg">
            <h3 className="text-xl font-semibold">Premium Quality</h3>
            <p className="mt-4">All our services are real, genuine, and guaranteed to enhance your social media presence.</p>
          </div>
          <div className=" shadow-lg p-6 rounded-lg">
            <h3 className="text-xl font-semibold">24/7 Customer Support</h3>
            <p className="mt-4">Our support team is available around the clock to assist you with any questions or concerns.</p>
          </div>
          <div className=" shadow-lg p-6 rounded-lg">
            <h3 className="text-xl font-semibold">Fast Results</h3>
            <p className="mt-4">With quick delivery, you will see the results you need in no time, keeping you ahead of the competition.</p>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-12">
        <h2 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className=" p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">What is an SMM panel, and how does it work?</h3>
            <p className="mt-2">An SMM panel is a platform offering social media marketing services such as likes, followers, and views to help individuals and businesses enhance their online presence.</p>
          </div>
          <div className=" p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Why should I choose Li Service 24 for my social media needs?</h3>
            <p className="mt-2">We offer high-quality services, affordable prices, quick delivery, and 24/7 customer support to help you achieve social media success.</p>
          </div>
          <div className=" p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">How can SMM services benefit my business?</h3>
            <p className="mt-2">SMM services can boost your brand awareness, drive website traffic, increase engagement, and ultimately lead to more sales.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 text-center bg-blue-600 text-white flex justify-center items-center flex-col">
        <h2 className="text-4xl font-bold">Ready to Boost Your Social Media?</h2>
        <p className="text-xl mt-4">Join Li Service 24 today and take your online presence to the next level.</p>
        <Link to="/services" className="mt-6 w-[200px] px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition">
          Explore Services
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center bg-gray-900 text-white">
        <p>&copy; 2024 Li Service 24. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Info;
