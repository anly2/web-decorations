function addEvent(obj, evType, fn){
   if(obj.addEventListener)
      obj.addEventListener(evType, fn, false);
   else
   if(obj.attachEvent)
      obj.attachEvent("on"+evType, fn);
   else
      obj['on'+evType] = fn;
}
function getElementsByClass( searchClass, domNode, tagName) {
   // "class1 class2" : specific classes and order
   // "class1.class2" : specific classes but not order

	if (domNode == null) domNode = document;
	if (tagName == null) tagName = '*';

	var arr = new Array();
	var tags = domNode.getElementsByTagName(tagName);
	var clss = searchClass.split(".");

   var i,j,q;
   tagLoop:
	for(i=0,j=0; i<tags.length; i++){
      classLoop:
      for(q=0; q<clss.length; q++)
   		if ( (" " + tags[i].className + " ").indexOf(" "+clss[q]+" ") == -1)
            continue tagLoop;

      arr[j++] = tags[i];
	}

	return arr;
}
function isElement(o){
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
    typeof o === "object" && o.nodeType === 1 && typeof o.nodeName==="string"
);
}



function loading(node, p){
   // Defaults
   this.mode      = 'normal'; // | luck
   this.delay     = 0;        // The delay before the actual effect begins. Ensures N ms of the effect
   this.repeat    = false;    // 0:Number == Loop Forever
   this.event     = false;    // The restarting event
   this.interval  = 150;
   this.direction = "ltr";    // left-to-right | right-to-left
   this.shuffle   = "rest";   // "all"  -> the shuffled text is from characters of the whole text
                              // "rest" -> the shuffled text is from characters of the "unloaded" text
   this.delimiter = "";       // Use "<br>" for matrix style   //CAREFUL with trimmed HTML!
   this.skip      = 0;        // The times/calls it takes for a single letter to load
   this.blink     = 0;        // Every N calls blink once (shuffle all despite the progress)
   this.whenDone  = false;    // Code to be executed when loading is done
   this.start     = false;    // Start Now?

   // Unwise to override, but can be useful
   this.index     = 0;
   this.node      = node;
   this.initHTML  = node.innerHTML;
   this.delayed   = false;
   this.delayDone = false;
   this.repeated  = 0;
   this.skipped   = 0;
   this.blinked   = 0;
   this.loader    = true;

   // If parameters are supplied, override the defaults
   for(i in this){
      if(node.getAttribute(i) != null)
         this[i] = node.getAttribute(i);
         
      if(p && p[i] != null)
         this[i] = p[i];
   }

   // Regulations
   this.direction = this.direction=="ltr";
   if(this.loader == "done")
      this.start  = true;
   if(!this.start && !this.event)
      this.event = "click";

          
   this.init = function(){
      node.decoration.index=0;
      node.decoration.repeated=0;
      node.decoration.delayDone=false;
      clearTimeout(node.decoration.loader);
      node.decoration.loader = true;
      node.decoration.load();
   }
   addEvent(node, this.event, this.init);


   this.effect = function(){
      if(this.loader=="done"){
         this.node.innerHTML = this.initHTML.split("").join(this.delimiter);
         return true;
      }
      
      var str = this.direction? this.initHTML : this.initHTML.split("").reverse().join("");

      var   loaded = str.substr(0, this.index);
      
         var toShuffle = this.shuffle=="all"?  str : (this.shuffle!="alphabet"? str : "abcdefghijklmnopqrstuvwxyz").substr(this.index);
      var unloaded = ( toShuffle )
         .split("").sort( function(){ return Math.random()-0.5 } ).join("")
         .substr(0, (str.length - this.index));

      this.node.innerHTML = ( this.direction? loaded + unloaded : (loaded + unloaded).split("").reverse().join("") )
         .split("").join(this.delimiter);

   	if(this.index == this.initHTML.length){
         this.repeated++;
         this.index = 0;

         if(this.whenDone)
            eval(this.whenDone);
      }
      this.index ++;
          
      if( (typeof this.repeat == 'boolean' && this.repeated > 0) || (this.repeat!=0 && this.repeated-1 >= this.repeat) )
         this.loader = 'done';
   }

   this.load  = function(){
      if(!node.decoration.delayDone){
         node.decoration.delayed   = true;
         node.decoration.delayDone = true;
         setTimeout( function(){node.decoration.delayed=false} , node.decoration.delay );
      }

      if(node.decoration.blink>0 && node.decoration.blinked++ >= node.decoration.blink){
      	var tmp  = node.decoration.index;
      	node.decoration.index   = 0;
      	node.decoration.blinked = 0;
      }

      node.decoration.effect();

      if(tmp)
         node.decoration.index = tmp;
      else

      if(node.decoration.delayed)
         node.decoration.index = 0;
      else

      if(node.decoration.mode=="normal")
         if(node.decoration.skipped++ >= node.decoration.skip)
            node.decoration.skipped = 0;
         else
            --node.decoration.index;
      else
      
      if(node.decoration.mode=="luck"){
            var i = (node.decoration.index-1)*(node.decoration.delimiter.length-(-1));
         var given    = node.innerHTML.charAt( (node.decoration.direction? i : node.innerHTML.length-1 - i) );
         var expected = node.decoration.initHTML.charAt( (node.decoration.direction? node.decoration.index-1 : node.decoration.initHTML.length-1 - (node.decoration.index-1) ) )

         if( given != expected )
            --node.decoration.index;
      }


      if(node.decoration.loader != "done")
         node.decoration.loader = setTimeout( arguments.callee, node.decoration.interval);
   }

   node.decoration = this;

   if(node.decoration.start)
      node.decoration.load();

   return node;
}

