document.getElementById('customerForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    let customerName = document.getElementById('customerName').value;
    let primaryColor = document.getElementById('primaryColor').value;
    let successColor = document.getElementById('successColor').value;
    let dashboardAccess = document.getElementById('dashboardAccess').checked;
    let companyLogo = document.getElementById('companyLogo').files[0];
    let dataProtection = document.getElementById('dataProtectionContent').files[0];

    let customerData = {
        customerName: customerName,
        customization: {
            companyName: customerName,
            primaryColor: primaryColor,
            successColor: successColor,
            dashboardAccess: dashboardAccess
        }, 
        companyLogo: companyLogo,
        dataProtection: dataProtection
    };

    if (dataProtection) {
        let reader = new FileReader();
        reader.onload = function(e) {
            let data = new Uint8Array(e.target.result);
            let workbook = XLSX.read(data, { type: 'array' });
            let sheetName = workbook.SheetNames[0];
            let sheet = workbook.Sheets[sheetName];
            let jsonData = XLSX.utils.sheet_to_json(sheet);
    
            //submitForm(jsonData);
            console.log('Data Protection data:', jsonData);
            console.log('Data protection:', customerData); 
        };
        reader.readAsArrayBuffer(dataProtection);
    } else {
        console.log('Data protection:', customerData)
        //submitForm(customerData);
    }

});

// function submitForm() {
//     let formData = new FormData(document.getElementById('customerForm'));
//     fetch('submit.php', {
//         method: 'POST',
//         body: formData
//     }).then(response => response.json())
//     .then(data => {
//         console.log('Response from server:', data);
//     }).catch(error => {
//         console.error('Error:', error);
//     });
// }; 

