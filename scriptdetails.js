const urlParam = new URLSearchParams(window.location.search);

$.ajax({
    url: "https://api.rawg.io/api/games/" + urlParam.get("game_id") + "?key=5376d03dfb2d489b8da9289f39a3cf4f&"
}).done(function (response) {
    let genresToHtml = "";
    let platToHtml = "";
    let devToHtml = "";
    let publishToHtml = "";
    let tagsToHtml = "";
    let metaToHtml = "";
    for (let i = 0; i < response.genres.length; i++) {
        genresToHtml += response.genres[i].name + ", ";
    }
    for (let i = 0; i < response.platforms.length; i++) {
        platToHtml += response.platforms[i].platform.name + ", ";
    }
    for (let i = 0; i < response.developers.length; i++) {
        devToHtml += response.developers[i].name + ", ";
    }
    for (let i = 0; i < response.publishers.length; i++) {
        publishToHtml += response.publishers[i].name + ", ";
    }
    for (let i = 0; i < response.tags.length; i++) {
        tagsToHtml += response.tags[i].name + ", ";
    }
    if(response.metacritic >= 80)
    {
        metaToHtml= `<div style="color:green;"><p><b style="color:black;">Metascore:</b> ${response.metacritic}</div></p>`
    }
    else if(response.metacritic >= 50 & response.metacritic < 80)
    {
        metaToHtml= `<div style="color:yellow;"><p><b style="color:black;">Metascore:</b> ${response.metacritic}</div></p>`
    }
    else
    {
        metaToHtml= `<div style="color:red;"><p><b style="color:black;">Metascore:</b> ${response.metacritic}</div></p>`
    }
    genresToHtml = genresToHtml.substring(0, genresToHtml.length - 2);
    platToHtml = platToHtml.substring(0, platToHtml.length - 2);
    devToHtml = devToHtml.substring(0, devToHtml.length - 2);
    publishToHtml = publishToHtml.substring(0, publishToHtml.length - 2);
    tagsToHtml = tagsToHtml.substring(0, tagsToHtml.length - 2);
    let str = `<h1>${response.name_original}</h1>
        <img class="rounded mx-auto d-block" src="${response.background_image_additional}" alt="..">
        <h4 style="margin-top:1%">About:</h4>
        <p>${response.description}</p>
        <div class="row">
            <div class="col-6">
                <p><b>Plataformas:</b> `+ platToHtml +`</p>
                <p><b>Gênero:</b> `+ genresToHtml +`</p>
                <p><b>Developer: </b> `+ devToHtml +`</p>
            </div>
            <div class="col-6">
                `+ metaToHtml +`
                <p><b>Data de Lançamento:</b> ${response.released}</p>
                <p><b>Publisher:</b> `+ publishToHtml +`</p>
            </div>
        </div>
        <p><b>Tags: </b><u>`+ tagsToHtml +`</u></p>`;
    $("#Desc").append(str);
});