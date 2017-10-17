var	casper = require('casper').create();

casper.userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1');

casper.start('http://yandex.ru/blogs');

// casper.then(function() {
//     this.echo(this.getCurrentUrl());
// });

casper.then(function() {
   this.fill('form[action="/blogs/search"]', { text: 'парк' }, true);
});

casper.wait(2000, function() {
    this.clickLabel('За сутки', 'span');
    this.wait(2000, function() {
        this.capture("ya3.png");
    });
});

var links = [],
    headers = [],
    descriptions = [],
    obj = [],
    date = [];

function getLinks() {
    var links = document.querySelectorAll('h2 a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}

casper.then(function() {
    headers = this.getElementsInfo('h2 a').map(function(info) {
        return info.text.trim();
    });    
    descriptions = this.getElementsInfo('.text-container').map(function(info) {
        return info.text.trim();
    });    
    links = this.evaluate(getLinks);    
});

casper.then(function() {
    date = this.getElementsInfo('.organic__outside-right').map(function(info) {
        return info.text.trim();
    });
});

function getLastdate() {
    var newDate = new Date();
    return newDate = newDate.getDate() - 1;
}

var yesterday = "вчера",
    daybeforeyesterday = "позавчера";

function getT() {
    var arr = [];
    var arrray;
    for (var i = 0; i < date.length; i++) {
        if (date[i] === yesterday) {
            var day = new Date();
            var a = getLastdate() + '/' + (day.getMonth() + 1) + '/' + day.getFullYear();
            arrray = arr.push(a);
        }
        else if (date[i] === daybeforeyesterday) {
            var b = new Date();
            var c = (b.getDate() - 2) + '/' + (b.getMonth() + 1) + '/' + b.getFullYear();
            arrray = arr.push(c);
        }
        else {
            var k = new Date();
            var f = k.getDate() + '/' + (k.getMonth() + 1) + '/' + k.getFullYear();
            arrray = arr.push(f);
        }
    }
    return arr;
}

var wasd = [];
casper.then(function() {
    wasd = getT();
});

casper.then(function() {
    for (var i = 0; i < links.length; i++) {
        obj[i] = headers[i] + '\n' + links[i] + '\n' + descriptions[i] + '\n' + wasd[i] + '\n';          
    }
});

casper.run(function() {
    this.echo(obj.join('\n')).exit();
    // this.echo(getT()).exit();
    // this.echo(date.join('\n')).exit();
    // this.echo(headers.join('\n'));
    // this.echo(' - ' + descriptions.join('\n - '));
    // this.echo(links.length + ' links found: ');
    // this.echo(' - ' + links.join('\n - ')).exit();
});