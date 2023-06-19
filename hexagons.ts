var grid_container = document.getElementById("grid-container");

var row : number = 0;
while (row < 11){
    var col : number = 0;
    while (col < 11){
        //Create new html element
        var div_elem : HTMLDivElement = document.createElement("div");
        div_elem.id = 'r' + row + 'c' + col;
        div_elem.innerText = div_elem.id;

        grid_container?.appendChild(div_elem)

        //Create stylesheet for new html element
        var sheet = window.document.styleSheets[0];
        var style = '#r' + row + 'c' + col + 
        ' {\n' + 'grid-column: ' + col + ';\n' + 'grid-row: ' + row + ';\n' + 'background-color: ' + 'green; \n}';
        sheet.insertRule(style, sheet.cssRules.length);

        col += 1;
    }
    row += 1;
}