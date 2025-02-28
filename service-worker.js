document.addEventListener("DOMContentLoaded", function() {
    const profilForm = document.getElementById("profilForm");
    const profilNameInput = document.getElementById("profilName");
    const profilAnzeige = document.getElementById("profilAnzeige");
    const ladeForm = document.getElementById("ladeForm");
    const ladeListe = document.getElementById("ladeListe");

    function ladeProfil() {
        let gespeichertesProfil = localStorage.getItem("Lademonitor");
        if (gespeichertesProfil) {
            profilAnzeige.textContent = `Aktuelles Profil: ${gespeichertesProfil}`;
        } else {
            profilAnzeige.textContent = "Kein Profil gespeichert";
        }
    }

    profilForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const profilName = profilNameInput.value.trim();
        if (!profilName) {
            alert("Bitte einen Profilnamen eingeben!");
            return;
        }
        localStorage.setItem("Lademonitor", profilName);
        ladeProfil();
    });

    function ladeEintraege() {
        ladeListe.innerHTML = "";
        let gespeicherteEintraege = JSON.parse(localStorage.getItem("ladeDaten")) || [];
        
        gespeicherteEintraege.forEach((eintrag, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${eintrag.datum}</strong>: 
                ${eintrag.kilometerstand} km, 
                ${eintrag.lademenge} kWh, 
                ${eintrag.ladekosten} €/kWh, 
                ${eintrag.ladesaeule}
                <button onclick="loescheEintrag(${index})">Löschen</button>
            `;
            ladeListe.appendChild(li);
        });
    }

    ladeForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const profilName = localStorage.getItem("Lademonitor");
        if (!profilName) {
            alert("Bitte zuerst ein Fahrzeugprofil anlegen!");
            return;
        }

        const datum = document.getElementById("datum").value;
        const kilometerstand = document.getElementById("kilometerstand").value;
        const lademenge = document.getElementById("lademenge").value;
        const ladekosten = document.getElementById("ladekosten").value;
        const ladesaeule = document.getElementById("ladesaeule").value;

        if (!datum || !kilometerstand || !lademenge || !ladekosten) {
            alert("Bitte alle Felder ausfüllen!");
            return;
        }

        const eintrag = { datum, kilometerstand, lademenge, ladekosten, ladesaeule, profilName };
        
        let gespeicherteEintraege = JSON.parse(localStorage.getItem("ladeDaten")) || [];
        gespeicherteEintraege.push(eintrag);
        localStorage.setItem("ladeDaten", JSON.stringify(gespeicherteEintraege));
        
        ladeEintraege();
        ladeForm.reset();
    });

    window.loescheEintrag = function(index) {
        let gespeicherteEintraege = JSON.parse(localStorage.getItem("ladeDaten")) || [];
        gespeicherteEintraege.splice(index, 1);
        localStorage.setItem("ladeDaten", JSON.stringify(gespeicherteEintraege));
        ladeEintraege();
    };

    ladeProfil();
    ladeEintraege();
});
