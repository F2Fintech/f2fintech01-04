// calculator.js

function calculateEMI() {
  var salary = document.getElementById('totalSalary').value;
  var obligation = document.getElementById('totalObligation').value;

  // Perform your calculations here
  var eligibility = calculateLoanEligibility(salary, obligation);

  // Display the result
  document.getElementById('result').innerHTML = `Your loan eligibility amount is: ${eligibility}`;
}

function calculateLoanEligibility(salary, obligation) {
  // Simple calculation logic, replace with actual formula
  return salary - obligation;
}
