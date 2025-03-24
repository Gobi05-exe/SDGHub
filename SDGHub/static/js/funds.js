document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    const paymentSection = document.getElementById('payment-section');
    const donationForm = document.getElementById('donation-form');
    const projectNameInput = document.getElementById('project-name');

    // Simulate progress bar animation
    function animateProgressBar() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const fundingInfo = bar.closest('.project-details').querySelector('.funding-info');
            const raised = parseInt(fundingInfo.querySelector('.raised').textContent.replace('$', '').replace(',', ''));
            const goal = parseInt(fundingInfo.querySelector('.goal').textContent.replace('Goal: $', '').replace(',', ''));
            
            const percentage = Math.min((raised / goal) * 100, 100);
            bar.style.width = `${percentage}%`;
        });
    }

    // Project selection
    projectCards.forEach(card => {
        card.querySelector('.select-project').addEventListener('click', () => {
            const projectName = card.querySelector('h3').textContent;
            projectNameInput.value = projectName;
            paymentSection.style.display = 'block';
            window.scrollTo({
                top: paymentSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Payment method selection
    const paymentMethodButtons = document.querySelectorAll('.payment-method');
    paymentMethodButtons.forEach(button => {
        button.addEventListener('click', () => {
            paymentMethodButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    // Form submission
    donationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your support! Your donation is processing.');
        donationForm.reset();
        paymentSection.style.display = 'none';
    });

    // Initial progress bar animation
    animateProgressBar();
});