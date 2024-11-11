const $id = e => document.getElementById(e);

const init = () => {
    

    const generateQrCodeBtn = $id("generate-qr-code");
    const downloadQrCodeBtn = $id("download-qr-code");
    const qrCodeContainer = $id("qr-code");


    function loader(status){
        const l = $id("loader");
        status 
            ? l.classList.remove("hidden")
            : l.classList.add("hidden");
    }


    function downloadQrCode () {
        const qrCodeCanvas = qrCodeContainer.querySelector("canvas");
        if(qrCodeCanvas){
            const qrCodeDataURL = qrCodeCanvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = qrCodeDataURL;
            link.download = "qr_code_coderYRJ.png";
            link.click();

        } else{
            alert("Please generate a Qr Code first");
        }
    }

    function showDownloadBtn(status) {
        if(status){
            downloadQrCodeBtn.classList.add("right-4");
            downloadQrCodeBtn.classList.remove("-right-full");
        } else{
            downloadQrCodeBtn.classList.add("-right-full");
            downloadQrCodeBtn.classList.remove("right-4");
        }
    }

    function GenerateQrCode() {
        // loader start
        loader(true);
        // hide download btn
        showDownloadBtn(false);
        
        // get the text
        const text = $id("input-text").value;

        // clear previous qr
        qrCodeContainer.innerHTML = "";

        // check if text is empty
        if(text.trim() === ""){
            alert("Please enter some text or a Url");
            return;
        }

        setTimeout(() => {
            new QRCode(
                qrCodeContainer,
                {
                    text: text,
                    width: 500,
                    height: 500
                }
            );

            // loader end
            loader(false);
            // show download btn
            showDownloadBtn(true);
        }, 2000)

    }

    // add event listener in qr code button
    generateQrCodeBtn.addEventListener("click", GenerateQrCode);
    // add event listener in download btn
    downloadQrCodeBtn.addEventListener("click", downloadQrCode);

}

document.readyState == "interactive" ? init() : document.addEventListener("DOMContentLoaded", init);