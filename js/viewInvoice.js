let shop;
let owner;
let gloMobile;
let gst;
let gloEmail;
let gloAddress;


if (localStorage.getItem('login') != null) {
    document.addEventListener('DOMContentLoaded', () => {
        let data = JSON.parse(sessionStorage.getItem('login'));
        let db = firebase.firestore();
        let getDetails = db.collection('users').doc(data[0]);
        getDetails.get().then(doc => {
            shop =  doc.data().shopName;
            owner =  doc.data().ownerName;
            gloMobile =  doc.data().mobile;
            gloEmail =  doc.data().email;
            gst =  doc.data().gst;
            gloAddress =  doc.data().address;
            document.getElementById('spName').innerText = shop;
            document.getElementById('spOwner').innerText = owner;
            document.getElementById('spAddr').innerText = gloAddress;
            document.getElementById('spPhone').innerText = gloMobile;
            document.getElementById('spEmail').innerText = gloEmail;
            document.getElementById('spGST').innerText = gst;
            let invoiceDetails = JSON.parse(localStorage.getItem('invoice'))
            document.getElementById('cusName').innerText = invoiceDetails[0];
            document.getElementById('invoiceDate').innerText = `Invoice Date : ${invoiceDetails[1]}`
            document.getElementById('invoiceNum').innerText = `INVOICE ${invoiceDetails[8]}`;
            document.getElementById('cusAddr').innerText = invoiceDetails[3];
            document.getElementById('cusPhone').innerText = `+91${invoiceDetails[2]}`;
            document.getElementById('productName').innerText = invoiceDetails[4];
            document.getElementById('othDetails').innerText = invoiceDetails[10];
            document.getElementById('price').innerText = invoiceDetails[6];
            document.getElementById('pcs').innerText = invoiceDetails[5];
            document.getElementById('gst').innerText = `${invoiceDetails[9]}%`;
            document.getElementById('totalPrice').innerText = `${invoiceDetails[5] * invoiceDetails[6]}`;
            document.getElementById('subTotal').innerText = `${invoiceDetails[5] * invoiceDetails[6]}`;
            let gstCharge = parseInt((parseInt(invoiceDetails[9]) / 100) * (invoiceDetails[6] * invoiceDetails[5]));
            document.getElementById('nowGST').innerText = `GST ${invoiceDetails[9]}%`;
            document.getElementById('gstCharge').innerText = gstCharge;
            document.getElementById('totalAmount').innerText = (invoiceDetails[5] * invoiceDetails[6]) + gstCharge;
        }).catch(err => {
            console.log(err)
        })
    })
}

// [cusName, date, mobile, address, productName, parseInt(pcs), parseInt(price), parseInt(totalPrice), invoiceNo, gstPer, othDetails]
