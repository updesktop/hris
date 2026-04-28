function main_ptr(vType,cb){
  //alert(vType);
  FM_CB=cb;
  FM_FM_MODE=2;
  FM_TABLE=DB_PTR;    FM_TABLE_NAME='ptr';
  FM_TABLE2=DB_PTR2;  FM_TABLE_NAME2='ptr2';

  FM_RKEY='trano';  FM_RKEY2='stockno';

  if(!JBE_CHK_USER(0)){ return; };
  //get_app_default();
  f_MainPage=false;
  var aryType=['NIP','COVAC','X','REG'];
  var aryPrefix=['NIP ','C19 ','X ','S19 '];
  var aryClor=[
    { "fg":"black","bg":"#FFD700" },
    { "fg":"white","bg":"green" },
    { "fg":"black","bg":"pink" },
    { "fg":"black","bg":"none" }
  ]; 
  FM_TRANS=aryType[vType];
  
  var dtl=
  '<div style="width:100%;height:100%;background:none;">'+  
  
    '<div class="cls_filemain" style="height:100%;font-size:12px;text-align:center;padding:0px;border:1px solid lightgray;background:white;">'+  

      '<div id="ptr_title" style="width:100%;height:25px;font-weight:bold;font-size:14px;border:0px solid black;color:white;background:'+JBE_CLOR2+';">'+
        '<div id="FM_BACK" style="display:none;float:left;width:30px;height:100%;padding:0px;cursor:pointer;">'+
          '<img src="gfx/jprev.png" onclick="'+FM_CB+'()" style="height:100%;" alt="call image" />'+
        '</div>'+  
        '<div id="l_title" style="float:left;width:50%;height:100%;padding:4px;text-align:left;background:none;">Left</div>'+
        '<div id="r_title" style="float:right;width:auto;height:100%;padding:4px;text-align:right;background:none;">'+FM_TRANS+'</div>'+
      '</div>'+

      '<div id="div_ptr_entry" style="width:100%;height:100%;border:0px solid red;">'+

        '<div id="ptr_head" data-trano="" data-ptrType='+vType+' data-mode="0" data-trans="" style="width:100%;height:120px;text-align:center;padding:5px 5px 0px 5px;border:0px solid lightgray;background:none;">'+  

          '<div style="width:100%;height:50%;border:0px solid red;">'+

            '<div class="class_ptr0" style="float:left;width:40%;">'+        
              '<span class="class_ptr1" style="width:25%;">Date:</span>'+                            
              '<input id="ptrdate" type="date" style="width:75%;height:100%;" value="" placeholder="Date" />'+
            '</div>'+

            '<div class="class_ptr0" style="float:right;width:58%;">'+        
              '<span class="class_ptr1" onclick="JBE_SHOW_LOGGER(trano.value,&quot;'+aryType[vType]+'&quot;)" style="cursor:help;">RIS No.:</span>'+        
              '<input type="text" id="trano" data-docno="" class="class_ptr2" onchange="chk_trano(this.value,'+vType+')" style="text-transform:uppercase;width:64%;padding:0px 0 0 0;text-align:center;color:'+aryClor[vType].fg+';background:'+aryClor[vType].bg+';" value="'+aryPrefix[vType]+'" />'+
              '<button id="btn_trano" style="float:right;width:40px;height:100%;font-weight:bold;margin-right:3px;border-radius:5px;color:white;background:'+JBE_CLOR+';" onclick="sel_trano()">...</button>'+
            '</div>'+     

          '</div>'+

          '<div style="display:none;">'+        
            '<span id="rcvd_name"></span>'+  
            '<span id="rcvd_pos"></span>'+  
            '<span id="rcvd_tel"></span>'+  
          '</div>'+

          '<div id="sub_areano" style="display:none;"></div>'+  

          '<div class="class_ptr0">'+        
            '<div style="float:left;width:80%;height:100%;text-align:left;border:0px solid gold;background:none;">'+        
              
              '<div style="float:left;width:100%;height:55%;background:none;">'+
                '<div class="class_ptr_1">Sub Area:</div>'+        
                '<div id="sub_area" data-areano="" class="class_ptr_2" style="font-size:15px;padding:0px;color:blue;"></div>'+
              '</div>'+
              
              '<div style="float:left;width:100%;height:50%;background:none;">'+        
                '<div class="class_ptr_1">Details:</div>'+
                '<input type="text" id="details" data-docno="" disabled class="class_ptr_2" style="color:blue;font-size:10px;padding:0px  0 0 0;" />'+
              '</div>'+

            '</div>'+            
            '<button id="btn_name" style="float:right;width:40px;height:100%;font-weight:bold;margin-right:3px;border-radius:5px;color:white;background:'+JBE_CLOR+';" onclick="sel_sub_area()">...</button>'+            
          '</div>'+ 

        '</div>'+ //ptr_head

        '<div id="ptr_body" style="display:block;position:relative;width:100%;height:140px;text-align:center;padding:5px;background:none;">'+            
          
          '<div id="ptr_div1" style="position:relative;width:100%;height:40px;font-size:11px;color:navy;border:1px solid lightgray;padding:0px;color:white;background:'+JBE_CLOR2+';">'+
          
            '<div class="class_mtr0" style="display:none;float:left;width:15%;height:100%;">'+        
              '<span class="class_mtr1" style="width:100%;">Date Acquired</span>'+
            '</div>'+
            '<div class="class_mtr0" style="float:left;width:23%;height:100%;overflow:auto;">'+        
              '<span class="class_mtr1" style="width:100%;">Description</span>'+
            '</div>'+
            '<div class="class_mtr0" style="float:left;width:13%;height:100%;overflow:auto;">'+        
              '<span class="class_mtr1" style="width:100%;">'+iif(vType==3,"Model/Serial","Lot Number")+'</span>'+
            '</div>'+
            '<div class="class_mtr0" style="float:left;width:10%;height:100%;overflow:auto;">'+        
              '<span class="class_mtr1" style="width:100%;">Expiry</span>'+
            '</div>'+
            '<div class="class_mtr0" style="float:left;width:7%;height:100%;">'+        
              '<span class="class_mtr1" style="width:100%;text-align:center;">Loc</span>'+
            '</div>'+
            '<div class="class_mtr0" style="float:left;width:10%;height:100%;padding:0px 0 0 0;overflow:auto;">'+        
              '<span class="class_mtr1" style="width:100%;text-align:center;">Requested QTY</span>'+
            '</div>'+        
            '<div class="class_mtr0" style="float:left;width:5%;height:100%;padding:0px 0 0 0;overflow:auto;">'+        
              '<span class="class_mtr1" style="width:100%;text-align:center;">S/A</span>'+
            '</div>'+       
            '<div class="class_mtr0" style="float:left;width:10%;height:100%;overflow:auto;">'+        
              '<span class="class_mtr1" style="width:100%;text-align:center;">Unit Cost</span>'+
            '</div>'+
            '<div class="class_mtr0" style="float:left;padding:0px;width:7%;height:100%;overflow:none;">'+        
              '<span class="class_mtr1" style="width:100%;text-align:center;">Issued QTY</span>'+
            '</div>'+        
            '<div class="class_mtr0" style="float:left;width:15%;height:100%;">'+        
              '<span class="class_mtr1" style="width:100%;text-align:center;">Amount</span>'+
            '</div>'+

          '</div>'+

          //details item
          '<div id="ptr_dtl" data-row=0 style="width:100%;height:'+iif(!JBE_MOBILE,100,55)+'px;margin-top:5px;overflow:auto;border:1px solid lightgray;padding:0px;background:none;">'+
          '</div>'+
          //TOTAL
          '<div id="ptr_rel_dtl" style="width:100%;height:'+iif(!JBE_MOBILE,25,50)+'px;margin-top:0px;padding:3px 0 0 0;font-size:13px;font-weight:bold;border:0px solid gold;background:none;">'+
            '<div class="cls_ptr_tot_panel">'+
              '<div>Released Date:</div>'+        
              '<input id="date_rel" disabled type="date" />'+ 
            '</div>'+
            '<div class="cls_ptr_tot_panel"  style="margin-left:10px;">'+
              '<div>Time:</div>'+        
              '<input id="time_rel" disabled type="time" name="time" />'+ 
            '</div>'+
            '<div class="cls_ptr_tot_panel" style="float:right;">'+
              '<div>Total:</div>'+  
              //'<div id="ptr_tot" style="float:left;width:100px;height:100%;text-align:right;padding:3px;color:black;background:lightgray;"></div>'+ 
              '<div id="ptr_tot" style="width:100px;text-align:right;padding:3px;color:black;background:lightgray;"></div>'+ 
            '</div>'+
          '</div>'+

          //'<div id="cancel_dtl" data-row=0 class="cls_cancel" style="display:none;transform: rotate(-0deg);position:absolute;top:150px;left:0px;width:100%;height:auto;text-align:center;color:red;background:none;">'+        
          '<div id="cancel_dtl" data-row=0 class="cls_cancel" style="display:none;position:absolute;top:150px;left:0px;width:100%;height:auto;text-align:center;color:red;background:none;">'+        
            '<div style="margin:0 auto;width:60%;border:1px solid red;">*** CANCELLED ***</div>'+        
          '</div>'+

        '</div>'+ //ptr_body

      '</div>'+
      '<div id="div_ptr_box" style="display:none;width:100%;height:100%;border:0px solid blue;">'+'</div>'+

      '<div id="div_footer" class="color_head" style="display:block;height:50px;width:100%;background:'+JBE_CLOR+';padding:5px;font-size:14px;font-weight:bold;">'+        
      '</div>'+ 
      
    '</div>'+
    
  '</div>';
                          // 0123456789012
  JBE_OPEN_VIEW2(dtl,aryType[vType],'close_ptr');   
  
  let h_ptr_entry=(H_BODY-50-25-3);  
  let h_ptr_body=(H_BODY-parseInt(document.getElementById('ptr_head').style.height)-50-25);  
  let h_ptr_rel_dtl=parseInt(document.getElementById('ptr_rel_dtl').style.height);  
  console.log('h_ptr_rel_dtl:'+h_ptr_rel_dtl);
  document.getElementById('div_ptr_entry').style.height=h_ptr_entry+'px';
  document.getElementById('div_ptr_box').style.height=h_ptr_entry+'px';
  document.getElementById('ptr_body').style.height=h_ptr_body+'px';
  //document.getElementById('ptr_dtl').style.height=(h_ptr_body-55)+'px';      
  document.getElementById('ptr_dtl').style.height=(h_ptr_body-0-h_ptr_rel_dtl-55)+'px';      
  //document.getElementById('ptr_dtl').style.height=(h_ptr_body-80)+'px'; 
  init_ptr();  
}

function close_ptr(){
  //showMainPage();
  JBE_CLOSE_VIEW2();
}

function chk_trano(trano,ptrType){
  var aryPrefix=['NIP ','C19 '];
  //alert('trano.substring(0,4):'+trano.substring(0,4));
  //alert('aryPrefix[ptrType]:'+aryPrefix[ptrType]);
  //alert(ptrType);
  if(trano.substring(0,4) != aryPrefix[ptrType]){
    snackBar('ERROR: Prefix should be '+aryPrefix[ptrType]);
    document.getElementById('trano').value=aryPrefix[ptrType];
    document.getElementById('trano').focus();
    return;
  }

  let f_found=false;
  let v_type=0;
  for(var i=0;i<DB_PTR.length;i++){
    if(trano==DB_PTR[i].trano){
      v_type=DB_PTR[i].type;
      f_found=true;
      break;
    }
  }

  if(f_found){
    if(ptrType != v_type){
      //alert('dili mao'); 
      document.getElementById('trano').value='';
      init_ptr();
      return;
    }

    let docno=document.getElementById('trano').getAttribute('data-docno');    
    //alert('found,,, trano:'+trano+' vs docno:'+docno);    
    FM_FORCE_DELREC(FM_TRANS,docno);

    document.getElementById('ptr_head').setAttribute('data-trano',trano);  
    disp_ptr();
    return;
  }
       
  let docno=document.getElementById('trano').getAttribute('data-docno');
  //alert('trano:'+trano+' vs docno:'+docno);
  if(FM_ADD_FLAG && trano != docno){
    axios.get('/api/get_rlock', { params: { trans:FM_TRANS,docno:trano } })
    .then(function (response) { 
      let arr=response.data;
      if(arr.length!=0){ 
        
        FM_FORCE_DELREC(FM_TRANS,docno);
        if(response.data['usercode'] != CURR_USER){
          MSG_SHOW(vbOk,"RECORD LOCKED!!!",
            "<center>Locked by: "+arr[0].username+"</center>",
            function(){},function(){}
          ); 
          init_ptr();
          return;
        }

      }        
      console.log('going to change trano');
      FM_FORCE_CHG_DOCNO(FM_TRANS,docno,trano);
      //alert('chg trano:'+docno);
      document.getElementById('ptr_head').setAttribute('data-mode',1);
      let v_date=JBE_DATE_FORMAT(trano.substring(4,trano.length-3),'YYYY/MM/DD');
      //alert('xxx '+v_date);
      if(isDate(v_date)){       
        v_date=JBE_DATE_FORMAT(v_date,'YYYY-MM-DD');
        document.getElementById('ptrdate').value=v_date;        
        edit_ptr();
      }else{
        //alert('invalid date:'+v_date); 
        MSG_SHOW(vbOk,"ERROR:","Invalid entry.",function(){},function(){}); 
        init_ptr(); 
        return; 
      }
    })    
    .catch(function (error) { console.log(error); });      
  }
  
}

function isDate(d){
  if(!d){ return false; }
  if(d > 0) {
    var date=d;    
  }else{
    var date=new Date(d); 
  }
  var rval=date;
  if(isNaN(rval)){ return false; }
  return true;
}

