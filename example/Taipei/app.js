const data=window.FOOD_DATA.map(r=>{
  const featured=window.FOOD_IMAGES?.[r.name];
  return featured?{...r,fallbackImage:r.image,...featured}:r;
});
const stationLayout={
  '板橋':{x:5,y:52,p:'below',line:'blue'},'龍山寺':{x:12,y:52,p:'above',line:'blue'},'西門':{x:20,y:52,p:'below',line:'blue'},
  '台北車站':{x:32,y:52,p:'below',line:'blue',transfer:true},'善導寺':{x:40,y:52,p:'above',line:'blue'},
  '忠孝新生':{x:49,y:52,p:'below',line:'blue',transfer:true},'忠孝復興':{x:58,y:52,p:'above',line:'blue',transfer:true},
  '忠孝敦化':{x:67,y:52,p:'below',line:'blue'},'國父紀念館':{x:76,y:52,p:'above',line:'blue'},'市政府':{x:85,y:52,p:'below',line:'blue'},
  '士林':{x:32,y:8,p:'right',line:'red'},'芝山':{x:32,y:15,p:'left',line:'red'},'圓山':{x:32,y:23,p:'right',line:'red'},
  '雙連':{x:32,y:31,p:'left',line:'red'},'中山':{x:32,y:40,p:'above',line:'red',transfer:true},
  '中正紀念堂':{x:32,y:66,p:'left',line:'red',transfer:true},'東門':{x:49,y:66,p:'right',line:'orange',transfer:true},
  '大安':{x:58,y:73,p:'left',line:'red',transfer:true},'信義安和':{x:67,y:73,p:'below',line:'red'},
  '公館':{x:32,y:84,p:'right',line:'green'},'景美':{x:32,y:94,p:'right',line:'green'},
  '北門':{x:20,y:40,p:'above',line:'green'},'松江南京':{x:49,y:40,p:'above',line:'green',transfer:true},
  '南京復興':{x:58,y:40,p:'above',line:'green',transfer:true},'台北小巨蛋':{x:68,y:40,p:'above',line:'green'},'南京三民':{x:80,y:40,p:'right',line:'green'},
  '大橋頭':{x:20,y:23,p:'left',line:'orange'},'中山國小':{x:40,y:31,p:'right',line:'orange'},
  '西湖':{x:88,y:16,p:'right',line:'brown'},'科技大樓':{x:67,y:81,p:'below',line:'brown'}
};
const counts=data.reduce((a,r)=>(a[r.station]=(a[r.station]||0)+1,a),{});
const map=document.getElementById('metroMap');
const colors={blue:'#0070bd',red:'#e3002c',green:'#008659',orange:'#f8b61c',brown:'#c48c31'};

