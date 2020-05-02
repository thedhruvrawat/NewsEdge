
window.onload = function() {

	$('#content').text('Select a news category to see the top 20 stories');

	$('.nav-link').click(function(){

		var $newsSource = $(this).attr('id');
		var url = '//newsapi.org/v2/top-headlines?' + 'country=in&' + 'category=' + $newsSource + '&apiKey=5473beaffc154c2aa0e912b1aeaa7bf5';

		var xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function() {
			if ( this.readyState == 4 && this.status == 200 ) {
				var data = JSON.parse(xhttp.responseText).articles;
				
				console.log(data);

				var articles = data.map(mapToArticle);
				var contentDiv = document.getElementById('content');

				contentDiv.innerHTML = createTemplate(articles);
			}
		}

		xhttp.open("GET", url, true);
		xhttp.send();

		function mapToArticle(item) {
			return {
				url: item.url,
				title: item.title,
				author: item.author,
				date: item.publishedAt,
				img: item.urlToImage ? item.urlToImage : null,
				description: item.description
			};
		}

	function formatTime(timestr) {
		return timestr.substr(0, 10) + ' ' + timestr.substr(11, 5);
	}
	
		function createTemplate(articles) {
			return articles.reduce(function(tmpl, article) {
				tmpl += `
				<article class="subhead">
					<h2><a class="article-header" href="${article.url}">${article.title}</a></h2>
					<div class="row">
						<div class="col-md-4">
							<img class="img-fluid rounded mb-3" src="${article.img}"  />
						</div>
						<div class="col-md-8">
							<p class="date">${formatTime(article.date)}</p>
							<p class="author">by ${article.author}</p>
							<div>${article.description}</div>
							<a class="btn-more" href="${article.url}">read more</a>
						</div>
					</div>
				</article>		
				`;

				return tmpl;
			}, '');
		}
	});	
}
