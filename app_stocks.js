function fm_stocks(){  
  //get_app_default();
  FM_TRANS='STK';
  FM_FM_MODE=2;
  FM_TABLE=DB_STOCK;    FM_TABLE_NAME='stock';
  FM_TABLE2=DB_STOCK2;  FM_TABLE_NAME2='stock2';

  FM_REC2_EMPTY=true;

  FM_RKEY='stockno';  FM_RKEY2='stockno';
  FM_CB='';

  FM_FIELDS=[ //display on screen; disp:1s and disp:0s 
    { div:"tx_stock_no", fld:"stockno", type:"text", disp:0, save:true },
    { div:"tx_stock_name", fld:"descrp", type:"text", disp:1, save:true },
    { div:"tx_stock_photo", fld:"photo", type:"text", disp:0, save:false },
    
    { div:"tx_lotno", fld:"lotno", type:"text", disp:1, save:true  },
    { div:"tx_loc", fld:"loc", type:"text", disp:1, save:true  },
    { div:"tx_refno", fld:"refno", type:"text", disp:0, save:true  },
    { div:"tx_expiry", fld:"expiry", type:"date", disp:1, save:true  },
    { div:"tx_prod_no", fld:"prodno", type:"text", disp:0, save:true  },
    { div:"tx_prod_type", fld:"type", type:"text", disp:0, save:true  },
    { div:"tx_cost", fld:"cost", type:"text", disp:1, save:true  },    
    { div:"tx_unit", fld:"unit", type:"text", disp:1, save:true  }//,
    //{ div:"tx_dosage", fld:"dosage", type:"number", disp:1, save:true  }
    /*
    //{ div:"tx_bundle", fld:"bundle", type:"text", disp:0, save:true  },
    //{ div:"tx_bundle_multi", fld:"bundle_multi", type:"text", disp:1, save:true  },
    { div:"tx_cost", fld:"cost", type:"text", disp:1, save:true  },
    { div:"tx_dosage", fld:"dosage", type:"text", disp:1, save:true  } 
     */
  ];
  
  FM_FIELDS2=[ //display on screen
    { hd:"", fld:"stockno", type:"text", input:false, width:"20%", align:"center", dupli:0, err:"Please enter Vaccine", disp:0, save:true },
    { hd:"", fld:"bundle_no", type:"text", input:false, width:"20%", align:"center", dupli:1, err:"Please enter Bundle", disp:0, save:true },
    
    { hd:"Bundle Items", fld:"bundle_name", type:"text", input:false, width:"50%", align:"center", dupli:0, err:"Please enter an Item.", disp:1, save:true },
    { hd:"Quantity", fld:"bundle_multi", type:"text", input:true, width:"50%", align:"center", dupli:0, err:"Please enter Bundle Quantity", disp:1, save:true }      
  ];
    
  var fm_ob = {
    title:"INVENTORY ADJUSTMENT",  
    title2:"ADJUSTMENT",
    width:"800px",height:"200px",
    head:"430px", foot:"0px",
    foot:0
  };  
  FM_TITLE=fm_ob.title;
  
  if(JBE_MOBILE){ 
    fm_ob.width="95%"; 
    fm_ob.height="290px";
  }
    
  var fm_layout=
    
    '<input id="tx_stock_no" type="text" style="display:none;" value="" />'+
    '<input id="tx_refno" type="text" style="display:none;" value="" />'+
    '<input id="tx_prod_no" type="text" style="display:none;" value="" />'+
    '<input id="tx_prod_type" type="text" style="display:none;" value="" />'+
    '<input id="tx_bundle" type="text" style="display:none;" value="" />'+

    '<div id="div_FM_head" style="width:100%;height:430px;margin-top:0px;text-align:left;padding:5px;border:1px solid lightgray;background:none;">'+

      '<div class="cls_fm_dtl">'+        
        '<div>'+         
          '<span onclick="JBE_SHOW_LOGGER(tx_stock_no.value,&quot;'+FM_TRANS+'&quot;)" style="cursor:help;">Stock Name:</span>'+            
          '<input id="lu_stock_no" type="image" src="gfx/jsearch.png" onclick="lookup_fm_stocks()" />'+
        '</div>'+
        '<input id="tx_stock_name" type="text" data-caption="Stock Name" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_stock_name.id).focus()" />'+        
      '</div>'+
        
      '<input type="file" id="inpfile_stock" data-orig="" data-sel=0 name="inpfile_stock" value="" hidden="hidden" />'+
      '<input id="tx_stock_photo" type="text" data-caption="Photo" style="display:none;" value="" />'+    
      '<div class="cls_fm_dtl" style="height:175px;">'+        
        '<div style="height:25px;">'+
          '<span>Photo:</span>'+
          '<input id="lu_stock_capture" type="image" style="display:'+iif(JBE_MOBILE,'block','none')+';display:none;background:dimgray;" src="gfx/jcam.png" onclick="show_camera(img_stock.src,&quot;&quot;)" />'+
          '<input id="lu_stock_photo" type="image" style="display:'+iif(JBE_MOBILE,'none','block')+';display:block;background:dimgray;overflow:auto;width:auto;max-width:100%;height:auto;max-height:100%;" src="gfx/jcam.png" onclick="JBE_PICK_IMAGE(0,inpfile_stock.id,img_stock.id,&quot;putImg_stock&quot;)" />'+
        '</div>'+  
        '<p>'+
          '<img id="img_stock" data-img="" name="img_stock" src="gfx/avatar.png" onclick="JBE_ZOOM(this.src,&quot;&quot;)" style="height:100%;width:auto;border:1px solid lightgray;"/>'+          
        '</p>'+   
      '</div>'+ 

      '<div class="cls_fm_dtl">'+
        '<div>'+                    
          '<span>Product:</span>'+
          '<input id="lu_prodno" type="image" src="gfx/jsearch.png" onclick="look_prodno_fm_stock()" />'+
        '</div>'+  
        '<input id="tx_prod_name" disabled type="text" data-caption="Product Name" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_prod_no.id).focus()" />'+
      '</div>'+

      '<div class="cls_fm_dtl">'+
        '<div>'+
          '<span id="dv_lotno">Lot No.:</span>'+
          '<input id="lu_lotno" type="image" src="gfx/jsearch.png" onclick="look_lotno_fm_stocks(tx_stock_no.value)" />'+
        '</div>'+  
        '<input id="tx_lotno" readonly type="text" data-caption="Lot Number" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_stock_name.id).focus()" />'+
      '</div>'+
      '<div id="dv_expiry" class="cls_fm_dtl">'+
        '<div>Expiry:</div>'+  
        '<input id="tx_expiry" disabled type="date" data-caption="Expiry" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_expiry.id).focus()" />'+
      '</div>'+
      '<div class="cls_fm_dtl">'+
        '<div>Location:</div>'+  
        //'<select id="tx_loc" name="txt_loc" onchange="txt_locname.innerHTML=tx_loc.options[tx_loc.selectedIndex].text; chg_qty_transfer()" class="class_mtr2" style="float:left;width:50%;color:red;height:100%;padding:0px;">';
        '<select id="tx_loc" name="tx_loc" class="class_mtr2" style="float:left;width:100px;color:blue;height:100%;padding:0px;">';        
          let dtlfld='';            
          for(var i=0;i < DB_WHOUSE.length;i++){
            //if(aryPVC2[i]['clientcode'] != clientcode){ continue; }
            let vsel='';
            //if(v_loc==DB_WHOUSE[i].whcode){ vsel='selected'; }
            dtlfld+='<option '+vsel+' value="'+DB_WHOUSE[i].whcode+'">'+DB_WHOUSE[i].name+'</option>';
          }
          fm_layout+=dtlfld+
        '</select>'+
      '</div>'+
      
      '<div class="cls_fm_dtl">'+
        '<div>Cost:</div>'+  
        '<input id="tx_cost" disabled type="text" data-caption="Cost" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_cost.id).focus()" />'+
      '</div>'+

      '<div class="cls_fm_dtl">'+
        '<div>Unit of Measure:</div>'+  
        '<input id="tx_unit" type="text" data-caption="Unit" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_stock_name.id).focus()" />'+
      '</div>'+

      '<div class="cls_fm_dtl">'+
        '<div>Dosage:</div>'+  
        '<input id="tx_dosage" disabled type="text" data-caption="Dosage" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_dosage.id).focus()" />'+
      '</div>'+
      
    '</div>';
  
  FM_FUNC={
    lu:"lookup_fm_stocks",
    look:"look_fm_stocks",
    init:"init_fm_stocks",
    add:"add_fm_stocks",    
    edit:"edit_fm_stocks",
    del:"del_fm_stocks",
    disp:"disp_fm_stocks",
    save:"save_fm_stocks",
    quit:"quit_fm_stocks",
    add_item:"add_item_fm_stocks"
  }
  FM_MAIN(fm_ob,fm_layout);
  //var fm_layout_height=H_BODY-parseInt(document.getElementById('div_FM_head').style.height);
  //document.getElementById('div_FM_dtl').style.height=(fm_layout_height-70)+'px';
} 

