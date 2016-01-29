var Main = React.createClass({displayName: "Main",
	mixins: [React.addons.LinkedStateMixin],
	getInitialState:function(){
		return {'old':'','newA':'','newB':''}
	},
	render:function(){
		return(
				React.createElement("div", {className: "operate-box"}, 
					React.createElement(M1, {valueLink: this.linkState('old')}), 
					React.createElement(M2, {valueLink: this.linkState('newA')}), 
					React.createElement(M3, {valueLink: this.linkState('newB')}), 
					React.createElement(M4, {data: this.state})
				)
			)
	}
})
//
var M1 = React.createClass({displayName: "M1",
	render:function(){
		return(
				React.createElement("div", {className: "fill-wrap"}, 
					React.createElement("label", null, "原密码："), 
					React.createElement("input", {id: "ipast", type: "password", valueLink: this.props.valueLink}), 
					React.createElement("span", null, "请输入原密码")
				)
			)
	}
})
//
var M2 = React.createClass({displayName: "M2",
	render:function(){
		return(
				React.createElement("div", {className: "fill-wrap"}, 
					React.createElement("label", null, "新密码："), 
					React.createElement("input", {id: "inow", type: "password", valueLink: this.props.valueLink}), 
					React.createElement("span", null, "两次密码输入不一致")
				)
			)
	}
})
//
var M3 = React.createClass({displayName: "M3",
	render:function(){
		return(
				React.createElement("div", {className: "fill-wrap"}, 
					React.createElement("label", {className: "not"}, "确认密码："), 
					React.createElement("input", {id: "resure", type: "password", valueLink: this.props.valueLink}), 
					React.createElement("span", null, "两次密码输入不一致")
				)
			)
	}
})
//
var M4 = React.createClass({displayName: "M4",
	getInitialState:function(){
		return {'onoff':false}
	},
	handleClick:function(){
		//console.log(this.props.data)
		var onoff = true;
		var obj = this.props.data;
		var This = this;
		this.setState({
			'onoff':true
		})
		if(obj.old==''){
			$('#ipast').next().show();
			onoff = false;
		}else{
			$('#ipast').next().hide();
		}
		if(obj.newA==''){
			$('#inow').next().html('新密码不能为空').show();
			onoff = false;
		}else{
			$('#inow').next().hide();
		}
		if(obj.newB==''){
			$('#resure').next().html('新密码不能为空').show();
			onoff = false;
		}else{
			$('#resure').next().hide();
		}
		if(obj.newB!=obj.newA){
			$('#inow').next().html('两次密码输入不一致').show();
			$('#resure').next().html('两次密码输入不一致').show();
			onoff = false;
		}else{
			if(onoff)
			{
				$('#inow').next().hide();
				$('#resure').next().hide();
			}
		}
		if(onoff){//验证成功
			$.ajax({
				url:basic.topAddress+basic.subAddress+'sys_userWs.asmx/UpdatePwd?jsoncallback=?',
				type: 'GET',
				dataType: 'jsonp',
				data: {'id':strdecode(getCookie('uid')),'login_pwdo':obj.old,'login_pwd':obj.newA,'USER':'','TOKEN':strdecode(getCookie('token'))},
			})
			.done(function(data) {
				//console.log(uid);
				//console.log(token);
				if(data.error){
					alert(data.error)
					if(data.error=='权限不足'){
						window.location.href = 'index.html';
						this.setState({
							'onoff':false
						})
					}
					
				}else{
					alert('修改密码成功！')
					window.location.href = 'activeList.html'
				}
			})
			.fail(function() {
				this.setState({
					'onoff':false
				})
				return false;
			})
		}else{
			this.setState({
			'onoff':false
			})
		}
	},
	render:function(){
		return(
				React.createElement("div", {className: "btn-wrap"}, 
					React.createElement("button", {id: "submit-btn", onClick: this.handleClick, disabled: this.state.onoff}, "重置")
				)
			)
	}
})
//

React.render(
	React.createElement(Main, null),
	document.getElementById('operate-group')
)