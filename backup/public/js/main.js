 const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
  });

window.addEventListener("load", () => {
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