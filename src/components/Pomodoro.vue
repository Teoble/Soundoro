<template>
    <div class="box timer-pomodoro">
          <h2 class="title" id="timer">
            {{runTimer | prettify}}
          </h2>
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
            smallBreak:5,
            longBreak:15
        }
    },
    computed:{
        runTimer: function(){
            let time = this.time / 60
            let minutes = parseInt(time)
            let seconds = Math.round((time - minutes) * 60)
            return minutes+":"+seconds
        }
    },
    filters: {
        prettify : function(value) {
            let data = value.split(':')
            let minutes = data[0]
            let secondes = data[1]
            if (minutes < 10) {
                minutes = "0"+minutes
            }
            if (secondes < 10) {
                secondes = "0"+secondes
            }
            return minutes+":"+secondes
        }
	},
    methods:{
        startPomodoro:function(){
            this.time = (this.pomodoro * 60)
        },
        start () {
            if (!this.timer) {
                this.timer = setInterval( () => {
                    if (this.time > 0) {
                            this.time--
                    } else {
                            clearInterval(this.timer)
                    }
                }, 1000 )
            }
        }
    },
    beforeMount(){        
        this.startPomodoro()
        this.start()
    }

}
</script>

<style scoped>
.timer-pomodoro{
    background-color: #c0392b;
}

#timer{
    color: white;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
</style>