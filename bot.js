// Telegram - HusnuEhedov
// Bu repo sıfırdan yığılıb
// Başka github hesabına yükləməy olmaz
// Reponu öz adına çıxaran peysərdi ! 

const { Telegraf,Telegram  } = require('telegraf')
const config = require("./config")
const telegram = new Telegram(config.token)
const bot = new Telegraf(config.token)

bot.command('start', (ctx) => { 
        ctx.chat.id,
	ctx.replyWithHTML(`<i>Salam</i> <b> <a href="tg://user?id=${ctx.from.id}">${ctx.from.first_name}</a> </b> <i>bota etiraf etmək istədiyiniz mesajı yazın və Adminlər tərəfindən səsləndirilsin</i> ✅\n\n<i>Buyur Bir Etiraf Et</i>`,			 
	    {
           reply_markup:{
            inline_keyboard:[
                [{text:"Etiraf Et 🧔🏻",  callback_data:'etirafbuton'}]
            ]
        }
    })
})

bot.action('start', (ctx) => { 
        ctx.chat.id,
        ctx.deleteMessage()
	ctx.replyWithHTML(`<i>Salam</i> <b> <a href="tg://user?id=${ctx.from.id}">${ctx.from.first_name}</a> </b> <i>bota etiraf etmək istədiyiniz mesajı yazın və Adminlər tərəfindən səsləndirilsin</i> ✅\n\n<i>Buyur Bir Etiraf Et</i>`,			 
	    {
            reply_markup:{
            inline_keyboard:[
                [{text:"Etiraf Et 🧔🏻",  callback_data:'etirafbuton'}]
            ]
        }
    })
})


bot.action('etirafbuton', ctx=>{
	ctx.deleteMessage()
	ctx.telegram.sendMessage(ctx.chat.id, '✍️ *Buyurun,Etirafınızı Yazın*', { parse_mode: 'MarkdownV2' });
})


let etiraf;

bot.on("text", ctx => {
	let kanalid = 1108583389
	etiraf = ctx.message.text
    ctx.telegram.sendMessage(ctx.from.id, `📍 Etirafınız necə paylaşılsın?`, {
	reply_markup: {
		inline_keyboard: [
		
		[{text: '🔐 Anonim ', callback_data: '🔐 Anonim '}],
		[{text: '🗣 Açıq ', callback_data: '🗣 Açıq '}]
		
		]
	}	
})
})


bot.action("🗣 Açıq ", async (ctx, next) => {
	let aciqetiraf= `📣 Açıq Etiraf \n👥İstifadəçi: ${ctx.from.first_name}\n\n\n`
	let kanalid = 1108583389
	var seliqe = `✍️Yazdığı Etiraf: ${etiraf}\n\n\n`
	var sonda = '💁🏼‍♀️ Etiraf Etmək Üçün: @ConfessAzBot'
	ctx.telegram.sendMessage(kanalid, `${aciqetiraf+seliqe+sonda}`)
	ctx.deleteMessage()
	await ctx.replyWithHTML('<i>Yazdığınız Etirafa Görə Təşəkkürlər ✨\n\nEtirafınız Uyğun Görüldüyü Halda @ConfessAz Kanalında Paylaşılacaq</i> ✅')
	await ctx.replyWithHTML(`Əziz <a href="tg://user?id=${ctx.from.id}">${ctx.from.first_name}</a> yenidən etiraf yazmaq istəyirsnizsə /start klik edin 📌`,			 
	    {
            reply_markup: { 
                inline_keyboard: [
                    [{text: "Qrupa Geri Dönün↩️", url: "https://t.me/trueaze" }]
                ]
            }
       }
    ) 
    return next()
})

bot.action("🔐 Anonim ", async (ctx) => {
	let aciqetiraf = `👤 Paylaşım: Anonim Etiraf \n\n\n`
	let kanalid = 1108583389,1799203251
	var seliqe = `🖋Yazdığı Etiraf: ${etiraf}\n\n\n`
	var sonda = '💁🏼‍♀️ Etiraf Etmək Üçün: @ConfessAzBot'
	ctx.telegram.sendMessage(kanalid, `${aciqetiraf+seliqe+sonda}`)
	ctx.deleteMessage()
	await ctx.replyWithHTML(`<a href="tg://user?id=${ctx.from.id}">${ctx.from.first_name}</a> yazdığınız etirafa görə təşəkkürlər`,			 
	    {
            reply_markup: { 
                inline_keyboard: [
                    [{text: "Yeni Etiraf Yazın 🔄", callback_data:'etirafbuton' }]
                ]
            }
       }
    
     )
})


//xətaları göstərsin
bot.catch((err) => {
    console.log('Error: ', err)
})

// Botun nickname alan kod
bot.telegram.getMe().then(botInfo => {
    bot.options.username = botInfo.username
    console.log(`Bot Aktif Oldu => ${bot.options.username}`)
})

bot.launch()

// Bu, botumuzu yavaşca dayandırmağa imkan verir.
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
