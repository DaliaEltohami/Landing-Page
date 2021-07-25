
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
// Select the header tag 
const header = document.querySelector("header");

/**
 * End Global Variables


/* Creating forEach loop to loop over all sections in the html
 * In each iteration we create li element with text equal to the value of section's data-nav value
 * Add event listener to each li that will scroll smoothly 
*/
sections.forEach((element)=>{
    // Create new li element
    let listElement = document.createElement("li");
    // Make the text content of this li equal to the corresponding section's data-nav attribute value 
    listElement.textContent = element.getAttribute("data-nav");
    // Add class "menu__link" to the li element 
    listElement.classList.add("menu__link");
    // Add event listener to li element to scroll smoothy to the corresponding section
    listElement.addEventListener("click",(event)=>{
        element.scrollIntoView({behavior:"smooth" , block:"start" , inline:"nearest"});
    });
    // Append the li element to the frag
    frag.appendChild(listElement);
    
    /**
     * Here we will make the sections collapsible
     * 
    */
    
    // get the section id value
    let sectionId = element.getAttribute("id");
    // select the span of the section
    let collapse = document.querySelector("#"+sectionId + " span");
    // select the heading of the section 
    let heading = document.querySelector("#"+sectionId + " h2");
    // add event listener to the span to collapse the section when click on it
    collapse.addEventListener("click",(e)=>{
        collapse.parentElement.style.display= "none";
        // Make the heading cursor as pointer
        heading.style.cursor="pointer";
        // Add event listener to the heading to uncollapse the section when click on it 
        heading.addEventListener("click",(e)=>{
            collapse.parentElement.style.display= "block";
        });
    });
});

// build the nav by appending the frag to the ul element 
navMenu.appendChild(frag);

// Select all li elements from the html
const listElements = document.querySelectorAll("li");

// set the initial active link 
listElements[0].classList.add("active-link");

// Define variable to setup the scrolling 
let scrolling;

// Add scroll event listener to the window 
window.addEventListener("scroll",(event)=>{
    // Clear setTimeout when start scrolling event 
    window.clearTimeout(scrolling);
    // manipulate header classList to make in visible while scrolling and hidden while not scrolling
    header.classList.remove("hidden__header");
    header.classList.add("active__header");
    // Loop over all sections to add "active-section" class to the section in the view port 
    sections.forEach((elemnt)=>{
        // Check if this element will be the active section
        if(elemnt.getBoundingClientRect().top < 500 && elemnt.getBoundingClientRect().bottom > 500){
            // Add active class to this section 
            elemnt.classList.add("active-section");
        }   
        else if(elemnt.classList.contains("active-section")){
            // Remove active class from other sections if contained
            elemnt.classList.remove("active-section");
        }
    });

    // loop over sections to define the active section which will be used to determine the active link
    let activeSection ;
    sections.forEach((elemnt)=>{
        if(elemnt.classList.contains("active-section")){
            activeSection = elemnt ;
        }
    });


    // If there is an active sction then assign the corresponding active link 
    if (activeSection !== undefined){
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
    // Remove "active-link" class from all links if there is no active section
    }else {
        listElements.forEach((elemnt)=>{
            elemnt.classList.remove("active-link");
        });
    }
    
    /**
     * Here we will setimeout to hide or show the header
     * 
    */
    
    // Check if the page is not at the top 
    if (document.body.getBoundingClientRect().top < 0){
        // Set timeout to check if the scroll is stopped
        scrolling = setTimeout(()=>{
            // Manipulate the header classList to hide the header when stop scrolling
            header.classList.remove("active__header")
            header.classList.add("hidden__header")
        }, 2000);
    }   
});

// Display Scroll Back to top button when user start to scroll the page 
const topbtn = document.getElementById("top-btn");
window.addEventListener("scroll",(event)=>{
    if (document.body.getBoundingClientRect().top < 0 ){
        topbtn.style.display = "block";
    }else{
        topbtn.style.display = "none";
    }
});

// Scroll to the top when click on the top button
topbtn.addEventListener("click",(event)=>{
    window.scrollTo(0,0);
});


