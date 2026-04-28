function fm_returns(m){  
  //get_app_default();
  FM_TRANS='RT';
  FM_FM_MODE=2;
  FM_TABLE=DB_RETURNS;    FM_TABLE_NAME='returns';

  FM_TABLE2=DB_RETURNS2;  FM_TABLE_NAME2='returns2';

  FM_RKEY='trano';  FM_RKEY2='stockno';
  FM_CB='';
  if(m==1){ FM_CB='mnu_fm_tools'; }

  FM_FIELDS=[ //display on screen; disp:1s and disp:0s 
    { div:"tx_trano", fld:"trano", type:"text", disp:1, save:true },
    { div:"tx_date", fld:"date", type:"date", disp:1, save:true },
    { div:"tx_details", fld:"details", type:"text", disp:1, save:true }
  ];
  
  FM_FIELDS2=[ //display on screen
    { hd:"", fld:"trano", type:"text", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },
    { hd:"", fld:"date", type:"text", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },    
    { hd:"", fld:"stockno", type:"text", input:false, width:"10%", align:"center", dupli:1, err:"Please enter Vaccine", disp:0, save:true },
    { hd:"", fld:"type", type:"number", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },
    { hd:"", fld:"expiry", type:"date", input:true, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },
    { hd:"", fld:"areano", type:"text", input:false, width:"10%", align:"center", dupli:1, err:"Please enter Sub Area Code", disp:0, save:true },
    { hd:"", fld:"refno", type:"text", input:false, width:"10%", align:"center", dupli:0, err:"Please enter RefNo", disp:0, save:true },
    { hd:"", fld:"docno", type:"text", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },
    { hd:"", fld:"loc", type:"number", input:true, width:"10%", align:"center", dupli:0, err:"Please enter Location", disp:0, save:true },
    { hd:"Sub Area", fld:"areaname", type:"text", input:false, width:"25%", align:"left", dupli:0, err:"Please enter Sub Area.", disp:1, save:true },    
    { hd:"Vaccine", fld:"descrp", type:"text", input:false, width:"25%", align:"left", dupli:0, err:"Please enter an Item.", disp:1, save:true },
    { hd:"Lot No.", fld:"lotno", type:"text", input:true, width:"18%", align:"center", dupli:1, err:"Please enter Lot No.", disp:1, save:true },    
    { hd:"Location", fld:"get_loc|loc", type:"text", input:true, width:"10%", align:"center", dupli:0, err:"Please enter Location", disp:1, save:false },    
    { hd:"R.Q.", fld:"qty", type:"number", input:true, width:"6%", align:"center", dupli:0, err:"Please enter Quantity.", disp:1, save:true },
    { hd:"R-Date", fld:"ret_date", type:"date", input:true, width:"10%", align:"center", dupli:0, err:"Please enter Returned Date.", disp:1, save:true },
    { hd:"RTI", fld:"rti", type:"text", input:false, width:"6%", align:"center", dupli:0, err:"Please enter RTI flag.", disp:1, save:true },
    { hd:"FILLER", fld:"loc", type:"number", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:false },
    { hd:"FILLER", fld:"stockno", type:"text", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:false },
    { hd:"FILLER", fld:"qty", type:"number", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:false }
  ];
    
  var fm_ob = {
    title:"RETURNS MASTER FILE",  
    title2:"RETURNS",
    width:"800px",height:"270px",
    foot:0
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

    '<div id="div_FM_head" style="width:100%;height:100px;margin-top:0px;text-align:left;padding:5px;border:1px solid lightgray;background:none;">'+

      '<div class="cls_fm_dtl">'+        
        '<div style="width:'+fm_layout_width+'%;">'+    
          '<span onclick="JBE_SHOW_LOGGER(tx_trano.value,&quot;'+FM_TRANS+'&quot;)" style="float:left;cursor:help;">Ref No.:</span>'+
          '<input id="lu_trano" type="image" src="gfx/jsearch.png" onclick="lookup_trano_fm_returns(tx_trano.value)" />'+
        '</div>'+
        '<input id="tx_trano" type="text" style="width:40%;" data-docno="" onchange="FM_CHK_REC(tx_trano.value)" data-caption="Transaction No." value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_trano.id).focus()" />'+
      '</div>'+

      '<div class="cls_fm_dtl">'+
        '<div style="width:'+fm_layout_width+'%;">Date:</div>'+  
        '<input id="tx_date" type="date" style="width:40%;" data-caption="Date" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_date.id).focus()" />'+
      '</div>'+
      
      '<div class="cls_fm_dtl">'+        
        '<div style="width:'+fm_layout_width+'%;">Details:</div>'+               
          //'<input id="lu_areano" type="image" src="gfx/jsearch.png" data-caption="Sub Area Name" onclick="lookup_subarea_fm_returns(tx_areano.value)" />'+
        //'</div>'+
        '<input id="tx_details" type="text" data-caption="Details" style="width:'+(100-fm_layout_width+0)+'%;" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_details.id).focus()" />'+
      '</div>'+

    '</div>';
  
  FM_FUNC={
    lu:"lookup_fm_returns",
    look:"look_fm_returns",
    init:"init_fm_returns",
    add:"add_fm_returns",    
    edit:"edit_fm_returns",
    del:"del_fm_returns",
    disp:"disp_fm_returns",
    save:"save_fm_returns",
    add_item:"add_item_fm_returns"
  }
  FM_MAIN(fm_ob,fm_layout);
  //var fm_layout_height=H_BODY-parseInt(document.getElementById('div_FM_head').style.height);
  //document.getElementById('div_FM_dtl').style.height=(fm_layout_height-70)+'px';
} 

function lookup_trano_fm_returns(){  
  var flds=[
    { title:"Ref. No", fld:"trano", type:"text", width:"20%", align:"left" },
    { title:"Date", fld:"date", type:"date", width:"25%", align:"left" },
    { title:"Details", fld:"details", type:"text", width:"55%", align:"left" }    
  ];
  //FM_LOOKUP(true,tx_trano.value,FM_TABLE,[],'RETURNS LOOKUP 1','lookup_fm_returns','trano',flds,'trano');
  var ob=[
    { val:tx_trano.value, fld:"trano" }
  ];
  FM_LOOKUP2(true,tx_trano.value,ob,FM_TABLE,['*trano'],'LOOKUP','lookup_fm_returns',flds);
}

function lookup_fm_returns(ndx){	  
  if(ndx == -1){ 
    FM_INIT_REC();
    return; 
  }
  let val=document.getElementById('dd_trano'+ndx).innerHTML;
  document.getElementById('tx_trano').innerHTML=val;
  FM_DISP_REC(val);
  look_fm_returns();
}

function lookup_subarea_fm_returns(){
  var flds=[    
    { title:"Area Name", fld:"name", type:"text", width:"50%", align:"center" },
    { title:"Area No", fld:"areano", type:"text", width:"50%", align:"center" }
  ];
  //FM_LOOKUP(true,txt_areaname.innerHTML,DB_AREA,[],'LOOKUP','lookup_subarea_fm_returns','name',flds,'areano');
  var ob=[
    { val:txt_areano.innerHTML, fld:"areano" }
  ];
  FM_LOOKUP2(true,txt_areaname.innerHTML,ob,DB_AREA,['name'],'LOOKUP','do_lookup_subarea_fm_returns',flds);
}
function do_lookup_subarea_fm_returns(ndx){  
  if(ndx == -1){ 
    document.getElementById('txt_areano').innerHTML='';
    document.getElementById('txt_areaname').value='';
    return; 
  }
  let val=document.getElementById('dd_areano'+ndx).innerHTML;
  if(!exist_ptr2(val,txt_stockno.innerHTML)){ 
    MSG_SHOW(vbOk,"ERROR:",document.getElementById('dd_name'+ndx).innerHTML+" has no transaction with "+txt_descrp.innerHTML,function(){},function(){});
    return; 
  }
  document.getElementById('txt_areano').innerHTML=val;
  document.getElementById('txt_areaname').innerHTML=document.getElementById('dd_name'+ndx).innerHTML;
}

function exist_ptr2(areano,stockno){
  let rval=false;
  if(!stockno){ return true; }
  for(var i=0;i<DB_PTR2.length;i++){
    if(areano==DB_PTR2[i].areano && stockno==DB_PTR2[i].stockno){ //found
      rval=true;
      break;
    }
  }
  return rval;
}

function clear_add_item(){
  document.getElementById('txt_stockno').innerHTML='';
  document.getElementById('txt_lotno').value='';
  document.getElementById('txt_loc').value='';
  document.getElementById('txt_descrp').innerHTML='';
}

function lookup_stock_fm_returns(){  
  let areano=document.getElementById('txt_areano').innerHTML;
  if(!areano){
    snackBar('Please enter Sub-Area first...');
    return;
  }
    
  var flds=[    
    { title:"Vaccine", fld:"descrp", type:"text", width:"30%", align:"center" },
    { title:"", fld:"stockno", type:"text", width:"0%", align:"center" },
    { title:"", fld:"expiry", type:"date", width:"0%", align:"center" },
    { title:"", fld:"loc", type:"text", width:"0%", align:"center" },
    { title:"", fld:"refno", type:"text", width:"15%", align:"center" },
    { title:"Lot No", fld:"lotno", type:"text", width:"20%", align:"center" },
    { title:"Location", fld:"get_loc|loc", type:"text", width:"15%", align:"center" },
    { title:"RSI Date", fld:"date_rel", type:"date", width:"15%", align:"center" },
    { title:"Ref-No", fld:"trano", type:"text", width:"20%", align:"center" }    
  ];
  
  //alert('stockno:'+stockno);
  var newArr1 = DB_PTR2.filter(function(DB_PTR2) {
    return DB_PTR2.areano == txt_areano.innerHTML;
  });
  //let newArr=[...newArr1,...DB_STOCK];
  /*
  alert('lookup'+
    '\nv_areano:'+txt_areano.innerHTML+
    '\nv_stockno:'+txt_stockno.innerHTML+
    '\nv_lotno:'+txt_lotno.value+
    '\nv_loc:'+txt_loc.value+
    '\nv_refno:'+txt_refno.innerHTML
  );
  */

  var ob=[
    { val:txt_stockno.innerHTML, fld:"stockno" },
    { val:txt_lotno.value, fld:"lotno" },
    { val:txt_refno.innerHTML, fld:"trano" }
  ];
  FM_LOOKUP2(true,txt_descrp.innerHTML,ob,newArr1,['descrp','*date_rel','trano'],'LOOKUP','do_lookup_stock_fm_returns',flds,'fld_color_rt');
}

function fld_color_rt(){
  var len_look=document.querySelectorAll('.cls_names').length; 
  for(var i=0;i<len_look;i++){
    let v_trano=document.getElementById('dd_trano'+i).innerHTML;
    console.log('*** fld_color_rt: '+v_trano);
    if(!v_trano || v_trano===undefined){ document.getElementById('d_'+i).style.color='blue'; }
  }
}

function do_lookup_stock_fm_returns(ndx){	  
  if(ndx == -1){ 
    clear_add_item();    
    return; 
  }
  let val=document.getElementById('dd_stockno'+ndx).innerHTML;
  document.getElementById('txt_stockno').innerHTML=val;
  //alert(document.getElementById('dd_refno'+ndx).innerHTML);
  document.getElementById('txt_lotno').value=document.getElementById('dd_lotno'+ndx).innerHTML;
  document.getElementById('txt_loc').value=document.getElementById('dd_loc'+ndx).innerHTML;
  document.getElementById('txt_descrp').innerHTML=document.getElementById('dd_descrp'+ndx).innerHTML;
  let vtype=JBE_GETFLD('type',DB_STOCK,'stockno',val);
  document.getElementById('txt_type').innerHTML=vtype;
  document.getElementById('txt_expiry').value=document.getElementById('dd_expiry'+ndx).innerHTML;
  document.getElementById('txt_refno').innerHTML=document.getElementById('dd_trano'+ndx).innerHTML;
  document.getElementById('txt_docno').innerHTML=document.getElementById('dd_refno'+ndx).innerHTML;
  //alert(document.getElementById('dd_expiry'+ndx).innerHTML+' vs '+document.getElementById('txt_expiry').innerHTML);
  /*
  console.log('type:'+vtype);
  console.log('val:'+val);
  console.log('txt_areano:'+txt_areano.innerHTML);
  console.log('txt_refno:'+txt_refno.innerHTML);
  */
}


//
function init_fm_returns(){  
  document.getElementById('tx_trano').value='';
  document.getElementById('lu_trano').disabled=false;
  document.getElementById('lu_trano').style.opacity='1';    
}
//
function add_fm_returns(){  
  let prfx='RT-';
  let last_trano='1';
  let v_date=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');
  let sql='SELECT * FROM '+FM_TABLE_NAME+' ORDER BY trano';
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
    console.log('new_trano:'+new_trano);
        
    FM_FORCE_ADDREC(FM_TRANS,new_trano,'edit_fm_returns','tx_trano');    
  })    
  .catch(function (error) { console.log(error); });
}
//
function add_item_fm_returns(f_add){
  var curRow=document.getElementById('div_FM_dtl_div2').getAttribute('data-row');
  var recno=document.getElementById('tx_trano').value;
  var v_details=document.getElementById('tx_details').value;
  var v_date=document.getElementById('tx_date').value;
  
  //alert('add_item_fm_returns(f_add):'+f_add);
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
    snackBar('Details is Empty.');
    //document.getElementById('tx_trano').focus();
    return false;
  }

  var len_dtls=document.querySelectorAll('.dtls').length;   
  if(len_dtls==0 && !f_add){ 
    snackBar('Cannot Edit empty record');
    return false;
  }

  let v_vaccine='';
  let v_lotno='';
  let v_loc='';
  let v_stockno='';
  let v_expiry='';
  let v_type='';
  let v_areaname='';
  let v_areano='';
  let v_qty='';
  let v_ret_date=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');
  let v_rti='-';
  let v_trano=recno;  
  let v_refno='';
  let v_docno='';

  if(!f_add){
    v_vaccine=document.getElementById('dtl_descrp_'+curRow).innerHTML;
    v_lotno=document.getElementById('dtl_lotno_'+curRow).innerHTML;
    v_loc=document.getElementById('dtl_loc_'+curRow).innerHTML;
    v_qty=document.getElementById('dtl_qty_'+curRow).innerHTML;
    v_ret_date=JBE_DATE_FORMAT(document.getElementById('dtl_ret_date_'+curRow).innerHTML,'YYYY-MM-DD');
    v_rti=document.getElementById('dtl_rti_'+curRow).innerHTML;
    v_stockno=document.getElementById('dtl_stockno_'+curRow).innerHTML;
    v_type=document.getElementById('dtl_type_'+curRow).innerHTML;
    v_refno=document.getElementById('dtl_refno_'+curRow).innerHTML;
    v_docno=document.getElementById('dtl_docno_'+curRow).innerHTML;
    v_expiry=JBE_DATE_FORMAT(document.getElementById('dtl_expiry_'+curRow).innerHTML,'YYYY-MM-DD');
    v_areano=document.getElementById('dtl_areano_'+curRow).innerHTML;
    v_areaname=document.getElementById('dtl_areaname_'+curRow).innerHTML;
    v_trano=document.getElementById('dtl_trano_'+curRow).innerHTML;
  }

  let v_bal=JBE_GETFLD2('balance',DB_TRANSFER2,[
    { "fld":"loc","val":v_loc },
    { "fld":"stockno","val":v_stockno },
    { "fld":"lotno","val":v_lotno }
  ]);    
  
  /*
  alert('add_item'+
    '\nBalance:'+v_bal+
    '\nv_areano:'+v_areano+
    '\nv_expiry:'+v_expiry+
    '\nv_trano:'+v_trano+
    '\nv_refno:'+v_refno+
    '\nv_docno:'+v_docno
  );
  */
  
  var dtl=          
    '<div id="div_name" data-zoom=0 style="width:100%;height:100%;font-text:14px;padding:5px;background-color:white;">'+  
      '<div class="class_mtr0" style="display:none;margin-top:5px;">'+                        
        '<span id="txt_trano" class="class_mtr2" style="width:50%;color:red;">'+v_trano+'</span>'+
        '<span id="txt_stockno" class="class_mtr2" style="width:50%;color:red;">'+v_stockno+'</span>'+
        '<span id="txt_type" class="class_mtr2" style="width:50%;color:red;">'+v_type+'</span>'+
        '<span id="txt_areano" class="class_mtr2" style="width:50%;color:red;">'+v_areano+'</span>'+
        '<span id="txt_date" class="class_mtr2" style="width:50%;color:red;">'+v_date+'</span>'+
        '<span id="txt_refno" class="class_mtr2" style="width:50%;color:red;">'+v_refno+'</span>'+  
        '<span id="txt_docno" class="class_mtr2" style="width:50%;color:red;">'+v_docno+'</span>'+       
      '</div>'+ 

      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Sub-Area:</span>'+        
        '<span id="txt_areaname" class="class_mtr2" style="width:50%;color:red;overflow:auto;">'+v_areaname+'</span>'+
        '<button id="btn_areaname" style="float:right;width:40px;height:100%;font-weight:bold;margin-right:3px;border-radius:5px;color:white;background:'+JBE_CLOR+';" onclick="lookup_subarea_fm_returns()">...</button>'+        
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Vaccine:</span>'+        
        '<span id="txt_descrp" class="class_mtr2" style="width:50%;color:red;overflow:auto;">'+v_vaccine+'</span>'+
        '<button id="btn_descrp" style="float:right;width:40px;height:100%;font-weight:bold;margin-right:3px;border-radius:5px;color:white;background:'+JBE_CLOR+';" onclick="lookup_stock_fm_returns()">...</button>'+        
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Lot No.:</span>'+        
        '<input type="text" id="txt_lotno" class="class_mtr2" disabled style="color:red;overflow:auto;" value="'+v_lotno+'" />'+
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Expiry:</span>'+        
        '<input type="date" id="txt_expiry" class="class_mtr2" disabled style="color:red;overflow:auto;" value="'+v_expiry+'" />'+
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Location:</span>'+        
        '<select id="txt_loc" name="txt_loc" onchange="chg_loc_returns('+v_loc+')" class="class_mtr2" style="float:left;width:50%;color:red;height:100%;padding:0px;">';
          let dtlfld='';            
          for(var i=0;i < DB_WHOUSE.length;i++){
            let vsel='';
            if(v_loc==DB_WHOUSE[i].whcode){ vsel='selected'; }
            dtlfld+='<option '+vsel+' value="'+DB_WHOUSE[i].whcode+'">'+DB_WHOUSE[i].name+'</option>';
          }
          dtl+=dtlfld+
        '</select>'+
      '</div>'+
            
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Quantity:</span>'+        
        '<input type="number" id="txt_qty" class="class_mtr2" style="color:red;overflow:auto;" value="'+v_qty+'" />'+
      '</div>'+
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Ret. Date:</span>'+        
        '<input type="date" id="txt_ret_date" class="class_mtr2" style="color:red;overflow:auto;" value='+v_ret_date+' />'+
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">RTI:</span>'+  
        '<span id="txt_rti" class="class_mtr1" style="display:none;">'+v_rti+'</span>'+           
        '<span id="txt_rti2" data-rti='+v_rti+' class="class_mtr2" style="color:red;">'+
          '<input type="radio" id="rti1" '+iif(v_rti == 'YES','checked','')+' onclick="chg_rti(&quot;YES&quot;)" name="fav_rti" style="margin-left:0px;" value=0>'+
            '<label for="rti1">Yes</label>'+
          '<input type="radio" id="rti2" '+iif(v_rti != 'YES','checked','')+' onclick="chg_rti(&quot;-&quot;)" name="fav_rti" style="margin-left:30px;" value=1>'+
            '<label for="rti2">No</label>'+   
        '</span>'+         
      '</div>'+ 
      
    '</div>';
  JBE_OPEN_VIEW(dtl,'','');
  return true;
}

