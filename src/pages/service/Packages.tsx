/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";
import { useBuyServiceMutation, useGetServicesQuery } from "../../redux/features/service/service.api";
import Container from "../../utils/Container";
import { IService } from "./Service";
import Loading from "../../utils/Loading";
import { useEffect, useState } from "react";
import placeHolderImg from "../../assets/placeHolderImg.gif";

// Map of category keywords to image URLs
const categoryImages = {
  facebook: "https://images.macrumors.com/t/3SwpDI7nrMQeeIro9X7SbILE4_I=/1600x0/article-new/2021/03/Facebook-Feature.jpg",
  instagram: "https://www.internetmatters.org/wp-content/uploads/2020/01/instalogo.png",
  youtube: "https://images.macrumors.com/t/oVY3CeutZiDKCY3YZHL7LEoRf54=/1600x0/article-new/2021/09/General-YouTube-Feature-1.jpg",
  telegram: "https://static1.anpoimages.com/wordpress/wp-content/uploads/2022/03/Telegram-featured.jpg",
  tiktok: "https://example.com/path/to/tiktok-image.jpg", // Replace with TikTok image URL
  whatsapp: "https://www.motortrend.com/uploads/sites/5/2021/11/2021-Whatsapp-Feature.jpg",
  snapchat: "https://engage.sinch.com/sites/default/files/styles/small/public/image/2023-12/Was%20ist%20Snapchat.jpg?itok=ifJAOVyr",
  twitter: "https://kendesk.co.ke/wp-content/uploads/X-Twitter.jpg",
  linkedin: "https://irishtechnews-ie.exactdn.com/wp-content/uploads/2015/12/linkedin-earnings1-759x500.png?lossy=1&ssl=1",
  apple: "https://blog.logomyway.com/wp-content/uploads/2020/08/apple-logo2.jpg"
};

// Helper function to get an image based on category keyword in service name
const getCategoryImage = (serviceName: string) => {
  for (const [category, imageUrl] of Object.entries(categoryImages)) {
    if (serviceName.toLowerCase().includes(category)) {
      return imageUrl;
    }
  }
  return "";
};

const Packages = () => {
  const [category, setCategory] = useState("");
  const { data, isLoading } = useGetServicesQuery({ category: "feature" });
  const [buyService, { isLoading: buyingService }] = useBuyServiceMutation();
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [buyInfo, setBuyInfo] = useState({ link: "", quantity: 0 });
  const [categories, setCategories] = useState<string[]>([]);

  // Populate categories based on service names dynamically
  useEffect(() => {
    if (data?.data) {
      const uniqueCategories = new Set<string>();
      data.data.forEach((service: IService) => {
        Object.keys(categoryImages).forEach((keyword) => {
          if (service.name.toLowerCase().includes(keyword)) {
            uniqueCategories.add(keyword);
          }
        });
      });
      setCategories(Array.from(uniqueCategories));
    }
  }, [data]);

  const openModal = (service: IService) => {
    setSelectedService(service);
    setBuyInfo({ link: "", quantity: 0 });
  };

  const closeModal = () => setSelectedService(null);

  const handleSubmit = async () => {
    if (buyingService) return;

    if (!buyInfo.link) {
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
      didOpen: () => Swal.showLoading(),
    });

    try {
      await buyService({ id: selectedService?._id, buyInfo }).unwrap();
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

  // Filter services based on selected category
  const filteredServices = data?.data?.filter((service: IService) => 
    category === "" || service.name.toLowerCase().includes(category)
  );

  if (isLoading) return <Loading />;

  return (
    <Container className="container mx-auto p-4">
      {data?.data?.length !== 0 && (
        <h1 className="text-3xl font-bold mb-4 text-center my-10 text-blue-500">Offers Packages</h1>
      )}

      <div role="tablist" className="tabs tabs-boxed mb-10 md:my-10 flex justify-center flex-wrap gap-1">
        <button role="tab" className={`tab ${category === "" && "tab-active"}`} onClick={() => setCategory("")}>All</button>
        {categories.map((cat) => (
          <button key={cat} role="tab" className={`tab ${category === cat && "tab-active"}`} onClick={() => setCategory(cat)}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6">
        {filteredServices?.map((service: IService) => (
          <div key={service._id} className="card card-compact w-80 shadow-3xl shadow-slate-500">
            <figure className="w-full h-48">
              <img
                className="w-full h-full object-cover"
                src={service.image || getCategoryImage(service.name) || placeHolderImg}
                alt={service.name}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{service.name}</h2>
              {service?.description.split(".").map((line, index) => (
                <li key={index}>{line}</li>
              ))}
              <p>Price: ${service.price}</p>
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
              value={buyInfo.link}
              onChange={(e) => setBuyInfo({ ...buyInfo, link: e.target.value })}
              className="input input-bordered w-full mb-4"
            />
            <input
              type="text"
              placeholder="Enter your quantity here"
              onChange={(e) => setBuyInfo({ ...buyInfo, quantity: parseInt(e.target.value) })}
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

export default Packages;
