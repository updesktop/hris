function fm_receive(cb){  
  FM_TRANS='RR';
  FM_FM_MODE=2;
  FM_TABLE=DB_RECEIVE;    FM_TABLE_NAME='receive';
  FM_TABLE2=DB_RECEIVE2;  FM_TABLE_NAME2='receive2';
  FM_RKEY='trano';   FM_RKEY2='stockno';
  FM_CB=cb;

  FM_FIELDS=[ //display on screen; disp:1s and disp:0s 
    { div:"tx_trano", fld:"trano", type:"text", disp:1, save:true },
    { div:"tx_date", fld:"date", type:"date", disp:1, save:true },
    { div:"tx_refno", fld:"refno", type:"text", disp:1, save:true },
    { div:"tx_supplier", fld:"supplier", type:"text", disp:1, save:true },
    { div:"tx_suppno", fld:"suppno", type:"text", disp:0, save:true }
  ];
  
  FM_FIELDS2=[ //display on screen
    { hd:"", fld:"stockno", type:"text", input:false, width:"10%", align:"center", dupli:1, err:"Please enter an Item.", disp:0, save:true },
    { hd:"", fld:"trano", type:"text", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },
    { hd:"", fld:"date", type:"text", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },
    { hd:"", fld:"suppno", type:"text", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },
    { hd:"", fld:"type", type:"text", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },
    { hd:"", fld:"loc", type:"number", input:true, width:"10%", align:"center", dupli:0, err:"Please enter Location.", disp:0, save:true },
    { hd:"Description", fld:"descrp", type:"text", input:false, width:"25%", align:"left", dupli:0, err:"Please enter an Item.", disp:1, save:true },
    //{ hd:"Description", fld:"get_descrp|stockno", type:"text", input:false, width:"25%", align:"left", dupli:0, err:"Please enter an Item.", disp:1, save:true },
    { hd:"", fld:"date_aq", type:"date", input:true, width:"23%", align:"left", dupli:0, err:"Please enter Date Acquired.", disp:0, save:true },
    { hd:"Lots / Serial Number", fld:"lotno", type:"text", input:true, width:"16%", align:"left", dupli:1, err:"Please enter Batch/Lot No.", disp:1, save:true },
    { hd:"Loc", fld:"get_loc|loc", type:"text", input:false, width:"9%", align:"center", dupli:0, err:"", disp:1, save:false },
    { hd:"Expiry Date", fld:"expiry", type:"date", input:true, width:"10%", align:"center", dupli:0, err:"Please enter Expiry Date.", disp:1, save:true },
    { hd:"QTY", fld:"qty", type:"number", input:true, width:"10%", align:"center", dupli:0, err:"Please enter Quantity.", disp:1, save:true },
    { hd:"Unit Cost", fld:"cost", type:"double", input:true, width:"15%", align:"center", dupli:0, err:"Please enter Unit Cost.", disp:1, save:true },
    { hd:"Total", fld:"amount", type:"doubleText", input:false, width:"15%", align:"right", dupli:0, err:"Please enter Amount.", disp:1, save:true }    
  ];
    
  var fm_ob = {
    title:"RECEIVED MASTER FILE",  
    title2:"RECEIVED",
    width:"800px",height:"270px",
    head:"100px", foot:"30px",
    foot_dtl:
      '<div style="width:100%;height:100%;font-size:14px;font-weight:bold;padding:3px 0 0 0;background:none;">'+
        '<div id="tx_total" style="float:right;padding:2px;width:105px;height:100%;margin-right:0px;text-align:right;border:1px solid lightgray;"></div>'+
        '<div style="float:right;padding:3px;width:auto;margin-right:5px;">Total:</div>'+
      '</div>'
  };  
  FM_TITLE=fm_ob.title;
  
  if(JBE_MOBILE){ 
    fm_ob.width="95%"; 
    fm_ob.height="290px";
  }
    
  var fm_layout_width='15';
  if(JBE_MOBILE){ fm_layout_width='33'; }

  var fm_layout=
    
    '<input id="tx_suppno" type="text" style="display:none;" value="" />'+

    '<div id="div_FM_head" style="width:100%;height:'+fm_ob.head+';margin-top:0px;text-align:left;padding:5px;border:1px solid lightgray;background:none;">'+

      '<div class="cls_fm_dtl">'+        
        '<div style="width:'+fm_layout_width+'%;">'+    
          '<span onclick="JBE_SHOW_LOGGER(tx_trano.value,&quot;'+FM_TRANS+'&quot;)" style="float:left;cursor:help;">Doc No.:</span>'+                      
          '<input id="lu_trano" type="image" src="gfx/jsearch.png" onclick="lookup_fm_receive(tx_trano.value)" />'+
        '</div>'+
        '<input id="tx_trano" type="text" style="width:27%;overflow:auto;" data-docno="" onchange="FM_CHK_REC(tx_trano.value)" data-caption="Transaction No." value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_trano.id).focus()" />'+
        
        '<input id="tx_refno" type="text" style="float:right;width:26%;" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_date.id).focus()" />'+
        '<div style="float:right;text-align:right;width:auto;margin-right:1%;background:none;">Ref#:</div>'+
      '</div>'+

      '<div class="cls_fm_dtl">'+
        '<div style="width:'+fm_layout_width+'%;">Date:</div>'+  
        '<input id="tx_date" type="date" style="width:27%;" data-caption="Date" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_date.id).focus()" />'+        
      '</div>'+      
   
      '<div class="cls_fm_dtl">'+        
        '<div style="width:'+fm_layout_width+'%;">From:'+                    
          '<input id="lu_suppno" type="image" src="gfx/jsearch.png" onclick="lookup_supplier_fm_receive(tx_trano.value)" />'+
        '</div>'+
        '<input id="tx_supplier" type="text" style="width:40%;" data-caption="Supplier Name" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_supplier.id).focus()" />'+
      '</div>'+

    '</div>';
      
  FM_FUNC={
    lu:"do_lu_fm_receive",
    look:"look_fm_receive",
    init:"init_fm_receive",
    add:"add_fm_receive",    
    edit:"edit_fm_receive",
    del:"del_fm_receive",
    disp:"disp_fm_receive",
    save:"save_fm_receive",
    quit:"quit_fm_receive",
    add_item:"add_item_fm_receive"
  }
  FM_MAIN(fm_ob,fm_layout);
} 