function chg_loc_returns(loc){
  console.log(txt_loc.value,txt_stockno.innerHTML,txt_lotno.value);
  let rec=JBE_GETFLD2('trano',DB_TRANSFER2,[
    { "fld":"loc","val":txt_loc.value },
    { "fld":"stockno","val":txt_stockno.innerHTML },
    { "fld":"lotno","val":txt_lotno.value }
  ]); 
  console.log('rec:'+rec);
  if(!rec){
    MSG_SHOW(vbOk,"ERROR: ","Location/Freezer Not Found...,<br>Add New Location at Freezer Facility.",function(){},function(){}); 
    txt_loc.value=loc;
  }
}

function chg_rti(v){
  document.getElementById('rti1').value=0;
  document.getElementById('rti2').value=1;
  if(v=='YES'){ 
    document.getElementById('rti1').value=1; 
    document.getElementById('rti2').value=0; 
  }
  //document.getElementById('txt_rti').setAttribute('data-rti',v); 
  document.getElementById('txt_rti').innerHTML=v;
}

//edit
function edit_fm_returns(){
  document.getElementById('lu_trano').disabled=true;
  document.getElementById('lu_trano').style.opacity='.5';
  //document.getElementById('lu_areano').disabled=false;
  //document.getElementById('lu_areano').style.opacity='1';
  //document.getElementById('tx_details').disabled=true;
}
//look
function look_fm_returns(fld){
  if(fld=='trano'){ 
    disp_fm_returns();
    //disp_fm_returns(1);
  }  
}
//del
function del_fm_returns(stat,r){
  if(stat==2){ DB_RETURNS=r; } 
}
//save
function save_fm_returns(stat,r){
  //alert('stat :'+stat+' r:'+r.length);
  if(stat==0){
    let ob=[      
      { fld:"date",val:document.getElementById('tx_date').value }
    ];
    return ob;
  }  
  if(stat==1){
    //alert('interrupted....'); return false;
    /*
    console.clear();
    var len_dtls=document.querySelectorAll('.dtls').length;    
    for(var i=1;i<=len_dtls;i++){ 
      if(!document.getElementById('fil_areano_'+i)){
        alert('new add');
        continue;
      }
      let v_loc_old=Number(document.getElementById('fil_areano_'+i).innerHTML);
      let v_loc=Number(document.getElementById('dtl_areano_'+i).innerHTML);
      alert(v_loc_old+' vs new: '+v_loc);
    }
    //return false;
    */
    update_stocks_returns(-1);
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
    //console.clear();
    //alert('----alams na!!!!!!!:'+FM_FM_MODE);
    DB_RETURNS=r; 
  }
  if(stat==3){
    console.log('----show na!!2222222!!!!!:'+FM_FM_MODE);
    DB_RETURNS2=r; 
    update_stocks_returns(1);
  }
}

