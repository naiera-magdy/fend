/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 * @author Naiera Magdy <naiera.refaey99@eng-st.cu.edu.eg>
 * 
*/

/**
 * Define Global Variables
 * 
 */

const startTime = performance.now();
const sections = document.querySelectorAll('section');
const frag = document.createDocumentFragment();
const nav = document.querySelector('nav');
let navLinks = []; 

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

/**
 *  Add class 'active' to section when near top of viewport
 */
function ActiveElement() {
  for (section of sections) {
    const position = section.getBoundingClientRect();
    if (position.top >= 0 && (position.bottom <= (window.innerHeight || document.documentElement.clientHeight)+300)) {
      section.classList.add('active');
      for (navLink of navLinks) {
        if(navLink.getAttribute('src') === '#'+section.id) {
          navLink.classList.add('active__link');
          break;
        }
      }
    } else {
      section.classList.remove('active');
      for (navLink of navLinks) {
        if(navLink.getAttribute('src') === '#'+section.id) {
          navLink.classList.remove('active__link');
          break;
        }
      }
    }
  }
}

/**
 * Check if the user is scrolling then style the nav accordingly 
 */
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.querySelector(".navbar__menu").style.backgroundColor = "#DDDDDD80";
    document.querySelector('#Totop').style.display = 'inline-block';
  } else {
    document.querySelector(".navbar__menu").style.backgroundColor = "#00000000";
    document.querySelector('#Totop').style.display = 'none';    
  }
  // Set sections as active
  ActiveElement();
}

/**
 * Create elements of the nav then append it to the Document Fragment
 */
function buildMenu() {
  for (const section of sections) {
    if (section.style.display === 'none') {
      continue;
    }
    const element = document.createElement('li');
    element.innerHTML = section.getAttribute('data-nav');
    element.setAttribute('src', '#' + section.id);
    frag.appendChild(element);
    navLinks.push(element);
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// Build menu 
buildMenu();

// Build the nav
document.querySelector('#navbar__list').appendChild(frag);

/**
 * End Main Functions
 * Begin Events
 * 
 */

// Scroll to section on link click
nav.addEventListener('click', (event) => {
  const target = event.target.getAttribute('src');
  if(target === 'body') {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  } else {
    document.querySelector(target).scrollIntoView();
  }
});

// Set as active section on scroll event
document.addEventListener('scroll',scrollFunction);

// Calculate Performance
const endTime = performance.now();
console.log('Performance: ', endTime-startTime);