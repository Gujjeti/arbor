//Developed by: Ganesh Gujjeti
gsap.registerPlugin(ScrollTrigger);

var locoScroll;

window.addEventListener("load", () => {

const isMobileOrTablet = /iP(ad|hone|od)|Android|Tablet|Mobile/i.test(navigator.userAgent);
const isMobile = /iP(hone|od)|Android/i.test(navigator.userAgent);
if (window.innerWidth <= 768) {

  $('.categories__nav .link').removeClass('link--led');
  document.documentElement.classList.add('mobile');
  var header = $('header');
  var headerOffset = header.offset().top; // Get the initial position of the header

  $(window).scroll(function() {
    if ($(window).scrollTop() > headerOffset) {
      header.addClass('sticky'); // Add the sticky class when scrolling past the header
    } else {
      header.removeClass('sticky'); // Remove the sticky class when scrolling back up
    }
  });

}
if (window.innerWidth > 768) {
   locoScroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true
  });

  // Sync Locomotive with ScrollTrigger
locoScroll.on("scroll", ScrollTrigger.update);

   // 🛠 Fix for Elfsight widget cutting off footer
   window.addEventListener('efsWidgetLoaded', () => {
     setTimeout(() => {
       if (locoScroll) locoScroll.update();
     }, 500);
   });

   const elfsightContainer = document.querySelector('.elfsight-app-3a46c95c-ab66-41a9-a5a1-3834ef20b202');

if (elfsightContainer && locoScroll) {
  const observer = new MutationObserver(() => {
    locoScroll.update();
  });

  observer.observe(elfsightContainer, {
    childList: true,
    subtree: true
  });
}


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

// Ensure ScrollTrigger + Locomotive stay in sync
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

let lastScrollY = 0;

const videoEl = document.querySelector('#myVideo');

locoScroll.on("scroll", function(obj) {
  const currentY = obj.scroll.y;
  const headerScroll = document.body.classList.contains('headerScroll');
  const videoTop = videoEl?.getBoundingClientRect().top;

  // Condition: either home and scrolled past 100 OR video has reached top
  const trigger = headerScroll ? (currentY > 100) : (videoTop <= 0);

  if (currentY < lastScrollY && trigger) {
    // Scrolling up
    $('header').addClass('sticky').removeClass('hide');
  } else if (currentY > lastScrollY && trigger) {
    // Scrolling down
    $('header').removeClass('sticky').addClass('hide');
  }

  if (currentY < 60) {
    $('header').removeClass('sticky');
  }

  lastScrollY = currentY;
});



let scrollTopBtn = document.querySelector('#scrollTopBtn');

locoScroll.on('scroll', (instance) => {
    if (instance.scroll.y > 300) { // Show after scrolling 300px
        scrollTopBtn.classList.add('active')
    } else {
        scrollTopBtn.classList.remove('active')
    }
});



// Animate each figure
document.querySelectorAll(".gallery-grid figure").forEach((figure, index) => {
  gsap.fromTo(
    figure,
    {
      clipPath: "polygon(0 0,100% 0,100% 0,0 0)",
      opacity: 0
    },
    {
      clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: figure,
        scroller: "[data-scroll-container]",
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      delay: index * 0.1 // stagger manually if needed
    }
  );
});






}







// Animate .text-clipath with GSAP, including delay

if($('.text-clipath').length){
gsap.to(".text-clipath", {
  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  opacity: 1,
  delay: 5.2, // matches your CSS transition-delay
  duration: 2,
  ease: 'power3.out'
});
}



scrollTopBtn.addEventListener('click', () => {
    locoScroll.stop(); // Stop current scroll
    locoScroll.scrollTo(0);
    locoScroll.start(); // Restart locomotive scroll
});


