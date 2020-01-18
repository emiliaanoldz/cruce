var counter = document.getElementById('counter');
var count = document.getElementById('count');
var contar = 0;

count.onclick = function() {
  contar += 1;
  counter.innerHTML = contar;
};