function init_ptr(){
  let n_date=new Date();
  //document.getElementById('back_view1').style.display='block';
  //document.getElementById('cap_viewMid1').innerHTML='';
  document.getElementById('l_title').innerHTML='Requisition and Issue Slip';
  document.getElementById('ptr_head').setAttribute('data-mode',0);
  document.getElementById('cancel_dtl').style.display='none';
  document.getElementById('ptrdate').value=JBE_DATE_FORMAT(n_date,'YYYY-MM-DD');
  //document.getElementById('ptrdate').value=formatDateTime(new Date());
  document.getElementById('ptrdate').disabled=true;
  document.getElementById('date_rel').value=JBE_DATE_FORMAT(document.getElementById('ptrdate').value,'YYYY-MM-DD');
  //document.getElementById('time_rel').value=n_date.toLocaleTimeString('it-IT'); 


  //document.getElementById('date_rel').value=formatDateTime(new Date());
  //document.getElementById('time_rel').value=formatTime(n_date);
  document.getElementById('time_rel').value=format_12(n_date.toLocaleTimeString('it-IT'));

  document.getElementById('date_rel').disabled=true;
  document.getElementById('time_rel').disabled=true;
  document.getElementById('trano').value='';
  document.getElementById('trano').disabled=false;
  document.getElementById('ptr_head').setAttribute('data-trano','');
  document.getElementById('sub_areano').innerHTML='';
  document.getElementById('sub_area').innerHTML='';
  document.getElementById('details').value='';
  document.getElementById('details').disabled=true;  
  document.getElementById('btn_trano').disabled=false;  
  document.getElementById('btn_name').disabled=true;
  document.getElementById('ptr_dtl').innerHTML='';
  document.getElementById('ptr_tot').innerHTML='';
  FM_ADD_FLAG=false;   
  FM_REFRESH_REC();
  clear_data_rcvd();
  mnu_init_ptr();
}
function mnu_init_ptr(){
  var jmenu=  
  '<div style="width:100%;height:100%;">'+
    '<div onclick="new_ptr()" style="float:left;width:33%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jadd.png" alt="call image" />'+
        '<span>New</span>'+
      '</div>'+
    '</div>'+       
    '<div onclick="refresh_all_db()" style="float:left;width:34%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jrefresh.png" alt="call image" />'+
        '<span>Refresh</span>'+
      '</div>'+
    '</div>'+       
    '<div onclick="JBE_CLOSE_VIEW2()" style="float:right;width:33%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jclose.png"  alt="home image" />'+
        '<span>Exit</span>'+
      '</div>'+
    '</div>'+    
  '</div>';
  dispMenu('div_footer',jmenu);  
}

function disp_ptr(){  
  FM_ADD_FLAG=false;  
  FM_DO_CB(true);
  //document.getElementById('back_view1').style.display='none';  
  //document.getElementById('cap_viewMid1').innerHTML='Display';
  //document.getElementById('cap_viewMid1').style.color='black';
  document.getElementById('l_title').innerHTML='Display Record';
  document.getElementById('trano').disabled=true;  
  document.getElementById('btn_trano').disabled=false;  
  document.getElementById('ptrdate').disabled=true;  
  document.getElementById('date_rel').disabled=true;
  document.getElementById('time_rel').disabled=true;
  document.getElementById('btn_name').disabled=true;
  document.getElementById('details').disabled=true;  
  document.getElementById('ptr_head').setAttribute('data-mode',0);
  document.getElementById('ptr_dtl').setAttribute('data-row',0);  

  //var trano=document.getElementById('ptr_head').getAttribute('data-trano');
  var trano=document.getElementById('trano').value;
  
  var aryDB=JBE_GETARRY(DB_PTR,'trano',trano);
  var ptrdate=JBE_DATE_FORMAT(aryDB.ptrdate,'MM-DD-YYYY');  

  var ptrdate_rel=JBE_DATE_FORMAT(aryDB.date_rel,'MM-DD-YYYY');  
  var time_rel=new Date(aryDB.date_rel).toLocaleTimeString('it-IT'); 
  /*
  var ptrdate_rel=aryDB.date_rel;
  var time_rel=new Date(aryDB.date_rel).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });
  */
  
  if(!ptrdate_rel){ ptrdate_rel=JBE_DATE_FORMAT(ptrdate,'YYYY-MM-DD'); }

  var trans=aryDB.trans;  
  document.getElementById('ptr_head').setAttribute('data-trans',trans);
  document.getElementById('cancel_dtl').style.display='none';
  
  if(trans=='XXX'){ 
    document.getElementById('l_title').innerHTML='*** CANCELLED ***';
    //document.getElementById('l_title').style.color='red';
    document.getElementById('cancel_dtl').style.display='block';
  }
  var sub_area=JBE_GETFLD('name',DB_AREA,'areano',aryDB.areano);
  document.getElementById('ptrdate').value=JBE_DATE_FORMAT(ptrdate,'YYYY-MM-DD');    
  document.getElementById('sub_area').innerHTML=sub_area;
  document.getElementById('sub_area').setAttribute('data-areano',aryDB.areano);
  document.getElementById('sub_areano').innerHTML=aryDB.areano;
  document.getElementById('details').value=aryDB.details;
  
  if(time_rel=='00:00:00' || !time_rel){ time_rel=null; }
  document.getElementById('date_rel').value=JBE_DATE_FORMAT(ptrdate_rel,'YYYY-MM-DD');  
  document.getElementById('time_rel').value=time_rel;  

  document.getElementById('rcvd_name').innerHTML=aryDB.rcvd_name;
  document.getElementById('rcvd_pos').innerHTML=aryDB.rcvd_pos;
  document.getElementById('rcvd_tel').innerHTML=aryDB.rcvd_tel;
  //alert('received by: '+aryDB.rcvd_name);

  var dtl='';
  var line_ctr=0;
  var tot_amt=0;
  
  for(var i=0;i<DB_PTR2.length;i++){
    if(DB_PTR2[i].trano != trano){ continue; }
    
    let v_date=JBE_DATE_FORMAT(DB_PTR2[i].expiry,'MM-DD-YYYY');    
    let v_descrp=JBE_GETFLD('descrp',DB_STOCK,'stockno',DB_PTR2[i].stockno);
    let v_unit=JBE_GETFLD('unit',DB_STOCK,'stockno',DB_PTR2[i].stockno);
    let v_locname=JBE_GETFLD('name',DB_WHOUSE,'whcode',DB_PTR2[i].loc);
    /*
    var v_expiry=JBE_GETFLD2('expiry',DB_RECEIVE2,
      [
        { "fld":"stockno","val":DB_PTR2[i].stockno },
        { "fld":"lotno","val":DB_PTR2[i].lotno }
      ]
    );
    */    
    let v_expiry=JBE_DATE_FORMAT(DB_PTR2[i].expiry,'MM-DD-YYYY');
    line_ctr++;    
    //alert(DB_PTR2[i].stockno+' lotno '+DB_PTR2[i].lotno+' vs '+v_expiry);
    var fg='black';
    //if(DB_RECEIVE2[i].lotno=='1'){ fg='red'; }
    let v_nostock=parseInt(DB_PTR2[i].nostock);
    let fg_nostock='blue';
    if(v_nostock > 0){ fg_nostock='red'; }
    dtl+=
    '<div id="dtl_'+line_ctr+'" data-lotno="" class="dtls" onclick="hl_row('+line_ctr+')" style="display:block;width:100%;height:40px;margin-top:0px;border:0px solid red;padding:0px;background:none;">'+

      '<div class="class_mtr0" style="display:none;float:left;width:19%;height:100%;">'+      
        '<span id="dtl_stockno_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+DB_PTR2[i].stockno+'</span>'+
        '<span id="dtl_nostock_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+DB_PTR2[i].nostock+'</span>'+
        '<span id="dtl_refno_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+DB_PTR2[i].refno+'</span>'+
        '<span id="dtl_loc_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+DB_PTR2[i].loc+'</span>'+
        '<span id="dtl_qty_old_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+DB_PTR2[i].qty+'</span>'+
        '<span id="dtl_trano_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+DB_PTR2[i].trano+'</span>'+
      '</div>'+

      '<div class="class_mtr0" style="display:none;float:left;width:15%;height:100%;">'+        
        '<span id="dtl_date_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+v_date+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:23%;height:100%;">'+        
        '<span id="dtl_vax_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:6px 0 0 0;overflow:auto;">'+v_descrp+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="display:none;float:left;width:23%;height:100%;">'+        
        '<span id="dtl_unit_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;overflow:auto;">'+v_unit+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:13%;height:100%;">'+        
        '<span id="dtl_lotno_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:6px 0 0 0;overflow:auto;">'+DB_PTR2[i].lotno+'</span>'+
      '</div>'+    
      '<div class="class_mtr0" style="float:left;width:10%;height:100%;">'+        
        '<span id="dtl_expiry_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:6px 0 0 0;overflow:auto;">'+JBE_DATE_FORMAT(DB_PTR2[i].expiry,'MM-DD-YYYY')+'</span>'+
      '</div>'+  
      '<div class="class_mtr0" style="float:left;width:7%;height:100%;">'+        
        '<span id="dtl_locname_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:center;padding:5px 0 0 0;overflow:auto;">'+v_locname+'</span>'+
      '</div>'+      
      '<div class="class_mtr0" style="float:left;width:10%;height:100%;">'+        
        '<span id="dtl_rqty_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:center;padding:6px 0 0 0;overflow:auto;">'+JBE_FORMAT_INT_TO_STR(DB_PTR2[i].rqty)+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:5%;height:100%;">';
        if(JBE_MOBILE){
          dtl+='<span id="dtl_nostock2_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:5px 0 0 0;text-align:center;color:'+fg_nostock+';">'+iif(v_nostock==0,'Y','N')+'</span>';
        }else{
          dtl+='<span id="dtl_nostock2_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:5px 0 0 0;text-align:center;color:'+fg_nostock+';">'+iif(v_nostock==0,'Yes','No')+'</span>';
        }
      dtl+=  
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:10%;height:100%;">'+        
        '<span id="dtl_cost_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:center;padding:6px 0 0 0;overflow:auto;">'+JBE_FORMAT_DOUBLE_TO_STR(DB_PTR2[i].cost)+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:7%;height:100%;">'+        
        '<span id="dtl_qty_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:center;text-decoration:'+iif(v_nostock==1,'underline','none')+';padding:6px 0 0 0;overflow:auto;">'+JBE_FORMAT_INT_TO_STR(DB_PTR2[i].qty)+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:15%;height:100%;">'+        
        '<span id="dtl_amount_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:right;padding:6px 0 0 0;overflow:auto;">'+JBE_FORMAT_DOUBLE_TO_STR(DB_PTR2[i].amount)+'</span>'+
      '</div>'+

    '</div>';
    
  }
  document.getElementById('ptr_dtl').innerHTML=dtl;  
  mnu_disp_ptr(trans);  
  proc_tot_amt();
}

function clear_data_rcvd(){
  document.getElementById('rcvd_name').innerHTML='';
  document.getElementById('rcvd_pos').innerHTML='';
  document.getElementById('rcvd_tel').innerHTML='';
}

function mnu_disp_ptr(trans){
  var jmenu=  
  '<div style="width:100%;height:100%;">'+
    '<div id="id_edit" onclick="edit_ptr()" style="float:left;width:19%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jedit.png" alt="call image" />'+
        '<span>Edit</span>'+
      '</div>'+
    '</div>'+       
    '<div id="id_del" onclick="del_ptr()" style="float:left;width:19%;height:100%;pointer-events:auto;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jdele.png" alt="call image" />'+
        '<span>Delete</span>'+
      '</div>'+
    '</div>'+       
    '<div id="id_cancel" onclick="cancel_ptr()" style="float:left;width:24%;height:100%;pointer-events:auto;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jcancel.png" alt="call image" />'+
        '<span id="div_cancel">Cancel</span>'+
      '</div>'+
    '</div>'+   
    '<div id="id_close" onclick="init_ptr()" style="float:right;width:19%;height:100%;pointer-events:auto;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jclose.png"  alt="home image" />'+
        '<span>Close</span>'+
      '</div>'+
    '</div>'+
    '<div id="id_prn" onclick="prn_ptr()" style="float:right;width:19%;height:100%;pointer-events:auto;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jprn.png"  alt="home image" />'+
        '<span>Print</span>'+
      '</div>'+
    '</div>'+
  '</div>';
  dispMenu('div_footer',jmenu);
  //menu button
  document.getElementById('div_cancel').innerHTML='Cancel';
  
  if(trans=='XXX'){ 
    document.getElementById('div_cancel').innerHTML='Uncancel';

    document.getElementById('id_edit').style.pointerEvents='none';  document.getElementById('id_edit').style.opacity=0.5;
    document.getElementById('id_del').style.pointerEvents='none';   document.getElementById('id_del').style.opacity=0.5;
    //document.getElementById('id_prn').style.pointerEvents='none';   document.getElementById('id_prn').style.opacity=0.5;
  }
}

function cancel_ptr(){
  if(!JBE_CHK_USER(1)){ return; }
  var trano=document.getElementById('trano').value;
  var v_trans=JBE_GETFLD('trans',DB_PTR,'trano',trano);
  FM_REC_LOCK(FM_TRANS,trano,'cancel2_ptr');
}
function cancel2_ptr(){
  var v_trano=document.getElementById('trano').value;
  var v_trans=JBE_GETFLD('trans',DB_PTR,'trano',v_trano);
  var txt_status='Cancel';
  if(v_trans=='XXX'){ txt_status='Uncancel'; }  

  MSG_SHOW(vbYesNo,'CONFIRM: ',txt_status+' this Record?',function(){ 
    if(v_trans=='XXX'){ 
      v_trans=''; 
    }else{
      v_trans='XXX'; 
    }

    axios.put('/api/cancel_ptr', {headers: { 'Content-Type': 'application/json' }}, { params: { trano:v_trano,trans:v_trans } })
    .then(function (response) {
      DB_PTR=response.data;
      disp_ptr();
      FM_FORCE_DELREC(FM_TRANS,v_trano);
    })    
    .catch(function (error) { console.log(error); });

  },function(){ FM_FORCE_DELREC(FM_TRANS,v_trano); return; });
}

