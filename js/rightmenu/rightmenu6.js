let kk = {};

kk.showRightMenu = function(isTrue, x=0, y=0){
    let $rightMenu = $('#rightMenu');
    $rightMenu.css('top',x+'px').css('left',y+'px');

    if(isTrue){
        $rightMenu.show();
    }else{
        $rightMenu.hide();
    }
}

let rmWidth = $('#rightMenu').width();
let rmHeight = $('#rightMenu').height();
window.oncontextmenu = function(event){
    let pageX = event.clientX + 10;	//加10是为了防止显示时鼠标遮在菜单上
    let pageY = event.clientY;
    if (event.ctrlKey) return true; //ctrl+右键 使用原生右键
    // 鼠标默认显示在鼠标右下方，当鼠标靠右或考下时，将菜单显示在鼠标左方\上方
    if(pageX + rmWidth > window.innerWidth){
        pageX -= rmWidth;
    }
    if(pageY + rmHeight > window.innerHeight){
        pageY -= rmHeight;
    }
    
    $('.rightMenu-group.hide').hide();
    if(document.getSelection().toString()){
        $('#menu-text').show();
    }
    
    kk.showRightMenu(true, pageY, pageX);
    $('#rightmenu-mask').attr('style','display: flex');
    return false;
};

function RemoveRightMenu(){
    kk.showRightMenu(false);
    $('#rightmenu-mask').attr('style','display: none');
}

$('#menu-backward').on('click',function(){window.history.back();});
$('#menu-forward').on('click',function(){window.history.forward();});
$('#menu-refresh').on('click',function(){window.location.reload();});

kk.switchDarkMode = function(){
    RemoveRightMenu();
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    if (nowMode === 'light') {
        activateDarkMode()
        saveToLocal.set('theme', 'dark', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
    } else {
        activateLightMode()
        saveToLocal.set('theme', 'light', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
    }
    // handle some cases
    typeof utterancesTheme === 'function' && utterancesTheme()
    typeof FB === 'object' && window.loadFBComment()
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)
};

$('#menu-darkmode').on('click',kk.switchDarkMode);

$('#menu-home').on('click',function(){window.location.href = window.location.origin;});

//复制选中文字
kk.copySelect = function(){
    document.execCommand('Copy',false,null);
    GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.copy.success)
    //这里可以写点东西提示一下 已复制
}
kk.switchDarkMode = function(){
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    if (nowMode === 'light') {
        activateDarkMode()
        saveToLocal.set('theme', 'dark', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
    } else {
        activateLightMode()
        saveToLocal.set('theme', 'light', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
    }
    // handle some cases
    typeof utterancesTheme === 'function' && utterancesTheme()
    typeof FB === 'object' && window.loadFBComment()
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)
};
kk.switchReadMode = function(){
    const $body = document.body
    $body.classList.add('read-mode')
    const newEle = document.createElement('button')
    newEle.type = 'button'
    newEle.className = 'fas fa-sign-out-alt exit-readmode'
    $body.appendChild(newEle)

    function clickFn () {
        $body.classList.remove('read-mode')
        newEle.remove()
        newEle.removeEventListener('click', clickFn)
    }

    newEle.addEventListener('click', clickFn)
}


$('#menu-darkmode').on('click',kk.switchDarkMode);
$('#menu-readmode').on('click',kk.switchReadMode);
kk.switchTheme=function(load=false){
    //空字符串表示butterfly原版主题（即不加载css）
    //FallGuys.css是我自己的魔改主题，需替换
    let themes = ['cao.css','custom.css'];
    let vTheme = parseInt(localStorage.getItem('visitor-theme'));
    if(!vTheme){
        vTheme = load?0:1;
    }else{
        vTheme += load?0:1;
        vTheme%=themes.length;
    }
    localStorage.setItem('visitor-theme',vTheme)
    let themesrc = ''
    if(themes[vTheme]){
        themesrc += window.location.origin+'/css/happyking/'+themes[vTheme];
    }
    //css引入时link标签添加属性tag="theme"
    $(document.body).find('[tag="theme"]')[0].href = themesrc;
};

$('#menu-themeChange').on('click',function(){kk.switchTheme();});

window.addEventListener('load',function(){kk.switchTheme(true);});	//页面加载时，通过缓存加载主题
// 简体繁体切换
$('#menu-translate').on('click',function(){
    RemoveRightMenu();
    translateInitialization();
});