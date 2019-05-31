class Sucktop {
    constructor() {
        this.init()
    }
    init() {
       this.GoHome()
        this.request()
        this.suspend()
        this.magnifying()
        this.SetTime()
        this.entrance()
        this.Panic()
        this.plusminus()
        this.Jumpcar()
        // this.information()
    }
    //---------------------------------------------------点击跳转回首页---------------------------------------------
       GoHome(){
           console.log(111)
           var goback=$('.GoHome')
           goback.on('click',$.proxy(this.gobackcb,this))
       } 
       gobackcb(){
           $(location).attr("href","http://localhost/zhang/new/juanpi/html/Home.html")
       }
    //---------------------------------------------------图片ajax渲染-----------------------------------------------
    request() {
        $.ajax({
            type: "get",
            url: "../json/Detailspage.json",
            data: {},
            dataType: "json",
            success: $.proxy(this.requestcb, this)
        })
    }
    requestcb(data) {
        //----------------------------------渲染图片----------------------------------------------------------------
        var Pic = $('.piclist')
        var str = ''
        var id = location.href.split("?")[1].split("=")[1].slice(0, 2);
        for (var i = 0, k = data.length; i < k; i++) {

            if (id == data[i].id) {
                for (var j = 0, m = data[i].img.length; j < m; j++) {

                    str += ` 
                    <li data-src=${data[i].Lpic[j]}>
                        <a href="##"><img src=${data[i].img[j]}></a>
                    </li>   `
                }
            }
        }
        var Largepic = $('.Largepic')
        var str2 = ''
        for (var key in data) {
            if (id == data[key].id) {
                str2 = `
                <img src=${data[key].lagepic}>
                <div class="glass"></div> 
             `
            }
        }

        var largeglass = $('.largeglass')
        var str8 = ''
        for (var key in data) {
            if (id == data[key].id) {
                str8 = `
                <img src=${data[key].lagepic}>
             `
            }
        }

        //---------------------------------------------渲染内容-------------------------------------------------------
        var H1 = $('h1')
        var str3 = ''
        for (var key in data) {
            if (id == data[key].id) {
                str3 = `
                  <h1>${data[key].info}</h1>
                  `
            }
        }
        var list = $('.list')
        var str4 = ''
        for (var key in data) {
            if (id == data[key].id) {
                str4 = `
                <div class="list">
                <a href="#">
                    ￥
                    <span>${data[key].pice}</span>
                </a>
                <a href="#">
                    参考价￥
                    <span>${data[key].price}</span>
                </a>
                <a href="#">
                    剩余
                    <span class="time1"></span>
                </a>
            </div>
              `
            }
        }
        var distribution = $('.distribution')
        var str5 = ''
        for (var key in data) {
            if (id == data[key].id) {
                str5 = `
                <div>配送：</div>
                <div>
                    <a href="##">
                        <span></span>
                        ${data[key].city} &nbsp;&nbsp;到&nbsp;&nbsp;
                        <span>
                            <b></b>
                    </a>
                    <a href="##">
                        包邮 24小时发货
                    </a>
                </div>
                  `
            }
        }
        var sizelist = $('.sizelist')
        var str6 = ''
        for (var i = 0, k = data.length; i < k; i++) {

            if (id == data[i].id) {
                for (var j = 0, m = data[i].size.length; j < m; j++) {
                    str6 += `
                 
                    <li>
                        <a href="##">
                            ${data[i].size[j]}
                        </a>
                    </li>
                 `
                }
            }
        }
        var BIZpic = $('.BIZpic')
        var str7 = ''
        for (var key in data) {
            if (id == data[key].id) {
                str7 = `
                <div>
                <img src=${data[key].logo}>
                </div>
                <p>${data[key].appellative}</p>
                <p>${data[key].number}</p>
                `
            }
        }
        Pic.append(str)
        Largepic.append(str2)
        largeglass.append(str8)
        H1.append(str3)
        list.append(str4)
        distribution.append(str5)
        sizelist.append(str6)
        BIZpic.append(str7)
        this.conversion()
        this.specification()

    }

    //----------------------------------------------------回到顶部--------------------------------------------------
    suspend() {
        $(window).on("scroll", $.proxy(this.suspendcb, this))
    }
    suspendcb() {
        var back = $(".back")
        var Mtop = $(".MTop")
        var scrollTop = $(window).scrollTop()
        if (scrollTop >= 400) {
            back.css("display", "block");
            back.on("click", $.proxy(this.clickcb, this));
        } else {
            back.css("display", "none");
        }
        if (scrollTop >= 600) {
            Mtop.css("display", "block");
        } else {
            Mtop.css("display", "none");
        }
    }
    clickcb() {
        $('html,body').stop(true).animate({ "scrollTop": 0 }, 500);
    }
    //------------------------------------------------------图片的切换效果--------------------------------------------
    conversion() {
        this.Oimg = $('.piclist img')
        $.each(this.Oimg, $.proxy(this.Eachcallback, this))
    }
    Eachcallback(index) {
        this.Oimg.eq(index).on('mouseover', $.proxy(this.mouseovercallback, this.Oimg.eq(index)))
    }
    mouseovercallback(index) {
        var src = this.parent().parent().attr('data-src')
        var Limg = $('.Largepic img')
        var Gimg = $('.largeglass img')
        Limg.attr('src', src)
        Gimg.attr('src', src)
    }
    ///---------------------------------------------------------放大镜-------------------------------------------------
    entrance() {
        var Largepic = $('.Largepic')
        Largepic.on("mouseover", $.proxy(this.entrancecb, this))
        Largepic.on("mouseout", $.proxy(this.entranceoutcb, this))
    }
    entrancecb() {
        var smallpic = $('.Largepic>div')
        var largeglass = $('.largeglass')
        smallpic.css({
            'display': 'block',
        })
        largeglass.css({
            'display': 'block',
        })
    }
    entranceoutcb() {
        var smallpic = $('.Largepic>div')
        var largeglass = $('.largeglass')
        smallpic.css({
            'display': 'none',
        })
        largeglass.css({
            'display': 'none',
        })
    }
    magnifying() {
        var Largepic = $('.Largepic')
        Largepic.on("mousemove", $.proxy(this.LargepicCb, this))
    }
    LargepicCb(e) {
        var Largepic = $('.Largepic')
        var smallpic = $('.Largepic>div')
        var Largeimg = $('.largeglass>img')
        var X = e.pageX - Largepic.position().left - smallpic.width() / 2
        var Y = e.pageY - Largepic.position().top - smallpic.height() / 2
        var x = X >= Largepic.width() - smallpic.width() ? Largepic.width() - smallpic.width() : X <= 0 ? 0 : X;

        var y = Y >= Largepic.height() - smallpic.height() ? Largepic.height() - smallpic.height() : Y <= 0 ? 0 : Y;

        smallpic.css({
            'left': x + 'px',
            'top': y + 'px'
        })
        Largeimg.css({
            'left': -2 * x + 'px',
            'top': -2 * y + 'px'
        })
    }
    //----------------------------------------------------------点击抢购优惠卷-------------------------------------------
    Panic() {
        var coupon = $('.panic')
        coupon.on('click', $.proxy(this.couponcb, this))
    }
    couponcb() {
        var target = $(event.target);
        if (target.is('span') && target.attr('class') == 'jian') {
            target.css({
                'color': '#DBDBDB',
                'background': 'url(../img/img1/coupon_used.png) no-repeat',
                ' background-size': '#100% 100%',
            })
        }
    }
    //------------------------------------------------------------商品倒计时----------------------------------------------
    SetTime() {
        var timer = null;
        this.timer = setInterval($.proxy(this.setIntervalcb, this), 1000)

    }
    setIntervalcb() {
        var setTime = $('.time1');
        setTime.css({
            "color": "#000"
        })
        setTime.html(this.Time());
    }
    Time() {
        var d = new Date();
        var m = new Date("2019-6-25 00:00:00");
        var now1dar = (m.getTime() - d.getTime());
        var now2dar = parseInt(now1dar / (1000 * 60 * 60 * 24));
        var now3dar = parseInt(now1dar / (1000 * 60 * 60)) % 24;
        var now4dar = parseInt(now1dar / (1000 * 60)) % 60;
        var now5dar = parseInt(now1dar / 1000) % 60;
        if (now5dar >= 10) {
            return (now2dar + "天" + now3dar + "时" + now4dar + "分" + now5dar + "秒");
        } else {
            return (now2dar + "天" + now3dar + "时" + now4dar + "分" + "0" + now5dar + "秒");
        }
    }
    //-----------------------------------------------------------------商品数量的加减------------------------------------
    plusminus() {
        var resume = $('.resume')
        var add = $('.add')
        add.on('click', $.proxy(this.addcb, add))
        resume.on('click', $.proxy(this.resumecb, add))
    }
    addcb() {
        var number = $('.number')
        var value = parseInt(number.html()) + 1
        number.html(value)
    }
    resumecb() {
        var number = $('.number')
        if (parseInt(number.html()) > 1) {
            var value = parseInt(number.html()) - 1
            number.html(value)
        }

    }
    //------------------------------------------------------------------选中商品的点击效果-------------------------------
    specification() {
        var sizelist = $('.sizelist')
        sizelist.on('click', $.proxy(this.sizelistcb, this))
    }
    sizelistcb() {
        var target = $(event.target)
        if (target.is('a')) {
            target.parent().addClass('active')
            target.parent().siblings().removeClass('active')
        }
        var active = $('.active')
        var font = $('.active>a')
        active.css({
            "border-color": "#ff464e",
        })
        font.css({
            "color": "#ff464e",
        })
    }
    //------------------------------------------------------------------点击跳转购物车储存本地数据--------------------------
    Jumpcar() {
        var shoppingcar = $('.shoppingcar>a')
        shoppingcar.eq(0).on('click', $.proxy(this.shoppingcb, this))
        shoppingcar.eq(1).on('click', $.proxy(this.shoppingcarcb, this))
    }
    shoppingcarcb() {
        var id = location.href.split("?")[1].split("=")[1].slice(0, 2);
        var datanum = $('.number')
        if (!window.localStorage.getItem('data')) {
            window.localStorage.setItem("data", JSON.stringify([{
                id: id,
                num: (datanum.html()) * 1
            }]))
        } else {
            var obj = JSON.parse(localStorage.getItem("data"))
            var bStop = true
            for (var i = 0, k = obj.length; i < k; i++) {
                if (obj[i].id == id) {
                    obj[i].num += (datanum.html()) * 1
                    bStop = false;
                    window.localStorage.setItem("data", JSON.stringify(obj))
                    break
                }
            }
            if (bStop) {
                obj.push({
                    id: id,
                    num: (datanum.html()) * 1
                })
                window.localStorage.setItem("data", JSON.stringify(obj))
            }

        }

    }
    shoppingcb() {
        $(location).attr('href', "http://localhost/zhang/new/juanpi/html/shoppingcar.html")
    }
}
new Sucktop()
