module.exports = {
  render: function(v) {
const fs = require('fs');
const Handlebars = require('handlebars');

//const source = '<div>{{v.[0]}}</div>';
var source = require("./template-html");
const inner = Handlebars.compile(source.inner);
const outer = Handlebars.compile(source.outer, {noEscape: true});

const contents = outer(inner(v));

fs.writeFile('index.html', contents, err => {
    if (err) {
        return console.error(`Autsch! Failed to store template: ${err.message}.`);
    }

    console.log('Saved template!');
});
}};
