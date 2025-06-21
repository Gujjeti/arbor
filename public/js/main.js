//Developed by: Ganesh Gujjeti



window.addEventListener("load", () => {


const locoScroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true
});

// Sync Locomotive with ScrollTrigger
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("[data-scroll-container]", {
  scrollTop(value) {
    return arguments.length 
      ? locoScroll.scrollTo(value, 0, 0) 
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return { 
      top: 0, 
      left: 0, 
      width: window.innerWidth, 
      height: window.innerHeight 
    };
  },
  pinType: document.querySelector("[data-scroll-container]").style.transform
    ? "transform"
    : "fixed"
});

// ✅ Add scroller reference here
gsap.to("#sticky-content", {
  scrollTrigger: {
    trigger: "#sticky-content",
    scroller: "[data-scroll-container]",  // <--- this is what you missed
    start: "top top",
    end: "bottom bottom",
    pin: true,
    pinSpacing: false,
  }
});

// Ensure ScrollTrigger + Locomotive stay in sync
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();



  // Assuming you have your LocomotiveScroll initialized as `scroll`


let lastScrollY = 0;

locoScroll.on("scroll", function(obj) {
  const currentY = obj.scroll.y;

  if (currentY < lastScrollY && currentY > 100) {
    // Scrolling up
    $('header').addClass('sticky');
    $('header').removeClass('hide');
  } else if (currentY > lastScrollY) {
    // Scrolling down
    $('header').removeClass('sticky');
      $('header').addClass('hide');
  }

  if(currentY < 60) {
    $('header').removeClass('sticky');
   
  }
  lastScrollY = currentY;
});




  const tl = gsap.timeline();

  // Step 2: Quick center-out reveal
  tl.to(".intro__img", {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    duration: 1.5,
    ease: "power2.out",
    stagger: 0.2
  });

  //     tl.to(".intro", {
  //       y: "-100%",
  //  clipPath: "inset(0% 0% 100% 0%)",
  //       opacity: 1,
  //       ease: "power2.out",
  //       delay: 0.8,
  //            duration: 2.5,
  //     });
  //        tl.to(".intro__fader", {
  //         opacity: 1,
  //         },"=-2.5");

  //   tl.to(".intro", {
  //       y: "-100%",
  //  duration: 1.8,
  // ease: "power3.out",
  //       delay: 0.8 
  //     });

});



$(document).ready(function () {

  gsap.from(".header .navbar", {
    y: -30,
    opacity: 0,
    duration: 1,
  });

  $(".categories__nav a").click(function (e) {
    e.preventDefault();
    $('.categories-sec').show()
    const $section = $(".cat-wrapper");
    $section.removeClass("hide");
    gsap.to(".categories__nav a", {
      y: -50,
      ease: "power3.out",
      opacity: 0,
      stagger: 0.1,
      duration: 0.1,
    });
    // Show and animate category section
    $section.removeClass("active");
    void $section[0].offsetWidth; // trigger reflow
    $section.addClass("active");
  });
  // Hide when clicking outside
  $(document).on("click", function (e) {
    const $section = $(".cat-wrapper");

    // If section is active and click is outside both
    if (
      $section.hasClass("active") &&
      !$section.is(e.target) &&
      !$section.has(e.target).length 
    ) {
      $section.addClass("hide");
      gsap.to(".categories__nav a", {
        y: 0,
        ease: "power3.out",
        delay: 0.2,
        opacity: 1,
        stagger: 0.1,
        duration: 0.1,
      });
      setTimeout(() => {
        $('.categories-sec').hide()
      }, 500); // match the transition duration
    }
  });



  
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: false,
  pagination: false,
  navigation: false,
  speed: 600,
  breakpoints: {
    640: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 5 },
  }
});

const ProductsSlider = new Swiper('.ProductsSlider', {
  slidesPerView: 1,
  spaceBetween: 80,
  slidesOffsetBefore: 140, 
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      slidesOffsetBefore: 10,
    },
    1024: {
      slidesPerView: 4,
      slidesOffsetBefore: 140,
    },
  },
});

const slider = document.getElementById("thumbSlider");
let hoverZone = null;

function animateScroll() {
  if (!hoverZone) return;

  if (hoverZone === 'right' && !swiper.isEnd) {
    swiper.slideNext();
  } else if (hoverZone === 'left' && !swiper.isBeginning) {
    swiper.slidePrev();
  }

  if (hoverZone) {
    setTimeout(() => {
      requestAnimationFrame(animateScroll);
    }, 700); // adjust delay
  }
}

slider.addEventListener("mousemove", (e) => {
  const rect = slider.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const center = rect.width / 2;
  const buffer = 30; // optional dead zone around center

  if (x < center - buffer) {
    if (hoverZone !== 'left') {
      hoverZone = 'left';
      requestAnimationFrame(animateScroll);
    }
  } else if (x > center + buffer) {
    if (hoverZone !== 'right') {
      hoverZone = 'right';
      requestAnimationFrame(animateScroll);
    }
  } else {
    hoverZone = null; // stop if in middle zone
  }
});

slider.addEventListener("mouseleave", () => {
  hoverZone = null;
});

});