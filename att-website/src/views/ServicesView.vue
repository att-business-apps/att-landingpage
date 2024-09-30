<script setup>
  function onePageTopFixed() {
      if ($('.onepagefixed').length) {
          var fixedElem = $('.onepagefixed'),
              distance = fixedElem.offset().top - 100,
              $window = $(window),
              totalDistance = $('.service-scroll-navigation-area').outerHeight() + distance;

          $(window).on('scroll', function () {
              if ( $window.scrollTop() >= distance ) {
                  fixedElem.css({
                      position: 'fixed',
                      left: '0',
                      right: '0',
                      top: '0',
                      zIndex: '5'
                  });
              }else {
                  fixedElem.removeAttr('style');
              }

              if ($window.scrollTop() >= totalDistance ) {
                  fixedElem.removeAttr('style');
              }
          });
      }
  }

  // axilInit.onePageTopFixed();
</script>

<template>
  <div class="breadcrum-area breadcrumb-banner">
    <div class="container">
      <div class="breadcrumb">
        <div class="section-heading heading-left">
          <h1 class="title h2 mb-0">Your Partner in Digital Success!</h1>
          <p>At amortree Tech, we combine creativity and technology to deliver seamless digital experiences.</p>
        </div>
        <ul class="list-unstyled">
          <li><a href="/">Home</a></li>
          <li class="active">What We Do</li>
        </ul>
      </div>
      <div class="banner-thumbnail bottom-0">
        <div class=""
          style="position: relative; will-change: transform; transform: perspective(2000px) rotateX(-0.32deg) rotateY(-11.76deg) scale3d(1, 1, 1);">
          <img src="../assets/img/amorboy/am-service.png" class="w-75 animate__animated slideInRight"
            style="animation-duration: 3s" alt="Illustration">
        </div>
      </div>
    </div>
    <ul class="shape-group-8 list-unstyled">
      <li class="shape shape-2 sal-animate" data-sal="slide-left" data-sal-duration="500" data-sal-delay="200">
        <img src="../assets/img/bubble-20.png" alt="circle">
      </li>
      <li class="shape shape-3 sal-animate" data-sal="slide-up" data-sal-duration="500" data-sal-delay="300">
        <img src="../assets/img/line-5.png" alt="circle">
      </li>
    </ul>
  </div>

  <section class="coming-soon-area onepage-screen-area">
            <div class="container">
                <div class="row align-items-center justify-content-center">
                    
                    <div class="col-xl-6 col-lg-8">
                        <div class="content">
                            <h2 class="title">Our new website is on its way</h2>
                            <p>
                              Our brand-new website is coming soon, designed to enhance your experience with a fresh look and improved features. Stay tuned for exciting updates, streamlined navigation, and easier access to everything you need. We can't wait to share it with you!</p>
                            
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div class="thumbnail sal-animate" data-sal="zoom-in" data-sal-duration="500" data-sal-delay="100">
                            <img src="../assets/img/coming-soon.png" alt="Coming Soon">
                        </div>
                    </div>
                </div>
            </div>
            <ul class="shape-group-8 list-unstyled">
                <li class="shape shape-2 sal-animate" data-sal="slide-left" data-sal-duration="500" data-sal-delay="200">
                    <img src="../assets/img/bubble-28.png" alt="Bubble">
                </li>
                <li class="shape shape-3 sal-animate" data-sal="slide-up" data-sal-duration="500" data-sal-delay="300">
                    <img src="../assets/img/line-4.png" alt="Line">
                </li>
            </ul>
        </section>

  <div class="service-scroll-navigation-area d-none">
    <!-- Service Nav -->
    <nav id="onepagenav" class="service-scroll-nav navbar onepagefixed">
      <div class="container">
        <ul class="nav nav-pills">
          <li class="nav-item current">
            <a class="nav-link" href="#section1">Research</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#section2">Branding</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#section4">UI/UX Design</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#section3">Web Development</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#section6">Motion Graphics Design</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#section5">Design System</a>
          </li>
        </ul>
      </div>
    </nav>
    <!-- Research Service -->
    <div class="section section-padding" id="section1">
      <div class="container">
        <div class="section-heading heading-left">
          <span class="subtitle">Service</span>
          <h2 class="title">Research &amp; Strategy</h2>
        </div>
        <div class="row">
          <div class="col-md-6 sal-animate" data-sal="slide-up" data-sal-duration="800" data-sal-delay="100">
            <div class="services-grid service-style-2">
              <div class="thumbnail">
                <img src="../assets/img/icon-29.png" alt="icon">
              </div>
              <div class="content">
                <h5 class="title"> <a href="service-design.html">Logo &amp; Branding</a></h5>
                <p>We design professional looking yet simple Logo. Our designs are search engine and user friendly.</p>
                <a href="service-design.html" class="more-btn">Find out more</a>
              </div>
            </div>
          </div>
          <div class="col-md-6 sal-animate" data-sal="slide-up" data-sal-duration="800" data-sal-delay="200">
            <div class="services-grid service-style-2">
              <div class="thumbnail">
                <img src="../assets/img/icon-27.png" alt="icon">
              </div>
              <div class="content">
                <h5 class="title"> <a href="service-design.html">Website Design</a></h5>
                <p>We design professional looking yet simple websites. Our designs are search engine and user friendly.
                </p>
                <a href="service-design.html" class="more-btn">Find out more</a>
              </div>
            </div>
          </div>
          <div class="col-md-6 sal-animate" data-sal="slide-up" data-sal-duration="800" data-sal-delay="300">
            <div class="services-grid service-style-2">
              <div class="thumbnail">
                <img src="../assets/img/icon-28.png" alt="icon">
              </div>
              <div class="content">
                <h5 class="title"> <a href="service-design.html">Mobile app design</a></h5>
                <p>We design professional looking yet Mobile Apps. Our designs are search engine
                  and user friendly. </p>
                <a href="service-design.html" class="more-btn">Find out more</a>
              </div>
            </div>
          </div>
          <div class="col-md-6 sal-animate" data-sal="slide-up" data-sal-duration="800" data-sal-delay="100">
            <div class="services-grid service-style-2">
              <div class="thumbnail">
                <img src="../assets/img/icon-4.png" alt="icon">
              </div>
              <div class="content">
                <h5 class="title"> <a href="service-design.html">Graphic/print design</a></h5>
                <p>From simple Content Management System to complex eCommerce developer, we cover it all.</p>
                <a href="service-design.html" class="more-btn">Find out more</a>
              </div>
            </div>
          </div>
          <div class="col-md-6 sal-animate" data-sal="slide-up" data-sal-duration="800" data-sal-delay="200">
            <div class="services-grid service-style-2 active">
              <div class="thumbnail">
                <img src="../assets/img/icon-30.png" alt="icon">
              </div>
              <div class="content">
                <h5 class="title"> <a href="service-design.html">Video production</a></h5>
                <p>From simple Content Management System to complex eCommerce developer, we cover it all.</p>
                <a href="service-design.html" class="more-btn">Find out more</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Logo Design Service -->
    <div class="section section-padding" id="section3">
      <div class="container">
        <div class="section-heading heading-left">
          <span class="subtitle">Service</span>
          <h2 class="title">Logo Design</h2>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-6 sal-animate" data-sal="slide-up" data-sal-duration="800" data-sal-delay="100">
            <div class="services-grid service-style-2">
              <div class="thumbnail">
                <img src="../assets/img/icon-34.png" alt="icon">
              </div>
              <div class="content">
                <h5 class="title"> <a href="service-marketing.html">SEO</a></h5>
                <p>We design professional looking yet simple Logo. Our designs are search engine and user friendly.</p>
                <a href="service-marketing.html" class="more-btn">Find out more</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 sal-animate" data-sal="slide-up" data-sal-duration="800" data-sal-delay="200">
            <div class="services-grid service-style-2">
              <div class="thumbnail">
                <img src="../assets/img/icon-35.png" alt="icon">
              </div>
              <div class="content">
                <h5 class="title"> <a href="service-marketing.html">Pay-per click</a></h5>
                <p>We design professional looking yet simple websites. Our designs are search engine and user friendly.
                </p>
                <a href="service-marketing.html" class="more-btn">Find out more</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 sal-animate" data-sal="slide-up" data-sal-duration="800" data-sal-delay="300">
            <div class="services-grid service-style-2">
              <div class="thumbnail">
                <img src="../assets/img/icon-36.png" alt="icon">
              </div>
              <div class="content">
                <h5 class="title"> <a href="service-marketing.html">Email marketing</a></h5>
                <p>We design professional looking yet Mobile Apps. Our designs are search engine
                  and user friendly. </p>
                <a href="service-marketing.html" class="more-btn">Find out more</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 sal-animate" data-sal="slide-up" data-sal-duration="800" data-sal-delay="100">
            <div class="services-grid service-style-2">
              <div class="thumbnail">
                <img src="../assets/img/icon-37.png" alt="icon">
              </div>
              <div class="content">
                <h5 class="title"> <a href="service-marketing.html">Display marketing</a></h5>
                <p>From simple Content Management System to complex eCommerce developer, we cover it all.</p>
                <a href="service-marketing.html" class="more-btn">Find out more</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 sal-animate" data-sal="slide-up" data-sal-duration="800" data-sal-delay="200">
            <div class="services-grid service-style-2">
              <div class="thumbnail">
                <img src="../assets/img/icon-38.png" alt="icon">
              </div>
              <div class="content">
                <h5 class="title"> <a href="service-marketing.html">Social Media marketing</a></h5>
                <p>From simple Content Management System to complex eCommerce developer, we cover it all.</p>
                <a href="service-marketing.html" class="more-btn">Find out more</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Branding Service -->
    <div class="section section-padding bg-color-light" id="section2">
      <div class="container">
        <div class="section-heading heading-left">
          <span class="subtitle">Service</span>
          <h2 class="title">Branding</h2>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-6 sal-animate" data-sal="slide-up" data-sal-duration="800" data-sal-delay="100">
            <div class="services-grid service-style-2">
              <div class="thumbnail">
                <img src="../assets/img/icon-31.png" alt="icon">
              </div>
              <div class="content">
                <h5 class="title"> <a href="service-development.html">Content Managment</a></h5>
                <p>We design professional looking yet simple Logo. Our designs are search engine and user friendly.</p>
                <a href="service-development.html" class="more-btn">Find out more</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 sal-animate" data-sal="slide-up" data-sal-duration="800" data-sal-delay="200">
            <div class="services-grid service-style-2">
              <div class="thumbnail">
                <img src="../assets/img/icon-32.png" alt="icon">
              </div>
              <div class="content">
                <h5 class="title"> <a href="service-development.html">Mobile app development</a></h5>
                <p>We design professional looking yet simple websites. Our designs are search engine and user friendly.
                </p>
                <a href="service-development.html" class="more-btn">Find out more</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 sal-animate" data-sal="slide-up" data-sal-duration="800" data-sal-delay="300">
            <div class="services-grid service-style-2">
              <div class="thumbnail">
                <img src="../assets/img/icon-33.png" alt="icon">
              </div>
              <div class="content">
                <h5 class="title"> <a href="service-development.html">eCommerce</a></h5>
                <p>We design professional looking yet Mobile Apps. Our designs are search engine
                  and user friendly. </p>
                <a href="service-development.html" class="more-btn">Find out more</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Website UI/UX Service -->
    <div class="section section-padding bg-color-light" id="section4">
      <div class="container">
        <div class="section-heading heading-left">
          <span class="subtitle">Service</span>
          <h2 class="title">Website UI/UX</h2>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-6 sal-animate" data-sal="slide-up" data-sal-duration="800" data-sal-delay="100">
            <div class="services-grid service-style-2">
              <div class="thumbnail">
                <img src="../assets/img/icon-39.png" alt="icon">
              </div>
              <div class="content">
                <h5 class="title"> <a href="service-business.html">Digital strategy</a></h5>
                <p>We design professional looking yet simple Logo. Our designs are search engine and user friendly.</p>
                <a href="service-business.html" class="more-btn">Find out more</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 sal-animate" data-sal="slide-up" data-sal-duration="800" data-sal-delay="200">
            <div class="services-grid service-style-2">
              <div class="thumbnail">
                <img src="../assets/img/icon-40.png" alt="icon">
              </div>
              <div class="content">
                <h5 class="title"> <a href="service-business.html">Business consulting</a></h5>
                <p>We design professional looking yet simple websites. Our designs are search engine and user friendly.
                </p>
                <a href="service-business.html" class="more-btn">Find out more</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 sal-animate" data-sal="slide-up" data-sal-duration="800" data-sal-delay="300">
            <div class="services-grid service-style-2">
              <div class="thumbnail">
                <img src="../assets/img/icon-41.png" alt="icon">
              </div>
              <div class="content">
                <h5 class="title"> <a href="service-business.html">Content writing</a></h5>
                <p>We design professional looking yet Mobile Apps. Our designs are search engine
                  and user friendly. </p>
                <a href="service-business.html" class="more-btn">Find out more</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 sal-animate" data-sal="slide-up" data-sal-duration="800" data-sal-delay="100">
            <div class="services-grid service-style-2">
              <div class="thumbnail">
                <img src="../assets/img/icon-42.png" alt="icon">
              </div>
              <div class="content">
                <h5 class="title"> <a href="service-business.html">Reporting</a></h5>
                <p>We design professional looking yet Mobile Apps. Our designs are search engine
                  and user friendly. </p>
                <a href="service-business.html" class="more-btn">Find out more</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Mobile App UI/UX Service -->
    <div class="section section-padding" id="section5">
      <div class="container">
        <div class="section-heading heading-left">
          <span class="subtitle">Service</span>
          <h2 class="title">Mobile App UI/UX</h2>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-6 sal-animate" data-sal="slide-up" data-sal-duration="800" data-sal-delay="100">
            <div class="services-grid service-style-2">
              <div class="thumbnail">
                <img src="../assets/img/icon-43.png" alt="icon">
              </div>
              <div class="content">
                <h5 class="title"> <a href="service-technology.html">Hosting</a></h5>
                <p>We design professional looking yet simple Logo. Our designs are search engine and user friendly.</p>
                <a href="service-technology.html" class="more-btn">Find out more</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 sal-animate" data-sal="slide-up" data-sal-duration="800" data-sal-delay="200">
            <div class="services-grid service-style-2">
              <div class="thumbnail">
                <img src="../assets/img/icon-44.png" alt="icon">
              </div>
              <div class="content">
                <h5 class="title"> <a href="service-technology.html">Big data analysis</a></h5>
                <p>We design professional looking yet simple websites. Our designs are search engine and user friendly.
                </p>
                <a href="service-technology.html" class="more-btn">Find out more</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Content strategy Service -->
    <div class="section section-padding bg-color-light" id="section6">
      <div class="container">
        <div class="section-heading heading-left">
          <span class="subtitle">Service</span>
          <h2 class="title">Design System</h2>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-6 sal-animate" data-sal="slide-up" data-sal-duration="800" data-sal-delay="100">
            <div class="services-grid service-style-2">
              <div class="thumbnail">
                <img src="../assets/img/icon-45.png" alt="icon">
              </div>
              <div class="content">
                <h5 class="title"> <a href="service-content-strategy.html">Web Audit Practices</a></h5>
                <p>industry-icon-1 Web Audit Practices A reputable marketing strategy company runs a complete digital,
                </p>
                <a href="service-content-strategy.html" class="more-btn">Find out more</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 sal-animate" data-sal="slide-up" data-sal-duration="800" data-sal-delay="200">
            <div class="services-grid service-style-2">
              <div class="thumbnail">
                <img src="../assets/img/icon-46.png" alt="icon">
              </div>
              <div class="content">
                <h5 class="title"> <a href="service-content-strategy.html">Marketing Flexibility</a></h5>
                <p>Do you cater to other businesses, investors, decision-makers or consumers? A trustworthy digital</p>
                <a href="service-content-strategy.html" class="more-btn">Find out more</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 sal-animate" data-sal="slide-up" data-sal-duration="800" data-sal-delay="300">
            <div class="services-grid service-style-2">
              <div class="thumbnail">
                <img src="../assets/img/icon-47.png" alt="icon">
              </div>
              <div class="content">
                <h5 class="title"> <a href="service-content-strategy.html">Advertising Strategy</a></h5>
                <p>Promoting your products and services online requires cutting-edge organic and paid search strategies
                  to rise</p>
                <a href="service-content-strategy.html" class="more-btn">Find out more</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
  .service-scroll-navigation-area {
    position: relative;
    scroll-margin-top: 100px;
  }

</style>