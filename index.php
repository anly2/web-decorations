<?php
//include "decorations.html";
?>
<html>
<head>
   <title>Decorations</title>
   <script type="text/javascript" src="decorations.js.php"></script>
   <style type="text/css">
   a.parameter:hover{
   	text-decoration: underline;
   }
   </style>
</head>
<body style="padding-left:50px">
   <br /><br />

   <h3 id="loading:header">Loading Decorations</h3>
   <div  style="margin-left:50px" class="radio decoration" group="#loading:examples" event="loading:header@click:1,loading:examples:show@click:1,loading:examples:hide@click:0" decorate="false">
      <small  id="loading:examples:show"><a href="#"> (Examples) </a></small>
   </div>
   <div id="loading:examples" style="margin-left:50px">
      <small id="loading:examples:hide"><a href="#"> (Hide Examples) </a></small>

      <br /><br />
      <span class="loading decoration" event="mouseover" delay="3000" shuffle="all" repeat="5" whenDone="this.direction = !this.direction;">Some text to be repeatedly loaded</span>

      <br /> <br />
      <a    class="loading decoration" mode="luck" direction="rtl">Some text to be luckily loaded</a>

      <br /> <br />
      <em   class="loading decoration" loader="done" event="click" delimiter="<br>" skip="7" style="position:absolute; left:415px; top: 80px;">Matrix style loading</em>
   </div>

   <br />

   <div  style="margin-left:50px" class="radio decoration" group="#loading:syntax" event="loading:syntax:show@click:1,loading:syntax:hide@click:0" decorate="false">
      <small id="loading:syntax:show"><a href="#"> (Syntax) </a></small>
   </div>
   <div id="loading:syntax" style="margin-left:50px">
      <small id="loading:syntax:hide"><a href="#"> (Hide Syntax) </a></small>

      <br /><br />
      <div id="loading:syntax:string">
         &lt;~~~ <u>class</u>="<u>loading</u> <u>decoration</u>" <br />
         <dd> <a id="loading:syntax:p1" class="parameter">[mode={<b>"normal"</b> | "luck"}]</a> <br />
         <dd> <a id="loading:syntax:p2" class="parameter">[delay=<em>Number</em>]</a> <br />
         <dd> <a id="loading:syntax:p3" class="parameter">[repeat=<em>Number</em>]</a> <br />
         <dd> <a id="loading:syntax:p4" class="parameter">[event=<em>RestartEvent</em>]</a> <br />
         <dd> <a id="loading:syntax:p5" class="parameter">[start=<em>Anything</em></a>] <br />
         <dd> <a id="loading:syntax:p6" class="parameter">[interval=<em>Number</em>]</a> <br />
         <dd> <a id="loading:syntax:p7" class="parameter">[direction={<b>"ltr"</b> | "rtl"}]</a> <br />
         <dd> <a id="loading:syntax:p8" class="parameter">[shuffle={<b>"rest"</b> | "all"}]</a> <br />
         <dd> <a id="loading:syntax:p9" class="parameter">[delimiter=<em>String</em>]</a> <br />
         <dd> <a id="loading:syntax:p10" class="parameter">[skip=<em>Number</em>]</a> <br />
         <dd> <a id="loading:syntax:p11" class="parameter">[blink=<em>Number</em>]</a> <br />
         <dd> <a id="loading:syntax:p12" class="parameter">[whenDone=<em>JSCodeString</em>]</a> <br />
         &gt;<br /> <dd><em>content HTML</em> <br />&lt;/~~~&gt;
      </div>

      <br /><br />

      <div class="radio decoration" group="loading_syntax_info" exclude="me"
         event="loading:syntax:string@mouseout:0,loading:syntax:p1@mouseover:1,loading:syntax:p2@mouseover:2,loading:syntax:p3@mouseover:3,loading:syntax:p4@mouseover:4,loading:syntax:p5@mouseover:5,loading:syntax:p5@mouseover:5,loading:syntax:p6@mouseover:6,loading:syntax:p7@mouseover:7,loading:syntax:p8@mouseover:8,loading:syntax:p9@mouseover:9,loading:syntax:p10@mouseover:10,loading:syntax:p11@mouseover:11,loading:syntax:p12@mouseover:12">
         Details:
      </div>

      <div name="loading_syntax_info"> </div>

      <div name="loading_syntax_info" style="margin-left:20px">
         <strong>mode</strong> :<i>The mode of the loading decoration</i>
         <ul>
            <li>"normal": each step a new letter is "loaded"
            <li>"luck": &nbsp; &nbsp; a new letter is "loaded" only when the viewed position is with the letter it should
         </ul>
      </div>

      <div name="loading_syntax_info" style="margin-left:20px">
         <strong>delay</strong> :<i>The miliseconds the letter loading is delayed. This ensures n ms of shuffling content</i>
      </div>

      <div name="loading_syntax_info" style="margin-left:20px">
         <strong>repeat</strong> :<i>The number of times the effect is repeated</i>
         <ul>
            <li>0: repeat till infinity
         </ul>
      </div>

      <div name="loading_syntax_info" style="margin-left:20px">
         <strong>event</strong> :<i>The event at which the effect should start/restart</i>
      </div>

      <div name="loading_syntax_info" style="margin-left:20px">
         <strong>start</strong> :<i>If any value is given the effect will start immediately</i>
      </div>

      <div name="loading_syntax_info" style="margin-left:20px">
         <strong>interval</strong> :<i>The interval between steps in miliseconds</i>
         <ul>
            <li>default: 150
         </ul>
      </div>

      <div name="loading_syntax_info" style="margin-left:20px">
         <strong>direction</strong> :<i>The direction from which the letters are being "loaded"</i>
         <ul>
            <li>"ltr": Left-to-Right (default)
            <li>"rtl": Right-to-Left
         </ul>
      </div>

      <div name="loading_syntax_info" style="margin-left:20px">
         <strong>shuffle</strong> :<i>Specifies what to shuffle among</i>
         <ul>
            <li>"rest": The shuffled letters are only of the unloaded ones
            <li>"all": &nbsp;The shuffled letters are among all - loaded and unloaded
         </ul>
      </div>

      <div name="loading_syntax_info" style="margin-left:20px">
         <strong>delimiter</strong> :<i>A delimiter string/html to be put between each letter</i>
      </div>

      <div name="loading_syntax_info" style="margin-left:20px">
         <strong>skip</strong> :<i>The number of steps that are skipped / no letter is loaded.
         In other words, the steps it takes for a single letter to load</i>
      </div>

      <div name="loading_syntax_info" style="margin-left:20px">
         <strong>blink</strong> :<i>Every N steps blink. For a single step display a fully shuffled text</i>
      </div>

      <div name="loading_syntax_info" style="margin-left:20px">
         <strong>whenDone</strong> :<i>Javascript code string to be executed when effect is done (time to repeat)</i>
         <ul>
            <li><b><i>this</i></b> refers to the node.decoration object
         </ul>
      </div>
      
   </div>



