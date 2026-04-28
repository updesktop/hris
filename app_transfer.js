function fm_transfer(cb){  
  //get_app_default();
  FM_TRANS='ST';
  FM_FM_MODE=2;
  FM_TABLE=DB_TRANSFER;    FM_TABLE_NAME='transfer';
  
  //DB_TRANSFER2.sort(JBE_SORT_ARRAY(['descrp','locname']));
  DB_TRANSFER2.sort(JBE_SORT_ARRAY(['descrp','lotno','locname']));
  FM_TABLE2=DB_TRANSFER2;  FM_TABLE_NAME2='transfer2';

  FM_RKEY='trano';  FM_RKEY2='stockno';
  FM_CB=cb;

  FM_FIELDS=[ //display on screen; disp:1s and disp:0s 
    { div:"tx_trano", fld:"trano", type:"text", disp:1, save:true },
    { div:"tx_date", fld:"date", type:"date", disp:1, save:true },
    { div:"tx_wh_from", fld:"wh_from", type:"text", disp:0, save:true },
    { div:"tx_details", fld:"details", type:"text", disp:1, save:true }
  ];
  
  FM_FIELDS2=[ //display on screen
    { hd:"", fld:"trano", type:"text", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },
    { hd:"", fld:"date", type:"date", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },
    { hd:"", fld:"refno", type:"text", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },     
    { hd:"", fld:"stockno", type:"text", input:false, width:"20%", align:"center", dupli:1, err:"Please enter Vaccine", disp:0, save:true },
    //{ hd:"", fld:"descrp", type:"text", input:false, width:"20%", align:"center", dupli:0, err:"Please enter Vaccine", disp:0, save:true },
    { hd:"", fld:"type", type:"text", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },
    { hd:"", fld:"wh_from", type:"number", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },
    { hd:"", fld:"loc", type:"number", input:true, width:"10%", align:"center", dupli:1, err:"", disp:0, save:true },
    { hd:"", fld:"stat_tf", type:"text", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },
    //{ hd:"", fld:"balance", type:"number", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },    
    //{ hd:"Location", fld:"get_loc|loc", type:"text", input:false, width:"10%", align:"center", dupli:0, err:"Please enter Location.", disp:1, save:false },
        
    { hd:"Stock Description", fld:"descrp", type:"text", input:false, width:"25%", align:"left", dupli:0, err:"Please enter an Item.", disp:1, save:true },
    { hd:"Location", fld:"locname", type:"text", input:false, width:"10%", align:"center", dupli:0, err:"Please enter Location.", disp:1, save:true },
    { hd:"Lot No.", fld:"lotno", type:"text", input:true, width:"15%", align:"left", dupli:1, err:"Please enter Lot No.", disp:1, save:true },
    { hd:"Cost", fld:"cost", type:"double", input:true, width:"10%", align:"center", dupli:0, err:"Please enter Cost", disp:1, save:true },
    { hd:"Expiry", fld:"expiry", type:"date", input:true, width:"10%", align:"center", dupli:0, err:"Please enter expiry flag.", disp:1, save:true },
    { hd:"Quantity", fld:"qty", type:"number", input:true, width:"10%", align:"center", dupli:0, err:"Please enter Quantity.", disp:1, save:true },
    { hd:"Balance", fld:"balance", type:"numberText", input:false, width:"10%", align:"center", dupli:0, err:"Please enter Balance.", disp:1, save:true },
    { hd:"Transfer Date", fld:"date_tf", type:"date", input:true, width:"10%", align:"center", dupli:0, err:"", disp:1, save:true },
  ];
    
  var fm_ob = {
    title:"FREEZERS FACILITY",  
    title2:"TRANSFER",
    width:"800px",height:"200px",
    head:"100px", foot:"0px"
  };  
  FM_TITLE=fm_ob.title;
  
  if(JBE_MOBILE){ 
    fm_ob.width="95%"; 
    fm_ob.height="290px";
  }
    
  var fm_layout_width='15';
  if(JBE_MOBILE){ fm_layout_width='33'; }

  var fm_layout=
    
    '<input id="tx_areano" type="text" style="display:none;" />'+
    '<input id="tx_wh_from" type="text" style="display:none;" />'+
    '<input id="tx_loc" type="text" style="display:none;" />'+

    '<div id="div_FM_head" style="width:100%;height:105px;margin-top:0px;text-align:left;padding:5px;border:1px solid lightgray;background:none;">'+

      '<div style="float:left;margin-top:0px;width:100%;height:30px;background:none;">'+
        '<div class="cls_fm_dtl" style="float:left;width:60%;height:100%;">'+
          '<span onclick="JBE_SHOW_LOGGER(tx_trano.value,&quot;'+FM_TRANS+'&quot;)" style="float:left;width:70px;height:100%;cursor:help;">Ref No.:</span>'+                                    
          '<input id="lu_trano" type="image" src="gfx/jsearch.png" style="float:left;height:100%;margin-left:0px;" src="gfx/jsearch.png" onclick="lookup_trano_fm_transfer(tx_trano.value)" />'+
          '<input id="tx_trano" type="text" style="float:left;width:90px;height:100%;border:1px solid lightgray;" data-docno="" onchange="FM_CHK_REC(tx_trano.value)" data-caption="Transaction No." value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_trano.id).focus()" />'+
        '</div>'+
        '<div class="cls_fm_dtl" style="display:none;float:right;width:auto;height:100%;">'+
          '<span id="cap_transDatex" style="float:left;width:50px;">Date:</span>'+  
          '<input id="tx_date" type="date" style="width:120px;height:100%;" data-caption="Date" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_date.id).focus()" />'+
        '</div>'+
        '<div class="cls_fm_dtl" style="display:block;float:right;width:auto;height:100%;">'+
          '<span id="cap_transDate" style="float:left;width:70px;text-align:left;">Rundate Balance:</span>'+  
          '<input id="rundate" type="date" style="width:120px;height:100%;color:red;" onchange="chg_date_transfer(this.value)" data-caption="Date" value='+JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD')+' onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_date.id).focus()" />'+
        '</div>'+
      '</div>'+

      '<div id="div_wh" data-wh="" style="float:left;margin-top:0px;width:100%;height:30px;">'+
        '<div class="cls_fm_dtl" style="float:left;width:50%;height:100%;">'+        
          '<span style="float:left;width:70px;">From:</span>'+
          '<input id="lb_wh_from" type="text" disabled style="float:left;width:60px;pointer-events:none;" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_details.id).focus()" />'+
          '<input id="lu_wh_from" type="button" class="btn_select" style="display:none;float:left;height:100%;margin-left:2px;" src="gfx/jsearch.png" onclick="lookup_wh_fm_transfer(1,lb_wh_from.value)" value="..." />'+
        '</div>'+
        '<div class="cls_fm_dtl" style="display:none;float:right;width:auto;">'+        
          '<span style="float:left;width:40px;">To:</span>'+
          '<input id="lb_loc" type="text" disabled style="float:left;width:60px;pointer-events:none;" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_details.id).focus()" />'+
          '<input id="lu_loc" type="button" class="btn_select" style="float:left;height:100%;margin-left:2px;" src="gfx/jsearch.png" onclick="lookup_wh_fm_transfer(2,lb_loc.value)" value="..." />'+
        '</div>'+
      '</div>'+

      '<div style="float:left;margin-top:0px;width:100%;height:30px;">'+
        '<div class="cls_fm_dtl" style="height:100%;">'+        
          '<span style="float:left;width:70px;">Details:</span>'+
          '<input id="tx_details" type="text" data-caption="Details" style="float:left;width:40%;height:100%;" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_details.id).focus()" />'+                  
          '<select id="cb_prodtype" name="cb_prodtype" value=0 onchange="filter_type(this.value)" class="class_mtr2" style="display:none;float:right;width:120px;color:red;height:100%;text-align:center;padding:0px;">';
            var dtlfld='<option value="ALL">- All -</option>';            
            for(var i=0;i < DB_PRODUCT.length;i++){                        
              dtlfld+='<option  value="'+DB_PRODUCT[i].type+'">'+DB_PRODUCT[i].prodname+'</option>';
            }
            fm_layout+=dtlfld+
          '</select>'+
        '</div>'+
        
      '</div>'+

    '</div>';
  
  FM_FUNC={
    lu:"lookup_fm_transfer",
    look:"look_fm_transfer",
    init:"init_fm_transfer",
    add:"add_fm_transfer",    
    edit:"edit_fm_transfer",
    del:"del_fm_transfer",
    disp:"disp_fm_transfer",
    save:"save_fm_transfer",
    func:"func_fm_transfer",
    add_item:"add_item_fm_transfer"
  }
  FM_MAIN(fm_ob,fm_layout);
  JBE_SET_COLOR_BY_CLASS('btn_select','white',JBE_CLOR);
  //var fm_layout_height=H_BODY-parseInt(document.getElementById('div_FM_head').style.height);
  //document.getElementById('div_FM_dtl').style.height=(fm_layout_height-70)+'px';
  FM_DISP_REC('ST-0001');
  rundate.style.color='red';
  //let e_date=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');
  //chg_date_transfer(e_date);
} 

