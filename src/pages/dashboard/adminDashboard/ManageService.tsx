/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";
import { useDeleteServiceMutation, useGetServicesQuery, } from "../../../redux/features/service/service.api";
import Container from "../../../utils/Container";
import Loading from "../../../utils/Loading";

const ManageService = () => {
    const { data, isLoading } = useGetServicesQuery({});
    const [deleteService] = useDeleteServiceMutation()
    console.log("Services:", data);

    const handleDeleteService = async (id: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        .then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Deleting...',
                    text: 'Please wait',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
    
                try {
                    await deleteService(id).unwrap();
    
                    Swal.fire(
                        'Deleted!',
                        'Service has been deleted.',
                        'success'
                    );
                } catch (error) {
                    console.log(error);
                    Swal.fire(
                        'Error!',
                        'An error occurred while deleting the service.',
                        'error'
                    );
                }
            }
        });
    };
    

if (isLoading) return <Loading />;
return (
    <Container>
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* Table Head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Avg. Time</th>
                            <th>Min</th>
                            <th>Max</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {data?.data?.map((service: any, index: number) => (
                            <tr key={service._id}>
                                <th>{index + 1}</th>
                                <td>{service.name}</td>
                                <td>{service.price}</td>
                                <td>{service.avgTime} hrs</td>
                                <td>{service.min}</td>
                                <td>{service.max}</td>
                                <td >
                                    <button
                                        className="btn btn-success btn-xs mr-2"

                                    >
                                        Update
                                    </button>
                                    <button
                                    onClick={() => handleDeleteService(service._id)}
                                        className="btn btn-danger btn-xs"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </Container>
);
};

export default ManageService;
