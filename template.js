module.exports = {
  render: function(v) {
const fs = require('fs');
const Handlebars = require('handlebars');

//const source = '<div>{{v.[0]}}</div>';
var source = fs.readFileSync("./template.html").toString('utf-8');
const template = Handlebars.compile(source);

const contents = template(v);

fs.writeFile('index.html', contents, err => {
    if (err) {
        return console.error(`Autsch! Failed to store template: ${err.message}.`);
    }

    console.log('Saved template!');
});
}};