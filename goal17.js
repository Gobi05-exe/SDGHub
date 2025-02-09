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