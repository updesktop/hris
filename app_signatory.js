function fm_signatories(cb){  
  FM_FM_MODE=1;
  FM_TABLE=DB_SIG;  FM_TABLE_NAME='sig';  FM_RKEY='id';
  FM_CB=cb;

  FM_FIELDS=[ //display on screen   
    { div:"tx_id", fld:"id", type:"text", disp:0, save:true },
    { div:"tx_approvedName", fld:"approved", type:"text", disp:1, save:true },
    { div:"tx_approvedJob", fld:"approvedJob", type:"text", disp:1, save:true },
    { div:"tx_issuedName", fld:"issued", type:"text", disp:1, save:true },
    { div:"tx_issuedJob", fld:"issuedJob", type:"text", disp:1, save:true }
  ];
      
  var fm_ob = {
    title:"SIGNATORIES MASTER FILE",  
    title2:"SIGNATORIES",
    width:"800px",height:"270px",
    head:"100px", foot:"0px",
    foot_dtl:""
  };  

  if(JBE_MOBILE){ 
    fm_ob.width="100%"; 
    fm_ob.height="290px";
  }
    
  var fm_layout=
    //'<div style="width:100%;height:100%;margin-top:0px;text-align:left;padding:5px;background:white;">'+

    '<input id="tx_id" type="text" data-caption="ID" style="display:none;" value="1" />'+

    '<div id="div_FM_head" style="width:100%;height:auto;margin-top:0px;text-align:left;padding:5px;border:1px solid lightgray;background:none;">'+
      
      '<div style="width:100%;height:auto;">'+
        '<div style="width:100%;font-size:18px;font-weight:bold;">Approved by:</div>'+
        '<div style="width:100%;height:30px;padding:4px;border:0px solid red;">'+
          '<span style="float:left;margin-left:5%;width:25%;">Name:</span>'+
          '<input id="tx_approvedName" style="float:left;width:70%;" type="text" data-caption="Signatories Name" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_prod_name.id).focus()" />'+
        '</div>'+
        '<div style="width:100%;height:30px;padding:4px;border:0px solid red;">'+
          '<span style="float:left;margin-left:5%;width:25%;">Designation:</span>'+
          '<input id="tx_approvedJob" style="float:left;width:70%;" type="text" data-caption="Signatories Name" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_prod_name.id).focus()" />'+
        '</div>'+
      '</div>'+

      '<div style="width:100%;height:auto;margin-top:20px;">'+
        '<div style="width:100%;font-size:18px;font-weight:bold;">Issued by:</div>'+
        '<div style="width:100%;height:30px;padding:4px;border:0px solid red;">'+
          '<span style="float:left;margin-left:5%;width:25%;">Name:</span>'+
          '<input id="tx_issuedName" style="float:left;width:70%;" type="text" data-caption="Signatories Name" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_prod_name.id).focus()" />'+
        '</div>'+
        '<div style="width:100%;height:30px;padding:4px;border:0px solid red;">'+
          '<span style="float:left;margin-left:5%;width:25%;">Designation:</span>'+
          '<input id="tx_issuedJob" style="float:left;width:70%;" type="text" data-caption="Signatories Name" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_prod_name.id).focus()" />'+
        '</div>'+
      '</div>'+
      
    '</div>';
  
  FM_FUNC={
    lu:"do_lu_fm_signatories",
    look:"look_fm_signatories",
    init:"init_fm_signatories",
    add:"add_fm_signatories",
    edit:"edit_fm_signatories",
    del:"del_fm_signatories",
    disp:"disp_fm_signatories",
    save:"save_fm_signatories"
  }
  FM_MAIN(fm_ob,fm_layout);
  FM_DISP_REC(1);
}

function lookup_fm_signatories(){
  /*
  var flds=[    
    { title:"signatories Name", fld:"prodname", type:"text", width:"60%", align:"left" },
    { title:"signatories Type", fld:"type", type:"number", width:"20%", align:"center" },
    { title:"signatories No", fld:"id", type:"text", width:"20%", align:"center" },
  ];
  //FM_LOOKUP(true,tx_prod_name.value,FM_TABLE,[],'signatories LOOKUP','do_lu_fm_signatories','prodname',flds,'id');
  var ob=[
    { val:tx_prod_no.value, fld:"whcode" }
  ];
  FM_LOOKUP2(true,tx_prod_name.value,ob,FM_TABLE,[],'LOOKUP','lookup_fm_wh',flds);
  */
}

function do_lu_fm_signatories(ndx){	  
  /*
  if(ndx == -1){ 
    FM_INIT_REC();  
    return; 
  }  
  let val=document.getElementById('dd_whcode'+ndx).innerHTML;
  document.getElementById('tx_id').innerHTML=val;
  FM_DISP_REC(val);    
  look_fm_signatories();
  */
}
//
function init_fm_signatories(){  
  return;
  document.getElementById('tx_id').value='';
  //document.getElementById('tx_prod_name').disabled=true;
  document.getElementById('lu_id').disabled=false;
  document.getElementById('lu_id').style.opacity='1';
}
//
function add_fm_signatories(){
  /*
  document.getElementById('lu_id').disabled=true;
  document.getElementById('lu_id').style.opacity='0.5';
  document.getElementById('tx_prod_name').disabled=false;
  document.getElementById('tx_prod_name').focus();
  */
}
//edit
function edit_fm_signatories(){    
  document.getElementById('tx_approvedName').disabled=false;
  document.getElementById('tx_approvedJob').disabled=false;
  document.getElementById('tx_issuedName').disabled=false;
  document.getElementById('tx_issuedJob').disabled=false;
  document.getElementById('tx_approvedName').focus();
}
//look
function look_fm_signatories(){
  //disp_fm_signatories();
}
//del
function del_fm_signatories(stat,r){
  if(stat==1){ 
    let refno=JBE_REC_EXIST(DB_STOCK,FM_RKEY,document.getElementById('tx_id').value,'stockno');
    if(refno){
      MSG_SHOW(vbOk,"DENIED: ","Can't Delete, Record is used in Stock Master File No:"+refno,function(){},function(){}); 
      return false; 
    }
  }
  if(stat==2){ DB_SIG=r; } 
}
//save
function save_fm_signatories(stat,r){
  //alert('stat :'+stat+' r:'+r);
  var recno=document.getElementById('tx_id').value;    
  if(stat==2){
    var targetDIR=JBE_API+'upload/photo/';
    var newName = 'party_'+recno.trim() + '.jpg';
    if(THISFILE[0]){     
      let ob = [
        { "div":"img_stock" }
      ];
      //uploadNOW(THISFILE[0],newName,targetDIR,ob,false,false); 
    }  
    DB_SIG=r; 
  }
}
//disp
function disp_fm_signatories(){   
  //alert('disp_fm_signatories '+disp_mode);
  //var n = new Date().toLocaleTimeString('it-IT');  
  //document.getElementById('lu_id').disabled=false;
  //document.getElementById('lu_id').style.opacity='1';  
  document.getElementById('FM_DEL_BTN').style.display='none';
  document.getElementById('FM_CANCEL_BTN').style.display='none';
  document.getElementById('FM_CLOSE_BTN').style.display='block';
}

