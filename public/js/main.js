//Developed by: Ganesh Gujjeti



window.addEventListener("load", () => {


const locoScroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
    smartphone: {
    smooth: false
  },
  tablet: {
    smooth: false
  }
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

  tl.to('.introl__logo',{
    opacity: 0,
    duration:1.5,
     ease: "power2.out",
  })
  tl.to(".intro__img", {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    duration: 1.5,
    ease: "power2.out",
    stagger: 0.2
  }, "=-1");

      tl.to(".intro", {
        yPercent: -100,
        opacity: 1,
        ease: "expo.inOut",
        delay: 0.8,
             duration: 1.8,
      });
       tl.to(".intro__fader", {
  opacity: 1,
  onComplete: () => {
    const catWrapper = document.querySelector('.cat-wrapper');
    if (catWrapper) {
      catWrapper.style.transitionDelay = '0s';
    }
  }
}, "=-1.3");


            tl.to('html', {
  onStart: () => {
    document.documentElement.classList.remove('overflow-hidden');
  }
});


  //   tl.to(".intro", {
  //       y: "-100%",
  //  duration: 1.8,
  // ease: "power3.out",
  //       delay: 0.8 
  //     });

});





$(document).ready(function () {

  $("#menu-toggle").click(function(){
  gsap.to('#mobile-menu',{
    x: 0,
    opacity: 1,
    duration: 0.5,
    visibility: "visible",
    ease: "power2.out"
  })
});

 $("#menu-close").click(function(){
    gsap.to('#mobile-menu',{
    x: -100,
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
   onComplete: function() {
      gsap.set('#mobile-menu', { visibility: "hidden" });
    }
  })
});


  gsap.from(".header .navbar", {
    y: -30,
    opacity: 0,
    duration: 1,
    delay:5.6
  });

  $(".categories__nav a").click(function (e) {
    e.preventDefault();
    $('.categories-sec').show()
    $('.categories-sec').addClass('h-screen')
    $('html, body').addClass('overflow-hidden');
    const $section = $(".cat-wrapper");
    $section.removeClass("hide");
    gsap.to('.text-clipath',{
        y:100,
        opacity:0
    })
    gsap.to(".categories__nav a", {
      y: -50,
      ease: "power3.out",
      opacity: 0,
      stagger: 0.1,
      duration: 0.1,
    });

       gsap.from("#thumbSlider .swiper-slide", {
      y: 50,
      ease: "power3.out",
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
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
  $('html, body').removeClass('overflow-hidden');
    gsap.to("#thumbSlider .swiper-slide", {
      y: 0,
      ease: "power3.out",
      opacity: 1,
      stagger: 0.2,
      duration: 0.8,
    });

      $section.addClass("hide");
       $('.categories-sec').removeClass('h-screen');

     

          gsap.to('.text-clipath',{
        y:0,
        opacity:1
    })
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
      }, 1000); // match the transition duration
    }
  });



  
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 60,
  loop: false,
  pagination: false,
  navigation: false,
   autoplay: false,
  speed: 600,
  breakpoints: {
    640: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 5 },
  }
});

const ProductsSlider = new Swiper('.ProductsSlider', {
  slidesPerView: 1,
  spaceBetween: 30,
  slidesOffsetBefore: 0, 
 
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

document.querySelector('.ProductsSlider .swiper-custom-prev').addEventListener('click', () => ProductsSlider.slidePrev());
document.querySelector('.ProductsSlider .swiper-custom-next').addEventListener('click', () => ProductsSlider.slideNext());

bindCursorArrows('.ProductsSlider');

const inspirationSlider = new Swiper('#inspirationSlider', {
  slidesPerView: 1,
  spaceBetween: 40,
  slidesOffsetBefore: 140, 
  speed: 3000, // adjust as needed
  loop: true,
  allowTouchMove: false,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      slidesOffsetBefore: 10,
    },
    1024: {
      slidesPerView: 3,
      slidesOffsetBefore: 140,
    },
  },
});


const testimonialSlider = new Swiper('#testimonialSlider', {
  slidesPerView: 1,
  spaceBetween: 30,
  slidesOffsetBefore: 0, 
  allowTouchMove: true,

  breakpoints: {
    640: {
      slidesPerView: 3,
      slidesOffsetBefore: 10,
    },
    1024: {
      slidesPerView: 4,
      slidesOffsetBefore: 140,
    },
  },
});

document.querySelector('#testimonialSlider .swiper-custom-prev').addEventListener('click', () => testimonialSlider.slidePrev());
document.querySelector('#testimonialSlider .swiper-custom-next').addEventListener('click', () => testimonialSlider.slideNext());


