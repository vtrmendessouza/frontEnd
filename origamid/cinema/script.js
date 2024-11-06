const $title = document.getElementById("titulo1");

if($title){
    $title.innerHTML = "Tela Class";
    
}
const $elements = Array.from(document.getElementsByClassName("hoje"));

if($elements.length){
    for(i = 0; i < $elements.length; i++){
        $elements[i].style.fontStyle = "italic";
    }
}
const $headingElements = Array.from(document.getElementsByTagName("h2"));

function colorChangeBlack($headingElement, index, array){
    $headingElement.style.backgroundColor = "black";
}

$headingElements.forEach(colorChangeBlack);