function lookup_fm_stocks(){
  var flds=[
    { title:"", fld:"stockno", type:"text", width:"0%", align:"left" },
    { title:"", fld:"prodno", type:"text", width:"0%", align:"left" },
    { title:"", fld:"loc", type:"text", width:"0%", align:"left" },
    { title:"xDescription", fld:"descrp", type:"text", width:"35%", align:"left" },
    { title:"Product", fld:"get_prod|prodno", type:"text", width:"20%", align:"left" },    
    { title:"Location", fld:"get_loc|loc", type:"text", width:"10%", align:"left" },
    { title:"Lot No", fld:"lotno", type:"text", width:"15%", align:"left" },
    { title:"Expiry", fld:"expiry", type:"date", width:"10%", align:"left" }
    //{ title:"Bundle", fld:"bundle", type:"text", width:"10%", align:"center" }
  ];
  //FM_LOOKUP(true,tx_stock_name.value,FM_TABLE,[],'STOCK LOOKUP','do_lu_fm_stocks','descrp',flds,FM_RKEY);
  var ob=[
    { val:tx_stock_no.value, fld:"stockno" }
  ];
  FM_LOOKUP2(true,tx_stock_name.value,ob,FM_TABLE,['descrp'],'LOOKUP','do_lu_fm_stocks',flds);
}
function do_lu_fm_stocks(ndx){	  
  if(ndx == -1){ 
    FM_INIT_REC();
    return; 
  }
  let val=document.getElementById('dd_stockno'+ndx).innerHTML;  
  let prodno=document.getElementById('dd_prodno'+ndx).innerHTML;
  let prodname=JBE_GETFLD('prodname',DB_PRODUCT,'prodno',prodno);
  //let bundle=document.getElementById('dd_bundle'+ndx).innerHTML;
  //let bundlename=JBE_GETFLD('descrp',DB_STOCK,'stockno',bundle); 
  let cost=JBE_GETFLD('cost',DB_STOCK,'stockno',val);
  document.getElementById('tx_stock_no').value=val; 
  document.getElementById('tx_prod_name').value=prodname;  
  //document.getElementById('tx_bundlename').value=bundlename;     
  //document.getElementById('tx_cost').value=JBE_FORMAT_STR_TO_DOUBLE(cost);
  document.getElementById('tx_cost').value=cost;  
  let n = new Date().toLocaleTimeString('it-IT');
  let img='upload/'+val+'.jpg?'+n;
  document.getElementById('img_stock').src=img; 
  FM_DISP_REC(val);
}