function pour(node, p){
   // Defaults
   this.direction = 'ltr';     // left-to-right | right-to-left | center-to-sides | random
   this.event     = false;     // The restarting event
   this.interval  = 100;
   this.tags      = "instant"; // | "delayed"
   this.delimiter = "";
   this.blink     = 0;         // In N calls have a blank one
   this.rewind    = 0;         // In N calls rewind
   this.wait      = 0;         // In N calls back X letters (default 1)
   this.back      = 1;         // X letters ^
   this.start     = false;     // Start Now?

   // Unwise to override, but can be useful
   this.index     = 0;
   this.node      = node;
   this.initHTML  = node.innerHTML;
   this.blinked   = 0;
   this.rewinded  = 0;
   this.waited    = 0;
   this.loader    = true;
   this.pad       = '&nbsp;';

   // If parameters are supplied, override the defaults
   for(i in this){
      if(node.getAttribute(i) != null)
         this[i] = node.getAttribute(i);
         
      if(p && p[i] != null)
         this[i] = p[i];
   }

   // Regulations
   if(this.back > this.wait)
      this.back = this.wait;
   if(this.loader == "done")
      this.start  = true;
   if(!this.start && !this.event)
      this.event = "click";
   this.rsc = this.pad;

   this.init = function (){
      node.decoration.index=0;
      node.decoration.blinked=0;
      node.decoration.rewinded=0;
      node.decoration.waiteded=0;
      clearTimeout(node.decoration.loader);
      node.decoration.loader = true;
      node.decoration.load();
   }
   addEvent(node, this.event, this.init);


   this.effect = function(){
      if(this.loader=="done"){
         this.node.innerHTML = this.initHTML.split("").join(this.delimiter);
         return true;
      }
      
      var str, i;
      
      if(this.direction == "ltr")
      	str = this.initHTML.substr(0, this.index);
      else

      if(this.direction == "rtl")
         str = this.initHTML.substr(this.initHTML.length - this.index);
      else

      if(this.direction == "cts")
         str = this.initHTML.substr( Math.floor(this.initHTML.length/2) - Math.ceil(this.index/2) , this.index);
      else

      if(this.direction == "random"){
         if(!this.shown || this.index<=0){
            this.shown = new Array();
            for(i=0; i<this.initHTML.length; i++)
               this.shown[i] = false;
         }


         // Take shown letters
            var cShown = 0;
            for(i=0; i<this.shown.length; i++)
               if(this.shown[i])
                  cShown++;

         // Mark n(this.index-showLettersCount) random not shown letters as shown
            if(this.index > cShown){
            	var lc = this.index - cShown;
            	for(i=0; i<lc; i++){
                  do{ rand = Math.floor(Math.random()*(this.initHTML.length)); }
                  while( this.shown[rand] )

                  this.shown[rand] = true;
            	}
            }
         // Cycle letters ->  where the letter is shown str+=Letter else str+=this.pad
         	str = '';
         	for(i=0; i<this.initHTML.length; i++)
               str += ((i>0)? this.delimiter : '') + ((this.shown[i])? this.initHTML.charAt(i) : this.pad); 
      }

      if(this.tags=="instant"){
         if(this.direction=="ltr"||this.direction=="rtl") // "cts" cannot be worked out
            if(str.split("<").length > str.split(">").length)
               str = this.initHTML.substr( 0,  (this.index = this.initHTML.indexOf(">", this.index)-(-1)) );
            else

            if(str.split("<").length < str.split(">").length)
               str = this.initHTML.substr( this.initHTML.length - (this.index = this.initHTML.length - this.initHTML.lastIndexOf("<", this.initHTML.length - this.index)) );
      }

      this.node.innerHTML = (this.direction=="random")? str : str.split("").join(this.delimiter);

   	if(this.index++ == this.initHTML.length)
         this.loader = 'done';
   }

   this.load  = function(){

      if(node.decoration.blink>0 && node.decoration.blinked++ >= node.decoration.blink){
      	var tmp  = node.decoration.index;
      	node.decoration.index   = 0;
      	node.decoration.blinked = 0;
      }else
      if(node.decoration.rewind>0 && node.decoration.index >= node.decoration.rewind*node.decoration.rewinded){
      	node.decoration.index   = 0;
      	node.decoration.rewinded++;
      }

      node.decoration.effect();

      if(tmp)
         node.decoration.index = tmp;
         
      if(node.decoration.wait>0 && node.decoration.waited++ >= node.decoration.wait){
         node.decoration.waited = 0;
      	node.decoration.index -= node.decoration.back;
      }

      if(node.decoration.loader != "done")
         node.decoration.loader = setTimeout( arguments.callee, node.decoration.interval);
   }

   node.decoration = this;

   if(node.decoration.start)
      node.decoration.load();

   return node;
}

