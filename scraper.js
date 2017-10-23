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

casper.then(function() {
    date = this.getElementsInfo('.organic__outside-right').map(function(info) {
        return info.text.trim();  
    });
});

// casper.then(function() {
// 	this.echo(date.join('\n'));

// 	var dd = [],
// 		mm = [];
// 	for (var i = 0; i < date.length; i++) {
// 	mm[i] = /[а-я]+/.exec(date[i]);
// 	dd[i] = /\d+/.exec(date[i]);	
// 	}
// 	console.log(mm);
// 	console.log(dd);

// 	var sadf = [];
// 	for (var i = 0; i < date.length; i++) {
// 		if (mm[i] == "октября") {
// 			sadf[i] = 10; 
// 		}
// 		else {
// 			sadf[i] = 0;
// 		}
// 	}
// 	console.log(sadf);
// });

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

	var yesterday = "вчера",
        daybeforeyesterday = "позавчера";		

	var dd = [],
		mm = [];
	for (var i = 0; i < date.length; i++) {
		dd[i] = /\d+/.exec(date[i]);	
		mm[i] = /[а-я]+/.exec(date[i]);
	}
	console.log(mm);
	console.log(dd);

	var arr = [];
    var array;
    var day = new Date();
	for (var i = 0; i < mm.length; i++) {
		if (mm[i] == january) {
			arr[i] = dd[i] + '/' + 1 + '/' + day.getFullYear();
		}
		else if (mm[i] == february) {
			arr[i] = dd[i] + '/' + 2 + '/' + day.getFullYear();
		}
		else if (mm[i] == march) {
			arr[i] = dd[i] + '/' + 3 + '/' + day.getFullYear();
		}
		else if (mm[i] == april) {
			arr[i] = dd[i] + '/' + 4 + '/' + day.getFullYear();
		}
		else if (mm[i] == may) {
			arr[i] = dd[i] + '/' + 5 + '/' + day.getFullYear();
		}
		else if (mm[i] == june) {
			arr[i] = dd[i] + '/' + 6 + '/' + day.getFullYear();
		}
		else if (mm[i] == july) {
			arr[i] = dd[i] + '/' + 7 + '/' + day.getFullYear();
		}
		else if (mm[i] == august) {
			arr[i] = dd[i] + '/' + 8 + '/' + day.getFullYear();
		}
		else if (mm[i] == september) {
			arr[i] = dd[i] + '/' + 9 + '/' + day.getFullYear();
		}
		else if (mm[i] == october) {
			arr[i] = dd[i] + '/' + 10 + '/' + day.getFullYear();
		}
		else if (mm[i] == november) {
			arr[i] = dd[i] + '/' + 11 + '/' + day.getFullYear();
		}
		else if (mm[i] == december) {
			arr[i] = dd[i] + '/' + 12 + '/' + day.getFullYear();
		}
		else if (mm[i] == yesterday) {
			var a = (day.getDate() - 1) + '/' + (day.getMonth() + 1) + '/' + day.getFullYear();
            array = arr.push(a);
		}
		else if (mm[i] == daybeforeyesterday) {
			var b = (day.getDate() - 2) + '/' + (day.getMonth() + 1) + '/' + day.getFullYear();
            array = arr.push(b);
		}
		else {
            var c = day.getDate() + '/' + (day.getMonth() + 1) + '/' + day.getFullYear();
            array = arr.push(c);
        }
	}
	console.log(arr);	
}

casper.then(function() {
	getTwoWeekDate();
});

casper.run(function() {
	casper.exit();
});
