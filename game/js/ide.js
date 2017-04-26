class Ide {
    constructor(){
        this.init();
    }
    init() {
        this.tabsInit();
        this.buttonsInit();
        $("#trash").droppable({
            hoverClass: "droppable-hover",
            drop: function(event, ui) {
                if(!$(ui.draggable).parent('div#actions').length
                    && !$(ui.draggable).parent('div#statements').length
                    && !$(ui.draggable).parent('div#variables').length
                    && !$(ui.draggable).parent('div').parent('div#variables').length)
                    $(ui.draggable).remove();
            }
        });
        this.loadJson();
        this.renderMenu();
        $(".action_menu").draggable({
            connectToSortable: ".sortable",
            helper: function () {
                return Tmpl.action($(this).find('.op').text(), $(this).find('.point').text(), $(this).find('.point').hasClass("pink") ? "a" : "m");
            },
            revert: "invalid",
            revertDuration: 200
        });
        $(".variable_menu").draggable({
            connectToSortable: ".cond-value",
            helper: "clone",
            revert: "invalid",
            revertDuration: 200
        });
        $('.statement_menu').draggable({
            connectToSortable: "#main",
            helper: "clone",
            revert: "invalid",
            revertDuration: 200
        });
        $('#main').sortable({
            placeholder: "sortable-placeholder",
            connectWith: ".sortable",
            stop: function (e, ui){
                if(ui.item.hasClass("statement_menu")) {
                    ui.item.replaceWith($(Tmpl.statement()).css({width: "auto", height: "auto"}));
                    $(".codainer").parent().css({width:"auto", height:"auto"});
                    $(".sign").selectmenu({
                        change: function( event, data ) {
                            var html = Tmpl.expression();
                            if(data.item.value == "&|")
                                $(this).parent().parent().html(html);
                        }
                    });
                    $(".sortable").sortable({
                        placeholder: "sortable-placeholder",
                        connectWith: ".sortable"
                    });
                    $(".cond-value").sortable({
                        placeholder: "sortable-placeholder",
                        connectWith: ".cond-value",
                        receive: function() {
                            var text = $(this).find(".chip").text();
                            if(text == "<< custom >>")
                                text = "";
                            $(this).empty();
                            $(this).append(Tmpl.variable(text));
                        },
                        over: function() {
                            $(this).children('.variable').hide();
                        },
                        out: function() {
                            $(this).children('.variable').show();
                        }
                    });
                }
            }
        });
        $("*").disableSelection();
    }
    buttonsInit(){
        $("#start").click(function () {
            var node = $("#main");
            var json = readNode(node);
            if(json == "error") {
                json = [];
                console.log("Error in the code...");
            }
            else{
                g.time = 1;
                console.log("Code saved ! Ready.");
            }
            g[g.turn] = json;
        });
        $("#save").click(function () {
            var node = $("#main");
            var json = readNode(node);
            if(json == "error") {
                json = [];
                console.log("Error in the code...");
            }
            else
                console.log("Code saved !");
            g[g.turn] = json;
        });
    }
    renderMenu(){
        for(var elem of this.actions)
            $("#actions").append(Tmpl.action_menu(elem.name, elem.p, elem.type));
        for(var list of this.variables)
            $("#variables").append(Ide.addList(list.name, list.data));
        $("#statements").append(Tmpl.statement_menu("if ( )"));
    }
    static addList(name, data){
        var main = $('<div class="var-list card-panel"></div>');
        if(name) {
            main.append('<div class="var-title">' + name + '</div>');
            name = name[0] + "_";
        }
        for(var i = 0; data[i]; i++) {
            if(name)
                context[name + data[i]] = 0;
            main.append(Tmpl.variable_menu(name + data[i]));
        }
        return main;
    }
    loadJson(){
        var json = $.getJSON("ide/functions.json").responseJSON;
        if(json) {
            this.actions = json.actions;
            this.utils = json.utils;
            this.variables = json.variables;
        }
    }
    tabsInit() {
        $("#IDEView").hide();
        // $("#game_nav, #ide_nav").click(function () {
        //     $("#game_nav, #ide_nav").removeClass("active");
        //     $(this).addClass("active");
        //     $(".tab").hide();
        //     $("#" + $(this).text() + "View").show();
        //     if($(this).text() == "IDE" && game.canvas)
        //         $("#screen").css('background-image', 'url("' + game.canvas.toDataURL() + '")');
        // });
        //$("#game_nav, #ide_nav").click(); // TO REMOVE - Set tab to IDE
    }
}

function getType(classNames) {
    for(var name of ["statement", "action"])
        if(classNames.indexOf(name) != -1)
            return name;
    return null;
}

function readNode(node) {
    var json = [];
    var nodes = node.children("div");
    for(node of nodes) {
        var type = getType(node.className);
        var n = $(node);
        if(getType(node.className) == "statement") {
            var cond = "";
            if($(n.children(".condition")[0]).children(".expression").length == 0) {
                var sign = n.find("span .ui-selectmenu-text:first").text();
                var values = n.find(".value");
                if(values.length < 2)
                    return "error"; // Not 2 value in condition
                cond = $(values[0]).val() + sign + $(values[1]).val();
            }
            else
                cond = n.find(".value").val();
            var childNode = readNode($(n.children(".codainer")[0]));
            if(childNode == "error")
                return "error";
            json.push({
                type: type,
                name: "if",
                cond: cond,
                code: childNode
            });
        }
        else if(getType(node.className) == "action") {
            var ap = 0;
            var mp = 0;
            var point = n.find('.point').text();
            if(n.find('.point').hasClass("pink"))
                ap = point;
            else
                mp = point;
            json.push({
                type: type,
                name: n.find('.op').text(),
                mp: mp,
                ap: ap
            });
        }
    }
    return json;
}