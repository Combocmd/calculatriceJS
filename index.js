// ============================
// SÉLECTEURS DOM
// ============================
const chiffres = document.querySelectorAll(".number");
const ecran = document.getElementById("display");
const effacer = document.getElementById("clear");
const operateurs = document.querySelectorAll(".operator");
const egale = document.getElementById("equals");

// ============================
// ÉTAT GLOBAL (persiste entre les clics)
// ============================
let value1 = null;
let operator = null;
let waitingForSecond = false;

// ============================
// HELPERS
// ============================
function majAffichage(val) {
  ecran.value = val === '' ? '0' : val;
}

function calculer(a, op, b) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b !== 0 ? a / b : 'Erreur';
  }
}

function resetAll() {
  value1 = null;
  operator = null;
  waitingForSecond = false;
  majAffichage('');
}

// ============================
// TES FONCTIONS (posent les listeners UNE SEULE FOIS)
// ============================

function getNumbers() {
  chiffres.forEach(btn => {
    btn.addEventListener("click", () => {
      const digit = btn.dataset.value;
      if (waitingForSecond) {
        majAffichage(digit);
        waitingForSecond = false;
      } else {
        const current = ecran.value === '0' ? '' : ecran.value;
        majAffichage(current + digit);
      }
    });
  });
}

function getOperator() {
  operateurs.forEach(btn => {
    btn.addEventListener("click", () => {
      const nextOp = btn.dataset.value;

      if (operator !== null && !waitingForSecond) {
        const value2 = parseFloat(ecran.value);
        const result = calculer(value1, operator, value2);
        if (result === 'Erreur') { majAffichage('Erreur'); resetAll(); return; }
        value1 = result;
        majAffichage(String(result));
      } else {
        value1 = parseFloat(ecran.value);
      }

      operator = nextOp;
      waitingForSecond = true;
    });
  });
}

function clearAll() {
  effacer.addEventListener("click", () => {
    resetAll();
  });
}

function calculator() {
  egale.addEventListener("click", () => {
    if (operator !== null && !waitingForSecond) {
      const value2 = parseFloat(ecran.value);
      const result = calculer(value1, operator, value2);
      majAffichage(result === 'Erreur' ? 'Erreur' : String(result));
      value1 = result === 'Erreur' ? null : result;
      operator = null;
      waitingForSecond = true;
    }
  });
}

// ============================
// INITIALISATION (une seule fois)
// ============================
getNumbers();
getOperator();
clearAll();
calculator();
resetAll();