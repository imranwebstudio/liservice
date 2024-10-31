/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectTokens, selectUser, setUser } from '../../redux/features/auth/authSlice';
import { useUpdateUserMutation } from '../../redux/features/auth/authApi';

const UserProfile = () => {
    const [updateUser, { isLoading }] = useUpdateUserMutation();
    const user = useAppSelector(selectUser);
    const tokens = useAppSelector(selectTokens)
    const dispatch = useAppDispatch();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    // State for edit profile form
    const [profileInfo, setProfileInfo] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || ''
    });

    // State for password change form
    const [passwordInfo, setPasswordInfo] = useState({
        currentPassword: '',
        newPassword: ''
    });

    // Toggle modals
    const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);
    const togglePasswordModal = () => setIsPasswordModalOpen(!isPasswordModalOpen);

    // Handle Edit Profile form submission
    const handleEditProfile = async () => {
        try {
            // Combine existing user data with updated fields
            const updateUserData = {
                ...user, // Spread the existing user data
                name: profileInfo.name || user?.name, // Use new name or fallback to existing name
                email: profileInfo.email || user?.email, // Use new email or fallback to existing email
                phone: profileInfo.phone || user?.phone, // Use new phone or fallback to existing phone
            };
    
            const res = await updateUser(updateUserData).unwrap();
            dispatch(setUser({ user: res.data.data, tokens }));

            console.log("Update success", res); // Debug log
    
            Swal.fire("Success!", "Profile updated successfully.", "success");
            toggleEditModal();
        } catch (error) {
            console.error("Update Error:", error); // Log any errors for better debugging
            Swal.fire("Error!", "Could not update profile. Please try again.", "error");
        }
    };
    

    // Handle Change Password form submission
    const handleChangePassword = async () => {
        if (passwordInfo.newPassword.length < 6) {
            return Swal.fire("Error!", "New password must be at least 8 characters long.", "error");
        }

        try {
            // Add logic to change password in your backend
            Swal.fire("Success!", "Password changed successfully.", "success");
            togglePasswordModal();
        } catch (error) {
            Swal.fire("Error!", "Could not change password. Please try again.", "error");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-28">
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
                    Joined: <span className="font-medium">{moment(user?.createdAt).format('MMMM Do, YYYY')}</span>
                </p>
                <div className="flex justify-center mt-6 gap-4">
                    <button onClick={toggleEditModal} className="btn btn-primary">Edit Profile</button>
                    <button onClick={togglePasswordModal} className="btn btn-secondary">Change Password</button>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
                    <div className="bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
                        <input
                            type="text"
                            placeholder="Name"
                            value={profileInfo.name}
                            onChange={(e) => setProfileInfo({ ...profileInfo, name: e.target.value })}
                            className="input input-bordered w-full mb-4"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={profileInfo.email}
                            onChange={(e) => setProfileInfo({ ...profileInfo, email: e.target.value })}
                            className="input input-bordered w-full mb-4"
                        />
                        <input
                            type="text"
                            placeholder="Phone"
                            value={profileInfo.phone}
                            onChange={(e) => setProfileInfo({ ...profileInfo, phone: e.target.value })}
                            className="input input-bordered w-full mb-4"
                        />
                        <div className="flex justify-end">
                            <button onClick={toggleEditModal} className="btn btn-outline mr-2">Cancel</button>
                            <button onClick={handleEditProfile} className="btn btn-primary">Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Change Password Modal */}
            {isPasswordModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
                    <div className="bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                        <input
                            type="password"
                            placeholder="Current Password"
                            value={passwordInfo.currentPassword}
                            onChange={(e) => setPasswordInfo({ ...passwordInfo, currentPassword: e.target.value })}
                            className="input input-bordered w-full mb-4"
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={passwordInfo.newPassword}
                            onChange={(e) => setPasswordInfo({ ...passwordInfo, newPassword: e.target.value })}
                            className="input input-bordered w-full mb-4"
                        />
                        <div className="flex justify-end">
                            <button onClick={togglePasswordModal} className="btn btn-outline mr-2">Cancel</button>
                            <button onClick={handleChangePassword} className="btn btn-primary">Change Password</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