function update_stocks_returns(mode){
  console.clear();
  var len_dtls=document.querySelectorAll('.dtls').length;    
  for(var i=1;i<=len_dtls;i++){
    let v_display=document.getElementById('dtl_'+i).style.display; 
    let v_loc=Number(document.getElementById('dtl_loc_'+i).innerHTML);
    let v_stockno=Number(document.getElementById('dtl_stockno_'+i).innerHTML);
    let v_lotno=document.getElementById('dtl_lotno_'+i).innerHTML; 
    let v_qty=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_qty_'+i).innerHTML);
    if(mode == -1){
      for(var k=0;k<FM_FIELDS2.length;k++){
        if(!FM_FIELDS2[k].hd=='FILLER'){ continue; }

        let div='fil_'+FM_FIELDS2[k].fld+'_'+i;
        if(!document.getElementById(div)){ continue; }

        console.log(i+' good: '+div);
      }
      v_loc=Number(document.getElementById('fil_loc_'+i).innerHTML);
      v_stockno=Number(document.getElementById('fil_stockno_'+i).innerHTML);
      v_qty=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('fil_qty_'+i).innerHTML); 
      UPDATE_LOC_STOCKBAL(v_loc,v_stockno,v_lotno,v_qty,0); 
    }else{
      UPDATE_LOC_STOCKBAL(v_loc,v_stockno,v_lotno,v_qty,0); 
    }
    console.log(i+' proceed....');
  }
}