function lookup_fm_receive(){  
  var flds=[
    { title:"Doc. No", fld:"trano", type:"text", width:"20%", align:"left" },
    { title:"Date", fld:"date", type:"date", width:"20%", align:"left" },
    { title:"Supplier", fld:"supplier", type:"text", width:"40%", align:"left" },
    { title:"Reference#", fld:"refno", type:"text", width:"20%", align:"left" }       
  ];
  //FMx_LOOKUP(true,tx_trano.value,FM_TABLE,[],'LOOKUP','do_lu_fm_receive','trano',flds,'trano');
  var ob=[
    { val:tx_trano.value, fld:"trano" }
  ];
  FM_LOOKUP2(true,tx_trano.value,ob,FM_TABLE,['*trano'],'LOOKUP','do_lu_fm_receive',flds);
}
function do_lu_fm_receive(ndx){	
  let val=document.getElementById('dd_trano'+ndx).innerHTML;
  document.getElementById('tx_trano').innerHTML=val;
  if(ndx == -1){ 
    FM_INIT_REC();
    return; 
  }
  FM_DISP_REC(val); 
  look_fm_receive();
}

function lookup_stock_fm_receive(){
  var flds=[    
    { title:"", fld:"stockno", type:"text", width:"0%", align:"center" },  
    { title:"", fld:"loc", type:"number", width:"0%", align:"center" },  
    { title:"Stock Name", fld:"descrp", type:"text", width:"40%", align:"center" },  
    { title:"Type", fld:"type", type:"text", width:"10%", align:"center" },
    { title:"Lot / Serial No.", fld:"lotno", type:"text", width:"20%", align:"center" },
    { title:"Loc.", fld:"get_loc|loc", type:"text", width:"10%", align:"center" },
    { title:"Expiry", fld:"expiry", type:"date", width:"10%", align:"center" },
    { title:"Cost", fld:"cost", type:"double", width:"10%", align:"center" }    
  ];
  //FMx_LOOKUP(true,txt_descrp.innerHTML,DB_STOCK,[],'LOOKUP','do_lookup_stock_fm_receive','descrp',flds,'stockno');
  var ob=[
    { val:txt_stockno.innerHTML, fld:"stockno" },
    { val:txt_lotno.value, fld:"lotno" }
  ];
  FM_LOOKUP2(true,txt_descrp.innerHTML,ob,DB_STOCK,[],'LOOKUP','do_lookup_stock_fm_receive',flds);
}
function do_lookup_stock_fm_receive(ndx){	     
  if(ndx == -1){ 
    document.getElementById('txt_descrp').innerHTML='';  
    document.getElementById('txt_type').innerHTML='';    
    document.getElementById('txt_lotno').value='';
    document.getElementById('txt_expiry').value='';
    document.getElementById('txt_cost').value='';
    document.getElementById('txt_qty').value='';
    document.getElementById('txt_amount').innerHTML='';
    return; 
  }
  let val=document.getElementById('dd_stockno'+ndx).innerHTML;
  document.getElementById('txt_stockno').innerHTML=val;
  let type=JBE_GETFLD('type',DB_STOCK,'stockno',val); 
  document.getElementById('txt_descrp').innerHTML=document.getElementById('dd_descrp'+ndx).innerHTML;
  
  document.getElementById('txt_type').innerHTML=type;
  
  document.getElementById('txt_lotno').value=document.getElementById('dd_lotno'+ndx).innerHTML;
  document.getElementById('txt_expiry').value=document.getElementById('dd_expiry'+ndx).innerHTML;
  document.getElementById('txt_cost').value=JBE_FORMAT_STR_TO_DOUBLE(document.getElementById('dd_cost'+ndx).innerHTML);
  document.getElementById('txt_loc').value=document.getElementById('dd_loc'+ndx).innerHTML;

  
  let vcost=document.getElementById('txt_cost').value;
  let vqty=document.getElementById('txt_qty').value;
  //alert(vqty+' vs '+vcost);  
  /*
  let vcost=Number(document.getElementById('txt_cost').value);
  let vqty=Number(document.getElementById('txt_qty').value);
  //alert(vqty+' vs '+vcost);
  if(!vcost || vcost==0){    
    vcost=getCost(val);
    let amt=vqty*vcost;
    document.getElementById('txt_cost').value=JBE_FORMAT_DOUBLE_TO_STR(vcost);
    document.getElementById('txt_amount').innerHTML=JBE_FORMAT_DOUBLE_TO_STR(amt);
  }
  */
  //chg_prodType_rcv(type);
  let amt=vqty*vcost;
  document.getElementById('txt_amount').innerHTML=JBE_FORMAT_DOUBLE_TO_STR(amt);
}  

