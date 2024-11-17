
function smoothScrollWrapper(){

   const step = 100;
   let previusPosition = null

   function toScroll(element = 'top',position){
      if(element === 'top') return 0;
      if(element === 'bottom') return document.body.clientHeight  - window.innerHeight;

      const elementIn = typeof element ==='string' ? document.querySelector(element):element;

      if(!elementIn) return;

      const elementInfo = elementIn.getBoundingClientRect();
      if(position === 'top') return window.scrollY + elementInfo.top;
      if(position ==='bottom') return window.scrollY + elementInfo.bottom - window.innerHeight;

      return window.scrollY + elementInfo.top + elementInfo.height/2 -(window.innerHeight/2);
   }

   return function (element,position,speed = 0){
      if (previusPosition != null)return

      function scrollBottom(){
         if(!document.body.classList.contains('_smooth')) document.body.classList.add('_smooth');
         setTimeout(()=>{
            if(window.scrollY+step >= whereToScroll){
               window.scrollTo(0,whereToScroll);
               document.body.classList.remove('_smooth');
               return previusPosition = null
            }
            if(window.scrollY+step > document.body.clientHeight  - window.innerHeight){
               window.scrollTo(0,document.body.clientHeight  - window.innerHeight);
               document.body.classList.remove('_smooth');
               console.log(window.scrollY+step,document.body.clientHeight  - window.innerHeight);
               return previusPosition = null;
            }
            window.scrollTo(0,window.scrollY+step);
            previusPosition = window.scrollY;
            scrollBottom()
         },speed)
      }
      function scrollTop(){
         console.log('object');
         if(!document.body.classList.contains('_smooth'))document.body.classList.add('_smooth');
         setTimeout(()=>{
            if(window.scrollY-step <= whereToScroll){
               console.log(window.scrollY-step,whereToScroll);
               window.scrollTo(0,whereToScroll);
               document.body.classList.remove('_smooth');
               return previusPosition = null
            }
            if(window.scrollY-step < 0) {
               window.scrollTo(0,0);
               document.body.classList.remove('_smooth');
               return previusPosition = null;
            }
            window.scrollTo(0,window.scrollY-step);
            previusPosition = window.scrollY;
            scrollTop()
         },speed)
      }

      const whereToScroll = toScroll(element,position);

      if(whereToScroll==='undefind')return;
      console.log(whereToScroll);
      if(whereToScroll>window.scrollY)scrollBottom()
      if(whereToScroll<window.scrollY)scrollTop()
   }
   
}

export const smoothScroll = smoothScrollWrapper();