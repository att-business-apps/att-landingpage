<script setup>

</script>

<template>
    <div class="header amor-header header-style-3">
        <nav class="amor-mainmenu navbar navbar-fixed-top">
            <div class="container" id="mobileMenu">
                <div class="header-navbar">
                    <div class="header-logo">
                        <a href="/">
                            <img class="light-version-logo" style="width:220px; margin: 0 auto;"
                                src="../assets/img/att-logo-dark.svg" alt="amortree Tech logo" />
                        </a>
                    </div>
                    <div class="header-main-nav">
                        <nav class="mainmenu-nav">
                            <ul class="mainmenu">
                                <li><a href="whatWeDo"><span class="text-lb">What</span> we do</a></li>
                                <li><a href="whoWeAre"><span class="text-lg">Who</span> we are</a></li>
                                <!-- <li><a href="whyUs"><span class="text-lr">Why</span> us</a></li> -->
                                <li><a href="whereToFind"><span class="text-lr">Where</span> to find</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div class="menu" id="menu">
                        <ul class="menu-list d-none">
                            <li class="menu-item">
                                <a href="#whatWeDo" class="menu-link is-active">
                                    <i class="menu-icon ion-md-home"></i>
                                    <span class="menu-name">What we do</span>
                                </a>
                            </li>
                            <li class="menu-item">
                                <a href="#about" class="menu-link">
                                    <i class="menu-icon ion-md-search"></i>
                                    <span class="menu-name">Who we are</span>
                                </a>
                            </li>
                            <li class="menu-item">
                                <a href="contact" class="menu-link">
                                    <i class="menu-icon ion-md-cart"></i>
                                    <span class="menu-name">Contact</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="header-action">
                        <ul class="list-unstyled">
                            <li class="header-social-link">
                                <ul class="social-icon-list list-unstyled">
                                    <li>
                                        <a href="https://in.linkedin.com/company/amortree-tech" target="_blank">
                                            <img src="../assets/img/icon/sm-l.png" width="40" alt="amortree linkedin" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com/amortreetech/" target="_blank">
                                            <img src="../assets/img/icon/sm-i.png" width="40"
                                                alt="amortree instagram" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.facebook.com/amortreetech/" target="_blank">
                                            <img src="../assets/img/icon/sm-f.png" width="40" alt="amortree facebook" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://dribbble.com/amortreetech" target="_blank">
                                            <img src="../assets/img/icon/sm-d.png" width="40" alt="amortree dribbble" />
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li class="sidemenu-btn me-2">
                                <a href="https://wa.me/917975859061/?text=I'm%20inquiring%20about%20the%20website%20service."
                                    target="_blank" class="">
                                    <img src="../assets/img/icon/whatsapp.png" width="54" alt="amortree facebook" />
                                </a>
                            </li>
                            <li class="mobile-menu-btn sidemenu-btn d-lg-none d-none">
                                <button class="btn-wrap" type="button" @click.prevent="showOffcanvasMenu()">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </div>

    <div class="christmas-lights-line d-none">
        <span style="--_pos: 1px" class="lightbulb"></span>
        <span style="--_pos: 2px" class="lightbulb d-none d-md-block"></span>
        <span style="--_pos: 3px" class="lightbulb"></span>
        <span style="--_pos: 4px" class="lightbulb d-none d-md-block"></span>
        <span style="--_pos: 5px" class="lightbulb"></span>
        <span style="--_pos: 6px" class="lightbulb d-none d-md-block"></span>
        <span style="--_pos: 7px" class="lightbulb"></span>
        <span style="--_pos: 8px" class="lightbulb d-none d-md-block"></span>
        <span style="--_pos: 9px" class="lightbulb"></span>
        <span style="--_pos: 10px" class="lightbulb d-none d-md-block"></span>
        <span style="--_pos: 11px" class="lightbulb"></span>
        <span style="--_pos: 12px" class="lightbulb d-none d-md-block"></span>
        <span style="--_pos: 11px" class="lightbulb"></span>
        <span style="--_pos: 10px" class="lightbulb d-none d-md-block"></span>
        <span style="--_pos: 9px" class="lightbulb"></span>
        <span style="--_pos: 8px" class="lightbulb d-none d-md-block"></span>
        <span style="--_pos: 7px" class="lightbulb"></span>
        <span style="--_pos: 6px" class="lightbulb d-none d-md-block"></span>
        <span style="--_pos: 5px" class="lightbulb"></span>
        <span style="--_pos: 4px" class="lightbulb d-none d-md-block"></span>
        <span style="--_pos: 3px" class="lightbulb"></span>
        <span style="--_pos: 2px" class="lightbulb d-none d-md-block"></span>
        <span style="--_pos: 1px" class="lightbulb"></span>
        <span style="--_pos: 0px" class="lightbulb d-none d-md-block"></span>
    </div>
</template>