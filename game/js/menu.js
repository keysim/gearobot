class Menu {
    constructor(){
        $('#myMenu').modal('show');
    }
    init(){
        $("#debug").change(function () {
            console.log("test");
        });
        $('#myMenu').on('hidden.bs.modal', function () {
            $("#game").css({"margin-right":"auto"});
        });
        $("#menu").click(function () {
            $("#game").css({"margin-right":"0"});
        });
        $("#save").click(function () {
            //game.world.removeAll();
            game.state.start('Boot');
        });
    }
    save(){

    }
}