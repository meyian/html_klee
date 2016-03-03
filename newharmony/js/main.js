/*
What do i want:

* width: 100px, height, 230+/-10;
* mobile first
* screen invisible at first, then visible

*/

(function($){
  $(function(){
    var gridHeight = 120;
    var gridWidth = 100;
    var colors = ['#7F0017', '#FF4C6D', '#FF002E', '#82221D', '#CC0005'];
    var wDev = 5, hDev = 5;

    function Grid(cellWidth, cellHeight, wDev, hDev){
      var screenWidth = $(window).width();
      var screenHeight = $(window).height();
      this.numRows = Math.ceil((screenHeight/cellHeight) * 1.5);
      this.numCols = Math.ceil((screenWidth/cellWidth) * 1.5);
      this.rowWidth = this.numCols * cellWidth;

      this.rows = [];
      for (var i=0; i<this.numRows; i++){ 
        var row = $('<div class="gridRow" row_num="'+i+'"></div>');
        row.css('height', cellHeight+getRandomRange(-hDev, hDev))
          .css('width', this.rowWidth+'px')
          .css('display', 'none');
        // $('.color-grid').append(row);
        this.rows.push(row);
      }

      for (var j=0; j<this.numCols; j++){
        var div = $('<div class="cell" col_num="'+j+'"></div>');
        var cellWidth = cellWidth+getRandomRange(-wDev, wDev);
        div.css('width', cellWidth);
        for (var i=0; i<this.numRows; i++){
          this.rows[i].append(div.clone());
          // row = $('.row[row_num="'+i+'"]');

          // row.append(div);
          // div.css('background-color', colors[getRandomRange(0, 4)]);
        }
      }
    }

    Grid.prototype.placeGrid = function(div) {
      for (var i=0; i<this.numRows; i++){
        div.append(this.rows[i]);
      }
    };

    Grid.prototype.showGrid = function(){
      $('.gridRow').css('display', 'block');
    }

    Grid.prototype.hideGrid = function(){
      $('.gridRow').css('display', 'none');
    }

    Grid.prototype.colorGrid = function(colorgridFn) {
      var grid = colorgridFn(this.numRows, this.numCols);
      for (var i=0; i<this.numRows; i++){
        for (var j=0; j<this.numCols; j++){
          var div = this.rows[i].children('[col_num="'+j+'"]');
          //console.log(grid[j][i]);
          // console.log(div);
          div.css('background-color', grid[j][i]);
        }
      }
    };

    function randomColor(numRows, numCols){
      var grid = [];
      for (var i=0; i<numCols; i++){
        grid.push([]);
        for (var j=0; j<numRows; j++){
          grid[i].push(colors[getRandomRange(0, 4)]);
        }
      }
      return grid;
    }

    function noMatchingBorders(numRows, numCols){
      var grid = [];
      var counter = 0;
      for (var i=0; i<numCols; i++){
        grid.push([]);
        for (var j=0; j<numRows; j++){
          var availableColors = colors.slice();
          var index;
          counter++;
          console.log('counter: '+counter);
          if (i>0){
            index = availableColors.indexOf(grid[i-1][j]);
            if (index >= 0){
              availableColors.splice(index, 1);
            }
          }
          if (j>0){
            index = availableColors.indexOf(grid[i][j-1]);
            if (index >= 0){
              availableColors.splice(index, 1);
            }
          }

          var currColor = availableColors[getRandomRange(0, (availableColors.length -1))];
          grid[i].push(currColor);
          var colB4 = (i > 0) ? grid[i-1][j] : 'none';
          var rowB4 = (j > 0) ? grid[i][j-1] : 'none';
          // var debugHtml = '<h2>'+counter+'</h2><p>col b4:'+colB4+', row b4:'+rowB4+', curr:'+currColor+'</p>';
          // $('.gridRow[row_num="'+j+'"]').children('.cell[col_num="'+i+'"]').html(debugHtml);
        }
      }

      return grid;
    }

    function drawGrid(){
      var grid = new Grid(gridWidth, gridHeight, wDev, hDev);
      grid.placeGrid($('.color-grid'));
      grid.colorGrid(noMatchingBorders);
      grid.showGrid();
    }

    function getRandomRange(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    drawGrid();

  });
})(jQuery);