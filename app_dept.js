function fm_dept(){  
  FM_TRANS='DEPT';
  FM_FM_MODE=1;
  FM_TABLE=DB_DEPT;  FM_TABLE_NAME='dept';  FM_RKEY='deptno';
  FM_CB='mnu_fm_mast';
  //FM_TABLE2=DB_RECEIVE2;

  FM_FIELDS=[ //display on screen
    { div:"tx_dept_no", fld:"deptno", type:"text", disp:0, save:true },
    { div:"tx_dept_name", fld:"name", type:"text", disp:1, save:true }
  ];
    
  var fm_ob = {
    title:"DEPARTMENT MASTER FILE",  
    title2:"DEPARTMENT",
    width:"800px",height:"270px"
  };  

  if(JBE_MOBILE){ 
    fm_ob.width="95%"; 
    fm_ob.height="290px";
  }
    
  var fm_layout=
    '<input id="tx_dept_no" type="text" onchange="FM_CHK_REC(id.value)" style="display:none;" value="" />'+
    '<div id="div_FM_head" style="width:100%;height:100px;margin-top:0px;text-align:left;padding:5px;border:1px solid lightgray;background:none;">'+
    
      '<div class="cls_fm_dtl">'+        
        '<div>'+          
          '<span onclick="JBE_SHOW_LOGGER(tx_dept_no.value,&quot;'+FM_TRANS+'&quot;)" style="cursor:help;">Department Name:</span>'+           
          '<input id="lu_dept_no" type="image" src="gfx/jsearch.png" onclick="look_deptno(tx_dept_no.value)" />'+
        '</div>'+
        '<input id="tx_dept_name" type="text" data-caption="Department Name" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_dept_name.id).focus()" />'+
      '</div>'+
      
    '</div>';
  
  FM_FUNC={
    look:"look_fm_dept",
    init:"init_fm_dept",
    add:"add_fm_dept",
    edit:"edit_fm_dept",
    del:"del_fm_dept",
    disp:"disp_fm_dept",
    save:"save_fm_dept"
  }
  FM_MAIN(fm_ob,fm_layout);
}

function look_deptno(){
  //{ "title":"Product Name", "width":"60%", "align":"left" },
  var flds=[
    { title:"Area No", fld:"deptno", type:"text", width:"20%", align:"left" },
    { title:"Department Name", fld:"name", type:"text", width:"80%", align:"left" }
  ];
  //FM_LOOKUP(true,tx_dept_name.value,FM_TABLE,[],'AREA LOOKUP','lookup_fm_dept','name',flds,FM_RKEY);
  var ob=[
    { val:tx_dept_no.value, fld:"deptno" }
  ];
  FM_LOOKUP2(true,tx_dept_name.value,ob,FM_TABLE,[],'LOOKUP','lookup_fm_dept',flds);
}

function lookup_fm_dept(ndx){	  
  if(ndx == -1){ 
    FM_INIT_REC();
    return; 
  }
  let val=document.getElementById('dd_deptno'+ndx).innerHTML;
  document.getElementById('tx_dept_no').value=val;
  document.getElementById('tx_dept_name').value=document.getElementById('dd_name'+ndx).innerHTML;
  FM_DISP_REC(val); 
  disp_fm_dept();
}
//
function init_fm_dept(){  
  document.getElementById('tx_dept_no').value='';
  document.getElementById('lu_dept_no').disabled=false;
  document.getElementById('lu_dept_no').style.opacity='1';
}
//
function add_fm_dept(){
  document.getElementById('lu_dept_no').disabled=true;
  document.getElementById('lu_dept_no').style.opacity='0.5';
  document.getElementById('tx_dept_name').focus();
}
//edit
function edit_fm_dept(){
  document.getElementById('lu_dept_no').disabled=true;
  document.getElementById('lu_dept_no').style.opacity='0.5';
  document.getElementById('tx_dept_name').focus();
}
//look
function look_fm_dept(){
    disp_fm_dept();
}
//del
function del_fm_dept(stat,r){
  //alert('stat :'+stat+' r:'+r);
  if(stat==1){ 
    let refno=JBE_REC_EXIST(DB_PTR,FM_RKEY,document.getElementById('tx_dept_no').value,'trano');
    if(refno){
      MSG_SHOW(vbOk,"DENIED: ","Can't Delete, Record is used in RIS No:"+refno,function(){},function(){}); 
      return false; 
    }
  }
  if(stat==2){ DB_DEPT=r; } 
}
//save
function save_fm_dept(stat,r){
  //alert('stat :'+stat+' r:'+r);
  var recno=document.getElementById('tx_dept_no').value;    
  if(stat==2){
    var targetDIR=JBE_API+'upload/photo/';
    var newName = 'party_'+recno.trim() + '.jpg';
    if(THISFILE[0]){     
      let ob = [
        { "div":"img_stock" }
      ];
      //uploadNOW(THISFILE[0],newName,targetDIR,ob,false,false); 
    }  
    DB_DEPT=r; 
  }
}
//disp
function disp_fm_dept(){   
  //alert('disp_fm_dept '+disp_mode);
  var n = new Date().toLocaleTimeString('it-IT'); 
  document.getElementById('lu_dept_no').disabled=false;
  document.getElementById('lu_dept_no').style.opacity='1';    
}
