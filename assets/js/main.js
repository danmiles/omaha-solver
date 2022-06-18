// Starter Javascript START
/**
 * Easy selector helper function
 */
const select = (el, all = false) => {
    el = el.trim();
    if (all) {
        return [...document.querySelectorAll(el)];
    } else {
        return document.querySelector(el);
    }
};

/**
 * Easy event listener function
 */
const on = (type, el, listener, all = false) => {
    if (all) {
        select(el, all).forEach((e) => e.addEventListener(type, listener));
    } else {
        select(el, all).addEventListener(type, listener);
    }
};

/**
 * Easy on scroll event listener
 */
const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
};

/**
 * Navbar links active state on scroll
 */
let navbarlinks = select("#navbar .scrollto", true);
const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
        if (!navbarlink.hash) return;
        let section = select(navbarlink.hash);
        if (!section) return;
        if (
            position >= section.offsetTop &&
            position <= section.offsetTop + section.offsetHeight
        ) {
            navbarlink.classList.add("active");
        } else {
            navbarlink.classList.remove("active");
        }
    });
};
window.addEventListener("load", navbarlinksActive);
onscroll(document, navbarlinksActive);

/**
 * Scrolls to an element with header offset
 */
const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    if (!header.classList.contains("header-scrolled")) {
        offset -= 10;
    }

    let elementPos = select(el).offsetTop;
    window.scrollTo({
        top: elementPos - offset,
        behavior: "smooth",
    });
};

/**
 * Toggle .header-scrolled class to #header when page is scrolled
 */
let selectHeader = select("#header");
if (selectHeader) {
    const headerScrolled = () => {
        if (window.scrollY > 100) {
            selectHeader.classList.add("header-scrolled");
        } else {
            selectHeader.classList.remove("header-scrolled");
        }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
}

/**
 * Mobile nav toggle
 */
on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("fa-plus");
    this.classList.toggle("fa-minus");
});

/**
 * Mobile nav dropdowns activate
 */
on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
        if (select("#navbar").classList.contains("navbar-mobile")) {
            e.preventDefault();
            this.nextElementSibling.classList.toggle("dropdown-active");
        }
    },
    true
);

/**
 * Scrool with ofset on links with a class name .scrollto
 */
on(
    "click",
    ".scrollto",
    function (e) {
        if (select(this.hash)) {
            e.preventDefault();

            let navbar = select("#navbar");
            if (navbar.classList.contains("navbar-mobile")) {
                navbar.classList.remove("navbar-mobile");
                let navbarToggle = select(".mobile-nav-toggle");
                navbarToggle.classList.toggle("fa-plus");
                navbarToggle.classList.toggle("fa-minus");
            }
            scrollto(this.hash);
        }
    },
    true
);

/**
 * Scroll with ofset on page load with hash links in the url
 */
window.addEventListener("load", () => {
    if (window.location.hash) {
        if (select(window.location.hash)) {
            scrollto(window.location.hash);
        }
    }
});

/**
 * Animation on scroll
 */
function aos_init() {
    AOS.init({
        duration: 2000,
        easing: "ease-in-out",
        once: true,
        mirror: false,
        disable: function () {
            const mediaMaxWidth = 992;
            return window.innerWidth < mediaMaxWidth;
        },
    });
}
window.addEventListener("load", () => {
    aos_init();
});

// Starter Javascript END

/**
 * Features-item - show details
 */

function futuresDetails() {
    const allItems = document.querySelectorAll(".features-item");

    for (let i = 0; i < allItems.length; i++) {
        allItems[i].addEventListener("click", function () {
            allItems[i].classList.toggle("active");
        });
    }
}
futuresDetails();

/**
 * Section pricing - pricing-toggle
 */

function togglePrice() {
    // Button pricing-toggle
    const toggleBtn = document.querySelector(".toggle__btn");
    const switcher = document.querySelector(".switcher");
    const toggleText = document.querySelectorAll(".toggle__txt");

    // pricing-list__price components
    const priceTitle = document.querySelectorAll(".price__title");
    const pricePromo = document.querySelectorAll(".price__promo");
    const pricePeriode = document.querySelectorAll(".price__periode");

    toggleBtn.addEventListener("click", () => {
        if (toggleBtn.classList.contains("active")) {
            // Button pricing-toggle
            toggleBtn.classList.remove("active");
            switcher.classList.remove("active");
            toggleText[0].classList.remove("active");
            toggleText[1].classList.add("active");

            // pricing-list__price - periode month
            pricePromo[0].textContent = "$9.99";
            pricePromo[1].textContent = "$29.99";
            priceTitle[0].textContent = "$5.99";
            priceTitle[1].textContent = "$19.99";
            pricePeriode.forEach((el) => {
                el.textContent = "/mo";
            });
        } else {
            // Button pricing-toggle
            toggleBtn.classList.add("active");
            switcher.classList.add("active");
            toggleText[1].classList.remove("active");
            toggleText[0].classList.add("active");

            // pricing-list__price - periode year
            pricePromo[0].textContent = "$119.99";
            pricePromo[1].textContent = "$249.99";
            priceTitle[0].textContent = "$55.99";
            priceTitle[1].textContent = "$193.99";
            pricePeriode.forEach((el) => {
                el.textContent = "/yr";
            });
        }
    });
}

togglePrice();

/**
 * Section reviews - show hiding items
 */

function showReviews() {
    const showAllButton = document.querySelector(".reviews__show-all");
    const revewsItems = document.querySelectorAll(".reviews-item__hiding");

    showAllButton.addEventListener("click", () => {
        if (showAllButton.classList.contains("disable")) {
            // Button action
            showAllButton.textContent = "Hide All";
            showAllButton.classList.remove("disable");
            showAllButton.classList.add("active");
            // Show items
            revewsItems.forEach((el) => {
                el.classList.remove("hide");
                el.classList.add("show");
            });
        } else {
            // Button action
            showAllButton.textContent = "Show All";
            showAllButton.classList.add("disable");
            showAllButton.classList.remove("active");
            // Hide items
            revewsItems.forEach((el) => {
                el.classList.remove("show");
                el.classList.add("hide");
            });
        }
    });
}

showReviews();

/**
 * Section FAQ - show answer
 */

function faqShowAnswer() {
    const allFaqItems = document.querySelectorAll(".faq-list__item");

    for (let i = 0; i < allFaqItems.length; i++) {
        allFaqItems[i].addEventListener("click", function () {
            allFaqItems[i].classList.toggle("active");

            allFaqItems[i]
                .querySelector(".fa-solid")
                .classList.toggle("fa-minus");

            allFaqItems[i]
                .querySelector(".fa-solid")
                .classList.toggle("fa-plus");
        });
    }
}

faqShowAnswer();
