// 尺规作图页面通用代码
// 作者：Ken Brakke, brakke@susqu.edu, https://facstaff.susqu.edu/brakke

  var chrome_flag = false; // Chrome 不支持 filltext

  // 画布尺寸（像素）
  var height = 600; 
  var width  = 600; 
  var scale = 100;  // 世界坐标到像素的缩放因子
  var xtrans = 3;   // 原点平移量
  var ytrans = 3;
  // 画布世界坐标边界
  var xright = 3.0;
  var xleft = -3.0;
  var ytop = 3.0;
  var ybottom = -3.0;

  var point_radius = 0.025;
  var moving_point = null;
  var moving_pt_count = 0;
  var mouse_down_flag = false;
  var draw_stage = 100;
  
  // 点标签偏移量选项
  //           N      NE      E     SE     S      SW      W     NW
  var offx = [-0.04,  0.05,  0.07,  0.05, -0.05, -0.15, -0.17, -0.13];
  var offy = [-0.06, -0.05,  0.05,  0.15,  0.17,  0.15,  0.05, -0.05];
  var N = 0;
  var NE = 1;
  var E = 2;
  var SE = 3;
  var S = 4;
  var SW = 5;
  var W = 6;
  var NW = 7;
  
  // 两点间距离
  function dist(pt,qt)
  { return Math.sqrt((pt.x-qt.x)*(pt.x-qt.x)+(pt.y-qt.y)*(pt.y-qt.y));
  }
  	
  // 交换两点坐标
  function swap(d,e)
  { var tx = d.x; d.x = e.x; e.x = tx; tx = d.y; d.y = e.y; e.y = tx; }
  
  // 交点计算
  function line_line(a,b,p)
  {
    det = (a.x1-a.x2)*(b.y2-b.y1) - (a.y1-a.y2)*(b.x2-b.x1);
    if ( det == 0 ) { p.x = null; p.y = null; return; }
    lambda = ((b.x2-a.x2)*(b.y2-b.y1) - (b.x2-b.x1)*(b.y2-a.y2))/det;
    p.x = lambda*a.x1 + (1-lambda)*a.x2; 
    p.y = lambda*a.y1 + (1-lambda)*a.y2; 
  }

  function line_circle(a,c,p1,p2)  // a 是直线，c 是圆
  {
    if ( Math.abs(a.y2-a.y1) < Math.abs(a.x2-a.x1) )
    {
      var m = (a.y2-a.y1)/(a.x2-a.x1);
      var b = a.y1 - m*a.x1;
      var bb = (c.x-m*b+c.y*m);
      discr = bb*bb - (1+m*m)*(c.x*c.x + b*b - 2*c.y*b + c.y*c.y - c.r*c.r);
      if ( discr < 0.0 ) { p1.x = null; p1.y = null; p2.x = null; p2.y = null; return; }
      p1.x = (bb + Math.sqrt(discr))/(1+m*m);
      p1.y = m*p1.x + b;
      p2.x = (bb - Math.sqrt(discr))/(1+m*m);
      p2.y = m*p2.x + b;
    }
    else
    {
      var m = (a.x2-a.x1)/(a.y2-a.y1);
      var b = a.x1 - m*a.y1;
      var bb = (c.y-m*b+c.x*m);
      discr = bb*bb - (1+m*m)*(c.y*c.y + b*b - 2*c.x*b + c.x*c.x - c.r*c.r);
      if ( discr < 0.0 ) { p1.x = null; p1.y = null; p2.x = null; p2.y = null; return; }
      p1.y = (bb + Math.sqrt(discr))/(1+m*m);
      p1.x = m*p1.y + b;
      p2.y = (bb - Math.sqrt(discr))/(1+m*m);
      p2.x = m*p2.y + b;
    }
  }

  function circle_circle(a,b,p1,p2)
  {
    var d = Math.sqrt((a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y));
    if ( (d==0) || (d > a.r+b.r) || (d < Math.abs(a.r-b.r)) ) { p1.x = null; p1.y = null; p2.x = null; p2.y = null; return; }
    var aa = (a.r*a.r - b.r*b.r + d*d)/2/d;
    var h = Math.sqrt(a.r*a.r - aa*aa);
    p1.x = a.x + aa/d*(b.x-a.x) + h/d*(b.y-a.y);
    p1.y = a.y + aa/d*(b.y-a.y) - h/d*(b.x-a.x);
    p2.x = a.x + aa/d*(b.x-a.x) - h/d*(b.y-a.y);
    p2.y = a.y + aa/d*(b.y-a.y) + h/d*(b.x-a.x);
      
  }    

  function perp_to_line(a,b,L)  // 过点 a 作垂线；b 是线上另一点；L 是输出直线
  {
    L.x1 = a.x; L.y1 = a.y;
    L.x2 = a.x + (b.y-a.y); L.y2 = a.y - (b.x-a.x);
  }

  function off_perp_to_line(a,LA,LB)  // 过点 a 向直线 LA 作垂线；LB 是输出
  { LB.x1 = a.x; LB.y1 = a.y;
    LB.x2 = a.x+(LA.y2-LA.y1);
    LB.y2 = a.y-(LA.x2-LA.x1);
  }

  function inversion(p,c,q)  // 点 p 关于圆 c 的反演，结果为 q
  { q.x = c.x + (p.x-c.x)*c.r*c.r/dist(p,c)/dist(p,c);
    q.y = c.y + (p.y-c.y)*c.r*c.r/dist(p,c)/dist(p,c);
  }
  
  function draw_point(pt,color,offset)
  {
    ctx.beginPath();
    ctx.strokeStyle=color;
	ctx.fillStyle=color;
    ctx.lineWidth = 0.03;
    ctx.arc(pt.x,pt.y,point_radius,0,2*Math.PI,true);
    ctx.fill();
	ctx.stroke();
	
	ctx.beginPath();
chrome_flag = false;
	if ( chrome_flag )
	{
      ctx.strokeStyle="black";
	  ctx.lineWidth = 0.005;
	  ctx.strokeText(pt.label,pt.x+offx[offset],pt.y+offy[offset]);		
	}
	else 
	{
	  ctx.fillStyle="black";
      ctx.fillText(pt.label,pt.x+offx[offset],pt.y+offy[offset]);
	}

	ctx.stroke();
  }

  function draw_segment(pt,qt, color="black")
  {
    ctx.beginPath();
    ctx.strokeStyle=color;
    ctx.lineWidth = 0.02;
    ctx.moveTo(pt.x,pt.y);
    ctx.lineTo(qt.x,qt.y);
    ctx.stroke();
  }


 function draw_line(pt,qt) // 延伸至画布边界之外；两点版本
 { var y_right;
   var y_left;
   var x_top;
   var x_left;
   var found = false;
   var lambda1;
   var lambda2;
   lambda_high = 1e10;
   lambda_low = -1e10;
   if ( qt.x != pt.x )
   { lambda_right = (xright - pt.x)/(qt.x-pt.x);
     lambda_left = (xleft - pt.x)/(qt.x-pt.x); 
	 if ( lambda_right > lambda_left ) { lambda_high = lambda_right; lambda_low = lambda_left;}
	 else { lambda_high = lambda_left; lambda_low = lambda_right;}
   }
   if ( qt.y != pt.y )
   { lambda_top = (ytop - pt.y)/(qt.y-pt.y);
     x_top = lambda_top*pt.x + (1-lambda_top)*qt.x;
     if ( x_top > xleft && x_top < xright ) { if ( found ) lambda2 = lambda_top; else {lambda1 = lambda_top; found=true; }}
     lambda_bottom = (ybottom - pt.y)/(qt.y-pt.y);
     x_bottom = lambda_bottom*pt.x + (1-lambda_bottom)*qt.x;
     if ( x_bottom > xleft && x_bottom < xright ) { if ( found ) lambda2 = lambda_top; else {lambda1 = lambda_top; found=true; }}
	 
	 if ( lambda_top > lambda_bottom )
	 { if ( lambda_top < lambda_high ) lambda_high = lambda_top;
       if ( lambda_bottom > lambda_low ) lambda_low = lambda_bottom;
	 }
	 else
	 { if ( lambda_bottom < lambda_high ) lambda_high = lambda_bottom;
       if ( lambda_top > lambda_low ) lambda_low = lambda_top;
	 }
		 
   }
   if ( lambda_high < lambda_low ) return;
   
   ctx.beginPath();
   ctx.strokeStyle="black";
   ctx.lineWidth = 0.02;
   ctx.moveTo(pt.x+lambda_high*(qt.x-pt.x),pt.y+lambda_high*(qt.y-pt.y));
   ctx.lineTo(pt.x+lambda_low*(qt.x-pt.x),pt.y+lambda_low*(qt.y-pt.y));
   ctx.stroke();
 }


 function draw_line_L(L) // 延伸至画布边界之外。直线对象版本
 {
   lambda_high = 1e10;
   lambda_low = -1e10;
   if ( L.x2 != L.x1 )
   { lambda_right = (xright - L.x1)/(L.x2-L.x1);
     if ( lambda_right >= 0 && lambda_right < lambda_high ) lambda_high = lambda_right;
     if ( lambda_right <= 0 && lambda_right > lambda_low ) lambda_low = lambda_right;
     lambda_left = (xleft - L.x1)/(L.x2-L.x1);
     if ( lambda_left >= 0 && lambda_left < lambda_high ) lambda_high = lambda_left;
     if ( lambda_left <= 0 && lambda_left > lambda_low ) lambda_low = lambda_left;
   }
   if ( L.y2 != L.y1 )
   { lambda_top = (ytop - L.y1)/(L.y2-L.y1);
     if ( lambda_top >= 0 && lambda_top < lambda_high ) lambda_high = lambda_top;
     if ( lambda_top <= 0 && lambda_top > lambda_low ) lambda_low = lambda_top;
     lambda_bottom = (ybottom - L.y1)/(L.y2-L.y1);
     if ( lambda_bottom >= 0 && lambda_bottom < lambda_high ) lambda_high = lambda_bottom;
     if ( lambda_bottom <= 0 && lambda_bottom > lambda_low ) lambda_low = lambda_bottom;
   }
   ctx.beginPath();
   ctx.strokeStyle="black";
   ctx.lineWidth = 0.02;
   ctx.moveTo(L.x1+lambda_high*(L.x2-L.x1),L.y1+lambda_high*(L.y2-L.y1));
   ctx.lineTo(L.x1+lambda_low*(L.x2-L.x1),L.y1+lambda_low*(L.y2-L.y1));
   ctx.stroke();
 }

  function draw_ray(pt,qt) // 延伸至画布边界之外，pt 是射线起点
  {found = false;
   lambda_high = 1e10;
   lambda_low = -1e10;
   if ( qt.x != pt.x )
   { lambda_right = (xright - pt.x)/(qt.x-pt.x);
     lambda_left = (xleft - pt.x)/(qt.x-pt.x); 
	 if ( lambda_right > lambda_left ) { lambda_high = lambda_right; lambda_low = lambda_left;}
	 else { lambda_high = lambda_left; lambda_low = lambda_right;}
   }
   if ( qt.y != pt.y )
   { lambda_top = (ytop - pt.y)/(qt.y-pt.y);
     x_top = lambda_top*pt.x + (1-lambda_top)*qt.x;
     if ( x_top > xleft && x_top < xright ) { if ( found ) lambda2 = lambda_top; else {lambda1 = lambda_top; found=true; }}
     lambda_bottom = (ybottom - pt.y)/(qt.y-pt.y);
     x_bottom = lambda_bottom*pt.x + (1-lambda_bottom)*qt.x;
     if ( x_bottom > xleft && x_bottom < xright ) { if ( found ) lambda2 = lambda_top; else {lambda1 = lambda_top; found=true; }}
	 
	 if ( lambda_top > lambda_bottom )
	 { if ( lambda_top < lambda_high ) lambda_high = lambda_top;
       if ( lambda_bottom > lambda_low ) lambda_low = lambda_bottom;
	 }
	 else
	 { if ( lambda_bottom < lambda_high ) lambda_high = lambda_bottom;
       if ( lambda_top > lambda_low ) lambda_low = lambda_top;
	 }
		 
   }

   if ( lambda_low < 0.0 ) lambda_low = 0.0;
   if ( lambda_high < lambda_low ) return;

    ctx.beginPath();
    ctx.strokeStyle="black";
    ctx.lineWidth = 0.02;
    ctx.moveTo(pt.x+lambda_high*(qt.x-pt.x),pt.y+lambda_high*(qt.y-pt.y));
    ctx.lineTo(pt.x,pt.y);
    ctx.stroke();
  }

  function draw_arc(pt,radius,start_angle,end_angle)
  {
    ctx.beginPath();
    ctx.strokeStyle="black";
    ctx.lineWidth = 0.02;
    ctx.moveTo(pt.x+radius*Math.cos(start_angle),pt.y+radius*Math.sin(start_angle));
    ctx.arc(pt.x,pt.y,radius,start_angle,end_angle,false);
    ctx.stroke();
  }

  function draw_arc_color(pt,radius,start_angle,end_angle,c)
  {
    ctx.beginPath();
    ctx.strokeStyle=c;
    ctx.lineWidth = 0.02;
    ctx.moveTo(pt.x+radius*Math.cos(start_angle),pt.y+radius*Math.sin(start_angle));
    ctx.arc(pt.x,pt.y,radius,start_angle,end_angle,false);
    ctx.stroke();
  }

  function ddraw(stage) { draw_stage = stage; draw(); }
  
