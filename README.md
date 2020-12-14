# Steel Ball

See blog post on my website and Youtube video first:

https://youtu.be/ivDPa3YhF0U

https://jabituyaben.wixsite.com/majorinput/post/inducing-experimenting-with-hypnagogia-trance-states-with-the-bangle-js

Simply paste the code into the Espruino IDE and save the program as whatever you want.

As always with my projects, this can be considered a base code from which to expand where required. However I must say that I’ve had great results with this so far as is – so far the only addition I've made to this offline is a slight delay to the alarm before it is triggered, and this seems to work better for me.

The Steel Ball application essentially starts with a display that shows the current HR value that the watche's alarm is set to, and this can be adjusted with button 1 and button 3. This HR settng should be the approximate value you want the alarm to trigger and so you should  ideally know both what your HR is currently and what your heartrate normally is during sleep. For your current HR according to the watch, you can simply use the HR monitor available in the Espruino app loader, and then from that you can choose a lower value as the target for the alarm. If you know how low your HR drops during sleep that can help but if not, again, there is a readily available HR recorder app, 'Heart Rate Recorder' you can use for analysis on this during an overnight period. You can also just try different HR levels to see what works best for you and that’s exactly how I’ve approached it for my own use.

When you press the middle button on the side, the HR monitor starts and you simply just need to relax, the alarm will trigger when your heart rate average drops to the limit you’ve set. The code also has a basic logging function which shows, in a CSV file, when you started the HR tracker and when the alarm was triggered – monitoring this over time could give you an indication of how long it takes for you to relax and fall asleep, which itself can be an indicator of stress levels.
