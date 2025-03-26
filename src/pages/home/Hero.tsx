import logo1 from '../../assets/logoWhite.png';
// import logo2 from '../../assets/logoBlack.png';
import bg from '../../assets/helloweenBg.jpg';
import { useTheme } from '../../utils/ThemeContext';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/features/auth/authSlice';

const Hero = () => {
    const themeContext = useTheme();
    const user = useAppSelector(selectUser);
    if (!themeContext) {
        throw new Error("Theme context is not available");
    }

    // const theme = themeContext?.theme;

    return (
        <div>
            {/* Hero Section */}
            <section
                style={{ backgroundImage: `url(${bg})` }}
                className="relative py-6 text-center bg-cover  bg-opacity-35 bg-gradient-to-r from-blue-500 to-blue-800 text-white flex flex-col justify-center items-center h-[100dvh] bg-no-repeat"
            >
                {/* Black Overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Content */}
                <div className="relative z-10 py-5">
                    <img className="w-40 mx-auto" src={logo1} alt="" />
                    <h1 className="text-5xl font-bold">Best SMM Panel in the World</h1>
                    <p className="text-2xl mt-4">Boost your online presence with Li Service 24</p>
                    {
                        !user &&
                        <Link className='btn btn-primary mt-6' to={'/register'}>লগইন  করুন </Link>
                    }
                    <a href="https://wa.me/message/FI3L5HOJSGYBA1">
                        <img className="w-36 mx-auto pt-6" src="https://www.i-eventplanner.com/wp-content/uploads/2023/03/Click-to-WhatsApp.png" alt="" />
                    </a>
                </div>
                <div className='container'>
                    <div className='grid grid-cols-2 gap-2 lg:grid-cols-3'>
                        <div className='flex flex-col items-center'>
                            <div style={{ position: "relative", width: "100%", height: "0px", paddingBottom: "56.250%" }}><iframe allow="fullscreen" allowFullScreen height="100%" src="https://drive.google.com/file/d/1ns-cyL0QpRoAOXzX9XSx8NhFjwbAA1Sl/preview" width="100%" style={{ border: "none", width: "100%", height: "100%", position: "absolute", left: "0px", top: "0px", overflow: "hidden" }}></iframe></div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <div style={{ position: "relative", width: "100%", height: "0px", paddingBottom: "56.250%" }}><iframe allow="fullscreen" allowFullScreen height="100%" src="https://drive.google.com/file/d/152Zgi2rwmvorXD_x5ZnXKRJZwozJnRdB/preview" width="100%" style={{ border: "none", width: "100%", height: "100%", position: "absolute", left: "0px", top: "0px", overflow: "hidden" }}></iframe></div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <div style={{ position: "relative", width: "100%", height: "0px", paddingBottom: "56.250%" }}><iframe allow="fullscreen" allowFullScreen height="100%" src="https://drive.google.com/file/d/1jp5zbW_eITzFZktTbPo8U1r-kt6tYS2-/preview" width="100%" style={{ border: "none", width: "100%", height: "100%", position: "absolute", left: "0px", top: "0px", overflow: "hidden" }}></iframe></div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Hero;
