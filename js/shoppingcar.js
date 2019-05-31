


//-------------------------------------------------源生js------------------------------------------------------
class Shopping {
    constructor() {
        this.sum = document.querySelector('.sum>span')
        this.sum1 = document.querySelector('.sum1')
        this.num = document.querySelector('.num')
        this.Empty = document.querySelector('.empty')
        this.Info = document.querySelector('.info')
        
        this.init()
    }
    init() {
        this.Hide()
    }
    //--------------------------------------------购物车的数据渲染和-商品和空的购物车显示和隐藏--------------------------------------- 
    Hide() {
        if (!window.localStorage.getItem('name')) {
            this.Empty.style.display = 'block'
            this.Info.style.display = 'none'
        } else {
            this.Getdata()
        }
    }
    Getdata() {
        axios({
            method: "get",
            url: "../json/Detailspage.json",
        }).then(this.Getdatacb.bind(this));
    }
    Getdatacb(data) {
        var Data = JSON.parse(localStorage.getItem("data"))
        if (!Data) {
            this.Empty.style.display = 'block'
            this.Info.style.display = 'none'
            this.Recommend()
        } else {
            var str = ''
            var Infopirce = document.querySelector('.infopirce')
            this.Empty.style.display = 'none'
            this.Info.style.display = 'block'
            for (var i = 0, k = Data.length; i < k; i++) {
                for (var j = 0, M = data.length; j < M; j++) {
                    if (Data[i].id == data[j].id) {
                        str += `
                             <div class="infocontent" data-id=${Data[i].id}>
                         <div>
                             <input type="checkbox">
                         </div>
                         <div>
                             <img src=${data[j].lagepic}>
                         </div>
                         <div>
                             <span>${data[j].title}</span>
                             <span>${data[j].size[0]}</span>
                         </div>
                         <div>
                             ￥<span class="price">${data[j].pice}</span>
                             /￥<span>${data[j].price}</span>
                         </div>
                         <div>
                             <span class="resume">-</span>
                             <span class="number">${Data[i].num}</span>
                             <span class="add">+</span>
                         </div>
                         <div>
                             ￥ <span class="subtotal">${data[j].pice * Data[i].num}</span>
                         </div>
                         <div>
                             <span class="del">
                             </span>
                         </div>
                         </div>
                             `
                    }
                }
            }
            Infopirce.innerHTML = str
            this.All()
            this.Invert()
            this.numeber()
            this.Del()
            
        }

    }
    //---------------------------------------------点击跳转回首页--------------------------------------------------
    Recommend() {
        var recommend = document.querySelector('.recommend')
        recommend.addEventListener('click', this.recommendcb, this)
    }
    recommendcb() {
        console.log(111)
    location.href="http://localhost/zhang/new/juanpi/html/Home.html"
    }

