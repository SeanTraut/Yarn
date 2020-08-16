let selected_images = document.querySelectorAll(".image");
let image_display = document.querySelector("image-display");

for(let image of selected_images){
    image.onclick = expand_image;
};

function expand_image(event){
    let image = event.currentTarget;
    let source = image.getAttribute('source');
    
    console.log(image, source);

    image_display.setAttribute("display", "flex");
};