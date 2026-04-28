function fm_notif(cb){  
  //get_app_default();
  FM_TRANS='NT';
  FM_FM_MODE=2;
  FM_TABLE=DB_NOTIF;    
  FM_TABLE_NAME='notif';
  
  DB_NOTIF2.sort(JBE_SORT_ARRAY(['*date']));
  FM_TABLE2=DB_NOTIF2;  FM_TABLE_NAME2='notif2';
  //alert('FM_TABLE2=DB_NOTIF2::'+DB_NOTIF2.lenght);

  FM_RKEY='trano';  FM_RKEY2='date';
  FM_CB=cb;

  FM_FIELDS=[ //display on screen; disp:1s and disp:0s 
    { div:"tx_trano", fld:"trano", type:"text", disp:1, save:true },
    { div:"tx_date", fld:"date", type:"date", disp:1, save:true }
  ];
  
  FM_FIELDS2=[ //display on screen
    { hd:"", fld:"trano", type:"text", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },
    { hd:"Date", fld:"date", type:"date", input:true, width:"20%", align:"center", dupli:0, err:"", disp:1, save:true },
    { hd:"Message", fld:"msg", type:"text", input:true, width:"80%", align:"left", dupli:0, err:"Please enter a message.", disp:1, save:true }
  ];
    
  var fm_ob = {
    title:"NOTIFICATIONS FACILITY",  
    title2:"NOTIFICATIONS",
    width:"800px",height:"200px",
    head:"0px", foot:"0px"
  };  
  FM_TITLE=fm_ob.title;
  
  if(JBE_MOBILE){ 
    fm_ob.width="100%"; 
    fm_ob.height="290px";
  }
    
  var fm_layout_width='15';
  if(JBE_MOBILE){ fm_layout_width='33'; }

  var fm_layout=    
    '<input id="tx_areano" type="text" style="display:none;" />'+
    '<input id="tx_wh_from" type="text" style="display:none;" />'+
    '<input id="tx_loc" type="text" style="display:none;" />'+

    '<div id="div_FM_head" style="display:none;width:100%;height:40px;margin-top:0px;text-align:left;padding:5px;border:1px solid lightgray;background:none;">'+

      '<div style="float:left;margin-top:0px;width:100%;height:30px;background:none;">'+
        '<div class="cls_fm_dtl" style="float:left;width:60%;height:100%;">'+
          '<span onclick="JBE_SHOW_LOGGER(tx_trano.value,&quot;'+FM_TRANS+'&quot;)" style="float:left;width:70px;height:100%;cursor:help;">Ref No.:</span>'+                                    
          '<input id="lu_trano" type="image" src="gfx/jsearch.png" style="float:left;height:100%;margin-left:0px;" src="gfx/jsearch.png" onclick="lookup_trano_fm_notif(tx_trano.value)" />'+
          '<input id="tx_trano" type="text" style="float:left;width:90px;height:100%;border:1px solid lightgray;" data-docno="" onchange="FM_CHK_REC(tx_trano.value)" data-caption="Transaction No." value="1" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_trano.id).focus()" />'+
        '</div>'+
        '<div class="cls_fm_dtl" style="display:none;float:right;width:auto;height:100%;">'+
          '<span id="cap_transDatex" style="float:left;width:50px;">Date:</span>'+  
          '<input id="tx_date" type="date" style="width:120px;height:100%;" data-caption="Date" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_date.id).focus()" />'+
        '</div>'+
      '</div>'+

    '</div>';
  
  FM_FUNC={
    lu:"lookup_fm_notif",
    look:"look_fm_notif",
    init:"init_fm_notif",
    add:"add_fm_notif",    
    edit:"edit_fm_notif",
    del:"del_fm_notif",
    disp:"disp_fm_notif",
    save:"save_fm_notif",
    func:"func_fm_notif",
    add_item:"add_item_fm_notif"
  }
  FM_MAIN(fm_ob,fm_layout);
  JBE_SET_COLOR_BY_CLASS('btn_select','white',JBE_CLOR);
  FM_DISP_REC('1');
  //rundate.style.color='red';
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



function lookup_trano_fm_notif(){  
  var flds=[
    { title:"Ref. No", fld:"trano", type:"text", width:"20%", align:"left" },
    { title:"Date", fld:"date", type:"date", width:"25%", align:"left" },
    { title:"Details", fld:"details", type:"text", width:"55%", align:"left" }    
  ];
  var ob=[
    { val:tx_trano.value, fld:"trano" }
  ];
  FM_LOOKUP2(true,tx_trano.value,ob,FM_TABLE,['*trano'],'LOOKUP','lookup_fm_notif',flds);
}

function lookup_fm_notif(ndx){	
  if(ndx == -1){ 
    FM_INIT_REC();
    return; 
  }
  let val=document.getElementById('dd_trano'+ndx).innerHTML;
  document.getElementById('tx_trano').innerHTML=val;  
  FM_DISP_REC(val);
  rundate.style.color='red';
  look_fm_notif();
}

function lookup_stock_fm_notif(){
  var flds=[        
    { title:"", fld:"stockno", type:"text", width:"0%", align:"center" },
    { title:"", fld:"type", type:"number", width:"0%", align:"center" },
    { title:"", fld:"date", type:"text", width:"0%", align:"center" },
    { title:"Stock Name", fld:"descrp", type:"text", width:"30%", align:"center" },
    { title:"Lot No", fld:"lotno", type:"text", width:"20%", align:"center" },
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
  FM_LOOKUP2(true,txt_descrp.innerHTML,ob,DB_RECEIVE2,['stockno','date','lotno'],'LOOKUP','do_lookup_stock_fm_notif',flds);
}
function do_lookup_stock_fm_notif(ndx){  
  if(ndx == -1){ 
    document.getElementById('txt_stockno').innerHTML='';
    document.getElementById('txt_descrp').innerHTML='';
    document.getElementById('txt_lotno').value='';
    document.getElementById('txt_cost').value='';
    document.getElementById('txt_type').value='';
    document.getElementById('txt_expiry').value='';
    document.getElementById('txt_qty').value='';
    document.getElementById('txt_refno').innerHTML='';
    return; 
  }
  //alert(document.getElementById('dd_type'+ndx).innerHTML);
  let rundate=JBE_DATE_FORMAT(document.getElementById('txt_date_tf').value,'YYYY-MM-DD');
  document.getElementById('txt_stockno').innerHTML=document.getElementById('dd_stockno'+ndx).innerHTML;
  document.getElementById('txt_descrp').innerHTML=document.getElementById('dd_descrp'+ndx).innerHTML;
  document.getElementById('txt_lotno').value=document.getElementById('dd_lotno'+ndx).innerHTML;
  document.getElementById('txt_cost').value=JBE_FORMAT_STR_TO_DOUBLE(document.getElementById('dd_cost'+ndx).innerHTML);
  document.getElementById('txt_expiry').value=document.getElementById('dd_expiry'+ndx).innerHTML;
  document.getElementById('txt_refno').innerHTML=document.getElementById('dd_trano'+ndx).innerHTML;
  document.getElementById('txt_type').innerHTML=document.getElementById('dd_type'+ndx).innerHTML;
  document.getElementById('txt_balance').innerHTML=Number(get_bal_notif(txt_loc.value,txt_stockno.innerHTML,txt_lotno.value,rundate));  
}

//
function init_fm_notif(){  
  document.getElementById('tx_trano').value='';
  document.getElementById('lu_trano').disabled=false;
  document.getElementById('lu_trano').style.opacity='1';     
}

//
function add_fm_notif(){   
  let prfx='ST-';
  let last_trano='1';
  let v_date=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');

  let sql='SELECT * FROM notif ORDER BY trano';
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
    FM_FORCE_ADDREC(FM_TRANS,new_trano,'edit_fm_notif','tx_trano');
  })    
  .catch(function (error) { console.log(error); });
}
//
function add_item_fm_notif(f_add){
  var curRow=document.getElementById('div_FM_dtl_div2').getAttribute('data-row');
  var recno=document.getElementById('tx_trano').value;
  var v_trano=recno;
  var v_msg='';
  var v_date=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD'); 

  if(!recno){ 
    snackBar('Ref. No. is Empty.');
    document.getElementById('tx_trano').focus();
    return false;
  }
   
  var len_dtls=document.querySelectorAll('.dtls').length;   
  if(len_dtls==0 && !f_add){ 
    snackBar('Cannot Edit empty record');
    return false;
  }

  if(!f_add){
    v_date=JBE_DATE_FORMAT(document.getElementById('dtl_date_'+curRow).innerHTML,'YYYY-MM-DD'); 
    v_msg=document.getElementById('dtl_msg_'+curRow).innerHTML;
  }
  //if(!v_date){ v_date=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD'); }
  
  var dtl=          
    '<div id="div_name" data-zoom=0 style="width:100%;height:100%;font-text:14px;padding:5px;background-color:white;">'+         
      
      '<div class="class_mtr0" style="display:none;margin-top:5px;">'+                        
        '<span id="txt_trano" class="class_mtr2" style="width:50%;color:red;">'+v_trano+'</span>'+        
      '</div>'+ 


      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Date:</span>'+        
        '<input type="date" id="txt_date" class="class_mtr2" style="color:red;overflow:auto;" value="'+v_date+'" />'+
      '</div>'+

      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Notification:</span>'+        
        '<input type="text" id="txt_msg" class="class_mtr2" style="color:red;overflow:auto;" value="'+v_msg+'" />'+       
      '</div>'+ 
            
    '</div>';
  //JBE_OPEN_VIEW(dtl,'','');
  JBE_SHOW_MODULE(true,dtl);
  return true;
}

