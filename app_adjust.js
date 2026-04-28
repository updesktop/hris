function fm_adjust(){  
  //get_app_default();
  FM_TRANS='ADJ';
  FM_FM_MODE=2;
  FM_TABLE=DB_ADJ;    FM_TABLE_NAME='adj';

  FM_TABLE2=DB_ADJ2;  FM_TABLE_NAME2='adj2';

  FM_RKEY='trano';  FM_RKEY2='stockno';
  FM_CB='';

  FM_FIELDS=[ //display on screen; disp:1s and disp:0s 
    { div:"tx_trano", fld:"trano", type:"text", disp:1, save:true },
    { div:"tx_date", fld:"date", type:"date", disp:1, save:true },
    { div:"tx_details", fld:"details", type:"text", disp:1, save:true }
  ];
  
  FM_FIELDS2=[ //display on screen
    { hd:"", fld:"trano", type:"text", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },
    { hd:"", fld:"date", type:"text", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },    
    { hd:"", fld:"stockno", type:"text", input:false, width:"20%", align:"center", dupli:1, err:"Please enter Vaccine", disp:0, save:true },
    { hd:"", fld:"loc", type:"number", input:true, width:"20%", align:"center", dupli:0, err:"", disp:0, save:true },

    { hd:"Stock Description", fld:"descrp", type:"text", input:false, width:"30%", align:"left", dupli:0, err:"Please enter an Item.", disp:1, save:true },
    { hd:"Lot No.", fld:"lotno", type:"text", input:true, width:"20%", align:"left", dupli:1, err:"Please enter Lot No.", disp:1, save:true },
    { hd:"Location", fld:"get_loc_adj|loc", type:"text", input:true, width:"10%", align:"left", dupli:0, err:"", disp:1, save:false },    
    { hd:"Adjustment Mode", fld:"drcr", type:"text", input:false, width:"20%", align:"center", dupli:0, err:"Please enter DRCR flag.", disp:1, save:true },
    { hd:"Quantity", fld:"qty", type:"number", input:true, width:"20%", align:"center", dupli:0, err:"Please enter Quantity.", disp:1, save:true }          
  ];
    
  var fm_ob = {
    title:"INVENTORY ADJUSTMENT",  
    title2:"ADJUSTMENT",
    width:"800px",height:"270px",
    head:"100px", foot:"0px",
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

    '<div id="div_FM_head" style="width:100%;height:'+fm_ob.head+'px;margin-top:0px;text-align:left;padding:5px;border:1px solid lightgray;background:none;">'+

      '<div class="cls_fm_dtl">'+                    
        '<div style="width:'+fm_layout_width+'%;">'+    
          '<span onclick="JBE_SHOW_LOGGER(tx_trano.value,&quot;'+FM_TRANS+'&quot;)" style="float:left;cursor:help;">Ref No.:</span>'+                                    
          '<input id="lu_trano" type="image" src="gfx/jsearch.png" onclick="lookup_trano_fm_adjust(tx_trano.value)" />'+
        '</div>'+
        '<input id="tx_trano" type="text" style="width:40%;" data-docno="" onchange="FM_CHK_REC(tx_trano.value)" data-caption="Transaction No." value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_trano.id).focus()" />'+
      '</div>'+

      '<div class="cls_fm_dtl">'+
        '<div style="width:'+fm_layout_width+'%;">Date:</div>'+  
        '<input id="tx_date" type="date" style="width:40%;" data-caption="Date" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_date.id).focus()" />'+
      '</div>'+
      
      '<div class="cls_fm_dtl">'+        
        '<div style="width:'+fm_layout_width+'%;">Details:</div>'+ 
        '<input id="tx_details" type="text" data-caption="Details" style="width:'+(100-fm_layout_width+0)+'%;" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_details.id).focus()" />'+
      '</div>'+

    '</div>';
  
  FM_FUNC={
    lu:"lookup_fm_adjust",
    look:"look_fm_adjust",
    init:"init_fm_adjust",
    add:"add_fm_adjust",    
    edit:"edit_fm_adjust",
    del:"del_fm_adjust",
    disp:"disp_fm_adjust",
    save:"save_fm_adjust",
    quit:"quit_fm_adjust",
    add_item:"add_item_fm_adjust"
  }
  FM_MAIN(fm_ob,fm_layout);
  //var fm_layout_height=H_BODY-parseInt(document.getElementById('div_FM_head').style.height);
  //document.getElementById('div_FM_dtl').style.height=(fm_layout_height-70)+'px';
} 

function get_loc_adj(whcode){
  return JBE_GETFLD('name',DB_WHOUSE,'whcode',whcode);
}

function lookup_trano_fm_adjust(trano){  
  var flds=[
    { title:"Ref. No", fld:"trano", type:"text", width:"20%", align:"left" },
    { title:"Date", fld:"date", type:"date", width:"25%", align:"left" },
    { title:"Details", fld:"details", type:"text", width:"55%", align:"left" }    
  ];
  //FM_LOOKUP(true,tx_trano.value,FM_TABLE,[],'RETURNS LOOKUP 1','lookup_fm_adjust','trano',flds,'trano');
  var ob=[
    { val:tx_trano.value, fld:"trano" }
  ];
  FM_LOOKUP2(true,tx_trano.value,ob,FM_TABLE,['*trano'],'LOOKUP','lookup_fm_adjust',flds);
}
function lookup_fm_adjust(ndx){	   
  if(ndx == -1){ 
    FM_INIT_REC();
    return; 
  }
  let val=document.getElementById('dd_trano'+ndx).innerHTML;
  document.getElementById('tx_trano').innerHTML=val; 
  FM_DISP_REC(val);
  look_fm_adjust();
}

function lookup_stock_fm_adjust(){
  var flds=[    
    { title:"", fld:"stockno", type:"text", width:"20%", align:"center" },
    { title:"", fld:"loc", type:"text", width:"20%", align:"center" },
    { title:"Stock Name", fld:"descrp", type:"text", width:"50%", align:"center" },    
    { title:"Lot No", fld:"lotno", type:"text", width:"30%", align:"center" },
    { title:"Location", fld:"get_loc|loc", type:"text", width:"20%", align:"center" }
  ];
  //FM_LOOKUP(true,txt_descrp.innerHTML,DB_STOCK,[],'LOOKUP','do_lookup_stock_fm_adjust','descrp',flds,'stockno');
  var ob=[
    { val:txt_stockno.innerHTML, fld:"stockno" },
    { val:txt_lotno.value, fld:"lotno" }
  ];
  FM_LOOKUP2(true,txt_descrp.innerHTML,ob,DB_TRANSFER2,[],'LOOKUP','do_lookup_stock_fm_adjust',flds);
}
function do_lookup_stock_fm_adjust(ndx){
  if(ndx == -1){ 
    document.getElementById('txt_descrp').innerHTML='';
    return; 
  }
  let val=document.getElementById('dd_stockno'+ndx).innerHTML;
  document.getElementById('txt_stockno').innerHTML=val;
  document.getElementById('txt_descrp').innerHTML=document.getElementById('dd_descrp'+ndx).innerHTML;  
  document.getElementById('txt_lotno').value=document.getElementById('dd_lotno'+ndx).innerHTML;    
  let loc=document.getElementById('dd_loc'+ndx).innerHTML;    
  document.getElementById('txt_loc').value=loc;
  document.getElementById('txt_locname').value=get_loc(loc);
}

//
function init_fm_adjust(){  
  document.getElementById('tx_trano').value='';
  document.getElementById('lu_trano').disabled=false;
  document.getElementById('lu_trano').style.opacity='1'; 
}

//
function add_fm_adjust(){   
  let prfx='AJ-';
  let last_trano='1';
  let v_date=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');
  let sql='SELECT * FROM '+FM_TABLE_NAME+' ORDER BY trano';
  axios.get(FM_API, { params: {sql:sql,fld:'',tbl:FM_TABLE_NAME,fm_mode:1 }}, {headers: { 'Content-Type': 'application/json' }})  
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
        
    FM_FORCE_ADDREC(FM_TRANS,new_trano,'edit_fm_adjust','tx_trano');    
  })    
  .catch(function (error) { console.log(error); });
}
//
//
function add_item_fm_adjust(f_add){
  var curRow=document.getElementById('div_FM_dtl_div2').getAttribute('data-row');
  var recno=document.getElementById('tx_trano').value;
  var v_details=document.getElementById('tx_details').value;
  var v_date=document.getElementById('tx_date').value;
  
  //alert('add_item_fm_adjust(f_add):'+f_add);
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
  let v_stockno='';  
  let v_lotno='';  
  let v_loc=''; 
  let v_qty='';  
  let v_drcr='Debit';
  let v_trano=recno;  

  if(!f_add){
    v_vaccine=document.getElementById('dtl_descrp_'+curRow).innerHTML;
    v_qty=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_qty_'+curRow).innerHTML);    
    v_drcr=document.getElementById('dtl_drcr_'+curRow).innerHTML;
    v_stockno=document.getElementById('dtl_stockno_'+curRow).innerHTML;
    v_lotno=document.getElementById('dtl_lotno_'+curRow).innerHTML;
    v_loc=document.getElementById('dtl_loc_'+curRow).innerHTML;
    v_trano=document.getElementById('dtl_trano_'+curRow).innerHTML;
  }

  //alert(f_add+' ::: v_loc:'+v_loc);
    
  let v_head='Add';
  if(!f_add){ v_head='Edit'; }

  var dtl=          
    '<div id="div_name" data-zoom=0 style="width:100%;height:100%;font-text:14px;padding:5px;background-color:white;">'+         
      '<div style="width:100%;height:25px;padding:4px;font-size:14px;font-weight:bold;color:white;background:'+JBE_CLOR2+';">'+
        '<span style="float:left;width:auto;">'+v_head+' Item</span>'+
        '<span style="float:right;width:auto;">Stock Adjustment Facility</span>'+        
      '</div>'+
      '<div class="class_mtr0" style="display:none;margin-top:5px;">'+                        
        '<span id="txt_trano" class="class_mtr2" style="width:50%;color:red;">'+v_trano+'</span>'+
        '<span id="txt_stockno" class="class_mtr2" style="width:50%;color:red;">'+v_stockno+'</span>'+        
        '<span id="txt_date" class="class_mtr2" style="width:50%;color:red;">'+v_date+'</span>'+       
        //'<span id="txt_loc" class="class_mtr2" style="width:50%;color:red;">'+v_loc+'</span>'+       
        '<input type="number" id="txt_loc" class="class_mtr2" style="width:50%;color:red;" value="'+v_loc+'" />'+       
      '</div>'+ 
      
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Vaccine:</span>'+        
        '<span id="txt_descrp" class="class_mtr2" style="width:50%;color:red;overflow:auto;">'+v_vaccine+'</span>'+
        '<button id="btn_descrp" style="float:right;width:40px;height:100%;font-weight:bold;margin-right:3px;border-radius:5px;color:white;background:'+JBE_CLOR+';" onclick="lookup_stock_fm_adjust()">...</button>'+        
      '</div>'+ 

      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Lot No. :</span>'+        
        '<input type="text" id="txt_lotno" class="class_mtr2" style="color:red;overflow:auto;" value="'+v_lotno+'" />'+
      '</div>'+

      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Location :</span>'+        
        '<input type="text" id="txt_locname" class="class_mtr2" disabled style="color:red;overflow:auto;" value="'+get_loc(v_loc)+'" />'+
      '</div>'+

      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Adjust Mode:</span>'+  
        '<span id="txt_drcr" class="class_mtr1" style="display:none;">'+v_drcr+'</span>'+           
        '<span id="txt_drcr2" data-drcr='+v_drcr+' class="class_mtr2" style="color:red;">'+
          '<input type="radio" id="drcr1" '+iif(v_drcr == 'Debit','checked','')+' onclick="chg_drcr(&quot;Debit&quot;)" name="fav_drcr" style="margin-left:0px;" value=0>'+
            '<label for="drcr1">Debit</label>'+
          '<input type="radio" id="drcr2" '+iif(v_drcr != 'Debit','checked','')+' onclick="chg_drcr(&quot;Credit&quot;)" name="fav_drcr" style="margin-left:30px;" value=1>'+
            '<label for="drcr2">Credit</label>'+   
        '</span>'+         
      '</div>'+ 

      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Quantity:</span>'+        
        '<input type="number" id="txt_qty" class="class_mtr2" style="color:red;overflow:auto;" value="'+v_qty+'" />'+
      '</div>'+
      
    '</div>';
  //JBE_OPEN_VIEW(dtl,'','');
  JBE_SHOW_MODULE(true,dtl);
  return true;
}

