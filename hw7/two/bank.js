// Erika Joshi - Homework 7
//      Module and closure- Bank Account
// validated with jsHint
var accountInfoList = [];

var createAccount = (function () {
    var accountName;
    var deposit;
    function setAccount() {
        accountName = document.getElementById("account").value;
        deposit = document.getElementById("deposit").value;
        return { accountName, deposit };
    }
    accountInfoList.push(setAccount());
    updateList();
});
function updateList() {
    var i;
    var res = document.getElementById("accounts").value;
    for (i = 0; i < accountInfoList.length; i++) {
        document.getElementById("accounts").innerHTML = res + "Account Name:  " + accountInfoList[i].accountName + "     Balance:   " + accountInfoList[i].deposit + '\r\n';
    }
}
window.onload = function () {
    document.getElementById('createAccount').onclick = createAccount;
};