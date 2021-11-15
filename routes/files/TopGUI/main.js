(function(window){
    var TopStart = performance.now()
    function TopGUI(){
        var _TopGUIObject = {}

        var menu, menuIT

        function Log() {
            this.info = (str, args = []) => this.log('info', str, args);
            this.warn = (str, args = []) => this.log('warn', str, args);
            this.error = (str, args = []) => this.log('error', str, args);
            this.log = (level, str, args) => {
                let colour = [];
                switch(level) {
                    case 'info':colour=["#07a1d5", "#6e07d5"];break;
                    case 'error':colour=["#d50707", "#d53a07"];break;
                    case 'warn':colour=["#d56e07", "#d5d507"];break;
                }
                console.log('%c '.concat('[ TopGUI ', level, ' ] '), [
                    `background: linear-gradient(${colour[0]}, ${colour[1]})`
                    , 'color: black'
                    , 'border: 1px solid #3E0E02'
                    , 'display: block'
                    , 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)'
                    , 'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset'
                    , 'line-height: 12px'
                    , 'text-align: center'
                    , 'font-weight: bold'
                ].join(';'))
                if (args.length) console.log(str, args);
                else console.log(str);
            }
        } var log = new Log();

        _TopGUIObject.log = log

        _TopGUIObject.newGUI = function(name="Unnamed GUI", w=400, h=74){
            menu = document.createElement("div");
            menu.id = "menu"
            menu.style.display = "none";
            menu.style.width="0px";
            menu.style.height="0px";
            menu.style.color="black"
            menu.innerHTML = 
            `
            <div id="mydiv" style="width: ${w}px; height: ${h}px">
            <div id="mydivheader" style="color: black">${name}</div>
            <br>
            </div>
            `
            document.body.appendChild(menu);
            var men = document.getElementById("mydiv");
            men.style.top=(window.innerHeight/2)+"px" 
            men.style.left=((window.innerWidth/2)-(men.offsetWidth/2))+"px"
        }

        _TopGUIObject.setCSS = function() {
            var cstyle = document.createElement("style")
            cstyle.innerHTML = `
            /* TopGUI Style */
            .switch{position:relative;display:inline-block;width:60px;height:34px}.switch input{opacity:0;width:0;height:0}.slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;-webkit-transition:.4s;transition:.4s}.slider:before{position:absolute;content:"";height:26px;width:26px;left:4px;bottom:4px;background-color:#fff;-webkit-transition:.4s;transition:.4s}input:checked+.slider{background-color:#2196f3}input:focus+.slider{box-shadow:0 0 1px #2196f3}input:checked+.slider:before{-webkit-transform:translateX(26px);-ms-transform:translateX(26px);transform:translateX(26px)}.slider.round{border-radius:34px}.slider.round:before{border-radius:50%}#mydiv{display:block;position:absolute;z-index:99999;background-color:#282828;border:1px solid #d3d3d3;text-align:center}#mydivheader{cursor:move;z-index:10;background-color:#2196f3;color:#fff};`
            menu.appendChild(cstyle)
        }

        _TopGUIObject.setBaseScript = function() {
            var cscript = document.createElement("script")
            cscript.innerHTML = `
            function dragElement(e){var n=0,t=0,o=0,u=0;function d(e){(e=e||window.event).preventDefault(),o=e.clientX,u=e.clientY,document.onmouseup=l,document.onmousemove=m}function m(d){(d=d||window.event).preventDefault(),n=o-d.clientX,t=u-d.clientY,o=d.clientX,u=d.clientY,e.style.top=e.offsetTop-t+"px",e.style.left=e.offsetLeft-n+"px"}function l(){document.onmouseup=null,document.onmousemove=null}document.getElementById(e.id+"header")?document.getElementById(e.id+"header").onmousedown=d:e.onmousedown=d}dragElement(document.getElementById("mydiv"));`
            menu.appendChild(cscript)
        }

        _TopGUIObject.addTextInput = function(id, [placeholder, w, h], callback) {
            menuIT = document.getElementById("mydiv")
            var newTextIn = document.createElement("div");
            var text = document.createElement("input"); 
            text.style.width=w+"px"
            text.style.height=h+"px"
            text.placeholder = placeholder
            text.type="text"
            text.id = id
            text.addEventListener("keyup", function(event){
                if(event.keyCode === 13){
                    event.preventDefault();
                    callback(text.value)
                }
            });
            newTextIn.appendChild(text);
            menuIT.appendChild(newTextIn);
            var newBR = document.createElement("br");
            menuIT.appendChild(newBR)
        }

        _TopGUIObject.addSlider = function(id, text, callback) {
            menuIT = document.getElementById("mydiv")
            var newSlider = document.createElement("div");
            var title = document.createElement("a");title.innerText=text+"  ";newSlider.appendChild(title);
            var label = document.createElement("label");label.classList.add("switch");newSlider.appendChild(label);
            var input = document.createElement("input");input.id=id;input.type="checkbox";input.onclick=callback;label.appendChild(input);
            var span = document.createElement("span");span.classList.add("slider");span.classList.add("round");label.appendChild(span)
            var br = document.createElement("br");newSlider.appendChild(br)
            menuIT.appendChild(newSlider)
            var newBR = document.createElement("br");
            menuIT.appendChild(newBR)
        }

        _TopGUIObject.getElement = function(id){
            var found = document.getElementById(id)

            return found
        }

        _TopGUIObject.addButton = function(id, text, callback) {
            menuIT = document.getElementById("mydiv")
            var newButton = document.createElement("div");
            var button = document.createElement("button"); 
            button.innerText = text
            button.id = id
            button.onclick = callback
            newButton.appendChild(button);
            menuIT.appendChild(newButton);
            var newBR = document.createElement("br");
            menuIT.appendChild(newBR)
        }

        _TopGUIObject.init = function(){
            this.setCSS()
            this.setBaseScript()
            menu.style.display="block"
        }

        return _TopGUIObject
    }

    if(typeof(window.TopGUI) === 'undefined'){
        window.TopGUI = TopGUI();
    }
    var TopStop = performance.now()
    TopGUI().log.info("Library Loaded! Took "+(TopStop-TopStart).toFixed(2)+"ms")

})(window);