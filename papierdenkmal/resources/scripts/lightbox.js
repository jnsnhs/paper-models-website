class LightBox {
  constructor() {
    this.createNodes();
  }

  createNodes() {
    let modalDialog = document.createElement('div');
    modalDialog.id = 'lightBoxModal';
    modalDialog.classList.add('lightBoxModal');
    let imgContainer = document.createElement('div');
    imgContainer.id = 'lightBoxImgContainer';
    imgContainer.classList.add('lightBoxImgContainer');
    let thumbnails = document.getElementsByClassName("lightbox-thumbnail");
    for (let i = 0; i < thumbnails.length; i++) {
      let lightBoxImage = document.createElement("img");
      lightBoxImage.classList.add("lightBoxImage");
      lightBoxImage.src = thumbnails[i].src;
      thumbnails[i].onclick = () => {
        lightBox.openModal(thumbnails[i]);
      };
      imgContainer.appendChild(lightBoxImage);
    }
    let controls = document.createElement('div');
    controls.id = 'lightBoxControls';
    controls.classList.add('lightBoxControls');
    let controlsBack = document.createElement('a');
    controlsBack.id = 'lightBoxControlsBack';
    controlsBack.innerHTML = '&#9664;';
    let controlsForward = document.createElement('a');
    controlsForward.id = 'lightBoxControlsForward';
    controlsForward.innerHTML = '&#9654;';
    controls.appendChild(controlsBack);
    controls.appendChild(controlsForward);
    let closeButton = document.createElement('div');
    closeButton.id = 'lightBoxCloseBtn';
    closeButton.classList.add('lightBoxCloseBtn');
    closeButton.innerHTML = '&times;';
    modalDialog.appendChild(imgContainer);
    modalDialog.appendChild(controls);
    modalDialog.appendChild(closeButton);
    document.body.appendChild(modalDialog);
    document.getElementById("lightBoxCloseBtn").onclick = () => {
      this.closeModal();
    };
  }

  openModal(thumbnailNode) {
    document.getElementById("lightBoxModal").style.display = "block";
    let lightBoxImages = document.getElementsByClassName("lightBoxImage");
    let indexToShow;
    for (let i = 0; i < lightBoxImages.length; i++) {
      if (lightBoxImages[i].src == thumbnailNode.src) {
        indexToShow = i;
        break;
      }
    }
    document.addEventListener("keydown", keyboardControls);
    this.switchToImage(indexToShow);
  }

  switchToImage(indexToShow) {
    let lightBoxImages = document.getElementsByClassName("lightBoxImage");
    if (indexToShow >= lightBoxImages.length) {
      indexToShow = 0;
    } else if (indexToShow < 0) {
      indexToShow = lightBoxImages.length - 1;
    }
    this.currentIndex = indexToShow;
    for (let i = 0; i < lightBoxImages.length; i++) {
      if (i == indexToShow) {
        lightBoxImages[i].style.display = "block";
      } else {
        lightBoxImages[i].style.display = "none";
      }
    }
    document.getElementById("lightBoxControlsBack").onclick = () => {
      this.switchToImage(this.currentIndex - 1);
    };
    document.getElementById("lightBoxControlsForward").onclick = () => {
      this.switchToImage(this.currentIndex + 1);
    };
  }

  closeModal() {
    document.getElementById("lightBoxModal").style.display = "none";
    document.removeEventListener("keydown", keyboardControls);
  }
}

function keyboardControls(e) {
  if (e.code == "Escape") {
    lightBox.closeModal();
  } else if (e.code == "ArrowRight") {
    lightBox.switchToImage(lightBox.currentIndex + 1);
  } else if (e.code == "ArrowLeft") {
    lightBox.switchToImage(lightBox.currentIndex - 1);
  }
}

let lightBox = new LightBox();