function radio(node, p){
   // Defaults
   this.group       = false;      // (#|.|)identifier [, (#|.|)identifier] ... (#id | .class | name)
   this.event       = 'click';      // ele@event:index  [, ele@event:index]  ...
   this.property    = 'display';  // Which property to change when toggling among the group
   this.value       = 'none';     // .split(",") -> array(2) -> [0] when displayed , [1] when hidden
   this.start       = 'hidden';   // Start with the elements shown | hidden
   this.decorate    = true;       // If toggling among the group should affect the child decorations
   this.exclude     = 'nothing';  // | ("this"|"me") -> if this element is just a control and not part of the radio group
   this.whenOpened  = false;      // JS to be executed
   
   // Unwise to override, but can be useful
   this.index       = 0;

   // If parameters are supplied, override the defaults
   for(i in this){
      if(node.getAttribute(i) != null)
         this[i] = node.getAttribute(i);
         
      if(p && p[i] != null)
         this[i] = p[i];
   }

   // Regulations
   this.value = this.value.split(",");
   if(this.value.length<2)
      this.value.unshift("");
   this.start = this.start=="hidden";
   this.decorate = typeof this.decorate == "boolean";

   this.effect = function(e){ 
   	if(typeof e == "number")
         this.index = e;

      var i;
      for(i=0; i<this.targets.length; i++){
      	var tmp = this.targets[i].style.cssText.split(this.property);

      	if(tmp.length>1){
         	tmp[1]   = tmp[1].split(";");
            tmp[1].shift(); // prev =
         	tmp[1]   = tmp[1].join(";");
         }else
            tmp.push("");
            
      	this.targets[i].style.cssText = tmp.join( this.property+":"+ ( this.value[ (i==this.index? 0 : 1) ] ) +";" );

         if(this.decorate){
            var j;
            var decorations = getElementsByClass("decoration", this.targets[i]);

            for(j=0; j<decorations.length; j++)
               if(i==this.index){
                  if(decorations[j].decoration)
                     decorations[j].decoration.init();
                  else
                     decorations[j].setAttribute("start", "now");
               }else
                  if(decorations[j].decoration)
                     decorations[j].decoration.loader="done";
                  else
                     decorations[j].setAttribute("loader", "done");
         }

         if(this.index == i)
      	  eval(this.whenOpened);
      }

      this.index = ( ++this.index )%this.targets.length;
   }

   // Collect the group
   var i, j, n;
   this.targets = new Array();

   if(isElement(p))
      for(i=0; i<arguments.length; i++)
         this.targets.push(arguments[i]);
   else
      this.targets.push(node);

   for(n=0; n<this.targets.length; n++){
      if(!this.targets[n].getAttribute("group"))
         continue;
      
      var ids = this.targets[n].getAttribute("group").split(",");
      var u = 0;
      
      for(i=0; i<ids.length; i++){
         if(ids[i].charAt(0)=="#")
            var tmp = document.getElementById(ids[i].substr(1));
         else

         if(ids[i].charAt(0)==".")
            var tmp = getElementsByClass(ids[i].substr(1));

         else
         	var tmp = document.getElementsByName(ids[i]);


         // If we have array and not an element
         if(tmp.length){
         	for(j=0; j<tmp.length; j++)
         	  if(this.targets.indexOf(tmp[j])==-1){
         	     this.targets.splice( n+1+i+u+j, 0, tmp[j]);
         	     if(j>0) u++;

         	     if(tmp[j].getAttribute("event"))
         	        this.event += ","+ tmp[j].getAttribute("event");
         	  }
         }else
         if(typeof tmp.length == "undefined")
            if(this.targets.indexOf(tmp)==-1){
               this.targets.splice( n+1+i+u, 0, tmp);

               if(tmp.getAttribute("event"))
         	        this.event += ","+ tmp.getAttribute("event");
            }
      }
   }

   if(this.exclude.indexOf("this")!=-1 || this.exclude.indexOf("me")!=-1)
      this.targets.shift();

   // Apply events accordingly
   var events = this.event.split(",");
      if(this.exclude.indexOf("this")!=-1 || this.exclude.indexOf("me")!=-1)
         var dEvent = '';
      else
         var dEvent = this.event;

   // Parse event string
   for(i=0; i<events.length; i++){
      if(events[i].indexOf("@") > 0){
      	var ele = events[i].split("@")[0];
      	var inf = events[i].split("@")[1].split(":");
      	var evn = inf[0];
      	var ind = inf.length>1? parseInt(inf[1]) : "'+'";

      	var elem = (isNaN(ele)? document.getElementById(ele) : this.targets[ele]);

      	eval('addEvent( elem, evn, function(){ node.decoration.effect('+ind+') } );');
      	elem.radioEventApplied = true;
      }else
         dEvent = events[i].split("@").join("").split(":")[0];
   }

   // Make sure all targets have event listeners attached
   for(i=0; i<this.targets.length; i++){
      if(!this.targets[i].radioEventApplied){
         addEvent(this.targets[i], dEvent, function(){ node.decoration.effect(); } );
         this.targets[i].radioEventApplied = true;
      }
      this.targets[i].decoration = this;
   }

   if(this.start)
      this.effect();

   node.decoration = this;
}