function chg_prodType_rcv(type){
  return;
  document.getElementById('dv_expiry').style.pointerEvents='auto';
  document.getElementById('dv_expiry').style.opacity='1';
  if(type==3){
    document.getElementById('dv_expiry').style.pointerEvents='auto';
    //document.getElementById('dv_expiry').style.opacity='0.5';
    document.getElementById('txt_expiry').value='2024-02-27';
  }
}

function getCost(stockno){
  //alert(stockno);
  let rval=0;
  var newArr = DB_RECEIVE2.filter(function(DB_RECEIVE2) {
    return DB_RECEIVE2.stockno == stockno;
  });
  if(newArr.length>0){ 
    newArr.sort(JBE_SORT_ARRAY(['date']));
    rval=newArr[newArr.length-1].cost;
    //alert('rval:'+rval);
  }
  return JBE_FORMAT_DOUBLE_TO_STR(rval);
}

function chgCost(stockno){
  let cost=Number(document.getElementById('txt_cost').value);
  if(cost){ return; }

  let qty=Number(document.getElementById('txt_qty').value);
  let newArr = DB_RECEIVE2.filter(function(DB_RECEIVE2) {
    return DB_RECEIVE2.stockno == stockno;
  });
  if(newArr.length>0){ 
    newArr.sort(JBE_SORT_ARRAY(['date']));
    cost=Number(newArr[newArr.length-1].cost);
  }
  let amt=qty*cost;
  document.getElementById('txt_cost').value=JBE_FORMAT_DOUBLE_TO_STR(cost);
  document.getElementById('txt_amount').innerHTML=JBE_FORMAT_DOUBLE_TO_STR(amt);
}

