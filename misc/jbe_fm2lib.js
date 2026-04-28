var FM2_RKEY='';
var FM2_TABLE=[]; var FM2_TABLE2=[];
var FM2_TABLE_NAME=''; var FM2_TABLE_NAME2='';
var FM2_FIELDS=[]; var FM2_FIELDS2=[];

var FM2_FM_MODE=1;
var FM2_FM_STATUS=0;
var FM2_BTN_LEVEL=1;
var FM2_AXIOS_SQL='';
var FM2_AXIOS_PARA1=[];
var FM2_AXIOS_PARA2=[];

var FM2_ADD_FLAG=false;
var FM2_ADD_FLAG2=false;

var FM2_FUNC=[];
var FM2_CB='';

function FM2_MAIN(fm_ob,fm_layout){    
  var h=parseInt(fm_ob.height);  
  var h_head=H_HEADER;
  var h_foot=H_FOOTER-25;
  var h_body=H_BODY-(h_head+h_foot)+25;

  var dtl=
    
    '<div id="DIV_FM2_MAIN" style="width:100%;height:100%;font-size:12px;border:0px solid green;background:white;">'+ 
    
      '<div id="FM2_HEAD" data-recno="" style="display:none;z-index:10;font-size:16px;width:100%;height:25px;padding:0px;color:white;background:'+JBE_CLOR+';">'+
        //'<div style="width:100%;height:100%;padding:5px;background:'+JBE_CLOR2+';">'+fm_ob.title+'888</div>'+
        //'<span style="float:right;">FM Library version 1.1</span>'+
      '</div>'+    
      '<div id="FM2_MODE" style="width:100%;height:25px;text-align:center;padding:5px 15px 5px 5px;text-align:right;color:white;background:'+JBE_CLOR2+';"></div>'+
      '<div id="FM2_BODY" style="width:100%;height:'+h_body+'px;background:white;"></div>'+
      '<div id="FM2_FOOT" style="width:100%;height:'+h_foot+'px;padding:2px;background:'+JBE_CLOR+';"></div>'+

    '</div>';
  
  JBE_OPEN_VIEW(dtl,'','closeFM2_MAIN');  
  var m=parseInt(document.getElementById("myView1").getAttribute('data-JBEpage'));
  document.getElementById('back_view'+m).style.display='none';  
  document.getElementById('cap_viewMid'+m).innerHTML=fm_ob.title;
  document.getElementById('cap_viewMid'+m).style.color='white';
  document.getElementById('cap_viewMid'+m).style.fontWeight='bold';

  document.getElementById('FM2_BODY').innerHTML=
  '<div style="width:100%;height:100%;margin-top:0px;text-align:left;padding:5px;background:white;">'+
    fm_layout+
    '<div id="div_FM2_dtl" class="cls_fm_dtl" style="display:'+iif(FM2_FM_MODE==2,'block','none')+';height:100%;margin:0;padding:0px;margin-top:5px;border:1px solid lightgray;">'+
      '<div id="div_FM2_dtl_div1" style="width:100%;height:30px;border:0px solid lightgray;"></div>'+
      '<div id="div_FM2_dtl_div2" data-row=0 style="width:100%;height:35px;overflow:auto;border:0px solid red;"></div>'+
    '</div>'+
  '</div>';
  var fm_layout_height=H_BODY-parseInt(document.getElementById('div_FM_head').style.height);
  document.getElementById('div_FM2_dtl').style.height=(fm_layout_height-70)+'px';
  document.getElementById('div_FM2_dtl_div2').style.height=(parseInt(document.getElementById('div_FM2_dtl').style.height)-30)+'px';
  
  //dispMenu(false,fm_menu);  
  FM2_fm_menu();
  FM2_INIT_REC();
}

function xxcloseFM2_MAIN(){
  var fn = window[FM2_FUNC.quit];
  if (typeof fn === "function"){ 
    if(fn()==0){
      showMainPage();
    } 
  }
}

function closeFM2_MAIN(){
  if(!FM2_CB){ showMainPage(); return; }

  var cb = window[FM2_CB];
  if (typeof cb === "function"){ 
    cb();
  }
}


