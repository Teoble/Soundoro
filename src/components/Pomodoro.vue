<template>
    <div class="timer-pomodoro">
        <h2 class="title" id="timer">
            {{runTimer | prettify}}
        </h2>
        <div v-if="time > 0">
            <button class="button is-rounded" 
                    :class="isPaused ? 'is-info' : 'is-link'" 
                    @click="pomodoroToogle()">
                        <i class="fas" :class="playClass"></i>
                        </button>
        </div>
        <div class="timer-box" v-if="time == 0 || isPaused">
            <button class="button is-rounded" @click="setTimer(pomodoro)">Start Pomodoro</button>
            <button class="button is-rounded" @click="setTimer(shortBreak)">Start Short Break</button>
            <button class="button is-rounded" @click="setTimer(longBreak)">Start Long Break</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Pomodoro',
    data() {
        return {
            time: null,
            timer: null,
            pomodoro:25,
            shortBreak:5,
            longBreak:15,
            isPaused: true
        }
    },
    computed:{
        runTimer: function(){
            let time = this.time / 60
            let minutes = parseInt(time)
            let seconds = Math.round((time - minutes) * 60)
            return minutes+":"+seconds
        },
        playClass: function(){
            return this.isPaused ? 'fa-play' : 'fa-pause'
        }
    },
    filters: {
        prettify : function(value) {
            let data = value.split(':')
            let minutes = data[0]
            let secondes = data[1]
            let timer
            if (minutes < 10) {
                minutes = "0"+minutes
            }
            if (secondes < 10) {
                secondes = "0"+secondes
            }
            timer = minutes+":"+secondes
            document.title = `(${timer}) - Soundoro` 
            return timer
        }
	},
    methods:{
        setTimer: function(minutes){          
            let bckRemove
            let bckAdd
            if(minutes == this.shortBreak || minutes == this.longBreak){
                bckRemove = "pomodo-bck"
                bckAdd = "break-bck"
            }else{
                bckRemove = "break-bck"
                bckAdd = "pomodo-bck"
            }
            document.querySelector('#app').classList.remove(bckRemove);
            document.querySelector('#app').classList.add(bckAdd);
            this.time = (minutes * 60)
        },
        start: function() {
            if (!this.timer) {
                this.timer = setInterval( () => {                    
                    if (this.time > 0) {
                        this.time = !this.isPaused ? --this.time : this.time
                    } else {
                        this.isPaused = true;
                        clearInterval(this.timer)
                        this.timer = null
                        document.title = "Soundoro"
                    }
                }, 1000 )
            }
        },
        pomodoroToogle: function(){
            if(!this.timer){
                this.start()
            }
            
            this.isPaused = !this.isPaused
        }  
    },
    beforeMount(){
        this.setTimer(this.pomodoro)
        this.start()
    }

}
</script>

<style scoped>

#timer{
    color: white;
}

.timer-box{
    margin-top: 10px;
}

.button{
    margin-top: 12px;
}
</style>