const contactForm = document.getElementById("contactForm");
const contactMessage = document.getElementById("contactMessage");
const telefoonInput = document.getElementById("telefoon");

const whatsappNumber = "32486215001";

if (telefoonInput) {
    telefoonInput.addEventListener("input", function () {
        telefoonInput.value = telefoonInput.value.replace(/[^+0-9\s]/g, "");
    });
}

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailPattern.test(email);
}

function isValidBelgianPhoneNumber(phoneNumber) {
    const cleanedPhoneNumber = phoneNumber.replace(/\s/g, "");

    const belgianMobileLocal = /^04\d{8}$/;
    const belgianMobileInternationalPlus = /^\+324\d{8}$/;
    const belgianMobileInternationalDoubleZero = /^00324\d{8}$/;

    return (
        belgianMobileLocal.test(cleanedPhoneNumber) ||
        belgianMobileInternationalPlus.test(cleanedPhoneNumber) ||
        belgianMobileInternationalDoubleZero.test(cleanedPhoneNumber)
    );
}

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const naam = document.getElementById("naam").value.trim();
        const bedrijf = document.getElementById("bedrijf").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefoon = document.getElementById("telefoon").value.trim();
        const typeWebsite = document.getElementById("typeWebsite").value;
        const bericht = document.getElementById("bericht").value.trim();

        if (
            naam === "" ||
            bedrijf === "" ||
            email === "" ||
            telefoon === "" ||
            typeWebsite === "" ||
            bericht === ""
        ) {
            contactMessage.textContent = "Vul alle velden in.";
            contactMessage.className = "contact-message error-message";
            return;
        }

        if (!isValidEmail(email)) {
            contactMessage.textContent = "Vul een geldig e-mailadres in.";
            contactMessage.className = "contact-message error-message";
            return;
        }

        if (!isValidBelgianPhoneNumber(telefoon)) {
            contactMessage.textContent = "Vul een geldig Belgisch GSM-nummer in, bijvoorbeeld 0486 21 50 01 of +32 486 21 50 01.";
            contactMessage.className = "contact-message error-message";
            return;
        }

        const whatsappMessage = `
Nieuwe offerteaanvraag

Naam: ${naam}
Bedrijf: ${bedrijf}
E-mail: ${email}
Telefoon: ${telefoon}
Pakket: ${typeWebsite}

Bericht:
${bericht}
        `;

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        contactMessage.innerHTML = `
            <strong>Bedankt ${naam}!</strong><br>
            WhatsApp wordt geopend met je offerteaanvraag.
        `;

        contactMessage.className = "contact-message success-message";

        window.open(whatsappUrl, "_blank");

        contactForm.reset();
    });
}