//disp
function disp_fm_returns(){   
  //alert('disp_fm_returns '+disp_mode);
  var n = new Date().toLocaleTimeString('it-IT');  
  //document.getElementById('lu_areano').disabled=true;
  //document.getElementById('lu_areano').style.opacity='0.5';  
  /*
  if(disp_mode==0){
    document.getElementById('lu_trano').disabled=false;
    document.getElementById('lu_trano').style.opacity='1';  
  }else if(disp_mode==1){
    recno=document.getElementById('tx_trano').value;
  }  
  */
  document.getElementById('lu_trano').disabled=false;
  document.getElementById('lu_trano').style.opacity='1';  
}
//
function quit_fm_returns(){   
  return 0;
}

/*
function save_item_fm_returns(){ 
  //alert('process save item; add:'+f_add);  
  let aryFLD=[    
    { fld:"descrp", type:"text", dupli:0, disp:1, err:"Please enter an Item." },
    { fld:"qty", type:"number", dupli:0, disp:1, err:"Please enter Quantity." },
    { fld:"ret_date", type:"date", dupli:0, disp:1, err:"Please enter Returned Date." },
    { fld:"rti", type:"number", dupli:0, disp:1, err:"Please enter orig RTI flag." },
    { fld:"areano", type:"text", dupli:0, disp:0, err:"Sub Area No. is Empty." },
    { fld:"stockno", type:"text", dupli:1, disp:0, err:"Stock No. is Empty." },
    { fld:"date", type:"text", dupli:0, disp:0, err:"Date is Empty." },
    { fld:"trano", type:"text", dupli:0, disp:0, err:"Trano is Empty." }
  ];
  return aryFLD;
}
*/