if(window.innerWidth > 1024){

if($('.videoSec').length){
  gsap.timeline({
    scrollTrigger: {
      trigger: ".videoSec",
      start: "top 25%",
      end: "+=300%", // height of pinning
      scrub: true,
      pin: true,
      anticipatePin: 1,
         scroller: "[data-scroll-container]",
    }
  })
  .to("#myVideo", {
    scale: 2.1,
    y: "-80vh",
    duration: 1,
    ease: "power2.inOut"
  },"h")
  .to(".text-clipath", {
    y: 100,
    duration: 1,

    ease: "power2.inOut"
  },"h");
}

}



if($('#sticky-content').length){
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

}








  // Assuming you have your LocomotiveScroll initialized as `scroll`




if(window.innerWidth > 1024){
// Number of items inside
const items = document.querySelectorAll(".reveal-item");
const section = document.querySelector(".presence-sec");

const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: section,
    start: "top top",
    end: `+=${items.length * 100}%`, // pin for N items
    scrub: true,
    pin: true,
    anticipatePin: 1,
    scroller: "[data-scroll-container]", // if using Locomotive Scroll
  }
});

// Animate each .reveal-item in sequence
items.forEach((item, i) => {
  const content = item.querySelector('.content');

  // use labels to stagger each reveal
  tl2.to(item, {
    '--lineWidth': '100%',
    ease: 'none'
  }, i) // animation at step i

  .from(content, {
    opacity: 0,
    y: 30,
    ease: 'power3.out'
  }, i + 0.2); // slight delay after border
});


const stepsLi = document.querySelectorAll("#steps-sec ol li");
const stepSection = document.querySelector("#steps-sec");
const tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: stepSection,
    start: "top top",
    end: `+=${stepsLi.length * 100}%`, // pin for N items
    scrub: true,
    pin: true,
    anticipatePin: 1,
    scroller: "[data-scroll-container]", // if using Locomotive Scroll
  }
});

// Animate each .reveal-item in sequence
stepsLi.forEach((item, i) => {

  // use labels to stagger each reveal
  tl3
  .from(item, {
    opacity: 0,
    x: 50,
    ease: 'power3.out'
  }, i + 0.2); // slight delay after border
});





}




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

tl.from(".hero-sec-img", {
scale:1.5
}, "=-0.5");


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



document.querySelectorAll(".reveal-card").forEach((card) => {
  const content = card.querySelector(".content-left");
  const image = card.querySelector(".image-right");

  gsap.fromTo(
    [content, image],
    {
      opacity: 0,
      y: 100,
      scale: 0.97,
    },
    {
      scrollTrigger: {
        trigger: card,
        scroller: "[data-scroll-container]",
        start: "top 90%",
        end: "top 30%", // longer range = slower reveal
        scrub: 1,        // <== ⛳️ higher scrub = slower + smoother
      },
      opacity: 1,
      y: 0,
      scale: 1,
      ease: "power4.out",
    }
  );
});







const images = gsap.utils.toArray("#image-stack img");

const tl4 = gsap.timeline({
  scrollTrigger: {
    trigger: "#image-stack",
    scroller: "[data-scroll-container]",
    start: "top 80%",
    end: "bottom 40%",
    scrub: 1.5,
  },
});

images.forEach((img, i) => {
  tl4.to(
    img,
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out",
    },
    i * 0.3 // slightly staggered scrub overlap
  );
});







});









