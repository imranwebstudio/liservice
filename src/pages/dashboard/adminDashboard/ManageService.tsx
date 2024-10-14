/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetServicesQuery,  } from "../../../redux/features/service/service.api";
import Container from "../../../utils/Container";
import Loading from "../../../utils/Loading";

const ManageService = () => {
    const { data, isLoading } = useGetServicesQuery(undefined);

    if (isLoading) return <Loading />;

    console.log("Services:", data?.data);

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
