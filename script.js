const { Client, GatewayIntentBits } = require('discord.js')
let prefix = '!steve'
let odt;
let bol;
let msg;
let channelid;
let time;
let safe = false;
let cammands = ['start', 'opt', 'timeout', 'hello', 'safe', 'add']
let server_data = new Map()
//let permission = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
let permission = ['mod', 'admin', 'moderator']
let flags = ['nsfw', 'religious', 'political', 'racist', 'sexist', 'explicit']
let url = 'https://v2.jokeapi.dev/joke/Any'
const c = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages] })
c.once('ready', () => {
    console.log('-----------')
    console.log('   ready   ')
    console.log('-----------')
})

c.on('messageCreate', (message) => {




    if (!message.author.bot) {
        let member = message.member
        let ino = 0
        let perm = false


        if (message.content.toLocaleLowerCase().startsWith(prefix)) {


            console.log('a')
            const mes = message.content.slice(7, message.content.length)
            const cmd = mes.split(' ')
            console.log(cmd)
            let i = cammands.indexOf(cmd[0])
            function check_permission(callback) {


                let role = member.roles.cache.map(r => r.name)
                role.map((r) => {

                    if (permission.indexOf(r) != -1) {

                        //  message.channel.send(`${message.author.globalName}` + " just used cammand ")
                        perm = true

                    }
                    else {

                        if (ino === role.length) {
                            ino === 0
                            perm = false


                        }

                        if (ino == 0 & perm == false) {

                            message.channel.send("  **You don't have permission to use this cammand   **")


                        }
                        ino++


                    }

                })
                callback()
            }
            function store(server_id, Channel_id) {
                server_data.set(server_id, Channel_id)
                if (server_data.get(server_id)) {
                    console.log('ok')
                    // fuction 
                    //  channelid = server_data.get(server_id)

                }
                else {
                    message.channel.send('**Channel id not found `use !steve start`**')
                }

            }
            function start() {

                if (perm === true) {
                    store(message.guildId, message.channelId)//  for example mara guild id hai 123 ir channel id hai 132 taw set [123:132] channel
                    message.channel.send("||**channel saved**||")
                    message.channel.send('** Now set a duration for the daily jokes use `!steve timeout 120` The cammand after the timeout can only contain number in min here 120 mean 2 hour **')
                    console.log(server_data)
                }
                console.log()


            }
            function opt() {
                let m = message.content.slice(11, message.content.length)
                let cm = m.split(' ')
                let cha = ['true', 'false']
                if (flags.indexOf(cm[0]) != -1) {
                    console.log('first')
                    if (cha.indexOf(cm[1]) != -1) {
                        console.log('second')
                        message.channel.send('`searching...`')
                        odt = cm[0]
                        bol = JSON.parse(cm[1])
                        joke()

                    }


                }
                else {
                    message.channel.send('**please check your cammand and retry**')
                }


            }

            function timeout() {
                try {
                    let ti = JSON.parse(message.content.slice(14, message.content.length))
                    console.log('work')
                    time = ti * 60000
                    setInterval(() => {
                        if (time > 1) {
                            joke()
                        }
                        else {
                            console.log('...')

                        }

                    }, 3000)//time
                }
                catch {
                    return message.channel.send(`${message.content.slice(13, message.content.length)}` + "isn't a number")

                }




            }
            function hide(diddy) {
                console.log(cmd[1])
                try {
                    if (typeof JSON.parse(cmd[1])) {
                        safe = JSON.parse(cmd[1])
                        console.log('cammand recieve')

                    }
                }
                catch (error) {
                    message.channel.send(`**__${cmd[1]}__ isn't a boolean value please enter a boolean value true or false** `)

                }





            }
            function add() {

            }
            let ida = false
            function joke() {
                c.guilds.cache.forEach((guild) => {
                    console.log(guild.id)

                    server_data.keys().forEach((id) => {
                        if (guild.id === id) {
                            console.log('Your channel id ' + guild.id + 'searching' + id)
                            let channelid = server_data.get(guild.id)
                            console.log(channelid)
                            msg = c.channels.cache.get(channelid)
                            ida = true

                        }
                        else {
                            console.log('not found')
                        }


                    })


                })
                if (ida) {



                    let a = ['true', 'false']
                    //console.log('channel id ' + channelid)
                    fetch(url)
                        .then(res => {

                            return res.json()
                        })
                        .then(data => {
                            //let s=flags.indexOf(data.flags)     
                            let check = ['true', 'false']
                            //  console.log(odt, bol)



                            if (data.flags[odt] != bol && channelid !== '') {

                                console.log('retry')

                                joke()

                            }
                            else {
                                console.log('..........')
                                //   console.log('channl d ' + channelid)
                                if (channelid === ' ') {
                                    console.log('id not found')

                                }
                                if (!data.safe && safe) {
                                    console.log(data)
                                    msg.send(' \u200B      ')
                                    if (data.type = 'twopart') {
                                        msg.send(`||${data.setup.trim()}||`)
                                        setTimeout(() => {
                                            msg.send(`||${data.delivery.trim()}||`)
                                        }, 3000)



                                    }
                                    else {
                                        msg.send(`||${data.joke.trim()}||`)
                                    }



                                }
                                else {
                               //     msg = c.channels.cache.get(channelid)
                                    if (data.type === 'twopart') {
                                        console.log(data)
                                        msg.send(' \u200B      ')
                                        msg.send(data.setup.trim())
                                        setTimeout(() => {
                                            msg.send(data.delivery.trim())
                                        }, 3000)
                                    }
                                    else {
                                        msg.send('\u200B ')
                                        msg.send(data.joke.trim())
                                    }



                                }
                            }


                        }


                        )
                        .catch(a => {

                            console.log('api_error')
                            joke()
                        })
                }
                else {
                    console.log('error_channel_not_found')
                }

            }

            switch (i) {
                case -1:
                    message.channel.send('**cammand not found**')
                    break;
                case 0:
                    check_permission(start)
                    break;
                case 1:


                    check_permission(opt)



                    break;
                case 2:

                    check_permission(timeout)


                    break;
                case 3:
                    console.log('hello')
                    message.channel.send('**# Hello! There, This is Steve your friendly neighborhood bot ^_^  use `!joke start` on the channel u want me to chat** ')
                    break;
                case 4:

                    console.log('hide')
                    check_permission(hide)


                    break;
                case 5:

                    console.log('add')
                    check_permission(add)


                    break;
                default:
                    message.channel.send('# ERROR')
                    break;
            }



        }


    }
})





c.login('token'); 