<br /><br />



   <h3 id="pour:header">Pour Decorations</h3>
   <div  style="margin-left:50px" class="radio decoration" group="#pour:examples" event="pour:header@click:1,pour:examples:show@click:1,pour:examples:hide@click:0" decorate="false">
      <small  id="pour:examples:show"><a href="#"> (Examples) </a></small>
   </div>
   <div id="pour:examples" style="margin-left:50px">
      <small id="pour:examples:hide"><a href="#"> (Hide Examples) </a></small>

      <br /><br />
      <div  class="pour decoration"> A <b style="long tag">poured</b> text with a long <u style="long tag">tag</u> that should load instantly</div>

      <br /><br />
      <div  class="pour decoration"    tags="delayed">Text <em>with</em> <strong style="long"><u>delayed</u></strong> <big>tags</big></div>

      <br /><br />
      <div  class="pour decoration"    interval="100" wait="7" back="5">A text that is being poured in drunk style</div>

      <br /><br />
      <div  class="pour decoration"    interval="135" blink="5">A blinking text that is being poured</div>

      <br /><br />
      <div  class="pour decoration"    interval="35" rewind="12" event="click">A text that is being poured time and again</div>

      <br /> <br />
      <a    class="pour decoration"    loader="done" event="click" direction="random" delimiter="<br>" style="position:absolute; left:450px; top: 200px;">Matrix style pour</a>
   </div>

   <br />

   <div  style="margin-left:50px" class="radio decoration" group="#pour:syntax" event="pour:syntax:show@click:1,pour:syntax:hide@click:0" decorate="false">
      <small  id="pour:syntax:show"><a href="#"> (Syntax) </a></small>
   </div>
   <div id="pour:syntax" style="margin-left:50px">
      <small id="pour:syntax:hide"><a href="#"> (Hide Syntax) </a></small>

      <br /><br />
      &lt;~~~ class="pour decoration"&gt; content HTML &lt;/~~~&gt;
   </div>



