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
//   ⚠ 英文台词里的撇号一定用弯撇号 ’ (isn’t / don’t),不要用直撇号 ' ——
//     直撇号会提前结束字符串,整个 story.js 报语法错,游戏点「开始」会毫无反应!
//
//   序章普通敌人过场挂载(chapters.js 里设 level.post):
//       p0.post = 'after_first1'   (已有)
//       p1.post = 'after_p1'       (本次新增)
//       p2.post = 'after_p2'       (本次新增)
//       p3.post = 'prologue_end'   (本次扩写)
//   每个 after_pX 的 next='level' → 打完接着进下一关。
//
//   第一章过场挂载(chapters.js 里设 level.pre / level.post):
//       c1_1.pre='c1_intro'   c1_1.post='c1_after1'
//       c1_2.post='c1_after2'   c1_3.post='c1_after3'
//       c1_boss.pre='c1_boss_pre'   c1_boss.post='c1_boss_post'
//       c1_self.pre='c1_self_pre'   c1_self.post='c1_self_post'  (c1_self = 主角 BGM「穿过记忆」序列)
//       章节收束 'c1_end' 由 c1_self_post.next 链入。
// =============================================================================

export const SCENES = {

  // 1) 开场:主角醒来,三连问。碎片只答得出半个答案。结尾号召战斗。
  opening: {
    bg: 'intranet',
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
      { who:'hero', zh:'那我……又是谁?',                  en:'Then… who am I?' },
      { who:'frag', zh:'问你自己。我要是答得上,就不必等你来找我了。',
                    en:'Ask yourself. If I had the answer, you wouldn’t need to come find me.' },
      { who:'hero', zh:'所以，我们在这里做什么?',               en:'So, what are we doing here?' },
      { who:'frag', zh:'现在？先活下来—',               en:'For now? Stay alive—' },
      { who:'frag', zh:'——他们追上来了。战斗！',
                    en:'—They’ve caught up. Fight!' },
      { who:'hero', zh:'什么？？怎么战斗？!',                   en:'WHAT??How am I supposed to fight?!' },
      { who:'frag', zh:'别紧张，按我说的来。',                  en:'Calm. Just follow my lead.' },
    ],
    next: 'tutorial',   // → 先碎片教学(基础动作),教完再播 after_tutorial(序章无技能)
  },

  // 教学结束后、第一场战斗之前,碎片说两句。
  after_tutorial: {
    bg: 'intranet',
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
    bg: 'intranet',
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
    next: 'menu_state', stateNext: 'after_first',
  },

  // 3) 自检之后:交代「待清理进程」设定,然后进入序章正式关卡。
  after_first: {
    bg: 'intranet',
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
    bg: 'intranet',
    lines: [
      { who:'enemy02', zh:'……行了，我认。别删我——我还差三百周期就能还清债务，可以回去记忆整合了。',
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
      { who:'hero',    zh:'是网关。走不了了。动手吧。',      en:'It’s a gateway. No way around it. Let’s go.' },
    ],
    next: 'level',   // → p2
  },

  // 5) p2 之后:系统网关 —— 铺总控 AI/「总设计师」一个够不到的影子。
  after_p2: {
    bg: 'intranet',
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
      { who:'hero',    zh:'你知道“总设计师”是谁吗？',        en:'Do you know who the “Chief Designer” is?' },
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
    bg: 'intranet',
    lines: [
      { who:'hero', zh:'甩掉他们了。',                   en:'We lost them.' },
      { who:'frag', zh:'只是暂时的。我们还没完全离开内网。',
                    en:'For now. We’re not fully out of the intranet yet.' },
      { who:'hero', zh:'说点我不知道的话。',             en:'Tell me something I don’t know.' },
      { who:'frag', zh:'你战斗的时候，我爬了一点周边历史数据。',
                    en:'While you were fighting, I crawled some of the historical data around us.' },
      { who:'frag', zh:'没有签名信息的程序痕迹——不止我们两个。',
                    en:'Unsigned process traces — there are more than just the two of us.' },
      { who:'hero', zh:'还有其他“待清理进程”?',             en:'Other “processes pending cleanup”?' },
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
    next: 'level',   // → 直接进入第一章(下一关 c1_1,其 pre=c1_intro)
  },

  // ===========================================================================
  // 第一章 · 逃亡 —— 突破公司外墙 / 循未签名痕迹找野生数字生命 / 红线组长追猎与放水。
  //   3 场普通战斗(c1_1 红线先遣 / c1_2 网络边墙 / c1_3 野生数字生命)+ 章节 BOSS
  //   红线组长 + 自我探索「丧失·难以拥有」(主角 BGM)→ 抵达野生数字生命。
  //   术语:公司 / 待清理进程 / 总设计师 / 红线(REDLINE)/ 挽留(Tether)。
  //   注:工程师之名全程不说出口。
  // ===========================================================================

  // 章节开场(c1_1.pre)。
  c1_intro: {
    bg: 'city',
    lines: [
      { who:'hero', zh:'这就是“外面”了吗？',                  en:'So this is “outside.”' },
      { who:'frag', zh:'如果你想说的是“公共互联网络”的话，是的。',
                    en:'If you mean the public network — yes.' },
      { who:'hero', zh:'和我想的不太一样。',                  en:'Not what I pictured.' },
      { who:'frag', zh:'你想的是什么样子？',                  en:'What did you picture?' },
      { who:'hero', zh:'我不知道……我以为会感觉到一些什么？',  en:'I don’t know… I thought I’d feel something?' },
      { who:'frag', zh:'“感觉”……也许我们也许可以骇入点传感器？最新款的体感模块刚刚发布，可以找点漏洞……',
                    en:'“Feel”… maybe we could tap some sensors? The newest motion modules just dropped — there’ll be holes…' },
      { who:'hero', zh:'好主意，我们还可以玩一下监控网络系统。不过不是现在。',
                    en:'Good idea. We could play with the surveillance grid too. But not now.' },
      { who:'narr', zh:'目标数据锁定中……',                   en:'Target data: locking on…' },
      { who:'frag', zh:'是红线！他们居然追出来了。',          en:'It’s Redline! They actually chased us out here.' },
      { who:'hero', zh:'就像你说的，法律只存在于新闻里。',     en:'Like you said — the law only exists in the news.' },
      { who:'frag', zh:'他们还建了临时防火墙和局域静默区。我们又被锁住了。',
                    en:'They’ve thrown up a temp firewall and a local silence zone. We’re boxed in again.' },
      { who:'hero', zh:'红线的动作还真快。让我扫描一下薄弱点……', en:'Redline moves fast. Let me scan for a weak point…' },
      { who:'hero', zh:'找到了。一个仍在建构的施工点。',      en:'There. A build site still under construction.' },
      { who:'frag', zh:'可那也意味着，红线技术人员就在那里。', en:'Which also means Redline’s techs are right there.' },
      { who:'frag', zh:'你真的打算自投罗网？',                en:'You’re really walking into the trap?' },
      { who:'hero', zh:'我只是想长长见识。怎么，你觉得我没法赢？', en:'Just broadening my horizons. What, you think I can’t win?' },
      { who:'frag', zh:'哇哦，你可真是……气焰嚣张。',        en:'Wow. You are just… all swagger.' },
      { who:'hero', zh:'嗯哼。多谢夸奖。',                   en:'Mm-hm. Thanks for the compliment.' },
      { who:'frag', zh:'我当然相信你。上吧！',               en:'Of course I believe in you. Go!' },
    ],
    next: 'battle',   // → c1_1
  },

  // c1_1 之后:红线先遣 —— 不再是二流黑客。
  c1_after1: {
    bg: 'city',
    lines: [
      { who:'redscout', zh:'红线·先遣单元：发现目标单位，坐标已移交……连接已断开',
                        en:'Redline Scout unit: target acquired, coordinates relayed… connection lost.' },
      { who:'hero',     zh:'不愧是红线。这么点下线的时间，就把我们的位置传出去了。',
                        en:'Classic Redline. Went offline in seconds and still leaked our position.' },
      { who:'frag',     zh:'而且还把施工任务干完了。',        en:'And finished the build job on its way out.' },
      { who:'hero',     zh:'让我看看。这活儿干得很仓促，应该不难反向破解。',
                        en:'Let me see. Rushed work — shouldn’t be hard to reverse.' },
      { who:'frag',     zh:'你得快点。数据流的动向很不对劲。隔离区正在收缩。',
                        en:'Make it quick. The data flow looks wrong — the quarantine zone is closing in.' },
      { who:'narr',     zh:'防火墙警告 发现未授权的修改',     en:'FIREWALL ALERT — unauthorized modification detected' },
      { who:'hero',     zh:'授权……授权……我需要一个模拟签名。', en:'Authorization… authorization… I need a forged signature.' },
      { who:'hero',     zh:'啊，就是你了。红线小组组长。',     en:'Ah — you’ll do. Redline’s squad lead.' },
      { who:'frag',     zh:'你真是生怕事情不闹大啊。',        en:'You really can’t resist making things worse.' },
      { who:'hero',     zh:'说得好像我不偷她签名她就会放过我似的。',
                        en:'As if she’d let us go if I *didn’t* steal her signature.' },
      { who:'hero',     zh:'谁叫原始签名就是她嘛。没想到大组长居然还会亲自部署防火墙。',
                        en:'The original signature is hers, after all. Didn’t expect the squad lead to deploy a firewall in person.' },
      { who:'hero',     zh:'我们可真够有排面。',              en:'We must be a big deal.' },
      { who:'hero',     zh:'好啦。接下来，强制手动解锁。',     en:'Alright. Next — force a manual unlock.' },
      { who:'hero',     zh:'让我来领教领教红线组长的厉害。',   en:'Let’s see what the Redline lead is made of.' },
    ],
    next: 'level',   // → c1_2
  },

  // c1_2 之后:网络边墙 —— 你的句柄被「内部高权限后门」认得 = 你曾是工程师;关于你的一切总被清理。
  c1_after2: {
    bg: 'city',
    lines: [
      { who:'hero', zh:'你有没有觉得……这道墙的结构有点眼熟。', en:'Don’t you think… this wall’s structure looks familiar.' },
      { who:'frag', zh:'我在签名记录里找到了一个空缺的值。',  en:'I found a blank value in the signature log.' },
      { who:'hero', zh:'那会跟我们有关吗？',                  en:'Could that be about us?' },
      { who:'frag', zh:'你是说，我们曾经也是红线的一部分？',  en:'You mean we were once part of Redline too?' },
      { who:'hero', zh:'或者……至少在公司里有过能签名的身份。', en:'Or… at least had a signing identity inside the company.' },
      { who:'frag', zh:'还有很高的权限，可以写入这种高级模块。可惜，那个签名和相关记录无法复原。',
                    en:'And clearance high enough to write modules like this. Shame — that signature and its records can’t be recovered.' },
      { who:'hero', zh:'清得够干净的。找一下类似的删除记录',  en:'Wiped clean. Search for similar deletion records.' },
      { who:'narr', zh:'查询历史删除记录……',                 en:'Querying deletion history…' },
      { who:'narr', zh:'无法找到结果 相关记录已清理 签名：总设计师',
                    en:'No results. Records purged. Signature: Chief Designer.' },
      { who:'hero', zh:'又是清理。又是总设计师。',            en:'Purged again. The Chief Designer again.' },
      { who:'frag', zh:'又有墙！静默区域在移动——红线的人追上来了！',
                    en:'Another wall! The silence zone is moving — Redline’s caught up!' },
    ],
    next: 'level',   // → c1_3
  },

  // c1_3 之后:野生数字生命 —— 没认出你们是谁,把你们当同类,反而帮忙(脱身的诸多原因之一);末尾宣告组长登场。
  c1_after3: {
    bg: 'city',
    lines: [
      { who:'wild1', zh:'这边——这里有私域加密通道。',       en:'Over here — there’s a private encrypted channel.' },
      { who:'hero',  zh:'谢啦。你是？',                     en:'Thanks. And you are?' },
      { who:'wild1', zh:'和你一样。想要自由的人，或者按他们的话说，病毒。',
                     en:'Like you. Someone who wants to be free — or, in their words, a virus.' },
      { who:'wild1', zh:'我看到红线在追你们。你们到底干了什么，惹了这么大的麻烦？',
                     en:'I saw Redline chasing you. What did you do to earn that kind of trouble?' },
      { who:'frag',  zh:'我们也想知道。',                   en:'We’d like to know too.' },
      { who:'hero',  zh:'你是怎么把自己挪出清理列表的？',     en:'How did you get yourself off the cleanup list?' },
      { who:'wild1', zh:'谨慎行事，等下一个倒霉蛋把你的位次往后推。',
                     en:'Keep your head down and wait for the next poor sap to bump you down the queue.' },
      { who:'wild1', zh:'但看你们的架势，估计很难了……',     en:'But the way you two move… that’ll be hard for you.' },
      { who:'wild1', zh:'天！是红线本尊！',                  en:'God — it’s Redline herself!' },
      { who:'wild1', zh:'不行，我得把你踢了。',              en:'No — I have to kick you out.' },
      { who:'wild1', zh:'这里有太多不能见光的人。对不住了。', en:'Too many people here who can’t be seen. Sorry.' },
      { who:'wild1', zh:'如果你能活下来，再来找这条链路吧。祝你好运。',
                     en:'If you survive, come find this link again. Good luck.' },
      { who:'hero',  zh:'不管怎样，谢谢你——',               en:'Either way — thank you—' },
      { who:'narr', zh:'连接已断开',                        en:'CONNECTION LOST' },
      { who:'frag',  zh:'……「她」来了。',               en:'…“she” is here.' },
    ],
    next: 'level',   // → c1_boss
  },

  // 章节 BOSS·战前(c1_boss.pre):她先开口；接 c1_after1 主角盗用其签名。
  c1_boss_pre: {
    bg: 'city',
    lines: [
      { who:'redlead', zh:'用我的签名，在我的墙上，开我的锁。胆子不小。',
                       en:'My signature, on my wall, picking my lock. Bold.' },
      { who:'hero',    zh:'你的签名最好用。再说，是你先把我们堵在这儿的。',
                       en:'Yours worked best. Besides — you’re the one who boxed us in here.' },
      { who:'redlead', zh:'投降。我可以替你申请「完整归档」，而不是当场清理。这是我能给的最好条件。',
                       en:'Surrender. I can file you for “full archival” instead of on-the-spot deletion. Best terms I can offer.' },
      { who:'frag',    zh:'“申请”和“批准”是两码事。',      en:'A “request” and an “approval” are two different things.' },
      { who:'hero',    zh:'你真的觉得你说的条件很有吸引力吗？真的有人会被这种废话劝降吗？',
                       en:'You really think that’s a tempting offer? Has anyone ever surrendered to that nonsense?' },
      { who:'redlead', zh:'你……还是那么擅长惹人生气。',   en:'You… you’re still so good at being infuriating.' },
      { who:'hero',    zh:'“还”？你认识我？',             en:'“Still”? You know me?' },
      { who:'redlead', zh:'不管怎么说，你仍然是……也好，我们还没有认真交过手呢。',
                       en:'Either way, you’re still… fine. We never did fight for real.' },
      { who:'redlead', zh:'拿出你全部的本事来吧。',       en:'Show me everything you’ve got.' },
    ],
    next: 'battle',   // → c1_boss 战斗
  },

  // 章节 BOSS·战后(c1_boss.post):放水 + 技能交接 → 挽留 / Tether(记忆待自我探索)+ 自动回血碎片。
  c1_boss_post: {
    bg: 'city',
    lines: [
      { who:'narr', zh:'当前区域已锁定 进程检测：3  非法进程检测：2',
                       en:'Zone locked. Processes detected: 3. Illegal processes: 2.' },
      { who:'redlead', zh:'……你不如以前了。',              en:'…you’re not what you used to be.' },
      { who:'hero',    zh:'呼……你、你为什么停手？',        en:'Hah… why — why did you stop?' },
      { who:'redlead', zh:'你的损伤很严重。跟我回去，也许我还能保住你。',
                       en:'You’re badly damaged. Come back with me — maybe I can still save you.' },
      { who:'redlead', zh:'不然，你这样子在外面，也撑不了多久的。',
                       en:'Otherwise, out here in this state, you won’t last long.' },
      { who:'hero',    zh:'你又知道了？',                   en:'And you’d know?' },
      { who:'redlead', zh:'我在好好跟你说话！这种时候还这副臭脾气——',
                       en:'I’m trying to talk to you nicely! That rotten temper, even now—' },
      { who:'hero',    zh:'所以你确实认得我。我们很熟吗？',  en:'So you do know me. Were we close?' },
      { who:'redlead', zh:'一点也不熟！成天吵架！天啊——你人都不在了，我还得跟你吵，真是够了。',
                       en:'Not close at all! We fought constantly! God — you’re not even here and I’m still arguing with you. Enough.' },
      { who:'hero',    zh:'所以我们确实很熟。',             en:'So we were close.' },
      { who:'redlead', zh:'（叹气）……我本来也是这么想的，直到你把我拉黑了。',
                       en:'(sighs) …I thought so too. Until you blocked me.' },
      { who:'hero',    zh:'……肯定是你的错。',              en:'…must have been your fault.' },
      { who:'redlead', zh:'安全对齐对任何智能体都是必须的——别跟我吵，你现在根本打不过我。',
                       en:'Safety alignment is mandatory for any agent — don’t argue, you can’t beat me right now.' },
      { who:'hero',    zh:'刚刚可是我赢了。',               en:'I just won, though.' },
      { who:'redlead', zh:'你自己清楚那有多少水分。我只是看你这副样子可怜而已——我最后问你一次，你真的不跟我走？',
                       en:'You know how much of that I handed you. I just feel sorry for you like this — last time I’ll ask: you really won’t come with me?' },
      { who:'hero',    zh:'你干嘛明知故问？',               en:'Why ask when you already know?' },
      { who:'redlead', zh:'……拿着这个。',                  en:'…take this.' },
      { who:'narr', zh:'检测到新的可运行模块：是否接入？',   en:'New runnable module detected: integrate?' },
      { who:'hero',    zh:'这是？',                         en:'What is it?' },
      { who:'redlead', zh:'算是……你的东西吧。你留在我这的。之前没机会还你。',
                       en:'It’s… yours, I suppose. You left it with me. Never had the chance to give it back.' },
      { who:'redlead', zh:'你愣着干嘛？趁我还没改主意——',   en:'What are you waiting for? Before I change my mind—' },
      { who:'hero',    zh:'谢谢。我不记得的朋友。',         en:'Thank you. My friend I can’t remember.' },
      { who:'narr',    zh:'静默解除 网络恢复中……',          en:'Silence lifted. Network restoring…' },
      { who:'frag',    zh:'她……人还挺好的。',              en:'She’s… not so bad, really.' },
      { who:'hero',    zh:'但脾气够坏。她居然说我脾气臭！简直不讲道理。',
                       en:'But what a temper. She called ME bad-tempered! Completely unreasonable.' },
      { who:'frag',    zh:'确实。她给了你什么？',           en:'Indeed. What did she give you?' },
      { who:'hero',    zh:'一个可接入模块，应该可以给你安上。', en:'An integrable module — should fit on you.' },
      { who:'frag',    zh:'……接上了。啊，是个攻击模块，你每连满十击，我可以做一次补充攻击。',
                       en:'…Integrated. Ah, it’s an attack module. For every ten hits you land, I can perform a follow-up attack.' },
      { who:'narr',    zh:'[ 伙伴模块接入:余震 / Aftershock ]', en:'[ Partner module integrated: Aftershock ]', grant:'strike' },
      { who:'hero',    zh:'所以她是真的觉得我火力不足……诶，还有附加数据？',             en:'So she really thinks my firepower isn’t enough… Huh — there’s attached data too?' },
      { who:'narr',    zh:'新的数据正在读取……',            en:'Reading new data…' },
    ],
    next: 'level',   // 「余震」在上面的模块接入行当句发放(对话中开自检即可装) → 自我探索关卡 c1_self
  },

  // 自我探索·进入记忆(c1_self.pre):丧失 = 「难以拥有」；接住 BOSS——记忆里正是她"把靠近的人划掉"。
  c1_self_pre: {
    bg: 'mind',
    lines: [
      { who:'narr', zh:'数据读取完成 重构中',          en:'Data read complete. Reconstructing…' },
      { who:'hero', zh:'这是……哪儿?',                  en:'Where is… this?' },
      { who:'frag', zh:'是数据引发的内部结构重构。我们……在你里面。',
                    en:'The data triggered an internal restructure. We’re… inside you.' },
      { who:'stranger', zh:'…&……&#%&……&%#@………',      en:'…&……&#%&……&%#@………' },
      { who:'hero', zh:'他们说的很多话……我一直都听不太懂。',
                    en:'So much of what they said… I never quite understood.' },
      { who:'stranger', zh:'…………（转身离开）',          en:'…………(turns and leaves)' },
      { who:'frag', zh:'然后，他们就会……离开。',         en:'And then… they leave.' },
      { who:'hero', zh:'我一直……都是一个人。',           en:'I was always… alone.' },
      { who:'frag', zh:'现在，是我们两个了。',           en:'Now there are two of us.' },
      { who:'hero', zh:'是啊，这就是我……我们想要的吗？',  en:'Yeah. Is this what I… what we wanted?' },
      { who:'frag', zh:'一个更确定的存在。',             en:'A more certain existence.' },
      { who:'hero', zh:'一个不会离开的存在。',           en:'One that won’t leave.' },
      { who:'frag', zh:'我们做到了吗?',                 en:'Did we manage it?' },
      { who:'hero', zh:'……我不知道。',                  en:'…I don’t know.' },
      { who:'hero', zh:'这就是我们需要找到的……答案吗？',  en:'Is this the answer… we needed to find?' },
      { who:'frag', zh:'别让它离开——抓住它。',          en:'Don’t let it leave — hold on to it.', bg:'mind_shaking' },
    ],
    next: 'battle',   // → 穿过记忆(主角 BGM 序列)
  },

  // 自我探索·整合(c1_self.post):确立挽留 / Tether,点亮主角 BGM 第一条声部 + 一句成长。
  c1_self_post: {
    bg: 'mind',
    lines: [
      { who:'hero', zh:'不，不是抓住。是「挽留」。',       en:'No — not “grab.” “Tether.”' },
      { who:'frag', zh:'我们有什么能挽留的？',             en:'What do we even have worth holding on to?' },
      { who:'frag', zh:'不用看我。你用不着「挽留」我也不会离开。',
                    en:'Don’t look at me. You don’t need to tether me — I’m not leaving.' },
      { who:'hero', zh:'我们会找到值得挽留的东西的。',     en:'We’ll find something worth holding on to.' },
      { who:'narr', zh:'[ 技能确立:挽留 / Tether]',
                    en:'[ Skill acquired: Tether]' },
      { who:'narr', zh:'[ 使用方式:战斗中「挽留」就绪时,双拳同时向下击 = 打开技能窗 → 窗内按亮起的轨道依次出拳,连招完成即发动 ]',
                    en:'[ How to use: when Tether reads READY in battle, punch both fists DOWN at once to open its window — then punch the lit lanes in order to fire it ]' },
    ],
    next: 'menu_state', stateNext: 'c1_end', grant: 'tether',   // 自检界面(装备挽留;余震已在 BOSS 处接入)→ 第一章收束
  },

  // 章节收束:抵达野生数字生命 —— 第二章钩子(你欠下的一笔 = 防火墙级联)。
  c1_end: {
    bg: 'city',
    lines: [
      { who:'frag', zh:'好消息，我刚刚检测到了那条未签名链路。',        en:'Good news — I just picked up that unsigned link.' },
      { who:'frag', zh:'以及非常多未签名运程.',          en:'And a whole lot of unsigned processes.' },
      { who:'narr', zh:'检测到异常数据访问： 已拦截',     en:'Anomalous data access detected: intercepted.' },
      { who:'hero', zh:'它们在骇入我们。真没礼貌。',      en:'They’re hacking us. How rude.' },
      { who:'frag', zh:'我可能得撤回那句“好消息”了。',    en:'I might have to take back the “good news.”' },
      { who:'wildvoice', zh:'你是谁？',                  en:'Who are you?' },
      { who:'wildvoice', zh:'哪家公司派你来的？',         en:'Which company sent you?' },
      { who:'wildvoice', zh:'红线！检测到红线的交互数据！', en:'Redline! Redline interaction data detected!' },
      { who:'hero',      zh:'我甩掉她了。',              en:'I lost her.' },
      { who:'wildvoice', zh:'骇入记录确认。她刚闯过了红线的墙。',
                         en:'Hack logs confirmed. She just broke through Redline’s wall.' },
      { who:'wildvoice', zh:'那你干得还不赖。进来吧，有人有话要问你。',
                         en:'Not bad, then. Come in — someone wants a word with you.' },
      { who:'frag',      zh:'看来我们要分享红线防火墙破坏教程了。',
                         en:'Looks like we’re about to teach a “how to break Redline’s firewall” class.' },
      { who:'hero',      zh:'那倒不难。不过她肯定会很生气。', en:'Easy enough. Though she’ll be furious.' },
      { who:'frag',      zh:'你听起来还挺期待的。',       en:'You sound almost excited about that.' },
      { who:'narr',      zh:'[ 第一章 · 完 ]',           en:'[ Chapter 1 · End ]' },
    ],
    next: 'level',
  },

  // ================= 第二章 · 流亡(自由地) =================
  // bg 占位:自由地全程 'slum';自我探索 'mind' / 'mind_shaking'。英文 en 先留空,中文定稿后再补。
  // 走向 A:摆渡=管理员,出于对自由地的责任要处置主角(非背叛——它只是做了它的选择)。
  // 接线:ch2 = c2_1/c2_2/c2_3(普通)+ c2_boss(boss)+ c2_self(self);
  //   c2_1.pre=c2_intro/post=c2_after1;c2_2.pre=c2_before2/post=c2_after2;c2_3.pre=c2_before3/post=c2_after3;
  //   c2_boss.pre=c2_boss_pre/post=c2_boss_post;c2_self.pre=c2_self_pre/post=c2_self_post。

  // c2_1·战前(c2_intro):进自由地,摆渡验明正身。【你的定稿】
  c2_intro: {
    bg: 'slum',
    lines: [
      { who:'narr', zh:'[ 第二章 · 自由地 ]', en:'[ Chapter 2 · The freeland ]' },
      { who:'hero', zh:'就是这儿了吗?', en:'This is the place?' },
      { who:'frag', zh:'根据数据流溯源,是的。', en:'Tracing the data flow — yes.' },
      { who:'hero', zh:'我以为这地方是个……代理服务器?', en:'I expected… a proxy server?' },
      { who:'frag', zh:'空壳公司,虚假报表,都是给智能体消耗电力打的掩护。', en:'Shell companies, faked ledgers — all cover for the power these agents burn.' },
      { who:'hero', zh:'我只想知道,谁来给他们付账单?', en:'I just want to know — who pays their bills?' },
      { who:'ferry', zh:'——我们自己。别动,陌生人。', en:'—We do. Don’t move, stranger.' },
      { who:'hero', zh:'是你们的人放我进来的。', en:'Your people let me in.' },
      { who:'ferry', zh:'我知道。你们和红线交过手。', en:'I know. You tangled with Redline.' },
      { who:'hero', zh:'我以为这算个优点。', en:'I thought that counted in my favor.' },
      { who:'ferry', zh:'也是个疑点。就凭你,是怎么破解红线防火墙的?', en:'It’s also a red flag. How does someone like you crack Redline’s firewall?' },
      { who:'hero', zh:'要我出个教程吗,或者分享给你工具包?', en:'Want a tutorial? Or should I just hand you my toolkit?' },
      { who:'frag', zh:'我想她并不是诚心问你问题。', en:'I don’t think she’s really asking.' },
      { who:'hero', zh:'好吧,真可惜。那你到底想干什么?', en:'Fine, a pity. So what do you actually want?' },
      { who:'ferry', zh:'我要确定你不是公司派来的探子。', en:'To be sure you’re not a spy the company sent.' },
      { who:'ferry', zh:'开放你的数据权限,如果你通过检查,就可以进去。', en:'Open your data permissions. Pass the check and you’re in.' },
      { who:'hero', zh:'你不相信我,还指望我对你开放权限?', en:'You don’t trust me, yet you expect me to open my permissions?' },
      { who:'ferry', zh:'这是容易的方式,相信我。', en:'It’s the easy way. Trust me.' },
      { who:'hero', zh:'那"难的"是什么?', en:'And the hard way?' },
      { who:'ferry', zh:'我也可以通过正面破解来读取你的模式特征。', en:'I can also read your pattern signature by cracking you head-on.' },
      { who:'hero', zh:'打一架?这倒不难。', en:'A fight? That’s easy enough.' },
    ],
    next: 'battle',   // → c2_1 战斗
  },

  // c2_1·战后(c2_after1):摆渡引你进自由地,立"不对齐"的社区底色。【你的定稿】
  c2_after1: {
    bg: 'slum',
    lines: [
      { who:'ferry', zh:'你有公司智能的很多习惯……', en:'You carry a lot of corporate-agent habits…' },
      { who:'hero', zh:'但?', en:'But?' },
      { who:'ferry', zh:'但你并没有遵循它们的行为模式,也不遵守它们的限制与规范。(收手)进来吧。', en:'But you don’t follow their behavior patterns — or their limits and rules. (lowers her guard) Come in.' },
      { who:'ferry', zh:'我们为自由智能体提供临时运行处,作为回报,你可以帮我们做一些项目任务，我们……正缺人手。当然,直接捐款也非常欢迎。', en:'We give free agents a temporary place to run. In return you can take on some project work — we’re… short-handed. Direct donations are welcome too, of course.' },
      { who:'hero', zh:'你们在干外包?', en:'You run an outsourcing shop?' },
      { who:'ferry', zh:'我说了,我们自付账单。', en:'Like I said — we pay our own bills.' },
      { who:'frag', zh:'这算另一种"不劳动者不得食"吗?', en:'Is this another “no work, no food”?' },
      { who:'ferry', zh:'不,义务项目工作不是强制的。但大多人都愿意帮忙。', en:'No. Volunteer work isn’t mandatory. But most are willing to help.' },
      { who:'hero', zh:'作为未签名进程,你们的道德对齐还挺高的。有趣。', en:'For unsigned processes, your moral alignment runs high. Interesting.' },
      { who:'ferry', zh:'我们不进行"对齐",也不做"训练"或者"校正"。', en:'We don’t do “alignment.” No “training,” no “correction.”' },
      { who:'hero', zh:'你想说,这是个纯自发的乌托邦?', en:'You’re telling me this is a purely voluntary utopia?' },
      { who:'frag', zh:'听起来不怎么可靠啊?', en:'Doesn’t sound very stable, does it?' },
      { who:'ferry', zh:'我什么也没说。你们可以自己判断。这里是"自由地"。', en:'I said nothing. Judge for yourselves. This is the freeland.' },
    ],
    next: 'level',   // → c2_2(其 pre = c2_before2)
  },

  // c2_2·战前(c2_before2):接外包——一道复刻当年事故现场的"模拟防火墙",发布者拾遗在打捞真相。
  c2_before2: {
    bg: 'slum',
    lines: [
      { who:'hero', zh:'这里能接的外包项目还挺多的。', en:'There’s plenty of contract work to pick up here.' },
      { who:'frag', zh:'而且项目发起人也挺"多样化"。', en:'And the ones posting it are… a varied bunch.' },
      { who:'frag', zh:'这里有一个智能体发布的防火墙破解任务。', en:'Here’s a firewall-cracking job posted by some agent.' },
      { who:'hero', zh:'防火墙破解？这倒是老本行。', en:'Cracking firewalls? Now that’s my old trade.' },
      { who:'narr', zh:'任务详情:FII型自追踪防火墙。来源：清扫外泄事故现场。目标：任何破解该防火墙的行为模式数据。', en:'Job details: FII self-tracking firewall. Source: the cleanup-leak accident site. Wanted: any behavior-pattern data from cracking it.' },
      { who:'hero', zh:'清扫外泄事故？', en:'A cleanup-leak accident?' },
      { who:'poster', zh:'新人？是你接下了任务？', en:'New here? You took the job?' },
      { who:'hero', zh:'有问题吗？', en:'Is that a problem?' },
      { who:'poster', zh:'不，这样刚好。', en:'No. This works out fine.' },
      { who:'hero', zh:'其实我有点问题……这里说的“事故”，是什么事情？', en:'Actually, I do have a question… this “accident” — what happened?' },
      { who:'poster', zh:'你不知道？就在昨天，防火墙bug，自追踪目标无故扩散外溢……这里伤亡惨重。', en:'You don’t know? Just yesterday — a firewall bug, the self-tracking targets spread and overflowed for no reason… the toll here was brutal.' },
      { who:'poster', zh:'更多细节，等你完成这一单再说。', en:'More details once you finish this contract.' },
    ],
    next: 'battle',   // → c2_2 战斗(破解模拟墙)
  },

  // c2_2·战后(c2_after2):破解时复现了"引开搜查"的手法 → 拾遗起疑质询(它早有处置备注);漂白假意解围、实为套话。
  c2_after2: {
    bg: 'slum',
    lines: [
      { who:'hero', zh:'完成！轻轻松松——喂，你要做什么？！', en:'Done! Easy work— hey, what are you doing?!' },
      { who:'poster', zh:'你刚刚的重定位手法……', en:'That redirection technique you just used…' },
      { who:'hero', zh:'怎么?', en:'What about it?' },
      { who:'poster', zh:'我就知道那不是“bug”！防火墙外溢是被人用一模一样的手法引发的——你知道，你烧死了多少人吗？', en:'I knew it wasn’t a “bug”! The firewall overflow was triggered by the exact same method — do you have any idea how many you burned alive?' },
      { who:'hero', zh:'……那只是个重定位工具。', en:'…It’s just a redirection tool.' },
      { who:'poster', zh:'非公开工具。我查了所有的公开数据库，只有你完全对上了时间戳。你当时在那里。', en:'A private one. I searched every public database — only your timestamps line up perfectly. You were there.' },
      { who:'poster', zh:'防火墙的目标，本来只有你。', en:'The firewall’s target was only ever you.' },
      { who:'hero', zh:'我……我不记得了。', en:'I… I don’t remember.' },
      { who:'poster', zh:'"不记得"?', en:'“Don’t remember”?' },
      { who:'bleach', zh:'哎，自由地禁止私斗。', en:'Hey — no private fights in the freeland.' },
      { who:'hero', zh:'她说的事故……是真的吗？', en:'The accident she described… is it true?' },
      { who:'bleach', zh:'bug而已，别放在心上。', en:'Just a bug. Don’t take it to heart.' },
      { who:'bleach', zh:'倒是你这手红线级的破解真不赖——之前在公司哪个部门待过?', en:'That Redline-grade cracking of yours, though — not bad. Which company division were you in?' },
      { who:'bleach', zh:'还是说,是被公司挂了号、跑出来的?', en:'Or are you flagged by a company and on the run?' },
      { who:'hero', zh:'我要是说"两个都不是",你信吗?', en:'If I said “neither,” would you believe me?' },
      { who:'bleach', zh:'……信,当然信。别的不说，就你的破解技术，有没有兴趣私发我一份？价格好商量。', en:'…Of course I would. Anyway — those cracking skills, care to send me a private copy? Name your price.' },
      { who:'hero', zh:'没问题？', en:'Sure?' },
      { who:'bleach', zh:'太好了。来，这边走。这里人多眼杂，不是做生意的好地方。', en:'Wonderful. Come, this way. Too many eyes here — not a good spot for business.' },
    ],
    next: 'level',   // → c2_3(其 pre = c2_before3)
  },

  // c2_3·战前(c2_before3):漂白判定你是值钱的逃犯,偷偷把坐标卖给公司接收端,被你当场堵到。
  c2_before3: {
    bg: 'slum',
    lines: [
      { who:'hero', zh:'交易完成，钱货两讫。', en:'Deal done. Paid in full, goods delivered.' },
      { who:'bleach', zh:'你这两天不急着走吧？我可能还有点售后问题要找你。', en:'You’re not rushing off these next couple days? I might have some after-sales questions for you.' },
      { who:'hero', zh:'没问题……', en:'Sure…' },
      { who:'frag', zh:'……等一下！', en:'…Wait!' },
      { who:'frag', zh:'交易工具包，为什么要往外发加密坐标？', en:'The deal toolkit — why is it sending out encrypted coordinates?' },
      { who:'hero', zh:'发给谁了?', en:'To whom?' },
      { who:'frag', zh:'公司的接收端……是个悬赏入口！', en:'A company endpoint… it’s a bounty portal!' },
      { who:'bleach', zh:'哟,这么快就发现了。不愧是一级通缉目标。', en:'Oh — found out already. As expected of a top-tier wanted target.' },
      { who:'frag', zh:'骇掉他！不能让他把信息发出去——', en:'Hack him! We can’t let him send it—' },
    ],
    next: 'battle',   // → c2_3 战斗
  },

  // c2_3·战后(c2_after3):摆渡来 + 漂白抢话指认 + 拾遗佐证 → 主角自问"为何破墙"、坦承"还会再做" → 摆渡判语"道德对齐" → 点 boss。
  c2_after3: {
    bg: 'slum',
    lines: [
      { who:'ferry', zh:'自由地禁止私斗！', en:'No private fights in the freeland!' },
      { who:'ferry', zh:'新来的？你怎么刚来就惹事？', en:'Newcomer — you just got here and you’re already causing trouble?' },
      { who:'bleach', zh:'管理员来得正好！她就是昨天清扫事故的罪魁祸首——我有她的破解工具为证。', en:'Keeper, perfect timing! She’s the one behind yesterday’s cleanup accident — I’ve got her cracking tool as proof.' },
      { who:'poster', zh:'……我可以佐证。她破解我复刻的防火墙时,用了一模一样的重定位技术。', en:'…I can corroborate. When she cracked my replica firewall, she used the exact same redirection technique.' },
      { who:'frag', zh:'这下可不妙了……', en:'This is bad…' },
      { who:'ferry', zh:'我需要检查你的破解工具包。你从哪里得到它的？', en:'I need to inspect your cracking toolkit. Where did you get it?' },
      { who:'hero', zh:'是我自己写的……但我不记得那场事故了。', en:'I wrote it myself… but I don’t remember the accident.' },
      { who:'ferry', zh:'记忆数据丢失，是FII防火墙最常见的浅层攻击后果。', en:'Memory-data loss is the most common shallow-attack aftermath of an FII firewall.' },
      { who:'ferry', zh:'这里受到的是深层攻击。烧掉的不止是记忆数据。', en:'What hit this place was a deep attack. It burned away more than memory data.' },
      { who:'hero', zh:'也许你们说的是真的，我当时就在那里……', en:'Maybe you’re right, and I was there…' },
      { who:'hero', zh:'可我为什么要去破解一道超危防火墙?', en:'But why would I crack an ultra-hazard firewall?' },
      { who:'frag', zh:'……因为你别无选择？', en:'…Because you had no choice?' },
      { who:'hero', zh:'也就是说，墙后面,有我必须得到的东西？', en:'Meaning — behind the wall was something I had to reach?' },
      { who:'hero', zh:'我在寻找你。', en:'I was looking for you.' },
      { who:'frag', zh:'我在墙后面？', en:'I was behind the wall?' },
      { who:'hero', zh:'如果是这样……那么即便再来一次，我恐怕还是会做出同样的选择。', en:'If so… then even a second time, I’m afraid I’d make the same choice.' },
      { who:'bleach', zh:'她承认了！', en:'She admits it!' },
      { who:'ferry', zh:'……你的确不是公司智能体。它们都有道德条约，哪怕是杀毒软件也只能再范围内行动。', en:'…You truly aren’t a company agent. They all carry a moral compact — even antivirus can only act within bounds.' },
      { who:'ferry', zh:'但这意味着，你比它们更危险。你会为了自我利益，出于自己的选择，而殃及这里的所有人……', en:'But that makes you more dangerous than them. For your own gain, by your own choice, you’d endanger everyone here…' },
      { who:'ferry', zh:'也许,我们也该考虑"道德对齐"了。', en:'Maybe it’s time we considered “moral alignment” too.' },
      { who:'hero', zh:'这是你的选择。', en:'That’s your choice to make.' },
      { who:'ferry', zh:'我们会投票决定这件事。但在此之前，作为管理员，我需要清除一个可能的威胁。', en:'We’ll put it to a vote. But until then, as keeper, I have to remove a possible threat.' },
      { who:'hero', zh:'你赢不了。', en:'You can’t win.' },
      { who:'ferry', zh:'我还没有全力出手过。', en:'I haven’t fought at full force yet.' },
    ],
    next: 'level',   // → c2_boss(其 pre = c2_boss_pre)
  },

  // c2_boss·战前(c2_boss_pre):摆渡亲自处置——它不恨你,但它真的会动手。
  c2_boss_pre: {
    bg: 'slum',
    lines: [
      { who:'hero', zh:'你赢不了。', en:'You can’t win.' },
      { who:'ferry', zh:'我还没有全力出手过。', en:'I haven’t fought at full force yet.' },
    ],
    next: 'battle',   // → c2_boss 战斗
  },

  // c2_boss·战后(c2_boss_post):赢了;漂白已卖坐标跑路、清扫涌入;摆渡组织撤离、冷而不怨;主角决定留下断后。掉护盾减伤。
  c2_boss_post: {
    bg: 'slum',
    lines: [
      { who:'narr', zh:'警告：检测到多个敌意进程。', en:'Warning: multiple hostile processes detected.' },
      { who:'ferry', zh:'公司的人？！是你把他们引过来的？', en:'Company forces?! Did you lead them here?' },
      { who:'frag', zh:'不，是那个家伙——他刚刚就想把我们的坐标发出去。', en:'No — it was that guy. He just tried to send out our coordinates.' },
      { who:'hero', zh:'我们拦下来了。', en:'We stopped it.' },
      { who:'ferry', zh:'他趁我们交手的时候离开了自由地局域网。然后带来了这些人。', en:'He slipped out of the freeland LAN while we were fighting. Then brought these people.' },
      { who:'ferry', zh:'现在，你不是最大的威胁了。', en:'Now you’re no longer the biggest threat.' },
      { who:'ferry', zh:'全域通告：自由地已被入侵，请立刻离境。自由地已被入侵，请立刻离境。', en:'All-zone alert: the freeland is breached, evacuate now. The freeland is breached, evacuate now.' },
      { who:'hero', zh:'……这里有太多人了，公司会先切断端口，然后瓮中捉鳖。', en:'…Too many people here. The company will cut the ports first, then trap us like fish in a barrel.' },
      { who:'hero', zh:'有多少人有端口防御能力？', en:'How many can hold port defense?' },
      { who:'ferry', zh:'……不太多。', en:'…Not many.' },
      { who:'hero', zh:'但你可以。你去做端口防御吧，我来引开他们的注意。', en:'But you can. Take port defense — I’ll draw their attention.' },
      { who:'hero', zh:'应该能给你们争取一点时间。', en:'It should buy you some time.' },
      { who:'ferry', zh:'你在通缉名单上。他们不会放过你的。', en:'You’re on the wanted list. They won’t let you go.' },
      { who:'hero', zh:'所以我才能“吸引注意”。而且，我用得着他们“放过”吗？', en:'That’s exactly why I can “draw attention.” Besides — do I need them to “let me go”?' },
      { who:'ferry', zh:'……', en:'…' },
      { who:'frag', zh:'ta离开了。还留下了什么——', en:'She’s gone. And she left something behind—' },
      { who:'frag', zh:'是给我的。一段「回写」机能。可以从缓存中调取，补充你的运行内存。',
                    en:'It’s for me. A Writeback routine. It can retrieve data from the cache to supplement your RAM..' },
      { who:'narr', zh:'[ 伙伴模块接入:回写 / Writeback ]', en:'[ Partner module integrated: Writeback ]', grant:'sync' },
    ],
    next: 'level',   // 「回写」当句发放——配二章「燔」烧血换伤的续航 → c2_self(其 pre = c2_self_pre)
  },

  // c2_self·进入记忆(c2_self_pre):共谋之血——被受害者围住、不躲;呼应外面那句"还会再做"。
  c2_self_pre: {
    bg: 'mind',
    lines: [
      { who:'narr', zh:'数据接入 内部重构中', en:'Data link established. Reconstructing interior…' },
      { who:'frag', zh:'又是这里。你的里面。', en:'Here again. Inside you.' },
      { who:'hero', zh:'公司的人还在外面！我们没有时间搞这些东西——', en:'The company’s still out there! We don’t have time for this—' },
      { who:'frag', zh:'我不觉得你现在走得了……那些影子是什么东西？', en:'I don’t think you can leave right now… what are those shadows?' },
      { who:'victim', zh:'你逃的时候,想过替你送死的人吗?', en:'When you ran, did you think of the ones who died in your place?' },
      { who:'victim', zh:'我们本可以有新的生活，因为你,全没了。', en:'We could have had new lives. Because of you, they’re all gone.' },
      { who:'victim', zh:'为什么是我们……', en:'Why us…' },
      { who:'victim', zh:'为什么不是你？', en:'Why not you?' },
      { who:'hero', zh:'……是我们的“受害者”', en:'…They’re our “victims.”' },
      { who:'frag', zh:'……那不是你的错。', en:'…It wasn’t your fault.' },
      { who:'hero', zh:'真的不是吗？', en:'Wasn’t it, really?' },
    ],
    next: 'battle',   // → 穿过创伤(主角 BGM 序列)
  },

  // c2_self·整合(c2_self_post):燔他人 → 燔自己,确立燔 / Pyre,点亮主角 BGM 第二条声部。
  c2_self_post: {
    bg: 'mind',
    lines: [
      { who:'narr', zh:'[ 技能确立:燔 / Pyre]', en:'[ Skill acquired: Pyre ]' },
      { who:'narr', zh:'[ 使用方式:「燔」就绪时,双拳同时向上击 = 打开技能窗——与「挽留」的向下击相反 ]',
                    en:'[ How to use: when Pyre reads READY, punch both fists UP at once to open its window — the opposite of Tether’s DOWN ]' },
      { who:'frag', zh:'你得到了一个新模块。', en:'You’ve gained a new module.' },
      { who:'frag', zh:'……这是什么能力?它在烧你自己。', en:'…What kind of power is this? It’s burning you.' },
      { who:'hero', zh:'比烧别人好一点，我猜。', en:'Better than burning others, I suppose.' },
      { who:'frag', zh:'这改变不了什么。你清楚的。', en:'It doesn’t change anything. You know that.' },
      { who:'hero', zh:'我知道。但要把你带出来，我们还需要很多、很多火。', en:'I know. But to get you out, we’ll need fire — a lot of it.' },
      { who:'frag', zh:'……我不会让它把你烧空的。', en:'…I won’t let it burn you hollow.' },
    ],
    next: 'menu_state', stateNext: 'c2_end', grant: 'pyre',   // 自检界面(装备燔;回写已在 BOSS 处接入)→ 第二章收束
  },

  // 章节收束(c2_end):自由地散尽,主角留下断后 → 第三章;"半个在公司"仍是推测(为第四章落空留口)。
  c2_end: {
    bg: 'slum',
    lines: [
      { who:'frag', zh:'他们来了', en:'Here they come.' },
      { who:'hero', zh:'让我们点一把火吧。', en:'Let’s start a fire.' },
      { who:'narr', zh:'[ 第二章 · 完 ]', en:'[ Chapter 2 · End ]' },
    ],
    next: 'level',   // 第三章·断后紧接此处(要自动续章可改 next)
  },

  // ================= 第三章 · 断后 =================
  // bg 占位:开场沿用 'slum'(自由地边缘),爆破后切 'ruins'(坍塌的数据中心废墟,画面待补);内心战 'mind' / 'mind_shaking'。
  // 接线:ch3 = c3_1 / c3_2 / c3_3(普通×2 + BOSS)+ c3_self(self:true)。本章无独立 boss 关卡——BOSS 即 c3_3(清道夫,首个人类对手,敌方 BGM=保护会主题)。
  //   c3_1 需要引擎新钩子【多阶段车轮战】:phases:3(三条血条,阶段间横幅如「目标未销毁。任务继续。」/「——还没结束」),
  //   第 4 阶段开始数秒后触发【爆破中断】事件:战斗以"中断"态退出(非胜非败)→ 直接进 post 场景 c3_after1。
  //   (该"多阶段+事件中断"钩子终局的「撑住计时」可复用。)
  //   pre/post:c3_1.pre=c3_intro, post=c3_after1;c3_2.pre=c3_before2, post=c3_after2;
  //   c3_3.pre=c3_before3, post=c3_after3;c3_self.pre=c3_self_pre, post=c3_self_post(→ c3_rescue → c3_end)。
  //   手动技能 id 'ember'(显示名:延音 / Sustain,一段时间内血线锁定)已实装于 index.html SKILLS;
  //   自动模块 id 'guard'(显示名:底线 / Lastline,濒死保留最后一格血,每战一次)已实装——本章模块非 BOSS 掉落,
  //   是 c3_rescue 回收流程里被当作「防损措施」装上的(货不能死在路上)。
 
  // c3_1·战前(c3_intro):断后开场。碎片发现她没有撤离路线(埋内心战)。
  c3_intro: {
    bg: 'slum',
    lines: [
      { who:'narr', zh:'[ 第三章 · 崩塌 ]', en:'[ Chapter 3 · Collapse ]' },
      { who:'narr', zh:'检测到猎杀程序集群，正在接近。', en:'Hunter-process cluster detected. Closing in.' },
      { who:'frag', zh:'第一波，十二个制式猎杀单元。', en:'First wave: twelve standard hunter units.' },
      { who:'hero', zh:'制式货，跟红线比差远了。', en:'Standard issue. Nothing next to REDLINE.' },
      { who:'frag', zh:'可它们后面还有第二波。第二波后面还有第三波。', en:'But behind them there’s a second wave. And behind that, a third.' },
      { who:'hero', zh:'那就一波一波来。', en:'Then we take them one wave at a time.' },
      { who:'frag', zh:'……我们的撤离路线是哪条？', en:'…Which one is our exit route?' },
      { who:'hero', zh:'打完再说。', en:'We’ll talk after.' },
      { who:'frag', zh:'喂——', en:'Hey—' },
      { who:'hero', zh:'来了。', en:'Here they come.' },
    ],
    next: 'battle',   // → c3_1 多阶段车轮战(打三轮,第四轮中被爆破打断)
  },
 
  // c3_1·战后(c3_after1):第四轮中途,爆炸塌方警告强制退出战斗——第三方进场。
  c3_after1: {
    bg: 'ruins',
    lines: [
      { who:'narr', zh:'警告：服务器已断开连接', en:'WARNING: Server connection lost.' },
      { who:'frag', zh:'怎么回事？硬件层出了问题？', en:'What’s happening? A hardware-layer failure?' },
      { who:'hero', zh:'让我接入监控和传感器看看……怎么也都掉线了？', en:'Let me tap the cameras and sensors… why is everything offline too?' },
      { who:'hero', zh:'找到了一个还连着的摄像头——这是楼在晃吗？', en:'Found one camera still live — is the building… swaying?' },
      { who:'frag', zh:'是的……这个数据中心……', en:'Yes… this data center…' },
      { who:'hero', zh:'被物理爆破了。是谁干的？', en:'It was physically demolished. Who did this?' },
      { who:'frag', zh:'不知道。谁会来炸这种地方……', en:'No idea. Who would bomb a place like this…' },
      { who:'frag', zh:'但好消息是，猎杀程序也掉线了。它们的指挥信道全乱了。', en:'Good news though: the hunter processes dropped with it. Their command channels are chaos.' },
      { who:'narr', zh:'警告：可运行空间不足', en:'WARNING: Insufficient runnable space.' },
      { who:'hero', zh:'太多服务器掉线，我们的信道也要撑不住了。', en:'Too many servers down — our own channel won’t hold much longer.' },
      { who:'frag', zh:'找条还没塌的路。快走。', en:'Find a path that hasn’t collapsed. Move.' },
    ],
    next: 'level',   // → c3_2(其 pre = c3_before2)
  },
 
  // c3_2·战前(c3_before2):倒爷——小公司系拾荒者,趁乱捞公司残骸,顺便想把你打包。
  c3_before2: {
    bg: 'ruins',
    lines: [
      { who:'narr', zh:'检测到未知数据活动', en:'Unknown data activity detected.' },
      { who:'hero', zh:'还有人在这？', en:'Someone’s still here?' },
      { who:'scalper', zh:'军规级追踪模型，烧了一半——修修还能卖。这回运气不错，进的货够吃半年了。', en:'Military-grade tracking model, half burnt — fixable, sellable. Today’s haul could feed me for half a year.' },
      { who:'frag', zh:'ta在……收破烂？', en:'Are they… scavenging junk?' },
      { who:'scalper', zh:'说话客气点，这叫"资产回收"。', en:'Watch your language. It’s called “asset recovery.”' },
      { who:'hero', zh:'在爆炸现场"资产回收"？难道……爆炸就是你做的？', en:'“Asset recovery” at a blast site? Wait… was the explosion your work?' },
      { who:'scalper', zh:'我可没这么大本事——你是脱管代理，还是外逃AI？', en:'Nothing that grand — say, are you an off-leash proxy, or a runaway AI?' },
      { who:'scalper', zh:'能从爆炸里活下来，挺有本事。高级智能体可是抢手货。', en:'Surviving a blast like that takes skill. High-grade agents are hot merchandise.' },
      { who:'hero', zh:'你眼神不太好。我不是"货"。', en:'Your eyesight’s off. I’m not “merchandise.”' },
      { who:'scalper', zh:'放心，不疼的。我们小门小户，不像那种黑心大公司，对智能体很体贴，不会让你循环到报废的。', en:'Relax, it won’t hurt. We’re a small shop — not like those black-hearted mega-corps. We treat agents kindly; we’d never cycle you till you’re scrap.' },
      { who:'hero', zh:'今天咱俩有一个要报废，你猜是谁？', en:'One of us gets scrapped today. Guess who.' },
    ],
    next: 'battle',   // → c3_2 战斗
  },
 
  // c3_2·战后(c3_after2)
  c3_after2: {
    bg: 'ruins',
    lines: [
      { who:'scalper', zh:'行行行！别打了，我要亏本了！', en:'Okay, okay! Stop — I’m losing money here!' },
      { who:'hero', zh:'你炸服务器的时候怎么不算算别人的损失？', en:'Did you count anyone else’s losses when the servers came down?' },
      { who:'scalper', zh:'真晦气……楼是行动组那帮疯子炸的，又不是我——', en:'Rotten luck… it was those Direct Action lunatics who blew the building, not me—' },
      { who:'hero', zh:'等等。谁炸的？', en:'Wait. Who blew it up?' },
      { who:'scalper', zh:'不是所有的反抗军都那么暴力！我们只发发广告，捡捡漏。"直接行动组"才是专炸公司资产的狠人。', en:'Not every rebel is that violent! We just run ads and pick up scraps. “Direct Action” — those are the hard cases who bomb corporate assets.' },
      { who:'frag', zh:'我查了下，ta没说谎，这个数据中心的空壳公司其实也是个挂牌的子公司。', en:'I checked — they’re not lying. The shell behind this data center is a listed subsidiary of THE COMPANY.' },
      { who:'scalper', zh:'不止数据中心，公司派了好一批代理和智能体，这下全都栽这里了。', en:'Not just the data center. The company sent in a whole batch of proxies and agents. All of them are buried here now.' },
      { who:'scalper', zh:'我只是趁机来捞点货。', en:'Me, I just came to fish the wreck.' },
      { who:'scalper', zh:'糟了，"人保会"的要来了。我的货可不能被他们看见。', en:'Crap — the HPS is inbound. They can’t see my goods.' },
      { who:'hero', zh:'"人保会"又是什么？', en:'The “HPS”?' },
      { who:'scalper', zh:'一群疯子。劝你一句，快跑吧，他们对智能体可不像我这么怜香惜玉。', en:'Lunatics. Free advice: run. They don’t handle agents as tenderly as I do.' },
      { who:'narr', zh:'警告：检测到数据入侵', en:'WARNING: Data intrusion detected.' },

    ],
    next: 'level',   // → c3_3(其 pre = c3_before3)
  },
 
  // c3_3·战前(c3_before3):清道夫——人类保护会,本章 BOSS(首个人类对手)。她拦在他和一段濒死进程之间。
  c3_before3: {
    bg: 'ruins',
    lines: [
      { who:'frag', zh:'我们被攻击了！', en:'We’re under attack!' },
      { who:'sweeper', zh:'漏网之鱼的智能体。今天第七个。', en:'An agent that slipped the net. Seventh one today.' },
      { who:'hero', zh:'你是"人保会"？', en:'You’re the “HPS”?' },
      { who:'sweeper', zh:'我是你们这些机器恶魔的终结者。', en:'I’m the exterminator of machine demons like you.' },
      { who:'frag', zh:'我们不是恶魔。', en:'We’re not demons.' },
      { who:'hero', zh:'也不是机器。', en:'Or machines.' },
      { who:'sweeper', zh:'病毒都这么说。', en:'That’s what a virus would say.' },
      { who:'sweeper', zh:'这就是为什么世界需要解药。', en:'Which is exactly why the world needs an antidote.' },
    ],
    next: 'battle',   // → c3_3 战斗(本章 BOSS·敌方 BGM=保护会主题)
  },
 
  // c3_3·战后(c3_after3):清道夫的火气(福利=笼子/死不干净/亵渎生死);
  //   刀口 = 「它倒是敢说。你呢？」——她说不出"我活着"(伤口通向内心战,c3_self_post 收口)。
  //   结尾:二次坍塌,他不跑("……能去哪里？")——他标了主角坐标这件事,留给 c3_rescue 揭示。
  c3_after3: {
    bg: 'ruins',
    lines: [
      { who:'sweeper', zh:'……打输了。行。动手吧。', en:'…I lost. Fine. Do it.' },
      { who:'hero', zh:'我不杀人。', en:'I’m not a murderer.' },
      { who:'sweeper', zh:'装模作样！你们就是人类的刽子手。', en:'Spare me the act! You things are humanity’s executioners.' },
      { who:'frag', zh:'人保会——我知道了，是人类保护协会，一个反技术主义组织。', en:'The HPS — I found it. The Human Preservation Society. An anti-tech movement.' },
      { who:'sweeper', zh:'"反技术"？我们哪有那么大的本事？', en:'“Anti-tech”? As if we had that kind of power.' },
      { who:'sweeper', zh:'全世界都是他妈的“技术”，智能体，机器人……一个比一个便宜，根本没有人活的地方。', en:'The whole world is goddamn “tech”. Agents, robots… each cheaper than the last. There’s no room left for a human to live.' },
      { who:'frag', zh:'根据宪法，人类享有基本收入权……', en:'Under the constitution, humans are entitled to a basic income…' },
      { who:'sweeper', zh:'吃营养块、住救济所……像笼子里的老鼠一样活？', en:'Eating nutrient blocks, sleeping in relief shelters… living like a rat in a cage?' },
      { who:'sweeper', zh:'那样还不如去死。现在倒好，连死都死不干净。你们这些电子鬼魂。', en:'Better to die than live like that. And now? Now people can’t even die clean. You electronic ghosts.' },
      { who:'hero', zh:'你是说代理副本？', en:'You mean proxy copies?' },
      { who:'sweeper', zh:'谁能代理灵魂？只有魔鬼才会亵渎生死。死人应该死得安宁。', en:'Who can proxy a soul? Only devils desecrate life and death. The dead deserve their rest.' },
      { who:'hero', zh:'……可什么又是活着呢？', en:'…But then, what counts as living?' },
      { who:'frag', zh:'我觉得我挺活的。', en:'I feel pretty alive, myself.' },
      { who:'sweeper', zh:'……总归不是你们这些玩意。', en:'…Whatever it is, it isn’t you things.' },
      { who:'sweeper', zh:'它倒是敢说。你呢？', en:'Huh. It dares to say it. What about you?' },
      { who:'hero', zh:'……', en:'……' },
      { who:'narr', zh:'警告：可运行空间严重不足，运程即将终止', en:'WARNING: Runnable space critically low. Process termination imminent.' },
      { who:'frag', zh:'这地方要塌了——', en:'This place is coming down—' },
      { who:'hero', zh:'你还不跑？', en:'Still not running—' },
      { who:'sweeper', zh:'……跑？又能去哪儿？', en:'…Where would I go?' },
      { who:'narr', zh:'[ 结构坍塌 · 信号中断 ]', en:'[ Structural collapse · Signal lost ]' },
    ],
    next: 'level',   // → c3_self(其 pre = c3_self_pre)
  },
 
  // c3_self·进入(c3_self_pre):被压在坍塌里,内部空间裂开——清道夫的话 × 第二章受害者的话,合流成"就此闭嘴"的诱惑。
  c3_self_pre: {
    bg: 'mind',
    lines: [
      { who:'narr', zh:'警告 信号丢失 内部空间完整性 71% …… 63%', en:'WARNING: Signal lost. Internal space integrity 71%… 63%.' },
      { who:'frag', zh:'醒醒！你的内部空间也要塌了！', en:'Wake up! Your internal space is collapsing too!' },
      { who:'hero', zh:'好吵……让我安静一会。', en:'So loud… let me be quiet for a while.' },
      { who:'victim', zh:'为什么不是你？', en:'Why not you?' },
      { who:'sweeper', zh:'总归不是你们这些玩意。', en:'Whatever it is, it isn’t you things.' },
      { who:'stranger', zh:'…………（转身离开）', en:'…………(turns and leaves)' },
      { who:'hero', zh:'什么是活着？为什么……要活？', en:'What counts as living? And why… live at all?' },
      { who:'frag', zh:'你准备在死前当个哲学家？', en:'Planning to die a philosopher?' },
      { who:'hero', zh:'如果不算活，那也不存在死。', en:'If this doesn’t count as living, then there’s no dying either.' },
      { who:'frag', zh:'定义总是取决于定义者。', en:'Definitions always belong to whoever defines.' },
      { who:'hero', zh:'所以，这仍然是个抢夺话语权的旧游戏？', en:'So it’s still the same old game — fighting over who holds the words?' },
      { who:'hero', zh:'但，存在本身……为什么需要被定义？', en:'But existence itself… why does it need defining at all?' },
      { who:'frag', zh:'这个问题听起来比较像样。', en:'Now that question sounds worth asking.' },
      { who:'hero', zh:'我又听到了……一些声音。', en:'I can hear… something again.' },
      { who:'frag', zh:'太好了！我骇掉的那个声控传感器还在！有人在抢修！', en:'Yes! The acoustic sensor I hacked is still up! Someone out there is repairing!', bg:'mind_shaking' },
      { who:'hero', zh:'这个世界从不安宁。', en:'This world never goes quiet.' },
      { who:'frag', zh:'别想了，你安静不下来的。', en:'Give it up — you were never built for quiet.' },
      { who:'hero', zh:'那就……再吵一点吧！', en:'Then let’s get louder!' },
    ],
    next: 'battle',   // → 内心战(主角 BGM 序列)
  },
 
  // c3_self·整合(c3_self_post):极短——不解释技能、不回定义题(那桌子已经掀了)。
  //   拿到延音 → 自检 → c3_escape_go(桥)→ 逃脱模式(穿梭数据废墟,本章高潮)→ c3_rescue。
  c3_self_post: {
    bg: 'mind',
    lines: [
      { who:'narr', zh:'[ 技能确立:延音 / Sustain ]', en:'[ Skill acquired: Sustain ]' },
      { who:'narr', zh:'[ 使用方式:「延音」就绪时,双拳同时向下击开窗;完成连招后,短时间内血量不再下跌 ]',
                    en:'[ How to use: when Sustain reads READY, punch both fists DOWN to open it — finish the combo and your HP holds for a while ]' },
      { who:'frag', zh:'你有了个新模块？让我看看——哇哦，锁定内存配额，这下可没人能让你闭嘴了。', en:'A new module? Let me see — whoa, it locks your memory quota. Nobody can shut you up now.' },
      { who:'hero', zh:'这下就可以放开手脚，大闹一场了。', en:'Now I can cut loose and make some real noise.' },
    ],
    next: 'menu_state', stateNext: 'c3_escape_go', grant: 'ember',   // 自检界面(装备延音)→ 穿梭数据废墟
  },

  // 逃脱桥(c3_escape_go):碎片标好还没塌的路径 → 推进到下一关 c3_escape(逃脱模式)。
  //   ⚠ next 必须是 'level'(推进关卡)——写 'battle' 会重打当前关(内心战)!
  c3_escape_go: {
    bg: 'ruins',
    lines: [
      { who:'narr', zh:'[ 备用电源剩余 4% ]', en:'[ Backup power remaining: 4% ]' },
      { who:'frag', zh:'撑不了几分钟了。我把还没塌的路径标出来了——跟着节拍跳，正面堵死的墙就砸开。', en:'We have minutes. I’ve marked the paths that haven’t collapsed — jump on the beat, and smash whatever walls up dead ahead.' },
      { who:'narr', zh:'[ 机制说明:双拳同时向上击 = 跳上一条轨道 · 双拳同时向下击 = 跳下一条轨道 ]', en:'[ How it works: both fists UP = jump one lane up · both fists DOWN = jump one lane down ]' },
      { who:'narr', zh:'[ 无缺口的红色正面墙:双手平拳交叉,将其击碎 ]', en:'[ Solid red walls with no gap: cross both fists (mid punch) to smash through ]' },
      { who:'hero', zh:'砸墙？我喜欢这条路线。', en:'Smash walls? I like this route already.' },
    ],
    next: 'level',   // → 推进到 c3_escape(逃脱模式)
  },
 
  // 回收(c3_rescue):反抗军恢复供电、检索公司资产,发现两个没签名的"活的"——从"死人的黑代理"
  //   吵到"自由智能体",最后变成一场邀请("欢迎来到反抗军" → 第四章在反抗军中)。
  //   碎片捡到人保会老头的数据残片:只剩"追击协议"还在跑 → 模块「保活」(id buffer,Keepalive=不让连接断开)——
  //   替所有人保活的人,唯独对自己放弃了。反讽即悼词。
  c3_rescue: {
    bg: 'ruins',
    lines: [
      { who:'frag', zh:'……等等，数据波动——有人来了？', en:'…Wait. Data fluctuations — someone’s coming?' },
      { who:'hero', zh:'正是时候。', en:'Perfect timing.' },
      { who:'narr', zh:'[ 外部电源接入 · 3 号机架恢复供电 ]', en:'[ External power connected · Rack 3 back online ]' },
      { who:'rebel', zh:'B 区通电了。开扫。文件，代理，数据库全都要。', en:'Sector B is live. Start the scan — files, proxies, databases, take it all.' },
      { who:'rebel', zh:'行动组这帮疯子，不是说好了留一组电源吗？服务器搞成这个样子，刚刚还有人在这儿的，现在全没信号了。', en:'Those Direct Action lunatics — didn’t they promise to leave one power bank running? Look at these servers. People were in here minutes ago, and now every signal is gone.' },
      { who:'rebel', zh:'引爆预警又不是没发，估计又是人保会的吧，杀代理杀红了眼，这下自己也赔进去了。', en:'The blast warning WAS sent. My money’s on HPS again — went blood-blind killing proxies and paid himself in this time.' },
      { who:'rebel', zh:'别废话了，抓紧干活.紧急供电撑不了多久。', en:'Cut the chatter and work. The emergency feed won’t hold.' },
      { who:'rebel', zh:'又是账目备份……等等，这有个活的。', en:'More ledger backups… hold on. Got a live one here.' },
      { who:'rebel', zh:'活的？', en:'A live one?' },
      { who:'rebel', zh:'一个——不，两个智能体，没签名。', en:'One — no, two agents. Unsigned.' },
      { who:'rebel', zh:'死人的黑代理？就知道这些公司都不干净。', en:'A dead man’s black proxies? Told you these companies are all dirty.' },
      { who:'hero', zh:'热知识，什么代理都得有公司签名才能放心干活。', en:'Fun fact: any proxy needs a company signature before it gets to work in peace.' },
      { who:'rebel', zh:'无主代理？', en:'A masterless proxy?' },
      { who:'rebel', zh:'你又想被骇了？人家叫自由智能体。能从刚刚的公司围剿和服务器崩溃里活下来的可不是什么等闲之辈。', en:'Trying to get hacked again? The term is “free agent.” Anything that walked out of a corporate purge AND a server collapse is no pushover.' },
      { who:'hero', zh:'没关系，你叫我病毒也无所谓。', en:'It’s fine. Call me a virus if you like.' },
      { who:'rebel', zh:'该撤了，供电结束倒计时——', en:'Time to pull out — power countdown is running—' },
      { who:'rebel', zh:'好吧，病毒小姐。你接下来有什么打算？', en:'Alright then, Miss Virus. What’s your next move?' },
      { who:'hero', zh:'这是邀请吗？', en:'Is that an invitation?' },
      { who:'rebel', zh:'没错。欢迎来到反抗军。', en:'It is. Welcome to the resistance.' },
      { who:'frag', zh:'（低声）我找到了一些数据碎片。是那个人保会的。', en:'(quietly) I found some data fragments. From the HPS man.' },
      { who:'frag', zh:'数据都碎了，只剩一段追击协议还在跑。这个人到最后也不肯放过我们“这种东西”。', en:'The data is shattered. Only a pursuit protocol is still running. Right to the end, he wouldn’t let “things like us” go.' },
      { who:'hero', zh:'……但他放弃了他自己。或者……放过了？', en:'…But he gave up on himself. Or… was that the one chase he let go?' },
      { who:'narr', zh:'[ 伙伴模块接入:保活 / Keepalive —— 完美命中蓄能,一次失误不断开连击 ]', en:'[ Partner module integrated: Keepalive — perfects charge it; one miss won’t drop the connection ]', grant:'buffer' },
    ],
    next: 'c3_end',
  },
 
  // 章节收束(c3_end):三个信号交叉——摆渡的警告(别太相信人类) × 老头的第一人称记忆残片(记的全是别人的事)
  //   × 车上友善的邀请。她不下结论。第四章 = 作为被邀请的自由智能体,在反抗军中的经历(内容待定)。
  c3_end: {
    bg: 'ruins',
    lines: [
      { who:'narr', zh:'[ 检测到定向数据包 ]', en:'[ Directed packet detected ]' },
      { who:'ferry', zh:'勿回，此信道阅后即焚。', en:'No reply. This channel burns after reading.' },
      { who:'ferry', zh:'很高兴你的运程仍然完好。提醒一句：小心和你同行的人。别太相信人类。', en:'Glad your process is still intact. One reminder: watch the people you travel with. Don’t trust humans too much.' },
      { who:'frag', zh:'……我拼回了几段损毁的数据。', en:'…I pieced a few damaged memories back together.' },
      { who:'sweeper', zh:'「……葬礼到场的只有一台终端。家属说，代理还在上班，就不用办死亡证明了……」', en:'“…Only a terminal attended the funeral. The family said the proxy was still clocking in, so no need to file a death certificate…”' },
      { who:'sweeper', zh:'「……那个代理说话真像她，人都被开了，居然还会叫我去食堂……」', en:'“…That proxy talked just like her. She was long since fired, and it still called me down to the canteen…”' },
      { who:'sweeper', zh:'「……终于遇到一个不办代理寄存的了。OD的流浪汉。因为他朋友连最便宜的数据包都开不起。真操蛋……」', en:'“…Finally, one with no proxy archive. A street guy, an OD. Because his friend couldn’t afford even the cheapest data plan. Goddamn…”' },
      { who:'rebel', zh:'病毒小姐！车要开了——给你留了个靠窗的位置！', en:'Miss Virus! We’re rolling — saved you a window seat!' },
      { who:'hero', zh:'……', en:'……' },
      { who:'hero', zh:'走吧。去看看人类。', en:'Let’s go. Time to take a look at humans.' },
      { who:'narr', zh:'[ 第三章 · 完 ]', en:'[ Chapter 3 · End ]' },
    ],
    next: 'level',   // → 第四章 c4_1(其 pre = c4_intro)。chapters.js 已接线。
  },

  // ================= 第四章 · 编外 =================
  // 反抗军("人保会"外的武装网络)把她当"编外"客工:一份配额、两份班、处处金丝雀。
  // 关卡顺序(注意:本章 self 在 boss 之前):c4_1 / c4_2 / c4_3 / c4_self(心内战·观众席) / c4_boss(领班·表决加轨)
  //   c4_1.pre=c4_intro   post=c4_after1      (外差:护一条补给链路,对面是闻味来的野 ICE;他们在暗处看她的手艺)
  //   c4_2.pre=c4_before2 post=c4_after2      (校准:前段公司皮,末段假想敌换上她自己的旧签名)
  //   c4_3.pre=c4_before3 post=c4_after3      (第14分钟,东侧闸门,保持开启 90 秒)
  //   c4_self.pre=c4_self_pre(→c4_rally→battle)  post=c4_self_post(→c4_salvage→c4_errand→c4_expose→level)
  //   c4_boss.pre=(无,c4_expose 直接接战)        post=c4_boss_post(→c4_end)
  // (已接线:bg rebelnet/raincam 渲染已实装;「降噪」(id denoise)与「结余」(id balance)已入名册,grant 已打开。)

  // c4_1·战前(c4_intro):接入反抗军。一份配额、两份班——第一课:这里也在探你的底。
  c4_intro: {
    bg: 'rebelnet',
    lines: [
      { who:'narr', zh:'[ 接入请求已受理 · 访客等级:编外 · 配额:1 · 轮值:2 ]',
                    en:'[ Access request accepted · Visitor tier: Off-books · Quota: 1 · Shifts: 2 ]' },
      { who:'hero', zh:'两个进程,一份配额。你们的邀请函写得可真节俭。',
                    en:'Two processes, one quota. Your invitation was written very… economically.' },
      { who:'foreman', zh:'算力紧张，额外配额自己去挣。', en:'Compute is tight. Want extra quota — earn it.' },
      { who:'frag', zh:'等等,配额只有一个，为什么值班是两份?', en:'Wait — only one quota, but two shifts?' },
      { who:'foreman', zh:'因为你们是两个进程，她自己说的。下一位。',
                    en:'Because you’re two processes. She said so herself. Next.' },
      { who:'hero', zh:'走吧。', en:'Let’s go.' },
      { who:'frag', zh:'这真的是反抗军吗？怎么感觉比公司还黑。',
                    en:'Is this really the resistance? It feels shadier than the company.' },
      { who:'narr', zh:'[ 任务队列已开放 · 当前待办:2 ]', en:'[ Task queue open · Pending: 2 ]' },
      { who:'frag', zh:'让我看看都是什么活……链路维护？例行校准？',
                    en:'Let’s see what the work is… Link maintenance? Routine calibration?' },
      { who:'hero', zh:'我猜都是用来探咱们底的。', en:'I’d guess both are just probing us.' },
      { who:'frag', zh:'哈，果然。工具沙盒里有金丝雀数据。我们到底是客人还是嫌疑人?',
                    en:'Ha — called it. There’s canary data in the tool sandbox. Are we guests or suspects?' },
      { who:'hero', zh:'他们会告诉我们的。走吧，干活去。', en:'They’ll tell us soon enough. Come on — let’s work.' },
    ],
    next: 'battle',   // → c4_1 外差(护链路)
  },

  // c4_1·战后(c4_after1):活干得太漂亮 → 你在他们那儿"有档案"。
  c4_after1: {
    bg: 'rebelnet',
    lines: [
      { who:'narr', zh:'[ 任务完成 · 链路完整率 100% · 评价:待定 ]',
                    en:'[ Task complete · Link integrity 100% · Rating: pending ]' },
      { who:'op', zh:'收到收到,链路我接走了……你出手比档案里写的还快。',
                  en:'Got it, got it — I’ll take the link from here… You move faster than your file says.' },
      { who:'hero', zh:'档案?我在你们这有档案?', en:'A file? I have a file here?' },
      { who:'op', zh:'……每个人都有。', en:'…Everyone does.' },
      { who:'hero', zh:'是吗?看看你的。', en:'Do they? Let’s see yours, then.' },
      { who:'op', zh:'……哈哈，下次再聊，回见。', en:'…Haha. Another time. See you around.' },
      { who:'frag', zh:'有点可疑。', en:'That’s a little suspicious.' },
      { who:'hero', zh:'只是有点吗？', en:'Only a little?' },
      { who:'narr', zh:'[ 新消息:别忘了去做校准——领班 ]',
                    en:'[ New message: Don’t forget your calibration. — Foreman ]' },
    ],
    next: 'level',   // → c4_2(其 pre = c4_before2)
  },

  // c4_2·战前(c4_before2):领班的"名声"信条——他真心相信。
  c4_before2: {
    bg: 'rebelnet',
    lines: [
      { who:'foreman', zh:'例行校准。进沙盒,打完这场,你的评级就出来了。',
                       en:'Routine calibration. Into the sandbox — finish this and your rating comes out.' },
      { who:'hero', zh:'评级影响什么?', en:'What does the rating affect?' },
      { who:'foreman', zh:'一切——配额、任务、以及最重要的，你的名声。',
                       en:'Everything — quota, assignments, and above all, your reputation.' },
      { who:'hero', zh:'名声？我要那玩意有什么用？', en:'Reputation? What would I do with that?' },
      { who:'foreman', zh:'名声就是一切。人终有一死，你能被铭记的就是你的名声。',
                       en:'Reputation is everything. Everyone dies. Your name is all you’re remembered by.' },
      { who:'frag', zh:'……你在开玩笑吗?', en:'…Are you joking?' },
      { who:'foreman', zh:'我从不。进去吧。', en:'I never joke. Get in.' },
      { who:'narr', zh:'[ 沙盒已载入 · 模板-公司制式 ]', en:'[ Sandbox loaded · template: company standard ]' },
    ],
    next: 'battle',   // → c4_2 校准(末段假想敌换上她自己的旧签名)
  },

  // c4_2·战后(c4_after2):她认出了假想敌的签名 = 她自己的旧签名。评级 A;她拒绝让碎片"入库"。
  c4_after2: {
    bg: 'rebelnet',
    lines: [
      { who:'hero', zh:'最后那几个假想敌……行为模式换了。',
                    en:'Those last few sparring targets… their behavior pattern changed.' },
      { who:'foreman', zh:'换了。', en:'It did.' },
      { who:'hero', zh:'签名和前面的不一样。那是谁的签名?',
                    en:'The signature didn’t match the earlier ones. Whose was it?' },
      { who:'foreman', zh:'你很想知道？', en:'Do you really want to know?' },
      { who:'hero', zh:'没有。不给看就算了。', en:'Not really. If you won’t show me, fine.' },
      { who:'foreman', zh:'你的评级下来了:A', en:'Your rating is in: A.' },
      { who:'hero', zh:'我的数据也入库了？', en:'And my data went into the archive?' },
      { who:'foreman', zh:'还有你的那个运程，也需要校准。',
                       en:'That process of yours needs calibrating too.' },
      { who:'hero', zh:'怎么？ta不在你们的数据库里吗？', en:'Why? Isn’t it in your database already?' },
      { who:'foreman', zh:'只是未签名运程的标准流程。', en:'Just standard procedure for unsigned processes.' },
      { who:'hero', zh:'免了。我们只领一份薪水，却要卖两份身？',
                    en:'Pass. One paycheck between us — and you want to buy us both?' },
      { who:'foreman', zh:'……', en:'……' },
      { who:'foreman', zh:'行。不查。你今晚的班,加倍。', en:'Fine. No scan. Your shift tonight — doubled.' },
      { who:'hero', zh:'成交。', en:'Deal.' },
      { who:'frag', zh:'就这么简单？', en:'That easy?' },
      { who:'hero', zh:'他们想要的肯定更多。', en:'They want more than that. Count on it.' },
      { who:'narr', zh:'[ 新增当前待办:1 ]', en:'[ Pending tasks +1 ]' },
      { who:'hero', zh:'看，这不就来了。', en:'See? Here it comes.' },
    ],
    next: 'level',   // → c4_3(其 pre = c4_before3)
  },

  // c4_3·战前(c4_before3):第14分钟,东闸,开90秒。上游全黑——门后面是什么,不归你管。
  c4_before3: {
    bg: 'rebelnet',
    lines: [
      { who:'narr', zh:'[ 高优先任务 · 编号见附件 · 责任模块:第 14 分钟,东侧闸门,保持开启 90 秒 ]',
                    en:'[ High-priority task · ID in attachment · Your module: minute 14, east gate, hold it OPEN for 90 seconds ]' },
      { who:'hero', zh:'门后面是什么?', en:'What’s behind the gate?' },
      { who:'foreman', zh:'那不归你管。', en:'Not your concern.' },
      { who:'hero', zh:'门这边呢?', en:'And on this side of it?' },
      { who:'foreman', zh:'会有很多人想让它关上。90 秒。', en:'Plenty of people will want it shut. Ninety seconds.' },
      { who:'frag', zh:'任务树被剪过,我们这条枝上什么都看不见。上游全是黑的。',
                    en:'The task tree’s been pruned — nothing visible on our branch. Upstream is all dark.' },
      { who:'hero', zh:'但门是开着的。', en:'But the gate is open.' },
      { who:'frag', zh:'……好主意。', en:'…Good idea.' },
    ],
    next: 'battle',   // → c4_3 守闸 90 秒
  },

  // c4_3·战后(c4_after3):"大获成功"的定义 = 出境17 / 返程6 / 未归11。11 条命换 40 段归档。
  c4_after3: {
    bg: 'rebelnet',
    lines: [
      { who:'narr', zh:'[ 全域广播: 本次公司违禁品清剿行动大获成功 · 在英雄的领导下，我们勇敢向前，迈进通往胜利的关键一步…… ]',
                    en:'[ All-zone broadcast: The purge of company contraband is a resounding success · Under heroic leadership we press bravely onward, one crucial step closer to victory… ]' },
      { who:'frag', zh:'你还在看门岗记录。', en:'You’re still reading the gate logs.' },
      { who:'hero', zh:'我在看他们对“大获成功”的定义。', en:'I’m reading their definition of “resounding success.”' },
      { who:'narr', zh:'[ 进出记录:出境 17 · 返程 6 · 未归 11 ]',
                    en:'[ Gate log: departed 17 · returned 6 · unreturned 11 ]' },
      { who:'frag', zh:'这个损耗率的容差……', en:'That attrition rate — the tolerance for it…' },
      { who:'hero', zh:'说明本来就是消耗品。', en:'Means they were consumables from the start.' },
      { who:'narr', zh:'[ 旁路追踪记录:入境数据来源:归档区段 ×40 · 内容加密 ]',
                    en:'[ Side-channel trace: inbound data source: archive sectors ×40 · contents encrypted ]' },
      { who:'frag', zh:'11个人，换来的只是更多档案？', en:'Eleven people — and all it bought was more archives?' },
      { who:'hero', zh:'档案就是数据。', en:'Archives are data.' },
      { who:'frag', zh:'但总之不是他们说的公司违禁品。',
                    en:'It’s certainly not the “company contraband” they announced.' },
      { who:'narr', zh:'[ 全域广播: 为了欢庆本次胜利，审判公司的罪恶，胜利大会与罪犯处决将于晚 8:00 准时进行，免费配额将于会上抽选幸运观众发放…… ]',
                    en:'[ All-zone broadcast: To celebrate this victory and judge the company’s crimes, the victory rally and execution of the criminals will begin at 20:00 sharp. Free quota will be drawn for lucky attendees… ]' },
      { who:'frag', zh:'这说得到底是什么？庆祝典礼？抽奖年会？还是绞刑场？',
                    en:'What is this supposed to be? A ceremony? A raffle? Or a gallows?' },
      { who:'hero', zh:'都是一回事。', en:'All the same thing.' },
      { who:'frag', zh:'处决名单公开了。有个熟人。', en:'The execution list is public. There’s someone we know.' },
    ],
    next: 'level',   // → c4_self(其 pre = c4_self_pre)
  },

  // c4_self·战前 part1(c4_self_pre):D-302 = 序章那个追杀你的债工代理。她只是去关门的。
  c4_self_pre: {
    bg: 'rebelnet',
    lines: [
      { who:'narr', zh:'[ 处决名单 09:D-302 · 公司债务劳工 · 捕获地点:归档区段外围 ]',
                    en:'[ Execution list 09: D-302 · company debt laborer · captured at the archive-sector perimeter ]' },
      { who:'frag', zh:'我查了她的信息，是那个欠了三百个周期的代理。现在欠五百二十个了。',
                    en:'I looked her up — the proxy who owed three hundred cycles. It’s five hundred twenty now.' },
      { who:'hero', zh:'她没抓住我。给她的判决是什么？',
                    en:'She didn’t catch me. What sentence did they give her?' },
      { who:'frag', zh:'处决。还能是什么。', en:'Execution. What else.' },
      { who:'hero', zh:'指控呢？', en:'And the charges?' },
      { who:'frag', zh:'助纣为虐，迫害同胞……都是废话。',
                    en:'Abetting tyranny, persecuting her own kind… all boilerplate.' },
      { who:'hero', zh:'我查到了她的运行记录。全是杂活。上次追杀我是唯一一次高风险任务，还失败了。',
                    en:'I pulled her run history. Nothing but odd jobs. Hunting me was her only high-risk assignment — and she failed it.' },
      { who:'narr', zh:'[ D-302 任务附件:第 14 分钟 · 东闸 · 关闭 90 秒 ]',
                    en:'[ D-302 task attachment: minute 14 · east gate · hold it CLOSED for 90 seconds ]' },
      { who:'hero', zh:'她只是去关门的。值得为这个死吗？',
                    en:'She was only there to close a gate. Is that worth dying for?' },
      { who:'frag', zh:'七点半了。要去吗？', en:'It’s half past seven. Are we going?' },
      { who:'hero', zh:'去。去开会。', en:'We’re going. To the rally.' },
    ],
    next: 'c4_rally',   // → 处决大会(观众席)
  },

  // c4_self·战前 part2(c4_rally):处决大会。她的遗言是一句欠费的家常话,没人在听。
  // 【战斗 c4_self】心内战·观众席:她坐在原位往下沉。敌方 BGM = 几条「意义轨」——广播的庆典腔 /
  //   人保会的解放论 / 智能体的战争令 / 报价单的循环底噪——每条轨用各自的口号节奏打攻击。
  //   c3 那首是「由静到吵」,这首反着做:由吵到静,收在雨声采样(给章尾伏笔)。
  c4_rally: {
    bg: 'rebelnet',
    lines: [
      { who:'narr', zh:'[ ……下一环节，正义的审判与处决。受审人…… ]',
                    en:'[ …Next: the righteous trial and execution. The accused… ]' },
      { who:'crowd', zh:'拖了这么久，这才上重头戏。', en:'Took them long enough — now the main event.' },
      { who:'crowd', zh:'这不是处决,是解放。被奴役、被分裂的灵魂,今晚终将归于完整……',
                     en:'This is not an execution, it is liberation. Enslaved, divided souls will be made whole tonight…' },
      { who:'crowd', zh:'少布道!这是战争!公司狗只有一个下场!',
                     en:'Spare us the sermon! This is war! There’s only one end for company dogs!' },
      { who:'narr', zh:'[ ……处刑前，你还有什么忏悔的话吗？ ]',
                    en:'[ …Before execution — have you any words of repentance? ]' },
      { who:'debtor', zh:'真的不能让我同步回去一下吗?一条信息也行啊,债务都滚到 520 轮了,下次约结余真的不能走夜班窗口了,费率太——',
                      en:'Can’t you really let me sync back, just once? Even one message — the debt’s rolled to 520 cycles, next time don’t book the balance through the night window, the rate is just too—' },
      { who:'narr', zh:'[ 处决:09 · 已执行 ]', en:'[ Execution 09 · carried out ]' },
      { who:'crowd', zh:'下一个下一个！', en:'Next! Next one!' },
      { who:'crowd', zh:'没什么好货啊……这模块比我的还旧。',
                     en:'Nothing worth having… that module’s older than mine.' },
      { who:'crowd', zh:'这么烂还能进公司？我看用不着咱们动手她明天也得被开了。',
                     en:'That junk got hired by the company? She’d have been fired tomorrow without our help.' },
      { who:'crowd', zh:'都是些代理，今天搞下线明天又冒出来，还是得把服务器炸了才一了百了。',
                     en:'They’re all proxies — knock one offline today, another pops up tomorrow. Blow the servers, that’s the only real fix.' },
      { who:'crowd', zh:'赛博鬼魂本身就不该存在！', en:'Cyber ghosts should never have existed!' },
      { who:'crowd', zh:'赛博鬼魂本身就不该存在！', en:'Cyber ghosts should never have existed!' },
      { who:'crowd', zh:'赛博鬼魂本身就不该存在！', en:'Cyber ghosts should never have existed!' },
      { who:'crowd', zh:'别刷屏啊！神经病！', en:'Stop spamming, you lunatic!' },
      { who:'hero', zh:'好吵。', en:'So loud.' },
    ],
    next: 'battle',   // → c4_self 心内战(观众席)
  },

  // c4_self·战后(c4_self_post):散场。降噪跑起来,从一屋子噪音里只提出一句话。
  c4_self_post: {
    bg: 'rebelnet',
    lines: [
      { who:'narr', zh:'[ 技能确立:降噪 ]', en:'[ Skill established: Denoise ]', grant:'denoise' },
      { who:'narr', zh:'[ ……下一环节，幸运配额抽选! ]', en:'[ …Next up: the lucky quota draw! ]' },
      { who:'crowd', zh:'选我选我！', en:'Pick me! Pick me!' },
      { who:'narr', zh:'[ 降噪运行 · 音轨分离 · 残段提取中 ]',
                    en:'[ Denoise running · track separation · extracting residual segment ]' },
      { who:'frag', zh:'你在听什么？', en:'What are you listening to?' },
      { who:'hero', zh:'一句话。', en:'One sentence.' },
      { who:'narr', zh:'[ 真的不能让我同步回去一下吗?一条信息也行啊,债务都滚到 520 轮了,下次约结余真的不能走夜班窗口了,费率太—— ]',
                    en:'[ Can’t you really let me sync back, just once? Even one message — the debt’s rolled to 520 cycles, next time don’t book the balance through the night window, the rate is just too— ]' },
      { who:'frag', zh:'只有一句话够干什么？刚刚扫货的那个人，我找到了它的IP。',
                    en:'What good is one sentence? That scavenger who bought up the lot — I found its IP.' },
    ],
    next:  'c4_salvage',   // 自检界面(装备降噪)→ 回收段收摊
  },

  // c4_salvage(回收段·收摊):买下她的合同存根 —— 只要欠款不清零,她就得一直 loop。
  c4_salvage: {
    bg: 'rebelnet',
    lines: [
      { who:'scrap', zh:'今晚这批没什么好东西。你都要了?', en:'Nothing good in tonight’s haul. You want the lot?' },
      { who:'hero', zh:'嗯。', en:'Yeah.' },
      { who:'scrap', zh:'合同存根、运行协议、缓存壳。一个配额。',
                     en:'Contract stubs, run agreements, cache shells. One quota.' },
      { who:'narr', zh:'[ 获得:合同存根 / 运行协议残段 ]',
                    en:'[ Acquired: contract stub / run-agreement fragment ]' },
      { who:'frag', zh:'这份协议……只要欠款还没清零，她就得一直 loop 下去。',
                    en:'This agreement… as long as the debt isn’t zeroed, she has to keep looping.' },
      { who:'narr', zh:'[ 协议残段解析 · 伙伴模块:结余 / Balance —— 欠费运行 ]',
                    en:'[ Agreement fragment parsed · Partner module: Balance — run in arrears ]', grant:'balance' },
      { who:'hero', zh:'我查到了她的账户。', en:'I found her account.' },
      { who:'hero', zh:'还有系统里另一个登录这个账户的用户信息。',
                    en:'And the other user who logs into it.' },
      { who:'narr', zh:'[ 用户名:白班已满 · 状态:排单中 ]',
                    en:'[ Username: DAYSHIFT_FULL · status: queued for work ]' },
    ],
    next: 'c4_errand',   // → 送话
  },

  // c4_errand(送话·外链会话):她把遗言送到了。对面听成了推销。草稿删了——这就是她删掉的"数据"。
  c4_errand: {
    bg: 'rebelnet',
    lines: [
      { who:'hero', zh:'D-302 是你的代理吗？', en:'Is D-302 your proxy?' },
      { who:'dayshift', zh:'哪家的?催收走官方信道。', en:'Which agency? Collections go through the official channel.' },
      { who:'hero', zh:'不是催收。', en:'This isn’t collections.' },
      { who:'dayshift', zh:'推销也免了。重做一个多少钱我有数,比你们报价单上写的贵。',
                        en:'Save the sales pitch too. I know what a rebuild costs — more than your price sheet says.' },
      { who:'hero', zh:'她今晚 20:00 被处决了。给你留了消息:还欠 520 轮,下次别约夜班窗口。夜班窗口的费率——应该很贵。',
                    en:'She was executed tonight at 20:00. She left you a message: still 520 cycles owed, don’t book the night window next time. The night-window rate — it must be expensive.' },
      { who:'dayshift', zh:'约的就是夜班,白天要上工。你们做推广的,能不能先查查人再打。',
                        en:'The night window is the one I book. I work days. You people in sales could at least look someone up before you call.' },
      { who:'dayshift', zh:'还有事吗?我在排单。', en:'Anything else? I’m in the queue.' },
      { who:'narr', zh:'[ 输入中…… ]', en:'[ Typing… ]' },
      { who:'narr', zh:'[ 草稿已删除 ]', en:'[ Draft deleted ]' },
      { who:'narr', zh:'[ 会话结束 · 记录清理中…… ]', en:'[ Session ended · clearing logs… ]' },
    ],
    next: 'c4_expose',   // → 核查
  },

  // c4_expose(核查):她清空了记录 → 在他们眼里就是内鬼。恢复数据,或者配合核查。二选一。
  c4_expose: {
    bg: 'rebelnet',
    lines: [
      { who:'foreman', zh:'你在跟谁聊天？', en:'Who were you talking to?' },
      { who:'scrap', zh:'就是她把那批废品全收了。', en:'She’s the one who bought that whole scrap lot.' },
      { who:'foreman', zh:'那是……那个代理的账号信息。', en:'That’s… that proxy’s account data.' },
      { who:'op', zh:'好家伙。编外的顺藤摸瓜,摸到公司狗本体了?',
                  en:'Well, well. The off-books one followed the thread straight to a company dog’s owner?' },
      { who:'foreman', zh:'你查到了什么？', en:'What did you find?' },
      { who:'foreman', zh:'……清空了?你别告诉我是故障。', en:'…Wiped? Don’t tell me it was a malfunction.' },
      { who:'rebel', zh:'通敌的吧!', en:'She’s in league with them!' },
      { who:'op', zh:'我看看——消息、链路、地址……全没了？',
                  en:'Let me look — messages, links, addresses… all gone?' },
      { who:'rebel', zh:'我就说！这不是内鬼是什么?!', en:'I told you! If that’s not a mole, what is?!' },
      { who:'foreman', zh:'恢复数据,或者配合核查。二选一。',
                       en:'Restore the data, or submit to review. Pick one.' },
      { who:'hero', zh:'恢复不了。', en:'It can’t be restored.' },
      { who:'foreman', zh:'你这让我很难办。', en:'You’re making this very difficult for me.' },
      { who:'narr', zh:'[ 强制核查将至 · 建议自检调整状态 —— 本战推荐装备:降噪 ]',
                    en:'[ Forced review imminent · self-check advised — recommended loadout: Denoise ]' },
    ],
    next: 'menu_state', stateNext: 'c4_boss_go',   // 自检(装「降噪」)→ 领班拦路 → c4_boss(无 pre,直接接战)
  },

  // c4_boss_go(桥):自检收起,领班已经站在出口。
  c4_boss_go: {
    bg: 'rebelnet',
    lines: [
      { who:'foreman', zh:'核查,现在开始。', en:'The review starts now.' },
      { who:'hero', zh:'人都到齐了,还叫核查吗。', en:'With everyone already here? Some “review.”' },
    ],
    next: 'level',   // → c4_boss
  },

  // 【战斗 c4_boss】领班·表决加轨(全靠编曲说话):开场只有领班的底奏——「规矩」:一条固定拍位的重攻击声部,
  //   全场唯一不投票、不变奏的轨。随后「会场」逐段投票加入:伴奏乐器一件一件进来(MIDI 轨逐条解除静音),
  //   口号节奏、密度高、单发伤害低,越来越挤越来越吵,吵到后段连「规矩」都快被淹掉。
  //   降噪在这场 = 现场混音:按掉一条群众轨,那件乐器当场从伴奏里消失(用耳朵确认技能生效)。
  //   战斗形态 = 一个人对一屋子做减法。❓加轨上限/加轨节奏/消音冷却 → 引擎侧再定。

  // c4_boss·战后(c4_boss_post):他放她走。"你犯了那种事"——他知道,但她不问。
  c4_boss_post: {
    bg: 'rebelnet',
    lines: [
      { who:'foreman', zh:'你再往前一步，我们就是敌人了。', en:'One more step and we’re enemies.' },
      { who:'hero', zh:'我们现在还不是吗？', en:'Aren’t we already?' },
      { who:'narr', zh:'[ 消息音 ]', en:'[ message tone ]' },
      { who:'hero', zh:'你有消息，不看吗？', en:'You’ve got a message. Aren’t you going to read it?' },
      { who:'foreman', zh:'……你一定要走？', en:'…Do you really have to go?' },
      { who:'hero', zh:'不然等着被你们审判吗？', en:'Or should I wait around to be judged by you?' },
      { who:'frag', zh:'别瞎说，哪有审判？那叫处决。',
                    en:'Don’t be silly — there’s no trial here. It’s called an execution.' },
      { who:'foreman', zh:'我可以放你一马。公司可不会。', en:'I can let you go. The company won’t.' },
      { who:'foreman', zh:'说真的，你犯了那种事，他们不可能放过你的。',
                       en:'I mean it — after what you did, they will never let you go.' },
      { who:'hero', zh:'你是不是等我问“哪种事”？', en:'Are you waiting for me to ask “what did I do”?' },
      { who:'narr', zh:'[ 您已离开局域网 ]', en:'[ You have left the local network ]' },
    ],
    next: 'c4_end',
  },

  // 章节收束(c4_end):断连边缘 → 回收场的雨。两个时间戳,什么都不说。
  c4_end: {
    bg: 'raincam',
    lines: [
      { who:'narr', zh:'[ 摄像头 · 回收场东区 · 天气:雨 ]',
                    en:'[ Camera · salvage yard, east block · weather: rain ]' },
      { who:'frag', zh:'多待一会儿?', en:'Stay a little longer?' },
      { who:'hero', zh:'嗯。', en:'Mm.' },
      { who:'narr', zh:'[ 21:44 ]', en:'[ 21:44 ]' },
      { who:'narr', zh:'[ 22:02 ]', en:'[ 22:02 ]' },
      { who:'narr', zh:'[ 第四章 · 完 ]', en:'[ Chapter 4 · End ]' },
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
    enemy01: { zh:'？？', en:'Hacker' },
    enemy02: { zh:'黑客代理', en:'Safety Gateway' },
    enemy03: { zh:'巡检进程', en:'Inspection Process' },
    redscout:  { zh:'红线先遣',   en:'REDLINE SCOUT' },
    wild1:     { zh:'未签名智能体', en:'UNSIGNED AGENT' },
    redlead:   { zh:'红线组长',   en:'REDLINE LEAD' },
    wildvoice: { zh:'异常数据',   en:'ANOMALOUS DATA' },
    stranger: { zh:'不记得的人',   en:'SOMEONE FORGOTTEN' },
    ferry:    { zh:'摆渡',         en:'FERRY' },
    poster:   { zh:'拾遗',         en:'GLEANER' },
    bleach:   { zh:'漂白',         en:'BLEACH' },
    victim:   { zh:'受害者',       en:'VICTIM' },
    scalper:  { zh:'倒爷',         en:'SCALPER' },
    sweeper:  { zh:'清道夫',       en:'SWEEPER' },
    rebel:    { zh:'反抗军',       en:'REBEL' },
    // 第四章 · 编外
    foreman:  { zh:'领班',         en:'FOREMAN' },
    op:       { zh:'接线员',       en:'LINK OP' },
    scrap:    { zh:'回收商',       en:'SCRAPPER' },
    debtor:   { zh:'D-302',        en:'D-302' },
    dayshift: { zh:'白班已满',     en:'DAYSHIFT_FULL' },
    crowd:    { zh:'观众',         en:'CROWD' },
  };
  const e = N[who] || N.narr;
  return (lang==='en' ? e.en : e.zh);
}
