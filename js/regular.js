class Canonical{
   constructor(){
       this.init();
   }
   init(){
    this.packaging();
    this.strength();
    this.Passchange();
    this.confirm();
   }
    //-------------------------------------------注册表单的正则验证手机号验证-----------------------------------

   packaging() {
    var obj1 = {
        title: $(".register>li:eq(0)>input"),
        ret: /^[1][3,4,5,7,8,9][0-9]{9}$/,
        acquire: '请输入11位手机号',
        change: '请输入正确的手机号码'
    }
    this.regular(obj1)
}

regular(obj) {
    obj.title.focus($.proxy(this.aLi1cb, obj.title, obj))
    obj.title.blur($.proxy(this.blur, obj.title, obj))
}
aLi1cb(obj) {
    this.css('border', '1px solid #c6c6c6')
    this.next().css({
        "opacity": 0,
    })
    this.next().next().css({
        "display": "block",
        "color": "#666"
    })
    this.next().next().html(obj.acquire)
}
blur(obj) {
    // var ret=/^[1][3,4,5,7,8][0-9]{9}$/; 
    var vaule = this.val();
    if (!obj.ret.test(vaule)) {
        this.css('border', '1px solid #f00')
        this.next().next().html(obj.change)
        this.next().next().css("color", "#f00")
        this.next().css({
            "background": "url(../img/img1/qq.gif)",
            "background-position": " 0 -19px",
            "opacity": "1",

        })
    } else {
        this.next().css({
            "background": "url(../img/img1/qq.gif)",
            "background-position": " -40px -19px",
            "opacity": "1",
        })
        this.next().next().css("display", "none")
    }
}
//-------------------------------------------注册表单的正则验证密码强度-----------------------------------

strength() {
    var val = $(".register>li:eq(1)>input")
    val.focus($.proxy(this.aLi2cb, val))
    val.blur($.proxy(this.strengthbulrcb, val))
}
aLi2cb() {
    var value2 = this.val();
    var lentet = /^[\w\W]{6,16}$/
    if(!lentet.test(value2)){
        this.css('border', '1px solid #c6c6c6')
        this.next().css({
            "opacity": 0,
        })
        this.next().next().css({
            "display": "block",
            "color": "#666"
        })
        this.next().next().html('6-16个数字、字母或符号，字母区分大小写')
    }else{
        this.next().next().css({
            "display": "none",
        })
    }
   
}
strengthbulrcb() {
    var value2 = this.val();
    var lentet = /^[\w\W]{6,16}$/
    if (this.val() == '') {
        this.css('border', '1px solid #f00')
        this.next().next().html("请输入密码")
        this.next().next().css("color", "#f00")
        this.next().css({
            "background": "url(../img/img1/qq.gif)",
            "background-position": " 0 -19px",
            "opacity": "1",
        })
    } else {
        if (!lentet.test(value2)) {
            this.css('border', '1px solid #f00')
            this.next().next().html("密码长度必须为6-16位")
            this.next().next().css("color", "#f00")
            this.next().css({
                "background": "url(../img/img1/qq.gif)",
                "background-position": " 0 -19px",
                "opacity": "1",
            })
        } else {
            this.next().css({
                "background": "url(../img/img1/qq.gif)",
                "background-position": " -40px -19px",
                "opacity": "1",
            })
        }
    }
}
Passchange() {
    var val = $(".register>li:eq(1)>input")
    val.on("input", $.proxy(this.Valchangecb, val))
}
Valchangecb() {
    var strong = $('.strong');
    var span = $('.strong>span');
    var em = $('.strong>em');
    var vaule3 = this.val();
    var lent = /^[\w\W]{6,16}$/;
    var lent1 = /^[0-9]{6,16}$|^[a-zA-Z]{6,16}$/;
    var lent2 = /^[A-Za-z0-9]{6,16}$/;
    var lent3 = /(?![^a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,16}$/;
    if (lent.test(vaule3)) {
        this.next().next().css({
            "display": "none"
        });
        strong.css({
            "display": "block"
        })
        if (lent1.test(vaule3)) {
            span.eq(0).css('background', '#ff3838')
            span.eq(1).css('background', '#c6c6c6')
            span.eq(2).css('background', '#c6c6c6')
            em.css('color', '#ff3838')
            em.html('弱')
        } else if (lent2.test(vaule3)) {
            span.eq(0).css('background', '#f60')
            span.eq(1).css('background', '#f60')
            span.eq(2).css('background', '#c6c6c6')
            em.css('color', '#f60')
            em.html('中')
        } else if (lent3.test(vaule3)) {
            span.eq(0).css('background', '#6db110')
            span.eq(1).css('background', '#6db110')
            span.eq(2).css('background', '#6db110')
            em.css('color', '#6db110')
            em.html('强')
        }

    } else {
        this.next().next().css({
            "display": "block"
        });
        strong.css({
            "display": "none"
        })
    }

}
//----------------------------------------------注册确认密码------------------------------------------------------
confirm() {
    var val1 = $(".register>li:eq(2)>input")
    val1.on('focus', $.proxy(this.confirmfcouscb, val1));
    val1.on('blur', $.proxy(this.confirmblurcb, val1));
}
confirmfcouscb() {
    this.css('border', '1px solid #c6c6c6')
    this.next().css({
        "opacity": 0,
    })
    this.next().next().css({
        "display": "block",
        "color": "#666"
    })
    this.next().next().html("请输入确认密码")
}
confirmblurcb() {
    var value4 = $(".register>li:eq(2)>input").val();
    var vaule5 = $(".register>li:eq(1)>input").val();
    if (value4 == '') {
        this.css('border', '1px solid #f00')
        this.next().next().html("请输入确认密码")
        this.next().next().css("color", "#f00")
        this.next().css({
            "background": "url(../img/img1/qq.gif)",
            "background-position": " 0 -19px",
            "opacity": "1",
        })
    } else if (value4 == vaule5) {
        this.next().css({
            "background": "url(../img/img1/qq.gif)",
            "background-position": " -40px -19px",
            "opacity": "1",
        })
        this.next().next().css("display", "none")
    } else {
        this.css('border', '1px solid #f00')
        this.next().css({
            "background": "url(../img/img1/qq.gif)",
            "background-position": " 0px -19px",
            "opacity": "1",
        })
        this.next().next().css(
            {
                "display": "block",
                "color": "#f00"
            })
        this.next().next().html("两次输入密码不一致")
    }
}
}
new Canonical()