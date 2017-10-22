var casper = require('casper').create();

casper.userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1');

casper.start('http://yandex.ru/blogs');

casper.wait(1000, function() {
   this.fill('form[action="/blogs/search"]', { text: 'парк' }, true);
});

casper.then(function() {
    this.clickLabel('За 2 недели', 'span');
    this.wait(2000, function() {
    	this.capture("src.png");
    });
});

var date = [];

function getLinks() {
    var links = document.querySelectorAll('h2 a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}

casper.then(function() {
    date = this.getElementsInfo('.organic__outside-right').map(function(info) {
        return info.text.trim();  
    });
});

var dar = [];
casper.then(function() {
	for (var i = 0; i < date.length; i++) {
		dar[i] = date[i].split(' ');
	}
	this.echo(dar.join('\n'));
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
		var a;
	for (var i = 0; i < dar.length; i++) {
		if (dar[1] = october) {
			 a = dar[1].replace(/октября/gi, 10);
		}
		else {
			console.log("lol");
		}
		// if () {

		// }
	}	
			console.log(a);
	/*
	берем date[], разделяем на числа и месяцы по пробелу >> split()
	сравниваем полученные месяцы с объявленными 12 месяцами и записываем в нужном формате >> получаем месяц
	дату сравниваем с каждым днем в месяце и записываем в нужном формате >> получаем дату
	*/
}

casper.then(function() {
	getTwoWeekDate();
});

casper.run(function() {
	casper.exit();
});
