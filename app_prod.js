function fm_product(cb){  
  FM_TRANS='PROD';
  FM_FM_MODE=1;
  FM_TABLE=DB_PRODUCT;  FM_TABLE_NAME='product';  FM_RKEY='prodno';
  FM_CB='mnu_fm_mast';
  //FM_TABLE2=DB_RECEIVE2;

  FM_FIELDS=[ //display on screen    
    { div:"tx_prod_no", fld:"prodno", type:"text", disp:0, save:true },
    { div:"tx_prod_name", fld:"prodname", type:"text", disp:1, save:true },
    { div:"tx_prod_type", fld:"type", type:"text", disp:1, save:true }
  ];
      
  var fm_ob = {
    title:"PRODUCT MASTER FILE",  
    title2:"PRODUCT",
    width:"800px",height:"270px",
    head:"100px", foot:"0px",
    foot_dtl:""
  };  

  if(JBE_MOBILE){ 
    fm_ob.width="95%"; 
    fm_ob.height="260px";
  }
    
  var fm_layout=
    //'<div style="width:100%;height:100%;margin-top:0px;text-align:left;padding:5px;background:white;">'+

    '<input id="tx_prod_no" type="text" data-caption="Prod. No." style="display:none;" value="" />'+

    '<div id="div_FM_head" style="width:100%;height:100px;margin-top:0px;text-align:left;padding:5px;border:1px solid lightgray;background:none;">'+
      
      '<div class="cls_fm_dtl">'+        
        '<div>'+      
          '<span onclick="JBE_SHOW_LOGGER(tx_prod_no.value,&quot;'+FM_TRANS+'&quot;)" style="cursor:help;">Product Name:</span>'+               
          '<input id="lu_prod_no" type="image" src="gfx/jsearch.png" onclick="lookup_fm_product(tx_prod_no.value)" />'+
        '</div>'+
        '<input id="tx_prod_name" type="text" data-caption="Product Name" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_prod_name.id).focus()" />'+
      '</div>'+

      '<div class="cls_fm_dtl">'+
        '<div>Type:</div>'+  
        '<input id="tx_prod_type" type="number" data-caption="Type" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_prod_type.id).focus()" />'+
      '</div>'+
      
    '</div>';
  
  FM_FUNC={
    lu:"do_lu_fm_product",
    look:"look_fm_product",
    init:"init_fm_product",
    add:"add_fm_product",
    edit:"edit_fm_product",
    del:"del_fm_product",
    disp:"disp_fm_product",
    save:"save_fm_product"
  }
  FM_MAIN(fm_ob,fm_layout);
}

function lookup_fm_product(){
  var flds=[    
    { title:"Product Name", fld:"prodname", type:"text", width:"60%", align:"left" },
    { title:"Product Type", fld:"type", type:"number", width:"20%", align:"center" },
    { title:"Product No", fld:"prodno", type:"text", width:"20%", align:"center" },
  ];
  //FM_LOOKUP(true,tx_prod_name.value,FM_TABLE,[],'PRODUCT LOOKUP','do_lu_fm_product','prodname',flds,'prodno');
  var ob=[
    { val:tx_prod_no.value, fld:"prodno" }
  ];
  FM_LOOKUP2(true,tx_prod_name.value,ob,FM_TABLE,[],'LOOKUP','do_lu_fm_product',flds);
}

function do_lu_fm_product(ndx){	  
  if(ndx == -1){ 
    FM_INIT_REC();
    return; 
  }
  let val=document.getElementById('dd_prodno'+ndx).innerHTML;
  document.getElementById('tx_prod_no').innerHTML=val;
  FM_DISP_REC(val);    
  look_fm_product();
}
//
function init_fm_product(){  
  document.getElementById('tx_prod_no').value='';
  document.getElementById('tx_prod_name').disabled=true;
  document.getElementById('lu_prod_no').disabled=false;
  document.getElementById('lu_prod_no').style.opacity='1';
}
//
function add_fm_product(){
  document.getElementById('lu_prod_no').disabled=true;
  document.getElementById('lu_prod_no').style.opacity='0.5';
  document.getElementById('tx_prod_name').disabled=false;
  document.getElementById('tx_prod_name').focus();
}
//edit
function edit_fm_product(){
  document.getElementById('lu_prod_no').disabled=true;
  document.getElementById('lu_prod_no').style.opacity='0.5';
  document.getElementById('tx_prod_name').disabled=false;
  document.getElementById('tx_prod_name').focus();
}
//look
function look_fm_product(){
  disp_fm_product();
}
//del
function del_fm_product(stat,r){
  if(stat==1){ 
    let refno=JBE_REC_EXIST(DB_STOCK,FM_RKEY,document.getElementById('tx_prod_no').value,'stockno');
    if(refno){
      MSG_SHOW(vbOk,"DENIED: ","Can't Delete, Record is used in Stock Master File No:"+refno,function(){},function(){}); 
      return false; 
    }
  }
  if(stat==2){ DB_PRODUCT=r; } 
}
//save
function save_fm_product(stat,r){
  //alert('stat :'+stat+' r:'+r);
  var recno=document.getElementById('tx_prod_no').value;    
  if(stat==2){
    var targetDIR=JBE_API+'upload/photo/';
    var newName = 'party_'+recno.trim() + '.jpg';
    if(THISFILE[0]){     
      let ob = [
        { "div":"img_stock" }
      ];
      //uploadNOW(THISFILE[0],newName,targetDIR,ob,false,false); 
    }  
    DB_PRODUCT=r; 
  }
}
//disp
function disp_fm_product(){   
  //alert('disp_fm_product '+disp_mode);
  //var n = new Date().toLocaleTimeString('it-IT');  
  document.getElementById('lu_prod_no').disabled=false;
  document.getElementById('lu_prod_no').style.opacity='1';  
}

