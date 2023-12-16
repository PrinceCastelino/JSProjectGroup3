"use strict";

// Team members data
const teamMembers = [
    { name: 'Hritik Patel', position: 'Founder & CEO', image: 'images/1.jpg'},
    { name: 'Wright Rowen', position: 'Product Manager', image: 'images/2.jpg' },
    { name: 'Nandish Costo', position: 'Employee', image: 'images/3.png' },
    { name: 'Racheal Dove', position: 'HR', image: 'images/4.jpg' }, 
    { name: 'Welson Wond', position: 'Project Inspector', image: 'images/5.jpg' },
    { name: 'Tom Trinity ', position: 'Order Processor', image: 'images/6.avif'  }, 
];

// DOM element for the team carousel
const teamCarousel = document.getElementById('teamCarousel');

// Variables for carousel control
let currentIndex = 0;
const interval = 1000;  // Interval for automatic carousel movement
let carouselInterval;

// Function to create a team member element
function createTeamMember(member) {
    const memberElement = document.createElement('div');
    memberElement.classList.add('team-member');

    // Create image element
    const imgElement = document.createElement('img');
    imgElement.src = member.image;
    imgElement.alt = member.name;

    // Create details element
    const detailsElement = document.createElement('div');
    detailsElement.classList.add('member-details');
    detailsElement.innerHTML = `<p><strong>${member.name}</strong></p><p>${member.position}</p>`;

    // Append elements to the team member element
    memberElement.appendChild(imgElement);
    memberElement.appendChild(detailsElement);

    return memberElement;
}

// Function to start the carousel
function startCarousel() {
    carouselInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % teamMembers.length;
        updateCarousel();
    }, interval);
}

// Function to pause the carousel
function pauseCarousel() {
    clearInterval(carouselInterval);
}

// Function to update the carousel based on the current index
function updateCarousel() {
    const nextIndex = (currentIndex + 1) % teamMembers.length;

    // If the next index is 0, we are looping back to the start
    if (nextIndex === 0) {
        resetCarousel();
    }

    // Calculate the transformation value for sliding
    const transformValue = `translateX(${-currentIndex * 25}%)`;

    // Apply the transformation to the carousel
    teamCarousel.style.transform = transformValue;
    currentIndex = nextIndex;
}

// Function to reset the carousel to the beginning
function resetCarousel() {
    // Repopulate the carousel with team members
    teamCarousel.innerHTML = '';
    teamMembers.forEach(member => {
        const memberElement = createTeamMember(member);
        teamCarousel.appendChild(memberElement);
    });
}

// Populate team members dynamically
teamMembers.forEach(member => {
    const memberElement = createTeamMember(member);
    teamCarousel.appendChild(memberElement);
});

// Start the carousel
startCarousel();
