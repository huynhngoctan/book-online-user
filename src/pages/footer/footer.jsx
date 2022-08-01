import React from 'react';
import PropTypes from 'prop-types';

const footer = () => {
    return (
        <footer className="text-center text-lg-start bg-light text-muted">
    
        {/* Section: Links  */}
        <section className>
            <div className="container text-center text-md-start mt-5">
            {/* Grid row */}
            <div className="row mt-3">
                {/* Grid column */}
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                {/* Content */}
                <h6 className="text-uppercase fw-bold mb-4">
                    <i className="fas fa-gem me-3" />Thi Nhan bookstore
                </h6>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">
                    Menu
                </h6>
                <p>
                    <a href="#!" className="text-reset">Home</a>
                </p>
                <p>
                    <a href="#!" className="text-reset">Product</a>
                </p>
                <p>
                    <a href="#!" className="text-reset">Checkout</a>
                </p>
                <p>
                    <a href="#!" className="text-reset">Contact</a>
                </p>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">
                    Contact
                </h6>
                <p> Linh Trung, Thu Duc city, HCM city</p>
                <p>
                    
                    18130161@st.hcmuaf.edu.vn
                </p>
                <p> 0935305301</p>
                </div>
                {/* Grid column */}
            </div>
            {/* Grid row */}
            </div>
        </section>
        {/* Section: Links  */}
        </footer>

    );
};


export default footer;