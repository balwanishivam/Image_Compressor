// Get elements for banner image upload
const fakeFileInput = document.getElementById("fakeFile");
const realFileInput = document.getElementById("selectedFile");
const uploadFilePath = document.getElementById("uploadFile");

fakeFileInput.addEventListener("click", function () {
    realFileInput.click();
});

// description image upload
document.getElementById("duplicate").addEventListener("click", function () {
    document.getElementById("selectedImage").click();
});



// var upload = "https://betaserver-assets.s3.amazonaws.com/media/yashshah2820/2020/9/6/Rectangle_38_ND1iG20.png";
const descriptionLoader = document.getElementById("description-loader");
document.getElementById("selectedImage").addEventListener("change", function (e) {
    const files = e.target.files;
    url = "https://staging-beta-api.hapramp.com/files/";
    const formData = new FormData();
    formData.append("upload", files[0]);
    formData.append("is_temporary", false);

    descriptionLoader.style.setProperty("display", "block");

    fetch(url, {
            method: "POST",

            body: formData,

            headers: {
                Authorization: "Basic eWFzaHNoYWgyODIwOk5zQVRhakwyQXhKRmhoaQ==",
            },
        })
        .then((response) => response.json())

        .then((data) => {
            viewImageURL(data.upload);
        });
    // viewImageURL(upload);
});

const divImage = document.getElementById("view-url");

function viewImageURL(upload) {
    descriptionLoader.style.setProperty("display", "none");
    if (divImage.hasChildNodes()) {
        divImage.innerHTML = '';
        var imageOutput = document.createElement("input");
        imageOutput.setAttribute("id", "urlInput");
        imageOutput.value = upload;

        var copyButton = document.createElement("button");
        copyButton.setAttribute("type", "button");
        copyButton.innerText = "Copy URL";
        copyButton.setAttribute("onclick", "copyText();");
        copyButton.onclick = function () {
            copyText();
        }
    } else {
        var imageOutput = document.createElement("input");
        imageOutput.setAttribute("id", "urlInput");
        imageOutput.value = upload;

        var copyButton = document.createElement("button");
        copyButton.setAttribute("type", "button");
        copyButton.innerText = "Copy URL";
        copyButton.setAttribute("onclick", "copyText();");
        copyButton.onclick = function () {
            copyText();
        }
    }

    divImage.appendChild(imageOutput);
    divImage.appendChild(copyButton);
}

function copyText() {
    var input = document.getElementById("urlInput");
    input.select();
    document.execCommand("copy");
    alert("URL is copied!")
}

// Banner Image Preview upload and loader call
const wrapperLoader = document.getElementById("loader-wrapper");
realFileInput.addEventListener("change", function (e) {
    document.getElementById("file-input").classList.add("display-none");

    const files = e.target.files;
    url = "https://staging-beta-api.hapramp.com/files/";
    const formData = new FormData();
    formData.append("upload", files[0]);
    formData.append("is_temporary", false);
    wrapperLoader.style.setProperty("display", "table-cell");

    fetch(url, {
            method: "POST",

            body: formData,

            headers: {
                Authorization: "Basic eWFzaHNoYWgyODIwOk5zQVRhakwyQXhKRmhoaQ==",
            },
        })
        .then((response) => response.json())

        .then((data) => {
            addImage(data.upload);
        });
    // addImage(upload);
});

// Banner Image loader and view
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