function fm_wh(cb){  
  FM_TRANS='WH';
  FM_FM_MODE=1;
  FM_TABLE=DB_WHOUSE;  FM_TABLE_NAME='whouse';  FM_RKEY='whcode';
  FM_CB=cb;

  FM_FIELDS=[ //display on screen
    { div:"tx_whcode", fld:"whcode", type:"text", disp:0, save:true },
    { div:"tx_whname", fld:"name", type:"text", disp:1, save:true }
  ];
    
  var fm_ob = {
    title:"WAREHOUSE MASTER FILE",  
    title2:"WAREHOUSE",
    width:"800px",height:"270px",
    head:"100px", foot:"0px",
    foot_dtl:""
  };  

  if(JBE_MOBILE){ 
    fm_ob.width="95%"; 
    fm_ob.height="290px";
  }
    
  var fm_layout=
    '<input id="tx_whcode" type="text" style="display:none;" value="" />'+
    '<div id="div_FM_head" style="width:100%;height:100px;margin-top:0px;text-align:left;padding:5px;border:1px solid lightgray;background:none;">'+
      
      '<div class="cls_fm_dtl">'+        
        '<div>'+
          '<span onclick="JBE_SHOW_LOGGER(tx_whcode.value,&quot;'+FM_TRANS+'&quot;)" style="cursor:help;">Location Name:</span>'+                    
          '<input id="lu_whcode" type="image" src="gfx/jsearch.png" onclick="look_whcode(tx_whcode.value)" />'+
        '</div>'+
        '<input id="tx_whname" type="text" data-caption="Location Name" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_whname.id).focus()" />'+
      '</div>'+
      '<div class="cls_fm_dtl">'+        
        '<div>'+
          '<span style="cursor:help;">Temp. Monitoring:</span>'+ 
        '</div>'+
        //'<input id="tx_temp" type="text" data-caption="Location Name" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_whname.id).focus()" />'+
        '<select id="tx_temp" name="tx_temp" class="class_mtr2" style="float:left;width:50%;color:red;height:100%;padding:0px;">';
          var dtlfld='';            
          for(var i=0;i < DB_WHOUSE.length;i++){
            //if(aryPVC2[i]['clientcode'] != clientcode){ continue; }
            let vsel='';
            //if(v_loc==DB_WHOUSE[i].whcode){ vsel='selected'; }
            dtlfld+='<option '+vsel+' value="'+DB_WHOUSE[i].whcode+'">'+DB_WHOUSE[i].name+'</option>';
          }
          fm_layout+=dtlfld+
        '</select>'+
      '</div>'+
      
    '</div>';
  
  FM_FUNC={
    lu:"do_lookup_fm_wh",
    look:"look_fm_wh",
    init:"init_fm_wh",
    add:"add_fm_wh",
    edit:"edit_fm_wh",
    del:"del_fm_wh",
    disp:"disp_fm_wh",
    save:"save_fm_wh"
  }
  FM_MAIN(fm_ob,fm_layout);
}

function look_whcode(){
  var flds=[
    { title:"Location Name", fld:"name", type:"text", width:"50%", align:"center" },
    { title:"Location No.", fld:"whcode", type:"text", width:"50%", align:"center" }    
  ];
  var ob=[
    { val:tx_whcode.value, fld:"whcode" }
  ];
  FM_LOOKUP2(true,tx_whname.value,ob,FM_TABLE,['name'],'LOOKUP','do_lookup_fm_wh',flds);
}

function do_lookup_fm_wh(ndx){	  
  if(ndx == -1){ 
    FM_INIT_REC(); 
    return; 
  }
  let val=document.getElementById('dd_whcode'+ndx).innerHTML;
  document.getElementById('tx_whcode').innerHTML=val;
  FM_DISP_REC(val); 
}
//
function init_fm_wh(){  
  document.getElementById('tx_whcode').value='';
  document.getElementById('lu_whcode').disabled=false;
  document.getElementById('lu_whcode').style.opacity='1';
  document.getElementById('tx_temp').value='';
  document.getElementById('tx_temp').disabled=true;
}
//
function add_fm_wh(){
  document.getElementById('lu_whcode').disabled=true;
  document.getElementById('lu_whcode').style.opacity='0.5';
  document.getElementById('tx_whname').focus();
}
//edit
function edit_fm_wh(){
  document.getElementById('lu_whcode').disabled=true;
  document.getElementById('lu_whcode').style.opacity='0.5';
  document.getElementById('tx_whname').focus();
}
//look
function look_fm_wh(fld){
  if(fld=='whcode'){ 
    disp_fm_wh();
  }  
}
//del
function del_fm_wh(stat,r){
  if(stat==1){ 
    let refno=JBE_REC_EXIST(DB_RECEIVE,FM_RKEY,document.getElementById('tx_whcode').value,'trano');
    if(refno){
      MSG_SHOW(vbOk,"DENIED: ","Can't Delete, Record is used in Stock Receiving File No:"+refno,function(){},function(){}); 
      return false; 
    }
  }
  if(stat==2){ DB_Location=r; } 
}
//save
function save_fm_wh(stat,r){
  //alert('stat :'+stat+' r:'+r);
  var recno=document.getElementById('tx_whcode').value;    
  if(stat==2){
    /*
    var targetDIR=JBE_API+'upload/photo/';
    var newName = 'party_'+recno.trim() + '.jpg';
    if(THISFILE[0]){     
      let ob = [
        { "div":"img_stock" }
      ];
      //uploadNOW(THISFILE[0],newName,targetDIR,ob,false,false); 
    }  
    */
    DB_WHOUSE=r; 
  }
}
//disp
function disp_fm_wh(){   
  //alert('disp_fm_wh '+disp_mode);
  var n = new Date().toLocaleTimeString('it-IT');
  document.getElementById('lu_whcode').disabled=false;
  document.getElementById('lu_whcode').style.opacity='1';  
}

