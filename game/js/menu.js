class Menu {
    constructor(){
        //$(".debug").hide();
        Menu.init();
        setInterval(Menu.timer, 1000);
    }
    static reload(){
        game.state.start('Boot');
        m.plants = $('input[name=nbPlants]:checked').val();
    }
    static init(){
        $(".time").text(m.time).hide();
        if(m.type != "biome" && m.type != "random")
            $("#biomeParams").hide();
        $(".button-collapse").sideNav();
        $('.dropdown-button').dropdown();
        $(".type").click(function () {
            $("#typeBtn").html($(this).html());
            $('.dropdown-button').dropdown('close');
            m.type = $(this).data("type");
            if(m.type == "biome" || m.type == "random")
                $("#biomeParams").show();
            else
                $("#biomeParams").hide();
        });
        $("#debug").change(function () {
            m.debug = !m.debug;
        });
        $("#generate").click(function () {
            Menu.reload();
        });
        $("#play").click(function () {
            Menu.openIDE();
            setTimeout(function () {
                if (confirm("Are you ready ? Player 1 turn (" + m.time + "s)")) {
                    g.time = m.time;
                    g.started = false;
                    g.turn = "player1";
                    console.log("let's PLAYYYYYY");
                }
                else {
                    Menu.openGAME();
                    g.time = 0;
                }
            },500);
        });
        $(document).keyup(function(e) {
            if (e.keyCode == 27)// escape
                $('.button-collapse').sideNav('show');
        });
        setTimeout(function(){$('.button-collapse').sideNav('show');}, 500);
    }
    save(){
    }
    static openIDE(){
        $(".time").show();
        $("#game_nav").removeClass("active");
        $("#ide_nav").addClass("active");
        $('.button-collapse').sideNav('hide');
        if(game.canvas)
            $("#screen").css('background-image', 'url("' + game.canvas.toDataURL() + '")');
        $("#IDEView").show();
        $("#GameView").hide();
    }
    static openGAME(){
        $(".time").hide();
        $("#ide_nav").removeClass("active");
        $("#game_nav").addClass("active");
        //$('.button-collapse').sideNav('show');
        $("#IDEView").hide();
        $("#GameView").show();
    }
    static timer() {
        if(g.time > 0) {
            g.time--;
            $(".time").text(g.time);
            if(g.time <= 0){
                $("#main").empty();
                if(g.turn == "player2"){
                    g.turn = "player1";
                    g.started = true;
                    Menu.openGAME();
                }
                else {
                    setTimeout(function () {
                        if (confirm("Are you ready ? Player 2 turn (" + m.time + "s)")) {
                            g.time = m.time;
                            g.turn = "player2";
                            console.log("let's PLAYYYYYY");
                        }
                        else{
                            Menu.openGAME();
                        }
                    }, 500);
                }
            }
        }
    }
}