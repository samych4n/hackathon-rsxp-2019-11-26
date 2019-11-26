class Mapa {

    constructor(mapa){
        this.mapa = mapa;
    }
    
    drawMap(){
        const $tabuleiro = $("<div>",{class:"tabuleiro"})
        this.mapa.forEach(linha => {
            const $linha = $("<div>",{class:"linha"});
            $tabuleiro.append($linha);
            linha.forEach(tile => {
                const $tile = $("<div>",{class:"tile"});                
                switch(tile)
                {
                    case "o":
                        break;
                    case "p":
                        break;
                    case "x":
                        $tile.addClass("vazio");
                        break;

                }
                $linha.append($tile);
            });
        });
        return $tabuleiro;
    }
}