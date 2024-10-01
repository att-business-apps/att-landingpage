<script setup>
import { ref } from "vue";

const disableBtn=ref(false);
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

function getTemplate(target){
  if(target=='admin')return 'template_tcauze5';
  if(target=='customer')return 'template_svj7071';
}
</script>

<template>
    <div class="breadcrum-area breadcrumb-banner">
        <div class="container">
            <div class="breadcrumb">
                <div class="section-heading heading-left">
                    <h1 class="title h2 mb-0">Need Assistance? Let’s Connect!</h1>
                    <p>We’re here to help with all your branding, design and development needs.</p>
                </div>
                <ul class="list-unstyled">
                    <li><a href="/">Home</a></li>
                    <li class="active">Where to find</li>
                </ul>
            </div>
            <div class="banner-thumbnail">
                <div class=""
                    style="position: relative; will-change: transform; transform: perspective(2000px) rotateX(-0.32deg) rotateY(-11.76deg) scale3d(1, 1, 1);">
                    <img src="../assets/img/amorboy/am-contact.png" class="w-75 animate__animated slideInRight"
                        style="animation-duration: 3s" alt="Illustration">
                </div>
            </div>
        </div>
        <ul class="shape-group-8 list-unstyled">
            <li class="shape shape-2 sal-animate" data-sal="slide-left" data-sal-duration="500" data-sal-delay="200">
                <img src="../assets/img/bubble-21.png" alt="circle">
            </li>
            <li class="shape shape-3 sal-animate" data-sal="slide-up" data-sal-duration="500" data-sal-delay="300">
                <img src="../assets/img/line-1.png" alt="circle">
            </li>
        </ul>
    </div>

    <div class="section section-padding">
        <div class="container">
            <div class="row">
                <div class="col-xl-5 col-lg-6">
                    <div class="contact-form-box shadow-box mb--30">
                        <h3 class="title">Get a free amortree tech quote now</h3>
                        <form class="amor-contact-form">
                            <div class="form-group">
                            <label>Name</label>
                            <input type="text" v-model="from_name" class="form-control" name="contact-name"
                                placeholder="John Smith" required="" />
                            </div>
                            <div class="form-group">
                            <label>Email</label>
                            <input type="email" v-model="email" class="form-control" name="contact-email"
                                placeholder="example@mail.com" required />
                            </div>
                            <div class="form-group mb--40">
                            <label>Phone</label>
                            <input type="tel" class="form-control" v-model="phoneNumber" name="contact-phone"
                                placeholder="+123456789" required />
                            </div>
                            <div class="form-group mb--40">
                            <label>How can we help you?</label>
                            <textarea name="contact-message" id="message" class="form-control textarea" v-model="message"
                                cols="30" rows="6" required></textarea>
                            </div>
                            <div class="form-group">
                            <button @click="sendMail" type="button" class="amor-btn btn-fill-primary btn-fluid btn-primary"
                                name="submit-btn" :disabled="disableBtn">
                                Send
                            </button>
                            </div>
                            <div class="form-group"></div>
                        </form>
                    </div>
                </div>
                <div class="col-xl-5 col-lg-6 offset-xl-1">
                    <div class="contact-info mb--100 mb_md--30 mt_md--0 mt--150">
                        <h4 class="title">Phone</h4>
                        <p>Reach out for any queries; our experts are here to assist and resolve your concerns promptly.</p>
                        <h4 class="phone-number"><a href="tel:+917975859061">+91 79758 59061</a></h4>
                    </div>

                    <div class="contact-info mb--30">
                        <h4 class="title">Email</h4>
                        <p>Our support team will get back to in 24-h during standard business hours.</p>
                        <h5 class="text-white mb-0">Say hi to,</h5>
                        <h4 class="phone-number"><a href="mailto:hi@amortree.com">hi@amortree.com</a></h4>
                    </div>
                </div>
            </div>
        </div>
        <ul class="list-unstyled shape-group-12">
            <li class="shape shape-1"><img src="../assets/img/bubble-2.png" alt="Bubble"></li>
            <li class="shape shape-2"><img src="../assets/img/bubble-1.png" alt="Bubble"></li>
            <li class="shape shape-3"><img src="../assets/img/circle-3.png" alt="Circle"></li>
        </ul>
    </div>
</template>

<style>
@media (min-width: 1024px) {}
</style>