/*****************************************************************************************************/

  function handleMouseDown(event)
  {
    var rect = canvas.getBoundingClientRect();
    if ( event.button == 0 ) // 左键
    {
	  // 转换为世界坐标
      var x = (event.clientX-rect.left)/scale - xtrans;
      var y = (event.clientY-rect.top)/scale - ytrans;

	  // 检查鼠标是否足够靠近某个可移动点
	  moving_point = null;
	  for ( var n = 0 ; n < movable_pts.length ; n++ )
	  { if ( (x-movable_pts[n].x)*(x-movable_pts[n].x) + (y-movable_pts[n].y)*(y-movable_pts[n].y) < 2*point_radius*point_radius )
		  { moving_point = movable_pts[n];
	        mouse_down_flag = true;
	        break;
		  }	  
	  }
     
    }
    else if ( event.button == 2 )  // 右键
    {
    }
  }
/*****************************************************************************************************/

 function handleMouseUp(event)
 {
   mouse_down_flag = false;
 }
/*************************************************************************************************/

  function handleMouseMove(event)   // event.target 是画布
  {

    if (!mouse_down_flag || moving_point==null)
    {
      return;
    }

    var rect = canvas.getBoundingClientRect();
	
	// 转换为世界坐标
    moving_point.x = (event.clientX-rect.left)/scale - xtrans;
    moving_point.y = (event.clientY-rect.top)/scale - ytrans;

 
    draw();
 }
