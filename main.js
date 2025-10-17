let isFirstLoad = localStorage.getItem('isFirstLoad') !== 'false';

document.addEventListener('DOMContentLoaded', function () {

    const switchElement = document.getElementById('darkmode-switch');
    const localS = localStorage.getItem('theme');
    const themetoSet = localS || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', themetoSet);
    if (themetoSet == 'dark') {
        switchElement.checked = 'dark'
    };
});


const switchTheme = () => {
    const rootElem = document.documentElement
    let dataTheme = rootElem.getAttribute('data-theme'),
        newtheme

    newtheme = (dataTheme === 'light') ? 'dark' : 'light'

    rootElem.setAttribute("data-theme", newtheme);
    localStorage.setItem('theme', newtheme);
    setVideo(newtheme);
};
document.getElementById('darkmode-switch').addEventListener("click", switchTheme);


//LOADING
document.addEventListener('DOMContentLoaded', function () {
    var loadingScreen = document.getElementById('loading-screen');

    if (isFirstLoad) {
        setTimeout(function () {
            document.querySelectorAll('.revealfade').forEach(function (loadingScreen) {
                loadingScreen.classList.add('visible');
            });
        }, 2000);

    } else {
        setTimeout(function () {
            loadingScreen.style.display = 'none';
        }, 1000);
    }
});



//DROPDOWN
const dropDown = document.getElementById('dropDown');
const dropDowndiv = document.getElementById('dropDowndiv');
const dropDownLink = document.getElementById('header__link2');
const dropDownIcon = document.getElementById('dropdown__icon');
let hideTimeout;

dropDown.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout); 
    showDiv();
});

dropDown.addEventListener('mouseleave', () => {
    hideTimeout = setTimeout(hideDiv, 200); 
});

dropDowndiv.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout);


});

dropDowndiv.addEventListener('mouseleave', () => {
    hideTimeout = setTimeout(hideDiv, 200); 
});

function showDiv() {
    dropDowndiv.style.display = 'flex';
    dropDownLink.classList.add('hovered');
    dropDownIcon.classList.add('hovered');
    dropDownLink.style.color = 'var(--clr-header__text_hover)';
}

function hideDiv() {
    dropDowndiv.style.display = 'none';
    dropDownLink.classList.remove('hovered'); 
    dropDownIcon.classList.remove('hovered');
    dropDownLink.style.color = 'var(--clr-header__text)';
}





//HAMBURGER
const hamMenu = document.getElementById("hamburger__menu");
const offScreenMenu = document.querySelector(".hamburger__items");
document.querySelectorAll('.ham').forEach(item => {
    item.addEventListener('click', () => {
        offScreenMenu.classList.remove("active");
    });
});

hamMenu.addEventListener("click", (event) => {
    offScreenMenu.classList.toggle("active");
    event.stopPropagation();
});

document.addEventListener("click", (event) => {
    const target = event.target;
    const isClickInsideMenu = offScreenMenu.contains(target) || hamMenu.contains(target);

    if (!isClickInsideMenu && offScreenMenu.classList.contains("active")) {
        offScreenMenu.classList.remove("active");
    }
});

offScreenMenu.addEventListener("click", (event) => {
    event.stopPropagation();
});









//REVEAL
document.addEventListener('DOMContentLoaded', function () {
    const observerOptions = { threshold: 0.4 };
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    if (isFirstLoad) {
        if (window.innerWidth > 1025) {
            document.querySelectorAll('.revealup').forEach(function (item) {
                observer.observe(item);
            });
        } else {
            document.querySelectorAll('.revealup').forEach(function (item) {
                item.classList.add('visible');
            });
        }
        document.querySelectorAll('.reveal, .revealleft, .revealright').forEach(function (item) {
            observer.observe(item);
        });
        localStorage.setItem('isFirstLoad', 'false');
    } else {
        document.querySelectorAll('.reveal, .revealleft, .revealright, .revealup').forEach(function (item) {
            observer.observe(item);
        });
    };

});







//ANCHORS
document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        var targetId = this.getAttribute('href').substring(1);
        var targetElement = document.getElementById(targetId);

        if (targetElement) {
            var topOffset = parseInt(this.dataset.offset, 10) || 0;
            var elementPosition = targetElement.getBoundingClientRect().top;
            var offsetPosition = elementPosition + window.pageYOffset - topOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});






//CAROUSEL
document.addEventListener('DOMContentLoaded', function () {
    let items = document.querySelectorAll('.slider__carousel .item');
    let nextButton = document.getElementById('next');
    let prevButton = document.getElementById('prev');


    let active = 1;


    function loadShow() {
        let stt = 0;
        items[active].style.pointerEvents = 'auto';
        items[active].style.transform = `none`;
        items[active].style.zIndex = 1;
        items[active].style.filter = 'none';
        items[active].style.opacity = 1;

        for (var i = active + 1; i < items.length; i++) {
            stt++;
            items[i].style.pointerEvents = 'none';
            items[i].style.transform = `translateX(${250 * stt}px) scale(${1 - 0.5 * stt}) perspective(16px) rotateY(-1deg)`;
            items[i].style.zIndex = stt;
            items[i].style.filter = 'blur(5px)';
            items[i].style.opacity = stt > 1 ? 0 : 0.5;
            items[i].style.zIndex = 0;
            items[i].style.borderRadius = '30px';

        }
        stt = 0;
        for (var i = active - 1; i >= 0; i--) {
            stt++;
            items[i].style.pointerEvents = 'none';
            items[i].style.transform = `translateX(${-250 * stt}px) scale(${1 - 0.5 * stt}) perspective(16px) rotateY(1deg)`;
            items[i].style.zIndex = -stt;
            items[i].style.filter = 'blur(5px)';
            items[i].style.opacity = stt > 1 ? 0 : 0.5;
            items[i].style.zIndex = 0;
            items[i].style.borderRadius = '30px';

        }
    }

    function updateImageDescription(activeIndex) {
        const descriptionLinkElement = document.getElementById('imageDescription');
        const activeItem = items[activeIndex];
        const imgElement = activeItem.querySelector('.carousel__img');
        const descriptionText = imgElement.getAttribute('title');
        const descriptionUrl = imgElement.getAttribute('data-description-url');

        descriptionLinkElement.textContent = descriptionText;
        descriptionLinkElement.setAttribute('href', descriptionUrl);
        descriptionLinkElement.style.opacity = 1;
    }


    nextButton.addEventListener('click', function () {
        active = (active + 1) % items.length;
        loadShow();
        updateImageDescription(active);
    });


    prevButton.addEventListener('click', function () {
        active = (active - 1 + items.length) % items.length;
        loadShow();
        updateImageDescription(active);
    });



    loadShow();
    updateImageDescription(active);
});



