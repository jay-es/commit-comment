if(((c)=>{const d={},f=(h='')=>{const j=h.split('.');return{et:j.shift(),ns:j}},g=(h,j)=>h.some((k)=>!j.includes(k));c.pubsub={sub(h,j){const{et:k,ns:l}=f(h);k&&(l.fn=j,d[k]=d[k]||[],d[k].push(l))},unsub(h){const{et:j,ns:k}=f(h);Object.keys(d).forEach((l)=>{j&&l!==j||(d[l]=d[l].filter((m)=>g(k,m)))})},pub(h,...j){const{et:k,ns:l}=f(h);k&&d[k]&&d[k].forEach((m)=>{g(l,m)||m.fn.apply(c,j)})}}})(this),this.cc={copyText(c){const d=document.getElementsByTagName('body')[0],f=document.createElement('textarea');f.textContent=c,d.appendChild(f),f.select(),document.execCommand('copy'),d.removeChild(f)},isSameObject(c,d){const f=Object.keys(c),g=Object.keys(d);return!(f.length!==g.length)&&f.every((h)=>c[h]===d[h])}},!localStorage.getItem('branchHistory')){const c=JSON.parse(localStorage.getItem('ticketHistory'))||[],d=[];c.forEach((f)=>{const[g,h,...j]=f.split('-'),k=j.join('-');d.push({tracker:g,ticket:h,keyword:k,version:'',issue:''})}),localStorage.setItem('branchHistory',JSON.stringify(d)),localStorage.removeItem('ticketHistory')}cc.historyData={data:JSON.parse(localStorage.getItem('branchHistory'))||[],add(c){this.remove(c),this.data.unshift(c),pubsub.pub('change.historyData',this.data)},remove(c){this.data.some((d,f)=>{return!!cc.isSameObject(d,c)&&(this.data.splice(f,1),pubsub.pub('change.historyData',this.data),!0)})}},pubsub.sub('change.historyData',(c)=>{localStorage.setItem('branchHistory',JSON.stringify(c))});{const c=document.getElementById('form'),d={tracker:'',ticket:'',version:'',issue:'',keyword:'',emoji:'',summary:''},g=(h)=>{const j=h.target;j.hasAttribute('name')&&(d[j.name]=j.value,pubsub.pub('change.formData',d))};c.addEventListener('change',g),c.addEventListener('input',g),cc.form={currentData:d,restoreValues:({tracker:h,ticket:j,version:k,issue:l,keyword:m})=>{document.querySelector(`input[name="tracker"][value="${h}"]`).checked=!0,document.querySelector('input[name="ticket"]').value=j,document.querySelector('input[name="version"]').value=k||'',document.querySelector('input[name="issue"]').value=l||'',document.querySelector('input[name="keyword"]').value=m||'',Object.assign(d,{tracker:h,ticket:j,version:k,issue:l,keyword:m}),pubsub.pub('change.formData',d)}}}{const c=document.getElementById('comment'),d=document.getElementById('output');let f='';pubsub.sub('change.formData',({tracker:h,ticket:j,issue:k,emoji:l,summary:m})=>{h&&j&&l&&(f=`${h} #${j} ${l}`,k&&(f+=` ${k}`),f+=` ${m}`,d.value=f)}),c.addEventListener('click',(h)=>{if('button'===h.target.tagName.toLowerCase()){const{tracker:j,ticket:k,version:l,issue:m,keyword:n}=cc.form.currentData;if(f&&j&&k){'command'===h.target.value?cc.copyText(`git commit -m "${f}"`):cc.copyText(f);const o={tracker:j,ticket:k,version:l,issue:m,keyword:n};cc.isSameObject(o,cc.historyData.data[0])||cc.historyData.add(o)}}})}{const c=document.getElementById('history-list');pubsub.sub('change.historyData',(f)=>{c.innerHTML='';const g=document.createDocumentFragment();f.forEach(({tracker:h,ticket:j,version:k,issue:l,keyword:m},n)=>{const o=document.createElement('li'),q=document.createElement('button');q.className='btn restore-btn',q.textContent='restore',q.value=n,o.appendChild(q);const r=document.createElement('button');r.className='btn remove-btn',r.textContent='remove',r.value=n,o.appendChild(r);const s=document.createElement('a');s.className='text-link history-list__redmine-link',s.textContent='Redmine',s.href=`https://kbn.glamour-sales.com/issues/${j}`,s.target='_blank',o.appendChild(s);const t=document.createElement('span');t.className='history-list__branch-name',t.textContent=`${h}-${j}`,k&&(t.textContent+=`-${k}`),l&&(t.textContent+=`-${l}`),m&&(t.textContent+=`-${m}`),o.appendChild(t),g.appendChild(o)}),c.appendChild(g)}),c.addEventListener('click',(f)=>{const g=f.target;if('button'===g.tagName.toLowerCase()){const h=cc.historyData.data[g.value];g.classList.contains('restore-btn')?cc.form.restoreValues(h):g.classList.contains('remove-btn')&&cc.historyData.remove(h)}else'span'===g.tagName.toLowerCase()&&cc.copyText(g.textContent)})}{const f=(g,h)=>{const j=document.getElementById(g),k=document.createDocumentFragment();h.forEach((l)=>{const m=document.createElement('li'),n=document.createElement('label');n.className='radio-list__label',m.appendChild(n);const o=document.createElement('input');o.type='radio',o.className='radio-list__radio',o.name=g,o.value=l.value,n.appendChild(o);const q=document.createElement('i');if(q.className=`radio-list__icon radio-list__icon--${g}`,q.innerHTML=l.icon?`&#x${l.icon};`:l.value,n.appendChild(q),l.icon){const s=new Image,t=l.icon.toLowerCase();s.src=`https://assets-cdn.github.com/images/icons/emoji/unicode/${t}.png`,s.onload=()=>{q.style.backgroundImage=`url(${s.src})`,q.innerHTML='&nbsp;'}}const r=document.createElement('p');r.className='radio-list__desc',r.innerHTML=l.desc,n.appendChild(r),k.appendChild(m)}),j.appendChild(k)};f('tracker',[{value:'FT',desc:'\u6A5F\u80FD\u8FFD\u52A0\u3001\u4ED5\u69D8\u5909\u66F4\u306B\u4F34\u3046\u6A5F\u80FD\u4FEE\u6B63'},{value:'BG',desc:'\u30C6\u30B9\u30C8\u4E2D\u3001\u30EA\u30EA\u30FC\u30B9\u5F8C\u306B\u767A\u751F\u3057\u305F\u4E0D\u5177\u5408'},{value:'SU',desc:'\u30D7\u30ED\u30B0\u30E9\u30E0\u5909\u66F4\u3092\u3068\u3082\u306A\u308F\u306A\u3044\u4F5C\u696D\u4F9D\u983C'},{value:'DS',desc:'\u753B\u50CF\u306E\u5DEE\u3057\u66FF\u3048\u3001\u6587\u8A00\u5909\u66F4\u3001\u30DA\u30FC\u30B8\u4F5C\u6210\u306A\u3069<br>\u30D5\u30ED\u30F3\u30C8UI\u306B\u95A2\u308F\u308B\u4F5C\u696D'},{value:'RF',desc:'\u6A5F\u80FD\u8FFD\u52A0\u3001\u4ED5\u69D8\u5909\u66F4\u3092\u3068\u3082\u306A\u308F\u306A\u3044<br>\u30D7\u30ED\u30B0\u30E9\u30E0\u69CB\u9020\u306E\u5909\u66F4\u3001\u6574\u7406\u3001\u901F\u5EA6\u6539\u5584'},{value:'IN',desc:'\u30B5\u30FC\u30D0\u30FC\u306E\u65B0\u8A2D\u3001\u30E1\u30E2\u30EA\u5897\u8A2D\u306A\u3069\u306E<br>\u30A4\u30F3\u30D5\u30E9\u4F5C\u696D\u5168\u822C'}]),f('emoji',[{value:':bug:',icon:'1F41B',desc:'\u30D0\u30B0\u4FEE\u6B63'},{value:':+1:',icon:'1F44D',desc:'\u6A5F\u80FD\u8FFD\u52A0\u30FB\u4FEE\u6B63\uFF08\u30AF\u30E9\u30B9\u3001\u30E1\u30BD\u30C3\u30C9\u3001\u95A2\u6570\u306A\u3069\u306E\u8FFD\u52A0\u30FB\u4FEE\u6B63\uFF09'},{value:':art:',icon:'1F3A8',desc:'\u30C7\u30B6\u30A4\u30F3\u4FEE\u6B63\uFF08\u30EC\u30A4\u30A2\u30A6\u30C8\u5909\u66F4\u3001\u4F59\u767D\u306E\u8ABF\u6574\u306A\u3069\uFF09'},{value:':pencil:',icon:'1F4DD',desc:'\u6587\u8A00\u306E\u4FEE\u6B63'},{value:':gem:',icon:'1F48E',desc:'\u30EA\u30D5\u30A1\u30AF\u30BF\u30EA\u30F3\u30B0'},{value:':x:',icon:'274C',desc:'\u4E0D\u8981\u306A\u6A5F\u80FD\u30FB\u30BD\u30FC\u30B9\u306E\u524A\u9664'},{value:':dress:',icon:'1F457',desc:'\u30B3\u30FC\u30C9\u30B9\u30BF\u30A4\u30EB\u306E\u4FEE\u6B63\uFF08\u7A7A\u767D\u524A\u9664\u3001\u30A4\u30F3\u30C7\u30F3\u30C8\u5909\u66F4\u306A\u3069\uFF09'},{value:':dash:',icon:'1F4A8',desc:'\u30D1\u30D5\u30A9\u30FC\u30DE\u30F3\u30B9\u6539\u5584'},{value:':up:',icon:'1F199',desc:'\u4F9D\u5B58\u30D1\u30C3\u30B1\u30FC\u30B8\u306A\u3069\u306E\u30A2\u30C3\u30D7\u30C7\u30FC\u30C8'},{value:':cop:',icon:'1F46E',desc:'\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u95A2\u9023\u306E\u6539\u5584'}])}{const c=cc.historyData.data;c.length&&(cc.form.restoreValues(c[0]),pubsub.pub('change.historyData',c))}