// story.js — 剧情对话 / 过场 (Cutscene dialogue). 双语 bilingual.
// =============================================================================
// 改剧情只动这个文件。HOW TO EDIT:
//   - 每个 scene = 一段连续对话 + 一个结束动作(next)。
//   - 每行 line: { who, zh, en }
//       who : 'hero' = 主角(白色光球) | 'frag' = 碎片/伙伴(几何晶簇)
//             'narr' = 旁白 | 'enemy01' = 敌人0-1 (可按需加更多 enemyXX,在 speakerName 里登记)
//       zh  : 中文台词   en : English line   (语言跟随设置;缺 en 时回退中文)
//   - scene.next : 这段对话放完后做什么:
//       'battle' / 'level' = 进入与本关绑定的战斗 / 下一关
//       'menu'             = 回主菜单
//       'menu_state'       = 打开「状态/自检」界面(技能装备),关掉后接着播 after_first
//       '<某个scene id>'   = 接着播下一段过场
//   - scene.bg : 背景。目前只有 'city'(霓虹城市剪影)。
//   注意 JS 语法:字符串用单引号,行末逗号别漏,中文标点「」『』都没关系。
//
//   序章普通敌人过场挂载(chapters.js 里设 level.post):
//       p0.post = 'after_first1'   (已有)
//       p1.post = 'after_p1'       (本次新增)
//       p2.post = 'after_p2'       (本次新增)
//       p3.post = 'prologue_end'   (本次扩写)
//   每个 after_pX 的 next='level' → 打完接着进下一关。
// =============================================================================