function hl_row(v){
  //alert(v);
  if(v==0){ return; }
  
  if(document.getElementById('l_title').innerHTML == 'Display Record'){ return; }
  var curRow=document.getElementById('ptr_dtl').getAttribute('data-row');  
    
  if(curRow > 0){ 
    document.getElementById('dtl_'+curRow).style.color='black'; 
    document.getElementById('dtl_'+curRow).style.background='none'; 
  }
  document.getElementById('dtl_'+v).style.color='white';
  document.getElementById('dtl_'+v).style.background='black';
  document.getElementById('ptr_dtl').setAttribute('data-row',v);  
}

function new_ptr(){  
  if(!JBE_CHK_USER(1)){ return; }  
  document.getElementById('sub_areano').innerHTML='';
  document.getElementById('details').value='';
  document.getElementById('cancel_dtl').style.display='none';
  document.getElementById('ptr_head').setAttribute('data-mode',1); //add mode
  let ptrType=document.getElementById('ptr_head').getAttribute('data-ptrType');
  //alert(ptrType);
  let prfx='NIP ';
  if(ptrType==1){ 
    prfx='C19 '; 
  }else if(ptrType==3){ 
    prfx='S19 '; 
  }
  
  let sql='SELECT * FROM ptr where type=? ORDER BY type,trano';
  axios.get('/api/fmlib_get', { params: {sql:sql, fld:ptrType} }, JBE_HEADER)
  .then(function (response) { 
    let newArr=response.data;
    //alert('newArr len:'+newArr.length);
    var last_trano='1';
    let last_date=new Date();
    let v_date=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');
    if(newArr.length > 0){ 
      last_trano=newArr[newArr.length-1].trano; 
      last_date=JBE_DATE_FORMAT(newArr[newArr.length-1].ptrdate,'YYYY-MM-DD');
      if(last_date > v_date){v_date=last_date; }
      //v_date=last_date;
      document.getElementById('ptrdate').value=v_date;  
    }
    var new_trano=prfx+v_date;
    var v_num=0;
    
    if(last_trano.substring(0,14) == new_trano){
      v_num=parseInt(last_trano.substring(15,17))+1;
    }else{
      v_num=1;
    }
    new_trano=new_trano+'-'+v_num.toString().padStart(2,0);  

    document.getElementById('trano').value=new_trano;  
    document.getElementById('trano').disabled=false;
    document.getElementById('btn_name').disabled=false;
    document.getElementById('trano').setAttribute('data-docno',new_trano);    
    
    FM_FORCE_ADDREC(FM_TRANS,new_trano,'edit_ptr','trano');
    FM_ADD_FLAG=true;
  })    
  .catch(function (error) { console.log(error); });
}

function chk_cancel(){
  var rval=false;
  if(document.getElementById('l_title').innerHTML == '*** CANCELLED ***'){ rval=true; }
  return rval;
}

function edit_ptr(){  
  if(!JBE_CHK_USER(1)){ return; }

  FM_DO_CB(false);

  var dataMode=document.getElementById('ptr_head').getAttribute('data-mode');
  var trano=document.getElementById('trano').value;
  var f_add=iif(dataMode==1,true,false);

  //alert('edit_ptr f_add:'+f_add);
  //FM_ADD_FLAG=f_add;

  if(!f_add){ 
    //let v=FM_GET_LOCK(FM_TRANS,trano);
    //alert('v:'+v);
    FM_REC_LOCK(FM_TRANS,trano,'edit2_ptr');
  }else{
    edit2_ptr();
  }
    
}

function edit2_ptr(){
  var dataMode=document.getElementById('ptr_head').getAttribute('data-mode');
  var f_add=iif(dataMode==1,true,false);
  //document.getElementById('back_view1').style.display='none';
  //document.getElementById('cap_viewMid1').innerHTML=iif(f_add,'Add','Edit');
  document.getElementById('l_title').innerHTML=iif(f_add,'Add','Edit');
  document.getElementById('ptrdate').disabled=true;
  document.getElementById('date_rel').disabled=false;
  document.getElementById('time_rel').disabled=false;
  document.getElementById('trano').disabled=!f_add;
  document.getElementById('btn_name').disabled=false;
  document.getElementById('details').disabled=false;
  
  //document.getElementById('trano').innerHTML=document.getElementById('ptr_head').getAttribute('data-trano');  
  mnu_edit_ptr();
  var len_dtls=document.querySelectorAll('.dtls').length;  
  if(len_dtls){ hl_row(1); }
}

function mnu_edit_ptr(){  
  var jFunc='disp_ptr';  
  if(document.getElementById('ptr_head').getAttribute('data-mode')=='1'){ jFunc='init_ptr'; }  

  document.getElementById('l_title').innerHTML='Edit Record';
  
  var jmenu=  
  '<div style="width:100%;height:100%;">'+
    
    '<div onclick="add_item_ptr(true)" style="float:left;width:15%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jadd2.png" alt="call image" />'+
        '<span>Add</span>'+
      '</div>'+
    '</div>'+   
    '<div id="div_edit_item" onclick="add_item_ptr(false)" style="float:left;width:15%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jedit.png" alt="call image" />'+
        '<span>Edit</span>'+
      '</div>'+
    '</div>'+     
    '<div id="div_edit_item" onclick="del_item_ptr()" style="float:left;width:15%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jdele.png" alt="call image" />'+
        '<span>Del</span>'+
      '</div>'+
    '</div>'+   
    '<div id="div_get_item" onclick="copy_items(false)" style="float:left;width:17%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jproduct.png" alt="call image" />'+
        '<span>Copy</span>'+
      '</div>'+
    '</div>'+       
    
    //'<div onclick="'+jFunc+'()" style="float:right;width:20%;height:100%;background:none;">'+
    '<div onclick="exit_ptr()" style="float:right;width:20%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jclose.png"  alt="home image" />'+
        '<span>Close</span>'+
      '</div>'+
    '</div>'+
    '<div onclick="save_ptr()" style="float:right;width:17%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jsave.png" alt="call image" />'+
        '<span>Save</span>'+
      '</div>'+
    '</div>'+           

  '</div>';
  dispMenu('div_footer',jmenu);  
  document.getElementById('btn_trano').disabled=true;
}

function exit_ptr(){  
  var f_add=false;
  let trano=document.getElementById('trano').value;
  if(document.getElementById('ptr_head').getAttribute('data-mode')=='1'){ f_add=true; }  
  //alert(f_add+', exit_ptr:'+trano);
  console.log(f_add+', exit_ptr:'+trano);

  FM_FORCE_DELREC(FM_TRANS,trano);    
  if(f_add){ 
    init_ptr();
  }else{
    disp_ptr();
  }
}

function copy_items(){  
  let ptrType=document.getElementById('ptr_head').getAttribute('data-ptrType');
  var newArr = DB_PTR.filter(function(DB_PTR) {
    return DB_PTR.type == ptrType;
  });
  newArr.sort(JBE_SORT_ARRAY(['*trano']));
  //alert('ptrType:'+ptrType);
  var box2=0; 
  var box1=H_VIEW-(20+box2);
  var tilt='Copy PTR';  
  var dtl=          
    '<div id="div_name" data-zoom=0 style="width:100%;height:'+box1+'px;font-text:14px;padding:0px;background-color:white;overflow:none;">'+         
      '<div style="width:100%;height:40px;padding:2px;text-align:center;color:'+JBE_TXCLOR1+';background:'+JBE_CLOR+';">'+
          '<input id="filterInput" type="text" style="float:left;width:100%;height:100%;text-align:center;" value="" placeholder="Search here..."/>'+      
      '</div>'+    
      '<div style="width:100%;height:'+(box1-50)+'px;padding:5px;border:0px solid red;overflow:auto;">';
        var ddd='';
        for(var i=0;i<newArr.length;i++){
          if(newArr[i].type != ptrType){ continue; }
          
          var subname=JBE_GETFLD('name',DB_AREA,'areano',newArr[i]['areano']);
          ddd+=
          '<div id="d_'+i+'" class="cls_names" onclick="do_copy_items(&quot;'+newArr[i]['trano']+'&quot;)" style="width:100%;height:30px;padding:5px;border:1px solid gray;">'+            
            '<div style="float:left;width:50%;font-size:18px;font-weight:bold;">'+newArr[i]['trano']+'</div>'+
            '<div style="float:left;width:50%;">'+subname+'</div>'+
          '</div>';
        }
        dtl+=ddd+
      '</div>'+    
    '</div>';
  
  var dtl2=
    '<div style="width:100%;height:100%;padding:12px 0 0 0;text-align:center;background:none;">'+
      'Select RIS Number'+    
    '</div>';
  
  JBE_OPENBOX2('div_name',tilt,dtl,dtl2); 
  JBE_SEARCH_BOX('filterInput','cls_names');  
}

function do_copy_items(trano){
  //document.getElementById('cap_viewMid1').innerHTML='Edit';

  let line_ctr=0;
  let dtl='';
  for(var i=0;i<DB_PTR2.length;i++){
    if(DB_PTR2[i].trano != trano){ continue; }
    
    let v_date=JBE_DATE_FORMAT(DB_PTR2[i].expiry,'MM-DD-YYYY');    
    let v_descrp=JBE_GETFLD('descrp',DB_STOCK,'stockno',DB_PTR2[i].stockno);
    let v_unit=JBE_GETFLD('unit',DB_STOCK,'stockno',DB_PTR2[i].stockno);
    /*
    var v_expiry=JBE_GETFLD2('expiry',DB_RECEIVE2,
      [
        { "fld":"stockno","val":DB_PTR2[i].stockno },
        { "fld":"lotno","val":DB_PTR2[i].lotno }
      ]
    );
    */    
    let v_expiry=JBE_DATE_FORMAT(DB_PTR2[i].expiry,'MM-DD-YYYY');
    let v_refno=DB_PTR2[i].refno;
    let v_locname=JBE_GETFLD('name',DB_WHOUSE,'whcode',DB_PTR2[i].loc);
    line_ctr++;    
    //alert(DB_PTR2[i].stockno+' lotno '+DB_PTR2[i].lotno+' vs '+v_expiry);
    var fg='black';
    //if(DB_RECEIVE2[i].lotno=='1'){ fg='red'; }      

    let v_nostock=parseInt(DB_PTR2[i].nostock);
    let fg_nostock='blue';
    if(v_nostock > 0){ fg_nostock='red'; }
    /*
    dtl+=
    '<div id="dtl_'+line_ctr+'" data-lotno="" class="dtls" onclick="hl_row('+line_ctr+')" style="display:block;width:100%;height:40px;margin-top:0px;border:0px solid red;padding:0px;background:none;">'+

      '<div class="class_mtr0" style="display:none;float:left;width:19%;height:100%;">'+        
        '<span id="dtl_refno_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+v_refno+'</span>'+
        '<span id="dtl_locname_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+v_locname+'</span>'+
        '<span id="dtl_stockno_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+DB_PTR2[i].stockno+'</span>'+
        '<span id="dtl_nostock_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+DB_PTR2[i].nostock+'</span>'+
      '</div>'+

      '<div class="class_mtr0" style="display:none;float:left;width:15%;height:100%;">'+        
        '<span id="dtl_date_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+v_date+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:25%;height:100%;">'+        
        '<span id="dtl_vax_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:6px 0 0 0;overflow:auto;">'+v_descrp+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="display:none;float:left;width:23%;height:100%;">'+        
        '<span id="dtl_unit_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;overflow:auto;">'+v_unit+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:13%;height:100%;">'+        
        '<span id="dtl_lotno_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:6px 0 0 0;overflow:auto;">'+DB_PTR2[i].lotno+'</span>'+
      '</div>'+    
      '<div class="class_mtr0" style="float:left;width:10%;height:100%;">'+        
        '<span id="dtl_expiry_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:6px 0 0 0;overflow:auto;">'+JBE_DATE_FORMAT(DB_PTR2[i].expiry,'MM-DD-YYYY')+'</span>'+
      '</div>'+  
      '<div class="class_mtr0" style="float:left;width:5%;height:100%;">'+        
        '<span id="dtl_loc_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:center;padding:5px 0 0 0;overflow:auto;">'+DB_PTR2[i].loc+'</span>'+
      '</div>'+      
      '<div class="class_mtr0" style="float:left;width:10%;height:100%;">'+        
        '<span id="dtl_rqty_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:center;padding:6px 0 0 0;overflow:auto;">'+JBE_FORMAT_INT_TO_STR(DB_PTR2[i].rqty)+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:5%;height:100%;">'+        
        '<span id="dtl_nostock2_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:5px 0 0 0;text-align:center;color:'+fg_nostock+';">'+iif(v_nostock==0,'Yes','No')+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:10%;height:100%;">'+        
        '<span id="dtl_cost_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:center;padding:6px 0 0 0;overflow:auto;">'+JBE_FORMAT_DOUBLE_TO_STR(DB_PTR2[i].cost)+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:7%;height:100%;">'+        
        '<span id="dtl_qty_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:center;text-decoration:'+iif(v_nostock==1,'underline','none')+';padding:6px 0 0 0;overflow:auto;">'+JBE_FORMAT_INT_TO_STR(DB_PTR2[i].qty)+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:15%;height:100%;">'+        
        '<span id="dtl_amount_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:right;padding:6px 0 0 0;overflow:auto;">'+JBE_FORMAT_DOUBLE_TO_STR(DB_PTR2[i].amount)+'</span>'+
      '</div>'+

    '</div>';
    */
    dtl+=
    '<div id="dtl_'+line_ctr+'" data-lotno="" class="dtls" onclick="hl_row('+line_ctr+')" style="display:block;width:100%;height:40px;margin-top:0px;border:0px solid red;padding:0px;background:none;">'+

      '<div class="class_mtr0" style="display:none;float:left;width:19%;height:100%;">'+ 
        '<span id="dtl_stockno_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+DB_PTR2[i].stockno+'</span>'+
        '<span id="dtl_nostock_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+DB_PTR2[i].nostock+'</span>'+
        '<span id="dtl_refno_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+DB_PTR2[i].refno+'</span>'+
        '<span id="dtl_loc_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+DB_PTR2[i].loc+'</span>'+
        '<span id="dtl_qty_old_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+DB_PTR2[i].qty+'</span>'+
        '<span id="dtl_trano_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+DB_PTR2[i].trano+'</span>'+
      '</div>'+

      '<div class="class_mtr0" style="display:none;float:left;width:15%;height:100%;">'+        
        '<span id="dtl_date_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+v_date+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:23%;height:100%;">'+        
        '<span id="dtl_vax_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:6px 0 0 0;overflow:auto;">'+v_descrp+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="display:none;float:left;width:23%;height:100%;">'+        
        '<span id="dtl_unit_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;overflow:auto;">'+v_unit+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:13%;height:100%;">'+        
        '<span id="dtl_lotno_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:6px 0 0 0;overflow:auto;">'+DB_PTR2[i].lotno+'</span>'+
      '</div>'+    
      '<div class="class_mtr0" style="float:left;width:10%;height:100%;">'+        
        '<span id="dtl_expiry_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:6px 0 0 0;overflow:auto;">'+JBE_DATE_FORMAT(DB_PTR2[i].expiry,'MM-DD-YYYY')+'</span>'+
      '</div>'+  
      '<div class="class_mtr0" style="float:left;width:7%;height:100%;">'+        
        '<span id="dtl_locname_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:center;padding:5px 0 0 0;overflow:auto;">'+v_locname+'</span>'+
      '</div>'+      
      '<div class="class_mtr0" style="float:left;width:10%;height:100%;">'+        
        '<span id="dtl_rqty_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:center;padding:6px 0 0 0;overflow:auto;">'+JBE_FORMAT_INT_TO_STR(DB_PTR2[i].rqty)+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:5%;height:100%;">';
        if(JBE_MOBILE){
          dtl+='<span id="dtl_nostock2_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:5px 0 0 0;text-align:center;color:'+fg_nostock+';">'+iif(v_nostock==0,'Y','N')+'</span>';
        }else{
          dtl+='<span id="dtl_nostock2_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:5px 0 0 0;text-align:center;color:'+fg_nostock+';">'+iif(v_nostock==0,'Yes','No')+'</span>';
        }
      dtl+=  
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:10%;height:100%;">'+        
        '<span id="dtl_cost_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:center;padding:6px 0 0 0;overflow:auto;">'+JBE_FORMAT_DOUBLE_TO_STR(DB_PTR2[i].cost)+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:7%;height:100%;">'+        
        '<span id="dtl_qty_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:center;text-decoration:'+iif(v_nostock==1,'underline','none')+';padding:6px 0 0 0;overflow:auto;">'+JBE_FORMAT_INT_TO_STR(DB_PTR2[i].qty)+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:15%;height:100%;">'+        
        '<span id="dtl_amount_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:right;padding:6px 0 0 0;overflow:auto;">'+JBE_FORMAT_DOUBLE_TO_STR(DB_PTR2[i].amount)+'</span>'+
      '</div>'+

    '</div>';
    
  }
    
  JBE_CLOSEBOX();

  document.getElementById('ptr_dtl').innerHTML=dtl;   
  
  var len_dtls=document.querySelectorAll('.dtls').length;   
  //alert('do_copy_items '+len_dtls);
  if(len_dtls){ hl_row(1); }
}