function lookup_supplier_fm_receive(suppno){
  //alert('suppno:'+suppno);
  var flds=[    
    { title:"Supplier Name", fld:"name", type:"text", width:"50%", align:"center" },
    { title:"Supplier No", fld:"suppno", type:"text", width:"50%", align:"center" }
  ];
  //FMx_LOOKUP(true,tx_supplier.value,DB_SUPPLIER,[],'LOOKUP','do_lu_supplier_fm_receive','name',flds,'suppno');
  var ob=[
    { val:tx_suppno.value, fld:"suppno" }
  ];
  FM_LOOKUP2(true,tx_supplier.value,ob,DB_SUPPLIER,[],'LOOKUP','do_lu_supplier_fm_receive',flds);
}
function do_lu_supplier_fm_receive(ndx){  
  if(ndx == -1){ 
    document.getElementById('tx_supplier').value='';
    return; 
  }
  let val=document.getElementById('dd_suppno'+ndx).innerHTML;
  document.getElementById('tx_suppno').value=val;
  document.getElementById('tx_supplier').value=document.getElementById('dd_name'+ndx).innerHTML;
}


//
function init_fm_receive(){  
  document.getElementById('tx_trano').value='';
  document.getElementById('lu_trano').disabled=false;
  document.getElementById('lu_trano').style.opacity='1';  
  document.getElementById('lu_suppno').disabled=true;
  document.getElementById('lu_suppno').style.opacity='0.5'; 
  document.getElementById('tx_total').innerHTML=JBE_FORMAT_DOUBLE_TO_STR(0);
}
//
function add_fm_receive(){
  /*
  document.getElementById('lu_trano').disabled=true;
  document.getElementById('lu_trano').style.opacity='0.5';  
  document.getElementById('tx_supplier').disabled=true;
  document.getElementById('lu_suppno').disabled=false;
  document.getElementById('lu_suppno').style.opacity='1'; 
  document.getElementById('tx_date').value=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');
  document.getElementById('tx_trano').focus();
  */
  let prfx='RR-';
  let last_trano='1';
  let v_date=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');

  let sql='SELECT * FROM receive ORDER BY trano';
  axios.get(FM_API, { params: {sql:sql,fld:'',tbl:FM_TABLE_NAME,fm_mode:1 }}, {headers: { 'Content-Type': 'application/json' }})  
  .then(function (response) { 
    let newArr=response.data;
    console.log(newArr);
    if(newArr.length > 0){
      last_trano=newArr[newArr.length-1].trano; 
      last_date=JBE_DATE_FORMAT(DB_RECEIVE[DB_RECEIVE.length-1].date,'YYYY-MM-DD');
    }
    var new_trano=prfx;
    var v_num=0;
    
    if(last_trano.substring(0,3) == new_trano){
      v_num=parseInt(last_trano.substring(3,17))+1;
    }else{
      v_num=1;
    }
    new_trano=new_trano+v_num.toString().padStart(5,0);  
    document.getElementById('tx_trano').value=new_trano;  
    document.getElementById('tx_trano').disabled=false;
    document.getElementById('tx_date').value=v_date;
    console.log('new_trano:'+new_trano);
    
    FM_FORCE_ADDREC(FM_TRANS,new_trano,'edit_fm_receive','tx_trano');
    
  })    
  .catch(function (error) { console.log(error); });
}
//
function add_item_fm_receive(f_add){
  //alert('add_item_fm_receive:'+f_add)
  var curRow=document.getElementById('div_FM_dtl_div2').getAttribute('data-row');
  var recno=document.getElementById('tx_trano').value;
  var v_suppno=document.getElementById('tx_suppno').value;
  var v_supplier=document.getElementById('tx_supplier').value;
  var v_date=document.getElementById('tx_date').value;
  
    
  if(!recno){ 
    snackBar('Ref. No. is Empty.');
    document.getElementById('tx_trano').focus();
    return false;
  }
  if(!v_date){ 
    snackBar('Date is Empty.');
    document.getElementById('tx_date').focus();
    return false;
  }

  if(!v_supplier){ 
    snackBar('Supplier is Empty.');
    //document.getElementById('tx_trano').focus();
    return false;
  }

  var len_dtls=document.querySelectorAll('.dtls').length;   
  if(len_dtls==0 && !f_add){ 
    snackBar('Cannot Edit empty record');
    return false;
  }

  let v_vaccine='';
  let v_stockno='';  
  let v_type='';  
  let v_qty='';
  let v_cost='';
  let v_amount=0;
  let v_date_aq=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');
  let v_lotno='';
  let v_loc=0;
  let v_expiry='';
  let v_trano=recno;  
  //v_trano=document.getElementById('dtl_trano_'+curRow).innerHTML;
  if(!f_add){
    v_vaccine=document.getElementById('dtl_descrp_'+curRow).innerHTML;    
    v_date_aq=JBE_DATE_FORMAT(document.getElementById('dtl_date_aq_'+curRow).innerHTML,'YYYY-MM-DD');
    v_lotno=document.getElementById('dtl_lotno_'+curRow).innerHTML;
    v_loc=document.getElementById('dtl_loc_'+curRow).innerHTML;
    v_expiry=JBE_DATE_FORMAT(document.getElementById('dtl_expiry_'+curRow).innerHTML,'YYYY-MM-DD');
    v_stockno=document.getElementById('dtl_stockno_'+curRow).innerHTML;
    v_type=document.getElementById('dtl_type_'+curRow).innerHTML;

    v_qty=document.getElementById('dtl_qty_'+curRow).innerHTML;
    v_cost=document.getElementById('dtl_cost_'+curRow).innerHTML;
    v_amount=document.getElementById('dtl_amount_'+curRow).innerHTML;    

    v_qty=JBE_FORMAT_STR_TO_NUMBER(v_qty);
    v_cost=JBE_FORMAT_STR_TO_DOUBLE(v_cost);
  }  
  
    
  let v_head='Add';
  if(!f_add){ v_head='Edit'; }

  var dtl=          
    '<div id="div_name" data-zoom=0 style="width:100%;height:100%;font-text:14px;padding:5px;background-color:white;">'+         
      '<div style="width:100%;height:25px;padding:4px;font-size:14px;font-weight:bold;color:white;background:'+JBE_CLOR2+';">'+
        '<span style="float:left;width:auto;">'+v_head+' Item</span>'+
        '<span style="float:right;width:auto;">Stock Receiving Facility</span>'+        
      '</div>'+
      '<div class="class_mtr0" style="display:none;margin-top:5px;">'+                        
        '<span id="txt_trano" class="class_mtr2" style="width:50%;color:red;">'+v_trano+'</span>'+
        '<span id="txt_stockno" class="class_mtr2" style="width:50%;color:red;">'+v_stockno+'</span>'+
        '<span id="txt_type" class="class_mtr2" style="width:50%;color:red;">'+v_type+'</span>'+
        '<span id="txt_suppno" class="class_mtr2" style="width:50%;color:red;">'+v_suppno+'</span>'+
        '<span id="txt_date" class="class_mtr2" style="width:50%;color:red;">'+v_date+'</span>'+       
      '</div>'+ 

      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Description:</span>'+        
        '<span id="txt_descrp" class="class_mtr2" style="width:50%;color:red;overflow:auto;">'+v_vaccine+'</span>'+
        '<button id="btn_descrp" style="float:right;width:40px;height:100%;font-weight:bold;margin-right:3px;border-radius:5px;color:white;background:'+JBE_CLOR+';" onclick="lookup_stock_fm_receive()">...</button>'+        
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Date Acquired:</span>'+        
        '<input type="date" id="txt_date_aq" class="class_mtr2" style="color:red;overflow:auto;" value="'+v_date_aq+'" />'+
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Lot / Serial No.:</span>'+        
        '<input type="text" id="txt_lotno" class="class_mtr2" style="color:red;overflow:auto;" value="'+v_lotno+'" />'+
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Location:</span>'+        
        '<select id="txt_loc" name="txt_loc" class="class_mtr2" style="float:left;width:50%;color:red;height:100%;padding:0px;">';
          var dtlfld='';            
          for(var i=0;i < DB_WHOUSE.length;i++){
            //if(aryPVC2[i]['clientcode'] != clientcode){ continue; }
            let vsel='';
            if(v_loc==DB_WHOUSE[i].whcode){ vsel='selected'; }
            dtlfld+='<option '+vsel+' value="'+DB_WHOUSE[i].whcode+'">'+DB_WHOUSE[i].name+'</option>';
          }
          dtl+=dtlfld+
        '</select>'+
      '</div>'+
      '<div id="dv_expiry" class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Expiry:</span>'+        
        '<input type="date" id="txt_expiry" class="class_mtr2" style="color:red;overflow:auto;" value="'+v_expiry+'" />'+
      '</div>'+ 
      
      
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Quantity:</span>'+        
        '<input type="number" id="txt_qty" class="class_mtr2" onkeyup="chg_qty_fm_receive(this.value)" style="color:red;overflow:auto;" value="'+v_qty+'" />'+
      '</div>'+
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Cost:</span>'+        
        '<input type="number" id="txt_cost" class="class_mtr2" onchange="chgCost('+v_stockno+')" onkeyup="chg_qty_fm_receive(this.value)"style="color:red;overflow:auto;" value="'+v_cost+'" />'+
      '</div>'+
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Amount:</span>'+        
        '<span id="txt_amount" class="class_mtr2" style="color:red;overflow:auto;">'+v_amount+'</span>'+
      '</div>'+
      
      
    '</div>';
  //JBE_OPEN_VIEW2(dtl,'','');
  JBE_SHOW_MODULE(true,dtl);

  //chg_prodType_rcv(txt_type.innerHTML);
  //chg_qty_fm_receive(parseFloat(document.getElementById('txt_qty').value));
  
  return true;
}


