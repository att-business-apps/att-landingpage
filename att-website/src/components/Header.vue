<template>
    <div class="header amor-header header-style-3">
      <nav class="amor-mainmenu navbar navbar-fixed-top">
        <div class="container">
          <div class="header-navbar">
            <div class="header-logo">
              <a href="/index.html">
                <img class="light-version-logo" style="width:220px;" src="../assets/img/logo.png" alt="logo">
                <!-- <img class="dark-version-logo" src="src/assets/img/logo-white.png" alt="logo">
                              <img class="sticky-logo" src="src/assets/img/logo.png" alt="logo"> -->
              </a>
            </div>
            <div class="header-main-nav">
              <nav class="mainmenu-nav">
                <ul class="mainmenu">
                    <li><a href="#whatWeDo">What we do</a></li>
                    <li><a href="#about">Who we are</a></li>
                  <!-- <li><a href="/about.html">Our Work</a></li> -->
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </nav>
            </div>
            <div class="header-action">
              <ul class="list-unstyled">
                <li class="header-social-link">
                  <ul class="social-icon-list list-unstyled">
                    <li>
                      <a href="https://www.facebook.com/amortreetech/" target="_blank">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512"
                          height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z">
                          </path>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="https://in.linkedin.com/company/amortree-tech" target="_blank">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512"
                          height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z">
                          </path>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/amortreetech/" target="_blank">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512"
                          height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z">
                          </path>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="sidemenu-btn d-none">
                  <button class="btn-wrap"><span></span><span></span><span></span></button>
                </li>
                <li class="my_switcher d-none">
                  <button>
                    <span class="setColor dark">
                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 352 512" height="1em"
                        width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M96.06 454.35c.01 6.29 1.87 12.45 5.36 17.69l17.09 25.69a31.99 31.99 0 0 0 26.64 14.28h61.71a31.99 31.99 0 0 0 26.64-14.28l17.09-25.69a31.989 31.989 0 0 0 5.36-17.69l.04-38.35H96.01l.05 38.35zM0 176c0 44.37 16.45 84.85 43.56 115.78 16.52 18.85 42.36 58.23 52.21 91.45.04.26.07.52.11.78h160.24c.04-.26.07-.51.11-.78 9.85-33.22 35.69-72.6 52.21-91.45C335.55 260.85 352 220.37 352 176 352 78.61 272.91-.3 175.45 0 73.44.31 0 82.97 0 176zm176-80c-44.11 0-80 35.89-80 80 0 8.84-7.16 16-16 16s-16-7.16-16-16c0-61.76 50.24-112 112-112 8.84 0 16 7.16 16 16s-7.16 16-16 16z">
                        </path>
                      </svg>
                    </span>
                    <span class="setColor light">
                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em"
                        width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z">
                        </path>
                      </svg>
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
</template>