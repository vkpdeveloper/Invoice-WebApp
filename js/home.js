if (localStorage.getItem('login') == null) {
    window.location.href = '/';
} else {
    let shop;
    let owner;
    let mobile;
    let gst;
    document.addEventListener('DOMContentLoaded', () => {
        let data = JSON.parse(localStorage.getItem('login'));
        const app = firebase.app();
        let db = firebase.firestore();
        let allDetails = db.collection('users').doc(data[0]);
        allDetails.get().then(doc => {
            if (doc.exists) {
                shop = doc.data().shopName;
                owner = doc.data().ownerName;
                mobile = doc.data().mobile;
                gst = doc.data().gst;
                document.getElementById('bName').innerText = shop;
            }
        }).catch(err => console.log('Error Detected'))
        let userRef = db.collection(data[0]);
        let query = userRef.where('invoiceNo', '>=', '1');
        let tableData = ``;
        query.get().then(bills => {
            bills.forEach(bill => {
                let everyBill = bill.data();
                tableData += `<tr>
                <th scope="row">${everyBill.invoiceNo}</th>
                <td>${everyBill.date}</td>
                <td class="customer">${everyBill.customer}</td>
                <td>${everyBill.address}</td>
                <td>${everyBill.pcs}</td>
                <td>${everyBill.productName}</td>
                <td>${everyBill.unitPrice}</td>
                <td>${everyBill.totalPrice}</td>
                <td>${everyBill.mobile}</td>
                </tr>`
            })
            let tbody = document.getElementsByTagName('tbody')[0];
            tbody.innerHTML = tableData;
        }).catch(err => {
            console.log(err);
        })

    });
}