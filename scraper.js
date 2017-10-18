var casper = require('casper').create();

casper.userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1');

var getlinks = casper.cli.get('getlinks');

casper.start('http://yandex.ru/blogs');

casper.then(function() {
   this.fill('form[action="/blogs/search"]', { text: 'парк' }, true);
});

casper.wait(2000, function() {
    this.clickLabel('За сутки', 'span');
});

var links = [];

function getLinks() {
    var links = document.querySelectorAll('h2 a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}

casper.then(function() {
    links = this.evaluate(getLinks);
});

casper.run(function() {
    this.echo(getlinks.join('\n')).exit();
});