<br /><br />



   <h3 id="radio:header">Radio Decorations</h3>
   <div  style="margin-left:50px" class="radio decoration" group="#radio:examples" event="radio:header@click:1,radio:examples:show@click:1,radio:examples:hide@click:0" decorate="false">
      <small  id="radio:examples:show"><a href="#"> (Examples) </a></small>
   </div>
   <div id="radio:examples" style="margin-left:50px">
      <small id="radio:examples:hide"><a href="#"> (Hide Examples) </a></small>

      <br /><br />
      <fieldset id="radio" class="radio decoration" style="width:100px;"
       group="#radio:1,#radio:2,.radioClass,radioGroup" exclude="me" event="click">

         <legend><small>(click)</small></legend>      
         <div style="text-align:center;">
            <div id="radio:1">One</div>
            <div id="radio:2"><span class="pour decoration">Two</span></div>
            <div class="radioClass">Three</div>
            <div class="radioClass">Four</div>
            <div name="radioGroup">Five</div>
            <div name="radioGroup">Six</div>
         </div>
      </fieldset>
   </div>

   <br />

   <div  style="margin-left:50px" class="radio decoration" group="#radio:syntax" event="radio:syntax:show@click:1,radio:syntax:hide@click:0" decorate="false">
      <small  id="radio:syntax:show"><a href="#"> (Syntax) </a></small>
   </div>
   <div id="radio:syntax" style="margin-left:50px">
      <small id="radio:syntax:hide"><a href="#"> (Hide Syntax) </a></small>

      <br /><br />
      &lt;~~~ class="radio decoration"&gt; content HTML &lt;/~~~&gt;
   </div>



<br /><br />



   <h3 id="bracket:header">Bracket Decorations</h3>
   <div  style="margin-left:50px" class="radio decoration" group="#bracket:examples" event="bracket:header@click:1,bracket:examples:show@click:1,bracket:examples:hide@click:0" decorate="false">
      <small  id="bracket:examples:show"><a href="#"> (Examples) </a></small>
   </div>
   <div id="bracket:examples" style="margin-left:50px">
      <small id="bracket:examples:hide"><a href="#"> (Hide Examples) </a></small>

      <br /><br />
      <a href="#" id="term">Lorem ipsum</a> <span class="bracket decoration" caption="*" event="click,term@click"> is simply dummy text</span> dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
         <span class="radio decoration" group="#more" event="click"><small><a href='#'>Show more</a></small></span> <span id="more"><span class="pour decoration">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</span></span>
   </div>

   <br />

   <div  style="margin-left:50px" class="radio decoration" group="#bracket:syntax" event="bracket:syntax:show@click:1,bracket:syntax:hide@click:0" decorate="false">
      <small  id="bracket:syntax:show"><a href="#"> (Syntax) </a></small>
   </div>
   <div id="bracket:syntax" style="margin-left:50px">
      <small id="bracket:syntax:hide"><a href="#"> (Hide Syntax) </a></small>

      <br /><br />
      &lt;~~~ <u>class="bracket decoration"</u>  &gt; <em>content HTML</em> &lt;/~~~&gt;
   </div>

</body>
</html>