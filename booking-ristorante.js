const Booking = {};

Booking.numeroPersoneW = document.getElementById("numero-persone-w");
Booking.numeroPersone = document.getElementById("numero-persone");
Booking.tavoliW = document.getElementById("tavoli-w");
Booking.tavoloSelezionato = document.getElementById("tavolo-selezionato");
Booking.messageStatus = document.getElementById("message-status");

(async function costruisciSala(){
    Booking.sala = await fetch('sala.json');
    Booking.sala = await Booking.sala.json();
    //console.log(Booking.sala);
    Booking.tavoli = await Booking.sala.tavoli;
    disponiTavoli(Booking.tavoli);
})();

function disponiTavoli(tavoli) {
    tavoli.forEach((tavolo,i) => {
        let classiTavolo = 'tavolo', tavoloDOM = document.createElement('div');
        tavoloDOM.appendChild(document.createTextNode(i+1));
        classiTavolo += tavolo.occupato ? ' occupato' : ' libero';
        classiTavolo += tavolo.posti == 6 ? ' x6' : ' x4';
        tavoloDOM.setAttribute('class', classiTavolo);
        //console.log(tavoloDOM);
        Booking.tavoliW.appendChild(tavoloDOM);
    });
}

//Gestione numero persone da prenotare
Booking.numeroPersoneW.addEventListener('click', (e) => {
    e.preventDefault();
    let numeroPersone = +Booking.numeroPersone.textContent;
    if (e.target.id== 'add'){
        Booking.numeroPersone.textContent = numeroPersone + 1;
    }else if(e.target.id== 'sub' && numeroPersone > 1){
        Booking.numeroPersone.textContent = numeroPersone - 1;
    }
});

//Gestione selezione tavolo da prenotare
Booking.tavoliW.addEventListener('click', (e) => {
    e.preventDefault();
    let selezionato = +e.target.textContent;
    console.log(selezionato);
    if (Booking.tavoli[selezionato-1].occupato) {
        Booking.messageStatus.textContent = `il tavolo ${selezionato} è occupato`
    } else {
        Booking.tavoloSelezionato.textContent = selezionato;
    }
});

//Gestione Invio Prenotazione
document.forms[0].addEventListener('submit', (e)=> {
    e.preventDefault();
    if (Booking.tavoloSelezionato.textContent == '-') {
        Booking.messageStatus.textContent = `è necessario selezionare un tavolo`;
        return;
    }
    sendBooking();
})

function sendBooking() {
    let bookingForm = new FormData();
    //l'oggetto formData ci consente di creare le coppie chiave valore cosi da poterle spedire con l'api fetch
    bookingForm.append('numero-persone', +Booking.numeroPersone.textContent);
    bookingForm.append('tavolo', +Booking.tavoloSelezionato.textContent);
    bookingForm.append('nome', document.forms[0].nome.value);
    bookingForm.append('email', document.forms[0].email.value);

    // invio la prenotazione
    // fetch('bookingScript', {
    //     body: bookingForm,
    //     method: 'post'
    // });

    Booking.messageStatus.textContent = 'La prenotazione è andata a buon fine';
    document.forms[0].reset();
}
