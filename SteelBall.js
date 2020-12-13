var target_heartrate = 70;
var heartrate_set;

var currentBPM;
var lastBPM;
var firstBPM = true; // first reading since sensor turned on
var HR_samples = [];
var trigger_count = 0;
var file = require("Storage").open("steel_log.csv","a");
var launchtime;
var alarm_length;

g.setFontAlign(0,0); // center font
g.setFont("6x8",3);

function btn1Pressed() {
  if(!heartrate_set){
  target_heartrate++;
  update_target_HR();
  }
}

function btn2Pressed() {
   heartrate_set = true;
  Bangle.setHRMPower(1);
  launchtime = 0|getTime();
  g.clear();
  g.drawString("tracking HR\n relax...", 120,120);
  }

function update_target_HR(){
  g.clear();
  g.drawString("target HR\n" + target_heartrate, 120,120);
}

function btn3Pressed(){
  if(!heartrate_set){
    target_heartrate--;
    update_target_HR();
  }
}

function alarm(){
  if(alarm_length > 0){
    //Bangle.beep(500,4000);
    Bangle.buzz(500,1);
    alarm_length--;
  }
  else{
    clearInterval(alarm);
    if(trigger_count > 1)
       Bangle.setHRMPower(0);
  }
}

function average(nums) {
  return nums.reduce((a, b) => (a + b)) / nums.length;
}

function getStandardDeviation (array) {
  const n = array.length;
  const mean = array.reduce((a, b) => a + b) / n;
  return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
}

function checkHR() {
  var bpm = currentBPM, isCurrent = true;
  if (bpm===undefined) {
    bpm = lastBPM;
    isCurrent = false;
  }
  if (bpm===undefined || bpm < 59 || bpm > 100)
     bpm = "--";
  if (bpm != "--"){
     HR_samples.push(bpm);
    // Terminal.println(bpm);
  }

  if(HR_samples.length == 5){
     g.clear();
     average_HR = average(HR_samples);
     stdev_HR = getStandardDeviation (HR_samples);
     stats = average_HR.toFixed(1) + " " + stdev_HR.toFixed(1);
     g.drawString(stats, 120,120);
     HR_samples = [];
     if(average_HR < target_heartrate && stdev_HR < 3){
       
       alarm_length = 4;
       setInterval(alarm, 2000);
       
        trigger_count++;
        var csv = [
        0|getTime(),
        launchtime,
            average_HR.toFixed(1),
            stdev_HR.toFixed(1)
          ];
        file.write(csv.join(",")+"\n");
     }
  //if(trigger_count < 2)
   // g.flip();
 }
}

update_target_HR();

setWatch(btn1Pressed, BTN1, {repeat:true});
setWatch(btn2Pressed, BTN2, {repeat:true});
setWatch(btn3Pressed, BTN3, {repeat:true});

Bangle.on('HRM',function(hrm) {

   if(trigger_count < 2){
    if (firstBPM)
      firstBPM=false; // ignore the first one as it's usually rubbish
    else {
      currentBPM = hrm.bpm;
      lastBPM = currentBPM;
    }
    checkHR();
   }
});