function chg_qty_fm_receive(qty){
  var cost=Number(document.getElementById('txt_cost').value);
  var qty=Number(document.getElementById('txt_qty').value);
  //alert('chg : qty:'+qty+'  cost:'+cost);
  document.getElementById('txt_amount').innerHTML= JBE_FORMAT_DOUBLE_TO_STR(cost * qty);
}

//edit
function edit_fm_receive(){
  document.getElementById('lu_trano').disabled=true;
  document.getElementById('lu_trano').style.opacity='.5';
  document.getElementById('lu_suppno').disabled=false;
  document.getElementById('lu_suppno').style.opacity='1';  
  document.getElementById('tx_supplier').disabled=true;  
}
//look
function look_fm_receive(){
  disp_fm_receive();
}
//del
function del_fm_receive(stat,r){
  if(stat==2){ DB_RECEIVE=r; } 
}
//save
function save_fm_receive(stat,r){
  if(stat==0){
    let ob=[
      { fld:"suppno",val:document.getElementById('tx_suppno').value },
      { fld:"date",val:document.getElementById('tx_date').value }
    ];
    return ob;
  }
  //alert('stat :'+stat+' r:'+r.length);
  //var recno=document.getElementById('tx_trano').value;    
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
    console.log('----alams na!!!!!!!:'+FM_FM_MODE+' : len:'+r.length);
    DB_RECEIVE=r;     
    //console.log(r);
  }
  if(stat==3){
    console.log('----alams na!!2222222!!!!!:'+FM_FM_MODE+' : len:'+r.length);
    DB_RECEIVE2=r; 
    //alert(FM_ADD_FLAG);
    if(FM_ADD_FLAG){ //save_to_location(); 
    }
  }
}

