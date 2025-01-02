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
    .send(serviceID, getTemplate('admin'), params)
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
    .send(serviceID, getTemplate('customer'), params)
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
  if (target == 'admin') return 'template_tcauze5';
  if (target == 'customer') return 'template_svj7071';
}


// New Year

</script>

<template>
  <main>
    <div class="banner banner-style-1">
      <div class="container">
        <div class="row align-items-end align-items-xl-end">
          <div class="col-lg-6 pb-5">
            <div class="banner-content">
              <div class="animate__animated fadeInUp" style="animation-duration: 1s">
                <h1 class="title d-inline">
                  A Touch of Class for Your
                  <span class="gradient-text-light">Digital Presence</span>.
                </h1>
                <h4>
                  Sleek.
                  <span class="gradient-text blue-dark">Stylish.</span> Classy.
                </h4>
                <p class="subtitle">
                  At amortree Tech, we're passionate about harnessing the power
                  of technology to transform businesses and drive innovation. As
                  a leading provider of comprehensive IT solutions, we
                  specialize in a wide range of services tailored to meet the
                  diverse needs of our clients.
                </p>
                <a class="amor-btn btn-fill-primary btn-large" href="portfolio">View Portfolio</a>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="contact-form-box banner-form">
              <h4 class="title">Unlock Your Online Potential</h4>
              <form class="amor-contact-form">
                <h5 class="mb-2">We’d love to know more about your project needs!</h5>
                <p class="mb-3">Submit your query, and we’ll reach out to you shortly!</p>
                <div class="form-group mb--40">
                  <!-- <label>How can we help you?</label> -->
                  <textarea name="contact-message" id="message" class="form-control textarea" v-model="message"
                    cols="30" rows="2" placeholder="How can we help you?" required></textarea>
                </div>


                <h5 class="mt-3 mb-2">Your Contact Details</h5>
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
      <ul class="list-unstyled shape-group-21">
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
      </ul>
    </div>

    <div class="section serviceSec section-padding" id="whatWeDo">
      <div class="container">
        <div class="section-heading heading-left mb--20 mb_md--70">
          <div class="subtitle">What we do</div>
          <h2 class="title">
            <span class="gradient-text blue-light">Services we can help</span> you
            with
          </h2>
          <p>
            Unlock your business's full potential with amortree Tech. Our wide
            range of IT services, including website design, UI/UX, Sass
            products, and mobile app development, are designed to drive
            innovation and growth. Experience the power of technology-driven
            transformation.
          </p>
        </div>
        <div class="row">
          <div class="col-lg-4 mt--200 mt_md--0">
            <div class="services-grid">
              <div class="thumbnail">
                <img src="../assets/img/icon/research-1.png" alt="icon" />
              </div>
              <div class="content">
                <h5 class="title"><a href="whatWeDo">Research</a></h5>
                <p>
                  Research and strategy are the foundation for informed decision-making, helping amortree Tech deliver
                  tailored solutions that drive business success.
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
                <h5 class="title"><a href="whatWeDo">Branding</a></h5>
                <p>
                  Branding shapes your business identity, connects with audiences, and tells your story. Let amortree
                  Tech help you stand out!
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
                <h5 class="title"><a href="whatWeDo">Logo Design</a></h5>
                <p>
                  A logo is more than just a symbol; it’s the face of your brand. amortree Tech creates impactful logos
                  that define identities.
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
                <h5 class="title"><a href="whatWeDo">Website</a></h5>
                <p>
                  amortree Tech delivers intuitive Web UI/UX design and seamless development, ensuring user-friendly,
                  responsive, and engaging digital experiences for your brand.
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
                <h5 class="title"><a href="whatWeDo">Mobile App UI/UX</a></h5>
                <p>
                  Mobile App UI/UX design focuses on creating intuitive, user-friendly interfaces that enhance
                  engagement, ensuring seamless navigation and functionality.
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
                <h5 class="title"><a href="whatWeDo">DevOps</a></h5>
                <p>
                  DevOps streamlines collaboration between development and operations teams, ensuring efficient software
                  delivery, automation, and continuous integration for seamless performance.
                </p>
                <a class="more-btn" href="whatWeDo">Find out more</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul class="shape-group-7 list-unstyled">
        <li class="shape shape-1 d-lg-block d-none"><img src="../assets/img/shapes/circle-1.png" alt="Line"></li>
        <li class="shape shape-3 d-lg-block d-none"><img src="../assets/img/shapes/bubble-1.png" alt="Line"></li>
        <li class="shape shape-4"><img src="../assets/img/amorboy/we-do.png" alt="Line"></li>
        <li class="shape shape-5"><img src="../assets/img/shapes/bubble-15.png" alt="Line"></li>
        <li class="shape shape-2"><img src="../assets/img/shapes/bubble-2.png" alt="Line" /></li>
        <li class="shape shape-5 d-lg-block d-none"><img src="../assets/img/shapes/bubble-2.png" alt="Line" /></li>
        <li class="shape shape-3 d-lg-block d-none"><img src="../assets/img/shapes/bubble-1.png" alt="Line" /></li>
        <li class="shape shape-4"><img src="../assets/img/amorboy/we-do.png" alt="Line" /></li>
      </ul>
    </div>

    <section class="section section-padding-2 bg-color-white">
      <div class="container">
        <div class="section-heading heading-left">
          <span class="subtitle">Portfolio</span>
          <h2 class="title">Some of our <br> finest work.</h2>
        </div>

        <div class="">
          <div class="row row-35 isotope-list">
            <div class="col-md-6 project branding">
              <div class="project-grid">
                <div class="thumbnail">
                  <a href="https://uaelinks.ae/" target="_blank">
                    <img src="../assets/img/project/c1/project-thum-uaeLinks.png" alt="project">
                  </a>
                </div>
                <div class="content">
                  <h4 class="title"><a href="https://uaelinks.ae/" target="_blank">UAE Links</a></h4>
                  <span class="subtitle">UI/UX Design, Website</span>
                </div>
              </div>
            </div>
            <div class="col-md-6 project branding">
              <div class="project-grid">
                <div class="thumbnail">
                  <a href="https://solvedcubeitsolutions.com/" target="_blank">
                    <img src="../assets/img/project/c2/project-thum-sc.png" alt="project">
                  </a>
                </div>
                <div class="content">
                  <h4 class="title"><a href="https://solvedcubeitsolutions.com/" target="_blank">Solved Cude</a></h4>
                  <span class="subtitle">Logo, Branding, UI/UX Design, Website, GMB</span>
                </div>
              </div>
            </div>
            <div class="col-md-6 project branding">
              <div class="project-grid">
                <div class="thumbnail">
                  <a href="https://steadyasset.com/" target="_blank">
                    <img src="../assets/img/project/c3/project-thum-sa.png" alt="project">
                  </a>
                </div>
                <div class="content">
                  <h4 class="title"><a href="https://steadyasset.com/" target="_blank">SteadyAsset</a></h4>
                  <span class="subtitle">Logo, Branding, UI/UX Design, Website</span>
                </div>
              </div>
            </div>
            <div class="col-md-6 project branding">
              <div class="project-grid">
                <div class="thumbnail">
                  <a href="http://alshamil.co:8082/" target="_blank">
                    <img src="../assets/img/project/c4/project-thum-als.png" alt="project">
                  </a>
                </div>
                <div class="content">
                  <h4 class="title"><a href="http://alshamil.co:8082/" target="_blank">Al-Shamil</a></h4>
                  <span class="subtitle">UI/UX Design, Website</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul class="shape-group-7 list-unstyled">
        <li class="shape shape-3"><img src="../assets/img/shapes/bubble-14.png" alt="circle"></li>
        <li class="shape shape-2"><img src="../assets/img/shapes/line-9.png" alt="Line"></li>
        <li class="shape shape-2"><img src="../assets/img/shapes/bubble-2.png" alt="Line"></li>
      </ul>
    </section>

    <section class="section section-padding-equal bg-color-light pb-0" id="about">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="about-us">
              <div class="section-heading heading-left mb-0">
                <span class="subtitle">Who we are</span>
                <h2 class="title mb--40">
                  We do
                  <span class="gradient-text-light">design, code</span> &amp;
                  devops.
                </h2>
                <p>
                  At amortree Tech, we're more than just an IT consulting firm;
                  we're your strategic partner in leveraging cutting-edge
                  technologies to drive innovation and transformation.
                  Specializing in Website/App Design and Development, we're
                  dedicated to empowering businesses to thrive in the digital
                  age.
                </p>
                <p>
                  Our team of experts is dedicated to delivering customized solutions that align with your unique needs
                  and objectives. Whether you're focused on enhancing your digital platforms, creating seamless user
                  experiences, or crafting innovative technology solutions, we have the skills and expertise to bring
                  your vision to life.
                </p>
                <p>
                  With a blend of creativity, technical expertise, and a
                  customer-centric approach, we strive to exceed expectations
                  and deliver measurable results. Partner with amortree Tech,
                  and let's embark on a journey of innovation and success
                  together.
                </p>
                <a href="whoWeAre" class="amor-btn btn-fill-primary btn-sm" tabindex="0">Find out more</a>
              </div>
            </div>
          </div>
          <div class="col-xl-5 col-lg-6 offset-xl-1">
            <img src="../assets/img/amorboy/am-home-abt.png" alt="Bubble" />
          </div>
        </div>
      </div>
      <ul class="shape-group-6 list-unstyled">
        <li class="shape shape-1">
          <img src="../assets/img/shapes/line-2.png" alt="Bubble" />
        </li>
        <li class="shape shape-2">
          <img src="../assets/img/shapes/line-7.png" alt="line" />
        </li>
        <li class="shape shape-3">
          <img src="../assets/img/shapes/line-8.png" alt="line" />
        </li>
      </ul>
    </section>
  </main>
</template>
