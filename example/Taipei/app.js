const data=window.FOOD_DATA;
const stationPositions={
  '板橋':[6,78],'善導寺':[22,54],'忠孝新生':[32,54],'忠孝復興':[43,54],'忠孝敦化':[53,54],'市政府':[68,54],
  '中正紀念堂':[22,78],'東門':[32,70],'科技大樓':[43,78],'芝山':[12,18],
  '中山國小':[22,32],'松江南京':[32,40],'南京復興':[43,40],'台北小巨蛋':[53,40],'南京三民':[68,40],'西湖':[84,24],
  '圓山':[12,28],'國父紀念館':[61,54],'龍山寺':[12,54],'北門':[13,40],'公館':[22,88],'景美':[22,96],
  '台北車站':[16,54],'大橋頭':[15,34],'西門':[13,62],'中山':[22,40],'大安':[43,68],'雙連':[18,36],
  '信義安和':[53,70],'士林':[12,12]
};
const counts=data.reduce((a,r)=>(a[r.station]=(a[r.station]||0)+1,a),{});
const map=document.getElementById('metroMap');
const colors={blue:'#2879d0',red:'#df4d59',green:'#168b5b',orange:'#ef8d30'};

function buildMap(){
  map.innerHTML=`<svg class="metro-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    <path d="M4 54 H72" class="track blue-track"/><path d="M22 86 V12" class="track red-track"/>
    <path d="M16 40 H74" class="track green-track"/><path d="M22 32 H36 V70" class="track orange-track"/>
    <path d="M74 40 L88 20" class="track orange-track"/>
  </svg>`;
  Object.entries(counts).forEach(([station,count])=>{
    const [x,y]=stationPositions[station]||[50,50]; const line=data.find(r=>r.station===station).line;
    const b=document.createElement('button'); b.className='station'; b.style.left=x+'%'; b.style.top=y+'%';
    b.style.setProperty('--station-color',colors[line]); b.dataset.station=station;
    b.innerHTML=`<span class="station-dot"><b>${count}</b></span><span class="station-name">${station}</span>`;
    b.setAttribute('aria-label',`${station}站，${count}間美食`); b.onclick=()=>filterStation(station); map.appendChild(b);
  });
}
function routeUrl(r){return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(r.station+'捷運站')}&destination=${encodeURIComponent(r.name+' '+r.address)}&travelmode=walking`;}
function imageLabel(r){return r.imageLabel||'示意圖';}
function card(r){return `<article class="restaurant-card" tabindex="0" data-name="${r.name}">
  <div class="image-wrap"><img src="${r.image}" alt="${r.name}${imageLabel(r)}" loading="lazy"><span>${imageLabel(r)}</span></div>
  <div class="card-body"><p class="card-meta"><i style="background:${colors[r.line]}"></i>${r.station}站 · 約 ${r.distance}m</p>
  <h3>${r.name}</h3><p class="category">${r.category}</p><p class="quote">${r.quote}</p>
  <div class="card-footer"><span>${r.author}</span><button aria-label="查看${r.name}詳細資料">看路線 →</button></div></div></article>`;}
function render(list=data,title='熱門推薦'){
  document.getElementById('listTitle').textContent=title;
  const grid=document.getElementById('restaurantGrid'); grid.innerHTML=list.map(card).join('');
  grid.querySelectorAll('.restaurant-card').forEach((el,i)=>{const open=()=>showDetail(list[i]);el.onclick=open;el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}}});
}
function filterStation(station){render(data.filter(r=>r.station===station),`${station}站 · ${counts[station]} 間`);document.getElementById('clearFilter').hidden=false;document.querySelector('.list-section').scrollIntoView({behavior:'smooth'});}
function showDetail(r){
  document.getElementById('sheetImage').src=r.image;document.getElementById('sheetImage').alt=r.name+imageLabel(r);
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