function FM2_MAIN_BOX(mode){
  console.log(
    'FM2_MAIN_BOX(mode):'+mode+
    '\nFM2_BTN_LEVEL:'+FM2_BTN_LEVEL
  );
  //mode=3;
  FM2_FM_STATUS=mode;
  var len_dtls=document.querySelectorAll('.dtls').length;   
  console.log('mode:'+mode+' vs len_dtls:'+len_dtls);
  var aryMode=[];
  aryMode[0]={  //init
    'mode':0, 'title':'* Ready Mode *',
    'add':'block','save':'none','edit':'none','del':'none','cancel':'none','close':'block'
  }
  aryMode[1]={  //disp
    'mode':1, 'title':'* Display Mode *',
    'add':'none','save':'none','edit':'block','del':'block','cancel':'block','close':'none'
  }
  aryMode[2]={  //add
    'mode':2, 'title':'* Add Mode *',
    'add':iif(FM2_ADD_FLAG,'block','none'),'save':'block','edit':'none','del':'none','cancel':'block','close':'none'
  }
  aryMode[3]={  //edit
    'mode':3, 'title':'* Edit Mode *',
    'add':'block','save':'block','edit':iif(len_dtls,'block','block'),'del':iif(len_dtls,'block','block'),'cancel':'block','close':'none'
  }

  document.getElementById('FM2_BTNS').setAttribute('data-mode',aryMode[mode]['mode']);
  document.getElementById('FM2_MODE').innerHTML=aryMode[mode]['title'];
  
  document.querySelectorAll('.fm_class_box').forEach(function(el) {
    //el.style.pointerEvents='none';
    el.style.display='none';    
    //el.style.opacity=0.5;
  });
  document.getElementById('FM2_ADD_BTN').style.display=aryMode[mode]['add'];  
  document.getElementById('FM2_EDIT_BTN').style.display=aryMode[mode]['edit'];
  document.getElementById('FM2_DEL_BTN').style.display=aryMode[mode]['del'];
  document.getElementById('FM2_SAVE_BTN').style.display=aryMode[mode]['save'];
  document.getElementById('FM2_CANCEL_BTN').style.display=aryMode[mode]['cancel'];
  document.getElementById('FM2_CLOSE_BTN').style.display=aryMode[mode]['close'];  

  document.getElementById('img_FM2_CANCEL_EXIT').src='gfx/jcancel.png';
  document.getElementById('txt_FM2_CANCEL_EXIT').innerHTML='Cancel';

  if(mode==1){
    document.getElementById('img_FM2_CANCEL_EXIT').src='gfx/jcancel.png';
    document.getElementById('txt_FM2_CANCEL_EXIT').innerHTML='Exit';
  }
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById("FM2_HEAD")) {
    // if present, the header is where you move the DIV from:
    document.getElementById("FM2_HEAD").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function FM2_fm_menu(){
  var fm_menu=
    '<div id="FM2_BTNS" data-mode=0 style="width:100%;height:100%;">'+

      '<div id="FM2_ADD_BTN" class="fm_class_box" onclick="FM2_ADD_REC()" style="margin-left:0%;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jadd.png" alt="call image" />'+
          '<span>Add</span>'+
        '</div>'+
      '</div>'+             
      '<div id="FM2_EDIT_BTN" data-click=0 class="fm_class_box" onclick="FM2_EDIT_REC()">'+
        '<div class="class_footer">'+
          '<img src="gfx/jedit.png"  alt="home image" />'+
          '<span>Edit</span>'+
        '</div>'+
      '</div>'+    
      '<div id="FM2_DEL_BTN" class="fm_class_box" onclick="FM2_DEL_REC()">'+
        '<div class="class_footer">'+
          '<img src="gfx/jdele.png"  alt="home image" />'+
          '<span>Del</span>'+
        '</div>'+
      '</div>'+    
      
      '<div id="FM2_CANCEL_BTN" class="fm_class_box" onclick="FM2_CANCEL()" style="display:none;float:right;">'+
        '<div class="class_footer">'+
          '<img id="img_FM2_CANCEL_EXIT" src="gfx/jcancel.png"  alt="home image" />'+
          '<span id="txt_FM2_CANCEL_EXIT">Cancel</span>'+
        '</div>'+
      '</div>'+  
      '<div id="FM2_CLOSE_BTN" class="fm_class_box" onclick="JBE_CLOSE_VIEW()" style="float:right;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jclose.png"  alt="home image" />'+
          '<span>Quit</span>'+
        '</div>'+
      '</div>'+   
      '<div id="FM2_SAVE_BTN" class="fm_class_box" onclick="FM2_SAVE_REC()" style="display:none;margin-left:0%;float:right;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jsave.png" alt="call image" />'+
          '<span>Save</span>'+
        '</div>'+
      '</div>'+ 

    '</div>';
  dispMenu(false,fm_menu);
}

function FM2_hl_row(v){
  //alert('FM2_hl_row:'+v);
  if(v==0){ return; }
  
  //if(document.getElementById('cap_viewMid1').innerHTML == 'Display'){ return; }
  if(FM2_FM_STATUS!=3){ return; }
  var curRow=document.getElementById('div_FM2_dtl_div2').getAttribute('data-row');  
    
  if(curRow > 0){ 
    document.getElementById('dtl_'+curRow).style.color='black'; 
    document.getElementById('dtl_'+curRow).style.background='none'; 
  }
  document.getElementById('dtl_'+v).style.color='white';
  document.getElementById('dtl_'+v).style.background='black';
  document.getElementById('div_FM2_dtl_div2').setAttribute('data-row',v);  
}

//======================================
function FM2_LOOKUP(mode,div_Search,DB,tilt,func,code,hdgs,flds) {  
  if(!mode){
    //document.getElementById('lookup').style.display='none';    
    JBE_CLOSEBOX();
    return;
  }    

  //alert('flds len:'+flds.length);
  //console.log('tulok:'+flds[0].fld);
  //return;
  
  var box2=0; 
  var box1=H_VIEW-(60+box2);
  
  var dtl=          
    '<div id="div_name" data-zoom=0 style="width:100%;height:'+box1+'px;font-text:14px;padding:0px;background-color:white;">'+         
      '<div style="width:100%;height:40px;padding:2px;text-align:center;color:'+JBE_TXCLOR1+';background:'+JBE_CLOR+';">'+
         '<input id="filterInput" type="text" style="float:left;width:100%;height:100%;text-align:center;" value="" placeholder="Search here..."/>'+      
      '</div>'+    
      '<div style="margin-top:5px;width:100%;height:30px;padding:5px;text-align:center;color:'+JBE_TXCLOR1+';background:'+JBE_CLOR+';">';
        //var colWidth=100/hdgs.length;
        for(var i=0;i<hdgs.length;i++){
          dtl+='<div style="float:left;width:'+hdgs[i].width+';height:100%;text-align:'+hdgs[i].align+';padding:0px;border:0px solid black;">'+hdgs[i].title+'</div>';
        }
        dtl+=
      '</div>'+          
      '<div style="width:100%;height:'+(box1-87+5)+'px;padding:0px;border:0px solid red;overflow:auto;">';
        var ddd='';
        for(var i=0;i<DB.length;i++){   
          ddd+=
          '<div id="d_'+i+'" class="cls_names" onclick="'+func+'(&quot;'+flds[0].fld+'&quot;,&quot;'+DB[i][code]+'&quot;);JBE_CLOSEBOX();" style="cursor:pointer;font-size:12px;width:100%;height:25px;padding:5px;border:1px solid gray;">';
            
            let z_dtl='';
            for(var z=0;z<flds.length;z++){
              //console.log('tulok:'+flds[z].fld);
              let fld=flds[z].fld;
              let fld_type=flds[z].type;
              let fld_val=DB[i][fld];
              
              //console.log('>>>  fld_val:'+fld_val+'   fld_type:'+fld_type);
              if(fld_type=='date'){ fld_val=JBE_DATE_FORMAT(fld_val,'MM-DD-YYYY'); }
              //console.log('fm2_lookup : '+z+': '+DB[i][flds[z]]+' isDate:'+Date.parse(DB[i][flds[z]]));
              if(z==1){
                z_dtl+='<div id="dd_'+i+'" style="float:left;width:'+hdgs[z].width+';padding:0 0 0 '+z+'%;text-align:'+hdgs[z].align+';background:none;">'+fld_val+'</div>';
              }else{
                z_dtl+='<div style="float:left;width:'+hdgs[z].width+';padding:0 0 0 '+z+'%;text-align:'+hdgs[z].align+';background:none;">'+fld_val+'</div>';
              }
              
            }
                          
            ddd+=z_dtl+
          '</div>';          
        }
        dtl+=ddd+
      '</div>'+    
    '</div>';
     
  
  var dtl2=
    '<div style="width:100%;height:100%;padding:12px 0 0 0;text-align:center;background:none;">'+
      'Look Up Module ver. 2.0'+
    '</div>';

  JBE_OPENBOX('div_name',tilt,dtl,dtl2); 
  //alert('div_Search '+div_Search);
  JBE_SEARCH_BOX('filterInput','cls_names',div_Search);
}

function FM2_CHK_REC(recno){  
  //alert('FM2_CHK_REC '+recno);
  var rval=false;
  //alert('FM2_CHK_REC '+FM2_TABLE.length);
  var fld=FM2_FIELDS[0]['fld'];
  for(var i=0;i<FM2_TABLE.length;i++){
    if(FM2_TABLE[i][fld]==recno){
      rval=true;
      break;
    }
  }
  if(rval){    
    //alert(recno);
    FM2_DISP_REC(recno);          
    FM2_ADD_FLAG=false;
  }else{
    FM2_ADD_FLAG=true;
  }
}



//
function FM2_ADD_REC(){
  //alert('YAWA! FM2_ADD_REC:  FM2_BTN_LEVEL:'+FM2_BTN_LEVEL);
  FM2_ADD_FLAG=true;
  
  
  //if(FM2_FIELDS2.length>0){ FM2_BTN_LEVEL=1; }
  
  if(FM2_BTN_LEVEL==1){
    var fn = window[FM2_FUNC.add];
    if (typeof fn === "function"){ if(fn(1)==false){ return; }}  
    FM2_MAIN_BOX(2);
    FM2_ADD_FLAG2=false;
    for(var i=0;i<FM2_FIELDS.length;i++){
      var div=FM2_FIELDS[i]['div'];    
      var disp=FM2_FIELDS[i]['disp'];    
      
      document.getElementById(div).value='';
      if(disp==1){     
        document.getElementById(div).disabled=false;
      }
    }
    if (typeof fn === "function") fn(2);     
    if(FM2_FM_MODE==2){ FM2_BTN_LEVEL=2; }    
  }else if(FM2_BTN_LEVEL==2){
    FM2_ADD_FLAG2=true;
    //alert('2nd add btn, FM2_ADD_FLAG2:'+FM2_ADD_FLAG2);
    FM2_ADD_ITEM(true); 
  }   
}
//
function FM2_EDIT_REC(){
  //var edit_mode=document.getElementById('FM2_EDIT_BTN').getAttribute('data-click');
  var edit_mode=FM2_BTN_LEVEL;
  console.log('edit click:'+edit_mode);
  var fn = window[FM2_FUNC.edit];
  if (typeof fn === "function"){ if(fn(1)==false){ return; }}  

  if(FM2_BTN_LEVEL==1){
    FM2_MAIN_BOX(3);
    for(var i=1;i<FM2_FIELDS.length;i++){
      var div=FM2_FIELDS[i]['div'];   
      var disp=FM2_FIELDS[i]['disp'];    
      if(disp == 1){ 
        document.getElementById(div).disabled=false;
      }else{
        document.getElementById(div).disabled=true;
      }
    }
    if(FM2_FM_MODE==2){
      var len_dtls=document.querySelectorAll('.dtls').length;  
      if(len_dtls){ FM2_hl_row(1); }
    }
    //document.getElementById('FM2_EDIT_BTN').getAttribute('data-click',1);
    FM2_BTN_LEVEL=2;
  }else{
    //alert('edit dtls');
    FM2_ADD_FLAG2=false;
    FM2_ADD_ITEM(false);
  }

  if (typeof fn === "function") fn(2); 
}
function FM2_SAVE_REC(){  
  FM2_SAVE_REC2(); return;

  //check for duplication
  //if(JBE_SEEK_ARRAY(FM2_TABLE,'usercode',usercode));  
  var fn = window[FM2_FUNC.save];
  if (typeof fn === "function"){ if(fn(1,'')==false){ return; }}  

  var req=parseInt(document.getElementById('FM2_BTNS').getAttribute('data-mode'));
  var recno=document.getElementById('FM2_HEAD').getAttribute('data-recno');
  //alert('FM2_SAVE_REC '+recno)
  var recno_fld='', recno_val='', recno_div='';
  
  FM2_AXIOS_PARA1=[];
  FM2_AXIOS_SQL='';
  var fldnames=[]; var fldvals=[]; var ctr_fld=0;
  
  for(var i=0;i<FM2_FIELDS.length;i++){    
    if(!FM2_FIELDS[i]['save']){ continue; }

    var div=FM2_FIELDS[i]['div'];
    var fld=FM2_FIELDS[i]['fld'];
    var disp=parseInt(FM2_FIELDS[i]['disp']);
    var val=document.getElementById(div).value;
        
    //alert('fld:'+fld+'  FM2_RKEY:'+FM2_RKEY);
    if(disp < 0){
      recno_fld=fld;
      recno_val=val;
      recno_div=div;
      //alert('equal:'+fld);
    }else{
      if(fld && fld==FM2_RKEY){  
        recno_fld=fld;
        recno_val=val;
        recno_div=div;
      }
      fldnames[ctr_fld]=fld;
      fldvals[ctr_fld]=val;
      ctr_fld++;
    }
        
    if(!val && disp > -1){
      snackBar('ERROR: Empty Field: (<font color=red>'+document.getElementById(div).getAttribute('data-caption')+'</font>)');
      document.getElementById(div).focus();
      return;
    }
  }
    
  var vsql='';
  var vcommas='';
  if(FM2_ADD_FLAG){    
    //alert('ctr_fld '+ctr_fld);
    for(var i=0;i<ctr_fld;i++){
      vsql+=fldnames[i]+',';
      vcommas=vcommas+'?,';
      //alert('vcommas '+i+' : '+vcommas);
    }
    vsql=vsql.substring(0,vsql.length-1);
    vcommas=vcommas.substring(0,vcommas.length-1);
    //alert('vcommas '+vcommas);
    //var jeSQL="INSERT INTO receive2 (rrno,date,suppno,stockno,descrp,type,lotno,loc,date_aq,expiry,cost,qty,amount) VALUES (?,?,?,?,?, ?,?,?,?,? ,?,?,?)";  
    FM2_AXIOS_SQL='INSERT INTO '+FM2_TABLE_NAME+' ('+vsql+') VALUES ('+vcommas+')';
    FM2_AXIOS_PARA1=fldvals;
  }else{
    fldvals[ctr_fld]=recno_val;
    //FM2_AXIOS_SQL="UPDATE stock SET descrp=?,running=? WHERE stockno=?";  
    for(var i=0;i<ctr_fld;i++){
      vsql+=fldnames[i]+'=?,';
    }    
    vsql=vsql.substring(0,vsql.length-1);
    //alert(vsql);
    FM2_AXIOS_SQL='UPDATE '+FM2_TABLE_NAME+' SET '+vsql+' WHERE '+recno_fld+'=?';
    FM2_AXIOS_PARA1=fldvals;
  }


  
  /*
  alert('FM2_AXIOS_SQL '+FM2_AXIOS_SQL);
  alert('FM2_AXIOS_PARA1 '+FM2_AXIOS_PARA1);
  alert('FM2_ADD_FLAG '+FM2_ADD_FLAG);
  return;
  */
  

  showProgress(true);   
  //await axios.post('/api/save_ptr2', {headers: { 'Content-Type': 'application/json' }}, { params: { 
  axios.post('/api/fmlib_save', {headers: { 'Content-Type': 'application/json' }}, { params: { sql:FM2_AXIOS_SQL,fld:FM2_AXIOS_PARA1,tbl:FM2_TABLE_NAME } })    
  .then(function (response) {    
    showProgress(false); 
    //alert('bbb php: '+response.data);
    FM2_TABLE=response.data;
    //console.log('bbb php: '+response.data.length);
    
    if(FM2_ADD_FLAG){
      recno=FM2_TABLE[(FM2_TABLE.length-1)][recno_fld];
      document.getElementById(recno_div).value=recno;
    }

    if(FM2_FM_MODE==2){ FM2_SAVE_REC2(); }

    JBE_FM2_SAVE=true;
    if (typeof fn === "function") fn(2,response.data);   
    
    FM2_DISP_REC(recno);
  })    
  .catch(function (error) { console.log(error); showProgress(false); });
}
//
function FM2_SAVE_REC2(){
  FM2_AXIOS_PARA1=[];
  FM2_AXIOS_SQL='';
  

  let len_dtls=document.querySelectorAll('.dtls').length;
  alert('len_dtls:'+len_dtls);

  for(var k=1;k<=len_dtls;k++){
    var fldnames=[]; var fldvals=[]; var ctr_fld=0;
    for(var i=0;i<FM2_FIELDS2.length;i++){    
      if(!FM2_FIELDS2[i]['save']){ continue; }

      var div=FM2_FIELDS2[i]['div']+'_'+(k);
      var fld=FM2_FIELDS2[i]['fld'];
      
      var val=document.getElementById(div).innerHTML;
      alert(div+' value:'+val);
      fldnames[ctr_fld]=fld;
      fldvals[ctr_fld]=val;
      ctr_fld++;      
    }
    var vsql='';
    var vcommas='';
    
    //alert('ctr_fld '+ctr_fld);
    for(var i=0;i<ctr_fld;i++){
      vsql+=fldnames[i]+',';
      vcommas=vcommas+'?,';
      //alert('vcommas '+i+' : '+vcommas);
    }
    vsql=vsql.substring(0,vsql.length-1);
    vcommas=vcommas.substring(0,vcommas.length-1);
    //alert('vcommas '+vcommas);
    //var jeSQL="INSERT INTO receive2 (rrno,date,suppno,stockno,descrp,type,lotno,loc,date_aq,expiry,cost,qty,amount) VALUES (?,?,?,?,?, ?,?,?,?,? ,?,?,?)";  
    FM2_AXIOS_SQL='INSERT INTO '+FM2_TABLE_NAME2+' ('+vsql+') VALUES ('+vcommas+')';
    FM2_AXIOS_PARA1=fldvals;
    
    
    alert('FM2_AXIOS_SQL '+FM2_AXIOS_SQL);
    alert('FM2_AXIOS_PARA1 '+FM2_AXIOS_PARA1);
    alert('FM2_ADD_FLAG '+FM2_ADD_FLAG);
    /*
    axios.post('/api/fmlib_save', {headers: { 'Content-Type': 'application/json' }}, { params: { sql:FM2_AXIOS_SQL,fld:FM2_AXIOS_PARA1,tbl:FM2_TABLE_NAME } })    
    .then(function (response) {    
      showProgress(false); 
      FM2_TABLE2=response.data;      
    })    
    .catch(function (error) { console.log(error); showProgress(false); });
    */
  }  
}



//
function FM2_DEL_REC(){  
  var fn = window[FM2_FUNC.del];
  if (typeof fn === "function"){ if(fn(1,'')==false){ return; }}  

  var recno=document.getElementById(FM2_FIELDS[0]['div']).value;
  var div=FM2_FIELDS[0]['div'];
  var fld=FM2_FIELDS[0]['fld'];
  var val=document.getElementById(div).value;

  //alert(div+' vs fld:'+fld+' vs val:'+val);
  
  MSG_SHOW(vbYesNo,'CONFIRM: ','Delete this Record? ['+recno+']',function(){  
    //var jeSQL="DELETE from stock WHERE stockno=?";
    FM2_AXIOS_SQL='DELETE from '+FM2_TABLE_NAME+' WHERE '+fld+'=?';
    FM2_AXIOS_PARA1=val;
    //alert('FM2_AXIOS_SQL '+FM2_AXIOS_SQL);
    //alert('FM2_AXIOS_PARA1 '+FM2_AXIOS_PARA1);    
    //return;
    showProgress(true);       
    axios.post('/api/fmlib_del', {headers: { 'Content-Type': 'application/json' }}, { params: { sql:FM2_AXIOS_SQL,fld:FM2_AXIOS_PARA1,tbl:FM2_TABLE_NAME } })    
    .then(function (response) {    
      showProgress(false);
      //console.log(response.data.length);
      FM2_TABLE=response.data;
            
      if (typeof fn === "function") fn(2,response.data);   
      FM2_INIT_REC();
    })    
    .catch(function (error) { console.log(error); showProgress(false); });
    
  },function(){});
}
//
function FM2_CANCEL(){  
  alert('houy');
  var m=document.getElementById('FM2_BTNS').getAttribute('data-mode');
  var recno=document.getElementById(FM2_FIELDS[0]['div']).value;    
  //alert('cancel '+recno);
  //alert('mode: '+m);
  if(m==3){    
    FM2_DISP_REC(recno);
  }else{
    FM2_INIT_REC();
  }
  FM2_BTN_LEVEL=1;
  var fn = window[FM2_FUNC.cancel];  
  if (typeof fn === "function") fn(recno,true);   
}
//
function FM2_INIT_REC(){
  document.getElementById('FM2_HEAD').setAttribute('data-recno','');
  //FM2_FM_MODE=1;
  FM2_ADD_FLAG=false;
  FM2_MAIN_BOX(0);
  
  for(var i=0;i<FM2_FIELDS.length;i++){
    var div=FM2_FIELDS[i]['div'];    
    var fld=FM2_FIELDS[i]['fld'];
    var disp=parseInt(FM2_FIELDS[i]['disp']);
    //console.log('div: '+div);
    
    if(disp <= 0){
    //if(FM2_RKEY == fld){  
      //alert(disp+' -> '+div);
      //console.log('disp: '+disp+' div:'+div);    
      console.log('FM2_RKEY: '+FM2_RKEY+' fld:'+fld);    
      document.getElementById(div).style.display='none';
      continue; 
    }   
    
    document.getElementById(div).disabled=true;
    document.getElementById(div).value='';
  }

  if(FM2_FM_MODE==2){    
    //WRITE FIELDS HEADINGS
    var ctr_FM2_FIELDS2=0;
    var aryHD=[];
    for(var i=0;i<FM2_FIELDS2.length;i++){
      var hd=FM2_FIELDS2[i]['hd'];       
      var disp=parseInt(FM2_FIELDS2[i]['disp']);
      if(disp <= 0){ continue; }   
    
      aryHD[ctr_FM2_FIELDS2]=hd;
      ctr_FM2_FIELDS2++;
    }
    //print grid headings
    var w_fld2=100/ctr_FM2_FIELDS2;
    var hhdd='<div style="width:100%;height:100%;margin:0;padding:0px;color:white;background:'+JBE_CLOR+';">';
    for(var i=0;i<ctr_FM2_FIELDS2;i++){
      hhdd+='<div style="width:'+w_fld2+'%;height:100%;padding:5px;border:1px solid lightgray;">'+aryHD[i]+'</div>';
      //console.log('ctr:'+i+' == '+aryHD[i]);
    }
    hhdd+='</div>';
    document.getElementById('div_FM2_dtl_div1').innerHTML=hhdd;
    //initialize dtl div
    document.getElementById('div_FM2_dtl_div2').innerHTML='';
  }

  var fn = window[FM2_FUNC.init];
  if (typeof fn === "function"){
    if(fn()==false){ return; }
  }  
}

function FM2_DISP_REC(recno){
  console.log('FM2_DISP_REC;FM2_FM_MODE: '+FM2_FM_MODE);
  FM2_BTN_LEVEL=1;
  
  document.getElementById('FM2_HEAD').setAttribute('data-recno',recno);
  document.getElementById('div_FM2_dtl_div2').innerHTML='';

  FM2_ADD_FLAG=false;
  var fld=FM2_FIELDS[0]['fld'];  
  //alert(fld);
  
  for(var i=0;i<FM2_TABLE.length;i++){
    var tbl_fld=FM2_TABLE[i][fld];
    if( tbl_fld != recno){ continue; }

    //display em
    for(var ii=0;ii < FM2_FIELDS.length;ii++){       
      var vdiv=FM2_FIELDS[ii]['div'];
      var vfld=FM2_FIELDS[ii]['fld'];
      var vtype=FM2_FIELDS[ii]['type'];
      var vval=FM2_TABLE[i][vfld];  
      
      //console.log('>>> FM2_DISP_REC vtype: '+vtype+'\nFLD: '+vfld); 
      if(vtype=='date'){ vval=JBE_DATE_FORMAT(vval,'YYYY-MM-DD'); }
      document.getElementById(vdiv).value=vval;    
      document.getElementById(vdiv).disabled=true; 
    }                   
  }   

  if(FM2_FM_MODE==2){
    //console.log('FM2_TABLE2.length: '+FM2_TABLE2.length);
    //console.log('FM2_FIELDS2.length: '+FM2_FIELDS2.length);
    let v_dtl='';
    let line_ctr=1;
    var ctr_visible=0;
    for(var i=0;i<FM2_FIELDS2.length;i++){
      //console.log('disp:'+FM2_FIELDS2[i].disp+'  the_div:'+FM2_FIELDS2[i].div);
      if(FM2_FIELDS2[i].disp > 0){ 
        ctr_visible++;
      }      
    }
    //alert('ctr_visible length:'+ctr_visible);
    var w_fld2=100/ctr_visible;

    for(var k=0;k<FM2_TABLE2.length;k++){
      //alert(FM2_TABLE2[k][FM2_RKEY]+' vs '+recno);
      if(FM2_TABLE2[k][FM2_RKEY] != recno){ continue; }
      
      let hhdd='<div id="dtl_'+line_ctr+'" class="dtls" onclick="FM2_hl_row('+line_ctr+')" style="width:100%;height:30px;margin:0;padding:0px;color:black;background:none;">';
      for(var i=0;i<FM2_FIELDS2.length;i++){
        var the_fld=FM2_FIELDS2[i].fld;
        var the_div=FM2_FIELDS2[i].div;
        var the_disp=FM2_FIELDS2[i].disp;
        var the_val=FM2_TABLE2[k][the_fld];
        //console.log('--- the_fld:'+the_fld+'   the_val:'+the_val+'  disp:'+the_disp+'  the_div:'+the_div);        

        //hhdd+='<div id="'+the_div+line_ctr+'" style="float:left;display:'+iif(the_disp==1,'block','none')+';width:'+w_fld2+'%;height:100%;padding:5px;border:1px solid lightgray;background:none;">'+the_val+'</div>';
        hhdd+='<span id="'+the_div+'_'+line_ctr+'" class="class_mtr1" style="display:'+iif(the_disp==1,'block','none')+';width:'+w_fld2+'%;height:100%;padding:5px;border:1px solid lightgray;background:none;">'+the_val+'</span>';
        //console.log('disp2 : '+the_div+'_'+line_ctr);
      }
      hhdd+='</div>';
      v_dtl+=hhdd;
      line_ctr++;
      //console.log('disp2:'+hhdd);
    }   
    document.getElementById('div_FM2_dtl_div2').innerHTML=v_dtl; 
  }
  FM2_MAIN_BOX(1);
  //alert('display');
  //var fn = window[FM2_FUNC.look];  
  //if(typeof fn === "function") fn(fld);   
}

function FM2_ADD_ITEM(f_add){  
  var fn = window[FM2_FUNC.add_item];  
  if(typeof fn === "function") fn(f_add);
    
  var m=parseInt(document.getElementById("myView1").getAttribute('data-JBEpage'));
  
  var tilt=iif(f_add,'Add Item','Edit Item');  
  document.getElementById('back_view'+m).style.display='none';
  document.getElementById('cap_viewMid'+m).innerHTML=tilt;
  MNU_FM2_ADD_ITEM(f_add);  
}

function MNU_FM2_ADD_ITEM(f_add){
  var jmenu=  
  '<div style="width:100%;height:100%;">'+

    '<div onclick="FM2_save_item('+f_add+')" style="float:left;width:25%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jdown.png" alt="call image" />'+
        '<span>OK</span>'+
      '</div>'+
    '</div>'+
    '<div onclick="JBE_CLOSE_VIEW();FM2_close_add_item();" style="float:right;width:25%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jclose.png"  alt="home image" />'+
        '<span>Close</span>'+
      '</div>'+
    '</div>'+

  '</div>';
  dispMenu(false,jmenu);
  //document.getElementById('btn_ptrno').disabled=true;
}

function FM2_save_item(f_add){
  let errMsg='';
  var fn = window[FM2_FUNC.save_item];  
  var aryFLD=[]; var ctr_aryFLD=0;
  if(typeof fn === "function"){ aryFLD=fn(f_add); }
  
  for(var i=0;i<aryFLD.length;i++){
    let div=aryFLD[i].div;
    let type=aryFLD[i].type;
    let val=iif(type=="text",document.getElementById(div).innerHTML,document.getElementById(div).value);
    //alert(val+' div:'+div);
    if(aryFLD[i].disp==1){ ctr_aryFLD++; }
    
    if(!val){
      errMsg=aryFLD[i].err;
      break;
    }
  }
  if(errMsg){
    snackBar(errMsg);
    return;
  }
  
  //let len_dtls=document.querySelectorAll('.dtls').length;     
  //alert('rval is true:'+len_dtls);

  //curRow=document.querySelectorAll('.dtls').length;  
  var line_ctr=document.getElementById('div_FM2_dtl_div2').getAttribute('data-row');   
  if(f_add){ line_ctr=document.querySelectorAll('.dtls').length+1; }
 
  var w_fld2=100/ctr_aryFLD;

  let hhdd='<div id="dtl_'+line_ctr+'" class="dtls" onclick="FM2_hl_row('+line_ctr+')" style="width:100%;height:30px;margin:0;padding:0px;color:black;background:none;">';
  for(var i=0;i<aryFLD.length;i++){
    var the_div=aryFLD[i].div;
    var the_div2='dtl'+the_div.substring(3);
    //alert('the_div2:'+the_div2);
    var the_val;
    if(aryFLD[i].type=='text'){
      the_val=document.getElementById(the_div).innerHTML;
    }else{
      the_val=document.getElementById(the_div).value;
    }
    //console.log('--- the_fld:'+the_fld+'   the_val:'+the_val+'  disp:'+the_disp+'  the_div:'+the_div);        
    if(f_add){
      hhdd+='<span id="'+the_div2+'_'+line_ctr+'" class="class_mtr1" style="display:'+iif(aryFLD[i].disp==1,'block','none')+';width:'+w_fld2+'%;height:100%;padding:5px;border:1px solid lightgray;background:none;">'+the_val+'</span>';
    }else{
      document.getElementById(the_div2+'_'+line_ctr).innerHTML=the_val;
    }
  }
  hhdd+='</div>';
  //console.log('hhdd:'+hhdd);
  if(f_add){ document.getElementById('div_FM2_dtl_div2').innerHTML+=hhdd; }
  
  //alert('line_ctr:'+line_ctr);
  JBE_CLOSE_VIEW()
  FM2_fm_menu();
  FM2_FM_MODE=2;
  FM2_MAIN_BOX(3);
  FM2_hl_row(line_ctr);
}

function FM2_close_add_item(){
  alert(900);
  FM2_fm_menu();
  FM2_FM_MODE=2;
  FM2_MAIN_BOX(3);
}



function FM2_chk_dup(){  
  //alert(stockno+' vs '+lotno);
  let ctr=0;
  //prepare flds for dup check
  let aryFLD=[]; let ctr_aryFLD=0;
  for(var i=0;i<FM2_FIELDS2.length;i++){
    if(FM2_FIELDS2[i].dup==0){ continue; }
    /*
    var the_fld=FM2_FIELDS2[i].fld;
    var the_div=FM2_FIELDS2[i].div;
    var the_disp=FM2_FIELDS2[i].disp;
    var the_val=FM2_TABLE2[k][the_fld];
    */
    ob={
      "div":FM2_FIELDS2[i].div,
      "fld":FM2_FIELDS2[i].fld,
      "val":FM2_FIELDS2[i].fld,
    }
    aryFLD[ctr_aryFLD]=ob;
    ctr_aryFLD++;
  }

  let len_dtls=document.querySelectorAll('.dtls').length;     
  for(var i=1;i<=len_dtls;i++){
    /*
    let d_stockno=document.getElementById('dtl_stockno_'+i).innerHTML;
    let d_lotno=document.getElementById('dtl_lotno_'+i).innerHTML;
    let d_dtl=document.getElementById('dtl_'+i).style.display;

    if(d_stockno==stockno && d_lotno==lotno && d_dtl!='none'){    
      ctr++;
    }
    */
    for(var k=0;k<aryFLD.length;k++){
      //if(document.getElementById(aryFLD[k].div+i).innerHTML==)
      alert(document.getElementById(aryFLD[k].div+i).innerHTML);
    }
  }
  return ctr;
}

