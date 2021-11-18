import { Routes, Route, Outlet, Link } from "react-router-dom";

function AuthenticationLayout() {
  return (
    <section className="ftco-section">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12 col-lg-12">
                    <div className="wrap d-md-flex">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

export default AuthenticationLayout;