function del_ptr(){
  if(!JBE_CHK_USER(1)){ return; }
  var trano=document.getElementById('trano').value;
  FM_REC_LOCK(FM_TRANS,trano,'del2_ptr');
}

function del2_ptr(){
  var trano=document.getElementById('trano').value;
  MSG_SHOW(vbYesNo,"CONFIRM: ","Are you sure to Delete this Record?",function(){    
    //alert(trano);
    axios.delete('/api/del_ptr', { params: { trano:trano } })
    .then(function (response) {
      del_update_qty_balance();
      //console.log(response.data[0]);        
      //console.log(response.data[1]);      
      DB_PTR=get_db_all('ptr');
      DB_PTR2=get_db_all('ptr2');
      init_ptr();
      snackBar('DELETED...');    
      //console.log(response.data);
      //******************************** */
      
      FM_FORCE_DELREC(FM_TRANS,trano);
    })
    .catch(function (error) { console.log(error); });    
  },function(){ FM_FORCE_DELREC(FM_TRANS,trano); return; }); 
}

function del_ptr2(trano){  
  axios.delete('/api/del_ptr2', { params: { trano:trano } })
  .then(function (response) {
    //console.log(response.data);        
    snackBar('DELETED...');    
  })
  .catch(function (error) { console.log(error); });      
}

function del_update_qty_balance(){
  var len_dtls=document.querySelectorAll('.dtls').length;    
  for(var i=1;i<=len_dtls;i++){    
    let v_stockno=document.getElementById('dtl_stockno_'+i).innerHTML;
    let v_lotno=document.getElementById('dtl_lotno_'+i).innerHTML; 
    let v_refno=document.getElementById('dtl_refno_'+i).innerHTML;
    let v_loc=document.getElementById('dtl_loc_'+i).innerHTML;
    let v_qty=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_qty_'+i).innerHTML) * -1;    
    //alert('del_update_qty_balance:'+v_qty);
    UPDATE_LOC_STOCKBAL(v_loc,v_stockno,v_lotno,v_qty,0); 
  }
}

function save_ptr(){
  let aryType=['NIP','COVAC','REG'];
  let pmode=document.getElementById('ptr_head').getAttribute('data-mode');
  let mode_code=iif(pmode==1,1,2);
  let mode_desc=iif(pmode==1,'Created','Edited');
  //pmode=2;
  let ptrType=document.getElementById('ptr_head').getAttribute('data-ptrType');
  let trano=document.getElementById('trano').value;
  let ptrdate=document.getElementById('ptrdate').value;
  let ptrdate_rel=JBE_DATE_FORMAT(document.getElementById('date_rel').value,'YYYY-MM-DD')+' '+document.getElementById('time_rel').value;
  //ptrdate_rel=formatDateTime(new Date(document.getElementById('date_rel').value+document.getElementById('time_rel').value));
  //alert(ptrdate_rel);
  const now = new Date();
  //alert(document.getElementById('date_rel').value);
  let r_name=document.getElementById('rcvd_name').innerHTML;
  let r_pos=document.getElementById('rcvd_pos').innerHTML;
  let r_tel=document.getElementById('rcvd_tel').innerHTML;
  
  let sub_area=document.getElementById('sub_area').innerHTML;
  let details=document.getElementById('details').value;
  //let areano=document.getElementById('sub_area').getAttribute('data-areano');
  let areano=JBE_GETFLD('areano',DB_AREA,'name',sub_area);
  var len_dtls=document.querySelectorAll('.dtls').length;  
  let new_len_dtls=0;
  for(var i=1;i<=len_dtls;i++){
    //console.log(i+' >>> '+document.getElementById('dtl_'+i).style.display);
    if(document.getElementById('dtl_'+i).style.display != 'none'){ new_len_dtls++; }
  } 
  
  if(!sub_area){
    snackBar('ERROR: No Sub Area to save.'); return;
  }
  if(!new_len_dtls){
    snackBar('ERROR: No items to save.'); return;
  }
  if(new_len_dtls > 10){
    snackBar('ERROR: Maximum items lines reached. Only (10) items are allowed.'); return;
  }

  FM_FORCE_DELREC(FM_TRANS,trano);
  if(pmode==1){ //add
    axios.post('/api/save_ptr', {headers: { 'Content-Type': 'application/json' }}, { params: { trano:trano,ptrdate:ptrdate,ptrdate_rel:ptrdate_rel,ptrType:ptrType,areano:areano,details:details,name:r_name,pos:r_pos,tel:r_tel } })
    .then(function (response) {
      DB_PTR=response.data;
      console.log('yes! add_ptr: '+DB_PTR.length);
      save_ptr2(trano,ptrdate,ptrdate_rel,ptrType,areano);
      JBE_LOGGER_SAVE(CURR_USER,1,trano,aryType[ptrType],'Created RIS: '+trano);      
    })
    .catch(function (error) { console.log(error); });
  }else{
    axios.put('/api/upd_ptr', {headers: { 'Content-Type': 'application/json' }}, { params: { trano:trano,ptrdate:ptrdate,ptrdate_rel:ptrdate_rel,areano:areano,details:details,name:r_name,pos:r_pos,tel:r_tel } })
    .then(function (response) {
      DB_PTR=response.data;   
      save_ptr2(trano,ptrdate,ptrdate_rel,ptrType,areano);
      JBE_LOGGER_SAVE(CURR_USER,mode_code,trano,aryType[ptrType],mode_desc+' RIS: '+trano);
    })    
    .catch(function (error) { console.log(error); });
  }
}
function save_ptr2(trano,ptrdate,ptrdate_rel,ptrType,areano){
  var len_dtls=document.querySelectorAll('.dtls').length;   
  axios.delete('/api/del_ptr2', { params: { trano:trano } })
  .then(async function (response) {
    //console.log(response.data);
    //console.log('total len of dtls:'+len_dtls);

    for(var i=1;i<=len_dtls;i++){      
      //let v_date=document.getElementById('dtl_date_'+i).innerHTML;      
      let v_stockno=document.getElementById('dtl_stockno_'+i).innerHTML;
      let v_descrp=document.getElementById('dtl_vax_'+i).innerHTML;
      let v_lotno=document.getElementById('dtl_lotno_'+i).innerHTML; 
      let v_expiry=document.getElementById('dtl_expiry_'+i).innerHTML;      
      let v_nostock=document.getElementById('dtl_nostock_'+i).innerHTML;
      let v_refno=document.getElementById('dtl_refno_'+i).innerHTML;
      let v_loc=document.getElementById('dtl_loc_'+i).innerHTML;
      let v_qty=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_qty_'+i).innerHTML);
      let v_qty_old=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_qty_old_'+i).innerHTML);
      
      
      if(document.getElementById('dtl_'+i).style.display=='none'){ 
        if(document.getElementById('dtl_trano_'+i).innerHTML){ 
          //alert('update with trano'); 
          UPDATE_LOC_STOCKBAL(v_loc,v_stockno,v_lotno,(v_qty * -1),0);  
        }
        continue;      
      }
      

      console.log('ptr2 v_loc:'+v_loc);

      //let v_rqty=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_rqty_'+i).innerHTML);
      let v_rqty=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_rqty_'+i).innerHTML);
      
      let v_cost=JBE_FORMAT_STR_TO_DOUBLE(document.getElementById('dtl_cost_'+i).innerHTML);
      //let v_cost=document.getElementById('dtl_cost_'+i).innerHTML;
      let v_amount=JBE_FORMAT_STR_TO_DOUBLE(document.getElementById('dtl_amount_'+i).innerHTML);
      
      await axios.post('/api/save_ptr2', {headers: { 'Content-Type': 'application/json' }}, { params: { 
        trano:trano,
        ptrdate:JBE_DATE_FORMAT(ptrdate,'YYYY-MM-DD'),  
        ptrdate_rel:JBE_DATE_FORMAT(ptrdate_rel,'YYYY-MM-DD'),  
        ptrType:ptrType, 
        areano:areano, 
        expiry:JBE_DATE_FORMAT(v_expiry,'YYYY-MM-DD'), 
        stockno:v_stockno, 
        descrp:v_descrp, 
        lotno:v_lotno, 
        nostock:v_nostock,
        refno:v_refno,
        rqty:v_rqty, 
        loc:v_loc, 
        qty:v_qty, 
        cost:v_cost, 
        amount:v_amount
      }})      
      .catch(function (error) { console.log(error); });
    }      
        
    axios.get('/api/get_all', { params: {tbl:'ptr2'} })
    .then(function (response) { 
      //console.log(response.data); 
      DB_PTR2 = response.data; 
      disp_ptr();       
      update_stocks_ptr();
    })    
    .catch(function (error) { console.log(error); });
  })  
  .catch(function (error) { console.log(error); });
}

function update_stocks_ptr(){
  //alert('update_stocks_ptr');
  var len_dtls=document.querySelectorAll('.dtls').length;    
  for(var i=1;i<=len_dtls;i++){    
    let v_stockno=document.getElementById('dtl_stockno_'+i).innerHTML;
    let v_lotno=document.getElementById('dtl_lotno_'+i).innerHTML; 
    let v_refno=document.getElementById('dtl_refno_'+i).innerHTML;
    let v_loc=document.getElementById('dtl_loc_'+i).innerHTML;
    let v_qty=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_qty_'+i).innerHTML);    
    console.log('update_stocks_ptr:'+v_qty);
    UPDATE_LOC_STOCKBAL(v_loc,v_stockno,v_lotno,0,0); 
  }
}

function xxxchk_max_items(num_lines,max){
  let rval=false;
  if(num_lines > max){
    rval=true;
  }
  return rval;
}

function chk_max_items(){
  //alert(stockno+' vs '+lotno);
  let ctr=0;
  let len_dtls=document.querySelectorAll('.dtls').length;     
  //alert('chk_max_items len_dtls:'+len_dtls);
  for(var i=1;i<=len_dtls;i++){
    let d_stockno=document.getElementById('dtl_stockno_'+i).innerHTML;
    let d_dtl=document.getElementById('dtl_'+i).style.display;

    if(d_stockno && d_dtl!='none'){    
      ctr++;
    }
  }
  console.log('>>> '+ctr);
  return ctr;
}

