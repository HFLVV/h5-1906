class Login {
    constructor() {
        this.Num=$('.Num')
        this.shop=$('.jumpshopcar')
        this.init()
    }
    init() {
        this.Onclick()
        this.ShowHide()
        this.jumppage()
    }
    Onclick() {
        var Logout = $('.logout')
        Logout.on('click', $.proxy(this.Logooutcb, this))
    }
    Logooutcb() {
        window.localStorage.removeItem("name")
        this.ShowHide()
    }

    ShowHide() {
        var aLi = $(".headlist_l a")
        if (!window.localStorage.getItem('name')) {
            aLi.eq(2).css({
                "display": 'none'
            })
            aLi.eq(0).css({
                "display": 'block'
            })
            aLi.eq(1).css({
                "display": 'block'
            })
            var sum=0
            this.Num.html(sum)
        } else {
            var value =localStorage['name']
            var Text=$('.pNum')
            aLi.eq(2).css({
                "display": 'block'
            })
            Text.html(value)
            aLi.eq(0).css({
                "display": 'none'
            })
            aLi.eq(1).css({
                "display": 'none'
            })
            //-----------------------------------------购物袋的商品数量-------------------------------------------------------------------------------
            if(!window.localStorage.getItem('data')){
                 var sum=0
                 this.Num.html(sum)
              }else{
                var obj = JSON.parse(localStorage.getItem("data"))
                for(var key in obj){
                 var sum=0
                 sum+=obj[key].num*1
               }
               this.Num.html(sum)
              }
             
            
           
        }
    }
    //------------------------------------------------------跳转购物车--------------------------------------------------------------------------------
    jumppage(){
        for(var i=0;i<this.shop.length;i++){
            this.shop.eq(i).on('click',$.proxy(this.Shopcb,this))
        }
    }
    Shopcb(){
        $(location).attr('href',"http://localhost/zhang/new/juanpi/html/shoppingcar.html")
    }
  

}
new Login()