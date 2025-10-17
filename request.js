//EMAIL csekkolása
let timeoutId = null;
document.getElementById('email').addEventListener('input', function () {
    clearTimeout(timeoutId);
    var emailField = this;
    timeoutId = setTimeout(function () {
        var validIcon = document.getElementById('validIcon');
        var invalidIcon = document.getElementById('invalidIcon');
        const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (emailField.value.match(re)) {
            validIcon.style.display = 'block';
            invalidIcon.style.display = 'none';
        } else if (emailField.value === '') {
            validIcon.style.display = 'none';
            invalidIcon.style.display = 'none';
        } else {
            validIcon.style.display = 'none';
            invalidIcon.style.display = 'block';
        }
    });
});





//EMAIL rész növelése
let focused = 0;

document.querySelector('.e-mail').addEventListener('mouseleave', function () {
    if (focused == 0) {
        document.querySelectorAll('.icon').forEach(function (icon) {
            icon.style.width = '35px';
        });
    }
});

document.querySelector('.e-mail').addEventListener('focus', function () {
    document.querySelectorAll('.icon').forEach(function (icon) {
        focused = 1;
        icon.style.width = '38px';
    });
});

document.querySelector('.e-mail').addEventListener('blur', function () {
    document.querySelectorAll('.icon').forEach(function (icon) {
        focused = 0;
        icon.style.width = '35px';
    });
});

document.querySelector('.e-mail').addEventListener('mouseenter', function () {
    document.querySelectorAll('.icon').forEach(function (icon) {
        icon.style.width = '38px';
    });
});

document.getElementById('myTextarea').addEventListener('input', function () {
    var maxLength = this.getAttribute('maxlength');
    var currentLength = this.value.length;

    if (currentLength >= maxLength) {
        alert('You have reached your max character length!');
    }

    document.getElementById('charCount').textContent = `${currentLength}/${maxLength}`;
});






//Textarea frissitése
const textarea = document.getElementById('myTextarea');

textarea.addEventListener('input', autoResize, false);

function autoResize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
}






//Küldés
document.getElementById('submit').addEventListener('click', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const effectType = document.querySelector('input[name="effectType"]:checked') ? document.querySelector('input[name="effectType"]:checked').value : '';
    const provideVideoLinkChecked = document.getElementById('provideVideoLink').checked;
    const videoLink = document.getElementById('provideVideoLink').checked ? document.getElementById('videoLink').value : '';
    const message = document.getElementById('myTextarea').value;
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;



    if (!re.test(email)) {
        invalidIcon.style.display = 'block';
        alert('Please fill out your e-mail!');
        return;
    }

    if (!email || !effectType || (provideVideoLinkChecked && !videoLink) || !message) {
        alert('Fill out everything!');
        return;
    }


    const formData = {
        email,
        effectType,
        provideVideoLink: provideVideoLinkChecked,
        videoLink,
        message
    };

    localStorage.setItem('formData', JSON.stringify(formData));

    document.getElementById('requestForm').reset();
    updateCharCount();
    displaySentText();
    document.getElementById('invalidIcon').style.display = 'none';
    document.getElementById('validIcon').style.display = 'none';
    document.getElementById('videoLink').style.display = 'none';
    document.getElementById('box-text').style.display = 'flex';
});




function displaySentText() {
    const text = document.getElementById('textSent');
    const icon = document.getElementById('tick');
    const background = document.getElementById('Senttext');

    background.style.display = 'flex';
    setTimeout(() => {
        background.classList.add('backgroundin');
    }, 10);

    setTimeout(() => {
        icon.classList.add('senticonanimation');
    }, 500);


    icon.addEventListener('animationend', () => {
        icon.style.display = 'none';

        text.style.display = 'flex';
        text.classList.add('senttextanimation');
    });

    text.addEventListener('animationend', () => {
        setTimeout(() => {
            background.classList.add('backgroundout');
            setTimeout(() => {
                background.style.display = 'none';
                icon.classList.remove('senticonanimation');
                icon.style.display = 'block';
                text.classList.remove('senttextanimation');
                text.style.display = 'none';
                background.classList.remove('backgroundout', 'backgroundin');
            }, 500);
        });
    });
}











//Link eltüntetése
document.getElementById('provideVideoLink').addEventListener('change', function () {
    if (this.checked) {
        document.getElementById('videoLink').style.display = 'block';
        document.getElementById('box-text').style.display = 'none';
    } else {
        document.getElementById('videoLink').style.display = 'none';
        document.getElementById('box-text').style.display = 'flex';
    }
});



//Karakterszám frissítése
function updateCharCount() {
    var charCount = 0;
    var maxLength = document.getElementById('myTextarea').getAttribute('maxlength');
    document.getElementById('charCount').textContent = `${charCount}/${maxLength}`;
}




//Form resetelése
document.getElementById('rest').addEventListener('click', function () {
    document.getElementById('requestForm').reset();
    updateCharCount();
    document.getElementById('box-text').style.display = 'flex';
    document.getElementById('videoLink').style.display = 'none';
    document.getElementById('invalidIcon').style.display = 'none';
    document.getElementById('validIcon').style.display = 'none';
});
