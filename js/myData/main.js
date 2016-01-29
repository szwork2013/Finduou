var Main = React.createClass({displayName: "Main",
	mixins: [React.addons.LinkedStateMixin],
	getInitialState:function(){
		return {'name':'','sex':'','email':'','school':'','contact':''}
	},
	componentDidMount:function(){
		var This = this;
			$.ajax({
			url:basic.topAddress+basic.subAddress+'sys_user_adminWs.asmx/GetOne?jsoncallback=?',
			type:'GET',
			dataType: 'jsonp',
			data:{'id':strdecode(getCookie('id')),'login_name':'','USER':'','TOKEN':strdecode(getCookie('TOKEN'))},
			//data:{'id':'','login_name':'','USER':'','TOKEN':''},
		})
		.done(function(data) {
			if(data.error)
			{
				window.location.href = 'index.html'
			}
			This.setState({
				'name':strdecode(data.Head[0].name),
				'sex':strdecode(data.Head[0].sex),
				'email':strdecode(data.Head[0].email),
				'school':strdecode(data.Head[0].university_name),
				'contact':strdecode(data.Head[0].mobile)
			})
		})
		.fail(function() {
			console.log("error");
		})
	},
	render:function(){
		return (
			React.createElement("div", {id: "container"}, 
				React.createElement(M1, {name: this.state.name}), 
				React.createElement(M2, {sex: this.state.sex}), 
				React.createElement(M3, {email: this.state.email}), 
				React.createElement(M4, {school: this.state.school}), 
				React.createElement(M5, {valueLink: this.linkState('contact')}), 
				React.createElement(M6, {userData: this.state})
			)
			
		)
	}
})
//
var M1 = React.createClass({displayName: "M1",
	render:function(){
		return (
			React.createElement("div", {className: "m1"}, 
					React.createElement("span", null, "姓名"), 
					React.createElement("span", {id: "name"}, this.props.name)
			)
		)
	}
})
//
var M2 = React.createClass({displayName: "M2",
	render:function(){
		return (
			React.createElement("div", {className: "m1"}, 
					React.createElement("span", null, "性别"), 
					React.createElement("span", {id: "sex"}, this.props.sex)
			)
		)
	}
})
//
var M3 = React.createClass({displayName: "M3",
	render:function(){
		return (
			React.createElement("div", {className: "m1"}, 
					React.createElement("span", null, "邮箱"), 
					React.createElement("span", {id: "email"}, this.props.email)
			)
		)
	}
})

var M4 = React.createClass({displayName: "M4",
	render:function(){
		return (
			React.createElement("div", {className: "m1"}, 
					React.createElement("span", null, "学校"), 
					React.createElement("span", {id: "school"}, this.props.school)
			)
		)
	}
})

var M5 = React.createClass({displayName: "M5",
	render:function(){
		return (
			React.createElement("div", {className: "m2"}, 
					React.createElement("span", null, "联系方式"), 
					React.createElement("input", {type: "text", valueLink: this.props.valueLink, id: "contact"})
			)
		)
	}
})
//
var M6 = React.createClass({displayName: "M6",
	getInitialState:function(){
		return {'onoff':false}
	},
	handleClick:function(){
		var telReg = /^\d{10,20}$/;
		this.setState({
			'onoff':true
		});
		var obj = this.props.userData;
		if(telReg.test(this.props.userData.contact))
		{
			$.ajax({
			url:basic.topAddress+basic.subAddress+'sys_user_adminWs.asmx/Update?jsoncallback=?',
			type:'GET',
			dataType: 'jsonp',
			data:{'id':strdecode(getCookie('id')),'org_name':'','login_name':'','email':obj.email,'name':obj.name,'sex':obj.sex,'university_id':'','mobile':obj.contact,'USER':'','TOKEN':strdecode(getCookie('TOKEN'))},
			//data:{'id':strdecode(getCookie('id')),'org_name':'','login_name':'','email':'admin@finduou.com','name':'黄贤闯','sex':'男','university_id':'1','mobile':obj.contact,'USER':'','TOKEN':strdecode(getCookie('TOKEN'))},

			})
			.done(function(data) {
				if(data.error){
					alert(data.error)
				}else{
					alert('修改成功!')
					window.location.href = 'activeList.html'
				}
				
			})
			.fail(function() {
				console.log("error");
			})
		}
		else
		{
			alert('请输入正确的手机号码!');
			this.setState({
			'onoff':false
			});
		}

	},
	render:function(){
		return (
			React.createElement("div", {className: "m3"}, 
					React.createElement("button", {id: "submit", onClick: this.handleClick, disabled: this.state.onoff}, "提交")
			)
		)
	}
})

React.render(
  	React.createElement(Main, null),
	document.getElementById('main')
);