function bindCursorArrows(sliderSelector) {
  const slider = document.querySelector(sliderSelector);
  if (!slider) return;

  const swiperNext = slider.querySelector('.swiper-custom-next');
  const swiperPrev = slider.querySelector('.swiper-custom-prev');

  const cursor = document.querySelector('.js-cursor');
  const cursorRight = cursor.querySelector('.c-cursor__arrows__right');
  const cursorLeft = cursor.querySelector('.c-cursor__arrows__left');

  if (swiperNext) {
    swiperNext.addEventListener('mouseenter', () => {
      cursorRight.style.transform = 'translateX(40px)';
      cursorLeft.style.transform = 'translateX(100%)'; // ensure left is out
      cursor.style.width = '6rem';
      cursor.style.height = '6rem';
      cursor.style.marginTop = '-3rem';
      cursor.style.marginLeft = '-3rem';
    });
    swiperNext.addEventListener('mouseleave', () => {
      cursorRight.style.transform = 'translateX(-40px)';
      cursor.style.width = '1.5rem';
      cursor.style.height = '1.5rem';
      cursor.style.marginTop = '-0.8rem';
      cursor.style.marginLeft = '-0.8rem';
    });
  }

  if (swiperPrev) {
    swiperPrev.addEventListener('mouseenter', () => {
      cursorLeft.style.transform = 'translateX(-40px)';
      cursorRight.style.transform = 'translateX(-100%)'; // ensure right is out
      cursor.style.width = '6rem';
      cursor.style.height = '6rem';
      cursor.style.marginTop = '-3rem';
      cursor.style.marginLeft = '-3rem';
    });
    swiperPrev.addEventListener('mouseleave', () => {
      cursorLeft.style.transform = 'translateX(40px)';
      cursor.style.width = '1.5rem';
      cursor.style.height = '1.5rem';
      cursor.style.marginTop = '-0.8rem';
      cursor.style.marginLeft = '-0.8rem';
    });
  }
}
bindCursorArrows('#testimonialSlider');

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




let swiperInstance = null;

function initTickerOrSwiper() {
  const container = document.getElementById('scrollTickerContainer');
  const track = container.querySelector('.ticker-track');

  if (window.innerWidth < 768) {
    // Mobile: Swiper
    if (!swiperInstance) {
      // Remove ticker animation
      track.style.animation = 'none';
      track.classList.remove('ticker-track');
 track.classList.remove('flex-wrap');
      // Add Swiper classes
      container.classList.add('swiper');
      track.classList.add('swiper-wrapper');
      Array.from(track.children).forEach(slide => slide.classList.add('swiper-slide'));

      // Init Swiper
      swiperInstance = new Swiper('.swiper', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        loop: false,
        speed: 3000,
       
      });
    }
  } else {
    // Desktop: Ticker
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;

      // Remove Swiper classes
      container.classList.remove('swiper');
      track.classList.remove('swiper-wrapper');
      Array.from(track.children).forEach(slide => slide.classList.remove('swiper-slide'));

      // Restore ticker
      track.classList.add('ticker-track');
      track.style.animation = 'scrollTicker 20s linear infinite';
 track.classList.remove('flex-wrap');
      // Optionally duplicate content if needed
      if (track.children.length < 6) { // if not already duplicated
        track.innerHTML += track.innerHTML;
      }
    }
  }
}

// Run on load + resize
window.addEventListener('load', initTickerOrSwiper);
window.addEventListener('resize', initTickerOrSwiper);






const cursor = document.querySelector('.js-cursor');
const cursorRight = cursor.querySelector('.c-cursor__arrows__right');
const cursorLeft = cursor.querySelector('.c-cursor__arrows__left');

// Move cursor
document.addEventListener('mousemove', (e) => {
  cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
});

// Show cursor on enter anywhere
document.addEventListener('mouseenter', () => {
  cursor.style.opacity = 1;
});
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = 0;
});







  // Optional: make cursor larger on links
  const links = document.querySelectorAll('a, button, .cursor-hover-target');

  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      cursor.style.width = '6rem';
      cursor.style.height = '6rem';
      cursor.style.marginTop = '-3rem';
      cursor.style.marginLeft = '-3rem';
    });

    link.addEventListener('mouseleave', () => {
      cursor.style.width = '1.5rem';
      cursor.style.height = '1.5rem';
      cursor.style.marginTop = '-0.8rem';
      cursor.style.marginLeft = '-0.8rem';
    });
  });


});