function add_item_ptr(f_add){ 
  //alert('add flag: '+f_add);
  //alert(document.getElementById('ptr_head').getAttribute('data-mode'));
  console.log('add_item_ptr:'+f_add);
  var len_dtls=document.querySelectorAll('.dtls').length;   
  if(len_dtls==0 && !f_add){ 
    snackBar('Cannot Edit empty record');
    return;
  }
  if(f_add && chk_max_items() >= 10){ 
    MSG_SHOW(vbOk,"ERROR",'Maximum Item lines reached. Only (10) items are allowed.', function(){},function(){});
    return; 
  }
  
  let v_row=document.getElementById('ptr_dtl').getAttribute('data-row');  
  let ptrType=document.getElementById('ptr_head').getAttribute('data-ptrType');
  let ptrTilt='NIP';
  if(ptrType==1){
    ptrTilt='COVAC'; 
  }else if(ptrType==2){ 
    ptrTilt='REG';
  }

  
  
  if(f_add){ v_row=0; }
  var tilt=iif(f_add,'Add Item','Edit Item');  
  var f_add_item=iif(f_add,1,0);  
  document.getElementById('back_view2').style.display='none';
  document.getElementById('l_title').innerHTML=tilt;
  
  var v_vax='';
  var v_date='';
  var v_lotno='';  
  var v_nostock=0;
  var v_rqty=0;
  //var v_loc=0; var v_locname='';  
  var v_qty=0;
  var v_qty_old=0;
  var v_expiry='';
  var v_stockno=''; 
  var v_stock_bal=0;
  
  var v_cost=0;
  var v_amount=0;
  var v_refno="";
  var v_loc=""; var v_locname='';

  
  if(!f_add){ 
    v_date=document.getElementById('dtl_date_'+v_row).innerHTML;    
    v_vax=document.getElementById('dtl_vax_'+v_row).innerHTML;
    v_lotno=document.getElementById('dtl_lotno_'+v_row).innerHTML;     
    v_nostock=parseInt(document.getElementById('dtl_nostock_'+v_row).innerHTML); 
    v_rqty=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_rqty_'+v_row).innerHTML);
    v_loc=document.getElementById('dtl_loc_'+v_row).innerHTML;        
    v_locname=JBE_GETFLD('name',DB_WHOUSE,'whcode',v_loc);
    v_qty=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_qty_'+v_row).innerHTML);
    v_qty_old=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_qty_old_'+v_row).innerHTML);
    
    v_expiry=JBE_DATE_FORMAT(document.getElementById('dtl_expiry_'+v_row).innerHTML,'YYYY-MM-DD');
    v_cost=JBE_FORMAT_STR_TO_DOUBLE(document.getElementById('dtl_cost_'+v_row).innerHTML);
    v_amount=document.getElementById('dtl_amount_'+v_row).innerHTML;
    v_stockno=document.getElementById('dtl_stockno_'+v_row).innerHTML;     
    v_refno=document.getElementById('dtl_refno_'+v_row).innerHTML;    

    //v_stock_bal=gxet_bal_ptr(v_refno,v_stockno,v_lotno,v_qty,v_qty_old);
    //v_stock_bal=get_bal_ptr(v_loc,v_stockno,v_lotno,v_qty,v_qty_old);
    //v_stock_bal=(v_stock_bal+v_qty_old)-v_qty;
    
    v_stock_bal=parseInt(JBE_GETFLD2('balance',DB_TRANSFER2, [
      { "fld":"loc","val":v_loc },
      { "fld":"stockno","val":v_stockno },
      { "fld":"lotno","val":v_lotno }
    ]));
    
  }

  //alert('add_item: v_stock_bal::'+v_stock_bal);
 
  var dtl=          
    '<div id="fm_item" data-add='+f_add_item+' data-chgQty=0 data-zoom=0 style="width:100%;height:100%;font-text:14px;padding:5px;background-color:white;">'+         
      //'<div style="width:100%;height:55px;font-size:25px;font-weight:bold;padding:15px 0 0 0;text-align:center;background:'+JBE_CLOR2+';">'+tilt+'</div>'+

      '<div class="class_mtr0" style="display:none;margin-top:5px;">'+                        
        '<span id="txt_stockno" class="class_mtr2" style="width:50%;color:red;">'+v_stockno+'</span>'+
        '<span id="txt_nostock" class="class_mtr2" style="width:50%;color:red;">'+v_nostock+'</span>'+
        '<span id="txt_refno" class="class_mtr2" style="width:50%;color:red;">'+v_refno+'</span>'+
        '<span id="txt_qty_old" class="class_mtr2" style="width:50%;color:red;">'+v_qty_old+'</span>'+
        '<input type="number" id="txt_stock_bal" value='+v_stock_bal+' />'+
        //'<span id="txt_loc" class="class_mtr2" style="width:50%;color:red;">'+v_loc+'</span>'+
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:0px;">'+        
        '<span class="class_mtr1">Description:</span>'+        
        '<span id="txt_vax" data-stockno="" class="class_mtr2" style="width:50%;color:red;text-align:left;overflow:auto;">'+v_vax+'</span>'+
        '<button id="btn_vax" style="float:right;width:40px;height:100%;font-weight:bold;margin-right:3px;border-radius:5px;color:white;background:'+JBE_CLOR+';" onclick="sel_vax('+f_add+')">...</button>'+        
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:2px;">'+        
        '<span class="class_mtr1">Lot No. :</span>'+        
        //'<span id="txt_lotno" class="class_mtr2" style="width:50%;color:red;overflow:auto;">'+v_lotno+'</span>'+
        '<input type="text" id="txt_lotno" disabled class="class_mtr2" style="width:50%;color:red;overflow:auto;" value="'+v_lotno+'" />'+
        //'<input type="button" id="btn_lotno" onclick="set_new_lotno(txt_stockno.innerHTML)" class="class_mtr2" style="float:right;width:50px;padding:5px;color:blue;" value="New" />'+
        '<input type="image" id="btn_lotno" onclick="set_new_lotno(txt_stockno.innerHTML)" class="class_mtr2" style="float:right;width:50px;height:100%;padding:0px;color:blue;" src="gfx/jnew.png" />'+
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:2px;">'+        
        '<span class="class_mtr1">Location:</span>'+        
        //'<input type="text" id="txt_loc" class="class_mtr2" style="text-transform:uppercase;width:10%;color:red;text-align:center;overflow:auto;" value="'+v_loc+'" />'+
        //'<span class="class_mtr1" style="background:red;">'+v_locname+'</span>'+
        '<select id="txt_loc" name="txt_loc" value=0 onchange="chg_loc(this.value)" disabled class="class_mtr2" style="float:left;width:50%;color:red;height:100%;padding:0px;">';
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
      '<div class="class_mtr0" style="margin-top:2px;">'+        
        '<span class="class_mtr1">Expiry Date :</span>'+        
        //'<span id="txt_expiry" class="class_mtr2" style="color:red;">'+v_expiry+'</span>'+          
        '<input type="date" id="txt_expiry" disabled class="class_mtr2" style="width:50%;color:red;overflow:auto;" value="'+v_expiry+'" />'+
      '</div>'+ 
      
      '<div class="class_mtr0" style="margin-top:2px;">'+        
        '<span class="class_mtr1">Requested Quantity:</span>'+        
        '<input id="txt_rqty" type="number" onchange="chg_rqty(this.value)" class="class_mtr2" style="text-align:center;color:red;" value="'+v_rqty+'" />'+          
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:2px;">'+        
        '<span class="class_mtr1">Is Stock Available?:</span>'+  
        '<span id="txt_nostock2" class="class_mtr2" style="color:red;">'+
          '<input type="radio" id="rad1" '+iif(v_nostock == 0,'checked','')+' onclick="chg_nostock(0)" name="fav_stock" style="margin-left:0px;" value=1>'+
            '<label for="rad1">Yes</label>'+
          '<input type="radio" id="rad2" '+iif(v_nostock != 0,'checked','')+' onclick="chg_nostock(1)" name="fav_stock" style="margin-left:30px;" value=0>'+
            '<label for="rad2">No</label>'+   
        '</span>'+ 
      '</div>'+ 

      '<div class="class_mtr0" style="margin-top:2px;">'+        
        '<span class="class_mtr1">Cost :</span>'+        
        //'<span id="txt_cost" class="class_mtr2" style="color:red;">'+v_cost+'</span>'+          
        '<input id="txt_cost" type="number" disabled class="class_mtr2" style="text-align:center;color:red;" value="'+v_cost+'" />'+          
      '</div>'+ 
      '<div class="class_mtr0" style="display:none;margin-top:2px;">'+        
        '<span class="class_mtr1">Acquired Date :</span>'+        
        '<span id="txt_date" class="class_mtr2" style="color:red;">'+v_date+'</span>'+          
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:10px;">'+        
        '<span class="class_mtr1">Issued Quantity:</span>'+        
        '<input id="txt_qty" type="number" onchange="chg_qty_ptr(this.value)" class="class_mtr2" style="text-align:center;color:red;" value="'+v_qty+'" />'+          
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:10px;">'+        
        '<span class="class_mtr1">Amount:</span>'+        
        '<span id="txt_amount" class="class_mtr2" style="text-align:left;font-size:18px;font-weight:bold;color:blue;">'+v_amount+'</span>'+          
      '</div>'+ 

    '</div>';
  //JBE_OPENBOX('div_name',tilt,dtl,dtl2); 
  //JBE_OPEN_VIEW2(dtl,tilt.toUpperCase(),'');  //problem  
  PTR_SHOW_MODULE(true,dtl);
  mnu_add_item_ptr(f_add);
  if(f_add){
    document.getElementById('txt_rqty').disabled=true;
    document.getElementById('txt_cost').disabled=true;
    document.getElementById('txt_qty').disabled=true;
  }
}

function PTR_SHOW_MODULE(f,dtl){
  //alert('JBE_SHOW_MODULE');
  let vdisp1='none';
  let vdisp2='block';
  if(!f){
    vdisp1='block';
    vdisp2='none';      
  }
  document.getElementById('div_ptr_entry').style.display=vdisp1;
  document.getElementById('div_ptr_box').style.display=vdisp2;
  document.getElementById('div_ptr_box').innerHTML=dtl;
}

function set_new_lotno(stockno){
  if(!stockno){ return; }
  MSG_SHOW(vbYesNo,'CONFIRM: ','Are you sure to make this Batch/Lot No. as the NEW Running one?',function(){
      
    FM_AXIOS_SQL='UPDATE stock SET lotno=?,expiry=?,loc=?,cost=? WHERE stockno = ?';
    FM_AXIOS_PARA1=[txt_lotno.value,txt_expiry.value,txt_loc.value,txt_cost.value,stockno];
    
    axios.put('/api/fmlib_update', {headers: { 'Content-Type': 'application/json' }}, { params: { sql:FM_AXIOS_SQL,fld:FM_AXIOS_PARA1,tbl:'stock',fm_mode:1 } }) 
    .then(function (response) {           
      showProgress(false);      
      //console.log(response.data);        
      DB_STOCK=response.data;
      snackBar('New Lot No. is Saved Successfully...');
    })
    .catch(function (error) {
      console.log(error);
      showProgress(false);
    });
  },function(){return;});
}

function chg_loc(v){
  //alert('chg_loc:'+v);
  //txt_loc.value=v;
  //alert('txt_loc.value:'+txt_loc.value);
}

function mnu_add_item_ptr(f_add){
  var jmenu=  
  '<div style="width:100%;height:100%;">'+

    '<div onclick="save_item_ptr('+f_add+')" style="float:left;width:25%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jdown.png" alt="call image" />'+
        '<span>OK</span>'+
      '</div>'+
    '</div>'+
    '<div onclick="PTR_SHOW_MODULE(false); mnu_edit_ptr();" style="float:right;width:25%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jclose.png"  alt="home image" />'+
        '<span>Close</span>'+
      '</div>'+
    '</div>'+

  '</div>';
  dispMenu('div_footer',jmenu);
  document.getElementById('btn_trano').disabled=true;
}

function chk_item_exist(stockno,lotno){
  //alert(stockno+' vs '+lotno);
  let ctr=0;
  let len_dtls=document.querySelectorAll('.dtls').length;     
  for(var i=1;i<=len_dtls;i++){
    let d_stockno=document.getElementById('dtl_stockno_'+i).innerHTML;
    let d_lotno=document.getElementById('dtl_lotno_'+i).innerHTML;
    let d_dtl=document.getElementById('dtl_'+i).style.display;

    if(d_stockno==stockno && d_lotno==lotno && d_dtl!='none'){    
      ctr++;
    }
  }
  return ctr;
}

