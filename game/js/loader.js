class Loader {
    constructor(type) {
        this.files = ["arena", "test"];
        this.type = type;
        this.biome = [];
        for(var i = 0; i < 4; i++){ // Generate biome points
            this.biome.push({});
            this.biome[i].type = i + 2; // all tiles except tree and bush
            this.biome[i].x = Math.floor((Math.random() * 10));
            this.biome[i].y = Math.floor((Math.random() * 10));
        }
    }
    load(){
        var type = this.type;
        var biome = this.biome;
        var grid = [];
        if($.inArray(type, this.files) != -1)
            grid = this.getJson(type);
        else if(type == "random" || type == "biome"){
            map.w = 10;
            map.h = 10;
            map.it((x, y) => {
                if(grid[y] == undefined)
                    grid.push([]);
                if(type == "random")
                    grid[y].push((Math.floor(Math.random() * 20) > 1) ? game.rnd.pick([2, 3, 4]) : game.rnd.pick([5]));
                else if(type == "biome"){
                    var nearest = null;
                    var minDist = 99999999;
                    for (var z = 0; z < biome.length; z++) {
                        var dist = (Math.pow(biome[z].x - x, 2) + Math.pow(biome[z].y - y, 2)) * ((biome[z].type == 5) ? 1.9 : 1);
                        if (dist < minDist) {
                            nearest = biome[z].type;
                            minDist = dist;
                        }
                    }
                    grid[y].push(nearest);
                }
            });
        }
        this.grid = grid;
        map.it(this.initCell);
        if(type == "random" || type == "biome") {
            for (var i = 0; i < map.maxPlants; i++) { // 15 bush or tree
                var x = Math.floor((Math.random() * map.w));
                var y = Math.floor((Math.random() * map.h));
                if (grid[y][x] != 5 && grid[y][x] > 2) {
                    map.grid[y][x].under = grid[y][x];
                    map.grid[y][x].id = game.rnd.pick([0, 1]);
                    map.grid[y][x].tex = map.tex[map.grid[y][x].id];
                }
            }
        }
    }
    initCell(x, y){
        var id = map.loader.grid[y][x];
        if(map.grid[y] == undefined)
            map.grid.push([]);
        map.grid[y].push({
            tile:null,
            tex:map.tex[id],
            id:id,
            under:3 // add soil under tree by default
        });
    }
    // getBinary(){ // Now useless
    //     var binary = [];
    //     for (var y = 0; y < map.h; y++) {
    //         binary.push([]);
    //         for (var x = 0; x < map.w; x++)
    //             binary[y].push((map.grid[y][x].id < 2 || map.grid[y][x].id == 5));
    //     }
    //     return binary;
    // }
    getJson(fileName){
        var grid = null;
        var file = $.getJSON("maps/"+fileName+".json");
        if(file.responseJSON) {
            grid = file.responseJSON.map;
            map.h = grid.length;
            map.w = grid[0].length;
            if(file.responseJSON.bots){
                bot.x = file.responseJSON.bots[0].x;
                bot.y = file.responseJSON.bots[0].y;
                bot2.x = file.responseJSON.bots[1].x;
                bot2.y = file.responseJSON.bots[1].y;
            }
        }
        return grid;
    }
}