import { smoothScroll } from "./module.js/smoothScroll.js";

const spoilerUpFlex = (target) => {
   target.parentElement.classList.remove('_spoilerOpen');
   target.style.height = '0px';
}
const spoilerDownFlex = (target) => {
   target.parentElement.classList.add('_spoilerOpen')
   let height = target.scrollHeight;
   target.style.height = `${height}px`;
}
const spoilerToggle = (element) => {
   if (!element.parentElement.classList.contains('_spoilerOpen')) {
   return spoilerDownFlex(element);
   } else {
   return spoilerUpFlex(element);
   }
}
function spoilerClick() {
   event.preventDefault();
   if (this.classList.contains('_spoilerRun')) {
         spoilerToggle(this.nextElementSibling);
   }
}
function spoilerAdd(element){
   element.nextElementSibling.style.cssText=`height:0px;overflow:hidden;transition:.2s;`
   element.style.cssText=`cursor:pointer;`
   element.parentElement.classList.remove('_spoilerOpen');
   if(!element.parentElement.classList.contains("_spoilerActive")){
         element.parentElement.classList.add("_spoilerActive");
         element.classList.add('_spoilerRun')
         element.addEventListener('click',spoilerClick)
   }
}
function spoilerRemove(element){
   element.parentElement.classList.remove('_spoilerOpen');
   element.nextElementSibling.style.cssText=``
   element.style.cssText=``
   element.parentElement.classList.remove("_spoilerActive");
   element.classList.remove('_spoilerRun')
   element.removeEventListener('click',spoilerClick)
}
function spoilerFlex() {
   const spoilers = document.querySelectorAll("[data-spoiler]");
   if(spoilers.length>0){
         for(const spoiler of spoilers){
               if(spoiler.dataset.spoiler){
                     if(window.innerWidth<=spoiler.dataset.spoiler){
                           spoilerAdd(spoiler)
                     }else{
                           spoilerRemove(spoiler);
                     }
               }else{
                     spoilerAdd(spoiler)
               }
         }
   }
}


spoilerFlex();

const clickSmooths = [...document.querySelectorAll('[data-smooth]')];
clickSmooths.forEach(el => {
   el.addEventListener('click', (e) => {
      e.preventDefault()
      if (document.body.classList.contains("_burgerOpen")) {
         document.body.classList.remove('_burgerOpen')
         document.body.style.overflow = ''
      }
      smoothScroll(el.dataset.smooth);
   })
})

const burger = document.querySelector('._burger');
if (burger) {
   burger.addEventListener('click', (e) => {
      if (document.body.classList.contains("_burgerOpen")) {
         document.body.classList.remove('_burgerOpen')
         document.body.style.overflow = ''
      } else {
         document.body.classList.add('_burgerOpen')
         document.body.style.overflow = 'hidden'
      }
   })
}


AOS.init({once:true})


