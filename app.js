// Lädt vorhandene Ladevorgänge aus dem localStorage oder initialisiert ein leeres Array
let charges = JSON.parse(localStorage.getItem('charges') || '[]');

// Hilfsfunktion: Liste der gespeicherten Ladevorgänge rendern
const listElement = document.getElementById('charge-list');
function renderList() {
  listElement.innerHTML = '';
  charges.forEach(entry => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="date">${entry.date}:</span> <span class="desc">${entry.desc}</span>`;
    listElement.appendChild(li);
  });
}

// Aktuelles Datum als Standardwert im Formular setzen
const dateInput = document.getElementById('date');
const descInput = document.getElementById('description');
if (dateInput && !dateInput.value) {
  // Datum im Format YYYY-MM-DD ermitteln (für type="date")
  dateInput.value = new Date().toISOString().split('T')[0];
}

// Bereits gespeicherte Einträge beim Laden anzeigen
renderList();

// Event-Listener für Formularabsendung (neuer Ladevorgang)
document.getElementById('charge-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const date = dateInput.value;
  const desc = descInput.value;
  if (!date || !desc) {
    return; // Falls ein Feld leer ist (sollte durch "required" verhindert werden)
  }
  // Neuen Eintrag zum Array hinzufügen und in localStorage speichern
  charges.push({ date: date, desc: desc });
  localStorage.setItem('charges', JSON.stringify(charges));
  // Liste aktualisieren und Formular zurücksetzen
  renderList();
  descInput.value = '';  // Beschreibungstextfeld leeren (Datum bleibt gesetzt)
});

// Service Worker registrieren (für Offline-Funktionalität)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker registriert'))
    .catch(error => console.log('Service Worker Registrierung fehlgeschlagen:', error));
}
