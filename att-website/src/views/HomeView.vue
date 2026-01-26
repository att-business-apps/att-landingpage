<script setup>
import { ref } from "vue";

const disableBtn = ref(false);
const from_name = ref("");
const email = ref("");
const phoneNumber = ref("");
const message = ref("");

function sendMail() {
  var params = {
    from_name: from_name.value,
    to_name: "Admin",
    email: email.value,
    phoneNumber: phoneNumber.value,
    message: message.value,
  };

  const serviceID = "service_77crg6o";

  if (!params.from_name) {
    alert("Please enter your name");
    return;
  }
  if (!params.email) {
    alert("Please enter your email");
    return;
  }
  if (!params.phoneNumber) {
    alert("Please enter your phone number");
    return;
  }
  if (!params.message) {
    alert("Please enter your requirement");
    return;
  }

  disableBtn.value = true;
  emailjs
    .send(serviceID, getTemplate("admin"), params)
    .then((res) => {
      from_name.value = "";
      email.value = "";
      phoneNumber.value = "";
      message.value = "";
      console.log(res);
      disableBtn.value = false;
    })
    .catch((err) => console.log(err));
  emailjs
    .send(serviceID, getTemplate("customer"), params)
    .then((res) => {
      from_name.value = "";
      email.value = "";
      phoneNumber.value = "";
      message.value = "";
      console.log(res);
      disableBtn.value = false;
    })
    .catch((err) => console.log(err));
}

function getTemplate(target) {
  if (target == "admin") return "template_tcauze5";
  if (target == "customer") return "template_svj7071";
}

// New Year
</script>

