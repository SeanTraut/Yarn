let thumbnails = document.querySelectorAll(".image");

for(let thumbnail of thumbnails){
    thumbnail.onclick = toggle_thumbnail;
};

function toggle_thumbnail(event){
    let thumbnail = event.currentTarget;
    console.log(thumbnail, "called");
    thumbnail.classList.toggle("expand-example");
};