function look_lotno_fm_stocks(stockno){
  //alert('look_lotno '+stockno);
  /*
  var newArr = DB_RECEIVE2.filter(function(DB_RECEIVE2) {
    return DB_RECEIVE2.stockno == stockno;
  });  
  */
  var newArr = DB_TRANSFER2.filter(function(DB_TRANSFER2) {
    return DB_TRANSFER2.stockno == stockno;
  });
  var flds=[    
    { title:"", fld:"stockno", type:"text", ret:1, width:"25%", align:"left" },
    { title:"", fld:"loc", type:"text", ret:1, width:"25%", align:"left" },
    { title:"Lot Number", fld:"lotno", type:"text", ret:1, width:"20%", align:"left" },    
    { title:"Description", fld:"descrp", type:"text", ret:0, width:"30%", align:"left" },    
    { title:"Location", fld:"get_loc|loc", type:"text", ret:1, width:"10%", align:"center" },
    { title:"Expiry", fld:"expiry", type:"date", ret:1, width:"15%", align:"center" },
    { title:"Cost", fld:"cost", type:"double", ret:1, width:"10%", align:"center" },
    { title:"RR No.", fld:"refno", type:"text", ret:0, width:"15%", align:"center" }
  ];
  //FM_LOOKUP(true,tx_lotno.value,newArr,[],'LOOKUP','do_lu_lotno','lotno',flds,'lotno');
  var ob=[
    { val:tx_stock_no.value, fld:"stockno" },
    { val:tx_lotno.value, fld:"lotno" },
    { val:tx_refno.value, fld:"refno" }
  ];
  FM_LOOKUP2(true,tx_lotno.value,ob,newArr,['lotno','trano'],'LOOKUP','do_lu_lotno_fm_stocks',flds);
  //FM_LOOKUP2(true,tx_lotno.value,ob,newArr,['*descrp'],'LOOKUP','do_lu_lotno',flds);
}
function do_lu_lotno_fm_stocks(ndx){	  
  if(ndx == -1){ 
    return; 
  }
  let val=document.getElementById('dd_lotno'+ndx).innerHTML;
  document.getElementById('tx_lotno').value=val;
  document.getElementById('tx_refno').value=document.getElementById('dd_refno'+ndx).innerHTML;
  
  let expiry=document.getElementById('dd_expiry'+ndx).innerHTML;
  let cost=document.getElementById('dd_cost'+ndx).innerHTML;
  let loc=document.getElementById('dd_loc'+ndx).innerHTML;
  document.getElementById('tx_loc').value=loc;
  document.getElementById('tx_expiry').value=expiry;
  document.getElementById('tx_cost').value=JBE_FORMAT_STR_TO_DOUBLE(cost);
}
///////////////////////////////////////////////////////////////////////////////////

