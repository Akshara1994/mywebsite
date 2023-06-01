/**
* Template Name: iPortfolio
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

// FORM VALIDATION

$(function () {
	$("#enquiryForm").validate({
		// in 'rules' user have to specify all the constraints for respective fields
		rules: {
			first_name: {
				required: true,
				minlength: 3, //for length of lastname
			},
			last_name: "required",
			email: {
				required: true,
				email: true,
			},
			subject: {
				required: true,
				minlength: 3, //for length of lastname
			},
			message: {
				required: true,
				minlength: 10, //for length of lastname
			},
		},
		// in 'messages' user have to specify message as per rules
		messages: {
			first_name: {
				required: " Please enter first name",
            	minlength: " Your first name must consist of at least 3 characters",
			},
			last_name: " Please enter your lastname",
			email: {
				required: "Please enter a E-mail address",
				email: "Please enter a proper E-mail address",
			},
			subject: {
				required: " Please enter a subject",
				minlength: " Your username must consist of at least 5 characters",
			},
			message: {
				required: " Please enter a message",
				minlength: " Your message must consist of at least 10 characters",
			},
		},
	});
});



document.addEventListener("submit", e => {
	// Prevent the default form submit
	e.preventDefault();

	// Store reference to form to make later code easier to read
	const form = e.target;

	// get status message references
	const statusBusy = form.querySelector(".loader");
	const statusFailure = form.querySelector(".status-failure");

	// Post data using the Fetch API
	fetch(form.action, {
		method: form.method,
		body: new FormData(form),
	})
		// We turn the response into text as we expect HTML
		.then(res => res.text())

		// Let's turn it into an HTML document
		.then(text => new DOMParser().parseFromString(text, "text/html"))

		// Now we have a document to work with let's replace the <form>
		.then(doc => {
			// Create result message container and copy HTML from doc
			const result = document.createElement("div");
			result.innerHTML = doc.body.innerHTML;
      

			// Allow focussing this element with JavaScript
			result.tabIndex = -1;
			statusBusy.hidden = true;
			document.getElementById("enquiryForm").reset();
			alert("Request submitted successfully.");

			// And replace the form with the response children
			// form.parentNode.replaceChild(result, form);

			// Move focus to the status message
			// result.focus();
		})
		.catch(err => {
			// Unlock form elements
			Array.from(form.elements).forEach(field => (field.disabled = false));

			// Return focus to active element
			lastActive.focus();

			// Hide the busy state
			statusBusy.hidden = false;
       
			// Show error message
			statusFailure.hidden = false;
		});

	// Before we disable all the fields, remember the last active field
	const lastActive = document.activeElement;

	// Show busy state and move focus to it
	statusBusy.hidden = false;
	statusBusy.tabIndex = -1;
	statusBusy.focus();

	// Disable all form elements to prevent further input
	Array.from(form.elements).forEach(field => (field.disabled = true));

	// Make sure connection failure message is hidden
	statusFailure.hidden = true;
});