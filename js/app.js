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
*/

/**
 * Define Global Variables
 * 
*/
//variable sections will be a nodeList of all section element in html
const sections = document.querySelectorAll("section");
// variable navMenu will be the ul tag with class "navbar__list"
const navMenu = document.getElementById("navbar__list");
// variable frag is the document fragment that will hold all li elements that will be created and append
// all of them at one time to the ul tag
const frag = document.createDocumentFragment();

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/* Creating forEach loop to loop over all sections in the html
 * In each iteration we create li element with text equal to the value of section's data-nav value
 * Add event listener to each li that will scroll smoothly 
*/
sections.forEach((element)=>{
    let listElement = document.createElement("li");
    listElement.textContent = element.getAttribute("data-nav");
    listElement.classList.add("menu__link");
    listElement.addEventListener("click",(event)=>{
        element.scrollIntoView({behavior:"smooth" , block:"start" , inline:"nearest"});
    });
    frag.appendChild(listElement);
});

// build the nav
navMenu.appendChild(frag);
// Select all li elements from the html
const listElements = document.querySelectorAll("li");

// Add class 'active' to section when near top of viewport
// Add scroll event listener to the window 
window.addEventListener("scroll",(event)=>{
    let activeSection;
    // Loop over all sections to determine which one will be the active one
    sections.forEach((elemnt)=>{
        // Check if this element will be the active section
        if(elemnt.getBoundingClientRect().top > -250 && elemnt.getBoundingClientRect().top < 300){
            // Store the value of active section to be used to determine the active link
            activeSection = elemnt ; 
            // Add active class to this section 
            elemnt.classList.add("active-section");
        }   
        else if(elemnt.classList.contains("active-section")){
            // Remove active class from other sections if contained
            elemnt.classList.remove("active-section");
        }
    });
    // Loop over all li elements to determine the corresponding active li element
    listElements.forEach((elemnt)=>{
        if(elemnt.textContent === activeSection.getAttribute("data-nav")){
            // Add active class to the link if it's text content value equal to active section's data-nav value
            elemnt.classList.add("active-link");
        }
        else if(elemnt.classList.contains("active-link")){
            // remove active class from the other li elements
            elemnt.classList.remove("active-link");
        }
    });
});

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


