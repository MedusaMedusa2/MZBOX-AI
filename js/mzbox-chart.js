/* Injected into the MZBOX AI frame: full-width forecast chart and host theme. */
window.MZBOX_EXTRA_SCRIPT = "(function(){\n" +
"function num(v){var n=Number(v);return Number.isFinite(n)?n:0;}\n" +
"function priceText(v){try{if(typeof fmtPrice==='function')return fmtPrice(v);}catch(e){}return num(v).toLocaleString('ru-RU',{maximumFractionDigits:2});}\n" +
"function flowOf(c){\n" +
"  var h=num(c.h),l=num(c.l),cl=num(c.c),o=num(c.o)||cl;\n" +
"  var range=Math.max(h-l,Math.abs(cl)*0.0008,1e-9);\n" +
"  var clv=((cl-l)-(h-cl))/range;\n" +
"  var buy=Math.min(0.92,Math.max(0.08,0.5+clv*0.42+(cl>=o?0.06:-0.06)));\n" +
"  var vol=Math.max(0,num(c.v));\n" +
"  if(!(vol>0))vol=range*Math.max(cl,1);\n" +
"  return {buy:vol*buy,sell:vol*(1-buy)};\n" +
"}\n" +
"function hostTheme(){\n" +
"  var out={mode:'dark',bg:'#101114',card:'#1b1d22',ink:'#f4f1ea',muted:'#b7b2a6',accent:'#e08a3a',up:'#3fbf7f',down:'#e06a62',density:'normal'};\n" +
"  try{\n" +
"    var body=window.parent.document.body;\n" +
"    var cs=window.parent.getComputedStyle(body);\n" +
"    if(body.classList.contains('light'))out.mode='light';\n" +
"    else if(body.classList.contains('rose'))out.mode='rose';\n" +
"    var pick=function(name,fb){var v=(cs.getPropertyValue(name)||'').trim();return v||fb;};\n" +
"    out.bg=pick('--bg',out.bg);out.card=pick('--surface',out.card);out.ink=pick('--text',out.ink);\n" +
"    out.muted=pick('--text-dim',out.muted);out.accent=pick('--accent',out.accent);\n" +
"    out.up=pick('--ok',out.mode==='light'?'#1c7a4a':out.up);\n" +
"    out.down=pick('--warn',out.mode==='light'?'#a33d38':out.down);\n" +
"    out.density=body.classList.contains('density-super')?'super':body.classList.contains('density-compact')?'compact':'normal';\n" +
"  }catch(e){}\n" +
"  return out;\n" +
"}\n" +
"function paintHost(){\n" +
"  var t=hostTheme();\n" +
"  document.body.classList.toggle('dark',t.mode!=='light');\n" +
"  document.body.classList.toggle('rose',t.mode==='rose');\n" +
"  document.body.setAttribute('data-density',t.density);\n" +
"  var root=document.documentElement;\n" +
"  root.style.setProperty('--bg',t.bg);root.style.setProperty('--card',t.card);\n" +
"  root.style.setProperty('--ink',t.ink);root.style.setProperty('--muted',t.muted);\n" +
"  root.style.setProperty('--accent',t.accent);root.style.setProperty('--green',t.up);root.style.setProperty('--red',t.down);\n" +
"  root.style.background=t.bg;document.body.style.background=t.bg;document.body.style.color=t.ink;\n" +
"  var pad=t.density==='super'?'8px':t.density==='compact'?'11px':'16px';\n" +
"  document.body.style.setProperty('--mz-pad',pad);\n" +
"  var themeBtn=document.getElementById('themeToggle');if(themeBtn)themeBtn.remove();\n" +
"  document.querySelectorAll('.footer-legal,.build-version').forEach(function(el){el.remove();});\n" +
"  return t;\n" +
"}\n" +
"function drawChart(canvas,cs,model,currentPrice){\n" +
"  if(!canvas)return;\n" +
"  var ctx=canvas.getContext('2d');if(!ctx)return;\n" +
"  var theme=hostTheme();\n" +
"  var rect=canvas.getBoundingClientRect();\n" +
"  var dpr=Math.max(1,Math.min(2,window.devicePixelRatio||1));\n" +
"  var W=Math.max(280,rect.width||canvas.clientWidth||640);\n" +
"  var H=Math.max(260,rect.height||canvas.clientHeight||360);\n" +
"  canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);\n" +
"  canvas.style.width='100%';canvas.style.height=H+'px';\n" +
"  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);\n" +
"  model=model||{};\n" +
"  var live=num(currentPrice)||num(model.price);\n" +
"  var raw=(Array.isArray(cs)?cs:[]).map(function(c){\n" +
"    var t=typeof c.time==='string'?Date.parse(c.time):num(c.time);if(t>0&&t<1e12)t*=1000;\n" +
"    var close=num(c.c!=null?c.c:c.close),open=num(c.o!=null?c.o:c.open)||close;\n" +
"    var high=num(c.h!=null?c.h:c.high)||Math.max(open,close),low=num(c.l!=null?c.l:c.low)||Math.min(open,close);\n" +
"    return {t:t,o:open,h:Math.max(high,open,close),l:Math.min(low,open,close),c:close,v:num(c.v!=null?c.v:c.volume)};\n" +
"  }).filter(function(v){return v.t>0&&v.c>0;}).sort(function(a,b){return a.t-b.t;});\n" +
"  if(!(live>0)&&raw.length)live=raw[raw.length-1].c;\n" +
"  if(!(live>0)){ctx.fillStyle=theme.muted;ctx.font='13px sans-serif';ctx.fillText('Нет котировки для графика',16,28);return;}\n" +
"  if(!raw.length)raw=[{t:Date.now(),o:live,h:live,l:live,c:live,v:0}];\n" +
"  var maxHist=W<520?42:W<900?72:96;\n" +
"  var history=raw.slice(-maxHist);\n" +
"  var futN=Math.max(10,Math.round(history.length*0.34));\n" +
"  var step=3600000;\n" +
"  if(history.length>1){\n" +
"    var dts=[];for(var i=1;i<history.length;i++)dts.push(history[i].t-history[i-1].t);\n" +
"    dts.sort(function(a,b){return a-b;});step=Math.max(60000,dts[Math.floor(dts.length/2)]||step);\n" +
"  }\n" +
"  var rets=[];for(var r=1;r<history.length;r++)rets.push(Math.log(history[r].c/history[r-1].c));\n" +
"  var mean=rets.length?rets.reduce(function(a,b){return a+b;},0)/rets.length:0;\n" +
"  var sd=0;if(rets.length){sd=Math.sqrt(rets.reduce(function(a,b){return a+(b-mean)*(b-mean);},0)/rets.length);}\n" +
"  var atr=num(model.atrPct)>0?num(model.atrPct)/100:sd;\n" +
"  var vol=Math.max(0.0012,num(model.vol)||0,num(model.sigma)||0,atr||0,sd||0);\n" +
"  var day7=num(model.p7&&model.p7.mid)>0?Math.log(num(model.p7.mid)/live)/7:0;\n" +
"  var day30=num(model.p30&&model.p30.mid)>0?Math.log(num(model.p30.mid)/live)/30:0;\n" +
"  var drift=num(model.drift)||0;\n" +
"  var rsi=num(model.rsi)||50;\n" +
"  var rsiTilt=rsi>70?-0.0008:rsi<30?0.0008:0;\n" +
"  var macd=num(model.macd);\n" +
"  var macdTilt=macd>0?0.00035:macd<0?-0.00035:0;\n" +
"  var trend=String(model.trend||'');\n" +
"  var trendTilt=/down|bear|пад/i.test(trend)?-0.0005:/up|bull|рост/i.test(trend)?0.0005:0;\n" +
"  var perBar=Math.max(-0.012,Math.min(0.012,(drift*0.15+day7*0.45+day30*0.25)/Math.max(1,futN/6)+rsiTilt+macdTilt+trendTilt+mean*0.35));\n" +
"  var future=[];var prev=history[history.length-1].c;var now=history[history.length-1].t;\n" +
"  var seed=2166136261;var key=String(canvas.dataset.instrumentUid||live)+'|'+String(Math.round(live*100));\n" +
"  for(var s=0;s<key.length;s++){seed^=key.charCodeAt(s);seed=Math.imul(seed,16777619);}\n" +
"  var state=seed>>>0;var rnd=function(){state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};\n" +
"  var gauss=function(){return ((rnd()+rnd()+rnd()+rnd()+rnd()+rnd())-3)*0.82;};\n" +
"  var support=num(model.support),resistance=num(model.resistance);\n" +
"  for(var k=1;k<=futN;k++){\n" +
"    var open=prev;var noise=gauss()*vol*0.55;var pull=0;\n" +
"    if(support>0&&open<support*1.01)pull+=Math.min(0.006,Math.log(support/open)*0.25);\n" +
"    if(resistance>0&&open>resistance*0.99)pull+=Math.max(-0.006,Math.log(resistance/open)*0.25);\n" +
"    var stepLog=perBar+noise+pull;\n" +
"    var close=Math.max(1e-9,open*Math.exp(stepLog));\n" +
"    var wick=Math.max(vol*0.35,Math.abs(stepLog)*0.45);\n" +
"    future.push({t:now+k*step,o:open,h:Math.max(open,close)*Math.exp(wick),l:Math.min(open,close)*Math.exp(-wick),c:close,v:0,future:true,band:live*vol*Math.sqrt(k)*1.15});\n" +
"    prev=close;\n" +
"  }\n" +
"  var slots=history.concat(future);\n" +
"  var volH=Math.round(H*0.22),gap=8,axisL=58,axisB=22,axisR=8,axisT=10;\n" +
"  var priceH=H-volH-gap-axisB-axisT;\n" +
"  var plotW=W-axisL-axisR;\n" +
"  var n=slots.length;var slotW=plotW/n;\n" +
"  var lows=slots.map(function(c){return c.l-(c.band||0);});\n" +
"  var highs=slots.map(function(c){return c.h+(c.band||0);});\n" +
"  if(support>0)lows.push(support);if(resistance>0)highs.push(resistance);\n" +
"  if(num(model.bbLower)>0)lows.push(num(model.bbLower));if(num(model.bbUpper)>0)highs.push(num(model.bbUpper));\n" +
"  var min=Math.min.apply(null,lows),max=Math.max.apply(null,highs);\n" +
"  if(!(max>min)){max=live*1.02;min=live*0.98;}\n" +
"  var padY=(max-min)*0.08;min-=padY;max+=padY;\n" +
"  function yPrice(v){return axisT+(max-v)/(max-min)*priceH;}\n" +
"  function xAt(i){return axisL+(i+0.5)*slotW;}\n" +
"  var flows=slots.map(flowOf);\n" +
"  var vmax=Math.max.apply(null,flows.map(function(f){return f.buy+f.sell;}));\n" +
"  if(!(vmax>0))vmax=1;\n" +
"  var rel=num(model.relativeVolume);if(rel>0)vmax=vmax/Math.max(0.4,Math.min(rel,3));\n" +
"  ctx.fillStyle=theme.mode==='light'?'rgba(20,16,12,.04)':'rgba(255,255,255,.03)';\n" +
"  ctx.fillRect(axisL,axisT,plotW,priceH);\n" +
"  ctx.fillRect(axisL,axisT+priceH+gap,plotW,volH);\n" +
"  ctx.font='11px sans-serif';ctx.textAlign='right';ctx.textBaseline='middle';ctx.fillStyle=theme.muted;\n" +
"  for(var g=0;g<=4;g++){\n" +
"    var yy=axisT+priceH*g/4;var val=max-(max-min)*g/4;\n" +
"    ctx.strokeStyle=theme.mode==='light'?'rgba(20,16,12,.12)':'rgba(244,241,234,.12)';\n" +
"    ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(axisL,yy);ctx.lineTo(axisL+plotW,yy);ctx.stroke();\n" +
"    ctx.fillText(priceText(val),axisL-6,yy);\n" +
"  }\n" +
"  var split=history.length;\n" +
"  if(future.length){\n" +
"    ctx.fillStyle=theme.mode==='light'?'rgba(224,138,58,.08)':'rgba(224,138,58,.12)';\n" +
"    ctx.fillRect(axisL+split*slotW,axisT,plotW-split*slotW,priceH);\n" +
"    ctx.beginPath();\n" +
"    future.forEach(function(c,i){var xx=xAt(split+i),yy=yPrice(c.c+(c.band||0));if(i===0)ctx.moveTo(xAt(split-1),yPrice(history[history.length-1].c));ctx.lineTo(xx,yy);});\n" +
"    for(var j=future.length-1;j>=0;j--)ctx.lineTo(xAt(split+j),yPrice(Math.max(min,future[j].c-(future[j].band||0))));\n" +
"    ctx.closePath();ctx.fillStyle=theme.mode==='light'?'rgba(224,138,58,.16)':'rgba(224,138,58,.2)';ctx.fill();\n" +
"  }\n" +
"  function level(value,color){if(!(value>0)||value<min||value>max)return;var yy=yPrice(value);ctx.save();ctx.strokeStyle=color;ctx.setLineDash([4,4]);ctx.beginPath();ctx.moveTo(axisL,yy);ctx.lineTo(axisL+plotW,yy);ctx.stroke();ctx.restore();}\n" +
"  level(support,theme.up);level(resistance,theme.down);level(num(model.bbUpper),theme.accent);level(num(model.bbLower),theme.accent);\n" +
"  var ema=[],alpha=2/21,acc=history[0].c;\n" +
"  history.forEach(function(c){acc=alpha*c.c+(1-alpha)*acc;ema.push(acc);});\n" +
"  ctx.beginPath();ctx.strokeStyle=theme.accent;ctx.lineWidth=1.4;ema.forEach(function(v,i){var xx=xAt(i),yy=yPrice(v);if(i===0)ctx.moveTo(xx,yy);else ctx.lineTo(xx,yy);});ctx.stroke();\n" +
"  var bodyW=Math.max(2.2,slotW*0.62);\n" +
"  slots.forEach(function(c,i){\n" +
"    var up=c.c>=c.o;var col=up?theme.up:theme.down;var xx=xAt(i);\n" +
"    ctx.globalAlpha=c.future?0.78:1;ctx.strokeStyle=col;ctx.fillStyle=col;ctx.lineWidth=1;\n" +
"    ctx.beginPath();ctx.moveTo(xx,yPrice(c.h));ctx.lineTo(xx,yPrice(c.l));ctx.stroke();\n" +
"    var top=yPrice(Math.max(c.o,c.c)),bot=yPrice(Math.min(c.o,c.c));\n" +
"    ctx.fillRect(xx-bodyW/2,top,bodyW,Math.max(1.4,bot-top));\n" +
"    var f=flows[i];var base=axisT+priceH+gap+volH;\n" +
"    var bh=(f.buy/vmax)*volH,sh=(f.sell/vmax)*volH;\n" +
"    ctx.globalAlpha=c.future?0.55:0.95;ctx.fillStyle=theme.up;ctx.fillRect(xx-bodyW/2,base-bh,bodyW,bh);\n" +
"    ctx.fillStyle=theme.down;ctx.fillRect(xx-bodyW/2,base-bh-sh,bodyW,sh);\n" +
"    ctx.globalAlpha=1;\n" +
"  });\n" +
"  var liveY=yPrice(live);ctx.strokeStyle=theme.ink;ctx.setLineDash([3,3]);ctx.beginPath();ctx.moveTo(axisL,liveY);ctx.lineTo(axisL+plotW,liveY);ctx.stroke();ctx.setLineDash([]);\n" +
"  ctx.save();ctx.fillStyle=theme.card;ctx.fillRect(axisL-56,liveY-8,50,16);ctx.fillStyle=theme.ink;ctx.font='11px sans-serif';ctx.textAlign='right';ctx.textBaseline='middle';ctx.fillText(priceText(live),axisL-6,liveY);ctx.restore();\n" +
"  ctx.fillStyle=theme.muted;ctx.textAlign='center';ctx.textBaseline='alphabetic';ctx.font='10px sans-serif';\n" +
"  var minGap=W<520?86:108,lastLabel=-999;\n" +
"  slots.forEach(function(c,i){var xx=xAt(i);if(xx-lastLabel<minGap&&i!==n-1)return;lastLabel=xx;var dt=new Date(c.t);var label=String(dt.getDate()).padStart(2,'0')+'.'+String(dt.getMonth()+1).padStart(2,'0')+' '+String(dt.getHours()).padStart(2,'0')+':00';ctx.fillText(label,Math.max(axisL+36,Math.min(axisL+plotW-36,xx)),H-4);});\n" +
"  ctx.textAlign='left';ctx.textBaseline='top';ctx.fillText('покупка / продажа',axisL+6,axisT+priceH+gap+4);\n" +
"  if(future.length){ctx.fillStyle=theme.accent;ctx.fillText('прогноз',axisL+split*slotW+4,axisT+14);}\n" +
"  canvas._mzSlots=slots;canvas._mzGeom={W:W,H:H,axisL:axisL,plotW:plotW,slotW:slotW,yPrice:yPrice,xAt:xAt,theme:theme,priceText:priceText};\n" +
"  if(!canvas._mzBound){\n" +
"    canvas._mzBound=true;\n" +
"    var tip=document.createElement('div');\n" +
"    tip.className='mz-cross-tip';\n" +
"    tip.style.cssText='position:absolute;z-index:5;pointer-events:none;display:none;padding:8px 10px;border-radius:10px;font:12px/1.35 sans-serif;max-width:220px;';\n" +
"    var host=canvas.parentElement||canvas;if(host&&getComputedStyle(host).position==='static')host.style.position='relative';host.appendChild(tip);\n" +
"    var move=function(ev){\n" +
"      var g=canvas._mzGeom,list=canvas._mzSlots;if(!g||!list)return;\n" +
"      var pt=ev.touches?ev.touches[0]:ev;var box=canvas.getBoundingClientRect();\n" +
"      var px=(pt.clientX-box.left)*(g.W/box.width);\n" +
"      var idx=Math.max(0,Math.min(list.length-1,Math.round((px-g.axisL)/g.slotW-0.5)));\n" +
"      var c=list[idx];if(!c){tip.style.display='none';return;}\n" +
"      var f=flowOf(c);var when=new Date(c.t);\n" +
"      tip.style.display='block';tip.style.left=Math.min(box.width-180,Math.max(8,pt.clientX-box.left+12))+'px';tip.style.top='12px';\n" +
"      tip.style.background=g.theme.card;tip.style.color=g.theme.ink;tip.style.border='1px solid '+g.theme.muted;\n" +
"      tip.innerHTML='<b>'+(c.future?'Прогноз · ':'')+when.toLocaleString('ru-RU',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'})+'</b><br>O '+g.priceText(c.o)+'  H '+g.priceText(c.h)+'<br>L '+g.priceText(c.l)+'  C '+g.priceText(c.c)+'<br>Покупка '+Math.round(f.buy)+' · Продажа '+Math.round(f.sell);\n" +
"    };\n" +
"    canvas.addEventListener('mousemove',move);\n" +
"    canvas.addEventListener('mouseleave',function(){tip.style.display='none';});\n" +
"    canvas.addEventListener('touchstart',function(ev){move(ev);},{passive:true});\n" +
"    canvas.addEventListener('touchmove',function(ev){move(ev);},{passive:true});\n" +
"  }\n" +
"  canvas._mzRedraw=function(){drawChart(canvas,cs,model,currentPrice);};\n" +
"}\n" +
"window.drawChart=drawChart;\n" +
"window.__mzDraw=drawChart;\n" +
"window.__mzPaint=paintHost;\n" +
"paintHost();\n" +
"try{\n" +
"  var hostBody=window.parent.document.body;\n" +
"  new MutationObserver(function(){paintHost();if(window.S&&Array.isArray(S.rows)){S.rows.forEach(function(r,i){var c=document.getElementById('chart-'+i);if(c&&r.chartCandles)drawChart(c,r.chartCandles,r.model,r.price);});}}).observe(hostBody,{attributes:true,attributeFilter:['class','style']});\n" +
"}catch(e){}\n" +
"if(window.S&&Array.isArray(S.rows)){S.rows.forEach(function(r,i){var c=document.getElementById('chart-'+i);if(c&&r.chartCandles)drawChart(c,r.chartCandles,r.model,r.price);});}\n" +
"})();";
