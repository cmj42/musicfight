// save.js — tiny persistence layer (localStorage now; swap to Electron fs later)
// v2: per-LEVEL progress (indices into LEVELS). Pure helpers are unit-testable in Node.
const KEY = 'musicfight_save_v1';   // storage key kept stable; internal `ver` tracks schema

export function defaultSave(){
  return { ver:2, tutorialDone:false,
           clearedLevels:[], unlockedMax:0, lastLevel:0, seenScenes:[],
           bestScore:0, settings:{} };
}

function migrate(d){
  const base = defaultSave();
  // v1 (old chapter placeholders, no real content) → reset progress, KEEP settings
  if(!d || (d.ver|0) < 2){
    base.settings = (d && typeof d.settings==='object' && d.settings) ? d.settings : {};
    if(d && typeof d.tutorialDone==='boolean') base.tutorialDone = d.tutorialDone;
    return base;
  }
  const out = Object.assign(base, d);
  out.ver = 2;
  if(!Array.isArray(out.clearedLevels)) out.clearedLevels = [];
  if(!Array.isArray(out.seenScenes))    out.seenScenes = [];
  out.unlockedMax = Math.max(0, out.unlockedMax|0);
  out.lastLevel   = Math.max(0, out.lastLevel|0);
  if(typeof out.settings!=='object' || out.settings===null) out.settings = {};
  return out;
}

export function loadSaveData(){
  try{
    const raw = (typeof localStorage!=='undefined') ? localStorage.getItem(KEY) : null;
    return raw ? migrate(JSON.parse(raw)) : defaultSave();
  }catch(e){ console.warn('save load failed:', e); return defaultSave(); }
}

export function writeSaveData(d){
  try{ if(typeof localStorage!=='undefined') localStorage.setItem(KEY, JSON.stringify(d)); }
  catch(e){ console.warn('save write failed:', e); }
}

// progress is per LEVEL index (position in LEVELS)
export function markCleared(d, idx, score){
  if(!d.clearedLevels.includes(idx)) d.clearedLevels.push(idx);
  d.unlockedMax = Math.max(d.unlockedMax, idx+1);
  d.lastLevel   = idx;
  if(score) d.bestScore = Math.max(d.bestScore||0, score);
  return d;
}
export function isUnlocked(d, idx){ return idx <= (d.unlockedMax|0); }
export function isCleared(d, idx){ return d.clearedLevels.includes(idx); }

// cutscenes already viewed (so replays can skip)
export function markSceneSeen(d, id){ if(!d.seenScenes.includes(id)) d.seenScenes.push(id); return d; }
export function isSceneSeen(d, id){ return Array.isArray(d.seenScenes) && d.seenScenes.includes(id); }
