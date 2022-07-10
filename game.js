//IMPORTANT: Make sure to use Kaboom version 0.5.0 for this game by adding the correct script tag in the HTML file.

kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  debug: true,
  clearColor: [0, 0, 0, 1],
})

// Speed identifiers
const MOVE_SPEED = 120
const JUMP_FORCE = 360
const BIG_JUMP_FORCE = 550
let CURRENT_JUMP_FORCE = JUMP_FORCE
const FALL_DEATH = 400
const ENEMY_SPEED = 20

// Game logic

let isJumping = true

loadRoot('https://i.imgur.com/')
loadSprite('coin', 'wbKxhcd.png')
loadSprite('evil-goose', 'lHoTIKu.png')
loadSprite('brick', 'pogC9x5.png')
loadSprite('brickone', '3LG9TT1.png')
loadSprite('block', 'lad6CS1.png')
loadSprite('goose', 'AAyJb8m.png')
loadSprite('mushroom', '0wMd92p.png')
loadSprite('surprise', 'gesQ1KP.png')
loadSprite('unboxed', 'bdrLpi6.png')
loadSprite('pipe-top-left', 'ReTPiWY.png')
loadSprite('pipe-top-right', 'hj2GK4n.png')
loadSprite('pipe-bottom-left', 'c1cYSbt.png')
loadSprite('pipe-bottom-right', 'nqQ79eI.png')
loadSprite('fpipe-top-left', 'ReTPiWY.png')
loadSprite('fpipe-top-right', 'hj2GK4n.png')
loadSprite('fpipe-bottom-left', 'c1cYSbt.png')
loadSprite('fpipe-bottom-right', 'nqQ79eI.png')
loadSprite('blue-block', 'KzJhdgw.png')
loadSprite('green-brick', '3Qvaibw.png')
loadSprite('grey-brick', '07YEdr8.png')
loadSprite('blue-steel', '7B3WuFb.png')
loadSprite('blue-evil-shroom', 'SvV4ueD.png')
loadSprite('blue-surprise', 'RMqCc1G.png')
loadSprite('blue-pot', 'lB03OkC.png')
loadSprite('blue-flower','gHzW4V9.png')
loadSprite('randi','YhcLoh6.png')


