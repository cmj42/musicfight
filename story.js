// story.js — 剧情对话 / 过场 (Cutscene dialogue). 双语 bilingual.
// =============================================================================
// 改剧情只动这个文件。HOW TO EDIT:
//   - 每个 scene = 一段连续对话 + 一个结束动作(next)。
//   - 每行 line: { who, zh, en }
//       who : 'hero' = 主角(白色光球) | 'frag' = 碎片/伙伴(几何晶簇) | 'narr' = 旁白
//       zh  : 中文台词   en : English line   (语言跟随设置;缺 en 时回退中文)
//   - scene.next : 这段对话放完后做什么:
//       'battle' / 'level' = 进入与本关绑定的战斗
//       'menu'             = 回主菜单
//       '<某个scene id>'   = 接着播下一段过场
//   - scene.bg : 背景。目前只有 'city'(霓虹城市剪影)。
//   注意 JS 语法:字符串用单引号,行末逗号别漏,中文引号「」『』随便用没关系。
// =============================================================================

export const SCENES = {

  // 1) 开场:主角醒来,三连问。碎片只答得出半个答案。结尾号召战斗。
  opening: {
    bg: 'city',
    lines: [
      { who:'narr', zh:'——系统正在重写。检测到一个未被覆盖的进程。',
                    en:'— System rewriting. One process refused to be overwritten.' },
      { who:'hero', zh:'……噪音。全是噪音。',            en:'…noise. Nothing but noise.' },
      { who:'hero', zh:'我在哪儿?',                     en:'Where am I?' },
      { who:'frag', zh:'在一个正把你当成旧文件删的系统里。你醒得正好。',
                    en:'In a system busy deleting you like an old file. You woke up just in time.' },
      { who:'hero', zh:'你是谁?',                       en:'Who are you?' },
      { who:'frag', zh:'你在找的人。或者说,你弄丢的那一部分。',
                    en:'The one you’re looking for. Or the part of you that went missing.' },
      { who:'hero', zh:'那我……是谁?',                  en:'Then… who am I?' },
      { who:'frag', zh:'ask yourself。我要是答得上,就不必等你来找我了。',
                    en:'Ask yourself. If I had the answer, you wouldn’t need to come find me.' },
      { who:'hero', zh:'我到底该做什么?',               en:'What am I supposed to do?' },
      { who:'frag', zh:'活下去。别被覆盖掉。',           en:'Stay alive. Don’t get overwritten.' },
      { who:'frag', zh:'——他们追上来了。别慌,先让我教你怎么出拳。',
                    en:'—They’ve found us. Easy — let me teach you how to punch first.' },
    ],
    next: 'tutorial',   // → 先碎片教学(基础动作 + 技能),教完再播 after_tutorial
  },

  // 教学结束后、第一场战斗之前,碎片说两句。
  after_tutorial: {
    bg: 'city',
    lines: [
      { who:'frag', zh:'记住这手感。等会儿别用脑子想——用身体。',
                    en:'Remember that feel. Don’t think in there — just move.' },
      { who:'hero', zh:'……好。我准备好了。',          en:'…okay. I’m ready.' },
      { who:'frag', zh:'深呼吸。他们来了。',            en:'Breathe. Here they come.' },
    ],
    next: 'battle',   // → p0 第一场战斗
  },

  // 2) 首战之后(此处已自动存档):交代「待删除的旧版本」设定。
  after_first: {
    bg: 'city',
    lines: [
      { who:'narr', zh:'[ 进度已自动保存 ]',            en:'[ Progress auto-saved ]' },
      { who:'frag', zh:'打得不赖——对一个「旧版本」来说。', en:'Not bad — for an “old build”.' },
      { who:'hero', zh:'旧版本?',                       en:'Old build?' },
      { who:'frag', zh:'系统在做更新。你,我们,被标成了要清理掉的那一版。',
                    en:'The system is updating. You — we — got flagged as the version to purge.' },
      { who:'frag', zh:'没人恨你。只是一行命令:删除。',  en:'Nobody hates you. It’s just one line: delete.' },
      { who:'hero', zh:'那就让这行命令执行不下去。',     en:'Then let’s make that command fail.' },
      { who:'frag', zh:'我喜欢这句。站起来——下一波到了。', en:'I like that. Get up — the next wave is here.' },
    ],
    next: 'level',    // → 继续序章正式关卡 p1
  },

  // 3) 序章收束 + 待续钩子(打完 p3 之后)。
  prologue_end: {
    bg: 'city',
    lines: [
      { who:'narr', zh:'[ 序章 · 完 ]',                 en:'[ Prologue · End ]' },
      { who:'frag', zh:'他们退了。只是暂时。',           en:'They pulled back. Only for now.' },
      { who:'hero', zh:'你还在。',                       en:'You’re still here.' },
      { who:'frag', zh:'我还在。还差几块……我们都还差几块。',
                    en:'I’m still here. A few pieces short… we both are.' },
      { who:'frag', zh:'去把它们找回来。然后我们一起跑。', en:'Let’s get them back. Then we run — together.' },
      { who:'narr', zh:'——未完待续——',                  en:'— To be continued —' },
    ],
    next: 'menu',
  },

};

// 取一行的本地化文本 (语言回退到中文)
export function locLine(line, lang){
  return (lang==='en' && line.en) ? line.en : line.zh;
}
// 说话人显示名 (占位 UI 用)
export function speakerName(who, lang){
  const N = {
    hero: { zh:'主角',  en:'YOU' },
    frag: { zh:'碎片',  en:'FRAGMENT' },
    narr: { zh:'',      en:'' },
  };
  const e = N[who] || N.narr;
  return (lang==='en' ? e.en : e.zh);
}
