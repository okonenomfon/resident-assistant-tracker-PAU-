document.getElementById('qrForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const hostel = document.getElementById('hostel').value;

    const errorMessage = document.getElementById('error-message');
    const qrCodeDiv = document.getElementById('qrcode');
    const qrModal = document.getElementById('qrModal');

    errorMessage.textContent = '';
    qrCodeDiv.innerHTML = '';

    const validHostels = [
        'EDC', 'Emerald', 'Amethyst', 'Faith', 'POD_living', 'Cooperative_male', 
        'Cooperative_queens', 'Redwood', 'Trinity', 'Cedar', 'Pearl', 'Trezadel'
    ];

    const residentAssistants = {
        EDC: 'Alice Johnson',
        Emerald: 'Brian Smith',
        Amethyst: 'Catherine Taylor',
        Faith: 'David Wilson',
        POD_living: 'Ella Brown',
        Cooperative_male: 'Frank Garcia',
        Cooperative_queens: 'Grace Martinez',
        Redwood: 'Henry Davis',
        Trinity: 'Isabella Rodriguez',
        Cedar: 'Jack White',
        Pearl: 'Karen Lewis',
        Trezadel: 'Liam Walker',
    };

    if (!email.endsWith('@pau.edu.ng')) {
        errorMessage.textContent = 'Error: Use your school email.';
        return;
    }

    if (!validHostels.includes(hostel)) {
        errorMessage.textContent = 'Error: Invalid hostel selected.';
        return;
    }

    const raName = residentAssistants[hostel];
    if (!raName) {
        errorMessage.textContent = 'Error: Resident Assistant not found for the selected hostel.';
        return;
    }

    const baseUrl = `${window.location.origin}/display.html`;
    
    const queryString = `?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&hostel=${encodeURIComponent(hostel)}&raName=${encodeURIComponent(raName)}`;
    const qrCodeUrl = baseUrl + queryString;

    $(qrCodeDiv).empty();
    $(qrCodeDiv).qrcode({
        width: 256,
        height: 256,
        text: qrCodeUrl
    });

    qrModal.style.display = 'flex';
});

document.getElementById('closeModal').addEventListener('click', function () {
    document.getElementById('qrModal').style.display = 'none';
});

window.addEventListener('click', function (event) {
    const qrModal = document.getElementById('qrModal');
    if (event.target === qrModal) {
        qrModal.style.display = 'none';
    }
});