$(document).ready(function () {




if ($('.masonry-grid').length) {
  let masonryInstances = {};

  const initMasonry = (grid) => {
    imagesLoaded(grid, function () {
      masonryInstances[grid.id] = new Masonry(grid, {
        itemSelector: '.masonry-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        gutter: 10,
      });
    });
  };

  // Initialize all masonry grids
  document.querySelectorAll('.masonry-grid').forEach((grid) => {
    initMasonry(grid);
  });

  // Tab switching logic
  const tabs = document.querySelectorAll('.tabs a');
  const grids = document.querySelectorAll('.masonry-grid');

  tabs.forEach((tab) => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = tab.getAttribute('data-target');

    // Active class toggle
    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');

    // Hide all grids, show target grid
    grids.forEach((grid) => {
      if (grid.id === targetId) {
        grid.classList.remove('hidden');

        // Re-layout current Masonry
        if (masonryInstances[targetId]) {
          masonryInstances[targetId].layout();
        }
      } else {
        grid.classList.add('hidden');
      }
    });

    // 🔁 Reset filter to 'All'
    const allBtn = document.querySelector('#filterNav a[data-filter="all"]');
    if (allBtn) {
      allBtn.click(); // Trigger click to reset filter
    }
  });
});


  // Optional: Filter buttons inside currently visible masonry grid
  const filterButtons = document.querySelectorAll('#filterNav a');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const activeGrid = document.querySelector('.masonry-grid:not(.hidden)');
      const currentMasonry = masonryInstances[activeGrid.id];

      // Toggle active class
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.textContent.trim().toLowerCase();

      // Show/hide items
      activeGrid.querySelectorAll('.masonry-item').forEach((item) => {
        const itemCat = item.getAttribute('data-category');
        item.style.display = (filter === 'all' || itemCat === filter) ? 'block' : 'none';
      });

      // Trigger Masonry re-layout
      currentMasonry.layout();
    });
  });
}




 

  $('.product-img').hover(
      function () {
        const newSrc = $(this).data('hover');
        $(this).attr('data-original', $(this).attr('src')); // store original
        $(this).attr('src', newSrc);
      },
      function () {
        const originalSrc = $(this).attr('data-original');
        $(this).attr('src', originalSrc);
      }
    );

    $('#scrollToTopBtn').click(function () {
    if ($('html').hasClass('mobile')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (typeof locoScroll !== 'undefined') {
      locoScroll.scrollTo(0, { duration: 800, disableLerp: true });
    }
  });


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

    gsap.to(".leftEle img, .RightEle img", {
    x: 0,
    opacity: 1,
    duration: 1,
    delay:5.6
  });

  $(".categories__nav").click(function (e) {
    e.preventDefault();
      window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

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


const categoriesSwiper = new Swiper(".categoriesSwiper", {
  effect: "coverflow", // Make sure there's no typo here
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 1.5,
  loop: true,
  coverflowEffect: {
    rotate: 0,
    stretch: 180,
    depth: 150,
    modifier: 3,
    slideShadows: true,
  },
});


const brandsSwiper = new Swiper(".brandsSwiper", {
  effect: "coverflow", // Make sure there's no typo here
  grabCursor: true,
centeredSlides: true,
centeredSlidesBounds: true,
  slidesPerView:3,
  spaceBetween: 100, 
   loop: true,
  coverflowEffect: {
  rotate: 0,
  stretch: 10,
  depth: 80,
  modifier:2.5,
  slideShadows: true,
  },
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
  spaceBetween: 60,
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

// document.querySelector('.ProductsSlider .swiper-custom-prev').addEventListener('click', () => ProductsSlider.slidePrev());
// document.querySelector('.ProductsSlider .swiper-custom-next').addEventListener('click', () => ProductsSlider.slideNext());

const productsPrev = document.querySelector('.ProductsSlider .swiper-custom-prev');
const productsNext = document.querySelector('.ProductsSlider .swiper-custom-next');

if (productsPrev) {
  productsPrev.addEventListener('click', () => ProductsSlider.slidePrev());
}
if (productsNext) {
  productsNext.addEventListener('click', () => ProductsSlider.slideNext());
}
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
  spaceBetween: 60,
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

const testimonialPrev = document.querySelector('#testimonialSlider .swiper-custom-prev');
const testimonialNext = document.querySelector('#testimonialSlider .swiper-custom-next');

if (testimonialPrev) {
  testimonialPrev.addEventListener('click', () => testimonialSlider.slidePrev());
}
if (testimonialNext) {
  testimonialNext.addEventListener('click', () => testimonialSlider.slideNext());
}





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
if (slider) {
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


}

let swiperInstance = null;

function initTickerOrSwiper() {
  const container = document.getElementById('scrollTickerContainer');
   if (!container) return;
  const track = container.querySelector('.ticker-track');
 if (!track) return; 
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