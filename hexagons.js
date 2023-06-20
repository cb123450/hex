var side_length = window.innerWidth / 40;
var root3 = 1.73205;
var height = 2 * side_length;
var width = root3 * side_length;
var border_bottom_top = side_length - (side_length / 2.0);
var border_left_right = (root3 / 2.0) * side_length;
var grid_container = document.getElementById("grid-container");
if (grid_container != null) {
    grid_container.style.gridTemplateRows = "repeat(21, minmax(" + height + "px, " + height + "px))";
    grid_container.style.gridTemplateColumns = "repeat(25, minmax(" + width + "px, " + width + "px))";
}
var row = 1;
while (row < 14) {
    var col = 1;
    while (col < 14) {
        //Create new html element
        var hex_container = document.createElement("div");
        hex_container.id = 'r' + row + 'c' + col;
        grid_container === null || grid_container === void 0 ? void 0 : grid_container.appendChild(hex_container);
        var sheet = window.document.styleSheets[0];
        var num = col + row;
        var right_offset = (width / 2.0) * (row - 1);
        var top_offset = -6 * (row - 1);
        var style = '#' + hex_container.id +
            ' {\n'
            + 'position: relative;'
            //+ 'width: ' + width + ';'
            //+ 'height: ' + height + ';'
            + 'right: ' + right_offset + 'px;'
            + 'top: ' + top_offset + 'px;'
            //+ 'box-sizing: content-box;'
            //+ 'padding-right: 100%;'
            + 'grid-column: ' + num + ';\n'
            + 'grid-row: ' + row + ';\n}';
        sheet.insertRule(style, sheet.cssRules.length);
        if (row == 1 && col >= 3) {
            //TOP BORDER
            var upper_border = document.createElement("div");
            upper_border.id = 'r' + row + 'c' + col + "_upper_border";
            hex_container.appendChild(upper_border);
            console.log(upper_border.id);
            var style_upper_border = '#' + upper_border.id
                + ' {\n'
                + 'width: 0;'
                + 'position: relative;'
                + 'left: ' + -width / 2.0 + 'px;'
                + 'z-index: -1;'
                + 'top: ' + height / 1.25 + 'px;'
                + 'border-bottom: ' + side_length / 2.0 + 'px solid red;'
                + 'border-top: ' + side_length / 4.0 + 'px solid red;'
                + 'border-left: ' + width / 2.0 + 'px solid red;'
                + 'border-right: ' + width / 2.0 + 'px solid red;'
                + '\n}';
            sheet.insertRule(style_upper_border, sheet.cssRules.length);
        }
        else if (row == 13 && col >= 2 && col <= 12) {
            //BOTTOM BORDER
            var lower_border = document.createElement("div");
            lower_border.id = 'r' + row + 'c' + col + "_lower_border";
            hex_container.appendChild(lower_border);
            console.log(lower_border.id);
            var style_lower_border = '#' + lower_border.id
                + ' {\n'
                + 'width: 0;'
                + 'position: relative;'
                + 'left: ' + -width / 1.7 + 'px;'
                + 'z-index: -1;'
                + 'top: ' + -height / 9.0 + 'px;'
                + 'border-bottom: ' + side_length / 2.8 + 'px solid red;'
                + 'border-top: ' + side_length / 4.0 + 'px solid red;'
                + 'border-left: ' + width / 2.0 + 'px solid red;'
                + 'border-right: ' + width / 2.0 + 'px solid red;'
                + '\n}';
            sheet.insertRule(style_lower_border, sheet.cssRules.length);
        }
        else if (col == 1 && row >= 3) {
            //LEFT BORDER
            var left_border = document.createElement("div");
            left_border.id = 'r' + row + 'c' + col + "_left_border";
            hex_container.appendChild(left_border);
            console.log(left_border.id);
            var rotation = 6.0 / 36.0;
            var style_left_border = '#' + left_border.id
                + ' {\n'
                + 'width: 0;'
                + 'position: relative;'
                + 'left: ' + width / 7.5 + 'px;'
                + 'z-index: -1;'
                + 'top: ' + -height / 3.4 + 'px;'
                + 'border-bottom: ' + side_length / 2.8 + 'px solid blue;'
                + 'border-top: ' + side_length / 4.0 + 'px solid blue;'
                + 'border-left: ' + width / 2.0 + 'px solid blue;'
                + 'border-right: ' + width / 2.0 + 'px solid blue;'
                + 'transform: rotate(' + rotation + 'turn);'
                + '\n}';
            sheet.insertRule(style_left_border, sheet.cssRules.length);
        }
        else if (col == 13 && row <= 12) {
            //RIGHT BORDER
            var right_border = document.createElement("div");
            right_border.id = 'r' + row + 'c' + col + "_right_border";
            hex_container.appendChild(right_border);
            console.log(right_border.id);
            var rotation = 6.0 / 36.0;
            var style_right_border = '#' + right_border.id
                + ' {\n'
                + 'width: 0;'
                + 'position: relative;'
                + 'left: ' + -width / 1.4 + 'px;'
                + 'z-index: -1;'
                + 'top: ' + height / 6.5 + 'px;'
                + 'border-bottom: ' + side_length / 2.8 + 'px solid blue;'
                + 'border-top: ' + side_length / 4.0 + 'px solid blue;'
                + 'border-left: ' + width / 2.0 + 'px solid blue;'
                + 'border-right: ' + width / 2.0 + 'px solid blue;'
                + 'transform: rotate(' + rotation + 'turn);'
                + '\n}';
            sheet.insertRule(style_right_border, sheet.cssRules.length);
        }
        else if (row > 1 && row < 13 && col > 1 && col < 13) {
            //UPPER
            var upper = document.createElement("div");
            upper.id = 'r' + row + 'c' + col + "_upper";
            hex_container.appendChild(upper);
            var style_upper = '#' + upper.id +
                ' {\n'
                + 'width: 0;'
                + 'border-bottom: ' + border_bottom_top + 'px solid #6C8;'
                + 'border-left: ' + border_left_right + 'px solid transparent;'
                + 'border-right: ' + border_left_right + 'px solid transparent;'
                + '\n}';
            sheet.insertRule(style_upper, sheet.cssRules.length);
            //MIDDLE
            var middle = document.createElement("div");
            middle.id = 'r' + row + 'c' + col + "_middle";
            hex_container.appendChild(middle);
            var style_middle = '#' + middle.id +
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
            middle.appendChild(b);
            b.addEventListener("click", function () {
                alert("did something");
            });
            b.id = middle.id + '_button';
            var button_style = '#' + b.id +
                ' {\n'
                + 'height: ' + side_length + 'px;\n'
                + 'width: ' + width + 'px;\n'
                + 'background-color: rgb(102, 204, 136);\n'
                + 'border: 0px;\n'
                + ''
                + '\n}';
            sheet.insertRule(button_style, sheet.cssRules.length);
            //LOWER
            var lower = document.createElement("div");
            lower.id = 'r' + row + 'c' + col + "_lower";
            hex_container.appendChild(lower);
            var style_lower = '#' + lower.id +
                ' {\n'
                + 'width: 0;'
                + 'border-top: ' + border_bottom_top + 'px solid #6C8;'
                + 'border-left: ' + border_left_right + 'px solid transparent;'
                + 'border-right: ' + border_left_right + 'px solid transparent;'
                + '\n}';
            sheet.insertRule(style_lower, sheet.cssRules.length);
        }
        col += 1;
    }
    row += 1;
}
