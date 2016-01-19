var plan = {};
var public = {};
public.timer = null;
var data = {};
var result = [];
public.flag = true;
var num = 0;
$(function(){
	$('#operate-btn').on('click', function(event) {

		//$(this).attr('disabled',true).css('background','#999').html('')
		if(public.flag){
			$(this).html('停止');
			plan.start(num);
		}else{
			plan.stop();
			$(this).html('抽奖');
		}
		public.flag = !public.flag;

		event.preventDefault();

	});
})
plan.init = function(){
	
}
plan.start = function(){
	clearInterval(public.timer);
	public.timer = setInterval(function(){
		if(num>100){
			num==0
		}else{
			num++;
		}
		$('#name').html(num);
		
	},28)
}
plan.stop = function(){
	clearInterval(public.timer);
	var oDd = $('<dd></dd>').html('<p>'+num+'</p>')
	oDd.appendTo($('#sub-dl'))
	num = 0;
}