function setLevel(level) {
    document.querySelectorAll('.tutorials').forEach(section => {
        section.classList.remove('fade'); 
        section.style.display = 'none';
    });

    let targetSection;
    if (level === 'Beginner') {
        targetSection = document.querySelector('.beginners');
    } else if (level === 'Intermediate') {
        targetSection = document.querySelector('.intermediates');
    } else if (level === 'Expert') {
        targetSection = document.querySelector('.experts');
    }

    if (targetSection) {
        targetSection.style.display = 'flex';
        requestAnimationFrame(() => {
            targetSection.classList.add('fade');
        });
    }
};

document.addEventListener('DOMContentLoaded', function () {

    let level = localStorage.getItem('selectedLevel') || 'Beginner';

    document.getElementById(level).checked = true;
    setLevel(level);


    document.querySelectorAll('.btn-input').forEach(button => {
        button.addEventListener('change', function () {
            const level = this.id;
            localStorage.setItem('selectedLevel', level);
            setLevel(level);
        });
    });
});







