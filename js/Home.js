class AddImg {
    constructor() {
        this.init();
    }
    init() {
        this.toImg();
        this.SetTime();
        this.suspend();
        this.Jump();
        this.Switch()
    }
    //----------------------------------------------页面渲染--------------------------------------------------------------
    toImg() {
        $.ajax({
            type: "get",
            url: "../json/Home.json",
            data: {},
            dataType: "json",
            success: $.proxy(this.successcb, this)
        })
    }
    successcb(data) {
        var mainlist_T_M = $(".mainlist_T_M")
        var str = '';
        for (var key in data) {
            str += `<ul>
            <li data-id=${data[key].id}>
            <div class="Imgbox">
                <div>
                    <a href="##">
                        <div><img src="${data[key].img}"></div>
                        <div class="buy">
                            <span></span>
                        </div>
                    </a>
                    <div >
                        <span>${data[key].pice}</span>
                        <span><del>${data[key].pice2}</del></span>
                    </div>
                    <h3>
                        <a class='title'>${data[key].title}</a>
                        <span>上新</span>
                    </h3>
                </div>
            </div>
        </li>
        </ul>`
        }
        mainlist_T_M.html(str);
        // this.collect();
        this.jumto()
        this.Love()
    }
    //-----------------------------------------------图片倒计时------------------------------------------------------------
    SetTime() {
        var timer = null;
        this.timer = setInterval($.proxy(this.setIntervalcb, this), 1000)

    }
    setIntervalcb() {
        var setTime = $('.time1');
        setTime.css({
            "color": "#fff"
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
            return ("倒计时" + now2dar + "天" + now3dar + "时" + now4dar + "分" + now5dar + "秒");
        } else {
            return ("倒计时" + now2dar + "天" + now3dar + "时" + now4dar + "分" + "0" + now5dar + "秒");
        }
    }
    //--------------------------------------------顶部悬浮和回到顶部------------------------------------------------------
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
    //------------------------------------------------点击进入登录页面Home页---------------------------------------------
    collect() {

        var Box = $(".buy");
        var quit = $(".quit");
        Box.on("click", $.proxy(this.collectcb, this));
        quit.on("click", $.proxy(this.quitcb, this));
    }
    collectcb() {
        var sorce = $(".sorce")
        sorce.css("display", "block");
    }
    quitcb() {
        var sorce = $(".sorce");
        sorce.css("display", "none");
    }
    //------------------------------------------登录和注册页面的跳转Home页-----------------------------------------------

    Jump() {
        var sorcnav = $('.sorcenav>div');
        var inputlist = $('.inputlist');
        var register = $('.register');
        sorcnav.eq(0).on('click', $.proxy(this.sorcecb, sorcnav.eq(0)))
        sorcnav.eq(1).on('click', $.proxy(this.registercb, sorcnav.eq(1)))

    }
    sorcecb() {
        var inputlist = $('.inputlist');
        var register = $('.register');
        this.css({
            'border-bottom': '#ff464e solid 3px'
        })
        this.next().css({
            'border-bottom': '0'
        })
        inputlist.css({
            'display': 'block',

        })
        register.css({
            'display': 'none'
        })
    }
    registercb() {
        var inputlist = $('.inputlist');
        var register = $('.register');
        this.css({
            'border-bottom': '#ff464e solid 3px'
        })
        this.prev().css({
            'border-bottom': '0'
        })
        inputlist.css({
            'display': 'none'
        })
        register.css({
            'display': 'block',
        })
    }
    //---------------------------------------------登录页面的跳转------------------------------------------------------
    Switch() {
        var Whole = $('.headlist_l>a')
        Whole.eq(0).on('click', $.proxy(this.logincallback, Whole.eq(0)))
        Whole.eq(1).on('click', $.proxy(this.applycallback, Whole.eq(1)))
    }
    logincallback() {
        var id = this.attr('data-id')
        $(location).attr('href', 'http://localhost/zhang/new/juanpi/html/sorce.html?id=' + id)
    }
    applycallback() {
        var id = this.attr('data-id')
        $(location).attr('href', 'http://localhost/zhang/new/juanpi/html/sorce.html?id=' + id)
    }


    //---------------------------------------------首页到详情页的跳转--------------------------------------------------
    jumto() {
        var mainlist_T_M = $('.mainlist_T_M')
        mainlist_T_M.on('click', $.proxy(this.jumtocb, this))
    }
    jumtocb() {
        var target = $(event.target);
        if (target.is('img') || (target.is('a') && target.attr('class') == 'title')) {
            var id = target.parent().parent().parent().parent().parent().attr('data-id')
            $(location).attr('href', 'http://localhost/zhang/new/juanpi/html/Detailspage.html?id=' + id)
        }
    }

    //-------------------------------------------------------收藏的设置------------------------------------------------
    Love() {
        var buy = $('.buy')
        var love = $('.buy span')
        for (var i = 0; i < buy.length; i++) {
            buy.eq(i).on('click', $.proxy(this.buycbA, this,love.eq(i), buy.eq(i)))
        }

    }
    buycbA(that,M) {
        if (!localStorage.getItem('name')) {
            this.collect();
        } else {
            if (!that.attr('checked')) {
                that.attr('checked',true)
                that.css({
                    'background-position': "0 -20px",
                })
                M.css({
                    'display':"block"
                })

            } else {
                that.attr('checked',false)
                that.css({
                    'background-position': "0 0"
                })
                // M.css({
                //     'display':"none"
                // })
                var Outhide=that.parent().parent().parent().parent().parent()
                Outhide.on('mouseout',$.proxy(this.Outhidecb,M))
                Outhide.on('mouseover',$.proxy(this.mouseovercb,M))

            }
        }

    }
    Outhidecb(){
        this.css({
            'display':"none"
        })
    }
    mouseovercb(){
        this.css({
            'display':"block"
        })
    }

}
new AddImg()