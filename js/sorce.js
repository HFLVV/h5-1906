class sorceandres {
    constructor() {
        this.registerDIv = $('.login_s')
        this.sorceDiv = $('.login_r')
        this.phone = $('input[name=username]')
        this.socrepsword = $('input[name=psssword]')
        this.user = $('input[name=user]')
        this.pass = $('input[name=pass]')
        this.init()
    }
    init() {
        this.replace()
        this.verification_R()
        this.verification_S()
        this.onfcous() 
        this.switch()
    }
     //--------------------------------------跳转页面后登录和注册的显示----------------------------------------
     switch(){
        var id = location.href.split("?")[1].split("=")[1].slice(0,3);
        if(id=='001'){
            this.registerDIv.css({
                'display': "block"
            })
            this.sorceDiv.css({
                'display': "none"
            })
        }
        if(id=='002'){
            this.registerDIv.css({
                'display': "none"
            })
            this.sorceDiv.css({
                'display': "block"
            })
        }
     }

    //----------------------------------------登录和注册页面点击切换-----------------------------------------
    replace() {
        var register = $('.reister_L')
        var sorce = $('.sorce_L ')
        register.on("click", $.proxy(this.registercb, this))
        sorce.on("click", $.proxy(this.sorcecb, this))
    }
    registercb() {
        this.registerDIv.css('display', 'none')
        this.sorceDiv.css('display', 'block')
        var registerinput = $('.register input')
        registerinput.val('')
    }
    sorcecb() {

        this.registerDIv.css('display', 'block')
        this.sorceDiv.css('display', 'none')
    }
    //------------------------------------------------注册验证----------------------------------------------
    verification_R() {
        var regedit = $('input[name=regedit]')
        regedit.on("click", $.proxy(this.regeditcb, this))
    }
    regeditcb() {
        var namevalue = this.phone.val()
        var passwordvalue = this.socrepsword.val()
        if (this.phone.val() != '' && this.socrepsword.val() != '') {
            $.ajax({
                type: "post",
                url: "../php/register.php",
                data: {
                    username: namevalue,
                    password: passwordvalue
                },
                dataType: "json",
                success: $.proxy(this.successcb, this)
            })
        }
    }
    successcb(data) {
        if (data.status == false) {
            this.phone.next().next().css({
                'color': '#f00',
                'display': "block"
            })
            this.phone.next().next().html("该手机已注册")
            this.phone.next().css({
                "background-position": " 0 -19px",
            })
        }

        if (data.status == true) {
            alert("注册成功")
            this.registerDIv.css('display', 'block')
            this.sorceDiv.css('display', 'none')
        }
    }
    //------------------------------------------------------登录验证------------------------------------
    onfcous(){
        this.user.on('focus',$.proxy(this.userfocuscb,this.user))
        this.user.on('blur',$.proxy(this.userblurcb,this.user))
        this.pass.on('focus',$.proxy(this.passfocuscb,this.pass))
        this.pass.on('blur',$.proxy(this.passblurcb,this.pass))
    }
    userfocuscb(){
        this.next().css({
            'opacity':'0'
        })
    }
    userblurcb(){
        console.log(this)
        if(this.val()==''){
            this.next().html('用户名不能为空')
            this.next().css({
                'color':'#f00',
                'opacity':'1'
            }) 
        }
    }

   passfocuscb(){
        this.next().css({
            'opacity':'0'
        })
    }
   passblurcb(){
        console.log(this)
        if(this.val()==''){
            this.next().html('密码不能为空')
            this.next().css({
                'color':'#f00',
                'opacity':'1'
            }) 
        }
    }
 
    verification_S() {
        var Qsorce = $('.Qsorce')
        Qsorce.on("click",$.proxy(this.Qsorcecb, this))
    }
    Qsorcecb() {
        if (this.user.val() != '' && this.pass.val() != '') {
            $.ajax({
                type: "post",
                url: "../php/sorce.php",
                data: {
                    username: this.user.val(),
                    password: this.pass.val()
                },
                dataType: "json",
                success: $.proxy(this.sorcecallback, this)
            })
        }
    }
    sorcecallback(data) {
        if (data.status == true) {
           window.localStorage.setItem("name",this.user.val())
            $(location).attr('href','http://localhost/zhang/new/juanpi/html/Home.html')
        }
        if(data.status == false){
            this.user.next().html('用户名不存在')
            this.user.next().css({
                'color':'#f00',
                'opacity':'1'
            })
        }
        if(data.status == 'false1'){
            this.pass.next().html('密码错误')
            this.pass.next().css({
                'color':'#f00',
                'opacity':'1'
            })
        }
    }
}
new sorceandres() 