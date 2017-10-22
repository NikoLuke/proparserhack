var	casper = require('casper').create();

casper.userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1');

casper.start('http://yandex.ru/blogs');

var search = casper.cli.get('search');

casper.wait(1000, function() {
	this.fill('form[action="/blogs/search"]', { text: search }, true);
});

function oneDay() {
    casper.clickLabel('За сутки', 'span');
    casper.wait(1500, function() {
        this.capture("за сутки.png");
	});
}

function twoWeek() {
	casper.clickLabel('За 2 недели', 'span');
	casper.wait(1500, function() {
		this.capture("за 2 недели.png");
	});
}

function oneMonth() {
	casper.clickLabel('За месяц', 'span');
	casper.wait(1500, function() {
		this.capture("за месяц.png");
	});	
}

var period;
casper.then(function() {
	if (casper.cli.has('period')) {
		period = casper.cli.get('period');
	}
	else {
		oneDay();
	}
});

casper.then(function() {
	if (period == 1) {
		twoWeek();
	}
	else if (period == 2) {
		oneMonth();
	}
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

function getOneDayDate() {
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
    dt = getOneDayDate();
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
        this.capture("ya4.png");
    });
});

function getTwoWeekDate() {
	var january = "января",
		february = "февраля",
		march = "марта",
		april = "апреля",
		may = "мая",
		june = "июня",
		july = "июля",
		august = "августа", 
		september = "сентября", 
		october = "октября",
		november = "ноября",
		december = "декабря";
	/*
	берем date[], разделяем на числа и месяцы по пробелу >> split()
	сравниваем полученные месяцы с объявленными 12 месяцами и записываем в нужном формате >> получаем месяц
	дату сравниваем с каждым днем в месяце и записываем в нужном формате >> получаем дату
	*/
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

casper.then(function() {
    links = this.evaluate(getLinks);
        
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
        this.capture("ya5.png");
    });
});

function getMonthDate() {
	// тот же принцип, 
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

casper.then(function() {
    links = this.evaluate(getLinks);    
    dt = getOneDayDate();
});

casper.then(function() {
    for (var i = 0; i < links.length; i++) {
        obj3[i] = headers[i] + '\n' + links[i] + '\n' + descriptions[i] + '\n' + dt[i] + '\n';          
    }
});

//варианты парсинга
function getPage2() {
    console.log(obj.length + obj2.length + ' founded: ' + '\n');
    console.log(obj.join('\n'));
    console.log(obj2.join('\n'));
}

function getPage3() {
    console.log(obj.length + obj2.length + obj3.length + ' founded: ' + '\n');
    console.log(obj.join('\n'));
    console.log(obj2.join('\n'));
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
	this.exit();
});