function save_to_location(){
  let len_dtls=document.querySelectorAll('.dtls').length;   
  for(var i=1;i<=len_dtls;i++){
    let d_dtl=document.getElementById('dtl_'+i).style.display;
    if(d_dtl=='none'){ continue; }

    let v_descrp=document.getElementById('dtl_descrp_'+i).innerHTML;    
    let v_date_aq=JBE_DATE_FORMAT(document.getElementById('dtl_date_aq_'+i).innerHTML,'YYYY-MM-DD');
    let v_lotno=document.getElementById('dtl_lotno_'+i).innerHTML;
    
    let v_loc=document.getElementById('dtl_loc_'+i).innerHTML;
    let v_locname=get_loc(v_loc);
    let v_expiry=JBE_DATE_FORMAT(document.getElementById('dtl_expiry_'+i).innerHTML,'YYYY-MM-DD');
    let v_stockno=document.getElementById('dtl_stockno_'+i).innerHTML;
    let v_type=document.getElementById('dtl_type_'+i).innerHTML;

    let v_qty=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_qty_'+i).innerHTML);
    let v_cost=JBE_FORMAT_STR_TO_DOUBLE(document.getElementById('dtl_cost_'+i).innerHTML);
    let v_amount=JBE_FORMAT_STR_TO_DOUBLE(document.getElementById('dtl_amount_'+i).innerHTML);    
  
    let v_val=JBE_GETFLD2('trano',DB_TRANSFER2, [
      { "fld":"refno","val":tx_trano.value },
      { "fld":"stockno","val":v_stockno },
      { "fld":"lotno","val":v_lotno }
    ]);

    if(v_val){ console.log('found... '+v_val); continue; }
      
    //alert('db len:'+Object.keys(db).length);  

    console.log(i+'. '+v_val);    
   
    FM_AXIOS_SQL='INSERT INTO transfer2 (trano,loc,stockno,lotno,refno,date,expiry,descrp,type,locname,qty,balance,cost,date_tf,stat_tf) VALUES (?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?)';
    FM_AXIOS_PARA1=['ST-0001',v_loc,v_stockno,v_lotno,tx_trano.value,tx_date.value,v_expiry,v_descrp,v_type,v_locname,v_qty,v_qty,v_cost,v_date_aq,1];
    console.log('FM_AXIOS_SQL:'+FM_AXIOS_SQL);
    console.log('FM_AXIOS_PARA1:'+FM_AXIOS_PARA1);
    axios.post('/api/fmlib_save_2', {headers: { 'Content-Type': 'application/json' }}, { params: { sql:FM_AXIOS_SQL,fld:FM_AXIOS_PARA1,tbl:FM_TABLE_NAME2,fm_mode:1 } })           
    .catch(function (error) { console.log(error); });   
  }
  console.log(1111);
  get_db_all('transfer2');
}


//disp
function disp_fm_receive(){   
  //alert('disp_fm_receive '+disp_mode);
  var n = new Date().toLocaleTimeString('it-IT');    
  document.getElementById('lu_trano').disabled=false;
  document.getElementById('lu_trano').style.opacity='1';  
  document.getElementById('lu_suppno').disabled=true;
  document.getElementById('lu_suppno').style.opacity='.5';  
  total_amt();
}

function quit_fm_receive(){
  return;
}

function total_amt(){
  let len_dtls=document.querySelectorAll('.dtls').length;   
  let tot=0;
  for(var i=1;i<=len_dtls;i++){
    let d_dtl=document.getElementById('dtl_'+i).style.display;
    if(d_dtl=='none'){ continue; }
    let amt=JBE_FORMAT_STR_TO_DOUBLE(document.getElementById('dtl_amount_'+i).innerHTML);
    //alert(amt);
    tot+=amt;
  }
  //alert(tot);
  document.getElementById('tx_total').innerHTML=JBE_FORMAT_DOUBLE_TO_STR(tot);
}

