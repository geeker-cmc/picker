!(function(win){
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