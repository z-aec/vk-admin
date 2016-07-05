// ==UserScript==
// @name VK Admin
// @grant none
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @include https://new.vk.com/*
// ==/UserScript==
// 


jQuery(function($){
  function bindAll(){
    $("#page_body").unbind("DOMSubtreeModified");
    $('.post').each(function(){
      var id = $(this).attr("data-post-id").split('_')[0].split('-')[1];
      var author = $(this).find('.author').attr('data-from-id');
      var del_link = $(this).find('.ui_actions_menu_item[onclick*="deletePost"]');
      var ban_link = $(this).find('.___ban_link');
      if(!ban_link.html() && del_link && author && author > 0){
        del_link.after('<a class="ui_actions_menu_item ___ban_link" onclick="showBox(\'groupsedit.php\', {act: \'bl_edit\', name: \'id'+author+'\', gid: '+id+', auto: 0}, {stat: [\'page.css\', \'ui_controls.js\', \'ui_controls.css\'], dark: 1});">Заблокировать</a>');
      }
    });
    
    $('.reply').each(function(){
      var id = $(this).attr("data-post-id").split('_')[0].split('-')[1];
      var author = $(this).find('.author').attr('data-from-id');
      var del_link = $(this).find('.reply_delete_button');
      var ban_link = $(this).find('.___ban_link');
      if(!ban_link.attr('data-title') && del_link && author && author > 0){
        del_link.after('<div class="reply_action fl_r ___ban_link" style="background: url(/images/icons/edit_newsfeed.png) no-repeat 0px -15px;" data-title="Заблокировать" onmouseover="showTitle(this);" onclick="showBox(\'groupsedit.php\', {act: \'bl_edit\', name: \'id'+author+'\', gid: '+id+', auto: 0}, {stat: [\'page.css\', \'ui_controls.js\', \'ui_controls.css\'], dark: 1});"></div>');
      }
    });
    
    $("#page_body").bind("DOMSubtreeModified",function(){bindAll()});
  }
  
  if($('#page_actions').attr('id')){ 
    var fst = $('#page_actions').find('.page_actions_cont').find('.page_actions_item:first');
    var group = fst.attr('href').split('?')[0];
    if(group){
      fst.after('<a id="" class="page_actions_item" href="' + group + '?act=blacklist">Чёрный список</a>');
    } 
  }
  bindAll();
});
