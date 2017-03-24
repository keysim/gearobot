class Menu {
    constructor(){
        //$('#myMenu').modal('show');
        $(".button-collapse").sideNav();
        $('.button-collapse').sideNav('show');
        $('.dropdown-button').dropdown();
        $(".type").click(function () {
            $("#typeBtn").html($(this).html());
            $('.dropdown-button').dropdown('close');
            m.type = $(this).data("type");
            game.state.start('Boot');
        });
        $("#debug").change(function () {
            m.debug = !m.debug;
        });
        $("#generate").click(function () {
            game.state.start('Boot');
        });
    }
    init(){
    }
    save(){
    }
}