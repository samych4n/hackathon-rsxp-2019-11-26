



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
            this.clear = false;
            this.tileSize = 42;
            this.spriteWidth = 40;
            this.spriteHeight = this.spriteWidth * 1.5;
            this.spriteQuadros = 4;
            this.quadro = 0;

            this.passosPerMove = 2;
            this.timeToMove = 1000;

            this.timer;
            this.orientacao = 0;
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
            this.timer = setInterval(() => {
                this.triggerMove(movimenta);
            }, this.timeToMove / (this.spriteQuadros * this.passosPerMove + 1));
        }

        triggerMove(movimenta) {
            console.log("aqui")
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
                this.draw();
                clearInterval(this.timer);
            }
        }

        draw() {
            this.$personagem.children(".sprite").css("background-position", '-' + this.quadro % this.spriteQuadros * this.spriteWidth + 'px ' + this.orientacao * this.spriteHeight + 'px');
            this.$personagem.css("top", this.y * this.tileSize);
            this.$personagem.css("left", this.x * this.tileSize);
        }
    }

    $.getScript("./class/Mapa.js", function () {
        $.getJSON("levels/level01.json", function (level) {
            index(level.map);
        });
    });

    function index(board) {
        const myBoard = new Mapa(board)
        $("#container").html(myBoard.drawMap());
        aaaa = Personagem.createPersonagens(board, $("#container"));
        console.log(aaaa);
    }
