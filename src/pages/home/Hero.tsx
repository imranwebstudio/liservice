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
                className="relative py-6 text-center bg-cover  bg-opacity-35 bg-gradient-to-r from-blue-500 to-blue-800 text-white flex flex-col justify-center items-center h-[90vh] bg-no-repeat"
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
                    <a href="https://wa.me/qr/YD4JOJ4PEP2WE1">
                        <img className="w-36 mx-auto pt-6" src="https://www.i-eventplanner.com/wp-content/uploads/2023/03/Click-to-WhatsApp.png" alt="" />
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Hero;
