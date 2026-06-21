// chapters.js — 章节 (Chapter) → 关卡 (Level) 结构. 数据驱动,逐关解锁/存档.
// 主题:"在要删除你的系统里坚持我是谁、我爱谁" — 敌人由外(别人)到内(自己).
// 进度以 LEVELS 的「下标」为准:unlockedMax / clearedLevels / lastLevel 都是 index.

export const CHAPTERS = [
  { id:'prologue', title:'序章', subtitle:'他们在追你', title_en:'Prologue', subtitle_en:'They are hunting you',
    levels:['p0','p1','p2','p3'] },
  // 后续章节(coming soon,占位锁定):
  { id:'ch1', title:'第一章', subtitle:'敬请期待', title_en:'Chapter 1', subtitle_en:'Coming soon',
    levels:[], locked:true },
];

// 关卡难度字段(调手感就改这里):
//   enemyHP  = 敌人血量(越高越久)
//   gapMul   = 敌人攻击间隔倍率(× 一拍);越大越稀疏 = 越简单。基础对波约 1.5。
//   approach = 光球从出现到抵达的毫秒(越大越慢 = 反应时间越长 = 越简单)
//   noSkills = true 时本关没有技能(序章技能尚未解锁)
//   hint     = 开局几秒显示的提示 {zh,en}(可空)
export const LEVELS = [
  { id:'p0', no:'0-0', title:'觉醒之战', subtitle:'先学会出拳', title_en:'Awakening', subtitle_en:'Learn to punch',
    bgm:'skill_battle_test.mid',                                    bpm:132, enemyHP:40, gapMul:2.6, approach:1800,
    noSkills:true, tutorial:true, pre:'opening', post:'after_first1',
    hint:{ zh:'对应出拳，在敌方攻击抵达判定线前把它破解掉！', en:'Punch the matching lane — break each attack before it reaches the line!' } },
  { id:'p1', no:'0-1', title:'红线内核', subtitle:'追兵压上', title_en:'Redline Kernel', subtitle_en:'The chase closes in',
    bgm:'assets/battle_bgm_dark_cyber_metal_02_redline_kernel.mid', bpm:150, enemyHP:80, gapMul:2.2, approach:1800,
    noSkills:true, post:'after_p1',
    hint:{ zh:'追兵更快了——盯住每颗光球的轨道。', en:'They’re faster now — watch each orb’s lane.' } },
  { id:'p2', no:'0-2', title:'空铸厂',   subtitle:'冷的清理程序', title_en:'Null Foundry', subtitle_en:'A cold purge process',
    bgm:'assets/battle_bgm_dark_cyber_metal_03_null_foundry.mid',   bpm:138, enemyHP:100, gapMul:2.1, approach:1800,
    noSkills:true, post:'after_p2' },
  { id:'p3', no:'0-3', title:'黑冰',     subtitle:'防火墙撕开', title_en:'Black Ice', subtitle_en:'Firewall breach',
    bgm:'assets/battle_bgm_dark_cyber_metal_01_black_ice.mid',      bpm:128, enemyHP:120, gapMul:2.0, approach:1800,
    noSkills:true, post:'prologue_end' },
];

// ---- lookups ----
export function levelIndexById(id){ return LEVELS.findIndex(l=>l.id===id); }
export function levelById(id){ return LEVELS.find(l=>l.id===id) || null; }
export function chapterOfLevel(idx){             // which chapter a level index belongs to
  const id = LEVELS[idx] && LEVELS[idx].id;
  return CHAPTERS.find(c=>c.levels.includes(id)) || null;
}
export function levelIndicesOfChapter(ch){       // [global LEVELS indices] for a chapter
  return (ch.levels||[]).map(levelIndexById).filter(i=>i>=0);
}

// ---- language-aware labels ----
export function chTitle(ch, lang){ return (lang==='en' && ch.title_en) ? ch.title_en : ch.title; }
export function chSub(ch, lang){ return (lang==='en' && ch.subtitle_en) ? ch.subtitle_en : ch.subtitle; }
export function lvTitle(lv, lang){ return (lang==='en' && lv.title_en) ? lv.title_en : lv.title; }
export function lvSub(lv, lang){ return (lang==='en' && lv.subtitle_en) ? lv.subtitle_en : lv.subtitle; }
export function lvHint(lv, lang){ return lv && lv.hint ? ((lang==='en' && lv.hint.en) ? lv.hint.en : lv.hint.zh) : ''; }
