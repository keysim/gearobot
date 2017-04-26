class Menu {
    constructor(){
        //$(".debug").hide();
        $('.modal').modal({
                ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                },
                complete: function() {// Callback for Modal close
                    g.time = m.time;
                    g.codeTime = true;
                    console.log("Let's code " + g.turn + " !");
                }
            }
        );
        $(".button-collapse").sideNav();
        $('.dropdown-button').dropdown();
        Menu.init();
        setInterval(Menu.timer, 1000);
    }
    static reload(){
        game.state.start('Boot');
        m.plants = $('input[name=nbPlants]:checked').val();
        m.time = $('input[name=nbTime]:checked').val();
    }
    static init(){
        $(".time").text(m.time + " seconds").hide();
        if(m.type != "biome" && m.type != "random")
            $("#biomeParams").hide();
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
            m.plants = $('input[name=nbPlants]:checked').val();
            m.time = $('input[name=nbTime]:checked').val();
            $("#playText").text("Continue");
            g.codeTime = false;
            g.started = false;
            g.time = m.time;
            $(".time").text(m.time + " seconds");
            $(".player").removeClass("player2").addClass("player1").text("Player 1");
            Menu.openIDE();
            $('#turnModal').modal('open');
        });
        $('#quit').click(function() {
            location.reload();
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
        if(g.time > 0 && g.codeTime) {
            g.time--;
            $(".time").text(g.time + " seconds");
            if(g.time <= 0){
                $("#main").empty();
                if(g.turn == "player2"){
                    g.turn = "player1";
                    g.codeTime = false;
                    g.started = true;
                    Menu.openGAME();
                }
                else {
                    $(".player").removeClass("player1").addClass("player2").text("Player 2");
                    g.codeTime = false;
                    g.time = m.time;
                    $(".time").text(m.time + " seconds");
                    g.turn = "player2";
                    $('#turnModal').modal('open');
                }
            }
        }
    }
}