function filter_type(vtype){
  //alert(vtype);
  var len_dtls=document.querySelectorAll('.dtls').length;    
  if(!len_dtls){ console.log('wala'); return; }
  for(var i=1;i<=len_dtls;i++){    
    document.getElementById('dtl_'+i).style.color='black';
    let type=document.getElementById('dtl_type_'+i).innerHTML;
    if(vtype!='ALL' && type!=vtype){ document.getElementById('dtl_'+i).style.color='black'; }
  }
}

function chg_date_transfer(e_date){
  //console.clear();
  rundate.style.color='blue';
  var len_dtls=document.querySelectorAll('.dtls').length;    
  if(!len_dtls){ console.log('wala'); return; }
  for(var i=1;i<=len_dtls;i++){    
    let loc=document.getElementById('dtl_loc_'+i).innerHTML;
    let stockno=document.getElementById('dtl_stockno_'+i).innerHTML;
    let lotno=document.getElementById('dtl_lotno_'+i).innerHTML;
    let qty=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_qty_'+i).innerHTML);

    let arr=get_AllBinCard(stockno,loc,lotno,'2001-01-01',e_date);
    console.log(arr);
    if(!stockno){ continue; }
    let received=0;
    let issued=0;
    let bal=0;
    for(var k=0;k<arr.length;k++){    
      received+=arr[k].received;
      issued+=arr[k].issued;
    }
    bal=received-issued;
    //console.log(i,lotno,received,issued," bal:",bal);
    document.getElementById('dtl_balance_'+i).innerHTML=JBE_FORMAT_INT_TO_STR(bal);
  }
}

