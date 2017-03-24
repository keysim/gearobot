class Menu {
    constructor(){
        if(m.type != "biome" && m.type != "random")
            $("#biomeParams").hide();
        $(".button-collapse").sideNav();
        $('.button-collapse').sideNav('show');
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