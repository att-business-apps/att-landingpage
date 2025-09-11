<template>
    <div class="breadcrum-area breadcrumb-banner">
        <div class="container-fluid">
            <div class="breadcrumb">
                <ul class="list-unstyled">
                    <li><a href="/">Home</a></li>
                    <li class="active">Estimate</li>
                </ul>
                <div class="section-heading heading-left">
                    <h1 class="title h2">We love projects.</h1>
                    <p>Do you have anything interesting for us?</p>
                </div>
            </div>
            <div class="banner-thumbnail">
                <div class=""
                    style="position: relative; will-change: transform; transform: perspective(2000px) rotateX(-0.32deg) rotateY(-11.76deg) scale3d(1, 1, 1);">
                    <img src="../assets/img/amorboy/am-estimate.png" class="w-75 animate__animated slideInRight"
                        style="animation-duration: 3s" alt="Illustration">
                </div>
            </div>
        </div>
        <ul class="shape-group-8 list-unstyled">
            <li class="shape shape-2 sal-animate" data-sal="slide-left" data-sal-duration="500" data-sal-delay="200">
                <img src="../assets/img/shapes/bubble-21.png" alt="circle">
            </li>
            <li class="shape shape-3 sal-animate" data-sal="slide-up" data-sal-duration="500" data-sal-delay="300">
                <img src="../assets/img/shapes/line-1.png" alt="circle">
            </li>
        </ul>
    </div>


    <section class="section section-padding">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-8 col-lg-6 mx-lg-auto">
                    <div class="contact-form-box shadow-box mb--30">
                        <!-- <h3 class="title">Hi,</h3> -->
                        <form method="POST" action="mail.php" class="axil-contact-form">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>First Name</label>
                                        <input type="text" class="form-control" name="name" placeholder="">
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Last Name</label>
                                        <input type="text" class="form-control" name="name" placeholder="">
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Phone</label>
                                        <input type="tel" class="form-control" name="Phone" placeholder="+123456789">
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Website</label>
                                        <input type="text" class="form-control" name="website"
                                            placeholder="www.example.com">
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Email</label>
                                        <input type="email" class="form-control" name="name"
                                            placeholder="example@mail.com">
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group mb--30">
                                        <label>How can we help you?</label>
                                        <textarea name="message" id="message" class="form-control textarea" cols="30"
                                            rows="4"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" class="form-control" name="contact-name">
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" class="form-control" name="contact-email">
                            </div>
                            <div class="form-group">
                                <label>Company</label>
                                <input type="text" class="form-control" name="contact-company">
                            </div>
                            <div class="form-group mb--40">
                                <label>How can we help you?</label>
                                <textarea name="contact-message" id="contact-message" class="form-control textarea"
                                    cols="30" rows="4"></textarea>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="amor-btn btn-fill-primary btn-fluid btn-primary"
                                    name="submit-btn">Get Pricing Now</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <ul class="list-unstyled shape-group-12">
            <li class="shape shape-1"><img src="../assets/img/shapes/bubble-2.png" alt="Bubble"></li>
            <li class="shape shape-2"><img src="../assets/img/shapes/bubble-1.png" alt="Bubble"></li>
        </ul>
    </section>

    <div class="grid-container">
        <div class="grid-container">
            <div class="Leftbefore wow d-inline-block" style="visibility: visible;">
                <div class="fadeInLeft wow" style="visibility: visible; animation-name: fadeInLeft;">
                    <div class="alert alert-success form_success mb-50" style="display:none;"></div>
                    <div class="alert alert-danger form_error mb-50" style="display:none;"></div>
                </div>
            </div>
        </div>
        <form name="HContactForm" id="HContactForm" method="POST" novalidate="novalidate">
            <input type="hidden" name="frm_page" value="https://www.litmusbranding.com/web-design-development/">
            <input type="hidden" name="frm_type" value="project">
            <div class="quickfrm d-flex flex-wrap grid-4 grid-1-offset justify-content-center">
                <div class="w-100 d-flex fromgroup position-relative mb-150">
                    <label class="labelfocus">Hi, what’s your name?</label>
                    <div class="grid-3 pr-20">
                        <input type="text" placeholder="First" class="textFocus" name="cname" id="cf_cname" required="">
                    </div>
                    <div class="grid-3 pl-20">
                        <input type="text" placeholder="Last" class="textFocus" name="clname" id="cf_clname">
                    </div>
                </div>
                <div class="w-100 d-flex fromgroup position-relative mb-150">
                    <label>What is the name of your company?</label>
                    <div class="grid-8">
                        <input type="text" class="textFocus" name="ccompany" id="cf_ccompany">
                    </div>
                </div>
                <div class="w-100 d-flex fromgroup position-relative mb-150">
                    <label>Please tell us how we can help you.</label>
                    <div class="grid-8">
                        <textarea class="textFocus" name="project" id="cf_project"></textarea>

                        <!-- <div class="selectClick">
                            <select class="textFocus Selectdisebled"  name="project" id="cf_project">
                                <option value="">I Have a Project</option>
                                <option value="Brand Strategy">Brand Strategy</option>
                                <option value="Social Strategy">Social Strategy</option>
                                <option value="Content Strategy">Content Strategy</option>
                                <option value="Logo Strategy">Logo Strategy</option>
                                <option value="Website Strategy">Website Strategy</option>
                            </select>
                        </div> -->
                    </div>
                    <!-- <p><b>Shift</b> + <b>Enter</b> to make a line break</p> -->
                </div>
                <div class="w-100 d-flex fromgroup position-relative mb-150">
                    <label>Please tell us more about your current needs.</label>
                    <div class="grid-8">
                        <input type="text" class="textFocus" name="cneeds" id="cf_cneeds">
                    </div>
                </div>
                <div class="w-100 d-flex fromgroup position-relative mb-150">
                    <label>Your website?</label>
                    <div class="grid-8">
                        <input type="text" class="textFocus" name="companyURL" id="cf_companyURL">
                    </div>
                </div>
                <div class="w-100 d-flex fromgroup position-relative mb-150">
                    <label>Any project brief or RFP for us?</label>
                    <div class="grid-8">
                        <div class="checkborderbox checkYes">
                            <div class="radiobox">
                                <input name="radioyesno" value="Yes" id="Yes" type="radio" class="textFocus">
                                <label for="Yes">Yes</label>
                            </div>
                            <div class="radiobox">
                                <input name="radioyesno" value="Not yet" id="notYet" type="radio" class="textFocus">
                                <label for="notYet">Not yet</label>
                            </div>
                        </div>
                        <div class="position-relative uploadBox">
                            <label for="file-upload" class="custom-file-upload">
                                Upload Your file
                            </label>
                            <input id="file-upload" type="file" name="fileuplod" accept=".doc, .docx, .pdf">
                            <small>Please upload the file in .pdf or .docx format</small>
                        </div>
                    </div>
                </div>
                <div class="w-100 d-flex fromgroup position-relative mb-150">
                    <label>Email address *</label>
                    <div class="grid-8">
                        <input type="email" class="textFocus" name="eaddress" id="cf_eaddress" required="">
                    </div>
                </div>
                <div class="w-100 d-flex fromgroup position-relative mb-150">
                    <label>Preferable number to call you? *</label>
                    <div class="grid-8">
                        <input type="text" class="textFocus" name="cnumber" id="cf_cnumber">
                    </div>
                </div>
                <div class="w-100 d-flex fromgroup position-relative mb-150">
                    <label>What do you want from us? *</label>
                    <div class="grid-8 d-flex">
                        <div class="checkboxicon position-relative">
                            <input name="checkmulti[]" value="Research" id="Reserch" type="checkbox" class="textFocus">
                            <label for="Reserch">
                                <i class="iconplus"></i>
                                <span>Research</span>
                            </label>
                        </div>
                        <div class="checkboxicon position-relative">
                            <input name="checkmulti[]" value="Strategy" id="Strategy" type="checkbox" class="textFocus">
                            <label for="Strategy">
                                <i class="iconplus"></i>
                                <span>Strategy</span>
                            </label>
                        </div>
                        <div class="checkboxicon position-relative">
                            <input name="checkmulti[]" value="Identity" id="Identity" type="checkbox" class="textFocus">
                            <label for="Identity">
                                <i class="iconplus"></i>
                                <span>Identity</span>
                            </label>
                        </div>
                        <div class="checkboxicon position-relative">
                            <input name="checkmulti[]" value="Digital" id="Digital" type="checkbox" class="textFocus">
                            <label for="Digital">
                                <i class="iconplus"></i>
                                <span>Digital</span>
                            </label>
                        </div>
                        <div class="checkboxicon position-relative">
                            <input name="checkmulti[]" value="Advertising" id="Advertising" type="checkbox"
                                class="textFocus">
                            <label for="Advertising">
                                <i class="iconplus"></i>
                                <span>Advertising</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="w-100 d-flex fromgroup position-relative mb-150">
                    <label>What is your budget?</label>
                    <div class="grid-8">
                        <span class="irs irs--big js-irs-0"><span class="irs"><span class="irs-line"
                                    tabindex="0"></span><span class="irs-min"
                                    style="display: none; visibility: hidden;">0</span><span class="irs-max"
                                    style="display: none; visibility: visible;">1</span><span class="irs-from"
                                    style="visibility: hidden;">0</span><span class="irs-to"
                                    style="visibility: hidden;">0</span><span class="irs-single"
                                    style="left: -0.764927%;">₹5,00,000</span></span><span class="irs-grid"></span><span
                                class="irs-bar irs-bar--single" style="left: 0px; width: 2.62495%;"></span><span
                                class="irs-shadow shadow-single" style="display: none;"></span><span
                                class="irs-handle single" style="left: 0%;"><i></i><i></i><i></i></span></span><input
                            type="text" class="js-range-slider irs-hidden-input" id="Priceslider" name="pricerange"
                            value="" tabindex="-1" readonly="">
                        <!-- <select class="textFocus">
                                <option value="">Approximate Budget</option>
                                <option value="Brand">50K</option>
                                <option value="3">50K to 100K</option>
                                <option value="3">100K to 1000K</option>
                            </select> -->
                    </div>
                </div>

                <div class="w-100 d-flex mb-150">
                    <div class="checkagreecol position-relative">
                        <input type="checkbox" placeholder="I Agree" name="cf_agree" id="cf_agree" value="agree">
                        <label for="cf_agree">I agree to receive information about services, updates, or recommendations
                            via email from Litmus.</label>
                    </div>
                    <span for="cf_agree" class="help-block help-block-error"></span>
                </div>
                <div class="w-100 position-relative">
                    <div class="d-inline-block position-relative poploader">
                        <div class="button-white-circle">
                            <input type="submit" name="Submit" value="Submit">
                        </div>
                        <div class="loaderspinner"></div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
