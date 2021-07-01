"use strict";

function Masina(pavadinimas, maxGreitis) {
    this.pavadinimas = pavadinimas;
    this.maxGreitis = maxGreitis;
    this.greitis = 0;
    this.kelias = 0;
    this.gazuojam = function(kiek) {
        this.greitis += kiek;
    }
    this.stabdom = function(kiek) {
        this.greitis -= kiek;
    }
    this.vaziuojam = function() {
        this.kelias += this.greitis;
    }
}

let zigulys = new Masina("Zigulys", 160);
let ford = new Masina("Ford", 240);
let bmw = new Masina("BMW", 260);
let tata = new Masina("Tata", 120);
let kirov = new Masina("Kirov", 180);
let tesla = new Masina("Tesla", 230);
let lotus = new Masina("Lotus", 270);
let kia = new Masina("KIA", 220);

let m = [];

m.push(zigulys);
m.push(ford);
m.push(bmw);
m.push(tata);
m.push(kirov);
m.push(tesla);
m.push(lotus);
m.push(kia);

let nuvaziuota = 0;
let maxKelias = 0;
let riba = 10000;
let etapas = 50;

do {
    for (let k = 0; k < m.length; k++) {
        let pedalas = Math.random(); // atsitiktinis pedalo paspaudimas
        let kiekPaspausta = 0;
        if (pedalas <= 0.2) { // jei nuo 0 iki 0.2 atsitiktines vertes dydis, reiskia paspaude stabdi
            kiekPaspausta = Math.ceil(Math.random() * 5); // kiek paspaude stabdi - vel atsistiktinis skaiciavimas. tik sveiki inkrementai 1...5, todel naudoju "ceil"
            if (m[k].greitis - kiekPaspausta > 0) { // tik tuo atveju, jei esamas greitis ir greitis po stabdzio paspaudimo vis dar didesnis nei 0, maziname greiti
                m[k].stabdom(kiekPaspausta);
            } else { // kitu atveju, gereitis pasidaro 0. t.y., jei buves greitis (tarkim, 3) ir nuspaustas stabdis (tarkim -5) maziau uz nuli (tarkim -2), greiti nustatom 0 (masina pilnai sustojo, bet atgal vaziuoti negali)
                m[k].greitis = 0;
            }
        } else { //  jei nuo 0.2 iki 1 atsitiktines vertes dydis, reiskia paspaude stabdi
            kiekPaspausta = Math.ceil(Math.random() * 10); // kiek paspaude gaza - vel atsistiktinis skaiciavimas. tik sveiki inkrementai 1...0
            if (m[k].greitis + kiekPaspausta <= m[k].maxGreitis) { // didinam pagazavima (greiti) tik jei greitis dar nevirsija maximumo (po paspaudimo)
                m[k].gazuojam(kiekPaspausta);
            } else {
                m[k].greitis = m[k].maxGreitis; // jei greitis didesnis, nei maximumas, tada greitis lieka maksimumas (daugiau nebera kur spausti, dugnas)
            }
        }
        m[k].vaziuojam(); // isiimam didziausia kelio verte is visu masinu
        if (m[k].kelias > maxKelias) {
            maxKelias = m[k].kelias;
        }
    }
    for (let i = m.length - 1; i >= 0; i--) { //isrikiuojam masinas nuo daugiausiai nuvaziavusias iki maziausiai
        for (let j = 1; j <= i; j++) {
            if (m[j - 1].kelias < m[j].kelias) {
                let temp = m[j - 1];
                m[j - 1] = m[j];
                m[j] = temp;
            }
        }
    }
    if (maxKelias >= etapas + nuvaziuota) { // nuvaziuota didinamas tik etapo inkrementais. atspausdinam kas etapa. jei maxKelias pasieke etapo zingsni, rodomas laimetojas
        nuvaziuota = etapas * Math.floor(maxKelias / etapas); // nuvaziuota padidinama etapo dydziu. kas reiskia, jog sekantis maxKelias tures but etapo dydziu (pvz., 100km) didesnis
        console.log(nuvaziuota, ' laimetojas:');
        console.log(m[0]); // kadangi pries tai isirikiavom visas masinas nuo laimetojos iki maziausiai nuvaziavusio (atitinkamai, maxKelias verte atitinka m[0].kelias verte), isrodom pirma perrikiuoto objektu (masinu) masyvo nari m[0]

    }
}
while (maxKelias < riba); // visa cikla sukam tiesiog kol maxKelias mazesnis uz nustatyta riba

console.log('\n', 'FINISAS. Rikiuote:');
console.log(m); // kadangi kiekvienoj pavaziavimo iteracijoj vis isirikiuojam masyvo narius, cia jau nieko nebedarom, tiesiog spausdinam masyva

/*
masinu lenktynes:

sukurti masyva is 8 masinu +

kiekvieno ciklo metu : +
visos masinos
    pagazuoja (80%): 1..10
    pastabdo (20%): 1..5

    pavaziuoja +

    patikrinam ar kuri nors masina nenuvaziavo 1000 km +

kai bent viena masina nuvaziavo 1000 km - lenktynes baigiasi +

surusiuoti masinas pagal nuvaziuota kelia mazejimo tvarka +
ir atspausdinti rezultatus + 

*) kas 100km atspausdinti lyderio pavadinima +/-


*/