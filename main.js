var excercises = ['jumping jacks', 'wall sits', 'push ups', 'sit ups', 'chair step ups', 'squats', 'chair dips', 'plank', 'high knees', 'lunge', 'push-up and rotate', 'side plank' ]
var excerciseDurration = 30
var breakDurration = 5
var workoutEl = document.getElementById('workout')
var landingEl = document.getElementById('landing')
var glyph = document.getElementById('excerciseGlyph')

var doWorkout = function (){
	console.log('startWorkout')
	var workoutTimer, excerciseTimer, currentExcercise, timeEl
	currentExcercise = 0
	// hide the landing view and show the workout view
	//workoutEl.style.display = 'block'
	landingEl.style.left = '-100%'
	workoutEl.style.right = 0
	// some DOM elements that will be accessed a lot
	timeEl = document.getElementById('individualTimer')
	excerciseName = document.getElementById('excerciseName')
	// this is where the magic happens
	var doExcersie = function(count, breakCount){
		var breakTime = false
		excerciseName.textContent = excercises[currentExcercise]
		// an abstracted timer tick down func
		var timerDown = function() {
			timeEl.textContent = count
			count--
		}
		//the first interval doesn't execute until after 1 sec so kick off the first timer tick manually
		timerDown()
		var counter = setInterval(function(){
			if(count > -1) {
				timerDown()
			} else {
				if(!breakTime) {
					breakTime = true
					currentExcercise++
					count = breakCount
					timerDown()
					excerciseName.textContent = excercises[currentExcercise] ? excercises[currentExcercise] + ' in' : 'done' 
					// advance the master progressBar, change the image
					workoutEl.querySelector('#progressBar p:nth-child('+currentExcercise+')').textContent = 'x'
					glyph.className = excercises[currentExcercise].replace(/\s+/g, '')
				} else {
					//console.log('should be clearing interval... ', this)
					clearInterval(counter)
					if(currentExcercise < excercises.length) {
						doExcersie(excerciseDurration, breakDurration) // happening 1 sec to early...
					} else {
						endWorkout()
					}
				}
			}
		}, 1000)
	}
	
	doExcersie(excerciseDurration, breakDurration) // calls recursively until currentExcercise < excercises.length
}

var endWorkout = function(){
	console.log('endWorkout')
	landingEl.style.left = '0'
	workoutEl.style.right = '-100%'
}

var pauseWorkout = function(){
	console.log('pauseWorkout -doesnt work yet')
	landingEl.style.left = '0'
	workoutEl.style.right = '-100%'
}