function lookup_trano_fm_transfer(){  
  var flds=[
    { title:"Ref. No", fld:"trano", type:"text", width:"20%", align:"left" },
    { title:"Date", fld:"date", type:"date", width:"25%", align:"left" },
    { title:"Details", fld:"details", type:"text", width:"55%", align:"left" }    
  ];
  var ob=[
    { val:tx_trano.value, fld:"trano" }
  ];
  FM_LOOKUP2(true,tx_trano.value,ob,FM_TABLE,['*trano'],'LOOKUP','lookup_fm_transfer',flds);
}
function lookup_fm_transfer(ndx){	
  if(ndx == -1){ 
    FM_INIT_REC();
    return; 
  }
  let val=document.getElementById('dd_trano'+ndx).innerHTML;
  document.getElementById('tx_trano').innerHTML=val;  
  FM_DISP_REC(val);
  rundate.style.color='red';
  look_fm_transfer();
}

function lookup_wh_fm_transfer(mode,val){
  let v_whcode=tx_wh_from.value;
  if(mode==2){ v_whcode=tx_loc.value; }
  document.getElementById('div_wh').setAttribute('data-wh',mode);
  var flds=[    
    { title:"Location Name", fld:"name", type:"text", width:"50%", align:"center" },
    { title:"Code", fld:"whcode", type:"text", width:"50%", align:"center" }
  ];
  var ob=[
    { val:v_whcode, fld:"whcode" }
  ];
  FM_LOOKUP2(true,val,ob,DB_WHOUSE,[],'LOOKUP','do_lookup_wh_fm_transfer',flds);
}