function chg_drcr(v){
  document.getElementById('drcr1').value=0;
  document.getElementById('drcr2').value=1;
  if(v=='Debit'){ 
    document.getElementById('drcr1').value=1; 
    document.getElementById('drcr2').value=0; 
  }  
  document.getElementById('txt_drcr').innerHTML=v;
}

//edit
function edit_fm_adjust(){
  document.getElementById('lu_trano').disabled=true;
  document.getElementById('lu_trano').style.opacity='.5';
  //document.getElementById('lu_areano').disabled=false;
  //document.getElementById('lu_areano').style.opacity='1';
  //document.getElementById('tx_details').disabled=true;
}
//look
function look_fm_adjust(fld){
  if(fld=='trano'){ 
    disp_fm_adjust();
    //disp_fm_adjust(1);
  }  
}
//del
function del_fm_adjust(stat,r){
  if(stat==2){ DB_ADJ=r; } 
}
//save
function save_fm_adjust(stat,r){
  //alert('stat :'+stat+' r:'+r.length);
  if(stat==0){
    let ob=[      
      { fld:"date",val:document.getElementById('tx_date').value }
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
    DB_ADJ=r; 
  }
  if(stat==3){
    DB_ADJ2=r; 
  }
}
//disp
function disp_fm_adjust(){   
  //alert('disp_fm_adjust '+disp_mode);
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
function quit_fm_adjust(){   
  return 0;
}
