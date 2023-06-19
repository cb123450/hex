var side_length = 10;
var root3 = 1.73205;
var height = 5 * 2;
var width = root3 * side_length;
var border_bottom_top = side_length - (side_length / 2.0);
var border_left_right = (root3 / 2.0) * side_length;
var grid_container = document.getElementById("grid-container");
var row = 0;
while (row < 11) {
    var col = 0;
    while (col < 11) {
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
        var style = '#' + div_elem.id +
            ' {\n'
            + 'grid-column: ' + col + ';\n'
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
            + 'height: ' + height + 'px;\n'
            + 'background: #6C8;'
            + '\n}';
        sheet.insertRule(style_middle, sheet.cssRules.length);
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
