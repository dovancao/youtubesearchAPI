$( document ).ready(function(){
$("#search").submit(function(e){
    e.preventDefault();
    $("#result-list").empty();
    let searchTerm = $('#keyword').val();
    if(!searchTerm){
        $("#loader").hide();
        return;
    }

    let url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=" +searchTerm+"&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw";
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function(data, status, jqXHR){
            console.log(data);
            $("#result-list").html();
            let items = data.items;
            if(items.length){
                $(items).each(function(index,item){
    
                    $("#result-list").append(
                        $('<a/>')
                            .addClass('result col-md-12').attr('href',`https://youtube.com/watch?v=${item.id.videoId}?autoplay=true`).attr('target','_blank')
                            .append(`<img src="${item.snippet.thumbnails.medium.url}" height="${item.snippet.thumbnails.medium.height}" width="${item.snippet.thumbnails.medium.width}">`)
                            .append($('<div/>'))
                                .addClass('video_info')
                                .append(`<h2 class='title'>${item.snippet.title}</h2>`,`<p class="description">${item.snippet.description}</p>`,`<span>View>></span>`)
                        )
                })
            }
                
        },
        error: function(response){
            console.log("Error",response);
        }
    })
})
});

console.log($("#search"))