function bracket(node, p){
   this.caption = ''       // The caption to be displayed when the brackets are closed
   this.event   = 'click'; // The event to open/close the brackets
   this.bracket = false;   // The bracket style
   this.opened  = !(this.closed = true); // If the brackets should start opened or 

   // Unwise to override, but can be useful
   this.index       = 0;

   // If parameters are supplied, override the defaults
   for(i in this){
      if(node.getAttribute(i) != null)
         this[i] = node.getAttribute(i);
         
      if(p && p[i] != null)
         this[i] = p[i];
   }

   // Regulations
   if(this.opened)
      this.closed = false;
      

   // Find the element bracket-tab-index
//   if(typeof this.bracket != "boolean"){
      if(this.bracket <= 1 || this.bracket=='(' || this.bracket==')')
         this.index = 0;
      if(this.bracket == 2 || this.bracket=='{' || this.bracket=='}')
         this.index = 1;
      if(this.bracket == 3 || this.bracket=='[' || this.bracket==']')
         this.index = 2;
//   }else{
//      var obj = node;
//      this.index--; //Because it counts the node element as well
//
//      do{
//         if( (" "+obj.className+" ").indexOf(' bracket ') != -1)
//            if( (" "+obj.className+" ").indexOf(' decoration ') != -1)
//               this.index++;
//      	 obj = obj.parentNode;
//      }
//      while((typeof obj.parentNode != 'undefined') && (obj != document.body));
//   }


   // Make a caption object
   if(this.caption.charAt(0) == '#'){
      this.captionElement = document.getElementById(this.caption.substr(1));
      node.parentNode.insertBefore(this.captionElement, node);
   }else{
   	this.captionElement = document.createElement('span');
   	node.parentNode.insertBefore(this.captionElement, node);

   	var c;
   	c  = (this.index==2)? '[' : (this.index==1)? '{' : '(';
   	c += (this.caption.length>0)? this.caption : '...';
   	c += (this.index==2)? ']' : (this.index==1)? '}' : ')';
      this.captionElement.innerHTML = c;
   }
    
   // Add the brackets to the content as well
   var c;
   c  = (this.index==2)? '[' : (this.index==1)? '{' : '(';
   c += node.innerHTML;
   c += (this.index==2)? ']' : (this.index==1)? '}' : ')';
   node.innerHTML = c;

   // Have the caption and the innerContent as radio objects
   if(!node.getAttribute('event'))
       node.setAttribute('event', this.event);
   if(this.closed)
       node.setAttribute('index', '1');

   this.radio = new radio(node, this.captionElement);

   // Returning
   this.node = node;
}



addEvent(window, 'load',
   function(){
      var decorated = getElementsByClass("decoration");
      for(i in decorated){
         if(decorated[i].className.indexOf("loading") != -1)
            new loading(decorated[i]);
         else

         if(decorated[i].className.indexOf("pour") != -1)
            new pour(decorated[i]);
         else

         if(decorated[i].className.indexOf("radio") != -1)
            new radio(decorated[i]);
         else

         if(decorated[i].className.indexOf("bracket") != -1)
            new bracket(decorated[i]);
      }
   }
);