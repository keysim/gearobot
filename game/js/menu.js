class Menu {
    constructor(){
        $("#IDEView").hide();
        if(m.type != "biome" && m.type != "random")
            $("#biomeParams").hide();
        $(".button-collapse").sideNav();
        // $('.button-collapse').sideNav('show');
        $('.dropdown-button').dropdown();
        $(".type").click(function () {
            $("#typeBtn").html($(this).html());
            $('.dropdown-button').dropdown('close');
            m.type = $(this).data("type");
            menu.reload();
            if(m.type == "biome" || m.type == "random")
                $("#biomeParams").show();
            else
                $("#biomeParams").hide();
        });
        $("#debug").change(function () {
            m.debug = !m.debug;
        });
        $("#generate").click(function () {
            menu.reload();
        });
        $(document).keyup(function(e) {
            if (e.keyCode == 27)// escape
                $('.button-collapse').sideNav('show');
        });
        $("#game_nav, #ide_nav").click(function () {
            $("#game_nav, #ide_nav").removeClass("active");
            $(this).addClass("active");
            $(".tab").hide();
            $("#" + $(this).text() + "View").show();
            if($(this).text() == "IDE")
                $("#screen").css('background-image', 'url("' + game.canvas.toDataURL() + '")');
        });
        $("#toward").draggable({
            connectToSortable: "#main",
            helper: "clone",
            revert: "invalid"
        });
        $("#stab").draggable({
            connectToSortable: "#main",
            helper: "clone",
            revert: "invalid"
        });
        $("*").disableSelection();
        $("#main").sortable({
            revert: true
        });
        $("#trash").droppable({
            hoverClass: "droppable-hover",
            drop: function(event, ui) {
                if(!$(ui.draggable).parent().parent('div#sandbox').length)
                    $(ui.draggable).remove();
            }
        });
        $("#start").click(function () {
            console.log($("#main").text().replace(/\s/g,''));
        });
    }
    reload(){
        game.state.start('Boot');
        m.plants = $('input[name=nbPlants]:checked').val();
    }
    init(){
    }
    save(){
    }
}