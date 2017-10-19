var	casper = require('casper').create();

casper.userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1');

casper.start('http://yandex.ru/blogs');

casper.then(function() {
   this.fill('form[action="/blogs/search"]', { text: 'парк' }, true);
});

casper.wait(1000, function() {
    this.clickLabel('За сутки', 'span');
    this.wait(1500, function() {
        this.capture("ya1.png");
    });
});

var links = [],
    headers = [],
    descriptions = [],
    date = [],
    obj = [],
    obj2 = [],
    obj3 = [];

function getLinks() {
    var links = document.querySelectorAll('h2 a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}

function getD() {
    var yesterday = "вчера",
        daybeforeyesterday = "позавчера";
    var arr = [];
    var array;
    var day = new Date();
    for (var i = 0; i < date.length; i++) {
        if (date[i] === yesterday) {
            var a = (day.getDate() - 1) + '/' + (day.getMonth() + 1) + '/' + day.getFullYear();
            array = arr.push(a);
        }
        else if (date[i] === daybeforeyesterday) {
            var b = (day.getDate() - 2) + '/' + (day.getMonth() + 1) + '/' + day.getFullYear();
            array = arr.push(b);
        }
        else {
            var c = day.getDate() + '/' + (day.getMonth() + 1) + '/' + day.getFullYear();
            array = arr.push(c);
        }
    }
    return arr;
}

casper.then(function() {
    headers = this.getElementsInfo('h2 a').map(function(info) {
        return info.text.trim();
    });

    descriptions = this.getElementsInfo('.text-container').map(function(info) {
        return info.text.trim();
    });

    date = this.getElementsInfo('.organic__outside-right').map(function(info) {
        return info.text.trim();  
    });
});

var dt = [];
casper.then(function() {
    links = this.evaluate(getLinks);    
    dt = getD();
});

casper.then(function() {
    for (var i = 0; i < links.length; i++) {
        obj[i] = headers[i] + '\n' + links[i] + '\n' + descriptions[i] + '\n' + dt[i] + '\n';          
    }
});

//2 страница
casper.then(function() {
    this.clickLabel('2', 'a');
    this.wait(1000, function() {
        this.capture("ya2.png");
    });
});

casper.then(function() {
    headers = this.getElementsInfo('h2 a').map(function(info) {
        return info.text.trim();
    });

    descriptions = this.getElementsInfo('.text-container').map(function(info) {
        return info.text.trim();
    });

    date = this.getElementsInfo('.organic__outside-right').map(function(info) {
        return info.text.trim();  
    });
});

casper.then(function() {
    links = this.evaluate(getLinks);    
    dt = getD();
});

casper.then(function() {
    for (var i = 0; i < links.length; i++) {
        obj2[i] = headers[i] + '\n' + links[i] + '\n' + descriptions[i] + '\n' + dt[i] + '\n';          
    }
});

//3 страница
casper.then(function() {
    this.clickLabel('3', 'a');
    this.wait(1000, function() {
        this.capture("ya3.png");
    });
});

casper.then(function() {
    headers = this.getElementsInfo('h2 a').map(function(info) {
        return info.text.trim();
    });

    descriptions = this.getElementsInfo('.text-container').map(function(info) {
        return info.text.trim();
    });

    date = this.getElementsInfo('.organic__outside-right').map(function(info) {
        return info.text.trim();  
    });
});

casper.then(function() {
    links = this.evaluate(getLinks);    
    dt = getD();
});

casper.then(function() {
    for (var i = 0; i < links.length; i++) {
        obj3[i] = headers[i] + '\n' + links[i] + '\n' + descriptions[i] + '\n' + dt[i] + '\n';          
    }
});

//варианты парсинга
function getPage2() {
    console.log(obj.length + ' founded: ' + '\n');
    console.log(obj.join('\n'));
    console.log(obj2.length + ' founded: ' + '\n');
    console.log(obj2.join('\n'));
}

function getPage3() {
    console.log(obj.length + ' founded: ' + '\n');
    console.log(obj.join('\n'));
    console.log(obj2.length + ' founded: ' + '\n');
    console.log(obj2.join('\n'));
    console.log(obj3.length + ' founded: ' + '\n');
    console.log(obj3.join('\n'));
}

var page;
casper.then(function() {   
    if (casper.cli.has('page')) {
        page = casper.cli.get('page');
    }
    else {
        casper.echo(obj.length + ' founded: ' + '\n');
        casper.echo(obj.join('\n')).exit();
    } 
});

casper.then(function() {
    if (page == 1) {
        getPage2();
    } else if (page == 2) {
        getPage3();
    }
});

casper.run(function() {
    // this.echo(obj.length + ' founded: ' + '\n');
    // this.echo(obj.join('\n')).exit();
    // this.echo(obj2.length + ' founded: ' + '\n');
    // this.echo(obj2.join('\n')).exit();
    // this.echo(obj3.length + ' founded: ' + '\n');
    // this.echo(obj3.join('\n')).exit();
});