    //---------------------------------------------复选框的全选和反选-----------------------------------------------
    All() {
        var selectAll = document.querySelector('.select')
        selectAll.addEventListener('click', this.selectAllcb.bind(this, selectAll))
    }
    selectAllcb(that) {
        //-----------------------------------------全选------------------------------------------------------------

        var Invert = document.querySelectorAll(".infocontent input")
        for (var i = 0; i < Invert.length; i++) {
            Invert[i].checked = that.checked
        }
        this.sum.innerHTML = this.Total()
        this.sum1.innerHTML = this.Total()
        this.num.innerHTML = this.Numtotal()

    }
    //---------------------------------------------反选------------------------------------------------------------
    Invert() {
        var Invert = document.querySelectorAll(".infocontent input")
        for (var j = 0, k = Invert.length; j < k; j++) {
            Invert[j].addEventListener('click', this.Invertcb.bind(this, Invert[j]))
        }
    }
    Invertcb(that) {
        var status = true
        var Invert = document.querySelectorAll(".infocontent input")
        var selectAll = document.querySelector('.select')
        for (var i = 0, k = Invert.length; i < k; i++) {
            if (!Invert[i].checked) {
                status = false
                break;
            }
        }
        selectAll.checked = status
        this.sum.innerHTML = this.Total()
        this.sum1.innerHTML = this.Total()
        this.num.innerHTML = this.Numtotal()
    }
    //-----------------------------------------------数量的加减&&算单个商品的总价------------------------------------------
    numeber() {
        var Resume = document.querySelectorAll('.resume')
        var Add = document.querySelectorAll('.add')
        for (var i = 0; i < Resume.length; i++) {
            Resume[i].addEventListener("click", this.Resumecb)
        }
        this.sum.innerHTML = this.Total()
        for (var j = 0; j < Add.length; j++) {
            Add[j].addEventListener("click", this.Addcb)
        }
        this.sum.innerHTML = this.Total()
        this.sum1.innerHTML = this.Total()
        this.num.innerHTML = this.Numtotal()
    }
    Resumecb() {

        if (this.nextElementSibling.innerHTML > 1) {
            this.nextElementSibling.innerHTML--
            this.parentNode.nextElementSibling.children[0].innerHTML = (this.nextElementSibling.innerHTML * this.parentNode.previousElementSibling.children[0].innerHTML).toFixed(2)
            var id = this.parentNode.parentNode.getAttribute('data-id')
            var datanum = this.nextElementSibling.innerHTML
            var obj = JSON.parse(localStorage.getItem("data"))
            for (var i = 0, k = obj.length; i < k; i++) {
                if (obj[i].id == id) {
                    obj[i].num = datanum
                    localStorage.setItem("data", JSON.stringify(obj))
                    break
                }
            }
        }

    }
    Addcb() {
        this.previousElementSibling.innerHTML++
        this.parentNode.nextElementSibling.children[0].innerHTML = (this.previousElementSibling.innerHTML * this.parentNode.previousElementSibling.children[0].innerHTML).toFixed(2)
        var id = this.parentNode.parentNode.getAttribute('data-id')
        var datanum = this.previousElementSibling.innerHTML
        var obj = JSON.parse(localStorage.getItem("data"))
        for (var i = 0, k = obj.length; i < k; i++) {
            if (obj[i].id == id) {
                obj[i].num = datanum
                localStorage.setItem("data", JSON.stringify(obj))
                break
            }
        }
    }
    //-----------------------------------------------删除商品-------------------------------------------------------------
    Del() {
        var infocontent = document.querySelector('.infopirce')
        infocontent.addEventListener('click', this.infocontentcb.bind(this))
    }
    infocontentcb(e) {
        var e = e || event;
        var target = e.target || e.srcElement;
        if (target.tagName == 'SPAN' && target.className == 'del') {
            target.parentNode.parentNode.remove()
            var id = target.parentNode.parentNode.getAttribute('data-id')
            var obj = JSON.parse(localStorage.getItem("data"))
            if (obj.length != 0) {
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].id == id) {
                        obj.splice(i, 1)
                    }
                }
                var arr = obj
                localStorage.setItem("data", JSON.stringify(arr))
                if (arr == '') {
                    localStorage.removeItem("data")
                    this.Empty.style.display = 'block'
                    this.Info.style.display = 'none'
                    this.Recommend()
                }
            }
        }
        this.sum.innerHTML = this.Total()
        this.sum1.innerHTML = this.Total()
        this.num.innerHTML = this.Numtotal()

    }

    //-----------------------------------------------计算选中商品的总价-------------------------------------------------------
    Total() {
        var total = 0
        var Invert = document.querySelectorAll(".infocontent input")
        for (var i = 0, k = Invert.length; i < k; i++) {
            if (Invert[i].checked) {
                var tr = Invert[i].parentNode.parentNode.children[5].children[0]
                total = (Number(tr.innerHTML) + total)
            }
        }
        return total
    }
    //--------------------------------------------------计算选中商品数量---------------------------------------------------------
    Numtotal() {
        var numtotal = 0
        var Invert = document.querySelectorAll(".infocontent input")
        for (var i = 0, k = Invert.length; i < k; i++) {
            if (Invert[i].checked) {
                var tr = Invert[i].parentNode.parentNode.children[4].children[1]
                numtotal = Number(tr.innerHTML) + numtotal
            }
        }
        return numtotal
    }
}
new Shopping()