function look_prodno_fm_stocks(){
  var flds=[    
    { title:"", fld:"prodno", type:"text", width:"0%", align:"left" },
    { title:"Product Name", fld:"prodname", type:"text", width:"50%", align:"left" },
    { title:"Type", fld:"type", type:"number", width:"50%", align:"left" }
  ];
  //FM_LOOKUP(true,tx_prod_name.value,DB_PRODUCT,[],'LOOKUP','do_lu_prodno','prodname',flds,'prodno');
  var ob=[
    { val:tx_prod_no.value, fld:"prodno" }
  ];
  FM_LOOKUP2(true,tx_prod_name.value,ob,DB_PRODUCT,[],'LOOKUP','do_lu_prodno',flds);
}
function do_lu_prodno(ndx){  
  if(ndx == -1){ 
    document.getElementById('tx_prod_name').value='';
    document.getElementById('tx_prod_type').value='';
    return; 
  }
  let type=document.getElementById('dd_type'+ndx).innerHTML;
  document.getElementById('tx_prod_no').value=document.getElementById('dd_prodno'+ndx).innerHTML;
  document.getElementById('tx_prod_name').value=document.getElementById('dd_prodname'+ndx).innerHTML;
  document.getElementById('tx_prod_type').value=type;
  chg_prodType_stock(type);
}

function chg_prodType_stock(type){
  return;
  if(type==3){ //equiptment
    document.getElementById('dv_lotno').innerHTML='Model/Serial No.:';
    document.getElementById('dv_expiry').style.pointerEvents='none';
    document.getElementById('dv_expiry').style.opacity='0.5';
    document.getElementById('tx_lotno').readOnly = false;
  }else{
    document.getElementById('dv_lotno').innerHTML='Lot No.:';
    document.getElementById('dv_expiry').style.pointerEvents='auto';
    document.getElementById('dv_expiry').style.opacity='1';
    document.getElementById('tx_lotno').readOnly = true;
  }
}

