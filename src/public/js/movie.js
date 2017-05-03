$(function(){

	//删除电影信息
	$('.del').click(function(e){
		var target = $(e.target)
		var id = target.data('id')
		var tr = $('.item-id-' + id)

		$.ajax({
			type: 'DELETE',
			url: '/admin/movie/list?id=' + id
		})
		.done(function(results){
			if (results.success === 1) {
				if (tr.length > 0) {
					tr.remove()
				}
			}
		})
	})


	//根据豆瓣电影ID，提取豆瓣的电影信息
	$('#douban').blur(function(){
		var douban = $(this)
		var id = douban.val()

		if(id){
			$.ajax({
				url: 'https://api.douban.com/v2/movie/subject/' + id,
				cache: true,
				type: 'get',
				dataType: 'jsonp',
				crossDomain: true,
				jsnop: 'callback',
				success: function(data){
					$('#inputTitle').val(data.title)
					$('#inputDoctor').val(data.directors[0].name)
					$('#inputCountry').val(data.countries[0])
					$('#inputLanguage').val()
					$('#inputPoster').val(data.images.medium)
					$('#inputYear').val(data.year)
					$('#inputSummary').val(data.summary)
				}
			})
		}
	})
})