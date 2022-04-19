kk.switchTheme=function(load=false){
  //空字符串表示butterfly原版主题（即不加载css）
  //FallGuys.css是我自己的魔改主题，需替换
  let themes = ['custom.css',''];
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
      themesrc += window.location.origin+'/css/'+themes[vTheme];
  }
  //css引入时link标签添加属性tag="theme"
  $(document.head).find('[tag="theme"]')[0].href = themesrc;
};

$('#menu-themeChange').on('click',function(){kk.switchTheme();});

window.addEventListener('load',function(){kk.switchTheme(true);});	//页面加载时，通过缓存加载主题