///////////////////////////////////////////////////////////////////////////////////
function lookup_bundleno_fm_stocks(){
  //alert('look_bundleno_fm_stocks '+stockno);
  /*
  var newArr = DB_RECEIVE2.filter(function(DB_RECEIVE2) {
    return DB_RECEIVE2.stockno == stockno;
  });  
  
  var newArr = DB_TRANSFER2.filter(function(DB_TRANSFER2) {
    return DB_TRANSFER2.stockno == stockno;
  });
  */
  var flds=[        
    { title:"Bundle No.", fld:"stockno", type:"text", ret:0, width:"20%", align:"left" },    
    { title:"Description", fld:"descrp", type:"text", ret:0, width:"80%", align:"left" }
  ];
  
  var ob=[
    { val:txt_stockno.innerHTML, fld:"stockno" },  
  ];  
  console.log(DB_STOCK);
  FM_LOOKUP2(true,txt_bundle_name.innerHTML,ob,DB_STOCK,['descrp'],'LOOKUP','do_lu_bundleno_fm_stocks',flds);
}
function do_lu_bundleno_fm_stocks(ndx){	  
  if(ndx == -1){ 
    return; 
  }
  let val=document.getElementById('dd_stockno'+ndx).innerHTML;
  document.getElementById('txt_bundle_no').innerHTML=val;  
  document.getElementById('txt_bundle_name').innerHTML=document.getElementById('dd_descrp'+ndx).innerHTML;
  console.log(val,txt_bundle_no.innerHTML,txt_bundle_name.innerHTML,txt_bundle_multi.value)
}

function putImg_stock(){
  var vimg=document.getElementById('img_stock').getAttribute('data-img');  
  document.getElementById('tx_stock_photo').value=vimg;
  //alert('vimg:'+vimg);

  let img=document.getElementById('img_stock').src;
  document.getElementById('tx_b64').value=img;
  //alert('img:'+img);

}

function add_item_fm_stocks(f_add){
  var curRow=document.getElementById('div_FM_dtl_div2').getAttribute('data-row');
  var recno=document.getElementById('tx_stock_no').value;  
  if(!recno){ 
    snackBar('Ref. No. is Empty.');
    document.getElementById('tx_stock_no').focus();
    return false;
  }
  
  var len_dtls=document.querySelectorAll('.dtls').length;   
  if(len_dtls==0 && !f_add){ 
    snackBar('Cannot Edit empty record');
    return false;
  }

  let v_vaccine='';  
  let v_qty='';  
  let v_stockno=recno;  
  let v_bundle_no='';  

  if(!f_add){
    v_bundle_no=document.getElementById('dtl_bundle_no_'+curRow).innerHTML;
    v_vaccine=get_descrp(v_bundle_no);
    v_qty=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_bundle_multi_'+curRow).innerHTML);            
    
  }

  //alert(f_add+' ::: v_loc:'+v_loc);
    
  let v_head='Add';
  if(!f_add){ v_head='Edit'; }

  var dtl=          
    '<div id="div_name" data-zoom=0 style="width:100%;height:100%;font-text:14px;padding:5px;background-color:white;">'+         
      '<div style="width:100%;height:25px;padding:4px;font-size:14px;font-weight:bold;color:white;background:'+JBE_CLOR2+';">'+
        '<span style="float:left;width:auto;">'+v_head+' Item</span>'+
        '<span style="float:right;width:auto;">Stock Facility</span>'+        
      '</div>'+
      '<div class="class_mtr0" style="display:none;margin-top:5px;">'+                                
        '<span id="txt_stockno" class="class_mtr2" style="width:50%;color:red;">'+v_stockno+'</span>'+
        '<span id="txt_bundle_no" class="class_mtr2" style="width:50%;color:red;">'+v_bundle_no+'</span>'+
      '</div>'+ 
      
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Vaccine:</span>'+        
        '<span id="txt_bundle_name" class="class_mtr2" style="width:50%;color:red;overflow:auto;">'+v_vaccine+'</span>'+
        '<button id="btn_bundle_name" style="float:right;width:40px;height:100%;font-weight:bold;margin-right:3px;border-radius:5px;color:white;background:'+JBE_CLOR+';" onclick="lookup_bundleno_fm_stocks()">...</button>'+        
      '</div>'+ 

      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Quantity:</span>'+        
        '<input id="txt_bundle_multi" type="number"  class="class_mtr2" style="color:red;overflow:auto;" value="'+v_qty+'" />'+
      '</div>'+
      
    '</div>';
  //JBE_OPEN_VIEW(dtl,'','');
  JBE_SHOW_MODULE(true,dtl);
  return true;
}

