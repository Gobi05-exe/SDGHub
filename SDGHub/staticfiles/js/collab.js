// Global variables
let marker;
let autocomplete;
let collaboratorCount = 0;
const sdgColors = {
    "1": "#e5243b", "2": "#dda63a", "3": "#4c9f38", "4": "#c5192d", 
    "5": "#ff3a21", "6": "#26bde2", "7": "#fcc30b", "8": "#a21942", 
    "9": "#fd6925", "10": "#dd1367", "11": "#fd9d24", "12": "#bf8b2e", 
    "13": "#3f7e44", "14": "#0a97d9", "15": "#56c02b", "16": "#00689d", 
    "17": "#19486a"
};



document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const sdgGoal = document.getElementById('sdg-goal');
    const projectDescription = document.getElementById('project-description');
    const charCount = document.getElementById('char-count');
    const newCollaborator = document.getElementById('new-collaborator');
    const fundingTarget = document.getElementById('funding-target');
    const fundingSlider = document.getElementById('funding-slider');
    const goalPreview = document.getElementById('goal-preview');
    

    
    initEventListeners();
    
    function updateCharCount() {
        const currentLength = projectDescription.value.length;
        charCount.textContent = currentLength;
        
        if (currentLength > 450) {
            charCount.style.color = '#e74c3c';
        } else {
            charCount.style.color = '';
        }
    }
    
   
    
    function updateCollaboratorStyles() {
        const tags = document.querySelectorAll('.collaborator-tag');
        const colors = ['#f0f8f0', '#e8f5e9', '#d5f5e3', '#e0eee4'];
        
        tags.forEach((tag, index) => {
            tag.style.backgroundColor = colors[index % colors.length];
        });
    }
    
    function updateFundingFromSlider() {
        fundingTarget.value = fundingSlider.value;
    }
    
    function updateSliderFromFunding() {
        const value = parseInt(fundingTarget.value) || 50000;
        fundingSlider.value = Math.min(Math.max(value, 1000), 1000000);
    }
    
    function updateGoalPreview() {
        const goalId = sdgGoal.value;
        
        if (goalId) {
            const goalName = sdgGoal.options[sdgGoal.selectedIndex].text;
            const color = sdgColors[goalId];
            
            goalPreview.classList.remove('goal-preview-hidden');
            goalPreview.classList.add('goal-preview');
            
            const goalIcon = goalPreview.querySelector('.goal-icon');
            goalIcon.style.backgroundColor = color;
            
            const goalText = goalPreview.querySelector('.goal-text');
            goalText.textContent = goalName;
            
            goalIcon.innerHTML = `<span style="color: white; font-weight: bold; display: flex; justify-content: center; align-items: center; height: 100%;">${goalId}</span>`;
        } else {
            goalPreview.classList.add('goal-preview-hidden');
            goalPreview.classList.remove('goal-preview');
        }
    }
    

    
    function initEventListeners() {
        projectDescription.addEventListener('input', updateCharCount);
        
        newCollaborator.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
        });
        
        fundingSlider.addEventListener('input', updateFundingFromSlider);
        fundingTarget.addEventListener('input', updateSliderFromFunding);
        fundingTarget.addEventListener('change', updateSliderFromFunding);
        
        sdgGoal.addEventListener('change', updateGoalPreview);
                
        
    }
    
    function addVisualEffects() {
        const formInputs = document.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('field-focus');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('field-focus');
            });
        });
        
        const formCard = document.querySelector('.form-card');
        formCard.style.opacity = '0';
        formCard.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            formCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            formCard.style.opacity = '1';
            formCard.style.transform = 'translateY(0)';
        }, 100);
        
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach((group, index) => {
            group.style.opacity = '0';
            group.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                group.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                group.style.opacity = '1';
                group.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });
    }
    
    addVisualEffects();
    updateCharCount();
    updateFundingFromSlider();
});

window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 300 && !document.querySelector('.floating-icon')) {
        createFloatingIcon();
    }
});

function createFloatingIcon() {
    const iconIds = ['1', '2', '3', '13', '17'];
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const randomId = iconIds[Math.floor(Math.random() * iconIds.length)];
            const color = sdgColors[randomId];
            
            const icon = document.createElement('div');
            icon.className = 'floating-icon';
            icon.style.backgroundColor = color;
            icon.style.position = 'fixed';
            icon.style.width = '40px';
            icon.style.height = '40px';
            icon.style.borderRadius = '50%';
            icon.style.display = 'flex';
            icon.style.justifyContent = 'center';
            icon.style.alignItems = 'center';
            icon.style.color = 'white';
            icon.style.fontWeight = 'bold';
            icon.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
            icon.style.zIndex = '100';
            icon.style.opacity = '0';
            icon.style.transition = 'opacity 0.5s ease, transform 1s ease';
            icon.innerHTML = randomId;
            
            icon.style.right = Math.floor(Math.random() * 100) + 20 + 'px';
            icon.style.top = Math.floor(Math.random() * 60) + 20 + '%';
            
            document.body.appendChild(icon);
            
            setTimeout(() => {
                icon.style.opacity = '0.8';
            }, 100);
            
            let direction = 1;
            let position = 0;
            const floatInterval = setInterval(() => {
                position += 0.5 * direction;
                if (position > 15 || position < -15) {
                    direction *= -1;
                }
                icon.style.transform = `translateY(${position}px)`;
            }, 50);
            
            setTimeout(() => {
                clearInterval(floatInterval);
                icon.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(icon);
                }, 500);
            }, 8000 + (i * 2000));
        }, i * 1000);
    }
}

const style = document.createElement('style');
style.textContent = `
.field-focus {
    transition: transform 0.3s ease;
    transform: translateX(5px);
}

.collaborator-tag {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.3s ease, transform 0.3s ease, background-color 0.3s ease;
}

@keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
}

.floating-icon {
    animation: float 4s ease-in-out infinite;
}
`;
document.head.appendChild(style);