var Main = React.createClass({
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
			<div id='container'>
				<M1 name = {this.state.name}/>
				<M2 sex = {this.state.sex}/>
				<M3 email = {this.state.email}/>
				<M4 school = {this.state.school}/>
				<M5 valueLink={this.linkState('contact')}/>
				<M6 userData={this.state}/>
			</div>
			
		)
	}
})
//
var M1 = React.createClass({
	render:function(){
		return (
			<div className="m1">
					<span>姓名</span>
					<span id="name">{this.props.name}</span>
			</div>
		)
	}
})
//
var M2 = React.createClass({
	render:function(){
		return (
			<div className="m1">
					<span>性别</span>
					<span id="sex">{this.props.sex}</span>
			</div>
		)
	}
})
//
var M3 = React.createClass({
	render:function(){
		return (
			<div className="m1">
					<span>邮箱</span>
					<span id="email">{this.props.email}</span>
			</div>
		)
	}
})

var M4 = React.createClass({
	render:function(){
		return (
			<div className="m1">
					<span>学校</span>
					<span id="school">{this.props.school}</span>
			</div>
		)
	}
})

var M5 = React.createClass({
	render:function(){
		return (
			<div className="m2">
					<span>联系方式</span>
					<input type="text" valueLink={this.props.valueLink} id="contact"/>
			</div>
		)
	}
})
//
var M6 = React.createClass({
	getInitialState:function(){
		return {'onoff':false}
	},
	handleClick:function(){
		var telReg = /^\d{10,20}$/;
		console.log(this.props.userData);
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
			<div className="m3">
					<button id="submit" onClick={this.handleClick} disabled={this.state.onoff}>提交</button>
			</div>
		)
	}
})

React.render(
  	<Main />,
	document.getElementById('main')
);