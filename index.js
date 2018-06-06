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
        this.height = config.itemHeight || 40;
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
                                      </div>\
                                    <div class="pop">\
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
                var offsetNum = 0 * this.height; //初始位移的值
                var el = qsa('.picker-items-col')[i];
                this._setOffset(el, i, offsetNum);
                this._listener(el, i, offsetNum)
            }
        },
        _setOffset(el, i, offsetNum){
            qs('.picker-items-col-wrapper', el).style.cssText = "transform: translateY("+ (110 - offsetNum) +"px);"
        },
        _listener(el, i, offsetNum){//第三个参数为Y轴的位移
            var touchStartY = 0, touchMovedY = offsetNum, thisIndex = 0;
            var lastMoveTime = 0, lastMoveStart = 0, stopInertiaMove = false;
            function touchstartHandle(e){
                    touchStartY = e.touches[0].pageY;  //开始触摸的Y轴
                    thisIndex = i; //第几个col 绑定
                    lastMoveTime = Date.now(); //最后触摸的事件
                    lastMoveStart = touchStartY; // 
            }
            function touchmoveHandle(e){
                e.preventDefault();
                var touchMoveY = e.touches[0].pageY, //移动后的
                    _touchMovedY = touchStartY - touchMoveY + touchMovedY; //开始的位移
                this._setOffset(el, thisIndex, _touchMovedY);
                var nowTime = Date.now();
                if(nowTime - lastMoveTime > 300){
                    lastMoveTime = nowTime;
                    lastMoveStart = touchMoveY; //最后位移记录
                }
                
            }
            function touchendHandle(e){
                var toucheEndY = e.changedTouches[0].pageY; //
                var touchChangedY = touchStartY - toucheEndY + touchMovedY;
                touchMovedY = touchChangedY;
                var nowDate = Date.now();
                
                
            }
            off(el, 'touchstart', touchstartHandle.bind(this))
            off(el, 'touchmove', touchmoveHandle.bind(this))
            off(el, 'touchend', touchendHandle.bind(this))

            on(el, 'touchstart', touchstartHandle.bind(this))
            on(el, 'touchmove', touchmoveHandle.bind(this))
            on(el, 'touchend', touchendHandle.bind(this));

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