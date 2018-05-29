




!(function(win){

    function on(el, evt, callback){
        el.addEventListener(evt, callback, false)
    }

    function off(el, evt, callback){
        el.removeEventListener(evt, callback, false)
    }

    function qs(id, element){
        var el = element || document;
        return el.querySelector(id)
    }
    function qsa(id, element){ 
        const el = element || document;
        return el.querySelectorAll(id)
    }
    var Picker = win.Picker = function(config){
        var defaultConfig = {
            title: '选择'
        }
        var config = Object.assign({}, defaultConfig, config);
        this.title = config.title;
        
        this._renderPop()
        this._event()
    }   
    Picker.prototype = {
        constructor: Picker,
        _renderPop: function(){
             this.picker = document.createElement('div'),
             this.cover = document.createElement('div');
             this.cover.className = "cover"
             this.picker.className = "picker"
             this.picker.innerHTML = '<div class="header">\
                                 <span class="cancel">取消</span>\
                                 <span class="title">'+this.title+'</span>\
                                 <span class="confirm">确认</span>\
                                </div><div class="pop">\
                                <div class="content">\
                                <div class="picker-items-col">\
                                    <div class="picker-items-col-wrapper">\
                                        <div class="picker-item">蔡明超</div>\
                                        <div class="picker-item">王伟</div>\
                                    </div>\
                                </div>\
                                <div class="picker-items-col">\
                                    <div class="picker-items-col-wrapper">\
                                        <div class="picker-item">22</div>\
                                        <div class="picker-item">99</div>\
                                    </div>\
                                </div>\
                                </div>\
                                <div class="top"></div>\
                                <div class="bottom"></div>\
                                </div>'
            document.body.appendChild(this.cover)
            document.body.appendChild(this.picker)
            setTimeout(function(){
                this.picker.classList.add('show')
                this.cover.classList.add('show')
            }.bind(this), 20)
            for(var i = 0;i<2;i++){
                var el = qsa('.picker-items-col')[i];
                this._setOffset(el, 0)
                this._listener(el, 0)
            }
        },
        _setOffset(el, i, offsetNum){
            qs('.picker-items-col-wrapper', el).style.cssText = "transform: translateY("+ 70 +"px)"
        },
        _listener(el, i, offsetNum){

        },
        _event: function(){
            this.cover.onclick = function(){
                this._remove()
            }.bind(this, 'username')
        },
        _remove(){
            this.cover.classList.remove('show')
            this.picker.classList.remove('show')
            this.cover.addEventListener('transitionend', function(){
                this.cover.remove();
                this.picker.remove()
            }.bind(this))
        }


    }


})(window)