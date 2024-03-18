const inputs = document.querySelectorAll('input')
const button = document.querySelector('#verifyBtn')
const mobile = document.querySelector('#mobile')
const expire = document.querySelector('#expire')
const request = document.querySelector('#request')

let otp = ''
let expireInterval;

function generateOtps() {
    otp = (Math.floor(Math.random() * 10) + '' +
        Math.floor(Math.random() * 10) + '' +
        Math.floor(Math.random() * 10) + '' +
        Math.floor(Math.random() * 10) + '')
    alert('Your OTP is : ' + otp)
    inputs[0].focus()

    expire.innerText = 10;
    expireInterval = setInterval(() => {
        expire.innerText--;

        if (expire.innerHTML === '0') {
            clearInterval(expireInterval);
        }
    }, 1000);
}

function clearOtps() {
    inputs.forEach((input) => {
        input.value = ''
        input.setAttribute('disabled', true)
        expire.innerText = 0
    })
    clearInterval(expireInterval);
    button.style.backgroundColor = '#78c1f3'
}

inputs.forEach((input, index) => {
    input.addEventListener('keyup', (e) => {
        const currentInput = input
        const nextInput = input.nextElementSibling
        const previousInput = input.previousElementSibling

        if (nextInput && nextInput.hasAttribute('disabled') && currentInput !== '') {
            nextInput.removeAttribute('disabled')
            nextInput.focus()
        }

        inputs.forEach((input, index1) => {
            if (e.key === 'Backspace') {
                if (index <= index1 && previousInput) {
                    input.setAttribute('disabled', true);
                    previousInput.removeAttribute('disabled');
                    previousInput.focus();
                    previousInput.value = '';
                }
            }
        })

        if (inputs[3].value !== '') {
            inputs[3].blur()
            button.style.backgroundColor = '#3998d8'
        } else {
            button.style.backgroundColor = '#78c1f3'
        }
    })
})

onload = () => {
    let no = prompt('Enter your Mobile Number')
    mobile.innerHTML = no
    generateOtps()
}

button.addEventListener('click', () => {
    let verify = ''
    inputs.forEach((input) => {
        verify += input.value
    })
    if (verify === otp) {
        alert('Your account has been verified successfully!')
    } else {
        alert("Invalid OTP!!!")
    }
    clearOtps()
})