function do_lookup_wh_fm_transfer(ndx){	
  if(ndx == -1){ 
    document.getElementById(div_wh_lb).value='';
    return; 
  }
  let vmode=parseInt(document.getElementById('div_wh').getAttribute('data-wh'));
  let div_wh='tx_wh_from';
  let div_wh_lb='lb_wh_from';
  if(vmode==2){ 
    div_wh='tx_loc'; 
    div_wh_lb='lb_loc';
  }

  document.getElementById(div_wh).value=document.getElementById('dd_whcode'+ndx).innerHTML;    
  document.getElementById(div_wh_lb).value=document.getElementById('dd_name'+ndx).innerHTML;    
}

function lookup_stock_fm_transfer(){
  var flds=[        
    { title:"", fld:"stockno", type:"text", width:"0%", align:"center" },
    { title:"", fld:"type", type:"number", width:"0%", align:"center" },
    { title:"", fld:"loc", type:"number", width:"0%", align:"center" },
    { title:"", fld:"date", type:"text", width:"0%", align:"center" },
    { title:"Stock Name", fld:"descrp", type:"text", width:"25%", align:"center" },
    { title:"Lot No", fld:"lotno", type:"text", width:"18%", align:"center" },    
    { title:"Location", fld:"get_loc|loc", type:"text", width:"7%", align:"center" },
    { title:"Qty", fld:"qty", type:"number", width:"10%", align:"center" },
    { title:"Cost", fld:"cost", type:"double", width:"10%", align:"center" },
    { title:"Expiry", fld:"expiry", type:"date", width:"10%", align:"center" },
    { title:"Ref. No.", fld:"trano", type:"text", width:"20%", align:"center" }
  ];
  var ob=[
    { val:txt_stockno.innerHTML, fld:"stockno" },
    { val:txt_lotno.value, fld:"lotno" },
    { val:txt_refno.innerHTML, fld:"trano" }
  ];
  FM_LOOKUP2(true,txt_descrp.innerHTML,ob,DB_RECEIVE2,['stockno','date','lotno'],'LOOKUP','do_lookup_stock_fm_transfer',flds);
}
function do_lookup_stock_fm_transfer(ndx){  
  if(ndx == -1){ 
    document.getElementById('txt_stockno').innerHTML='';
    document.getElementById('txt_descrp').innerHTML='';
    document.getElementById('txt_lotno').value='';
    document.getElementById('txt_cost').value='';
    document.getElementById('txt_type').value='';
    document.getElementById('txt_expiry').value='';
    document.getElementById('txt_qty').value='';
    document.getElementById('txt_refno').innerHTML='';
    document.getElementById('txt_loc').innerHTML='';
    return; 
  }
  //alert(document.getElementById('dd_type'+ndx).innerHTML);
  let rundate=JBE_DATE_FORMAT(document.getElementById('txt_date_tf').value,'YYYY-MM-DD');
  document.getElementById('txt_stockno').innerHTML=document.getElementById('dd_stockno'+ndx).innerHTML;
  document.getElementById('txt_descrp').innerHTML=document.getElementById('dd_descrp'+ndx).innerHTML;
  document.getElementById('txt_lotno').value=document.getElementById('dd_lotno'+ndx).innerHTML;
  document.getElementById('txt_loc').value=document.getElementById('dd_loc'+ndx).innerHTML;
  document.getElementById('txt_cost').value=JBE_FORMAT_STR_TO_DOUBLE(document.getElementById('dd_cost'+ndx).innerHTML);
  document.getElementById('txt_expiry').value=document.getElementById('dd_expiry'+ndx).innerHTML;
  document.getElementById('txt_refno').innerHTML=document.getElementById('dd_trano'+ndx).innerHTML;
  document.getElementById('txt_type').innerHTML=document.getElementById('dd_type'+ndx).innerHTML;
  document.getElementById('txt_balance').innerHTML=Number(get_bal_transfer(txt_loc.value,txt_stockno.innerHTML,txt_lotno.value,rundate));  
}

//
function init_fm_transfer(){  
  document.getElementById('tx_trano').value='';
  document.getElementById('lu_trano').disabled=false;
  document.getElementById('lu_trano').style.opacity='1';   
  document.getElementById('lu_wh_from').disabled=true;
  document.getElementById('lu_loc').disabled=true;
  document.getElementById('lb_wh_from').disabled=true;
  document.getElementById('lb_loc').disabled=true;

  document.getElementById('lb_wh_from').value='';
  document.getElementById('lb_loc').value='';
}

