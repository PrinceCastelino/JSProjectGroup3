"use strict";

const teamMembers = [
    { name: 'Hritik Patel', position: 'Founder & CEO', image: 'images/1.jpg'},
    { name: 'Wright Rowen', position: 'Product Manager', image: 'images/2.jpg' },
    { name: 'Nandish Costo', position: 'Employee', image: 'images/3.png' },
    { name: 'Racheal Dove', position: 'HR', image: 'images/4.jpg' }, 
    { name: 'Welson Wond', position: 'Project Inspector', image: 'images/5.jpg' },
    { name: 'Tom Trinity ', position: 'Order Processor', image: 'images/6.avif'  }, 
    
];

const teamCarousel = document.getElementById('teamCarousel');
let currentIndex = 0;
const interval = 1000; 
let carouselInterval;

function createTeamMember(member) {
    const memberElement = document.createElement('div');
    memberElement.classList.add('team-member');

    const imgElement = document.createElement('img');
    imgElement.src = member.image;
    imgElement.alt = member.name;

    const detailsElement = document.createElement('div');
    detailsElement.classList.add('member-details');
    detailsElement.innerHTML = `<p><strong>${member.name}</strong></p><p>${member.position}</p>`;

    memberElement.appendChild(imgElement);
    memberElement.appendChild(detailsElement);

    return memberElement;
}

function startCarousel() {
    carouselInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % teamMembers.length;
        updateCarousel();
    }, interval);
}

function pauseCarousel() {
    clearInterval(carouselInterval);
}

function updateCarousel() {
    const nextIndex = (currentIndex + 1) % teamMembers.length;
    if (nextIndex === 0) {
        // If the next index is 0, we are looping back to the start
        // Repopulate the carousel with the first team member
        teamCarousel.innerHTML = '';
        teamMembers.forEach(member => {
            const memberElement = createTeamMember(member);
            teamCarousel.appendChild(memberElement);
        });
    }

    const transformValue = `translateX(${-currentIndex * 25}%)`;
    teamCarousel.style.transform = transformValue;
    currentIndex = nextIndex;
}

// Populate team members dynamically
teamMembers.forEach(member => {
    const memberElement = createTeamMember(member);
    teamCarousel.appendChild(memberElement);
});

// Start the carousel
startCarousel();
