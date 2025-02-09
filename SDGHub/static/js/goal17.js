document.addEventListener("scroll", function () {
    const content = document.querySelector(".content");
    const videoContainer = document.querySelector(".video-container");
    const videoHeight = videoContainer.offsetHeight; // Height of the video container
    const scrollPosition = window.scrollY; // Current scroll position

    // Check if the user has scrolled past the video
    if (scrollPosition > videoHeight * 0.5) { // Adjust the threshold as needed
        content.classList.add("overlap");
    } else {
        content.classList.remove("overlap");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".carousel-track");
    const boxes = document.querySelectorAll(".carousel-box");

    // Clone elements to create a seamless infinite loop
    boxes.forEach((box) => {
        let clone = box.cloneNode(true);
        track.appendChild(clone);
    });
});

document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default anchor behavior
        const targetId = this.getAttribute('href'); // Get the target section's ID
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth', // Smooth scrolling
                block: 'start' // Align to the start of the section
            });
        }
    });
});

