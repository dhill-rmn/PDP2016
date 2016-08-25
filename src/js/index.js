var cats = require('./cats.js');
var react = require('react');
import $ from 'jquery';
console.log(cats);
debugger;
$('<h1>dofofgvg</h1>').appendTo('body');
 var ul = $('<ul></ul>').appendTo('body');
 for (var cat in cats) {
     $('<li></li>').text(cat).appendTo(ul);
 }
