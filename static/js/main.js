// Get elements for image upload
const fakeFileInput = document.getElementById("fakeFile");
const realFileInput = document.getElementById("selectedFile");
const uploadFilePath = document.getElementById("uploadFile");

fakeFileInput.addEventListener("click", function () {
    realFileInput.click();
});

// var upload = "https://betaserver-assets.s3.amazonaws.com/media/yashshah2820/2020/9/6/Rectangle_38_ND1iG20.png";
// Image Preview upload and loader call
const wrapperLoader = document.getElementById("loader-wrapper");
realFileInput.addEventListener("change", function (e) {
    document.getElementById("file-input").classList.add("display-none");

    const files = e.target.files;
    console.log(files);
    url = "http://127.0.0.1:8000/upload-file/";
    const formData = new FormData();
    formData.append("document", files[0]);
    wrapperLoader.style.setProperty("display", "block");
    var variance=document.getElementById("variance").value;
    formData.append("variance",variance);
    fetch(url, {
            method: "POST",
            body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            addImage(data.url);
        });
    // addImage(upload);
});

// Image loader and view
const feedback = document.getElementById("feedback");

function addImage(upload) {
    const imageHolder = document.getElementById("image-preview");
    document.getElementById("image-preview").classList.remove("display-none");

    if (imageHolder.hasChildNodes()) {
        imageHolder.innerHTML = '';

        var image = document.createElement("img");
        image.setAttribute("src", upload);
        image.setAttribute("id", "banner-preview");
        image.setAttribute("width", "500");
        image.setAttribute("height", "281");
        bannerUpload = upload;

        var closeButton = document.createElement("button");
        closeButton.setAttribute("type", "button");
        closeButton.setAttribute("class", "btn");
        closeButton.innerHTML = "x";
        closeButton.setAttribute("onclick", "removeImage();");
        closeButton.onclick = function () {
            removeImage();
        }
        imageHolder.appendChild(image);
        imageHolder.appendChild(closeButton);
        imageHolder.classList.add("display-none");
    } else {
        const image = document.createElement("img");
        image.setAttribute("src", upload);
        image.setAttribute("id", "banner-preview");
        image.setAttribute("width", "500");
        image.setAttribute("height", "281");
        bannerUpload = upload;

        var closeButton = document.createElement("button");
        closeButton.setAttribute("type", "button");
        closeButton.setAttribute("class", "btn");
        closeButton.innerHTML = "x";
        closeButton.setAttribute("onclick", "removeImage();");
        closeButton.onclick = function () {
            removeImage();
        }
        imageHolder.appendChild(image);
        imageHolder.appendChild(closeButton);
        imageHolder.classList.add("display-none");
    }

    document.getElementById("banner-preview").addEventListener("load", function () {
        wrapperLoader.style.setProperty("display", "none");


        imageHolder.classList.remove("display-none");
        var feedbackSpan = document.createElement("span");
        feedbackSpan.innerText = "Image is uploaded succesfully!";
        feedback.appendChild(feedbackSpan);
    });

    setTimeout(function () {
        feedback.innerHTML = '';
    }, 5000);
}

function previewImage(upload) {
    const imageHolder = document.getElementById("image-preview");
    // imageHolder.classList.remove("display-none");

    const image = document.createElement("img");
    image.setAttribute("src", upload);
    image.setAttribute("id", "banner-preview");
    image.setAttribute("width", "500");
    image.setAttribute("height", "281");
    bannerUpload = upload;

    var closeButton = document.createElement("button");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("class", "btn");
    closeButton.innerHTML = "x";
    closeButton.setAttribute("onclick", "removeImage();");
    closeButton.onclick = function () {
        removeImage();
    }
    imageHolder.appendChild(image);
    imageHolder.appendChild(closeButton);
    // imageHolder.classList.add("display-none");

    document.getElementById("banner-preview").addEventListener("load", function () {
        imageHolder.classList.remove("display-none");
        wrapperLoader.style.setProperty("display", "none");
    });
}

function removeImage() {
    document.getElementById("image-preview").classList.add("display-none");
    document.getElementById("file-input").classList.remove("display-none");
    bannerUpload = '';
    feedback.innerHTML = '';
}