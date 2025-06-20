

window.addEventListener("load", () => {


     const scrollContainer = document.querySelector("[data-scroll-container]");
  if (scrollContainer) {
    const scroll = new LocomotiveScroll({
      el: scrollContainer,
      smooth: true,
    });

    // Optionally store scroll globally if used elsewhere
    window.locomotive = scroll;
  } else {
    console.error("Missing [data-scroll-container]");
  }

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



$(document).ready(function () {
  $(".categories__nav a").click(function (e) {
    e.preventDefault();

    const $nav = $(".categories__nav");
    const $section = $(".categories-sec");

    // Hide nav with animation
    $nav.addClass("active");

    // Show and animate category section
    $section.removeClass("active");
    void $section[0].offsetWidth; // trigger reflow
    $section.addClass("active");
  });
// Hide when clicking outside
$(document).on("click", function (e) {
  const $nav = $(".categories__nav");
  const $section = $(".categories-sec");

  // If section is active and click is outside both
  if (
    $section.hasClass("active") &&
    !$section.is(e.target) &&
    !$section.has(e.target).length &&
    !$nav.is(e.target) &&
    !$nav.has(e.target).length
  ) {
    $nav.removeClass("active");
    $section.removeClass("active");
  }
});


});


 