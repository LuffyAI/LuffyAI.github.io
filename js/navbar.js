document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navbarLinks = document.getElementById('navbar-links');

  hamburger.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');

    // Select the dynamically appended '.vim-caret' after it's added to the DOM
    const vim = document.querySelector('.vim-caret');

    // Ensure the element exists before modifying it
    if (vim) {
      // Get the computed style of the element
      const currentDisplay = window.getComputedStyle(vim).display;

      // If it is currently hidden, introduce a delay before showing it again
      if (currentDisplay === "none") {
        setTimeout(() => {
          vim.style.display = "inline"; // Show the caret with delay
        }, 150); // Delay of 500ms (adjust this value to control the delay)
      } else {
        vim.style.display = "none"; // Hide the caret immediately
      }
    } else {
      console.error('vim-caret not found.');
    }

  });
});
