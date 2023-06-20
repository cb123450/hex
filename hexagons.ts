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
while (row < 14){
    var col : number = 1;
    while (col < 14){
        //Create new html element
        var hex_container : HTMLDivElement = document.createElement("div");
        hex_container.id = 'r' + row + 'c' + col;

        grid_container?.appendChild(hex_container);

        var sheet = window.document.styleSheets[0];

        var num = col + row;
        var right_offset = (width/2.0)*(row-1);
        var top_offset = -9 * (row-1);

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

        
        if (row == 1){
            var upper_border : HTMLDivElement = document.createElement("div");            
            upper_border.id = 'r' + row + 'c' + col + "_upper_border";
            hex_container.appendChild(upper_border);
            console.log(upper_border.id);

            var style_upper_border = '#' + upper_border.id
            + ' {\n' 
            + 'width: 0;'
            + 'border-top: ' +  10 + 'px solid blue;'
            + 'border-bottom: ' + 10 + 'px solid blue;'
            + 'border-left: ' + 10 + 'px solid blue;'
            + 'border-right: ' + 10 + 'px solid blue;'
             + '\n}';
            sheet.insertRule(style_upper_border, sheet.cssRules.length);
        }
        else if (row == 13){

        }
        else if (col == 1){

        }
        else if (col == 13){

        }
        else{
            //UPPER
            var upper : HTMLDivElement = document.createElement("div");
            upper.id = 'r' + row + 'c' + col + "_upper";
            hex_container.appendChild(upper);

            var style_upper = '#' + upper.id + 
            ' {\n' 
            + 'width: 0;'
            + 'border-bottom: ' + border_bottom_top+ 'px solid #6C8;'
            + 'border-left: ' + border_left_right+ 'px solid transparent;'
            + 'border-right: ' + border_left_right+ 'px solid transparent;'
            + '\n}';
            sheet.insertRule(style_upper, sheet.cssRules.length);


            //MIDDLE
            var middle : HTMLDivElement = document.createElement("div");
            middle.id = 'r' + row + 'c' + col + "_middle";
            hex_container.appendChild(middle);

            var style_middle = '#' + middle.id + 
            ' {\n' 
            + 'grid-column: ' + col + ';\n' 
            + 'grid-row: ' + row + ';\n'
            + 'width: ' + width + 'px;\n' 
            + 'height: ' + side_length + 'px;\n' 
            + 'background: #6C8;'
            +'\n}';
            sheet.insertRule(style_middle, sheet.cssRules.length);

            //Add buttons
            var b = document.createElement("button");        
            middle.appendChild(b);
            b.addEventListener("click", function(){
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
            +'\n}';

            sheet.insertRule(button_style, sheet.cssRules.length);

            //LOWER
            var lower : HTMLDivElement = document.createElement("div");
            lower.id = 'r' + row + 'c' + col + "_lower";    
            hex_container.appendChild(lower);

            var style_lower = '#' + lower.id + 
            ' {\n' 
            + 'width: 0;'
            + 'border-top: ' + border_bottom_top+ 'px solid #6C8;'
            + 'border-left: ' + border_left_right+ 'px solid transparent;'
            + 'border-right: ' + border_left_right+ 'px solid transparent;'
            + '\n}';
            sheet.insertRule(style_lower, sheet.cssRules.length);
        }
        
        col += 1;
    }
    row += 1;
}