function xsave_item_ptr(f_add){
  //alert('save_item_ptr f:'+f_add);
  let f_chgqty=document.getElementById('fm_item').getAttribute('data-chgQty');
  if(f_chgqty==0){ 
    if(!chg_qty_ptr(txt_qty.value)){ txt_qty.focus(); return; }
  }  
  //alert('save_item_ptr:'+f_add+'\nf_chgqty:'+f_chgqty);  
  var curRow=document.getElementById('ptr_dtl').getAttribute('data-row');    
  var v_date=document.getElementById('txt_date').innerHTML;
  var v_vax=document.getElementById('txt_vax').innerHTML;
  var v_lotno=document.getElementById('txt_lotno').value;
  var v_refno=document.getElementById('txt_refno').innerHTML;
  var v_loc=document.getElementById('txt_loc').value;
  var v_locname=JBE_GETFLD('name',DB_WHOUSE,'whcode',v_loc);
  //var v_nostock=parseInt(document.getElementById('txt_nostock').getAttribute('data-nostock'));  
  var v_nostock=parseInt(document.getElementById('txt_nostock').innerHTML);  
  let fg_nostock='blue';
  if(v_nostock > 0){ fg_nostock='red'; }

  

  var v_rqty=parseInt(document.getElementById('txt_rqty').value);
  //var v_loc=document.getElementById('txt_loc').value;
  var v_qty=Number(document.getElementById('txt_qty').value);
  var v_qty_old=Number(document.getElementById('txt_qty_old').innerHTML);
  var v_cost=document.getElementById('txt_cost').value;
  //alert(v_cost);
  var v_amount=document.getElementById('txt_amount').innerHTML;
  //alert('v_amount:'+v_amount);
  //var v_nostockexpiry=document.getElementById('txt_expiry').innerHTML;
  //var v_expiry=document.getElementById('txt_expiry').innerHTML;
  var v_expiry=document.getElementById('txt_expiry').value;
  //alert('v_expiry:'+v_expiry);
  var v_stockno=document.getElementById('txt_stockno').innerHTML;

  //if(!v_expiry){ snackBar('Please enter an Item.'); return; }
  
  //alert('v_expiry: '+v_expiry+' vs ptrdate: '+ptrdate.value);
  if(v_expiry < ptrdate.value){ snackBar('Error: Item Expired! Pls. check Expiry Date.'); return; }

  if(!v_vax){ snackBar('Please enter an Item.'); return; }
  if(!v_rqty){ snackBar('Error: Requested Quantity is Zero.'); return; }
  if(!v_qty){ snackBar('Error: Quantity is Zero.'); return; }

  //let f_valid=chg_qty_ptr(txt_qty.value);
  //alert('f_valid:'+f_valid);
  //if(!f_valid){ return; }

  if(v_rqty != v_qty){
    MSG_SHOW(vbOk,"<font color='red'><b>WARNING!!!</b></font>","Requested Qty is NOT EQUAL to Issued Qty.",function(){},function(){}); 
  }
  if(!v_qty || v_qty==0){ snackBar('Note: Quantity is Zero.'); }

  //check stock balance
  let stockBal=getStockBal(v_stockno,v_lotno,ptrdate.value);
  //console.log(v_stockno,v_date);
  let bal=stockBal[0];
  //console.log(v_stockno,stockBal);
  //alert(bal);
  if(v_qty>bal){
    //MSG_SHOW(vbOk,'Warning:',' Current Stock Balance is: '+bal,function(){},function(){});
  }
  
  /*
  let ctr_exits=chk_item_exist(v_stockno,v_lotno);
  //alert('ctr_exits '+ctr_exits);  

  if(ctr_exits > 0){ 
    let x=iif(f_add,0,1);
    if(ctr_exits>x){
      snackBar('ERROR: save Item already exist...');
      return;
    }
  }
  */
  
  if(f_add){         
    curRow=document.querySelectorAll('.dtls').length;    
    var line_ctr=curRow+1;
    var v_bundle=JBE_GETFLD('bundle',DB_STOCK,'stockno',v_stockno);  
    var v_bundle_multi=parseInt(JBE_GETFLD('bundle_multi',DB_STOCK,'stockno',v_stockno));  

    /*
    var v_bundleName=JBE_GETFLD('descrp',DB_STOCK,'stockno',v_bundle);  
    var v_bundleLotno=JBE_GETFLD('lotno',DB_STOCK,'stockno',v_bundle);  
    var v_bundleLoc=JBE_GETFLD('loc',DB_STOCK,'stockno',v_bundle);  
    var v_bundle_multi=parseInt(JBE_GETFLD('bundle_multi',DB_STOCK,'stockno',v_stockno));  
    
    var v_bundleExpiry=JBE_DATE_FORMAT(JBE_GETFLD('expiry',DB_STOCK,'stockno',v_bundle),'MM-DD-YYYY');  
    //var v_bundleCost=parseFloat(JBE_GETFLD('cost',DB_RECEIVE2,'stockno',v_bundle));  
    var v_bundleCost=parseFloat(JBE_GETFLD('cost',DB_STOCK,'stockno',v_bundle));  
    */

    let aryBundle=JBE_GETARRY(DB_STOCK,'stockno',v_bundle);
    let v_bundleName=aryBundle.descrp;  
    let v_bundleLotno=aryBundle.lotno;  
    let v_bundleLoc=aryBundle.loc;      
    let v_bundleExpiry=JBE_DATE_FORMAT(aryBundle.expiry,'MM-DD-YYYY');  
    let v_bundleCost=parseFloat(aryBundle.cost);  

    let v_bundleAmount=v_qty*v_bundleCost;  
    let v_bundleQty=v_qty*v_bundle_multi;  
    /*
    alert('watch:'+
      '\n v_bundleCost: '+v_bundleCost+
      '\n v_bundleName: '+v_bundleName+
      '\n v_bundle_multi: '+v_bundle_multi+
      '\n v_bundleQty: '+v_bundleQty+

      '\n\n v_bundleLotno: '+v_bundleLotno+
      '\n v_bundleLoc: '+v_bundleLoc+
      '\n v_bundle: '+v_bundle
    );
    */

    var aryOB=[
      { "stockno":v_stockno, "vaxname":v_vax, "lotno":v_lotno, "loc":v_loc, "locname":get_loc(v_loc), "expiry":v_expiry, "rqty":v_rqty, "qty":v_qty, "cost":v_cost, "amount":v_amount }
    ];

    //check if bundle code already exist
    let v_exist=false;
    let v_line=-1;
    if(v_bundle){
      let arr=chk_bundle_exist(v_bundle,v_bundleLotno);
      v_exist=arr[0];
      v_line=arr[1];
      if(v_exist){               
        snackBar('Bundled item: '+v_bundleName+' Already Exist! Quantity is added.');
        console.log('EXISTTTTTT');
        console.log(v_exist,v_line);
      }else{
        aryOB[1]={ "stockno":v_bundle, "vaxname":v_bundleName, "loc":v_bundleLoc, "locname":get_loc(v_bundleLoc), "lotno":v_bundleLotno, "expiry":v_bundleExpiry, "rqty":v_bundleQty, "qty":v_bundleQty, "cost":v_bundleCost, "amount":v_bundleAmount };      
      }
    }
    
    //var dtl='';
    for(var j=0;j<aryOB.length;j++){
      line_ctr+=j;
      var dtl=
      '<div id="dtl_'+line_ctr+'" class="dtls" onclick="hl_row('+line_ctr+')" style="width:100%;height:40px;margin-top:0px;border:0px solid red;padding:0px;background:none;">'+        

        '<div class="class_mtr0" style="display:none;float:left;width:19%;height:100%;">'+        
          '<span id="dtl_refno_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+v_refno+'</span>'+
          '<span id="dtl_stockno_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+aryOB[j].stockno+'</span>'+        
          '<span id="dtl_nostock_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+v_nostock+'</span>'+ 
          '<span id="dtl_loc_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+aryOB[j].loc+'</span>'+  
          '<span id="dtl_qty_old_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+v_qty_old+'</span>'+ 
          '<span id="dtl_trano_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;"></span>'+              
        '</div>'+

        '<div class="class_mtr0" style="display:none;float:left;width:15%;height:100%;">'+        
          '<span id="dtl_date_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+v_date+'</span>'+
        '</div>'+
        '<div class="class_mtr0" style="float:left;width:23%;height:100%;">'+        
          '<span id="dtl_vax_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;overflow:auto;">'+aryOB[j].vaxname+'</span>'+
        '</div>'+
        '<div class="class_mtr0" style="float:left;width:13%;height:100%;">'+        
          '<span id="dtl_lotno_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;overflow:auto;">'+aryOB[j].lotno+'</span>'+
        '</div>'+
        '<div class="class_mtr0" style="float:left;width:10%;height:100%;">'+        
          '<span id="dtl_expiry_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;overflow:auto;">'+aryOB[j].expiry+'</span>'+
        '</div>'+
        '<div class="class_mtr0" style="float:left;width:7%;height:100%;">'+        
          //'<span id="dtl_loc_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;overflow:auto;">'+JBE_GETFLD('name',DB_WHOUSE,'whcode',v_loc)+'</span>'+
          '<span id="dtl_locname_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;text-align:center;overflow:auto;">'+aryOB[j].locname+'</span>'+
        '</div>'+
        
        '<div class="class_mtr0" style="float:left;width:10%;height:100%;">'+        
          '<span id="dtl_rqty_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:center;padding:6px 0 0 0;">'+aryOB[j].rqty+'</span>'+
        '</div>'+      
        '<div class="class_mtr0" style="float:left;width:5%;height:100%;">'+        
          '<span id="dtl_nostock2_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:5px 0 0 0;text-align:center;color:'+fg_nostock+';">'+iif(v_nostock==0,'Yes','No')+'</span>'+
        '</div>'+

        '<div class="class_mtr0" style="float:left;width:10%;height:100%;">'+        
          '<span id="dtl_cost_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:center;padding:6px 0 0 0;">'+aryOB[j].cost+'</span>'+
        '</div>'+
        '<div class="class_mtr0" style="float:left;width:7%;height:100%;">'+        
          '<span id="dtl_qty_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:center;padding:6px 0 0 0;">'+aryOB[j].qty+'</span>'+
        '</div>'+
        '<div class="class_mtr0" style="float:left;width:15%;height:100%;">'+        
          '<span id="dtl_amount_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:right;padding:6px 0 0 0;">'+aryOB[j].amount+'</span>'+
        '</div>'+
      '</div>';
      document.getElementById('ptr_dtl').innerHTML+=dtl;      
    }
    if(v_exist){
      console.log(v_line+':::GOING TO ADD....'+document.getElementById('dtl_qty_'+v_line).innerHTML);
      let newqty=parseInt(document.getElementById('dtl_qty_'+v_line).innerHTML)+v_bundleQty;
      document.getElementById('dtl_rqty_'+v_line).innerHTML=newqty;
      document.getElementById('dtl_qty_'+v_line).innerHTML=newqty;
    }
    hl_row(line_ctr);
  }else{
    document.getElementById('dtl_stockno_'+curRow).innerHTML=v_stockno;
    document.getElementById('dtl_nostock_'+curRow).innerHTML=v_nostock;
    document.getElementById('dtl_date_'+curRow).innerHTML=v_date;
    document.getElementById('dtl_vax_'+curRow).innerHTML=v_vax;
    document.getElementById('dtl_expiry_'+curRow).innerHTML=JBE_DATE_FORMAT(v_expiry,'MM-DD-YYYY');
    document.getElementById('dtl_lotno_'+curRow).innerHTML=v_lotno;
    document.getElementById('dtl_nostock2_'+curRow).innerHTML=iif(v_nostock==0,'Yes','No');
    document.getElementById('dtl_nostock2_'+curRow).style.color=fg_nostock;
    document.getElementById('dtl_rqty_'+curRow).innerHTML=v_rqty;
    document.getElementById('dtl_loc_'+curRow).innerHTML=v_loc;
    document.getElementById('dtl_locname_'+curRow).innerHTML=v_locname;
    document.getElementById('dtl_qty_'+curRow).innerHTML=v_qty;
    document.getElementById('dtl_qty_old_'+curRow).innerHTML=v_qty_old;
    document.getElementById('dtl_cost_'+curRow).innerHTML=JBE_FORMAT_DOUBLE_TO_STR(v_cost);
    document.getElementById('dtl_amount_'+curRow).innerHTML=v_amount;
    document.getElementById('dtl_refno_'+curRow).innerHTML=v_refno;
  }
  PTR_SHOW_MODULE(false);
  mnu_edit_ptr();
  proc_tot_amt();
  //alert('going to save to row:'+curRow);
}

function chk_bundle_exist(stockno,lotno){
  let rval=[];
  rval[0]=false;
  rval[1]=-1;
  let len_dtls=document.querySelectorAll('.dtls').length;     
  for(var i=1;i<=len_dtls;i++){
    let d_stockno=document.getElementById('dtl_stockno_'+i).innerHTML;
    let d_lotno=document.getElementById('dtl_lotno_'+i).innerHTML;
    let d_dtl=document.getElementById('dtl_'+i).style.display;
    if(d_stockno==stockno && d_lotno==lotno && d_dtl!='none'){          
      rval[0]=true;
      rval[1]=i;
      break;
    }
  }  
  return rval;
}

function del_item_ptr(){
  var len_dtls=document.querySelectorAll('.dtls').length;   
  if(len_dtls==0){ 
    snackBar('No record to delete.');
    return;
  }
  let row=document.getElementById('ptr_dtl').getAttribute('data-row');  
  //alert('row:'+row);
  document.getElementById('dtl_'+row).style.display='none';
  proc_tot_amt();
}

//========================================================================================================
//========================================================================================================
//========================================================================================================
///
function sel_trano(){
  //alert('areano:'+areano);
  let ptrType=document.getElementById('ptr_head').getAttribute('data-ptrType');
  var newArr = DB_PTR.filter(function(DB_PTR) {
    return DB_PTR.type == ptrType;
  });
  var flds=[
    { title:"RIS No.", fld:"trano", type:"text", width:"20%", align:"center" },
    { title:"Status", fld:"trans", type:"text", width:"20%", align:"center" },
    { title:"Sub-Area", fld:"sel_trano_name|trano", type:"text", width:"60%", align:"left" } 
  ];
  //FM_XLOOKUP(true,trano.value,newArr,['*trano'],'Select RIS','do_sel_trano','trano',flds,'trano','func_cancel');
  var ob=[
    { val:trano.value, fld:"trano" }
  ];
  FM_LOOKUP2(true,trano.value,ob,newArr,['*trano'],'LOOKUP','do_sel_trano',flds,'func_cancel');
}