function buildMap(){
  map.innerHTML=`<svg class="metro-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    <path d="M5 52 H85" class="track blue-track"/><path d="M32 8 V73 H67" class="track red-track"/>
    <path d="M20 40 H80 M32 40 V94" class="track green-track"/>
    <path d="M20 23 L40 31 L49 40 V66 H32" class="track orange-track"/>
    <path d="M88 16 L58 40 V73 L67 81" class="track brown-track"/>
  </svg>`;
  Object.entries(counts).forEach(([station,count])=>{
    const layout=stationLayout[station]||{x:50,y:50,p:'below',line:data.find(r=>r.station===station).line};
    const b=document.createElement('button'); b.className=`station label-${layout.p}${layout.transfer?' is-transfer':''}`; b.style.left=layout.x+'%'; b.style.top=layout.y+'%';
    b.style.setProperty('--station-color',colors[layout.line]); b.dataset.station=station;
    b.innerHTML=`<span class="station-node" aria-hidden="true"></span><span class="station-label"><span class="station-name">${station}</span><b class="station-count" aria-hidden="true">${count}</b></span>`;
    b.setAttribute('aria-label',`${station}站，${count}間美食`); b.onclick=()=>filterStation(station); map.appendChild(b);
  });
}
function routeUrl(r){return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(r.station+'捷運站')}&destination=${encodeURIComponent(r.name+' '+r.address)}&travelmode=walking`;}
function imageLabel(r){return r.imageLabel||'料理示意圖';}
function card(r){return `<article class="restaurant-card" tabindex="0" data-name="${r.name}">
  <div class="image-wrap"><img src="${r.image}" data-fallback="${r.fallbackImage||''}" alt="${r.name}${imageLabel(r)}" loading="lazy" decoding="async"><span>${imageLabel(r)}</span></div>
  <div class="card-body"><p class="card-meta"><i style="background:${colors[r.line]}"></i>${r.station}站 · 約 ${r.distance}m</p>
  <h3>${r.name}</h3><p class="category">${r.category}</p><p class="quote">${r.quote}</p>
  <div class="card-footer"><span>${r.author}</span><button aria-label="查看${r.name}詳細資料">看路線 →</button></div></div></article>`;}
function render(list=data,title='熱門推薦'){
  document.getElementById('listTitle').textContent=title;
  const grid=document.getElementById('restaurantGrid'); grid.innerHTML=list.map(card).join('');
  grid.querySelectorAll('img[data-fallback]').forEach(img=>img.onerror=()=>{if(img.dataset.fallback&&img.src!==img.dataset.fallback){img.src=img.dataset.fallback;img.closest('.image-wrap').querySelector('span').textContent='料理示意圖';}});
  grid.querySelectorAll('.restaurant-card').forEach((el,i)=>{const open=()=>showDetail(list[i]);el.onclick=open;el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}}});
}
function filterStation(station){render(data.filter(r=>r.station===station),`${station}站 · ${counts[station]} 間`);document.getElementById('clearFilter').hidden=false;document.querySelector('.list-section').scrollIntoView({behavior:'smooth'});}
function showDetail(r){
  const detailImage=document.getElementById('sheetImage');detailImage.src=r.image;detailImage.alt=r.name+imageLabel(r);detailImage.onerror=()=>{if(r.fallbackImage&&detailImage.src!==r.fallbackImage)detailImage.src=r.fallbackImage;};
  document.getElementById('sheetMeta').innerHTML=`<i style="background:${colors[r.line]}"></i>${r.station}站 · 約 ${r.distance}m · ${r.category}`;
  document.getElementById('sheetName').textContent=r.name;document.getElementById('sheetQuote').textContent=r.quote;document.getElementById('sheetAddress').textContent='⌖ '+r.address;
  document.getElementById('routeButton').href=routeUrl(r);document.getElementById('threadButton').href=r.thread;
  const sheet=document.getElementById('detailSheet');sheet.classList.add('open');sheet.setAttribute('aria-hidden','false');document.body.classList.add('no-scroll');
}
function closeDetail(){const s=document.getElementById('detailSheet');s.classList.remove('open');s.setAttribute('aria-hidden','true');document.body.classList.remove('no-scroll');}
document.getElementById('restaurantCount').textContent=data.length;document.getElementById('stationCount').textContent=Object.keys(counts).length;
document.getElementById('clearFilter').onclick=()=>{render();document.getElementById('clearFilter').hidden=true;};
document.getElementById('searchToggle').onclick=()=>{const p=document.getElementById('searchPanel');p.hidden=!p.hidden;if(!p.hidden)document.getElementById('searchInput').focus();};
document.getElementById('searchInput').oninput=e=>{const q=e.target.value.trim().toLowerCase();render(data.filter(r=>[r.name,r.station,r.category,r.quote].join(' ').toLowerCase().includes(q)),q?`搜尋「${e.target.value}」`:'熱門推薦');};
document.getElementById('closeSheet').onclick=closeDetail;document.getElementById('sheetBackdrop').onclick=closeDetail;document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDetail();});
buildMap();render();
