function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotiveAnimation();
function navbarAnimation() {
  gsap.to(".nav-part1 svg", {
    transform: "translateY(-100%)",
    scrollTrigger: {
      trigger: ".page1",
      scroller: ".main",
      start: "top 0",
      end: "top -5%",
      scrub: 0.5,
    },
  });
  gsap.to(".nav-part2 .links", {
    transform: "translateY(-100%)",
    opacity: 0,
    scrollTrigger: {
      trigger: ".page1",
      scroller: ".main",
      start: "top 0",
      end: "top -5%",
      scrub: true,
    },
  });
}
navbarAnimation()

function videoconAnimation() {
    var videocon = document.getElementsByClassName("video-container");

    // Loop through all video-container elements and add the event listener
    for (var i = 0; i < videocon.length; i++) {
        // Get the play button inside this video-container
        var playbtn = videocon[i].querySelector(".play");

        videocon[i].addEventListener("mouseenter", function() {
            var playbtn = this.querySelector(".play");
            gsap.to(playbtn, {
                scale: 1,
                opacity: 1,
            });
        });

        videocon[i].addEventListener("mouseleave", function() {
            var playbtn = this.querySelector(".play");
            gsap.to(playbtn, {
                scale: 0,
                opacity: 0,
            });
        });

        videocon[i].addEventListener("mousemove", function(dets) {
            var playbtn = this.querySelector(".play");
           
            gsap.to(playbtn, {
                left: dets.offsetX - 50,
                top: dets.offsetY - 50,
                duration: 0.2,
            });
        });
    }
}

videoconAnimation();

function loadAnimation(){
    gsap.from(".page1 h1", {
    y: 100,
    opacity: 0,
    delay: 0.5,
    duration: 0.7,
    stagger: 0.2,
})
gsap.from(".page1 .video-container", {
    scale: 0.8,
    opacity: 0,
    delay: 1.2,
    duration: 0.5,
})
}

loadAnimation();

function cursorAnimation() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to(".cursor", {
      x: dets.clientX,
      y: dets.clientY,
      duration: 0.2,
      overwrite: "auto"
    });
  });

  document.querySelectorAll(".child").forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      gsap.to(".cursor", {
        scale: 1,
        duration: 0.2,
        overwrite: "auto"
        
      });
    });
    elem.addEventListener("mouseleave", function () {
      gsap.to(".cursor", {
        scale: 0,
        duration: 0.2,
        overwrite: "auto"
      });
    });
  });
}
cursorAnimation();