//
function init_fm_stocks(){  
  document.getElementById('tx_stock_no').value='';
  document.getElementById('tx_prod_name').value='';
  //document.getElementById('tx_bundlename').value='';
  //document.getElementById('tx_bundle_multi').value='';
  document.getElementById('tx_cost').value='';
  document.getElementById('lu_stock_no').disabled=false;
  document.getElementById('lu_stock_no').style.opacity='1';
  document.getElementById('lu_stock_photo').style.pointerEvents='none';
  document.getElementById('lu_stock_photo').style.opacity='0.5';
  document.getElementById('lu_stock_capture').style.pointerEvents='none';
  document.getElementById('lu_stock_capture').style.opacity='0.5';
  document.getElementById('lu_lotno').style.pointerEvents='none';
  document.getElementById('lu_lotno').style.opacity='0.5';
  document.getElementById('lu_prodno').style.pointerEvents='none';
  document.getElementById('lu_prodno').style.opacity='0.5';
  //document.getElementById('lu_bundle').style.pointerEvents='none';
  //document.getElementById('lu_bundle').style.opacity='0.5';
  document.getElementById('img_stock').src='gfx/avatar.png';
}
//
function add_fm_stocks(){
  document.getElementById('img_stock').src='gfx/avatar.png';
  document.getElementById('lu_stock_no').disabled=true;
  document.getElementById('lu_stock_no').style.opacity='0.5';

  document.getElementById('lu_stock_photo').style.pointerEvents='auto';
  document.getElementById('lu_stock_photo').style.opacity='1';

  document.getElementById('lu_stock_capture').style.pointerEvents='auto';
  document.getElementById('lu_stock_capture').style.opacity='1';

  document.getElementById('lu_lotno').style.pointerEvents='auto';
  document.getElementById('lu_lotno').style.opacity='1';
  document.getElementById('tx_lotno').readOnly = false;

  document.getElementById('lu_prodno').style.pointerEvents='auto';
  document.getElementById('lu_prodno').style.opacity='1';
  document.getElementById('tx_prod_name').disabled=true;
  
  //document.getElementById('tx_bundle_multi').value = false;
  document.getElementById('tx_stock_name').focus();
}
//edit
function edit_fm_stocks(){
  document.getElementById('lu_stock_no').disabled=true;
  document.getElementById('lu_stock_no').style.opacity='0.5';

  document.getElementById('lu_stock_photo').style.pointerEvents='auto';
  document.getElementById('lu_stock_photo').style.opacity='1';

  document.getElementById('lu_stock_capture').style.pointerEvents='auto';
  document.getElementById('lu_stock_capture').style.opacity='1';

  document.getElementById('lu_lotno').style.pointerEvents='auto';
  document.getElementById('lu_lotno').style.opacity='1';
  document.getElementById('tx_lotno').disabled = true;
  document.getElementById('tx_expiry').disabled = true;

  document.getElementById('lu_prodno').style.pointerEvents='auto';
  document.getElementById('lu_prodno').style.opacity='1';
  document.getElementById('tx_prod_no').disabled = true;
  document.getElementById('tx_prod_name').disabled=true;

  //document.getElementById('lu_bundle').style.pointerEvents='auto';
  //document.getElementById('lu_bundle').style.opacity='1';
  //document.getElementById('tx_bundlename').disabled = true;
  document.getElementById('tx_cost').disabled = true;

  document.getElementById('tx_loc').style.pointerEvents='auto';
  
  console.log(document.getElementById('tx_stock_name').value);
  document.getElementById('tx_stock_name').focus();
}
//look
function look_fm_stocks(fld){
  //if(fld=='stockno'){ 
    disp_fm_stocks();
  //}  
}
//del
function del_fm_stocks(stat,r){
  if(stat==1){ 
    //let refno=JBE_REC_EXIST(DB_RECEIVE2,FM_RKEY,document.getElementById('tx_stock_no').value,'trano');
    let refno=JBE_GETFLD('trano',DB_RECEIVE2,'stockno',document.getElementById('tx_stock_no').value);
    //alert(refno);
    if(refno){
      MSG_SHOW(vbOk,"DENIED: ","Can't Delete, Record is used in Receiving File No:"+refno,function(){},function(){}); 
      return false; 
    }
  }
  if(stat==2){ DB_STOCK=r; } 
}

