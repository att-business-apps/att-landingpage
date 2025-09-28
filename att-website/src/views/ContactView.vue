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
</script>

<template>
    <div class="breadcrum-area breadcrumb-banner">
        <div class="container-fluid">
            <div class="breadcrumb animate__animated fadeInUp" style="animation-duration: 2s">
                <ul class="list-unstyled">
                    <li><a href="/">Home</a></li>
                    <li class="active text-lr">Where to find</li>
                </ul>
                <div class="section-heading heading-left">
                    <h1 class="title h2 mb-0">Professional Web Development & IT Services Contact</h1>
                    <p>Leading web development company ready to help with all your custom website design, UI/UX
                        services, mobile app UI/UX Design, and DevOps consulting needs.</p>
                </div>
            </div>
            <div class="banner-thumbnail">
                <div class=""
                    style="position: relative; will-change: transform; transform: perspective(2000px) rotateX(-0.32deg) rotateY(-11.76deg) scale3d(1, 1, 1);">
                    <img src="../assets/img/amorboy/am-contact.png" class="w-50 animate__animated slideInRight"
                        style="animation-duration: 3s" alt="Illustration">
                </div>
            </div>
        </div>
        <ul class="shape-group-breadcrum-1 list-unstyled">
            <li class="shape shape-2 sal-animate" data-sal="slide-left" data-sal-duration="500" data-sal-delay="200">
                <img src="../assets/img/shapes/bubble-10.png" alt="circle">
            </li>
            <li class="shape shape-3 sal-animate" data-sal="slide-up" data-sal-duration="500" data-sal-delay="300">
                <img src="../assets/img/shapes/line-5.png" alt="circle">
            </li>
        </ul>
    </div>

    <div class="section section-padding">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-6">
                    <div class="contact-form-box shadow-box mb--30 animate__animated fadeInUp"
                        style="animation-duration: 2s">
                        <form class="amor-contact-form">
                            <h4 class="mb-2">We’d love to know more about your project needs!</h4>
                            <p class="mb-3">Submit your query, and we’ll reach out to you shortly!</p>
                            <div class="form-group mb--40">
                                <!-- <label>How can we help you?</label> -->
                                <textarea name="contact-message" id="message" class="form-control textarea"
                                    v-model="message" cols="30" rows="6" placeholder="How can we help you?"
                                    required></textarea>
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
                                <input type="email" v-model="email" class="form-control" name="contact-email"
                                    placeholder="Your Email" required />
                            </div>
                            <div class="form-group mb--40">
                                <!-- <label>Phone</label> -->
                                <input type="tel" class="form-control" v-model="phoneNumber" name="contact-phone"
                                    placeholder="Your Phone" required />
                            </div>
                            <div class="form-group">
                                <button @click="sendMail" type="button" class="amor-btn btn-borderd btn-fluid light"
                                    name="submit-btn" :disabled="disableBtn">
                                    Send Enquiry
                                </button>
                            </div>
                            <div class="form-group"></div>
                        </form>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-6 offset-xl-1">
                    <div class="contact-info footer-contact mb--100 mb_md--30 mt_md--0 mt--150">
                        <h4 class="title">Phone</h4>
                        <p>Reach out for any queries; our experts are here to assist and resolve your concerns promptly.
                        </p>
                        <h4 class="phone-number"><a href="tel:+919916846647">+91 99168 46647</a></h4>
                    </div>

                    <div class="contact-info footer-contact mb--30">
                        <h4 class="title">Email</h4>
                        <p>Our support team will get back to you in 24-h during standard business days (Mon-Sat).</p>
                        <h5 class="text-white mb-0">Say hi to,</h5>
                        <h4 class="phone-number"><a href="mailto:hi@amortree.com">hi@amortree.com</a></h4>
                    </div>
                </div>
            </div>
        </div>
        <ul class="list-unstyled shape-group-contact">
            <li class="shape shape-0" style="opacity: 1;"><img src="../assets/img/amorboy/am-contact-form.png"
                    alt="Bubble"></li>
            <li class="shape shape-1"><img src="../assets/img/shapes/bubble-2.png" alt="Bubble"></li>
            <li class="shape shape-2"><img src="../assets/img/shapes/bubble-1.png" alt="Bubble"></li>
            <li class="shape shape-3"><img src="../assets/img/shapes/circle-1.png" alt="Circle"></li>
            <li class="shape shape-3"><img src="../assets/img/shapes/circle-1.png" alt="Circle"></li>
            <li class="shape shape-3"><img src="../assets/img/shapes/circle-1.png" alt="Circle"></li>
            <li class="shape shape-3"><img src="../assets/img/shapes/circle-1.png" alt="Circle"></li>
            <li class="shape shape-3"><img src="../assets/img/shapes/circle-1.png" alt="Circle"></li>
            <li class="shape shape-3"><img src="../assets/img/shapes/circle-1.png" alt="Circle"></li>
            <li class="shape shape-3"><img src="../assets/img/shapes/circle-1.png" alt="Circle"></li>
        </ul>
    </div>
</template>

<style>
h4.phone-number a {
    color: #dc3c2d;
}

@media only screen and (max-width: 767px) {
    .section-padding {
        padding: 120px 0 30px;
    }
}
</style>
