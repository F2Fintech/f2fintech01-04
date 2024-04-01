// Bank FOIR Mapping
const bankFoirMapping = {
  "HDFC": {"foir_low": 60, "foir_high": 70},
  "ICICI": {"foir_low": 60, "foir_high": 70},
  "Kotak": {"foir_low": 60, "foir_high": 70},
  "Axis": {"foir_low": 60, "foir_high": 60},
  "YES": {"foir_low": 65, "foir_high": 75},
  "Bajaj": {"foir_low": 65, "foir_high": 70},
  "TATA": {"foir_low": 65, "foir_high": 70},
  "Chola": {"foir_low": 65, "foir_high": 70},
  "L&T": {"foir_low": 65, "foir_high": 70},
  "Godrej": {"foir_low": 65, "foir_high": 70},
};

document.addEventListener('DOMContentLoaded', function () {
  // Find all buttons with the class 'calculate-btn' and add event listeners
  document.querySelectorAll('.calculate-btn').forEach(button => {
      button.addEventListener('click', function(event) {
          event.preventDefault();
          const calculationType = this.getAttribute('data-calculation');
          switch(calculationType) {
              case 'personal-loan':
                  calculatePersonalLoan();
                  break;
              case 'professional-loan':
                  calculateProfessionalLoan();
                  break;
              case 'business-loan':
                  calculateBusinessLoan();
                  break;
              case 'emi':
                  calculateEMI();
                  break;
              case 'abb':
                  calculateABB();
                  break;
              default:
                  console.error('Unknown calculation type:', calculationType);
          }
      });
  });
});

function calculatePersonalLoan() {
  const totalSalary = parseFloat(document.getElementById("total-salary").value);
  const totalObligation = parseFloat(document.getElementById("total-obligation").value);
  const selectedBank = document.getElementById("bank").value;

  const bankFoir = bankFoirMapping[selectedBank] || {"foir_low": 60, "foir_high": 65};
  let foir = totalSalary < 50000 ? bankFoir["foir_low"] : bankFoir["foir_high"];
  let eligibilityAmount = ((foir / 100) * totalSalary - totalObligation) * 50;
  eligibilityAmount = Math.min(eligibilityAmount, 3000000);

  displayResult("personal-loan-result", `Eligibility Amount for Personal Loan: ${eligibilityAmount}`);
}

function calculateProfessionalLoan() {
  const profession = document.getElementById("profession").value;
  const experience = parseInt(document.getElementById("experience").value, 10);
  const cibilScore = document.getElementById("cibil-score").checked;

  let eligibilityAmount = 0;

  if (profession === "BAMS" || profession === "BHMS" || profession === "BDS") {
      if (experience >= 5 && experience <= 9) {
          eligibilityAmount = experience * 100000;
      } else if (experience > 9) {
          eligibilityAmount = 1000000;
      }
  } else if (profession === "MBBS") {
      if (experience <= 2) {
          eligibilityAmount = 500000;
      } else if (experience <= 10) {
          eligibilityAmount = experience * 2 * 100000;
      } else {
          eligibilityAmount = 2800000;
      }
      if (cibilScore) {
          if (eligibilityAmount > 1500000) {
              eligibilityAmount = 1500000;
          } else {
              eligibilityAmount = experience * 100000;
          }
      }
  } else if (profession === "MD/MS") {
      if (experience <= 5) {
          eligibilityAmount = 3500000;
      } else {
          eligibilityAmount = 5000000;
      }
      if (cibilScore) {
          eligibilityAmount = 2000000;
      }
  }

  displayResult("professional-loan-result", `Eligibility Amount for Professional Loan: ${eligibilityAmount}`);
}

function calculateBusinessLoan() {
  const turnover = parseFloat(document.getElementById("turnover-amount").value);
  const netProfit = parseFloat(document.getElementById("net-profit-amount").value);
  const grossProfit = parseFloat(document.getElementById("gross-profit-amount").value);
  const obligation = parseFloat(document.getElementById("obligation-amount").value);
  const obligationFrequency = document.querySelector('input[name="obligation-frequency"]:checked').value;
  const calculationBasis = document.querySelector('input[name="calculation-basis"]:checked').value;

  let loanAmount = 0;
  if (calculationBasis === "Turnover") {
      loanAmount = turnover * 0.1 - obligation;
  } else if (calculationBasis === "Net Profit") {
      loanAmount = netProfit * 4 - obligation;
  } else if (calculationBasis === "Gross Profit") {
      loanAmount = grossProfit * 2 - obligation;
  }

  if (obligationFrequency === "Monthly") {
      loanAmount -= obligation * 12;
  }

  loanAmount = Math.max(0, Math.min(loanAmount, 3500000));

  displayResult("business-loan-result", `Eligibility Amount for Business Loan: ${loanAmount}`);
}

function calculateEMI() {
  const principal = parseFloat(document.getElementById("loan-amount").value);
  const interestRate = parseFloat(document.getElementById("interest-rate").value) / 100;
  const tenor = parseInt(document.getElementById("loan-tenor").value, 10);

  const monthlyInterestRate = interestRate / 12;
  const numInstallments = tenor * 12;

  let emi = principal * monthlyInterestRate * Math.pow((1 + monthlyInterestRate), numInstallments) / (Math.pow((1 + monthlyInterestRate), numInstallments) - 1);

  if (!isFinite(emi)) {
      emi = principal / numInstallments;
  }

  displayResult("emi-result", `Monthly EMI: ${emi.toFixed(2)}`);
}

function calculateABB() {
  const amounts = [
      parseFloat(document.getElementById("date-5").value),
      parseFloat(document.getElementById("date-10").value),
      parseFloat(document.getElementById("date-15").value),
      parseFloat(document.getElementById("date-20").value),
      parseFloat(document.getElementById("date-25").value),
      parseFloat(document.getElementById("date-30").value)
  ];

  const averageBalance = amounts.reduce((acc, amount) => acc + amount, 0) / amounts.length;
  
  displayResult("abb-result", `Average Bank Balance: ${averageBalance.toFixed(2)}`);
}