function func_cancel(){
  var len_look=document.querySelectorAll('.cls_names').length; 
  for(var i=0;i<len_look;i++){
    let v_trans=document.getElementById('dd_trans'+i).innerHTML;    
    if(v_trans == 'XXX'){ 
      document.getElementById('d_'+i).style.color='brown'; 
      document.getElementById('d_'+i).style.fontStyle='italic';
      document.getElementById('d_'+i).style.fontWeight='bold';
    }
  }
}

function sel_trano_name(trano){  
  let aryDB=JBE_GETARRY(DB_PTR,'trano',trano);
  let areaname=JBE_GETFLD('name',DB_AREA,'areano',aryDB.areano);
  let dtl=aryDB.details.trim();
  dtl=iif(dtl.length==0,'',' <font color="blue">[ <i>'+aryDB.details+'</i> ]</font>');
  //dtl=iif(dtl.length==0,'',' [ <div style="width:auto;color:blue;">'+aryDB.details+'</div> ]');
  return areaname+dtl;
}
function do_sel_trano(ndx){	
  if(ndx == -1){ 
    init_ptr();
    return; 
  }
  let val=document.getElementById('dd_trano'+ndx).innerHTML;
  document.getElementById('trano').value=val;  
  document.getElementById('ptr_head').setAttribute('data-trano',val);  
  disp_ptr();
}

function sel_sub_area(){
  //alert('areano:'+areano);
  var flds=[
    { title:"Sub-Area", fld:"name", type:"text", width:"50%", align:"left" }, 
    { title:"Code", fld:"areano", type:"text", width:"50%", align:"center" },
  ];
  //FM_XLOOKUP(true,sub_area.innerHTML,DB_AREA,[],'Select Sub-Area','do_sel_sub_area','name',flds,'areano');
  var ob=[
    { val:sub_areano.innerHTML, fld:"areano" }
  ];
  FM_LOOKUP2(true,sub_area.innerHTML,ob,DB_AREA,['name'],'Select Sub-Area','do_sel_sub_area',flds);
}
function do_sel_sub_area(ndx){
  if(ndx == -1){ 
    document.getElementById('sub_area').innerHTML='';
    return; 
  }  
  //alert(document.getElementById('dd_areano'+ndx).innerHTML);
  //document.getElementById('sub_area').setAttribute('data-areano',val);
  document.getElementById('sub_areano').innerHTML=document.getElementById('dd_areano'+ndx).innerHTML;
  document.getElementById('sub_area').innerHTML=document.getElementById('dd_name'+ndx).innerHTML;
}

function closeNames(){  
  //openPage('page_meter');     
  //alert('bye');
}

//======================================
function filter_vax_type(db){
  JBE_GETFLD('trans',DB_PTR,'trano',trano);
}

function fld_color(){
  var len_look=document.querySelectorAll('.cls_names').length; 
  for(var i=0;i<len_look;i++){
    let v_stockno=document.getElementById('dd_stockno'+i).innerHTML;
    let v_lotno=document.getElementById('dd_lotno'+i).innerHTML;
    let v_loc=document.getElementById('dd_loc'+i).innerHTML;
    //let v_cost=document.getElementById('dd_cost'+i).innerHTML;    
    //if(v_cost == '-'){ document.getElementById('d_'+i).style.color='gray'; }
    let lotno=JBE_GETFLD('lotno',DB_STOCK,'stockno',v_stockno);
    let loc=JBE_GETFLD('loc',DB_STOCK,'stockno',v_stockno);
    //console.log(v_lotno+'::>>>lotno:'+lotno);
    if(v_lotno==lotno && v_loc==loc){ document.getElementById('d_'+i).style.color='red'; }
  }
}


function chg_rqty(rqty){
  rqty=parseInt(rqty);
  var v_nostock=document.getElementById('txt_nostock').innerHTML;
  var div_qty=document.getElementById('txt_qty');  
  let cost=document.getElementById('txt_cost').value;
  txt_rqty.value=rqty;    
    
  if((!div_qty.value || div_qty.value==0) && v_nostock==0){
    document.getElementById('txt_qty').value= rqty;
    document.getElementById('txt_amount').innerHTML= JBE_FORMAT_DOUBLE_TO_STR(cost * rqty);
    //alert('me here...');    
  }else if(rqty != div_qty.value){   
    //alert(rqty+' vs div_qty:'+div_qty.value);
    MSG_SHOW(vbYesNo,"CONFIRM!!!: ","Req. Qty NOT EQUAL to Issued Qty.<br>Do you wish to copy Required Qty to Issued Qty?",
      function(){ 
        txt_qty.value=rqty; 
        document.getElementById('txt_amount').innerHTML= JBE_FORMAT_DOUBLE_TO_STR(cost * rqty);
        txt_qty.focus(); 
      },function(){}
    );    
  } 
}

function chg_qty_ptr(qty){      
  document.getElementById('fm_item').setAttribute('data-chgQty',1);
  //alert('tambaloslos qty:'+qty);
  //alert('txt_qty_old.innerHTML:'+txt_qty_old.innerHTML);
  let qty_old=JBE_FORMAT_STR_TO_NUMBER(txt_qty_old.innerHTML);  
  ///check stock balance
  //let stock_bal=JBE_FORMAT_STR_TO_NUMBER(txt_stock_bal.value);
  let stock_bal=JBE_FORMAT_STR_TO_NUMBER(txt_stock_bal.value);
  //let stock_bal=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('txt_stock_bal').value);
  let new_bal=stock_bal+qty_old;
  
  console.log('chg_qty_ptr:'+
    "\nStock Balance  : "+stock_bal+
    "\nOld Qty   : "+qty_old+
    "\nThis Qty   : "+qty+
    "\nAvailable  : "+new_bal
  );
  
  
  let cost=document.getElementById('txt_cost').value;
  let amount=cost * qty;

  console.log('qty: '+qty);
  console.log('cost: '+cost);
  console.log('amount: '+amount);
  document.getElementById('txt_amount').innerHTML= JBE_FORMAT_DOUBLE_TO_STR(amount);

  if(qty > new_bal){
    MSG_SHOW(vbYesNo,"ERROR: Invalid Withdrawal",
      "Stock Balance  : "+stock_bal+
      "<br>This Qty   : "+qty_old+
      "<br>Available  : "+new_bal+
      "<br><br>Do you wish to continue?",
      function(){ return true; },
      function(){
        document.getElementById('txt_amount').innerHTML= JBE_FORMAT_DOUBLE_TO_STR(cost * qty_old); 
        txt_qty.value=qty_old; 
        txt_qty.focus();
        return false;
      }
    );
  }else{
    return true;
  }
}



function proc_tot_amt(){
  let len_dtls=document.querySelectorAll('.dtls').length;    
  let tot_amt=0; 
  for(var i=1;i<=len_dtls;i++){
    console.log(document.getElementById('dtl_amount_'+i).innerHTML);
    /*
    let d_dtl=document.getElementById('dtl_'+i).style.display;
    console.log('d_dtl:',d_dtl);
    if(d_dtl=='none'){ continue; }
    */

    tot_amt += JBE_FORMAT_STR_TO_DOUBLE(document.getElementById('dtl_amount_'+i).innerHTML);
  }
  document.getElementById('ptr_tot').innerHTML=JBE_FORMAT_DOUBLE_TO_STR(tot_amt);
}

function chg_nostock(v){
  let v_row=document.getElementById('ptr_dtl').getAttribute('data-row'); 
  if(!v_row){ return; }
  //alert('chg_nostock '+v);  
  document.getElementById('rad1').value=1;
  document.getElementById('rad2').value=0;
  if(v==1){ 
    document.getElementById('rad1').value=0; 
    document.getElementById('rad2').value=1; 
  }
  //document.getElementById('txt_nostock').setAttribute('data-nostock',v); 
  document.getElementById('txt_nostock').innerHTML=v;
}

function sel_vax(){
  let ptrType=document.getElementById('ptr_head').getAttribute('data-ptrType');
  //alert('ptrType:'+ptrType);
  let ctr=0;
  let newArr1=[];
  let newArr2=[];

  let ary=[txt_loc.value,txt_stockno.innerHTML,txt_lotno.value];

  var flds=[    
    { title:"", fld:"stockno", type:"text", width:"0%", align:"center" },
    //{ title:"", fld:"trano", type:"text", width:"10%", align:"center" },
    { title:"", fld:"loc", type:"number", width:"10%", align:"center" },
    { title:"", fld:"cost", type:"double", width:"0%", align:"center" },
    { title:"Description Desc.", fld:"descrp", type:"text", width:"30%", align:"center" },   
    { title:"Location", fld:"get_loc|loc", type:"text", width:"10%", align:"center" },
    { title:"Lot No.", fld:"lotno", type:"text", width:"20%", align:"center" },  
    { title:"Expiry", fld:"expiry", type:"date", width:"20%", align:"center" },
    { title:"Ref NO.", fld:"refno", type:"text", width:"10%", align:"center" },
    //{ title:"Balance", fld:"disp_stockbal|stockno|loc|lotno", type:"number", width:"10%", align:"right" }
    //{ title:"Balance", fld:"disp_stockbal(stockno,loc,lotno)", type:"number", width:"10%", align:"right" }
    { title:"Balance", fld:"balance", type:"number", width:"10%", align:"right" }
  ];

  newArr1 = DB_TRANSFER2.filter(function(DB_TRANSFER2) {    
    return DB_TRANSFER2.type == ptrType || DB_TRANSFER2.type == 2 || DB_TRANSFER2.type == 4;
  });
    
  var ob=[
    { val:txt_stockno.innerHTML, fld:"stockno" },
    { val:txt_lotno.value, fld:"lotno" },
    { val:txt_loc.value, fld:"loc" }
  ];
  FM_LOOKUP2(true,txt_vax.innerHTML,ob,newArr1,['stockno','expiry','lotno','loc'],'LOOKUP','do_sel_vax_ptr',flds,'fld_color');
}

function disp_stockbal(a,b,c){
  console.log('>>> watch: '+a,b,c);
  return 1;
  //loc,stockno,lotno
  //let loc=ary.loc; let stockno=ary.stockno; let lotno=ary.lotno;
  //alert(a);
  /*
  let rundate=JBE_DATE_FORMAT(ddate,'YYYY-MM-DD');
  let arr=get_bal_stock(parseInt(loc),stockno,lotno,rundate);
  let v_bal=parseInt(arr.bal);
  return v_bal;
  */
}

function clear_items_ptr(){
  document.getElementById('txt_vax').innerHTML='';
  document.getElementById('txt_vax').setAttribute('data-stockno','');
  document.getElementById('txt_lotno').value='';
  document.getElementById('txt_loc').value='';
  document.getElementById('txt_expiry').innerHTML='';
  document.getElementById('txt_cost').innerHTML=JBE_FORMAT_DOUBLE_TO_STR(0);
}

function do_sel_vax_ptr(ndx){  
  if(ndx == -1){ 
    clear_items_ptr();
    return; 
  }
  var curRow=parseInt(document.getElementById('ptr_dtl').getAttribute('data-row'));
  var f_add_item=document.getElementById('fm_item').getAttribute('data-add');
  //alert(f_add_item+' :: '+curRow);
  let stockno=document.getElementById('dd_stockno'+ndx).innerHTML;
  let refno=document.getElementById('dd_refno'+ndx).innerHTML;
      
  document.getElementById('txt_stockno').innerHTML=stockno;
  let lotno=document.getElementById('dd_lotno'+ndx).innerHTML;
  let descrp=document.getElementById('dd_descrp'+ndx).innerHTML;
  let expiry=JBE_DATE_FORMAT(document.getElementById('dd_expiry'+ndx).innerHTML,'YYYY-MM-DD');
  let loc=document.getElementById('dd_loc'+ndx).innerHTML;
  let cost=document.getElementById('dd_cost'+ndx).innerHTML;
  let qty=document.getElementById('txt_qty').value;
  let stock_bal=document.getElementById('dd_balance'+ndx).innerHTML;
  let amount=document.getElementById('txt_amount').innerHTML; 
  let len_dtls=document.querySelectorAll('.dtls').length;     
  //alert('lookup2 loc:'+loc);
  

  for(var i=1;i<=len_dtls;i++){
    let d_stockno=document.getElementById('dtl_stockno_'+i).innerHTML;
    let d_lotno=document.getElementById('dtl_lotno_'+i).innerHTML;
    let d_loc=document.getElementById('dtl_loc_'+i).innerHTML;
    let d_dtl=document.getElementById('dtl_'+i).style.display;
    //if(d_stockno==stockno && d_lotno==lotno && f_add_item && d_dtl!='none'){
    if(d_stockno==stockno && d_lotno==lotno && d_loc==loc && d_dtl!='none'){
      console.log(
        'txt_stockno: '+d_stockno+' VS '+stockno+
        '\ntxt_lotno: '+d_lotno+' VS '+lotno+
        '\nf_add_item: '+f_add_item+
        '\ncurRow: '+(curRow)+
        '\nI: '+(i)+
        '\nd_dtl: '+d_dtl
      );

      if(f_add_item == 1){
        snackBar('ERROR: Cannot add, Item already exist...');
        clear_items_ptr();
        return;
      }else{
        if(i != curRow){
          snackBar('ERROR: Cannot Edit, Item already exist...');
          return;
        }    
      }  
    }
  }

  if(stockno){
    document.getElementById('txt_rqty').disabled=false;
    document.getElementById('txt_rqty').focus();
    //document.getElementById('txt_cost').disabled=false;
    document.getElementById('txt_qty').disabled=false;
  }
  
  document.getElementById('txt_vax').innerHTML=descrp;
  document.getElementById('txt_vax').setAttribute('data-stockno',stockno);
  document.getElementById('txt_lotno').value=lotno;
  document.getElementById('txt_loc').value=loc;
  document.getElementById('txt_expiry').value=expiry;
  document.getElementById('txt_cost').value=JBE_FORMAT_STR_TO_DOUBLE(cost);
  document.getElementById('txt_stock_bal').value=stock_bal;
  document.getElementById('txt_refno').innerHTML=refno;
  //if(!amount){ document.getElementById('txt_amount').innerHTML= JBE_FORMAT_DOUBLE_TO_STR(cost * qty); }
  //alert('amount:'+amount);
  //chg_qty_ptr(parseInt(document.getElementById('txt_qty').value));
}

