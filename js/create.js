let shop;
let owner;
let gloMobile;
let gst;
let gloAddress;
let gloEmail;

function onPrice(value) {
    value = parseInt(value)
    let tprice = document.getElementById('totalPrice');
    let pcs = document.getElementById('pcs');
    pcs = pcs.value;
    pcs = parseInt(pcs);
    let e = document.getElementById("gstPer");
    let strUser = parseInt(e.options[e.selectedIndex].value);
    let price = value;
    value = pcs*((strUser / 100) * value);
    value = (pcs*price) + value
    tprice.value = value;
}

function onPieces(value) {
    value = parseInt(value)
    let tprice = document.getElementById('totalPrice');
    let price = document.getElementById('price');
    price = price.value;
    let e = document.getElementById("gstPer");
    let strUser = parseInt(e.options[e.selectedIndex].value);
    price = parseInt(price);
    let pcs = value;
    value = value*((strUser / 100) * price);
    value = (pcs*price) + value
    tprice.value = value;
}

function onGSTSelect() {
    let e = document.getElementById("gstPer");
    let strUser = parseInt(e.options[e.selectedIndex].value);
    let tprice = document.getElementById('totalPrice');
    let pcs = document.getElementById('pcs').value;
    let price = document.getElementById('price').value;
    pcs = parseInt(pcs);
    price = parseInt(price);
    let got = pcs*((strUser / 100) * price);
    let value = (pcs*price) + got
    tprice.value = value;
}

function generateUniqueFirestoreId() {
    const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for (let i = 0; i < 20; i++) {
        autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return autoId;
}

if (localStorage.getItem('login') != null) {
    document.addEventListener('DOMContentLoaded', () => {
        let data = JSON.parse(localStorage.getItem('login'));
        let db = firebase.firestore();
        let allDetails = db.collection('users').doc(data[0]);
        allDetails.get().then(doc => {
            if (doc.exists) {
                shop = doc.data().shopName;
                owner = doc.data().ownerName;
                mobile = doc.data().mobile;
                gst = doc.data().gst;
                email = doc.data().email;
                address = doc.data().address;
                document.getElementById('bName').innerText = shop;
            }
        }).catch(err => console.log('Error Detected'))
    })

    let submit = document.getElementById('billCreate');
    submit.addEventListener('click', e => {
        e.preventDefault();
        let cusName = document.getElementById('customerName').value;
        let mobile = document.getElementById('mobile').value;
        let address = document.getElementById('address').value;
        let productName = document.getElementById('productName').value;
        let pcs = document.getElementById('pcs').value;
        let price = document.getElementById('price').value;
        let invoiceNo = document.getElementById('invoiceNo').value;
        let othDetails = document.getElementById('othDetails').value;
        let totalPrice = document.getElementById('totalPrice').value;
        let d = document.getElementById("gstPer");
        let gstPer = parseInt(d.options[d.selectedIndex].value);
        let date = new Date();
        let tDate = date.getDate();
        let tMonth = date.getMonth();
        let tYear = date.getFullYear();
        if (cusName != '' && mobile != '' && address != '' && productName != '' && pcs != '' && price != '' && invoiceNo != '') {
            date = `${tDate}/${tMonth}/${tYear}`
            let sendData = {
                customer: cusName,
                date: date,
                mobile: mobile,
                address: address,
                productName: productName,
                pcs: parseInt(pcs),
                unitPrice: parseInt(price),
                totalPrice: parseInt(totalPrice),
                invoiceNo: invoiceNo,
                getPer: gstPer,
                otherDetails: othDetails,
            };
            let invoiceData = [cusName, date, mobile, address, productName, parseInt(pcs), parseInt(price), parseInt(totalPrice), invoiceNo, gstPer, othDetails]
            sessionStorage.setItem('invoice', JSON.stringify(invoiceData))
            let uniqueId = generateUniqueFirestoreId();
            let data = JSON.parse(localStorage.getItem('login'));
            let db = firebase.firestore();
            let setDoc = db.collection(data[0]).doc(uniqueId).set(sendData).then(() => {
                window.location.href = '/views/invoiceview.html'
            }).catch(err => {
                let showNoti = `<div class="toast" delay="5000" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <img src="../assets/invoice.png" width="50" height="50" class="rounded mr-2" alt="...">
                <strong class="mr-auto">KretaBillManager</strong>
                <small></small>
                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="toast-body">
                Something Went Wrong...
            </div>
        </div>`;
                document.getElementById('send').innerHTML = showNoti;
                $('.toast').toast('show');
            });
        } else {
            let showNoti = `<div class="toast my-5" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <img src="../assets/invoice.png" width="50" height="50" class="rounded mr-2" alt="...">
                <strong class="mr-auto">KretaBillManager</strong>
                <small></small>
                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="toast-body">
                Fill the fields carefully
            </div>
        </div>`;
            document.getElementById('send').innerHTML = showNoti;
            $('.toast').toast('show');
        }
    })

} else {
    window.location.href = '/';
}