//edit
function edit_fm_transfer(stat){  
  if(stat==1 && FM_BTN_LEVEL==1){ 
    //FM_DISP_REC('ST-0001');
    document.getElementById('rundate').value=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');
    document.getElementById('rundate').disabled=true;
    rundate.style.color='red';
  }  
  document.getElementById('lu_trano').disabled=true;
  document.getElementById('lu_trano').style.opacity='.5';
  document.getElementById('lu_wh_from').disabled=true;
  document.getElementById('lu_loc').disabled=false;
}
//
function add_fm_transfer(){   
  let prfx='ST-';
  let last_trano='1';
  let v_date=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');

  let sql='SELECT * FROM transfer ORDER BY trano';
  axios.get('/api/fmlib_get', { params: {sql:sql} })
  .then(function (response) { 
    let newArr=response.data;
    if(newArr.length > 0){
      last_trano=newArr[newArr.length-1].trano; 
    }
    var new_trano=prfx;
    var v_num=0;
    
    if(last_trano.substring(0,3) == new_trano){
      v_num=parseInt(last_trano.substring(3,17))+1;
    }else{
      v_num=1;
    }
    new_trano=new_trano+v_num.toString().padStart(4,0);  
    document.getElementById('tx_trano').value=new_trano;  
    document.getElementById('tx_trano').disabled=false;
    document.getElementById('tx_date').value=v_date;
    document.getElementById('tx_wh_from').value=0;
    document.getElementById('lb_wh_from').value=JBE_GETFLD('name',DB_WHOUSE,'whcode',0); 
    console.log('new_trano:'+new_trano);        
    FM_FORCE_ADDREC(FM_TRANS,new_trano,'edit_fm_transfer','tx_trano');
  })    
  .catch(function (error) { console.log(error); });
}
//
function add_item_fm_transfer(f_add){
  var curRow=document.getElementById('div_FM_dtl_div2').getAttribute('data-row');
  var recno=document.getElementById('tx_trano').value;
  var v_details=document.getElementById('tx_details').value;
  var v_date=document.getElementById('tx_date').value;
  var v_wh_from=document.getElementById('tx_wh_from').value;
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

  if(!v_details){ 
    snackBar('Detail is Empty.');
    return false;
  }
  if(!v_wh_from){ 
    snackBar('Warehouse Code (From) is Empty.');
    document.getElementById('lu_wh_from').focus();
    return false;
  }
  
  var len_dtls=document.querySelectorAll('.dtls').length;   
  if(len_dtls==0 && !f_add){ 
    snackBar('Cannot Edit empty record');
    return false;
  }

  let v_vaccine='';
  let v_stockno='';
  let v_lotno='';
  let v_loc='';
  let v_locname='';
  let v_qty='';
  let v_expiry='';
  let v_cost='';
  let v_type='';
  let v_refno='';
  let v_trano=recno;
  let v_balance='';
  let v_date_tf='';
  let v_stat_tf=0;

  if(!f_add){
    v_vaccine=document.getElementById('dtl_descrp_'+curRow).innerHTML;
    v_qty=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_qty_'+curRow).innerHTML); 
    v_expiry=JBE_DATE_FORMAT(document.getElementById('dtl_expiry_'+curRow).innerHTML,'YYYY-MM-DD'); 
    v_stockno=document.getElementById('dtl_stockno_'+curRow).innerHTML;
    v_lotno=document.getElementById('dtl_lotno_'+curRow).innerHTML;
    v_loc=document.getElementById('dtl_loc_'+curRow).innerHTML;
    v_locname=document.getElementById('dtl_locname_'+curRow).innerHTML;
    v_type=document.getElementById('dtl_type_'+curRow).innerHTML;
    v_cost=document.getElementById('dtl_cost_'+curRow).innerHTML;
    v_refno=document.getElementById('dtl_refno_'+curRow).innerHTML;
    v_balance=document.getElementById('dtl_balance_'+curRow).innerHTML;
    v_date_tf=JBE_DATE_FORMAT(document.getElementById('dtl_date_tf_'+curRow).innerHTML,'YYYY-MM-DD');
    v_stat_tf=document.getElementById('dtl_stat_tf_'+curRow).innerHTML;
    v_cost=JBE_FORMAT_STR_TO_DOUBLE(v_cost);
  }
  if(!v_date_tf){ v_date_tf=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD'); }

  DB_WHOUSE.sort(JBE_SORT_ARRAY(['name']));  
  let running=JBE_GETFLD('lotno',DB_STOCK,'stockno',v_stockno);
  let clor=iif(v_lotno==running,'red','blue');

  var dtl=          
    '<div id="div_name" data-zoom=0 style="width:100%;height:100%;font-text:14px;padding:5px;background-color:white;">'+         
      
      '<div class="class_mtr0" style="display:none;margin-top:5px;">'+                        
        '<span id="txt_trano" class="class_mtr2" style="width:50%;color:red;">'+v_trano+'</span>'+
        '<span id="txt_stockno" class="class_mtr2" style="width:50%;color:red;">'+v_stockno+'</span>'+        
        '<span id="txt_date" class="class_mtr2" style="width:50%;color:red;">'+v_date+'</span>'+
        '<span id="txt_refno" class="class_mtr2" style="width:50%;color:red;">'+v_refno+'</span>'+
        '<span id="txt_type" class="class_mtr2" style="width:50%;color:red;">'+v_type+'</span>'+
        '<span id="txt_wh_from" class="class_mtr2" style="width:50%;color:red;">'+v_wh_from+'</span>'+
        '<span id="txt_locname" class="class_mtr2" style="width:50%;color:red;">'+v_locname+'</span>'+   
        '<span id="txt_stat_tf" class="class_mtr2" style="width:50%;color:red;">'+v_stat_tf+'</span>'+   
        '<span id="old_date_tf" class="class_mtr2" style="width:50%;color:red;">'+v_date_tf+'</span>'+   
      '</div>'+ 

      '<div class="class_mtr0" style="display:'+iif(f_add,'block','block')+';margin-top:5px;width:100%;height:50px;padding:0px;border:1px solid black;background:lightblue;">'+      
        '<div class="class_mtr0" style="display:none;float:left;width:50%;padding:10px;border:0px;">'+                  
          '<input type="radio" id="rad1" name="fav_lang" onclick="get_radio_tf(0)" style="margin-left:0px;" value=1>'+
            '<label for="rad1">Edit</label>'+
          '<input type="radio" id="rad2" name="fav_lang" onclick="get_radio_tf(1)" style="margin-left:20px;" value="HTML">'+
            '<label for="rad2">Transfer</label>'+  
        '</div>'+
        '<div id="dv_date_tf" class="class_mtr0" style="float:right;width:50%;border:0px solid gold;background:none;">'+
          '<input type="date" id="txt_date_tf" class="class_mtr2" style="float:right;color:'+clor+';width:110px;padding:5px;overflow:auto;" value="'+v_date_tf+'" />'+       
          '<span class="class_mtr1 class_mtr1_tf" style="float:right;">Transfer Date :</span>'+        
        '</div>'+ 
      '</div>'+
      
      '<div class="class_mtr0" style="margin-top:15px;">'+        
        '<span class="class_mtr1">Description:</span>'+        
        '<span id="txt_descrp" class="class_mtr2" style="width:50%;color:'+clor+';overflow:auto;">'+v_vaccine+'</span>'+
        '<button id="btn_name" style="float:right;width:40px;height:100%;font-weight:bold;margin-right:3px;border-radius:5px;color:white;background:'+JBE_CLOR+';" onclick="lookup_stock_fm_transfer()">...</button>'+        
      '</div>'+ 

      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Lot No. :</span>'+        
        '<input type="text" id="txt_lotno" disabled class="class_mtr2" style="color:'+clor+';overflow:auto;" value="'+v_lotno+'" />'+
      '</div>'+

      '<div class="class_mtr0" style="margin-top:2px;">'+
        '<span class="class_mtr1">Location:</span>'+
        '<select id="txt_loc" name="txt_loc" onchange="txt_locname.innerHTML=txt_loc.options[txt_loc.selectedIndex].text; chg_qty_transfer()" class="class_mtr2" style="float:left;width:50%;color:'+clor+';height:100%;padding:0px;">';
          let dtlfld='';            
          for(var i=0;i < DB_WHOUSE.length;i++){
            let vsel='';
            if(v_loc==DB_WHOUSE[i].whcode){ vsel='selected'; }
            dtlfld+='<option '+vsel+' value="'+DB_WHOUSE[i].whcode+'">'+DB_WHOUSE[i].name+'</option>';
          }
          dtl+=dtlfld+
        '</select>'+
        '<input type="image" id="btn_lotno" onclick="set_new_lotno(txt_stockno.innerHTML)" class="class_mtr2" style="float:right;width:50px;height:100%;padding:0px;color:blue;" src="gfx/jnew.png" />'+
      '</div>'+ 

      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Expiry :</span>'+        
        '<input type="text" id="txt_expiry" disabled class="class_mtr2" style="color:'+clor+';overflow:auto;" value="'+v_expiry+'" />'+       
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Cost :</span>'+        
        '<input type="text" id="txt_cost" disabled class="class_mtr2" style="color:'+clor+';overflow:auto;" value="'+v_cost+'" />'+       
      '</div>'+ 

      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Quantity:</span>'+        
        '<input type="number" id="txt_qty" onchange="chg_qty_transfer()" class="class_mtr2" style="color:'+clor+';overflow:auto;" value="'+v_qty+'" />'+
      '</div>'+
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Balance:</span>'+        
        '<span id="txt_balance" class="class_mtr2" style="width:50%;color:'+clor+';overflow:auto;">'+v_balance+'</span>'+
      '</div>'+
      
    '</div>';
  //JBE_OPEN_VIEW(dtl,'','');
  JBE_SHOW_MODULE(true,dtl);
  get_radio_tf(parseInt(1));
  return true;
}

function get_radio_tf(v){
  let vdisp='none';
  let d='';
  rad1.checked=true;
  txt_date_tf.value='';
  
  if(v==1){ 
    d=JBE_DATE_FORMAT(document.getElementById('old_date_tf').innerHTML,'YYYY-MM-DD');
    if(!d){ d=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD'); }
    txt_date_tf.value=JBE_DATE_FORMAT(d,'YYYY-MM-DD');
    vdisp='block'; rad2.checked=true;        
  }
  document.getElementById('dv_date_tf').style.display=vdisp;
  document.getElementById('txt_stat_tf').innerHTML=v;
}

function get_bal_transfer(loc,stockno,lotno,rundate){  
  //let rundate=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');
  //let rundate=JBE_DATE_FORMAT(document.getElementById('txt_date_tf').value,'YYYY-MM-DD');
  //alert('get_bal_transfer rundate:'+rundate);
  let arr=get_bal_stock(parseInt(loc),stockno,lotno,rundate);  
  let v_bal=parseInt(arr.bal);
  let v_tf=parseInt(arr.tf);
  let v_ris=parseInt(arr.ris);
  let v_ret=parseInt(arr.ret);
  let v_adj=parseInt(arr.adj);
  let v_qty=Number(txt_qty.value);
  //let stockbal=v_qty-(v_ris+v_ret+v_adj);
  let stockbal=(v_qty-v_ris)+v_ret+v_adj;
  //let stockbal=(v_tf-v_qty)-(v_ris+v_ret+v_adj);
  //let stockbal=v_qty-v_bal;
  //let stockbal=(v_bal+qty_old)-qty;
  console.clear();
  console.log('loc:'+loc+' rundate:'+rundate);
  console.log('get_bal_transfer:',arr);
  //console.log(arr);
  console.log('vqty: '+v_qty);
  console.log('===');
  console.log('vbal: '+v_bal);
  console.log('vtf: '+v_tf);
  console.log('vris: '+v_ris);
  console.log('vret: '+v_ret);
  console.log('vadj: '+v_adj);
  console.log('===');
  console.log('stockbal: '+stockbal);
  return stockbal;
}

function chg_qty_transfer(){
  let rundate=JBE_DATE_FORMAT(document.getElementById('txt_date_tf').value,'YYYY-MM-DD');
  txt_balance.innerHTML=JBE_FORMAT_INT_TO_STR(get_bal_transfer(txt_loc.value,txt_stockno.innerHTML,txt_lotno.value,rundate));  
}


//look
function look_fm_transfer(fld){
  if(fld=='trano'){ 
    disp_fm_transfer();
  }  
}
//del
function del_fm_transfer(stat,r){
  /*
  alert(stat);
  if(stat==1){ 
    let row=parseInt(document.getElementById('div_FM_dtl_div2').getAttribute('data-row'));  
    let refno=JBE_GETFLD2('trano',DB_PTR2, [
      { "fld":"stockno","val":document.getElementById('dtl_stockno_'+row).innerHTML },
      { "fld":"lotno","val":document.getElementById('dtl_lotno_'+row).innerHTML },
      { "fld":"loc","val":document.getElementById('dtl_loc_'+row).innerHTML }
    ]);
    if(refno){
      MSG_SHOW(vbYesNo,"CONFIRM: ","Record is used in RIS No:"+refno+'. Delete anyway?',
      function(){ 
        return false; 
      },function(){ return false; }); 
    }   
  }
  */
  if(stat==2){ DB_TRANSFER=r; } 
}
//save
function save_fm_transfer(stat,r){
  //alert('stat :'+stat+' r:'+r.length);
  if(stat==0){
    //add these fields to table2
    let ob=[      
      //{ fld:"date",val:document.getElementById('tx_date').value },
      { fld:"wh_from",val:document.getElementById('tx_wh_from').value }
    ];
    return ob;
  }    
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
    DB_TRANSFER=r; 
  }
  if(stat==3){
    DB_TRANSFER2=r; 
    //DB_TRANSFER2.sort(JBE_SORT_ARRAY(['type','descrp','locname']));
  }
}
//disp
function disp_fm_transfer(){   
  document.getElementById('lb_wh_from').value=JBE_GETFLD('name',DB_WHOUSE,'whcode',tx_wh_from.value);
  document.getElementById('lb_loc').value=JBE_GETFLD('name',DB_WHOUSE,'whcode',tx_loc.value);
  
  document.getElementById('lu_trano').disabled=true;
  document.getElementById('lu_trano').style.opacity='0.5';  
  document.getElementById('lu_wh_from').disabled=true;
  document.getElementById('lu_loc').disabled=true;
/*
  document.getElementById('FM_FUNC_BTN1').style.display='block';
  document.getElementById('img_FM_FUNC_BTN1').src='gfx/jrefresh.png'
  document.getElementById('span_FM_FUNC_BTN1').innerHTML='Refresh';
*/
  document.getElementById('FM_DEL_BTN').style.display='none';
  document.getElementById('FM_CANCEL_BTN').style.display='none';
  document.getElementById('FM_CLOSE_BTN').style.display='block';
  document.getElementById('FM_REFRESH_BTN').style.display='block';
  document.getElementById('rundate').disabled=false;
  show_running();
}

function show_running(){
  var len_dtls=document.querySelectorAll('.dtls').length;    
  if(!len_dtls){ return; }
  for(var i=1;i<=len_dtls;i++){    
    let stockno=document.getElementById('dtl_stockno_'+i).innerHTML;
    let lotno=document.getElementById('dtl_lotno_'+i).innerHTML;
    let running=JBE_GETFLD('lotno',DB_STOCK,'stockno',stockno);
    let fclor='black'; let fstyle='none'; let fbold='none'; let fsize='10px';
    if(lotno==running){ fbold='bold'; fstyle='italic'; fsize='12px'; }
    document.getElementById('dtl_'+i).setAttribute('data-fg',fclor);
    //document.getElementById('dtl_'+i).style.color=iif(lotno==running,'red','black');
    //document.getElementById('dtl_'+i).style.fontStyle=iif(lotno==running,'italic','none');
    //document.getElementById('dtl_'+i).style.color=fclor;
    document.getElementById('dtl_'+i).style.fontWeight=fbold;
    document.getElementById('dtl_'+i).style.fontStyle=fstyle;
    document.getElementById('dtl_'+i).style.fontSize=fsize;
    //let type=document.getElementById('dtl_type_'+i).innerHTML;
    //if(vtype!='ALL' && type!=vtype){ document.getElementById('dtl_'+i).style.color='black'; }
  }
}

function func_fm_transfer(m){
  DB_TRANSFER2.sort(JBE_SORT_ARRAY(['descrp','lotno','locname']));
  FM_DISP_REC('ST-0001');
  document.getElementById('rundate').value=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');
  document.getElementById('rundate').disabled=false;
  rundate.style.color='red';
}