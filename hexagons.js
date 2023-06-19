var side_length = window.innerWidth / 33;
var root3 = 1.73205;
var height = 2 * side_length;
var width = root3 * side_length;
var border_bottom_top = side_length - (side_length / 2.0);
var border_left_right = (root3 / 2.0) * side_length;
var grid_container = document.getElementById("grid-container");
if (grid_container != null) {
    grid_container.style.gridTemplateRows = "repeat(21, minmax(" + height + "px, " + height + "px))";
    grid_container.style.gridTemplateColumns = "repeat(21, minmax(" + width + "px, " + width + "px))";
}
var row = 1;
while (row < 12) {
    var col = 1;
    while (col < 12) {
        //Create new html element
        var div_elem = document.createElement("div");
        div_elem.id = 'r' + row + 'c' + col;
        var div_elem_top = document.createElement("div");
        div_elem_top.id = 'r' + row + 'c' + col + "_top";
        var div_elem_middle = document.createElement("div");
        div_elem_middle.id = 'r' + row + 'c' + col + "_middle";
        var div_elem_bottom = document.createElement("div");
        div_elem_bottom.id = 'r' + row + 'c' + col + "_bottom";
        div_elem.appendChild(div_elem_top);
        div_elem.appendChild(div_elem_middle);
        div_elem.appendChild(div_elem_bottom);
        grid_container === null || grid_container === void 0 ? void 0 : grid_container.appendChild(div_elem);
        var sheet = window.document.styleSheets[0];
        var num = col + row;
        var right_offset = (width / 2.0) * (row - 1);
        var top_offset = -7 * (row - 1);
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
            + 'border-bottom: ' + border_bottom_top + 'px solid #6C8;'
            + 'border-left: ' + border_left_right + 'px solid transparent;'
            + 'border-right: ' + border_left_right + 'px solid transparent;'
            + '\n}';
        sheet.insertRule(style_top, sheet.cssRules.length);
        var style_middle = '#' + div_elem_middle.id +
            ' {\n'
            + 'grid-column: ' + col + ';\n'
            + 'grid-row: ' + row + ';\n'
            + 'width: ' + width + 'px;\n'
            + 'height: ' + side_length + 'px;\n'
            + 'background: #6C8;'
            + '\n}';
        sheet.insertRule(style_middle, sheet.cssRules.length);
        //Add buttons
        var b = document.createElement("button");
        div_elem_middle.appendChild(b);
        b.addEventListener("click", function () {
            alert("did something");
        });
        b.id = div_elem_middle.id + '_button';
        var button_style = '#' + b.id +
            ' {\n'
            + 'height: ' + side_length + 'px;\n'
            + 'width: ' + width + 'px;\n'
            + 'background-color: rgb(102, 204, 136);\n'
            + 'border: 0px;\n'
            + ''
            + '\n}';
        sheet.insertRule(button_style, sheet.cssRules.length);
        var style_bottom = '#' + div_elem_bottom.id +
            ' {\n'
            + 'width: 0;'
            + 'border-top: ' + border_bottom_top + 'px solid #6C8;'
            + 'border-left: ' + border_left_right + 'px solid transparent;'
            + 'border-right: ' + border_left_right + 'px solid transparent;'
            + '\n}';
        sheet.insertRule(style_bottom, sheet.cssRules.length);
        col += 1;
    }
    row += 1;
}
