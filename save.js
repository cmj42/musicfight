// save.js — tiny persistence layer (localStorage now; swap to Electron fs later)
// Pure helpers (defaultSave/migrate/markCleared/isUnlocked) are unit-testable in Node.
const KEY = 'musicfight_save_v1';

export function defaultSave(){
  return { ver:1, tutorialDone:false, clearedChapters:[], unlockedMax:0, bestScore:0 };
}

function migrate(d){
  const base = defaultSave();
  const out = Object.assign(base, d || {});
  out.ver = 1;
  if(!Array.isArray(out.clearedChapters)) out.clearedChapters = [];
  out.unlockedMax = Math.max(0, out.unlockedMax|0);
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

export function markCleared(d, idx, score){
  if(!d.clearedChapters.includes(idx)) d.clearedChapters.push(idx);
  d.unlockedMax = Math.max(d.unlockedMax, idx+1);
  if(score) d.bestScore = Math.max(d.bestScore||0, score);
  return d;
}

export function isUnlocked(d, idx){ return idx <= (d.unlockedMax|0); }
export function isCleared(d, idx){ return d.clearedChapters.includes(idx); }
