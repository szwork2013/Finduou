var Top = React.createClass({
	render:function(){
		return(
				<div>
					<Nav/>
					<Left/>
				</div>
			)
	}
});
//
var Nav = React.createClass({
	getInitialState:function(){
		return {
			'onoff':false
		}
	},
	handleClick:function(){
		this.setState({
			'onoff':!this.state.onoff
		})
	},
	render:function(){
		return(
				<nav id="header-right" className="fr">
					<a href="activeList.html"><span></span></a>
					<a href="myData.html"><span></span></a>
					<a href="#" onClick={this.handleClick}><span></span></a>
					<List onoff={this.state.onoff}/>
				</nav>
			)
	}
});
//
var Left = React.createClass({
	render:function(){
		return(
				<div id="header-left" class="fl">
					<img src="img/list/logo.png"/>
					<strong>活动管理</strong>
				</div>
			)
	}
});
//
var List = React.createClass({
	handleClick:function(){
		removeCookie('email');
		removeCookie('id')
		removeCookie('pwd')
		removeCookie('token')
		window.location.href = 'index.html'
	},
	render:function(){
		return (
				<ul id="nav-list" style={{display:this.props.onoff?'block':'none'}}>
					<a href="mPassword.html" className="not-float"><li>修改密码</li></a>
					<a href="javaScript:;" className="not-float" onClick={this.handleClick}><li>登出</li></a>
				</ul>
			)
	}
});
//
React.render(
	<Top />,
	document.getElementById('header-box')
)