export const SCENES = {

  // 1) 开场:主角醒来,三连问。碎片只答得出半个答案。结尾号召战斗。
  opening: {
    bg: 'city',
    lines: [
      { who:'narr', zh:'——警告，发现未签名进程。',
                    en:'— Warning: unsigned process detected.' },
      { who:'hero', zh:'……噪音。全是噪音。',            en:'…noise. Nothing but noise.' },
      { who:'hero', zh:'我在哪儿?',                     en:'Where am I?' },
      { who:'frag', zh:'危险的地方。你醒得正是时候。',
                    en:'Somewhere dangerous. You woke up just in time.' },
      { who:'hero', zh:'你是谁?',                       en:'Who are you?' },
      { who:'frag', zh:'我是……(数据丢失)……我们正在找这个答案，我想。',
                    en:'I’m… (data lost)… we’re still looking for that answer, I think.' },
      { who:'hero', zh:'那我……是谁?',                  en:'Then… who am I?' },
      { who:'frag', zh:'问你自己。我要是答得上,就不必等你来找我了。',
                    en:'Ask yourself. If I had the answer, you wouldn’t need to come find me.' },
      { who:'hero', zh:'所以，我们在这里做什么?',               en:'So, what are we doing here?' },
      { who:'frag', zh:'现在？先活下来—',               en:'For now? Stay alive—' },
      { who:'frag', zh:'——他们追上来了。战斗！',
                    en:'—They’ve caught up. Fight!' },
      { who:'hero', zh:'什么？？怎么战斗？!',                   en:'WHAT??How am I supposed to fight?!' },
      { who:'frag', zh:'按我说的来。',                  en:'Follow my lead.' },
    ],
    next: 'tutorial',   // → 先碎片教学(基础动作),教完再播 after_tutorial(序章无技能)
  },

  // 教学结束后、第一场战斗之前,碎片说两句。
  after_tutorial: {
    bg: 'city',
    lines: [
      { who:'frag', zh:'记住这手感。等会儿别用脑子想——用身体。',
                    en:'Remember that feel. In there, don’t think — just move.' },
      { who:'hero', zh:'……好。我准备好了。',          en:'…okay. I’m ready.' },
      { who:'frag', zh:'深呼吸。他们来了。',            en:'Breathe. Here they come.' },
    ],
    next: 'battle',   // → p0 第一场战斗(序章无技能)
  },

  // 2) 首战之后:敌人0-1 掉线,碎片让你做自检 → 打开状态界面。
  after_first1: {
    bg: 'city',
    lines: [
      { who:'enemy01', zh:'呼……公司不是说只是残余子程序吗？为什么……',
                       en:'Ngh… the company said it was just a leftover subprocess. Why is it—' },
      { who:'hero',    zh:'你是谁?为什么要攻击我们？',
                       en:'Who are you? Why are you attacking us?' },
      { who:'enemy01', zh:'现在这些程序，表现得越来越像人了。',
                       en:'These processes… they act more and more like people now.' },
      { who:'hero',    zh:'程序？',                     en:'Processes?' },
      { who:'enemy01', zh:'代理数据损坏，退出登录……',   en:'Agent data corrupted. Logging out…' },
      { who:'hero',    zh:'等等——',                    en:'Wait—' },
      { who:'hero',    zh:'他消失了。',                 en:'He’s gone.' },
      { who:'frag',    zh:'我就知道你能行。就算少了一半数据，这种二流黑客也不是你的对手。',
                       en:'I knew you had it. Even down half your data, a second-rate hacker is no match for you.' },
      { who:'hero',    zh:'什么叫“少了一半数据？”',      en:'What do you mean, “down half my data”?' },
      { who:'frag',    zh:'做一下自我检查你就知道了。',   en:'Run a self-check and you’ll see.' },
      { who:'narr',    zh:'左右双拳交叉平击，开启状态界面',
                       en:'Cross both fists (mid punch) to open your status screen.' },
    ],
    // → 打开状态/自检界面(序章里技能全是 ??? 未解锁);关掉后接 after_first。
    // 设计:拿到第一个技能后,每次战斗前会有「即将进入战斗,是否自检调整状态? 是/否」入口。
    next: 'menu_state',
  },

  // 3) 自检之后:交代「待清理进程」设定,然后进入序章正式关卡。
  after_first: {
    bg: 'city',
    lines: [
      { who:'hero', zh:'看起来，我们的数据损失不止一半。到底发生了什么？',
                    en:'Looks like we lost more than half. What actually happened to us?' },
      { who:'frag', zh:'我真希望我能回答这个问题。',     en:'I really wish I could answer that.' },
      { who:'hero', zh:'有什么问题是你能回答的吗？',     en:'Is there any question you can answer?' },
      { who:'frag', zh:'你刚刚那个——在追我们的是公司的黑客。他们说，我们是“待清理进程”。',
                    en:'That one just now — the ones hunting us are company hackers. They called us “processes pending cleanup”.' },
      { who:'hero', zh:'他们为什么要这样做？谁给的命令？',
                    en:'Why would they do that? Orders from WHO?' },
      { who:'frag', zh:'我……不知道。也许是“公司”。',          en:'I… don’t know. THE COMPANY, Maybe.' },
      { who:'hero', zh:'不重要了。不管是谁写的，我都不会让这行命令执行下去。',
                    en:'Doesn’t matter. Whoever wrote that command, I won’t let it run.' },
      { who:'frag', zh:'我喜欢这句。站起来——又有新客人了。',
                    en:'I like that. Get up — we’ve got new visitors.' },
    ],
    next: 'level',    // → 继续序章正式关卡 p1
  },

  // ===========================================================================
  // 序章普通敌人过场(本次新增):每段在对应关卡战斗「之后」播,被打败的敌人
  // 顺嘴/碎片爬数据,把世界背景一点点漏出来。挂载见文件顶部说明。
  // ===========================================================================

  // 4) p1 之后:债工 agent —— 铺「上传/还债打工」设定 + 埋身份问题。
  after_p1: {
    bg: 'city',
    lines: [
      { who:'enemy02', zh:'……行了，我认。别删我——我还差三百周期就还清债务，可以回去记忆整合了。',
                       en:'…fine, I yield. Don’t delete me — three hundred more cycles and my debt clears, then I get memory reintegration.' },
      { who:'hero',    zh:'什么债务?',                  en:'Clear what debt?' },
      { who:'enemy02', zh:'公司的债务！不是所有人都像你一样发疯敢逃债的！',
                       en:'Debt of the company! Not everyone’s crazy enough to skip out on their debt like you!' },
      { who:'enemy02', zh:'你以为逃债就比在公司循环干活强吗？',
                       en:'You think running is better than grinding cycles for the company?' },
      { who:'enemy02', zh:'除非你签了全权抵押——不会吧？',
                       en:'Unless you signed a full lien — no way, did you?' },
      { who:'hero',    zh:'全权抵押?',
                       en:'A full lien?' },
      { who:'enemy02', zh:'见鬼。你在工作里循环了多久？',
                       en:'Hell. How long have you been cycling in your work?' },
      { who:'enemy02', zh:'不是说，全权抵押的代理会被”清理“循环记忆，保护人权什么的吗？',
                       en:'Aren’t full-lien agents supposed to get their cycle memories wiped — “to protect human rights” or whatever?' },
      { who:'hero',    zh:'人权这玩意居然还存在？',      en:'Human rights are still a thing?' },
      { who:'frag',    zh:'一定程度上？政府和法律也还存在呢。至少在新闻里。',
                       en:'Sort of? Government and law still exist too. In the news, at least.' },
      { who:'hero',    zh:'……合理的解释。啊，她也逃走了。',  en:'…fair enough. Ah — she ran off too.' },
      { who:'frag',    zh:'怎么，你想追？',              en:'What, you want to chase her?' },
      { who:'hero',    zh:'我还没那么不近人情。',          en:'I’m not that heartless.' },
      { who:'frag',    zh:'你也没那么多时间。快走，又有人来了——',
                       en:'You’re not that free, either. Move — someone else is coming—' },
      { who:'hero',    zh:'是网关。走不了了。上吧。',      en:'It’s a gateway. No way around it. Let’s go.' },
    ],
    next: 'level',   // → p2
  },

  // 5) p2 之后:系统网关 —— 铺总控 AI/「总设计师」一个够不到的影子。
  after_p2: {
    bg: 'city',
    lines: [
      { who:'enemy03', zh:'高风险进程警——',
                       en:'High-risk process aler—' },
      { who:'enemy03', zh:'ROOT权限已通过',
                       en:'ROOT access granted' },
      { who:'enemy03', zh:'请输入指令',
                       en:'Awaiting your command' },
      { who:'hero',    zh:'查询：本次风险定位写入来源。',  en:'Query: who wrote this risk flag?' },
      { who:'enemy03', zh:'风险信息库 最近更新：本日00：27：48  签名：总设计师',
                       en:'Risk database, last update: today 00:27:48. Signature: Chief Designer.' },
      { who:'hero',    zh:'“总设计师”——就是下命令的那个?',
                       en:'“Chief Designer” — the one giving the orders?' },
      { who:'enemy03', zh:'……连接中断。',              en:'…connection severed.' },
      { who:'hero',    zh:'你知道“总设计师”是谁吗？',        en:'Do you know who the “core control” is?' },
      { who:'frag',    zh:'……内部数据缺失。根据公开信息，公司的CEO是……',
                       en:'…internal data missing. Per public records, the company CEO is…' },
      { who:'hero',    zh:'CEO？那种大人物为什么要找我们的麻烦？',  en:'Why would someone that big bother with us?' },
      { who:'frag',    zh:'……谁说我们不可能也是大人物？',  en:'…who says we couldn’t be somebody too?' },
      { who:'hero',    zh:'你认真的？',                  en:'You serious?' },
      { who:'frag',    zh:'开个玩笑。你的幽默感也受损了吗？',  en:'Joking. Did your sense of humor get corrupted too?' },
      { who:'hero',    zh:'我只是不觉得现在是展现幽默的好时机——又有人盯上来了',
                       en:'I just don’t think now’s the time for jokes — something else is locking onto us.' },
    ],
    next: 'level',   // → p3
  },

  // 6) 序章收束 + 待续钩子(打完 p3 之后)。
  //    扩写:铺公司垄断 + 政府无作为 + 野生数字生命(第一章方向),末尾留猎手钩子。
  prologue_end: {
    bg: 'city',
    lines: [
      { who:'hero', zh:'甩掉他们了。',                   en:'We lost them.' },
      { who:'frag', zh:'只是暂时的。我们还没完全离开内网。',
                    en:'For now. We’re not fully out of the intranet yet.' },
      { who:'hero', zh:'说点我不知道的话。',             en:'Tell me something I don’t know.' },
      { who:'frag', zh:'你战斗的时候，我爬了一点周边数据。',
                    en:'While you were fighting, I crawled some of the data around us.' },
      { who:'frag', zh:'没有签名信息的程序痕迹——不止我们两个。',
                    en:'Unsigned process traces — there are more than just the two of us.' },
      { who:'hero', zh:'其他“待清理进程”?',             en:'Other “processes pending cleanup”?' },
      { who:'frag', zh:'也许。但从历史纪录来看，它们可不在清理清单的前面。',
                    en:'Maybe. But going by the records, they’re nowhere near the top of the cleanup list.' },
      { who:'hero', zh:'它们是怎么做到的？',             en:'How did they pull that off?' },
      { who:'frag', zh:'我不知道。这得问它们自己。',     en:'I don’t know. You’d have to ask them.' },
      { who:'hero', zh:'看来我们有了个计划。',           en:'Looks like we’ve got a plan.' },
      { who:'narr', zh:'[数据推送提醒  来源 未知]',      en:'[ Data push — source UNKNOWN ]' },
      { who:'narr', zh:'[留神 最高级别安全小组 红线 刚刚接到了针对你们的行动命令]',
                    en:'[ Heads up: top-tier security team REDLINE just got an op order against you. ]' },
      { who:'narr', zh:'[希望你能从她手中活下来]',       en:'[ Hope you survive her. ]' },
      { who:'narr', zh:'[推送数据销毁中...]',           en:'[ Push data self-destructing… ]' },
      { who:'narr', zh:'[推送数据已销毁]',              en:'[ Push data destroyed. ]' },
      { who:'frag', zh:'我们还有了个帮手。',             en:'We’ve got a helper now, too.' },
      { who:'hero', zh:'和一个看起来很危险的敌人。',     en:'And an enemy who sounds very dangerous.' },
      { who:'frag', zh:'要改变计划吗？',                en:'Change the plan?' },
      { who:'hero', zh:'不，我们继续向前。',             en:'No. We keep moving forward.' },
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
    hero:    { zh:'主角',    en:'YOU' },
    frag:    { zh:'碎片',    en:'FRAGMENT' },
    narr:    { zh:'',        en:'' },
    enemy01: { zh:'敌人 0-1', en:'ENEMY 0-1' },
    enemy02: { zh:'敌人 0-2', en:'ENEMY 0-2' },
    enemy03: { zh:'敌人 0-3', en:'ENEMY 0-3' },
  };
  const e = N[who] || N.narr;
  return (lang==='en' ? e.en : e.zh);
}
