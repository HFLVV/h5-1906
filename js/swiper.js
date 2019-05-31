class Swiper {
    constructor() {
        this.bnaner = $(".banner")
        this.ul = $(".banner>ul")
        this.aLi = $(".banner>ul>li")
        this.iw = this.aLi.eq(0).width()
        this.Arrow = $("#Arrow>a")
        this.circular = $("#circular>a")
        this.iNow = 0
        this.timer = null
        this.init()

    }
    init() {
        var li = this.aLi.eq(0).clone(true)
        this.ul.append(li)
        this.aLinow = $(".banner>ul>li").length
        this.ul.css("width", this.iw * (this.aLinow))
        this.Move()
        this.Mouser()
        this.Constructor()
        this.Dir()
    }
    Dir() {
        this.Arrow.eq(0).on("click", $.proxy(this.clickZerocb, this))
        this.Arrow.eq(1).on("click", $.proxy(this.clickOnecb, this))
    }
    clickZerocb() {
        if (this.iNow == this.aLinow - 1) {
            this.iNow = 1
            this.ul.css("left", 0)
        } else (
            this.iNow++
        )
        this.toImg()
    }
    clickOnecb() {
        if (this.iNow == 0) {
            this.iNow = this.aLinow - 2
            this.ul.css("left", this.iw * (this.aLinow - 1))
        } else (
            this.iNow--
        )
        this.toImg()
    }
    Constructor() {
        this.circular.on("mouseover", $.proxy(this.Constructorcb, this))
    }
    Constructorcb(e) {
        var index = $(e.target).index()
        this.circular.eq(index).addClass("acolor").siblings().removeClass("acolor")
        this.iNow = index
        this.toImg()
    }
    Mouser() {
        this.bnaner.on("mouseover", $.proxy(this.Mouserovercb, this))
        this.bnaner.on("mouseout", $.proxy(this.Mouseroutcb, this))
    }
    Mouserovercb() {
        clearInterval(this.timer)
    }
    Mouseroutcb() {
        this.Move()
    }
    Move() {
        this.timer = setInterval($.proxy(this.handercallback, this), 3000)
    }
    handercallback() {
        if (this.iNow == this.aLinow - 1) {
            this.iNow = 1
            this.ul.css("left", 0)
        } else (
            this.iNow++
        )
        this.toImg()
    }
    toImg() {
        this.ul.stop(true).animate({
            left: -this.iNow * this.iw
        })
        this.circular.eq(this.iNow == this.aLinow - 1 ? 0 : this.iNow).addClass("acolor").siblings().removeClass("acolor")
    }
}

new Swiper()