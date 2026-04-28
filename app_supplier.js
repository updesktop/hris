function fm_supplier(cb){  
  FM_TRANS='VENDOR';
  FM_FM_MODE=1;
  FM_TABLE=DB_SUPPLIER;  FM_TABLE_NAME='supplier';  FM_RKEY='suppno';
  FM_CB=cb;

  FM_FIELDS=[ //display on screen
    { div:"tx_supp_no", fld:"suppno", type:"text", disp:0, save:true },
    { div:"tx_supp_name", fld:"name", type:"text", disp:1, save:true }
  ];
    
  var fm_ob = {
    title:"SUPPLIER MASTER FILE",  
    title2:"SUPPLIER",
    width:"800px",height:"270px",
    head:"100px", foot:"30px",
    foot_dtl:""
  };  

  if(JBE_MOBILE){ 
    fm_ob.width="95%"; 
    fm_ob.height="290px";
  }
    
  var fm_layout=
    '<input id="tx_supp_no" type="text" style="display:none;" value="" />'+
    '<div id="div_FM_head" style="width:100%;height:100px;margin-top:0px;text-align:left;padding:5px;border:1px solid lightgray;background:none;">'+
      
      '<div class="cls_fm_dtl">'+        
        '<div>'+
          '<span onclick="JBE_SHOW_LOGGER(tx_supp_no.value,&quot;'+FM_TRANS+'&quot;)" style="cursor:help;">Supplier Name:</span>'+                    
          '<input id="lu_supp_no" type="image" src="gfx/jsearch.png" onclick="look_suppno(tx_supp_no.value)" />'+
        '</div>'+
        '<input id="tx_supp_name" style="float:left;" type="text" data-caption="Supplier Name" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_supp_name.id).focus()" />'+
      '</div>'+
      
    '</div>';
  
  FM_FUNC={
    lu:"lookup_fm_supplier",
    look:"look_fm_supplier",
    init:"init_fm_supplier",
    add:"add_fm_supplier",
    edit:"edit_fm_supplier",
    del:"del_fm_supplier",
    disp:"disp_fm_supplier",
    save:"save_fm_supplier"
  }
  FM_MAIN(fm_ob,fm_layout);
}

function look_suppno(){
  var flds=[
    { title:"Supplier No.", fld:"suppno", type:"text", width:"30%", align:"left" },
    { title:"Supplier Name", fld:"name", type:"text", width:"70%", align:"left" }
  ];
  //FM_LOOKUP(true,tx_supp_name.value,FM_TABLE,[],'SUPPLIER LOOKUP','lookup_fm_supplier','name',flds,FM_RKEY);
  var ob=[
    { val:tx_supp_no.value, fld:"suppno" }
  ];
  FM_LOOKUP2(true,tx_supp_name.value,ob,FM_TABLE,[],'LOOKUP','lookup_fm_supplier',flds);
}

function lookup_fm_supplier(ndx){	  
  if(ndx == -1){ 
    FM_INIT_REC(); 
    return; 
  }
  let val=document.getElementById('dd_suppno'+ndx).innerHTML;
  document.getElementById('tx_supp_no').innerHTML=val;
  FM_DISP_REC(val); 
}
//
function init_fm_supplier(){  
  document.getElementById('tx_supp_no').value='';
  document.getElementById('lu_supp_no').disabled=false;
  document.getElementById('lu_supp_no').style.opacity='1';
}
//
function add_fm_supplier(){
  document.getElementById('lu_supp_no').disabled=true;
  document.getElementById('lu_supp_no').style.opacity='0.5';
  document.getElementById('tx_supp_name').focus();
}
//edit
function edit_fm_supplier(){
  document.getElementById('lu_supp_no').disabled=true;
  document.getElementById('lu_supp_no').style.opacity='0.5';
  document.getElementById('tx_supp_name').focus();
}
//look
function look_fm_supplier(fld){
  if(fld=='suppno'){ 
    disp_fm_supplier();
  }  
}
//del
function del_fm_supplier(stat,r){
  if(stat==1){ 
    let refno=JBE_REC_EXIST(DB_RECEIVE,FM_RKEY,document.getElementById('tx_supp_no').value,'trano');
    if(refno){
      MSG_SHOW(vbOk,"DENIED: ","Can't Delete, Record is used in Stock Receiving File No:"+refno,function(){},function(){}); 
      return false; 
    }
  }
  if(stat==2){ DB_SUPPLIER=r; } 
}
//save
function save_fm_supplier(stat,r){
  //alert('stat :'+stat+' r:'+r);
  var recno=document.getElementById('tx_supp_no').value;    
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
    DB_SUPPLIER=r; 
  }
}
//disp
function disp_fm_supplier(){   
  //alert('disp_fm_supplier '+disp_mode);
  var n = new Date().toLocaleTimeString('it-IT');
  document.getElementById('lu_supp_no').disabled=false;
  document.getElementById('lu_supp_no').style.opacity='1';  
}

