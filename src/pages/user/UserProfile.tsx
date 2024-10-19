
import moment from 'moment'; // Import Moment.js
import { useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/features/auth/authSlice';

const UserProfile = () => {
    const user = useAppSelector(selectUser)
    
    console.log(user);

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
            <div className="bg-blue-500 h-40 flex items-center justify-center">
                <img
                    className="h-24 w-24 rounded-full border-4 border-white"
                    src={user?.image || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}
                    alt="User Avatar"
                />
            </div>
            <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 text-center">
                    {user?.name || 'User Name'}
                </h2>
                <p className="text-center text-gray-600">{user?.email}</p>
                <p className="mt-4 text-center text-gray-600">
                    Role: <span className="font-medium">{user?.role || 'User'}</span>
                </p>
                <p className="mt-2 text-center text-gray-600">
                    Phone: <span className="font-medium">{user?.phone || 'Not provided'}</span>
                </p>
                <p className="mt-2 text-center text-gray-600">
                    {/* Display when the user joined using Moment.js */}
                    Joined: <span className="font-medium">{moment(user?.createdAt).format('MMMM Do, YYYY')}</span>
                </p>
                <div className="flex justify-center mt-6">
                    <button className="btn btn-primary">Edit Profile</button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
