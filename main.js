let isLoading = false;

$(document).ready(function(){
    let nextPage;
    let timeOut;

    $("#keyword").on('input', (e) => {
        e.preventDefault();

        $("#loading").css("opacity", "1");

        clearTimeout(timeOut);
        timeOut = setTimeout(async () => {
            let keyword = $("#keyword").val();
            let searchResult = await search(keyword, nextPage);
            nextPage = searchResult.nextPageToken ? searchResult.nextPageToken : null;
            $("#result-list").empty();
            processResult(searchResult);
        }, 1000);
    });

    $(window).on("scroll", function(){
        if($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
            if(nextPage && !isLoading) {
                isLoading = true;

                $("#loading").css("opacity", "1");

                clearTimeout(timeOut);
                timeOut = setTimeout(async () => {
                    let keyword = $("#keyword").val();
                    let searchResult = await search(keyword, nextPage);
                    nextPage = searchResult.nextPageToken ? searchResult.nextPageToken : null;
                    processResult(searchResult);
                }, 1000);
            } else if(!isLoading && !nextPage) $("#result-list").append("<h2>Nothing more to show!</h2>");
        }
    });
});

function search(keyword, nextPage) {
    return $.ajax({
        url: `https://www.googleapis.com/youtube/v3/search?pageToken=${nextPage ? nextPage : ''}&type=video&part=snippet&maxResults=25&q=${keyword}&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
        type: 'GET'
    });
}

function processResult(results) {

    listHTML = results.items.map(item => {
        return `<a class="result col-md-12" href="https://www.youtube.com/watch?v=${item.id.videoId}?autoplay=true" target="_blank">
            <img src="${item.snippet.thumbnails.high.url}" alt="">
            <div class="video_info">
                <h2 class="title">${item.snippet.title}</h2>
                <p class="description">${item.snippet.description}</p>
                <span>View >></span>
            </div>
        </a>`;
    });

    $("#result-list").append(listHTML.join(""));

    $("#loading").css("opacity", "0");
    isLoading = false;
}