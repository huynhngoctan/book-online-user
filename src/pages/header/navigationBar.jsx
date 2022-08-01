import React from "react";

const NavigationBar = () => {
    return (
        <header id="header">
        <div className="inner">
          {/* Logo */}
          <a href="index.html" className="logo">
            <span className="fa fa-book" /> <span className="title">BookOnline</span>
          </a>
          {/* Search */}
          <div className="header__search">
            <input className="header__search-input" type="text" name="search" id="search" placeholder="Search by product name, author" />
            <button className="header__search-button">
              <i className="fa fa-search" />
            </button>
            <div className="header__search-result">
              <p className="header__search-title">Search result</p>
              <ul className="header__search-list">
                <li className="header__search-item">
                  <a className="header__search-link" href="#">
                    <img className="header__search-image" src="/images/product-2-720x480.jpg" alt="product" />
                    <div className="header__search-body">
                      <p className="header__search-body-name">Nhà giả kim</p>
                      <p className="header__search-body-author">Paulo coelho</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* Nav */}
          <div className="header__right">
            <div className="header__cart-wrapper">
              <span className="header__cart-icon">
                <i className="fa fa-shopping-cart" />
              </span>
              <span className="header__cart-bag">3</span>
              <div className="header__cart-list">
                <ul className="header__cart-list-product">
                  <li className="header__cart-item">
                    <a href="#" className="header__cart-link">
                      <img className="header__cart-image" src="/images/product-2-720x480.jpg" alt="product" />
                      <div className="header__cart-body">
                        <div className="header__cart-body-top">
                          <span className="header__cart-body-name">Nhà giả kim</span>
                          <span className="header__cart-body-price">25000vnđ x 2</span>
                        </div>
                        <div className="header__cart-body-bottom">
                          <span className="header__cart-body-author">Paulo Coelho</span>
                          <span className="header__cart-body-remove">Xóa</span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <nav>
              <ul>
                <li><a href="#menu">Menu</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    );
}

export default NavigationBar;