scene("game", ({ level, score }) => {
  layers(['bg', 'obj', 'ui'], 'obj')

  const maps = [
    [
     '£       b                                -+     £',
     '£     @@@@%%        b                    ()     £',
     '£               !!!!!!                  !!!!    £',
     '£                                  !            £',
     '£     !!!!!!!                 !!                £',
     '£                       _/                      £',
     '£                       () r  r   r   r  r   r  £      r     r     r  r        r   r      r  r     r      r       r   r      r     r    r r',
     '£                  !!!!!!!                      £',
     '£               @@                              £',
     '£                               b     b         £',
     '£         @@@@               @@@@@   @@@@       £',
     '£       @@           @@                         £',
     '£                                           _/  £',
     '£               rr  r   r   r               ()  £   r   r      rr      r       rr       r        r       r       r  r       r      r      r      ',
      '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
    ],
[
    '<     <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<',
    '                                             ',
    '<                                            <',
    '<                                            <',
    '<         %%%%%                         -+   <',
    '<                      f    f          f()   < f    ff           f        f       f          f  f               ff   f        ffffffffff  ',
    '<                  =======           =====   <',
    '<              ==      f   =f  %%            <',
    '<           =                                <',
    '<    %%%%                                    <',
    '<              _/                 _/    _/   <',
    '<              cv   b  b f  b f   cv    cv   < f f   f             f    f           f       f           f       f      f    f       ff    f   ff    f',
    '??????????????????????????????????????????????',
    'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
  ],

[
    '<     <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ',
  '                                                 <',
    '                                               <',
  '                xxxxxx                           <',
 '                x     x  -+                       <',
 '<                     x  ()     ^                 <',
 '<                    =======    xx           ==   <',
 '<         %%%%%                        -+         <', 
 '<                       ^            ^ ()   ^   ^ <   ^           ^      ^         ^          ^^            ^  ^        ^      ^       ^^           ^^          ^      ^',
 '<                 ========           =====        <',
 '<              = = =      =  %%%%%                <',
 '<         %  = = =                                <',
 '<    %%*%                                         <',
 '<                           _/   _/               <',
 '<                   ^   ^   cv   cv   ^         < ^ ^         ^    ^            ^     ^       ^   ^    ^  ^ ',
 '==============================================',
 '                                              ',
],


[
  '                 ^                                     ',
    '            @@@@@@                     ^         _/   ',
    '                                  @@@@@@@        ()   ',
    '      %                  ^                    ======== ^       ^       ^       ^        ^   ^^          ^^   ^   ^ ',
    '                  ??????????               =          ',
    '                ===                xxx?????           ',
    '     %   =*=%=                     x                  ',
    '   %   %                           x      @@@@    ????',
    '                                -+   _/                   ',
    '   ^^          ^^       ^   ^   ()   cv     ^             ^             ^          ^     ^  ^                ^                    ^ ^',
    '=============================   =====================',
    ],

]


  const levelCfg = {
    width: 20,
    height: 20,
    '=': [sprite('block'), solid()],
    '$': [sprite('coin'), 'coin'],
    '%': [sprite('surprise'), solid(), 'coin-surprise'],
    '*': [sprite('surprise'), solid(), 'mushroom-surprise'],
    '}': [sprite('unboxed'), solid()],
    '(': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
    ')': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
    '-': [sprite('pipe-top-left'), solid(), scale(0.5), 'pipe'],
    '+': [sprite('pipe-top-right'), solid(), scale(0.5), 'pipe'],
    '^': [sprite('evil-goose'), solid(), 'dangerous'],
    '#': [sprite('mushroom'), solid(), 'mushroom', body()],
    '?': [sprite('grey-brick'), solid()],
    '!': [sprite('blue-block'), solid()],
    '£': [sprite('green-brick'), solid()],
    '<': [sprite('brickone'), solid(), scale(0.5)],
    'z': [sprite('blue-evil-shroom'), solid(), scale(0.5), 'dangerous'],
    '@': [sprite('blue-surprise'), solid(), scale(0.5), 'coin-surprise'],
    'x': [sprite('blue-steel'), solid(), scale(0.5)],
    'c': [sprite('fpipe-bottom-left'), solid(), scale(0.5)],
    'v': [sprite('fpipe-bottom-right'), solid(), scale(0.5)],
    '_': [sprite('fpipe-top-left'), solid(), scale(0.5), 'fpipe'],
    '/': [sprite('fpipe-top-right'), solid(), scale(0.5), 'fpipe'],
    'f': [sprite('blue-pot'), solid(), 'dangerous'],
    'b': [sprite('blue-flower'), solid()],
    'r': [sprite('randi'), solid(), 'dangerous'],

  }

  const gameLevel = addLevel(maps[level], levelCfg)

  const scoreLabel = add([
    text(score),
    pos(30, 6),
    layer('ui'),
    {
      value: score,
    }
  ])

  add([text('level ' + parseInt(level + 1) ), pos(40, 6)])
  add([text('Created By: Kayros#3090 and heyworld#8692 '), pos(30, -60)])

  function big() {
    let timer = 0
    let isBig = false
    return {
      update() {
        if (isBig) {
          CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
          timer -= dt()
          if (timer <= 0) {
            this.smallify()
          }
        }
      },
      isBig() {
        return isBig
      },
      smallify() {
        this.scale = vec2(1)
        CURRENT_JUMP_FORCE = JUMP_FORCE
        timer = 0
        isBig = false
      },
      biggify(time) {
        this.scale = vec2(2)
        timer = time
        isBig = true
      }
    }
  }

  const player = add([
    sprite('goose'), solid(),
    pos(30, 0),
    body(),
    big(),
    origin('bot')
  ])

  action('mushroom', (m) => {
    m.move(20, 0)
  })

  player.on("headbump", (obj) => {
    if (obj.is('coin-surprise')) {
      gameLevel.spawn('$', obj.gridPos.sub(0, 1))
      destroy(obj)
      gameLevel.spawn('}', obj.gridPos.sub(0,0))
    }
    if (obj.is('mushroom-surprise')) {
      gameLevel.spawn('#', obj.gridPos.sub(0, 1))
      destroy(obj)
      gameLevel.spawn('}', obj.gridPos.sub(0,0))
    }
    if (obj.is('dangerous')) {
        go('lose', { score: scoreLabel.value})
    }
  })

  player.collides('mushroom', (m) => {
    destroy(m)
    player.biggify(6)
  })

  player.collides('coin', (c) => {
    destroy(c)
    scoreLabel.value++
    scoreLabel.text = scoreLabel.value
  })

  action('dangerous', (d) => {
    d.move(-ENEMY_SPEED, 0)
  })

  player.collides('dangerous', (d) => {
    if (isJumping) {
      destroy(d)
    } else {
      go('lose', { score: scoreLabel.value})
    }
  })

  player.action(() => {
    camPos(player.pos)
    if (player.pos.y >= FALL_DEATH) {
      go('lose', { score: scoreLabel.value})
    }
  })

  player.collides('pipe', () => {
    keyPress('down', () => {
      go('game', {
        level: (level + 1) % maps.length,
        score: scoreLabel.value
      })
    })
  })

  player.collides('fpipe', () => {
    keyPress('down', () => {
      go('lose', { score: scoreLabel.value})
    })
  })
  keyDown('left', () => {
    player.move(-MOVE_SPEED, 0)
  })
    keyDown('a', () => {
      player.move(-MOVE_SPEED, 0)
  })

  keyDown('d', () => {
    player.move(MOVE_SPEED, 0)
  })
  keyDown('right', () => {
    player.move(MOVE_SPEED, 0)
  })

  player.action(() => {
    if(player.grounded()) {
      isJumping = false
    }
  })

  keyPress('space', () => {
    if (player.grounded()) {
      isJumping = true
      player.jump(CURRENT_JUMP_FORCE)
    }
  })
})

scene('lose', ({ score }) => {
  add([text(score, 32), origin('center'), pos(width()/2, height()/ 2)])
})

start("game", { level: 0, score: 0})

document.getElementById("dis").innerHTML="Created By: Kayros#3090 heyworld#8692"