<template>
  <main>
    <div class="banner banner-style-1">
      <div class="container-fluid">
        <div class="row align-items-end align-items-xl-end">
          <div class="col-lg-12 mx-auto pb-5">
            <div class="home-banner banner-content text-center">
              <div class="animate__animated fadeInUp" style="animation-duration: 1s">
                <h1 class="title d-inline" ref="myElement">
                  Top <span class="gradient-text-light">UI/UX Design</span> &
                  <span class="gradient-text-light">Web Development</span>
                  Studio in
                  <span class="gradient-text yellow-dark">Bengaluru</span>
                </h1>
                <h2 class="h4">
                  <span class="gradient-text blue-dark">Sleek.</span>
                  <span class="gradient-text yellow-dark">Stylish.</span>
                  <span class="gradient-text blue-dark">Classy.</span>
                </h2>
                <p class="subtitle">
                  At Amortree Tech, we use the power of technology to help
                  businesses grow and innovate. As a trusted web development and
                  IT solutions partner, we design custom websites, create
                  seamless UI/UX experiences, build mobile app interfaces, and
                  provide DevOps consulting—all tailored to fit your unique
                  business needs.
                </p>
                <div class="d-flex justify-content-center gap-3 mt-5">
                  <a class="amor-btn btn-fill-primary btn-large"
                    href="https://wa.me/917975859061/?text=I'm%20inquiring%20about%20the%20website%20service.">Let's
                    Chat</a>
                  <a href="/portfolio" class="amor-btn btn-borderd light">View Portfolio</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row align-items-end align-items-xl-end">
          <div class="amorboy animate__animated animate__slideInDown" style="animation-duration: 8s">
            <img src="../assets/img/amorboy/am-fly-1.png" alt="">
            <img src="../assets/img/amorboy/am-doing.png" alt="">
          </div>

          <div class="col-lg-5 col-md-10 mx-auto animate__animated fadeInUp" style="animation-duration: 2s">
            <div class="contact-form-box banner-form">
              <h3 class="title text-center">
                <span class="gradient-text blue-dark">Unlock</span> Your Online
                <span class="gradient-text yellow-dark">Potential</span>
              </h3>
              <form class="amor-contact-form">
                <h4 class="mb-2">
                  We’d love to know more about your project needs!
                </h4>
                <p class="mb-3">
                  Submit your query, and we’ll reach out to you shortly!
                </p>
                <div class="form-group mb--40">
                  <!-- <label>How can we help you?</label> -->
                  <textarea name="contact-message" id="message" class="form-control textarea" v-model="message"
                    cols="30" rows="2" placeholder="How can we help you?" required></textarea>
                </div>

                <h4 class="mt-3 mb-2">Your Contact Details</h4>
                <p class="mb-3">For project discussions only, thank you!</p>
                <div class="form-group">
                  <!-- <label>Name</label> -->
                  <input type="text" v-model="from_name" class="form-control" name="contact-name"
                    placeholder="Your Name" required="" />
                </div>
                <div class="form-group">
                  <!-- <label>Email</label> -->
                  <input type="email" v-model="email" class="form-control" name="contact-email" placeholder="Your Email"
                    required />
                </div>
                <div class="form-group mb--40">
                  <!-- <label>Phone</label> -->
                  <input type="tel" class="form-control" v-model="phoneNumber" name="contact-phone"
                    placeholder="Your Phone" required />
                </div>
                <div class="form-group">
                  <button @click="sendMail" type="button" class="amor-btn btn-borderd btn-fluid light" name="submit-btn"
                    :disabled="disableBtn">
                    Send Message
                  </button>
                </div>
                <div class="form-group"></div>
              </form>
            </div>
            <div class="banner-thumbnail d-none">
              <div class="animate__animated zoomIn" style="animation-duration: 2s">
                <div class="large-thumb">
                  <img src="../assets/img/window.png" alt="Laptop" />
                </div>
              </div>
              <div class="animate__animated slideInRight" style="animation-duration: 2s">
                <div class="large-thumb-2">
                  <img src="../assets/img/amorboy/laptop-poses-banner.png" alt="Laptop" />
                </div>
              </div>
              <ul class="list-unstyled shape-group">
                <li class="shape shape-1">
                  <div class="animate__animated slideInLeft" style="animation-duration: 1s">
                    <img src="../assets/img/chat-group-home.png" alt="chat" />
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
      <ul class="list-unstyled shape-group-banner">
        <li class="shape shape-1">
          <img src="../assets/img/shapes/bubble-39.png" alt="Bubble" />
        </li>
        <li class="shape shape-2">
          <img src="../assets/img/shapes/bubble-38.png" alt="Bubble" />
        </li>
        <li class="shape shape-3">
          <img src="../assets/img/shapes/bubble-14.png" alt="Bubble" />
        </li>
        <li class="shape shape-4">
          <img src="../assets/img/shapes/bubble-14.png" alt="Bubble" />
        </li>
        <li class="shape shape-5">
          <img src="../assets/img/shapes/bubble-14.png" alt="Bubble" />
        </li>
        <li class="shape shape-6">
          <img src="../assets/img/shapes/bubble-40.png" alt="Bubble" />
        </li>
        <li class="shape shape-7">
          <img src="../assets/img/shapes/bubble-41.png" alt="Bubble" />
        </li>
        <li class="shape shape-8">
          <img src="../assets/img/shapes/bubble-14.png" alt="Bubble" />
        </li>
        <li class="shape shape-9">
          <img src="../assets/img/shapes/bubble-40.png" alt="Bubble" />
        </li>
      </ul>
    </div>

    <div class="section serviceSec section-padding" id="whatWeDo">
      <div class="container-fluid">
        <div class="section-heading heading-left mb--20 mb_md--70">
          <div class="subtitle">Our Services</div>
          <h2 class="title">
            <span class="gradient-text blue-light">Top IT Services</span> for
            Digital Transformation
          </h2>
          <p>
            Unlock your business's full potential with amortree Tech. Our
            comprehensive range of <strong>IT consulting services</strong>,
            including <strong>custom website development</strong>,
            <strong>UI/UX design</strong>,
            <strong>mobile app UI/UX Design</strong>, and
            <strong>DevOps solutions</strong>, are designed to drive innovation
            and growth. Experience the power of
            <strong>technology-driven transformation</strong> with our expert
            team.
          </p>
        </div>
        <div class="row">
          <div class="col-lg-4 mt--200 mt_md--0">
            <div class="services-grid">
              <div class="thumbnail">
                <img src="../assets/img/icon/research-1.png" alt="icon" />
              </div>
              <div class="content">
                <h3 class="title">
                  <a href="whatWeDo">Research & Strategy</a>
                </h3>
                <p>
                  <strong>Market research</strong> and
                  <strong>strategic planning</strong> are the foundation for
                  informed decision-making, helping amortree Tech deliver
                  tailored <strong>IT solutions</strong> that drive business
                  success and digital transformation.
                </p>
                <a class="more-btn" href="whatWeDo">Find out more</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mt--0">
            <div class="services-grid">
              <div class="thumbnail">
                <img src="../assets/img/icon/brand-2.png" alt="icon" />
              </div>
              <div class="content">
                <h3 class="title">
                  <a href="whatWeDo">Brand Identity Design</a>
                </h3>
                <p>
                  <strong>Professional branding services</strong> shape your
                  business identity, connect with audiences, and tell your
                  story. Let amortree Tech help you create a
                  <strong>memorable brand identity</strong> that stands out in
                  the market!
                </p>
                <a class="more-btn" href="whatWeDo">Find out more</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mt--200 mt_md--0">
            <div class="services-grid">
              <div class="thumbnail">
                <img src="../assets/img/icon/logo-1.png" alt="icon" />
              </div>
              <div class="content">
                <h3 class="title"><a href="whatWeDo">Custom Logo Design</a></h3>
                <p>
                  A <strong>professional logo</strong> is more than just a
                  symbol; it's the face of your brand. amortree Tech creates
                  impactful <strong>custom logo designs</strong>
                  that define brand identities and make lasting impressions.
                </p>
                <a class="more-btn" href="whatWeDo">Find out more</a>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 mt--0">
            <div class="services-grid">
              <div class="thumbnail">
                <img src="../assets/img/icon/web-2.png" alt="icon" />
              </div>
              <div class="content">
                <h3 class="title">
                  <a href="whatWeDo">Website Development</a>
                </h3>
                <p>
                  amortree Tech delivers intuitive
                  <strong>web UI/UX design</strong> and seamless
                  <strong>website development</strong>, ensuring user-friendly,
                  responsive, and engaging
                  <strong>digital experiences</strong> for your brand and
                  business growth.
                </p>
                <a class="more-btn" href="whatWeDo">Find out more</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mt--200 mt_md--0">
            <div class="services-grid">
              <div class="thumbnail">
                <img src="../assets/img/icon/mob-7.png" alt="icon" />
              </div>
              <div class="content">
                <h3 class="title">
                  <a href="whatWeDo">Mobile App UI/UX Design</a>
                </h3>
                <p>
                  <strong>Mobile app UI/UX design</strong> focuses on creating
                  intuitive, user-friendly interfaces that enhance engagement,
                  ensuring seamless navigation and functionality for
                  <strong>mobile applications</strong>.
                </p>
                <a class="more-btn" href="whatWeDo">Find out more</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mt--0">
            <div class="services-grid">
              <div class="thumbnail">
                <img src="../assets/img/icon/devops-1.png" alt="icon" />
              </div>
              <div class="content">
                <h3 class="title"><a href="whatWeDo">DevOps Consulting</a></h3>
                <p>
                  <strong>DevOps consulting services</strong> streamline
                  collaboration between development and operations teams,
                  ensuring efficient software delivery, automation, and
                  continuous integration for seamless performance and
                  <strong>cloud infrastructure management</strong>.
                </p>
                <a class="more-btn" href="whatWeDo">Find out more</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul class="shape-group-services list-unstyled">
        <li class="shape shape-1 d-lg-block d-none">
          <img src="../assets/img/shapes/circle-1.png" alt="Line" />
        </li>
        <li class="shape shape-3 d-lg-block d-none">
          <img src="../assets/img/shapes/bubble-1.png" alt="Line" />
        </li>
        <li class="shape shape-4">
          <img src="../assets/img/amorboy/we-do.png" alt="Line" />
        </li>
        <li class="shape shape-5">
          <img src="../assets/img/shapes/bubble-15.png" alt="Line" />
        </li>
        <li class="shape shape-2">
          <img src="../assets/img/shapes/bubble-2.png" alt="Line" />
        </li>
        <li class="shape shape-5 d-lg-block d-none">
          <img src="../assets/img/shapes/bubble-2.png" alt="Line" />
        </li>
        <li class="shape shape-3 d-lg-block d-none">
          <img src="../assets/img/shapes/bubble-1.png" alt="Line" />
        </li>
        <li class="shape shape-4">
          <img src="../assets/img/amorboy/we-do.png" alt="Line" />
        </li>
      </ul>
    </div>

    <section class="section section-padding-2 bg-color-white">
      <div class="container-fluid">
        <div class="section-heading heading-left">
          <span class="subtitle">Our Recent Clients</span>
          <h2 class="title">
            <span class="gradient-text yellow-light">Trusted </span> by
            <span class="gradient-text yellow-light">Leading</span> Businesses
          </h2>
        </div>

        <div class="">
          <div class="row">
            <div class="col-md-10 mx-md-auto col-lg-6 project branding">
              <div class="project-grid">
                <div class="thumbnail">
                  <a href="project/steadyasset" aria-label="SteadyAsset">
                    <img src="../assets/img/project/c4/project-thum-sa.png" alt="project" />
                    <div class="content">
                      <h3 class="title">
                        <a href="project/steadyasset">SteadyAsset</a>
                      </h3>
                      <span class="subtitle">Logo, Branding, UI/UX Design, Website, GMB, GA</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md-10 mx-md-auto col-lg-6 project branding">
              <div class="project-grid">
                <div class="thumbnail">
                  <a href="project/savedesk" aria-label="SaveDesk">
                    <img src="../assets/img/project/c7/project-thum-sd.png" alt="project" />
                    <div class="content">
                      <h3 class="title">
                        <a href="project/savedesk">SaveDesk</a>
                      </h3>
                      <span class="subtitle">Redesign, UI/UX Design, Wireframing, High-Fidelity
                        Prototype</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md-10 mx-md-auto col-lg-6 project branding">
              <div class="project-grid">
                <div class="thumbnail">
                  <a href="project/samsiddhi-designs" aria-label="Samsiddhi Designs">
                    <img src="../assets/img/project/c9/project-thum-sd.png" alt="project" />
                    <div class="content">
                      <h3 class="title">
                        <a href="project/samsiddhi-designs">Samsiddhi Designs</a>
                      </h3>
                      <span class="subtitle">Logo, Branding, UI/UX Design, Website, GMB, GA</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md-10 mx-md-auto col-lg-6 project branding">
              <div class="project-grid">
                <div class="thumbnail">
                  <a href="project/uae-links" aria-label="UAE Links">
                    <img src="../assets/img/project/c1/project-thum-uaeLinks.png" alt="project" />
                    <div class="content">
                      <h3 class="title">
                        <a href="project/uae-links">UAE Links</a>
                      </h3>
                      <span class="subtitle">UI/UX Design, Website, GA</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="d-lg-flex justify-content-center">
            <a class="amor-btn btn-borderd light" href="portfolio">View Portfolio</a>
          </div>
        </div>
      </div>
      <ul class="shape-group-services list-unstyled">
        <li class="shape shape-3">
          <img src="../assets/img/shapes/bubble-14.png" alt="circle" />
        </li>
        <li class="shape shape-2">
          <img src="../assets/img/shapes/line-9.png" alt="Line" />
        </li>
        <li class="shape shape-2">
          <img src="../assets/img/shapes/bubble-2.png" alt="Line" />
        </li>
      </ul>
    </section>

    <section class="section section-padding bg-color-light" id="reviews">
      <div class="container-fluid">
        <div class="section-heading heading-center">
          <span class="subtitle">What Clients Say</span>
          <h2 class="title">
            <span class="gradient-text yellow-dark">Feedback</span> That
            <span class="gradient-text yellow-dark">Inspires</span> Us
          </h2>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="review-card p-4 h-100">
              <div class="d-flex justify-content-between">
                <div class="stars mb-2">
                  <i class="icofont-star text-warning"></i>
                  <i class="icofont-star text-warning"></i>
                  <i class="icofont-star text-warning"></i>
                  <i class="icofont-star text-warning"></i>
                  <i class="icofont-star text-warning"></i>
                </div>
                <a class="small text-success mb-2" href="https://share.google/VbfvZxWgqZZY3wKnD" target="_blank">Google
                  Review <i class="icofont-link"></i></a>
              </div>
              <p class="mb-3">
                "Amortree is a very professional and end-to-end service
                provider. They have good understanding of the clients needs and
                work in a timely and efficient manner."
              </p>
              <div class="d-flex">
                <img src="../assets/img/project/c4/icon-sa.svg" class="m-0" style="height: 40px"
                  alt="SteadyAsset Logo" />
                <div class="ms-2">
                  <div class="small">Client – SteadyAsset</div>
                  <div class="fw-bold">Menaka Reddy</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="review-card p-4 h-100">
              <div class="d-flex justify-content-between">
                <div class="stars mb-2">
                  <i class="icofont-star text-warning"></i>
                  <i class="icofont-star text-warning"></i>
                  <i class="icofont-star text-warning"></i>
                  <i class="icofont-star text-warning"></i>
                  <i class="icofont-star text-warning"></i>
                </div>
                <a class="small text-success mb-2" href="https://share.google/8H1Msp6toe6G2KbDN" target="_blank">Google
                  Review <i class="icofont-link"></i></a>
              </div>
              <p class="mb-3">
                "Hi, I just wanted to take a moment to express my sincere
                appreciation for the outstanding work you've done. Completing it
                on time and to such a high standard is a testament to your
                dedication and expertise. Your efforts have not gone unnoticed
                and I'm grateful for your contributions. Thank you again for a
                job well done!"
              </p>
              <div class="d-flex">
                <img src="../assets/img/project/c2/icon-sc.svg" class="m-0" style="height: 40px"
                  alt="SteadyAsset Logo" />
                <div class="ms-2">
                  <div class="small">Client – Solved Cube IT Solution</div>
                  <div class="fw-bold">Sandeep L</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="review-card p-4 h-100">
              <div class="d-flex justify-content-between">
                <div class="stars mb-2">
                  <i class="icofont-star text-warning"></i>
                  <i class="icofont-star text-warning"></i>
                  <i class="icofont-star text-warning"></i>
                  <i class="icofont-star text-warning"></i>
                  <i class="icofont-star text-warning"></i>
                </div>
                <a class="small text-success mb-2" href="https://share.google/NG4IIyDdLP6yMJ5tN" target="_blank">Google
                  Review <i class="icofont-link"></i></a>
              </div>
              <p class="mb-3">
                "Amortree Tech is a pleasure to work with. They're responsive,
                professional, and always willing to go the extra mile. I highly
                recommend their services."
              </p>
              <div class="d-flex">
                <img src="../assets/img/project/c9/icon-sd.svg" class="m-0" style="height: 40px"
                  alt="SteadyAsset Logo" />
                <div class="ms-2">
                  <div class="small">Client – Samsiddhi Designs</div>
                  <div class="fw-bold">Bharathkumar MS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul class="list-unstyled shape-group-banner">
        <li class="shape shape-3">
          <img src="../assets/img/shapes/bubble-14.png" alt="Bubble" />
        </li>
        <li class="shape shape-4">
          <img src="../assets/img/shapes/bubble-14.png" alt="Bubble" />
        </li>
        <li class="shape shape-5">
          <img src="../assets/img/shapes/bubble-14.png" alt="Bubble" />
        </li>
        <li class="shape shape-6">
          <img src="../assets/img/shapes/bubble-40.png" alt="Bubble" />
        </li>
        <li class="shape shape-7">
          <img src="../assets/img/shapes/bubble-41.png" alt="Bubble" />
        </li>
        <li class="shape shape-8">
          <img src="../assets/img/shapes/bubble-14.png" alt="Bubble" />
        </li>
        <li class="shape shape-9">
          <img src="../assets/img/shapes/bubble-40.png" alt="Bubble" />
        </li>
      </ul>
    </section>

    <section class="section section-padding-equal bg-color-white" id="about">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="about-us">
              <div class="section-heading heading-left mb-0">
                <span class="subtitle">Who we are</span>
                <h2 class="title mb--40">
                  Your
                  <span class="gradient-text-light text-lg">Digital Growth</span>
                  Partner
                </h2>
                <p>
                  At amortree Tech, we're more than just an
                  <strong>IT consulting company</strong>; we're your strategic
                  partner in leveraging cutting-edge technologies to drive
                  innovation and transformation. Specializing in
                  <strong>custom website development</strong>,
                  <strong>UI/UX design</strong>, and
                  <strong>mobile app UI/UX Design</strong>, we're dedicated to
                  empowering businesses to thrive in the digital age.
                </p>
                <p>
                  Our team of <strong>expert developers</strong> and
                  <strong>designers</strong> is dedicated to delivering
                  customized <strong>IT solutions</strong> that align with your
                  unique needs and objectives. Whether you're focused on
                  enhancing your digital platforms, creating seamless user
                  experiences, or crafting innovative technology solutions, we
                  have the skills and expertise to bring your vision to life.
                </p>
                <p>
                  With a blend of creativity, technical expertise, and a
                  customer-centric approach, we strive to exceed expectations
                  and deliver measurable results. Partner with amortree Tech,
                  and let's embark on a journey of
                  <strong>digital transformation</strong> and success together.
                </p>
                <div class="d-flex justify-content-start gap-3 mt-5">
                  <a href="whoWeAre" class="amor-btn btn-borderd light" tabindex="0">Know more</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-5 col-lg-6 offset-xl-1">
            <img src="../assets/img/amorboy/am-home-abt.png"
              alt="Professional Web Development Team - Custom Website Design Services" />
          </div>
        </div>
      </div>
      <ul class="shape-group-service list-unstyled">
        <li class="shape shape-2">
          <img src="../assets/img/shapes/line-6.png" alt="line" />
        </li>
        <li class="shape shape-3">
          <img src="../assets/img/shapes/line-5.png" alt="line" />
        </li>
      </ul>
    </section>

    <!-- SEO-Enhanced FAQ Section -->
    <section class="section section-padding faqSec bg-color-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 offset-lg-2">
            <div class="section-heading heading-center faq-style">
              <span class="subtitle">Frequently Asked Questions</span>
              <h2 class="title">
                Need
                <span class="gradient-text blue-light">Clarity?</span> We’ve Got
                You
              </h2>
              <p class="px-lg-5">
                Get answers to common questions about our professional web
                development, UI/UX design, and DevOps consulting services.
              </p>
            </div>
            <div class="accordion" id="faqAccordion">
              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                    What services do you provide?
                  </button>
                </h3>
                <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    We offer <b>end-to-end digital solutions</b>, including:

                    <ul class="mt-2">
                      <li>
                        <b>UI/UX Design</b> – wireframes, prototypes, and
                        user-friendly interfaces
                      </li>
                      <li>
                        <b>Website Design & Development</b> – responsive,
                        SEO-ready websites
                      </li>
                      <li>
                        <b>E-commerce Solutions</b> – custom online stores with
                        secure payments
                      </li>
                      <li>
                        <b>Web & Mobile Apps</b> – scalable apps with modern
                        tech stacks
                      </li>
                      <li>
                        <b>IT Consulting & Cloud Services</b> – strategy,
                        hosting, and DevOps support
                      </li>
                      <li>
                        <b>Ongoing Maintenance & Support</b> – updates,
                        security, and performance optimization
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#faq2">
                    Do you provide UI/UX design services?
                  </button>
                </h3>
                <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    Yes, we provide comprehensive
                    <strong>UI/UX design services</strong> including user
                    research, wireframing, prototyping, and visual design. Our
                    <strong>professional designers</strong> create intuitive and
                    engaging user experiences that improve conversion rates and
                    user satisfaction.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#faq3">
                    What is your experience with mobile app UI/UX Design?
                  </button>
                </h3>
                <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    We have extensive experience in
                    <strong>mobile app UI/UX Design</strong> for both iOS and
                    Android platforms. Our services include native app UI/UX
                    Design, cross-platform solutions, and mobile app UI/UX
                    design. We ensure your mobile applications are scalable,
                    secure, and user-friendly.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#faq4">
                    How much does a project cost?
                  </button>
                </h3>
                <div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    Costs vary based on features, design, and complexity. After
                    a free consultation, we provide a clear, tailored quote with
                    no hidden charges.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#faq5">
                    How long will my project take?
                  </button>
                </h3>
                <div id="faq5" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    <p class="mb-2">Timelines depend on scope:</p>
                    <ul>
                      <li>
                        <b>UI/UX Design:</b> Typically 1–3 weeks, depending on
                        the number of screens and complexity of interactions.
                      </li>
                      <li>
                        <b>Website Design:</b> Usually 2–4 weeks for standard
                        corporate or portfolio sites.
                      </li>
                      <li>
                        <b>Website Development:</b> Around 4–8 weeks, depending
                        on features like e-commerce, integrations, or custom
                        functionality.
                      </li>
                      <li><b>Large applications:</b> 3+ months</li>
                    </ul>
                    <p class="mb-0">
                      We always define timelines upfront and keep you updated at
                      every stage with progress milestones.
                    </p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#faq6">
                    Do you provide support after launch?
                  </button>
                </h3>
                <div id="faq6" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    Yes, we offer
                    <b>maintenance, updates, security, and IT support
                      packages</b>
                    so your system stays reliable and up-to-date.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#faq7">
                    Will my website be mobile-friendly?
                  </button>
                </h3>
                <div id="faq7" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    Absolutely. Every site we build is
                    <b>responsive, fast, and optimized for all devices</b>.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#faq8">
                    Do you work with international clients?
                  </button>
                </h3>
                <div id="faq8" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    Yes! We collaborate with businesses across
                    <b>India and worldwide</b>, ensuring smooth communication
                    and delivery.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul class="shape-group-service list-unstyled">
        <li class="shape shape-1">
          <img src="../assets/img/shapes/line-2.png" alt="Bubble" />
        </li>
        <li class="shape shape-3">
          <img src="../assets/img/shapes/bubble-5.png" alt="line" />
        </li>
      </ul>
      <ul class="list-unstyled shape-group-banner">
        <li class="shape shape-2">
          <img src="../assets/img/shapes/bubble-38.png" alt="Bubble" />
        </li>
        <li class="shape shape-3">
          <img src="../assets/img/shapes/bubble-14.png" alt="Bubble" />
        </li>
        <li class="shape shape-4">
          <img src="../assets/img/shapes/bubble-14.png" alt="Bubble" />
        </li>
        <li class="shape shape-5">
          <img src="../assets/img/shapes/bubble-14.png" alt="Bubble" />
        </li>
        <li class="shape shape-6">
          <img src="../assets/img/shapes/bubble-40.png" alt="Bubble" />
        </li>
        <li class="shape shape-7">
          <img src="../assets/img/shapes/bubble-41.png" alt="Bubble" />
        </li>
        <li class="shape shape-8">
          <img src="../assets/img/shapes/bubble-14.png" alt="Bubble" />
        </li>
        <li class="shape shape-9">
          <img src="../assets/img/shapes/bubble-40.png" alt="Bubble" />
        </li>
      </ul>
    </section>
  </main>
</template>


<style lang="scss" scoped>
.amorboy {
  position: absolute;
  width: 100%;
  height: auto;
  bottom: 8%;
  left: 0;
  z-index: -1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 30%;
  }
}
</style>