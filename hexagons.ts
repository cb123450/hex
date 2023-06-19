var side_length = 10;
var root3 = 1.73205;
var height = 5*2;
var width = root3*side_length;
var border_bottom_top = side_length - (side_length/2.0);
var border_left_right = (root3/2.0)*side_length;

var grid_container = document.getElementById("grid-container");

var row : number = 1;
while (row < 12){
    var col : number = 1;
    while (col < 12){
        //Create new html element
        var div_elem : HTMLDivElement = document.createElement("div");
        div_elem.id = 'r' + row + 'c' + col;

        var div_elem_top : HTMLDivElement = document.createElement("div");
        div_elem_top.id = 'r' + row + 'c' + col + "_top";

        var div_elem_middle : HTMLDivElement = document.createElement("div");
        div_elem_middle.id = 'r' + row + 'c' + col + "_middle";

        var div_elem_bottom : HTMLDivElement = document.createElement("div");
        div_elem_bottom.id = 'r' + row + 'c' + col + "_bottom";

        div_elem.appendChild(div_elem_top);
        div_elem.appendChild(div_elem_middle);
        div_elem.appendChild(div_elem_bottom);

        grid_container?.appendChild(div_elem);

        var sheet = window.document.styleSheets[0];

        var num = col + row;
        var style = '#' + div_elem.id + 
        ' {\n' 
        + 'grid-column: ' + num + ';\n' 
        + 'grid-row: ' + row + ';\n}';
        sheet.insertRule(style, sheet.cssRules.length);

        var style_top = '#' + div_elem_top.id + 
        ' {\n' 
        + 'width: 0;'
        + 'border-bottom: ' + border_bottom_top+ 'px solid #6C8;'
        + 'border-left: ' + border_left_right+ 'px solid transparent;'
        + 'border-right: ' + border_left_right+ 'px solid transparent;'
        + '\n}';
        sheet.insertRule(style_top, sheet.cssRules.length);

        var style_middle = '#' + div_elem_middle.id + 
        ' {\n' 
        + 'grid-column: ' + col + ';\n' 
        + 'grid-row: ' + row + ';\n'
        + 'width: ' + width + 'px;\n' 
        + 'height: ' + height + 'px;\n' 
        + 'background: #6C8;'
        +'\n}';
        sheet.insertRule(style_middle, sheet.cssRules.length);

        var style_bottom = '#' + div_elem_bottom.id + 
        ' {\n' 
        + 'width: 0;'
        + 'border-top: ' + border_bottom_top+ 'px solid #6C8;'
        + 'border-left: ' + border_left_right+ 'px solid transparent;'
        + 'border-right: ' + border_left_right+ 'px solid transparent;'
        + '\n}';
        sheet.insertRule(style_bottom, sheet.cssRules.length);
        
        col += 1;
    }
    row += 1;
}