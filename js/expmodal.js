// Add click event listeners to each experience card
document.querySelectorAll(".experience-card").forEach(card => {
    card.addEventListener("click", function () {
        // Extract image, title, date, lab, and bullet points for the modal
        const imageSrc = card.querySelector("img").src;
        const title = card.querySelector(".card-header").innerText;
        const date = card.querySelector(".card-date").innerText;
        const lab = card.querySelector(".card-lab").innerText;
        
        // Extract the hidden modal-specific bullet points
        const modalBullets = card.querySelector(".expmodal-bullets").innerHTML;

        // Populate modal with extracted details
        document.getElementById("expmodal-image").src = imageSrc;
        document.getElementById("expmodal-title").innerText = title;
        document.getElementById("expmodal-date").innerText = date;
        document.getElementById("expmodal-lab").innerText = lab;
        document.getElementById("expmodal-body").innerHTML = `<ul>${modalBullets}</ul>`;

        // Display the modal
        document.getElementById("expmodal").style.display = "block";
    });
});

// Close modal on 'X' button click
document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("expmodal").style.display = "none";
});

// Close modal when clicking outside of the modal content
window.onclick = function (event) {
    const expmodal = document.getElementById("expmodal");
    if (event.target === expmodal) {
        expmodal.style.display = "none";
    }
};