function get_bal_notif(loc,stockno,lotno,rundate){  
  let arr=get_bal_stock(parseInt(loc),stockno,lotno,rundate);  
  let v_tf=parseInt(arr.tf);
  let v_ris=parseInt(arr.ris);
  let v_ret=parseInt(arr.ret);
  let v_adj=parseInt(arr.adj);
  let v_qty=Number(txt_qty.value);
  let stockbal=v_qty-(v_ris+v_ret+v_adj);  
  console.clear();
  console.log('loc:'+loc+' rundate:'+rundate);
  console.log('get_bal_notif:'+arr);
  console.log('vqty: '+v_qty);
  console.log('vris: '+v_ris);
  console.log('vret: '+v_ret);
  console.log('vadj: '+v_adj);
  return stockbal;
}

function chg_qty_notif(){
  let rundate=JBE_DATE_FORMAT(document.getElementById('txt_date_tf').value,'YYYY-MM-DD');
  txt_balance.innerHTML=JBE_FORMAT_INT_TO_STR(get_bal_notif(txt_loc.value,txt_stockno.innerHTML,txt_lotno.value,rundate));  
}

//edit
function edit_fm_notif(stat){    
  document.getElementById('lu_trano').disabled=true;
  document.getElementById('lu_trano').style.opacity='.5';
}
//look
function look_fm_notif(fld){
  if(fld=='trano'){ 
    disp_fm_notif();
  }  
}
//del
function del_fm_notif(stat,r){
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
  if(stat==2){ DB_notif=r; } 
}
//save
function save_fm_notif(stat,r){
  //alert('stat :'+stat+' r:'+r.length);
  if(stat==0){
    //add these fields to table2
    let ob=[      
      //{ fld:"date",val:document.getElementById('tx_date').value },
      //{ fld:"wh_from",val:document.getElementById('tx_wh_from').value }
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
    DB_NOTIF=r; 
  }
  if(stat==3){
    DB_NOTIF2=r; 
    DB_NOTIF2.sort(JBE_SORT_ARRAY(['*date']));
  }
}
//disp
function disp_fm_notif(){ 

  document.getElementById('lu_trano').disabled=true;
  document.getElementById('lu_trano').style.opacity='0.5';  
  
  document.getElementById('FM_FUNC_BTN1').style.display='block';
  document.getElementById('img_FM_FUNC_BTN1').src='gfx/jrefresh.png'
  document.getElementById('span_FM_FUNC_BTN1').innerHTML='Refresh';

  document.getElementById('FM_DEL_BTN').style.display='none';
  document.getElementById('FM_CANCEL_BTN').style.display='none';
  document.getElementById('FM_CLOSE_BTN').style.display='block';
  //document.getElementById('FM_REFRESH_BTN').style.display='block';
  //document.getElementById('rundate').disabled=false;
}

function func_fm_notif(m){
  DB_NOTIF2.sort(JBE_SORT_ARRAY(['*date']));
  FM_DISP_REC('1');
  //document.getElementById('rundate').value=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');
  //document.getElementById('rundate').disabled=false;
  //rundate.style.color='red';
}