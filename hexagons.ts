var side_length = window.innerWidth/33;
var root3 = 1.73205;
var height = 2*side_length;
var width = root3*side_length;
var border_bottom_top = side_length - (side_length/2.0);
var border_left_right = (root3/2.0)*side_length;

var grid_container = document.getElementById("grid-container");
if (grid_container != null){
    grid_container.style.gridTemplateRows = "repeat(21, minmax(" + height + "px, " + height + "px))";
    grid_container.style.gridTemplateColumns = "repeat(21, minmax(" + width + "px, " + width + "px))";
}

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
        var right_offset = (width/2.0)*(row-1);
        var top_offset = -7 * (row-1);

        var style = '#' + div_elem.id + 
        ' {\n' 
        + 'position: relative;'
        + 'right: ' + right_offset + 'px;'
        + 'top: ' + top_offset + 'px;'
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
        + 'height: ' + side_length + 'px;\n' 
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