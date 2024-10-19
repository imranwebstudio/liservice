import logo1 from '../../assets/logoWhite.png'
import logo2 from '../../assets/logoBlack.png'
import { useTheme } from '../../utils/ThemeContext';
const Hero = () => {
    const themeContext = useTheme();

    if (!themeContext) {
        // Handle the case where themeContext is null
        // You can return a default theme or throw an error
        throw new Error("Theme context is not available");
    }
    const theme = themeContext?.theme;
    
    return (
        <div>
            {/* Hero Section */}
            <section className="text-center py-16 bg-gradient-to-r from-blue-500 to-blue-800 text-white flex flex-col justify-center items-center">
            <img className="w-40" src={theme === 'bumblebee' ? logo2 : logo1} alt="" />
                <h1 className="text-5xl font-bold">Best SMM Panel in the World</h1>
                <p className="text-2xl mt-4">Boost your online presence with Li Service 24</p>
                <a href="https://wa.me/qr/YD4JOJ4PEP2WE1" className=" mt-10">
                    <img className="w-36 mx-auto" src="https://www.i-eventplanner.com/wp-content/uploads/2023/03/Click-to-WhatsApp.png" alt="" />
                </a>
            </section>
        </div>
    );
};

export default Hero;
