class Item {
    static createItem(mapa, $tabuleiro) {
        const itens = [];
        mapa.forEach((linha, idxLinha) => {
            linha.forEach((tile, idxtile) => {
                if (tile == "g") {
                    const $gas = $("<div>", { class: "gas" })
                    const $sprite = $("<div>", { class: "sprite" });
                    $gas.append($sprite);
                    $tabuleiro.append($gas);
                    if(!itens[idxLinha])itens[idxLinha] = [];
                    itens[idxLinha][idxtile] = $gas;
                    $gas.css("top", idxLinha * 42);
                    $gas.css("left", idxtile * 42);
                }
                if (tile == "f") {
                    const $foguete = $("<div>", { class: "foguete" })
                    const $sprite = $("<div>", { class: "sprite" });
                    $foguete.append($sprite);
                    $tabuleiro.append($foguete);
                    if(!itens[idxLinha])itens[idxLinha] = [];
                    itens[idxLinha][idxtile] = $foguete;
                    $foguete.css("top", idxLinha * 42);
                    $foguete.css("left", idxtile * 42);
                }
            });
        });
        return itens;
    }
}

class Personagem {

    static createPersonagens(mapa, $tabuleiro) {
        const personagens = [];
        mapa.forEach((linha, idxLinha) => {
            linha.forEach((tile, idxtile) => {
                if (tile == "p") {
                    const $personagem = $("<div>", { class: "personagem" })
                    const $sprite = $("<div>", { class: "sprite" });
                    $personagem.append($sprite);
                    $tabuleiro.append($personagem);
                    personagens.push(new Personagem($personagem, idxtile, idxLinha, mapa));
                }
            });
        });
        return personagens;
    }

    constructor($personagem, x, y, mapa) {
        this.timePerCommand = 600;
        this.clear = false;
        this.tileSize = 42;
        this.spriteWidth = 40;
        this.spriteHeight = this.spriteWidth * 1.5;
        this.spriteQuadros = 4;
        this.quadro = 0;
        this.hasCommand = false;

        this.passosPerMove = 2;
        this.timeToMove = 400;
        this.hasGas = false;

        this.timer;
        this.orientacao = 3;
        this.x = x;
        this.y = y;
        this.$personagem = $personagem;
        this.mapa = mapa;
        this.draw();
    }

    rotate() {
        this.orientacao = ++this.orientacao % 4
        this.draw();
    }

    move(movimenta = true) {
        movimenta = !this.checkColisao();
        this.timer = setInterval(() => {
            this.triggerMove(movimenta);
        }, this.timeToMove / (this.spriteQuadros * this.passosPerMove + 1));
    }

    checkColisao(){
        switch (this.orientacao) {
            case 0: //baixo
                return !this.mapa[this.y + 1][this.x] || this.mapa[this.y + 1][this.x] == "x";
                break;
            case 1: //direita
                return !this.mapa[this.y][this.x -1] || this.mapa[this.y][this.x -1]  == "x";
                break;
            case 2: //cima
                return !this.mapa[this.y -1][this.x] || this.mapa[this.y -1][this.x]  == "x";
                break;
            case 3: // esquerda
                return !this.mapa[this.y][this.x + 1] || this.mapa[this.y][this.x + 1]  == "x";
                break;
        }
    }

    triggerMove(movimenta) {
        if (movimenta)
            switch (this.orientacao) {
                case 0: //baixo
                    this.y += 1 / (this.spriteQuadros * this.passosPerMove + 1);
                    break;
                case 1: //direita
                    this.x -= 1 / (this.spriteQuadros * this.passosPerMove + 1);
                    break;
                case 2: //cima
                    this.y -= 1 / (this.spriteQuadros * this.passosPerMove + 1);
                    break;
                case 3: // esquerda
                    this.x += 1 / (this.spriteQuadros * this.passosPerMove + 1);
                    break;
            }
        this.quadro = ++this.quadro;
        this.draw();
        if (this.quadro == this.spriteQuadros * this.passosPerMove) {
            this.quadro = 0;
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            this.checkForItem();
            this.draw();
            clearInterval(this.timer);
        }
    }

    checkForItem(){
        if(this.mapa[this.y][this.x] == "g" && itens[this.y][this.x]){
            this.mapa[this.y][this.x] == "o"
            this.hasGas = true;
            itens[this.y][this.x].hide();
            itens[this.y][this.x] = null;
        }

        if(this.mapa[this.y][this.x] == "f" && itens[this.y][this.x]){
            if(this.hasGas){
                this.mapa[this.y][this.x] == "o"
                this.clear = true;
                itens[this.y][this.x].children(".sprite").css("background-image",'url("../assets/rocket_launch.gif")');
                fly(itens[this.y][this.x]);
                itens[this.y][this.x] = null;
                this.$personagem.hide();
            }
            
        }
    }

    executeCommandos(commands){
        this.hasCommand = true;
        this.iterator = makeCommandIterator(commands);
        let actions = setInterval(() => {
            let command = this.iterator.next();
            if(this.clear || command.done){
                clearInterval(actions)
                this.hasCommand = false;
            } 
            else{
                switch(command.value){
                    case "step":
                        this.move();
                        break;
                    case "turn":
                        this.rotate();
                        break;
                }
            }
        }, this.timePerCommand);
    }

    draw() {
        this.$personagem.children(".sprite").css("background-position", '-' + this.quadro % this.spriteQuadros * this.spriteWidth + 'px ' + this.orientacao * this.spriteHeight + 'px');
        this.$personagem.css("top", this.y * this.tileSize);
        this.$personagem.css("left", this.x * this.tileSize);
    }
}

function fly(sprite){
    time = 0;
    const interval = setInterval(() => {
        if(time > 20000){
            clearInterval(interval);
            sprite.hide();
        }
        const top = sprite.css("top");
        sprite.css("top", (Number(top.substr(0,top.length -2)) - 15) + "px");
        time += 100;
    }, 100);

}

function makeCommandIterator(command,start = 0, end = Infinity, step = 1) {
    let i = 0;
    let loop = null;
    const rangeIterator = {
       next: function() {
            if(loop){
               result = loop.next();
               if(result.done) {
                   i++;
                   loop = null;
                   return this.next();
               }
               else return result;
            }
            if(command[i] && command[i].command){
                let comando = command[i].command;
                i++;
                return { value:comando,done:false};
            }
            if(command[i] && command[i].loop){
                loop = makeLoopIterator(command[i].loop)
                return this.next();
            }
        
            return { value: i, done: true }
       }
    };
    return rangeIterator;
}

function makeLoopIterator(loopInfo) {
    let iterations = loopInfo.iterations -1;
    let command = loopInfo.commands;

    let i = 0;
    let loop = null;
    const rangeIterator = {
       next: function() {
            if(loop){
               result = loop.next();
               if(result.done) {
                   i++;
                   loop = null;
                   return this.next();
               }
               else return result;
            }
            if(command[i] && command[i].command){
                let comando = command[i].command;
                i++;
                return { value:comando,done:false};
            }
            if(command[i] && command[i].loop){
                loop = makeLoopIterator(command[i].loop)
                return this.next();
            }
            if(iterations > 0){
                iterations--;
                i = 0;
                return this.next();
            }
        
        return { value: i, done: true }
       }
    };
    return rangeIterator;
}