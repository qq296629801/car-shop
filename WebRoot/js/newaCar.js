/* @update: 2016-12-16 10:16:16 */ 
!function(){function n(n){$(".car-lun .img-lun").eq(n).fadeIn(500).siblings().fadeOut(500),$(".click-dian li").eq(n).addClass("li-add").siblings().removeClass("li-add")}function i(){clearInterval(l),l=setInterval(function(){c+=1,c>=$(".car-lun .img-lun").length&&(c=0),n(c)},3e3)}var l,c=0,a=$(".car-lun"),e=$(".car-new-banner .click-dian"),r=(a.children().length,"");a.children().each(function(n){var i="";0==n&&(i="li-add"),r+='<li class="'+i+'"></li>'}),e.empty().html(r),i(),$(".car-new-banner").hover(function(){clearInterval(l)},function(){i()}),$(".click-dian").hover(function(){clearInterval(l)},function(){i()}),$(".click-dian li").on("click",function(){c=$(this).index(),n(c)})}();