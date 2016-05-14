var waterfall = new Waterfall({
  containerSelector: '.waterfall',
  boxSelector: '.waterfallBox',
  column: 4
});

buttonEvent();
displayImage();
loadMore();


// add button event
function buttonEvent() {
  var header = document.getElementsByTagName('header')[0];
  header.addEventListener('click', function(event) {
    switch (event.target.id) {
      case 'addColumn':
        waterfall.column++;
        waterfall.compose(true);
        break;
      case 'delColumn':
        if (waterfall.column > 0){
          waterfall.column--;
          waterfall.compose(true);
        }
        break;
      case 'addBox':
        waterfall.addBox(newNode()());
        waterfall.boxes.push(newNode()())
        break;
    }
  }, false)
}

// add scroll event
function loadMore() {
  window.onscroll = function() {
    var screenHeight = (document.documentElement.scrollTop || document.body.scrollTop) +(document.documentElement.clientHeight || document.body.clientHeight);
    var container = waterfall.columns[waterfall.getMinHeightIndex()];
    var containerHeight = container.offsetTop  + container.offsetHeight;
    if (containerHeight < screenHeight) {
      waterfall.addBox(newNode()());
      waterfall.boxes.push(newNode()())
    }
  }
}

// add click event and display the images
function displayImage() {
  document.querySelector('.waterfall').addEventListener('click', function(event) {
    if (event.target.tagName === 'IMG') {
      var display = document.querySelector('.display');
      var img = display.querySelector('img');
      img.setAttribute('src', event.target.getAttribute('src'));
      display.className = 'display';
      display.addEventListener('click', function() {
        display.className = 'display hidden';
      })
    }
  }, false)
}

// add new node
function newNode() {
  var size = ['660x250', '300x400', '350x500', '200x320', '300x300'];
  var color = [ 'E97452', '4C6EB4', '449F93', 'D25064', 'E59649' ];
  var i = parseInt(Math.random() * 5);

  return function() {

    var box = document.createElement('div');
    box.className = 'waterfallBox';
    var image = document.createElement('img');
    image.src = "http://placehold.it/" + size[i] + '/' + color[i] + '/fff';
    box.appendChild(image);
    var content = document.createElement('div');
    content.className = 'content';
    var title = document.createElement('h3');
    title.appendChild(document.createTextNode('Heading'));
    content.appendChild(title);
    var p = document.createElement('p');
    p.appendChild(document.createTextNode('Content'));
    content.appendChild(p);
    box.appendChild(content);

    return box;
  };
}
