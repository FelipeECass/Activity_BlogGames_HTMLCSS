$(document).ready(function () {
    loadingGames("https://api.rawg.io/api/games?key=5376d03dfb2d489b8da9289f39a3cf4f&page=1&page_size=9",false,window.screen.width);
    loadingPublishers('https://api.rawg.io/api/publishers?key=5376d03dfb2d489b8da9289f39a3cf4f&page=1&page_size=3',false,window.screen.width);
});

var countGames = 1
$("#PlusGames").click(function(){
    countGames += 1
    let strurl = 'https://api.rawg.io/api/games?key=5376d03dfb2d489b8da9289f39a3cf4f&page=' + countGames + '&page_size=9' + "&search=" + $("#Pesquisar").val().toLowerCase();
    if ($("#Genero option:selected").text().toLowerCase() != "all") {
        strurl = 'https://api.rawg.io/api/games?key=5376d03dfb2d489b8da9289f39a3cf4f&page='+ countGames +'&page_size=9' + "&genres=" + $("#Genero option:selected").text().toLowerCase() + "&search=" + $("#Pesquisar").val().toLowerCase();
    }

    loadingGames(strurl,false,window.screen.width);
});

var countPublishers = 1
$("#PlusPublishers").click(function(){
    countPublishers += 1
    let strurl = 'https://api.rawg.io/api/publishers?key=5376d03dfb2d489b8da9289f39a3cf4f&page=' + countPublishers + '&page_size=3' + "&search=" + $("#Pesquisar").val().toLowerCase()

    loadingPublishers(strurl,false,window.screen.width);
});

$("#Genero").on('change', function () {
    let strurl = 'https://api.rawg.io/api/games?key=5376d03dfb2d489b8da9289f39a3cf4f&page=1&page_size=9' + "&search=" + $("#Pesquisar").val().toLowerCase()
    if (this.value.toLowerCase() != "all") {
        strurl = 'https://api.rawg.io/api/games?key=5376d03dfb2d489b8da9289f39a3cf4f&page=1&page_size=9' + "&genres=" + this.value.toLowerCase() + "&search=" + $("#Pesquisar").val().toLowerCase();
    }

    loadingGames(strurl,true,window.screen.width);
})

$('#Pesquisar').on('input',function(){
    let strurl = 'https://api.rawg.io/api/games?key=5376d03dfb2d489b8da9289f39a3cf4f&page=' + countGames + '&page_size=9' + "&search=" + this.value.toLowerCase()
    if ($("#Genero option:selected").text().toLowerCase() != "all") {
        strurl = 'https://api.rawg.io/api/games?key=5376d03dfb2d489b8da9289f39a3cf4f&page='+ countGames +'&page_size=9' + "&genres=" + $("#Genero option:selected").text().toLowerCase() + "&search=" + this.value.toLowerCase();
    }

    loadingGames(strurl,true,window.screen.width);
});

$(window).resize(function () {
    var width = $(window).width();
    if (width <= 768) {
        $('#Games').children().attr('class', 'col-12');
        $('#Publisher').children().attr('class', 'col-12');
    }
    else if (width > 768 & width <= 990) {
        $('#Games').children().attr('class', 'col-6');
        $('#Publisher').children().attr('class', 'col-6');
    }
    else if (width > 990) {
        $('#Games').children().attr('class', 'col-4');
        $('#Publisher').children().attr('class', 'col-4');
    }
})

function loadingPublishers(p_url,clearPublishers,w_width) {
    if (clearPublishers == true)
    {
        $("#Publisher").empty();
    }
    if (w_width <= 768) {
        w_width = 12;
    }
    else if (w_width > 768 & w_width <= 990) {
        w_width = 6;
    }
    else if (w_width > 990) {
        w_width = 4;
    }
    $.ajax({
        url: p_url
    }).done(function (response) {
        for (let i = 0; i < response.results.length; i++) {
            let publisher = response.results[i];
            let gamesToHtml = "";
            for (let j = 0; j < publisher.games.length; j++) {
                gamesToHtml += "<li>" + publisher.games[j].name + "</li>";
            }
            let str = `<div class="col-`+ w_width +`">
            <h3>${publisher.name}</h3>
            <img src="${publisher.image_background}" class="img-thumbnail">
            <p><b>Principais Jogos:</b>
                <ul>
                    `+ gamesToHtml + `
                </ul>
            </p>
            </div>`
            $("#Publisher").append(str);
        }
    });
}

function loadingGames(p_url,clearGames,w_width) {
    if (clearGames == true)
    {
        $("#Games").empty();
    }
    if (w_width <= 768) {
        w_width = 12;
    }
    else if (w_width > 768 & w_width <= 990) {
        w_width = 6;
    }
    else if (w_width > 990) {
        w_width = 4;
    }
    
    $.ajax({
        url: p_url
    }).done(function (response) {
        for (let i = 0; i < response.results.length; i++) {
            let game = response.results[i];
            let genresToHtml = "";
            for (let j = 0; j < game.genres.length; j++) {
                genresToHtml += game.genres[j].name + ", ";
            }
            genresToHtml = genresToHtml.substring(0, genresToHtml.length - 2);
            let str = `<div class="col-`+ w_width +`">
                <img src="${game.background_image}" class="img-thumbnail">
                <a href="detalhes.html?game_id=${game.id}" id="TitleGame">${game.name}</a>
                    <div>
                        <b>Nota:</b> ${game.rating}
                    </div>
                    <div>
                        <b>Gêneros:</b> ${genresToHtml}
                    </div>
                    <div>
                        <b>Data de Lançamento:</b> ${game.released}
                    </div>
                </div>`;
            $("#Games").append(str);
        }
    });
}