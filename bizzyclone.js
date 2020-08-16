let selected_images = document.querySelectorAll(".image");
let image_display = document.querySelector("image-display");
let grow_image = document.querySelector("grow-image");

for(let image of selected_images){
    image.onclick = expand_image;
};

function expand_image(event){
    let image = event.currentTarget;
    let source = `url('${image.getAttribute('source')}')`;
    
    console.log(image_display, image, source);

    image_display.style.display = "flex";
    grow_image.style.backgroundImage = source;
};