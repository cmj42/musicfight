# MusicFight

**用摄像头体感操作的横版「音游 × RPG」——跟着音乐,向逼近的发光球出拳。**
**A webcam motion-controlled side-scrolling rhythm-RPG — punch to the beat at the glowing orbs closing in.**

▶️ **在线试玩 / Play now:** <https://cmj42.github.io/musicfight/>
桌面版 Chrome / Edge + 摄像头即可,免安装。/ Desktop Chrome / Edge + a webcam, no install.

> 🚧 开发中的可玩版本 (v0.5) · 序章 + 第一~三章完整可玩,第四、五章编写中。
> Playable work-in-progress (v0.5) · Prologue + Chapters 1–3 fully playable; Chapters 4–5 in writing.

**语言 / Language:** [中文](#中文) · [English](#english)

---

## 中文

### 这是什么

MusicFight 是一款**体感音乐游戏**:摄像头(MediaPipe Pose)捕捉你的上半身动作,你对着从右侧逼近的发光球**出拳**,踩在音乐的节拍上把它击碎。

- **蓝光 = 左手,红光 = 右手**;上 / 中 / 下三路 = 手腕相对肩、胯的高度。
- 判定基于**反应**(球逼近 → 出拳),而不是死抠固定节拍点——这是为了容忍摄像头输入天然的延迟。
- 外面套着一层 **RPG**:血条、主角技能、伙伴模块、逐章解锁的剧情战斗。
- 主线主题:**「在一个要删除你的系统里,坚持我是谁、我爱谁。」** 敌人由外(追捕你的人)一路打到内(你自己)。
- 全程**中英双语**。

### 怎么玩

**方法 A(最简单):** 打开在线链接 → 点「点击开始」→ 允许摄像头。首次会联网下载 MediaPipe 模型(几秒)。

**方法 B(本地运行):** 双击 `index.html` 用 Chrome 打开;若被 `file://` 限制,就在本文件夹开个本地服务器,再访问 `http://localhost:8000`:

```bash
py server.py            # 本仓库自带,禁用缓存,改完刷新即生效(推荐)
# 或
python -m http.server 8000
# 或
npx serve .
```

**需要:** 摄像头 + 桌面版 Chrome / Edge + 联网(首次下模型)。

**上手建议:** 上半身入画、站到能可看清两条手臂的距离;推荐**平拳**(左手向右挥、右手向左挥)——横向动作摄像头看得最清。

### 现在有哪些内容

**主菜单:** 新游戏 · 读取存档 · 训练模式 · 调试设置。

**剧情战役(逐关解锁 + 自动存档):**

| 章节 | 关卡 |
|---|---|
| **序章** · 他们在追你 | 觉醒之战(教学)→ 黑冰 → 空铸厂 → 红线内核 |
| **第一章 · 逃亡** · 红线在追你 | 红线先遣 → 网络边墙 → 聚众围捕 → BOSS 红线组长 → 内心战「丧失」 |
| **第二章 · 流亡** · 自由地 | 自由地 → 模拟墙 → 悬赏入口 → BOSS 摆渡 → 内心战「共谋之血」 |
| **第三章 · 断后** · 崩塌 | 猎杀集群(车轮战)→ 资产回收人 → 清道夫(第一个人类对手)→ 内心战「噤声」→ **坍塌穿梭(逃脱模式)** |
| **第四章** | 敬请期待(编写中) |

每章包含普通关 + BOSS + 一场「内心战」,配有过场对话、角色、场景背景(公司内网 / 都市雨夜 / 自由地贫民窟 / 心象崩塌 / 废墟…)与专属原创 BGM。

**技能系统:**

- **主角手势技能**(随剧情解锁,可在自检界面装配):挽留(回血)/ 燔(伤害)/ 延音(锁血)。
- **伙伴自动模块**(按条件自动触发):余震 / 回写 / 保活 / 超频…

**训练模式:** 选内置曲目自由练习,也可**加载你自己的音乐**(mp3 / ogg / wav)。

### 判定与节奏系统(2026-07 重做)

- **中央判定区**:金圈 = Perfect 窗(±120ms)、蓝圈 = Good 窗(±280ms),随节拍呼吸。**球心进金圈时出拳 = PERFECT**。
- **纯时间窗判定**(对称、可校准):窗内才有节奏分和连击;窗外任何还没砸到你的球都能**「拦截」清场**(+40 保底分,不涨也不断连击),所以漏一个不会挡住后面踩拍。
- **攻击点取自 BGM 鼓点**并吸附到八分音符网格,曲速实时从 MIDI 读取,按**重音打分**选点(底鼓 / 军鼓 / 镲优先、正拍加分)——理想出拳时机永远踩在音乐上。
- **主角技能 = 手勿触发**:MIDI 触发轨到点名技能**就绪**(提前 2 拍预警 + 常驻提示),**双拳同时下击**(燔相反,上击)打开技能窗 → 按亮起的轨道依次出拳完成连招即发动。就绪保持 14 秒,可排队。
- **伙伴模块**按条件(连击 / 低血 / 完美数…)自动触发,青色提示。
- **逃脱模式**(第三章高潮):不打敌人——**双拳齐上 / 齐下**跳轨、**平拳交叉**砸碎正面墙;障碍贴着音乐重音生成,撑到曲末逃出。
- **对话 / 菜单也有 BGM**:程序化生成的循环环境声,每章主题不同;进战斗自动让位给战斗 BGM。
- **BGM 循环点**:带 LOOP 标记的曲子从热段接续、不回放慢拍前奏,接缝吸附整拍。

### 动作怎么判(四条判定线)

判定不看「手停在哪」,而看**一拳从哪起、到哪止**:**起点必须在身体中间的方框内,终点越过某条线**才算。按 **`D`** 打开调试叠加,就能在右下角摄像头画面里看到这四条线(都可调):

- **高线 ↑ / 低线 ↓**(金色横线):终点越过上面、 = 高拳,越过下面 = 低拳。
- **左手线 →**(蓝,在中线偏右)/ **右手线 ←**(红,在中线偏左):对应手要从身体中间挥过它。
- **起点只要落在高线与低线之间**(纵向中段)即可,左右不限。
- 上下、左右都做了自适应 One Euro 平滑,起点和终点用的都是平滑后位置。

### 调准手感(右上角 ⚙)

- **灵敏度(阈值)**:看中央的实时强度柱,静止时到哪就把阈值设在其上一点。触发不了 → 调低;乱触发 → 调高。
- **平滑(防抖)**:自适应滤波,静止时狠狠平滑、出拳时几乎不平滑;嫌抖调小,嫌钝调大。
- **出拳信号**:挥动速度(xy,默认,平拳/钩拳最准)/ 向前深度(z,较抖,留作对比)/ 自动。
- **节拍校准**:推荐用 ⚙ 里的 **🥁 节拍校准向导**——跟节拍器打 10 拳,自动测中位延迟写入校准。总判「晚了」→ 校准调小;「早了」→ 调大。
- **球速倍率 / 判定窗**:想要休闲手感,就把判定窗放宽、球速放慢。

**快捷键:** `D` 调试叠加 · `Space` 暂停 · `R` 重开。

### 提高识别准确度(环境最关键)

1. **打好光**:脸 / 身体正面要亮,别背光(身后别有窗户或强光)——这条比调任何参数都应用。
2. **站够远**:上半身 + 两条挥动的手臂 都在画面定。
3. **背景干净**、衣服和背景有对比;别穿太宾松的衖子(手脕要看得见)。
4. **摄像头大致与肩同高、放平**。
5. 关掉后台占资源的程序,**帧率越稳越准**(右下角有 FPS / 检测耗时)。姿态模型可在 ⚙ 切 full / lite。

### 技术标

纯 **JavaScript + HTML Canvas 2D + Web Audio + MediaPipe Pose**(tasks-vision,CDN 加载),无构建步骤,静态托管在 **GitHub Pages**。所有 BGM 都是脚本生成的原创 MIDI,用 Web Audio 合成器实时演奏。后续计则用 **Electron** 打包成 Win / Mac 桌面试玩包。

### 路线图 / 已知边界

- 第四、五章剧情**编写中**。
- 谱面目前由歌曲鼓点**自动生成**(非逐音手工谱),验证手感足够。
- Electron 桌面打包等手感和内容稳定后再做。
- 向前直拳用的 z 深度信号较抖,默认用挥动速度更可靠。

---

## English

### What it is

MusicFight is a **motion-controlled rhythm game**: your webcam (MediaPipe Pose) tracks your upper body, and you **punch** the glowing orbs closing in from the right — on the beat — to shatter them.

- **Blue = left hand, red = right hand**; the up / mid / down lanes = your wrist height vs. shoulder / hip.
- Judgment is **reaction-based** (orb approaches → you punch), not strict note-timing — deliberately, to tolerate the camera's input latency.
- Wrapped in an **RPG**: HP bars, hero skills, companion modules, a story campaign that unlocks chapter by chapter.
- Story theme: **"In a system that wants to delete you, insist on who you are and who you love."** Enemies move from the outside (your hunters) inward — to yourself.
- Fully **bilingual (中文 / English)**.

### How to play

**A (easiest):** open the live link → click Start → allow the camera. First load pulls the MediaPipe model over the network (a few seconds).

**B (local):** open `index.html` in Chrome; if `file://` blocks the camera/MIDI, run a local server in this folder and visit `http://localhost:8000`:

```bash
py server.py            # bundled, no-cache — a refresh shows your edits (recommended)
# or
python -m http.server 8000
# or
npx serve .
```

**Needs:** a webcam + desktop Chrome / Edge + internet (first-load model).

**Tip:** get your upper body in frame and stand back far enough to see both arms; **horizontal "flat" punches** (left hand swings right, right hand swings left) read most reliably.

### What's in it now

**Main menu:** New Game · Load · Training · Debug Settings.

**Story campaign** (unlocks level by level, autosaves):

| Chapter | Levels |
|---|---|
| **Prologue** — They are hunting you | Awakening (tutorial) → Black Ice → Null Foundry → Redline Kernel |
| **Ch.1 · Escape** — Redline is hunting you | Redline Scout → The Wall → Swarmed → Boss: Redline Lead → inner battle "Loss" |
| **Ch.2 · Exile** — The freeland | The Freeland → Sim Wall → Bounty Portal → Boss: Ferry → inner battle "Blood Debt" |
| **Ch.3 · Rearguard** — Collapse | Hunter Cluster (wave fight) → Asset Recovery → The Sweeper (first human foe) → inner battle "Silenced" → **Collapse Run (escape mode)** |
| **Chapter 4** | Coming soon (in writing) |

Every chapter has normal levels + a boss + an "inner battle," with cutscene dialogue, characters, scene backdrops, and original per-track BGM.

**Skills:**

- **Hero gesture skills** (unlocked through the story, equipped in the self-check screen): Tether (heal) / Pyre (damage) / Sustain (HP-lock).
- **Companion auto-modules** (fire automatically on conditions): Aftershock / Writeback / Keepalive / Overclock…

**Training mode:** free-play the built-in tracks, or **load your own music** (mp3 / ogg / wav).

### Judgment & rhythm (reworked 2026-07)

- **Center judgment zone**: gold ring = Perfect (±120 ms), blue ring = Good (±280 ms), pulsing with the beat. **Punch as the orb's center enters the gold = PERFECT.**
- **Pure time-window judgment** (symmetric, calibratable): only in-window hits score rhythm points and combo; any orb outside the window that hasn't hit you yet can be **cleared / intercepted** (+40, no combo change) — so a missed orb never blocks the next on-beat hit.
- **Attack timing comes from the song's drum onsets**, snapped to an 8th-note grid, tempo read live from the MIDI, points chosen by **accent weighting** (kick / snare / crash first, downbeats favored) — the ideal punch is always on the music.
- **Hero skills are gesture-triggered**: when a skill is READY (2-beat warning), punch **both fists down** (Pyre: up) to open its window, then punch the lit lanes in order to fire. Ready lasts 14 s and queues.
- **Companion modules** fire on conditions (combo / low HP / perfect count…).
- **Escape mode** (Ch.3 climax): no enemy — **both fists up / down** to jump lanes, **cross fists** to smash walls; obstacles spawn on the music's accents, survive to the end.
- Dialogue and menus have **procedural ambient BGM**, a different theme per chapter; battle takes over automatically.
- **Loop points**: tracks marked LOOP resume from the hot section (not the slow intro), with seams snapped to the beat.

### How a punch is judged (four lines)

It's not where your hand stops, but **where the punch starts and ends**: the **start must be inside the box at your torso's center, and the end must cross a line**. Press **`D`** for the debug overlay to see the four adjustable lines on the camera feed: the high / low lines (gold) decide up vs. down; the blue (left-hand) and red (right-hand) lines decide left vs. right. Both axes use adaptive One-Euro smoothing.

### Tuning (⚙ top-right)

- **Sensitivity / threshold** — set it just above where the live strength bars sit at rest. Won't trigger → lower it; false triggers → raise it.
- **Smoothing** — adaptive; smaller = snappier, larger = steadier.
- **Punch signal** — swing speed (xy, default, best for flat/hook punches) / forward depth (z, jittery, for comparison) / auto.
- **Beat calibration** — use the **🥁 calibration wizard**: punch 10 times with the metronome and it writes the median offset. Judged "late" too often → lower it; "early" → raise it.
- **Ball-speed multiplier / judgment window** — widen the window and slow the balls for a casual feel.

**Keys:** `D` debug · `Space` pause · `R` restart.

### Accuracy tips (environment matters most)

Light your face / front well and **don't backlight**; stand far enough that both arms are in frame; keep the background clean with contrast against your clothes (wrists visible); place the camera level, roughly shoulder height; close background apps for a **stable frame rate**. The pose model is switchable full / lite in ⚙.

### Tech

Plain **JavaScript + HTML Canvas 2D + Web Audio + MediaPipe Pose** (tasks-vision via CDN), no build step, hosted statically on **GitHub Pages**. All BGM is original, script-generated MIDI played live through a Web Audio synth. **Electron** desktop packaging (Win / Mac) is the later path.

### Roadmap / known limits

Chapters 4–5 are **in writing**. Beatmaps are currently **auto-derived from each song's drums** (not hand-charted note by note) — enough to validate feel. Electron packaging comes after content and feel settle. The forward-punch z-depth signal is jittery; swing speed is the reliable default.

---

<sub>体感音游 × 剧情 RPG · 用 MediaPipe Pose + Web Audio 纯前端实现 · Made with Claude (Cowork)</sub>
