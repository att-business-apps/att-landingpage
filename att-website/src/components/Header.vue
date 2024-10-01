<script setup>
    // new Vue({
    //     el: "#mobileMenu",
    //     data(){
    //         return {
    //         showMenu: false
    //         }
    //     },
    //     methods: {
    //         showOffcanvasMenu(){
    //             this.showMenu ? this.showMenu = false : this.showMenu = true;
    //         }
    //     }
    // })
</script>

<template>
    <div class="header amor-header header-style-3">
        <nav class="amor-mainmenu navbar navbar-fixed-top">
            <div class="container" id="mobileMenu">
                <div class="header-navbar">
                    <div class="header-logo">
                        <a href="/">
                            <img class="light-version-logo" style="width:220px; margin: 0 auto;"
                                src="../assets/img/att-logo.svg" alt="logo">
                            <!-- <img class="dark-version-logo" src="src/assets/img/logo-white.png" alt="logo">
                              <img class="sticky-logo" src="src/assets/img/logo.png" alt="logo"> -->
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

                        <nav class="offcanvas offcanvas-start" :class="showMenu ? 'show' : ''" tabindex="-1" :style="{ visibility: showMenu ? 'visible' : 'hidden' }">
                            <div class="offcanvas-header">
                                <h5 class="offcanvas-title" id="">Menu</h5>
                                <button type="button" class="btn-close text-reset" @click.prevent="showOffcanvasMenu()"></button>
                            </div>
                            <div class="offcanvas-body">
                                <ul class="mainmenu">
                                    <li><a href="whatWeDo"><span class="text-lb">What</span> we do</a></li>
                                    <li><a href="whoWeAre"><span class="text-lg">Who</span> we are</a></li>
                                    <!-- <li><a href="whyUs"><span class="text-lr">Why</span> us</a></li> -->
                                    <li><a href="whereToFind"><span class="text-lr">Where</span> to find</a></li>
                                </ul>
                            </div>
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
                                        <a href="https://www.facebook.com/amortreetech/" target="_blank">
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                                viewBox="0 0 320 512" height="1em" width="1em"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"/>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://in.linkedin.com/company/amortree-tech" target="_blank">
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                                viewBox="0 0 448 512" height="1em" width="1em"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"/>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com/amortreetech/" target="_blank">
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                                viewBox="0 0 448 512" height="1em" width="1em"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z">
                                                </path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li class="d-none">
                                        <a href="https://www.threads.net/@amortreetech" target="_blank">
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" height="1em"
                                                width="1em" xmlns="http://www.w3.org/2000/svg"
                                                shape-rendering="geometricPrecision" text-rendering="geometricPrecision"
                                                image-rendering="optimizeQuality" fill-rule="evenodd"
                                                clip-rule="evenodd" viewBox="0 0 512 512">
                                                <path d="M331.5 235.7c2.2 .9 4.2 1.9 6.3 2.8c29.2 14.1 50.6 35.2 61.8 61.4c15.7 36.5 17.2 95.8-30.3 143.2c-36.2 36.2-80.3 52.5-142.6 53h-.3c-70.2-.5-124.1-24.1-160.4-70.2c-32.3-41-48.9-98.1-49.5-169.6V256v-.2C17 184.3 33.6 127.2 65.9 86.2C102.2 40.1 156.2 16.5 226.4 16h.3c70.3 .5 124.9 24 162.3 69.9c18.4 22.7 32 50 40.6 81.7l-40.4 10.8c-7.1-25.8-17.8-47.8-32.2-65.4c-29.2-35.8-73-54.2-130.5-54.6c-57 .5-100.1 18.8-128.2 54.4C72.1 146.1 58.5 194.3 58 256c.5 61.7 14.1 109.9 40.3 143.3c28 35.6 71.2 53.9 128.2 54.4c51.4-.4 85.4-12.6 113.7-40.9c32.3-32.2 31.7-71.8 21.4-95.9c-6.1-14.2-17.1-26-31.9-34.9c-3.7 26.9-11.8 48.3-24.7 64.8c-17.1 21.8-41.4 33.6-72.7 35.3c-23.6 1.3-46.3-4.4-63.9-16c-20.8-13.8-33-34.8-34.3-59.3c-2.5-48.3 35.7-83 95.2-86.4c21.1-1.2 40.9-.3 59.2 2.8c-2.4-14.8-7.3-26.6-14.6-35.2c-10-11.7-25.6-17.7-46.2-17.8H227c-16.6 0-39 4.6-53.3 26.3l-34.4-23.6c19.2-29.1 50.3-45.1 87.8-45.1h.8c62.6 .4 99.9 39.5 103.7 107.7l-.2 .2zm-156 68.8c1.3 25.1 28.4 36.8 54.6 35.3c25.6-1.4 54.6-11.4 59.5-73.2c-13.2-2.9-27.8-4.4-43.4-4.4c-4.8 0-9.6 .1-14.4 .4c-42.9 2.4-57.2 23.2-56.2 41.8l-.1 .1z"/>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li class="sidemenu-btn me-2">
                                <a href="https://wa.me/917975859061/?text=I'm%20inquiring%20about%20the%20website%20service."
                                target="_blank" class="">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48"
                                        viewBox="0 0 48 48">
                                        <path fill="#fff"
                                            d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z">
                                        </path>
                                        <path fill="#fff"
                                            d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z">
                                        </path>
                                        <path fill="#cfd8dc"
                                            d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z">
                                        </path>
                                        <path fill="#40c351"
                                            d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z">
                                        </path>
                                        <path fill="#fff" fill-rule="evenodd"
                                            d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </a>
                            </li>
                            <li class="mobile-menu-btn sidemenu-btn d-lg-none d-block">
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
</template>