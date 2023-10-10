new Vue({
    el: '#app',
    data: {
        running: false,
        playerLife: 100,
        monsterLife: 100,
        logs: []
    },
    computed:{
        hasResult(){
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods: {
        startGame(){
            this.running = true,
            this.playerLife = 100,
            this.monsterLife = 100,
            this.logs = []
        },

        attack(especial){
            if(this.monsterLife > 0){
                this.hurt('playerLife', 7, 15, false, "Monstro", "Jogador", "monster")
            }
            this.hurt('monsterLife', 5, 10, especial, "Jogador", "Monstro", "player")
        },

        hurt(prop, min, max, especial, source, target, cls){
            const plus = especial ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            this[prop] = Math.max(this[prop] - hurt, 0)
            this.registerLog(`${source} atingiu ${target} com ${hurt} de dano.`, cls)
        },
        getRandom(min, max){
            return Math.round(Math.random() * (max - min) + min)
        },
        healAndHurt(){
            this.hurt('playerLife', 7, 15, false, 'Monstro', 'Jogador', "monster")
            this.heal(10, 15)
        },
        heal(min, max){
            const heal = this.getRandom(min, max)
            this.playerLife = Math.min(this.playerLife + heal, 100)
            this.registerLog(`Jogador recebeu ${heal} de cura`, "player")
        },
        registerLog(text, cls){
            this.logs.unshift({ text, cls })
        }
    },
    watch:{
        hasResult(value){
            if(value) return this.running = false
        }
    }
})