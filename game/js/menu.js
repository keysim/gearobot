class Menu {
    constructor(){
        $('#myMenu').modal('show');
        $("#debug").change(function () {
            params.debug = !params.debug;
        });
        $('#myMenu').on('hidden.bs.modal', function () {
            $("#game").css({"margin-right":"auto"});
        });
        $("#menu").click(function () {
            $("#game").css({"margin-right":"0"});
        });
        $("#save").click(function () {
            params.mapType = $("#mapType").val();
            //game.world.removeAll();
            game.state.start('Boot');
        });
    }
    init(){
    }
    save(){
    }
}