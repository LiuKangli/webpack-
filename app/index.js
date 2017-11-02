
//引用第三方插件
import $ from 'jquery';
import sub  from './sub';

import '../css/index.css';
// import '../css/cs/test.css';


let app = document.createElement('div');
app.innerHTML = '<h1>Hello App!!</h1>';
app.appendChild(sub());
document.body.appendChild(app);

$('body').append('<p>jquery 插件111</p>');
