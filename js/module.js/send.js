const send = document.querySelector('._ajaxFormSend');
if (!send) throw new Error('there is no btn "send"');
send.addEventListener('click', event => {
   event.preventDefault();

   const block = document.querySelector('form');

   if (!validateForm(block) || send.classList.contains('_formSended')) return

   send.classList.add('_formSended');

   const img = document.createElement('img');
   img.src = 'img/contacts/load.gif';
   img.style.cssText = `
   width:30px;
   height:30px;
   margin: 0 0 0 10px;
   position:relative;
   z-index:2;
   `
   send.appendChild(img);
   console.log('drger');
   const formData = new FormData();

   formData.append('name', block.querySelector('[data-type="name"]').value)
   formData.append('phone', block.querySelector('[data-type="phone"]').value)

   let info = ''
   const transfer = block.querySelector('[data-type="transfer"]').checked;
   const p2p = block.querySelector('[data-type="p2p"]').checked

   if(transfer) info += ' Переводы'
   if(p2p) info += ' Вложения'

   formData.append('info', info)

   const ArrSel = [...block.querySelectorAll('[data-selected]')]
   const isSelected = ArrSel.find(el=>el.dataset.selected === 'true');

   if(p2p) formData.append('case', isSelected?.dataset?.select)
   
   

   const xhr = new XMLHttpRequest();
   xhr.open('POST', '../php/send.php');
   setTimeout(() => xhr.send(formData), 1000);
   xhr.onload = function () {
      if (xhr.status != 200) {
         send.removeChild(img);
         alert("something went wrong, please send a request later");
         send.classList.remove('_formSended');

      } else {
         if (xhr.response === 'true') {
            send.innerHTML = `
            <svg class='_goodSend' style='width:30px;height:25px;fill:#000;position:relative;z-index:2'>
               <use xlink:href="#arrow2"></use>
            </svg>`;
         } else {
            send.removeChild(img);
            alert("something went wrong, please send a request later");
            send.classList.remove('_formSended');
         }
      }
   };
   xhr.onerror = function () {
      send.removeChild(img);
      alert("something went wrong, please send a request later");
      send.classList.remove('_formSended');
   };
})

function validateForm(form) {
   const inputs = [...form.querySelectorAll('[data-input]')];
   const badInputs = inputs.filter(input => checkInput(input))
   console.log(badInputs);
   if (badInputs.length > 0) {
      badInputs.forEach(input => {
         input.parentElement.classList.add('_badInput');
         if (input.type === 'text' || input.type === 'number') input.addEventListener('input', deleteCheck)
         if (input.dataset.type === 'info') {
            const checkboxes = [...input.querySelectorAll('[data-info]')];
            checkboxes.forEach(el=>el.addEventListener('change', deleteCheck))
         }
      })
      return false
   }
   return true
}

function deleteCheck(event) {
   const per = event.target.closest('._badInput');
   if(per)per.classList.remove('_badInput');
   
   if (event.target.type === 'text' || event.target.type === 'number') event.target.removeEventListener('input', deleteCheck);
   if (event.target.type === 'checkbox') event.target.removeEventListener('change', deleteCheck);
}

function checkInput(input) {
   if (input.dataset.type === 'name') {
      if (input.value.length <= 2) return true
   } else if (input.dataset.type === 'phone') {
      if (input.value.length <= 9) return true
   } else if (input.dataset.type === 'info') {
      const [check1, check2] = [...input.querySelectorAll('[data-info]')];
      if (!check1.checked && !check2.checked) return true
   } else if (input.dataset.type === 'select') {
      if(!document.querySelector('input[data-preSelect]')?.checked)return false
      const ArrSel = [...input.querySelectorAll('[data-selected]')]
      if (ArrSel.length === 0) return true

      const isSelected = ArrSel.find(el=>el.dataset.selected === 'true');
      if(!isSelected) return true;
   }
   return false
}