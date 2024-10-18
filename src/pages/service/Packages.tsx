import Container from "../../utils/Container";

const Packages = () => {
  return (
    <Container className="py-10">
      <div className="card glass w-96">
        <figure>
          <img
            src="https://img.freepik.com/free-vector/flat-customer-service-week-horizontal-banner-template_23-2149644216.jpg"
            alt="car!" />
        </figure>
        <div className="card-body">
          <h2 className="card-title"></h2>
          <p>How to park your car at your garage?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Learn now!</button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Packages;