//save
function save_fm_stocks(stat,r){
  //alert('stat :'+stat+' r:'+r);
  //var recno=document.getElementById('tx_stock_no').value;    
  let prodno=document.getElementById('tx_prod_no').value;    
  if(stat==0){
    /*
    let ob=[      
      { fld:"date",val:document.getElementById('tx_date').value }
    ];
    */
    return [];
  }    
  if(stat==1){    
    if(!prodno){
      MSG_SHOW(vbOk,"ERROR: ","Can't Save, Product field is Empty.",function(){},function(){}); 
      return false; 
    }
  }

  if(stat==2){
    //let filenm=document.getElementById('tx_stock_photo').value;
    //let fileExt = filenm.split('.').pop();
    //alert('filename:'+filenm+'\nfileEXT:'+fileExt);
    var targetDIR='upload/';
    var newName = tx_stock_no.value.trim() + '.jpg';
    //alert(THISFILE[0]);
    
    if(THISFILE[0]){     
      //alert('going to save image...');
      let ob = [
        { "div":"img_stock" }
      ];
      uploadNOW(THISFILE[0],newName,targetDIR,ob,false,false); 
      DB_STOCK=r; 
    }      
  }
  if(stat==3){
    DB_STOCK2=r; 
  }
}


  


//disp
function disp_fm_stocks(){   
  //alert('disp_fm_stocks ');
  let n = new Date().toLocaleTimeString('it-IT');  
  let img='upload/'+tx_stock_no.value.trim()+'.jpg?'+n;
  document.getElementById('img_stock').src=img;
  // USAGE
  /*
  checkIfImageExists(img, (exists) => {
    if(exists) {
      console.log('Image exists.');
      document.getElementById('img_stock').src=img;
      //img_stock.src=img;
    }else{
      alert('wala');
      //document.getElementById('img_stock').src="gfx/avatar.png";
      //img_stock.src="gfx/avatar.png";
    }
  });
  */
  
  //img_stock.src=img;
  //img_stock.onerror=img_stock.onerror=null;img_stock.src="gfx/jsite.png"; 
  //if(img_stock.onerror=img_stock.onerror=null){ img_stock.src="gfx/jsite.png"; }
  //if(!img_stock.src){ alert('wala'); }
  //alert(img);
  
  document.getElementById('lu_stock_no').disabled=false;
  document.getElementById('lu_stock_no').style.opacity='1';  
  
  document.getElementById('lu_stock_photo').style.pointerEvents='none';
  document.getElementById('lu_stock_photo').style.opacity='0.5';

  document.getElementById('lu_stock_capture').style.pointerEvents='none';
  document.getElementById('lu_stock_capture').style.opacity='0.5';

  document.getElementById('lu_lotno').style.pointerEvents='none';
  document.getElementById('lu_lotno').style.opacity='0.5';
  document.getElementById('lu_prodno').style.pointerEvents='none';
  document.getElementById('lu_prodno').style.opacity='0.5';

  //document.getElementById('lu_bundle').style.opacity='0.5';
  //document.getElementById('tx_bundlename').disabled = true;
  //document.getElementById('tx_prod_name').value=JBE_GETFLD('prodname',DB_PRODUCT,'prodno',document.getElementById('tx_prod_no').value);
  //recno=document.getElementById('tx_stock_no').value;
  let bundlename=JBE_GETFLD('descrp',DB_STOCK,'stockno',tx_bundle.value); 
  //document.getElementById('tx_bundlename').value=bundlename;
  //alert(tx_prod_type.value);
  document.getElementById('dv_expiry').style.display='block';
  chg_prodType_stock(tx_prod_type);  
}

function checkIfImageExists(url, callback) {
  const img = new Image();
  img.src = url;
  
  if (img.complete) {
    callback(true);
  } else {
    img.onload = () => {
      callback(true);
    };
    
    img.onerror = () => {
      callback(false);
    };
  }
}

//
function quit_fm_stocks(){   
  FM_REC2_EMPTY=false;
  return;
}