function get_bal_ptr(loc,stockno,lotno,qty,qty_old){
  let rundate=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');
  let arr=get_bal_stock(parseInt(loc),stockno,lotno,rundate);  
  let v_bal=parseInt(arr.tf);
  let v_tf=parseInt(arr.tf);
  let v_ris=parseInt(arr.ris);
  let v_ret=parseInt(arr.ret);
  //let stockbal=(v_tf+qty_old)-(v_ris+v_ret+qty);
  let stockbal=(v_bal+qty_old)-qty;
  console.log(
    '*** getbal_ptr: '+loc+'\n'+
    'v_tf: '+v_tf+'\n'+
    'v_qty: '+qty+'\n'+
    'v_ris: '+v_ris+'\n'+
    'v_ret: '+v_ret+'\n'+
    'BAL: '+stockbal
  );  

  return stockbal;
}


//////// NEW CODE UPDATED =======================================================================
//////// NEW CODE UPDATED =======================================================================
//////// NEW CODE UPDATED =======================================================================
function save_item_ptr(f_add){
  //alert('save_item_ptr f:'+f_add);
  let f_chgqty=document.getElementById('fm_item').getAttribute('data-chgQty');
  if(f_chgqty==0){ 
    if(!chg_qty_ptr(txt_qty.value)){ txt_qty.focus(); return; }
  }  
  //alert('save_item_ptr:'+f_add+'\nf_chgqty:'+f_chgqty);  
  var curRow=document.getElementById('ptr_dtl').getAttribute('data-row');    
  var v_date=document.getElementById('txt_date').innerHTML;
  var v_vax=document.getElementById('txt_vax').innerHTML;
  var v_lotno=document.getElementById('txt_lotno').value;
  var v_refno=document.getElementById('txt_refno').innerHTML;
  var v_loc=document.getElementById('txt_loc').value;
  var v_locname=JBE_GETFLD('name',DB_WHOUSE,'whcode',v_loc);
  //var v_nostock=parseInt(document.getElementById('txt_nostock').getAttribute('data-nostock'));  
  var v_nostock=parseInt(document.getElementById('txt_nostock').innerHTML);  
  let fg_nostock='blue';
  if(v_nostock > 0){ fg_nostock='red'; }

  

  var v_rqty=parseInt(document.getElementById('txt_rqty').value);
  //var v_loc=document.getElementById('txt_loc').value;
  var v_qty=Number(document.getElementById('txt_qty').value);
  var v_qty_old=Number(document.getElementById('txt_qty_old').innerHTML);
  var v_cost=Number(document.getElementById('txt_cost').value);
  //alert(v_cost);
  //var v_amount=document.getElementById('txt_amount').innerHTML;
  var v_amount=v_qty*v_cost
  //alert('v_amount:'+v_amount);
  //var v_nostockexpiry=document.getElementById('txt_expiry').innerHTML;
  //var v_expiry=document.getElementById('txt_expiry').innerHTML;
  var v_expiry=document.getElementById('txt_expiry').value;
  //alert('v_expiry:'+v_expiry);
  var v_stockno=document.getElementById('txt_stockno').innerHTML;

  //if(!v_expiry){ snackBar('Please enter an Item.'); return; }
  
  //alert('v_expiry: '+v_expiry+' vs ptrdate: '+ptrdate.value);
  if(v_expiry < ptrdate.value){ snackBar('Error: Item Expired! Pls. check Expiry Date.'); return; }

  if(!v_vax){ snackBar('Please enter an Item.'); return; }
  if(!v_rqty){ snackBar('Error: Requested Quantity is Zero.'); return; }
  if(!v_qty){ snackBar('Error: Quantity is Zero.'); return; }

  //let f_valid=chg_qty_ptr(txt_qty.value);
  //alert('f_valid:'+f_valid);
  //if(!f_valid){ return; }

  if(v_rqty != v_qty){
    MSG_SHOW(vbOk,"<font color='red'><b>WARNING!!!</b></font>","Requested Qty is NOT EQUAL to Issued Qty.",function(){},function(){}); 
  }
  if(!v_qty || v_qty==0){ snackBar('Note: Quantity is Zero.'); }

  //check stock balance
  let stockBal=getStockBal(v_stockno,v_lotno,ptrdate.value);
  //console.log(v_stockno,v_date);
  let bal=stockBal[0];
  let ctr_aryOB=1; 
    
  if(f_add){         
    curRow=document.querySelectorAll('.dtls').length;    
    var line_ctr=curRow+1;
    
    var v_bundle=JBE_GETFLD('bundle',DB_STOCK,'stockno',v_stockno);  
    let v_bundleLotno=JBE_GETFLD('lotno',DB_STOCK,'stockno',v_stockno);  
    /*
    var v_bundle_multi=parseInt(JBE_GETFLD('bundle_multi',DB_STOCK,'stockno',v_stockno));  

    let aryBundle=JBE_GETARRY(DB_STOCK,'stockno',v_bundle);
    let v_bundleName=aryBundle.descrp;  
    let v_bundleLotno=aryBundle.lotno;  
    let v_bundleLoc=aryBundle.loc;      
    let v_bundleExpiry=JBE_DATE_FORMAT(aryBundle.expiry,'MM-DD-YYYY');  
    let v_bundleCost=parseFloat(aryBundle.cost);  

    let v_bundleAmount=v_qty*v_bundleCost;  
    let v_bundleQty=v_qty*v_bundle_multi;  
    */

    var aryOB=[
      { "stockno":v_stockno, "vaxname":v_vax, "lotno":v_lotno, "loc":v_loc, "locname":get_loc(v_loc), "expiry":v_expiry, "rqty":v_rqty, "qty":v_qty, "cost":v_cost, "amount":v_amount }
    ];

    //check if bundle code already exist
    let v_exist=false;
    let v_line=-1;
    if(v_bundle){
      let arr=chk_bundle_exist(v_bundle,v_bundleLotno);
      v_exist=arr[0];
      v_line=arr[1];
      if(v_exist){               
        //alert('Bundled item: '+v_bundleName+' Already Exist! Quantity is added.');
        console.log('EXISTTTTTT');
        console.log(v_exist,v_line);
      }else{
        //alert('v_stockno:'+v_stockno);
        for(var k=0;k<DB_STOCK2.length;k++){    
          if(DB_STOCK2[k].stockno != v_stockno){ continue; } 
          let v_bundle=DB_STOCK2[k].bundle_no;
          let v_bundle_multi=parseInt(DB_STOCK2[k].bundle_multi);  

          let aryBundle=JBE_GETARRY(DB_STOCK,'stockno',v_bundle);
          let v_bundleName=aryBundle.descrp;  
          let v_bundleLotno=aryBundle.lotno;  
          let v_bundleLoc=aryBundle.loc;      
          let v_bundleExpiry=JBE_DATE_FORMAT(aryBundle.expiry,'MM-DD-YYYY');  
          let v_bundleCost=parseFloat(aryBundle.cost);  

          let v_bundleAmount=v_qty*v_bundleCost;  
          let v_bundleQty=v_qty*v_bundle_multi;
          
          aryOB[ctr_aryOB]={ "stockno":v_bundle, "vaxname":v_bundleName, "loc":v_bundleLoc, "locname":get_loc(v_bundleLoc), "lotno":v_bundleLotno, "expiry":v_bundleExpiry, "rqty":v_bundleQty, "qty":v_bundleQty, "cost":v_bundleCost, "amount":v_bundleAmount };      
          ctr_aryOB++;
        }        
      }
    }
    console.log(ctr_aryOB+' ::: aryOB len:'+aryOB.length);
    console.log(aryOB);
    let dtl='';
    //line_ctr=1;
    let ctr_ob=0;
    //alert('line_ctr:'+line_ctr);
    for(var j=0;j<aryOB.length;j++){
      //line_ctr+=ctr_ob;
      console.log(j,'line_ctr',line_ctr);
      dtl+=
      '<div id="dtl_'+line_ctr+'" class="dtls" onclick="hl_row('+line_ctr+')" style="display:block;width:100%;height:40px;margin-top:0px;border:0px solid red;padding:0px;background:none;">'+        

        '<div class="class_mtr0" style="display:none;float:left;width:19%;height:100%;">'+        
          '<span id="dtl_refno_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+v_refno+'</span>'+
          '<span id="dtl_stockno_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+aryOB[j].stockno+'</span>'+        
          '<span id="dtl_nostock_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+v_nostock+'</span>'+ 
          '<span id="dtl_loc_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+aryOB[j].loc+'</span>'+  
          '<span id="dtl_qty_old_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+v_qty_old+'</span>'+ 
          '<span id="dtl_trano_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;"></span>'+              
        '</div>'+

        '<div class="class_mtr0" style="display:none;float:left;width:15%;height:100%;">'+        
          '<span id="dtl_date_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+v_date+'</span>'+
        '</div>'+
        '<div class="class_mtr0" style="float:left;width:23%;height:100%;">'+        
          '<span id="dtl_vax_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;overflow:auto;">'+aryOB[j].vaxname+'</span>'+
        '</div>'+
        '<div class="class_mtr0" style="float:left;width:13%;height:100%;">'+        
          '<span id="dtl_lotno_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;overflow:auto;">'+aryOB[j].lotno+'</span>'+
        '</div>'+
        '<div class="class_mtr0" style="float:left;width:10%;height:100%;">'+        
          '<span id="dtl_expiry_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;overflow:auto;">'+aryOB[j].expiry+'</span>'+
        '</div>'+
        '<div class="class_mtr0" style="float:left;width:7%;height:100%;">'+        
          //'<span id="dtl_loc_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;overflow:auto;">'+JBE_GETFLD('name',DB_WHOUSE,'whcode',v_loc)+'</span>'+
          '<span id="dtl_locname_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;text-align:center;overflow:auto;">'+aryOB[j].locname+'</span>'+
        '</div>'+
        
        '<div class="class_mtr0" style="float:left;width:10%;height:100%;">'+        
          '<span id="dtl_rqty_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:center;padding:6px 0 0 0;">'+aryOB[j].rqty+'</span>'+
        '</div>'+      
        '<div class="class_mtr0" style="float:left;width:5%;height:100%;">'+        
          '<span id="dtl_nostock2_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:5px 0 0 0;text-align:center;color:'+fg_nostock+';">'+iif(v_nostock==0,'Yes','No')+'</span>'+
        '</div>'+

        '<div class="class_mtr0" style="float:left;width:10%;height:100%;">'+        
          '<span id="dtl_cost_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:center;padding:6px 0 0 0;">'+JBE_FORMAT_DOUBLE_TO_STR(aryOB[j].cost)+'</span>'+
        '</div>'+
        '<div class="class_mtr0" style="float:left;width:7%;height:100%;">'+        
          '<span id="dtl_qty_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:center;padding:6px 0 0 0;">'+aryOB[j].qty+'</span>'+
        '</div>'+
        '<div class="class_mtr0" style="float:left;width:15%;height:100%;">'+        
          '<span id="dtl_amount_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:right;padding:6px 0 0 0;">'+JBE_FORMAT_DOUBLE_TO_STR(aryOB[j].amount)+'</span>'+
        '</div>'+

      '</div>';          
      line_ctr++;
    }

    document.getElementById('ptr_dtl').innerHTML+=dtl; 
    line_ctr--;
    curRow=line_ctr;
    //alert('last line_ctr:'+line_ctr);

    if(v_exist){
      console.log(v_line+':::GOING TO ADD....'+document.getElementById('dtl_qty_'+v_line).innerHTML);
      let newqty=parseInt(document.getElementById('dtl_qty_'+v_line).innerHTML)+v_bundleQty;
      document.getElementById('dtl_rqty_'+v_line).innerHTML=newqty;
      document.getElementById('dtl_qty_'+v_line).innerHTML=newqty;
    }
    hl_row(line_ctr);
  }else{
    document.getElementById('dtl_stockno_'+curRow).innerHTML=v_stockno;
    document.getElementById('dtl_nostock_'+curRow).innerHTML=v_nostock;
    document.getElementById('dtl_date_'+curRow).innerHTML=v_date;
    document.getElementById('dtl_vax_'+curRow).innerHTML=v_vax;
    document.getElementById('dtl_expiry_'+curRow).innerHTML=JBE_DATE_FORMAT(v_expiry,'MM-DD-YYYY');
    document.getElementById('dtl_lotno_'+curRow).innerHTML=v_lotno;
    document.getElementById('dtl_nostock2_'+curRow).innerHTML=iif(v_nostock==0,'Yes','No');
    document.getElementById('dtl_nostock2_'+curRow).style.color=fg_nostock;
    document.getElementById('dtl_rqty_'+curRow).innerHTML=v_rqty;
    document.getElementById('dtl_loc_'+curRow).innerHTML=v_loc;
    document.getElementById('dtl_locname_'+curRow).innerHTML=v_locname;
    document.getElementById('dtl_qty_'+curRow).innerHTML=v_qty;
    document.getElementById('dtl_qty_old_'+curRow).innerHTML=v_qty_old;
    document.getElementById('dtl_cost_'+curRow).innerHTML=JBE_FORMAT_DOUBLE_TO_STR(v_cost);
    document.getElementById('dtl_amount_'+curRow).innerHTML=JBE_FORMAT_DOUBLE_TO_STR(v_amount);
    document.getElementById('dtl_refno_'+curRow).innerHTML=v_refno;
  }
  PTR_SHOW_MODULE(false);
  mnu_edit_ptr();
  proc_tot_amt();
  //alert('going to save to row:'+curRow);
}