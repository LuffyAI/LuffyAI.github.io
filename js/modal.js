// Parse JSON data from the script tag
const projectDetails = JSON.parse(document.getElementById('projectData').textContent);

let currentSlide = 0; // Track the current slide index
let visibleCards = 4; // Default to 4 visible cards for large screens

// Function to render project cards dynamically
function renderProjectCards() {
    const projectGrid = document.getElementById('projectGrid');
    projectGrid.innerHTML = ''; // Clear existing content

    projectDetails.forEach((project) => {
        // Create card element
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-tags', project.tags.join(' '));
        card.setAttribute('onclick', `openModal('${project.id}')`);

        // Create card content
        card.innerHTML = `
            <img src="${project.image}" alt="Project Image" class="project-image">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description.substring(0, 100)}...</p> <!-- Short preview of the description -->
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;

        // Append card to the grid
        projectGrid.appendChild(card);
    });

    updateVisibleCards(); // Set visible cards based on screen size
    updateCarouselButtons(); // Update button states based on card count
}

// Function to determine the number of visible cards based on screen size
function updateVisibleCards() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
        visibleCards = 1; // 1 card for small screens (mobile)
    } else if (screenWidth <= 1024) {
        visibleCards = 2; // 2 cards for medium screens (tablets)
    } else {
        visibleCards = 4; // 4 cards for large screens (desktops)
    }

    moveCarousel(0); // Reset carousel to the first slide
}

// Function to move the carousel view
function moveCarousel(direction) {
    const totalSlides = Math.ceil(projectDetails.length / visibleCards); // Total groups of visible cards
    currentSlide = Math.max(0, Math.min(currentSlide + direction, totalSlides - 1));

    const projectGrid = document.getElementById('projectGrid');
    const cardWidth = projectGrid.querySelector('.project-card').offsetWidth;
    projectGrid.style.transform = `translateX(-${currentSlide * cardWidth * visibleCards}px)`;

    updateCarouselButtons();
}

// Function to update the state of the carousel buttons
function updateCarouselButtons() {
    const totalSlides = Math.ceil(projectDetails.length / visibleCards);
    document.querySelector('.carousel-button.left').disabled = currentSlide === 0;
    document.querySelector('.carousel-button.right').disabled = currentSlide === totalSlides - 1;
}
// Function to open the modal and display project details, including media
function openModal(projectId) {
    const project = projectData.find(p => p.id === projectId);

    if (project) {
        document.getElementById('modalBannerImage').src = project.image;
        document.getElementById('modalBannerTitle').textContent = project.title;
        document.getElementById('modalBannerTitle').href = project.link;
        document.getElementById('modalStartDate').textContent = project.creationDate;
        document.getElementById('modalEndDate').textContent = project.endDate;
        document.getElementById('modalProjectType').textContent = project.type;
        document.getElementById('modalAuthors').textContent = project.authors ? project.authors.join(", ") : "Author not available";
        document.getElementById('modalAbstract').textContent = project.abstract || "Abstract not available";
        document.getElementById('modalDescription').textContent = project.description || "Description not available";

        // Clear previous media content
        const mediaSection = document.getElementById('modalMediaSection');
        mediaSection.innerHTML = ''; // Clear existing media content

        if (project.media && project.media.length > 0) {
            project.media.forEach(media => {
                let mediaElement;

                if (media.mediaType === 'video') {
                    mediaElement = document.createElement('iframe');
                    mediaElement.width = "560";
                    mediaElement.height = "315";
                    
                    // Handle YouTube embed formatting
                    let videoUrl = media.mediaSrc;
                    if (videoUrl.includes('youtube.com/watch')) {
                        const videoId = videoUrl.split('v=')[1];
                        videoUrl = `https://www.youtube.com/embed/${videoId}`;
                    }
                    
                    mediaElement.src = videoUrl;
                    mediaElement.frameBorder = "0";
                    mediaElement.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                    mediaElement.allowFullscreen = true;
                } else if (media.mediaType === 'document' || media.mediaType === 'image') {
                    mediaElement = document.createElement(media.mediaType === 'image' ? 'img' : 'iframe');
                    mediaElement.src = media.mediaSrc;
                    mediaElement.style.maxWidth = "100%";
                    mediaElement.style.maxHeight = "300px";
                    if (media.mediaType === 'document') {
                        mediaElement.style.width = "100%";
                        mediaElement.style.height = "400px";
                        mediaElement.style.border = "none";
                    }
                }

                if (mediaElement) {
                    mediaSection.appendChild(mediaElement);
                }
            });

            mediaSection.style.display = 'block';
        } else {
            mediaSection.style.display = 'none';
        }

        // Display skills list
        const skillsList = document.getElementById('modalSkillsList');
        skillsList.innerHTML = '';
        if (project.skills && project.skills.length > 0) {
            project.skills.forEach(skill => {
                const skillItem = document.createElement('li');
                skillItem.textContent = skill;
                skillsList.appendChild(skillItem);
            });
        } else {
            skillsList.innerHTML = '<li>No skills listed</li>';
        }

        document.getElementById('modal').style.display = 'flex';
    }
}


// Function to close the modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Close modal if clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
};

// Recalculate visible cards on window resize
window.addEventListener('resize', updateVisibleCards);

// Render project cards on page load
document.addEventListener('DOMContentLoaded', renderProjectCards);
