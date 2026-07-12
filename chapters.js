// chapters.js — 章节 (Chapter) → 关卡 (Level) 结构. 数据驱动,逐关解锁/存档.
// 主题:"在要删除你的系统里坚持我是谁、我爱谁" — 敌人由外(别人)到内(自己).
// 进度以 LEVELS 的「下标」为准:unlockedMax / clearedLevels / lastLevel 都是 index.

export const CHAPTERS = [
  { id:'prologue', title:'序章', subtitle:'他们在追你', title_en:'Prologue', subtitle_en:'They are hunting you',
    levels:['p0','p1','p2','p3'] },
  { id:'ch1', title:'第一章 · 逃亡', subtitle:'红线在追你', title_en:'Ch.1 · Escape', subtitle_en:'Redline is hunting you',
    levels:['c1_1','c1_2','c1_3','c1_boss','c1_self'] },
  { id:'ch2', title:'第二章 · 流亡', subtitle:'自由地', title_en:'Ch.2 · Exile', subtitle_en:'The freeland',
    levels:['c2_1','c2_2','c2_3','c2_boss','c2_self'] },
  { id:'ch3', title:'第三章 · 断后', subtitle:'崩塌', title_en:'Ch.3 · Rearguard', subtitle_en:'Collapse',
    levels:['c3_1','c3_2','c3_3','c3_self','c3_escape'] },
  // 后续章节(coming soon,占位锁定):
  { id:'ch4', title:'第四章 · 编外', subtitle:'一份配额,两份班', title_en:'Ch.4 · Off-books', subtitle_en:'One quota, two shifts',
    levels:['c4_1','c4_2','c4_3','c4_self','c4_boss'] },
  // 后续章节(coming soon,占位锁定):
  { id:'ch5', title:'第五章', subtitle:'敬请期待', title_en:'Chapter 5', subtitle_en:'Coming soon',
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
  { id:'p1', no:'0-1', title:'黑冰', subtitle:'追兵压上', title_en:'Black Ice', subtitle_en:'The chase closes in',
    bgm:'assets/battle_bgm_dark_cyber_metal_02_black_ice.mid', bpm:128, enemyHP:80, gapMul:2.2, approach:1800,
    noSkills:true, post:'after_p1',
    hint:{ zh:'追兵更快了——盯住每颗光球的轨道。', en:'They’re faster now — watch each orb’s lane.' } },
  { id:'p2', no:'0-2', title:'空铸厂',   subtitle:'冷的清理程序', title_en:'Null Foundry', subtitle_en:'A cold purge process',
    bgm:'assets/battle_bgm_dark_cyber_metal_01_null_foundry.mid',   bpm:138, enemyHP:100, gapMul:2.1, approach:1800,
    noSkills:true, post:'after_p2' },
  { id:'p3', no:'0-3', title:'红线内核',     subtitle:'防火墙撕开', title_en:'Redline Kernel', subtitle_en:'Firewall breach',
    bgm:'assets/battle_bgm_dark_cyber_metal_03_redline_kernel.mid',      bpm:150, enemyHP:120, gapMul:2.0, approach:1800,
    noSkills:true, post:'prologue_end' },

  // 第一章 · 逃亡(红线)。第一个技能(挽留)在 c1_self 末尾才确立 → 本章战斗仍 noSkills。
  // boss:true = 红线组长(红色乱线);self:true = 自我探索(内心世界 mind 背景 + 彩色乱线裹住主角光球)。
  { id:'c1_1', no:'1-1', title:'红线先遣', subtitle:'闯施工点', title_en:'Redline Scout', subtitle_en:'The build site',
    bgm:'assets/battle_bgm_dark_industrial_cyberpunk_01_static_angel.mid', bpm:132, enemyHP:90,  gapMul:2.3, approach:1800,
    noSkills:true, pre:'c1_intro', post:'c1_after1',
    hint:{ zh:'红线的人不是二流黑客——盯准轨道再出拳。', en:'Redline isn’t a script kiddie — read the lane, then punch.' } },
  { id:'c1_2', no:'1-2', title:'网络边墙', subtitle:'熟悉的结构', title_en:'The Wall', subtitle_en:'A familiar structure',
    bgm:'assets/battle_bgm_dark_industrial_cyberpunk_02_neon_riot.mid',    bpm:146, enemyHP:110, gapMul:2.2, approach:1800,
    noSkills:true, post:'c1_after2' },
  { id:'c1_3', no:'1-3', title:'聚众围捕', subtitle:'一起上吧', title_en:'Swarmed', subtitle_en:'all at once',
    bgm:'assets/battle_bgm_dark_industrial_cyberpunk_03_zero_day.mid',     bpm:158, enemyHP:130, gapMul:2.1, approach:1800,
    noSkills:true, post:'c1_after3' },
  { id:'c1_boss', no:'1-B', title:'红线组长', subtitle:'她认得你', title_en:'Redline Lead', subtitle_en:'She knows you',
    bgm:'assets/boss_bgm_dark_industrial_cyberpunk_01_black_cathedral.mid', bpm:156, enemyHP:220, gapMul:2.0, approach:1750,
    noSkills:true, boss:true, pre:'c1_boss_pre', post:'c1_boss_post',
    hint:{ zh:'BOSS 战——血厚、攻势紧，稳住节奏。', en:'Boss — high HP, tight pressure. Hold your rhythm.' } },
  { id:'c1_self', no:'1-S', title:'丧失 · 难以拥有', subtitle:'穿过记忆', title_en:'Loss', subtitle_en:'Through the memory',
    bgm:'assets/selfbgm_01_through_memory.mid',  bpm:152, enemyHP:150, gapMul:2.1, approach:1800,
    noSkills:true, self:true, pre:'c1_self_pre', post:'c1_self_post' },

  // 第二章 · 流亡(自由地)。「挽留」在第一章末确立并自动装备 → 本章战斗开放技能(无 noSkills):
  // 技能就绪后双拳上/下击发动,跟着亮起的轨道完成连招。曲目按节拍由慢到快:138→150→152→164(boss)→176(self)。
  // approach 在 startLevel 里会吸附到整数拍。
  { id:'c2_1', no:'2-1', title:'自由地', subtitle:'验明正身', title_en:'The Freeland', subtitle_en:'Prove who you are',
    bgm:'assets/chapter2_bgm_free_digital_life_03_packet_storm_bloom.mid', bpm:138, enemyHP:130, gapMul:2.2, approach:1700,
    pre:'c2_intro', post:'c2_after1',
    hint:{ zh:'技能上线!「挽留」就绪时双拳同时向下击 = 打开技能窗 → 跟着亮起的轨道出拳完成连招 = 回血。', en:'Skills are live! When Tether is READY, punch both fists DOWN to open it — then punch the lit lanes in order to heal.' } },
  { id:'c2_2', no:'2-2', title:'模拟墙', subtitle:'复刻的事故现场', title_en:'Sim Wall', subtitle_en:'A replayed accident',
    bgm:'assets/chapter2_bgm_free_digital_life_01_feral_packet.mid',       bpm:150, enemyHP:150, gapMul:2.1, approach:1650,
    pre:'c2_before2', post:'c2_after2' },
  { id:'c2_3', no:'2-3', title:'悬赏入口', subtitle:'有人卖了你的坐标', title_en:'Bounty Portal', subtitle_en:'Someone sold your coords',
    bgm:'assets/chapter2_bgm_free_digital_life_05_unbound_signal.mid',     bpm:152, enemyHP:170, gapMul:2.0, approach:1600,
    pre:'c2_before3', post:'c2_after3' },
  { id:'c2_boss', no:'2-B', title:'摆渡', subtitle:'管理员的处置', title_en:'Ferry', subtitle_en:'The keeper’s judgment',
    bgm:'assets/chapter2_bgm_free_digital_life_02_recursive_hunger.mid',   bpm:164, enemyHP:260, gapMul:2.0, approach:1700,
    boss:true, pre:'c2_boss_pre', post:'c2_boss_post',
    hint:{ zh:'BOSS 战——她还没全力。血厚压势紧,趁「挽留」就绪回血续命。', en:'Boss — she hasn’t gone all-out. High HP, hard pressure; heal with Tether when it’s READY.' } },
  { id:'c2_self', no:'2-S', title:'共谋之血', subtitle:'被害者围住你', title_en:'Blood Debt', subtitle_en:'The victims circle you',
    bgm:'assets/chapter2_bgm_free_digital_life_04_glass_mind_riot.mid',    bpm:176, enemyHP:180, gapMul:2.1, approach:1700,
    self:true, pre:'c2_self_pre', post:'c2_self_post' },

  // 第三章 · 断后(物理爆破)。c3_1 = 多阶段车轮战:phases=3 条血条打满,第 4 波开打数秒后触发爆破中断(非胜非败→post)。
  // 清道夫是"人"不是关底(boss 标记已摘除);本章高潮 = c3_escape 坍塌穿梭(逃脱模式)。
  // 技能「延音」在 c3_self 末确立;模块「保活」(id buffer)在 c3_rescue 从人保会数据残片接入。
  { id:'c3_1', no:'3-1', title:'猎杀集群', subtitle:'一波一波来', title_en:'Hunter Cluster', subtitle_en:'One wave at a time',
    bgm:'assets/chapter3_bgm_collapse_01_hunter_relay.mid',   bpm:140, enemyHP:110, gapMul:2.1, approach:1700,
    phases:3, abortWave:true, abortAfterMs:11000, pre:'c3_intro', post:'c3_after1',
    hint:{ zh:'车轮战——敌人一波接一波,稳住节奏别被换波带乱。', en:'Wave fight — they keep coming. Hold your rhythm through the swaps.' } },
  { id:'c3_2', no:'3-2', title:'资产回收人', subtitle:'趁乱捞货', title_en:'Asset Recovery', subtitle_en:'Fishing the wreckage',
    bgm:'assets/chapter3_bgm_collapse_02_asset_recovery.mid', bpm:150, enemyHP:180, gapMul:2.0, approach:1650,
    pre:'c3_before2', post:'c3_after2' },
  { id:'c3_3', no:'3-3', title:'清道夫', subtitle:'第一个人类对手', title_en:'The Sweeper', subtitle_en:'Your first human foe',
    bgm:'assets/chapter3_bgm_collapse_03_human_league.mid',   bpm:158, enemyHP:300, gapMul:1.9, approach:1650,
    pre:'c3_before3', post:'c3_after3',
    hint:{ zh:'他是人，不按机器的拍子出拳——盯紧重音。', en:'He’s human — he doesn’t punch on machine time. Watch the accents.' } },
  { id:'c3_self', no:'3-S', title:'噤声 · 就此无声?', subtitle:'被压在坍塌里', title_en:'Silenced', subtitle_en:'Pinned in the collapse',
    bgm:'assets/selfbgm_02_never_quiet.mid',                  bpm:160, enemyHP:200, gapMul:2.0, approach:1650,
    self:true, pre:'c3_self_pre', post:'c3_self_post' },
  // 逃脱模式(本章高潮):不打敌人——双拳齐上/齐下在三轨间跳跃,平拳交叉砸碎无缺口的正面墙,撑到曲末逃出。
  { id:'c3_escape', no:'3-X', title:'坍塌穿梭', subtitle:'跟着节拍跳', title_en:'Collapse Run', subtitle_en:'Jump on the beat',
    bgm:'assets/chapter3_bgm_collapse_04_last_ember.mid',     bpm:168, enemyHP:1, gapMul:1.7, approach:1500,
    escape:true, noSkills:true, pre:'', post:'c3_rescue',
    hint:{ zh:'双拳齐上/齐下=跳轨 · 平拳交叉=砸碎正面墙 · 撑到出口!', en:'Both fists UP/DOWN = jump lanes · cross-fists = smash walls · survive to the exit!' } },

  // 第四章 · 编外(反抗军)。技能「降噪」在 c4_self 末确立;模块「结余」(id balance)在 c4_salvage 从 D-302 的协议残段接入。
  // c4_3 = 守闸战:强制 90 秒(abortFromStart+holdOnly)。波次打不完;屏上有倒计时条;到 0 = 闸门落下(金色收场,非爆破)→ post。
  // c4_boss = 表决加轨(vote:true):「规矩」不变,VOTE_* 声部逐段投入;降噪=按掉一件乐器。
  { id:'c4_1', no:'4-1', title:'外差', subtitle:'护一条补给链路', title_en:'Field Job', subtitle_en:'Guard a supply link',
    bgm:'assets/chapter4_bgm_offbooks_01_first_shift.mid',    bpm:138, enemyHP:210, gapMul:1.9, approach:1650,
    pre:'c4_intro', post:'c4_after1',
    hint:{ zh:'编外第一班——活干漂亮点,他们在暗处看。', en:'First off-books shift — work clean. They’re watching from the dark.' } },
  { id:'c4_2', no:'4-2', title:'校准', subtitle:'沙盒里的假想敌', title_en:'Calibration', subtitle_en:'Sparring ghosts in the sandbox',
    bgm:'assets/chapter4_bgm_offbooks_02_calibration.mid',    bpm:148, enemyHP:240, gapMul:1.8, approach:1600,
    hpCut:{frac:0.2, endBar:27, jumpBar:27, loopBar:28},   // 血量≤20%:假想敌换签名——音乐+谱面跳到后半的不同节奏型
    pre:'c4_before2', post:'c4_after2',
    hint:{ zh:'校准沙盒——按流程打完,评级就出来了。', en:'Calibration sandbox — run the procedure; your rating follows.' } },
  { id:'c4_3', no:'4-3', title:'东闸', subtitle:'保持开启 90 秒', title_en:'East Gate', subtitle_en:'Hold it open for 90 seconds',
    bgm:'assets/chapter4_bgm_offbooks_03_east_gate.mid',      bpm:152, enemyHP:150, gapMul:1.8, approach:1600,
    phases:99, abortWave:true, abortFromStart:true, abortAfterMs:90000,
    pre:'c4_before3', post:'c4_after3',
    hint:{ zh:'守住东闸 90 秒——敌人打不完,把每一波都顶回去。', en:'Hold the east gate for 90 seconds — they won’t run out; beat back every wave.' } },
  { id:'c4_self', no:'4-S', title:'观众席', subtitle:'好吵', title_en:'The Audience', subtitle_en:'So loud',
    bgm:'assets/selfbgm_03_the_audience.mid',                 bpm:160, enemyHP:220, gapMul:1.9, approach:1600,
    self:true, pre:'c4_self_pre', post:'c4_self_post' },
  { id:'c4_boss', no:'4-B', title:'领班', subtitle:'表决加轨', title_en:'Foreman', subtitle_en:'Voices voted in',
    bgm:'assets/chapter4_bgm_offbooks_04_the_vote.mid',       bpm:144, enemyHP:300, gapMul:1.6, approach:1650,
    boss:true, vote:true, pre:'', post:'c4_boss_post',
    hint:{ zh:'「规矩」不变不投票;会场在表决加轨——技能窗开「降噪」,按掉他们的乐器。', en:'The Rule never votes. The floor keeps voting voices in — open DENOISE to mute their instruments.' } },
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
