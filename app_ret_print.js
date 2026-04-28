//========================================= PRINTING =========================================
function prn_ret(){  
  if(!JBE_CHK_USER(1)){ return; }
  //let ptrType=document.getElementById('ptr_head').getAttribute('data-ptrType');
  //if(!document.getElementById("rcvd_name").innerHTML){ 
    //showReturnee(); 
  //}
  //alert('prn_ret');
  do_prn_ret('close_ret_print',true);
}

function showReturnee(){
  let v_areano=tx_areano.value;
  let arr=[]; let ctr_arr=0;
  
  for(var i=0;i<DB_PTR.length;i++){
    if(DB_PTR[i].areano==v_areano && DB_PTR[i].rcvd_name){
      //let f_found = arr.find((r) => r.name === DB_PTR[i].rcvd_name);
      if(arr.find((r) => r.name === DB_PTR[i].rcvd_name)){ continue; }
      let ob={
        name:DB_PTR[i].rcvd_name,
        pos:DB_PTR[i].rcvd_pos,
        tel:DB_PTR[i].rcvd_tel
      };
      arr[ctr_arr]=ob; ctr_arr++;
    }
  }
  let vHeight=H_BODY-300;
  var dtl=
    '<div id="dvReceiver" data-zoom=0 data-close="" style="width:100%;height:'+vHeight+'px;text-align:center;background-color:none;">'+
      '<div style="width:100%;height:25px;border:1px solid lightgray;padding:2px;color:white;background:'+JBE_CLOR+';">'+
        '<div style="float:left;text-align:left;width:40%;height:100%;">Name</div>'+
        '<div style="float:left;text-align:left;width:30%;height:100%;">Position</div>'+
        '<div style="float:left;text-align:left;width:30%;height:100%;">Contact No.</div>'+
      '</div>'+
      '<div style="width:100%;height:35px;margin-top:0px;padding:0px;border:2px solid black;">'+
        '<input id="dvvName" type="text" class="cls_rcvd_ret" style="width:40%;height:100%;" />'+
        '<input id="dvvPos" type="text" class="cls_rcvd_ret" style="width:30%;height:100%;" />'+
        '<label for="dvvTel"></label>'+
        '<input id="dvvTel" name="dvvTel" type="tel" class="cls_rcvd_ret" onchange="chg_tel(this.value)" placeholder="xxxx-xxx-xxxx" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required style="width:30%;height:100%;background:none;" />'+
      '</div>'+

      '<div style="width:100%;height:'+(vHeight-75)+'px;overflow:auto;padding:0px;border:1px solid lightgray;">';
      
        for(var i=0;i<arr.length;i++){
          dtl+=
          '<div onclick="sel_rcvd_ret('+i+')" style="width:100%;height:35px;padding:0px;cursor:pointer;background:none;">'+
            '<div id="dt_name_'+i+'" style="float:left;text-align:left;width:40%;height:100%;padding:3px;border:1px solid lightgray;">'+arr[i].name+'</div>'+
            '<div id="dt_pos_'+i+'" style="float:left;text-align:left;width:30%;height:100%;padding:3px;border:1px solid lightgray;">'+arr[i].pos+'</div>'+
            '<div id="dt_tel_'+i+'" style="float:left;text-align:left;width:30%;height:100%;padding:3px;border:1px solid lightgray;">'+arr[i].tel+'</div>'+
          '</div>';   
        }
      
    dtl+=
      '</div>'+      
    '</div>';  

  var dtl2=      
    '<div style="width:100%;height:100%;padding:6px;color:'+JBE_TXCLOR1+';background:none;">'+
      '<input type="button" onclick="save_rcvd_ret()" style="float:left;width:100px;height:100%;" value="Save Entry" />'+      
      '<input type="button" onclick="new_rcvd_ret()" style="float:left;margin-left:50px;width:100px;height:100%;" value="New Entry" />'+      
    '</div>';   
  JBE_OPENBOX('dvReceiver','Returns Master List',dtl,dtl2); 
  dvvName.value=document.getElementById('rcvd_name').innerHTML;
  dvvPos.value=document.getElementById('rcvd_pos').innerHTML;
  dvvTel.value=document.getElementById('rcvd_tel').innerHTML;
}
function chg_tel(n){
  let nn=formatPhoneNumber(n);
  dvvTel.value=nn;
}

function sel_rcvd_ret(v){
  dvvName.value=document.getElementById('dt_name_'+v).innerHTML;
  dvvPos.value=document.getElementById('dt_pos_'+v).innerHTML;
  dvvTel.value=document.getElementById('dt_tel_'+v).innerHTML;
}
function new_rcvd_ret(){
  dvvName.value='';
  dvvPos.value='';
  dvvTel.value='';
  dvvName.focus();
}
function save_rcvd_ret(){  
  let trano=document.getElementById('tx_trano').value;
  let r_name=dvvName.value;
  let r_pos=dvvPos.value;
  let r_tel=dvvTel.value;
  /*
  document.getElementById('fs_name1').innerHTML=r_name;
  document.getElementById('fs_pos1').innerHTML=r_pos;
  document.getElementById('fs_tel1').innerHTML=r_tel;
*/


  document.getElementById('rcvd_name').innerHTML=r_name;
  document.getElementById('rcvd_pos').innerHTML=r_pos;
  document.getElementById('rcvd_tel').innerHTML=r_tel;

  for(var i=1;i<=2;i++){
    document.getElementById('fs_name'+i).innerHTML=r_name;
    document.getElementById('fs_pos'+i).innerHTML=r_pos;
    document.getElementById('fs_tel'+i).innerHTML=r_tel;
  }





  JBE_CLOSEBOX();
  
  axios.put('/api/upd_ret_rcvd', {headers: { 'Content-Type': 'application/json' }}, { params: { trano:trano,name:r_name,pos:r_pos,tel:r_tel } })
  .then(function (response) {
    DB_RET=response.data;
  })
  .catch(function (error) { console.log(error); });
}

function do_prn_ret(jFunc,f_data){
  let ptrType=0;
  //document.getElementById('back_view2').style.display='none';
  //document.getElementById('cap_viewMid2').innerHTML='Ready';
  //console.log(ptrType+' jfunc:'+jFunc+' f data:'+f_data);
  //var aryLabel=['Sinovac','Pfizer Purple 12 yrs above','Pfizer Orange 5-11 yrs old','BIVALENT',''];
  
  if(!f_data){ fm_ret(); }
  
  document.getElementById('FM_MAIN_TITLE').innerHTML='Ready';
  var dtl=    
  '<div id="printableArea" data-print="JEFF" style="margin-top:0px;height:100%;width:100%;font-family:Arial Narrow,Arial,sans-serif;font-size:10px;padding:2%;overflow:auto;border:1px solid lightgray;background:white;">'+
    //'<div style="height:1000px;width:100%;margin:0 auto;margin-top:0%;border:0px solid black;">';
    '<div id="pa_dtl" style="font-family:Times New Roman, Times, serif;font-size:16px;">';
                  
      var page_ptr_covac='<div style="width:100%;height:auto;margin-top:10px;border:1px dashed red;"></div>';      
      //main_dtl+='</div></div>';
      dtl+=ret_maker(ptrType,1)+page_ptr_covac+ret_maker(ptrType,2);
      dtl+='</div>'+

    '</div>'+ 
    

  '</div>';
  // 0123456789012
  //JBE_OPEN_VIEW2(dtl,'PRINTER','');
  //PTR_SHOW_MODULE(true,dtl);
  JBE_SHOW_MODULE(true,dtl);
  
  document.querySelectorAll('.rightBox').forEach(function(el) {    
    el.style.borderRight='1px solid black';
  });
  document.querySelectorAll('.bottomBox').forEach(function(el) {    
    el.style.borderBottom='1px solid black';
  });

  document.querySelectorAll('.pBox').forEach(function(el) {
    //el.style.color='black';
    el.style.height='100%';
    el.style.cssFloat = 'left';    
    el.style.margin=0;
    el.style.padding='1px 0px 0px 0px';
    el.style.borderBottom='none';
    //el.style.backgroundColor='green';
    //el.style.fontSize='12px';
    el.style.overflowY='hidden';  el.style.overflowX='auto';
  });
  document.querySelectorAll('.pBox p').forEach(function(el) {
    //el.style.color='black';
    el.style.margin=0;
    el.style.padding='1px 5px 0px 5px';
    el.style.background='none';
    //el.style.overflow=iif(JBE_MOBILE,'auto','none');
  });
  document.querySelectorAll('.p_title').forEach(function(el) {
    el.style.color='black';
    el.style.margin=0;
    el.style.padding='2px 2px 0px 2px';
    el.style.background='none';
    //el.style.overflow=iif(JBE_MOBILE,'auto','none');
  });
  
  document.querySelectorAll('.pBox2 p').forEach(function(el) {
    //el.style.color='black';
    el.style.margin=0;
    el.style.padding='1px 5px 0px 5px';
    el.style.background='none';
    //el.style.overflow=iif(JBE_MOBILE,'auto','none');
  });

  document.querySelectorAll('.cls_prn').forEach(function(el) {
    el.style.color=iif(JBE_MOBILE,'black','black');
    el.style.fontSize=iif(JBE_MOBILE,'9px','10px');
  });

  document.querySelectorAll('.fs10').forEach(function(el) {    
    el.style.fontSize=iif(JBE_MOBILE,'9px','10px');
  });
  document.querySelectorAll('.fs11').forEach(function(el) {    
    el.style.fontSize=iif(JBE_MOBILE,'10px','11px');
  });
  document.querySelectorAll('.fs12').forEach(function(el) {    
    el.style.fontSize=iif(JBE_MOBILE,'11px','12px');
  });

  mnu_prn_ret(jFunc,f_data);
  if(f_data){
    disp_ret_prn_dtls(1);
    disp_ret_prn_dtls(2);
  }
/*
  //alert('div:'+document.getElementById('tx_trano').value);
  let vdisp='none';
  if(f_data){
    vdisp='block';    
    disp_ret_prn_dtls(1);
    disp_ret_prn_dtls(2);
  }
  document.getElementById('dvReturnee').style.display=vdisp;
  */
}
//========================================= End of PRINTING =========================================

function ret_maker(ptrType,v){
  //let ptrType=document.getElementById('ptr_head').getAttribute('data-ptrType');
  let ptrImg='gfx/imgNIP.jpg';
  if(ptrType==1){ ptrImg='gfx/imgCOVAX.jpg'; }

  var margTop=0;
  if(v==2){ margTop=40; }
  var w_subArea=52.0;
  var w_stroke=0.4;
  if(JBE_MOBILE){ 
    w_subArea=53.8; 
    w_stroke=0.3;
  }
  var main_dtl=
  '<div style="height:560px;width:100%;margin:0 auto;margin-top:0%;border:1px solid white;">'+  

    '<div id="prnLogo" style="width:100%;height:70px;margin-top:'+margTop+'px;border:1px solid black;">'+
      '<div style="float:left;width:25%;height:100%;padding:5px 0 0px 0;text-align:right;"><img src="gfx/logoCHO.png" style="height:85%;" /></div>'+
      '<div style="float:left;width:50%;height:100%;text-align:center;">'+
        '<div style="font-size:22px;font-weight:bold;padding:9px 0 0 0;">RETURN SLIP</div>'+
        '<div style="font-size:16px;font-weight:bold;padding:0px 0 0 0;">DEPARTMENT OF HEALTH</div>'+
      '</div>'+       
      '<div style="float:left;width:24%;height:100%;padding:5px 0 0px 0;text-align:left;"><img src="gfx/logoNGC.png" style="height:85%;" /></div>'+
    '</div>'+       
  
    '<div class="fs12" style="width:100%;height:15px;margin-top:10px;border:1px solid black;border-bottom:none;">'+
      '<div class="pBox rightBox" style="width:22%;margin-top:0px;"><p>Reference No:</p></div>'+
      '<div class="pBox rightBox" style="width:21%;"><p>Date Prepared:</p></div>'+ 
      '<div class="pBox" style="width:56%;height:100%;"><p>Division / Health Center:</p></div>'+  
    '</div>'+  
    '<div class="fs12" style="width:100%;height:20px;margin-top:0px;border:1px solid black;border-top:none;">'+      
      '<div class="pBox rightBox" style="width:22%;font-weight:bold;text-align:center;font-size:14px;color:black;background:none;"><p id="pRETNO'+v+'"></p></div>'+
      '<div class="pBox rightBox" style="width:21%;font-weight:bold;text-align:center;"><p id="pRETDATE'+v+'"></p></div>'+
      '<div class="pBox" style="width:56%;font-weight:bold;"><span id="pSUB_AREA'+v+'" style="margin:0px;height:100%;font-size:16px;color:blue;padding:0 0 3px 5px;"></span></div>'+
    '</div>'+ 

    '<div class="fs11" style="width:100%;height:35px;margin-top:10px;text-align:center;border:1px solid black;">'+        
      '<div class="pBox rightBox" style="width:3.8%;"><p class="p_title">#</p></div>'+
      '<div class="pBox rightBox" style="width:25%;"><p class="p_title">Item Description</p></div>'+
      '<div class="pBox rightBox" style="width:10%;"><p class="p_title">Unit</p></div>'+
      '<div class="pBox rightBox" style="width:15%;"><p class="p_title">Batch / Lot No.</p></div>'+
      '<div class="pBox rightBox" style="width:8.5%;"><p class="p_title">Expiration Date</p></div>'+
      '<div class="pBox rightBox" style="width:8.5%;"><p class="p_title">Quantity Returned</p></div>'+ 
      '<div class="pBox" style="width:28%;background:none;"><p class="p_title">Remarks</p></div>'+
    '</div>';

    for(var i=1;i<=10;i++){
      main_dtl+=
        '<div class="cls_prn fs11" style="width:100%;height:20px;margin-top:0px;font-size:11px;text-align:center;border:1px solid black;border-top:none;">'+        
          '<div class="pBox rightBox" style="width:3.8%;"><p id="pNum'+v+i+'">'+i+'</p></div>'+
          '<div class="pBox rightBox" style="width:25%;"><p id="pDescrp'+v+i+'"></p></div>'+
          '<div class="pBox rightBox" style="width:10%;"><p id="pUnit'+v+i+'"></p></div>'+
          '<div class="pBox rightBox" style="width:15%;"><p id="pLotNo'+v+i+'"></p></div>'+
          '<div class="pBox rightBox" style="width:8.5%;"><p id="pExpiry'+v+i+'"></p></div>'+
          '<div class="pBox rightBox" style="width:8.5%;"><p id="pQty'+v+i+'"></p></div>'+  
          '<div class="pBox" style="width:28%;"><p id="pRemarks'+v+i+'"></p></div>'+
        '</div>';
    }
    main_dtl+=
    '<div class="fs12" style="position:relative;width:100%;height:100px;margin-top:20px;font-size:12px;border:0px solid red;">';
    let aryHeading=['Returned By:','Received By:'];
    
    for(var i=0;i<2;i++){
      let w_width=24.5;
      let v_disp='none';
      //if(i==3){ w_width=26; v_disp='block'; }      
      if(i==0){ w_width=24; v_disp='block'; }      
      main_dtl+=
        '<div class="fs11" style="float:left;width:49%;height:110px;padding:0 0 0 0%; font-size:12px;text-align:left;border:0px solid blue;background:none;">'+
          '<div style="height:20%;width:100%;font-size:11px;font-weight:bold;font-style:italic;overflow:auto;">'+aryHeading[i]+'</div>'+
          '<div style="height:20%;width:100%;overflow:auto;">Signature: _______________________</div>'+
          '<div style="height:20%;width:100%;overflow:auto;">Name: __________________________</div>'+
          '<div style="height:20%;width:100%;overflow:auto;">Position: ________________________</div>'+          
          '<div style="height:20%;width:100%;overflow:auto;">Date: ___________________________</div>'+
          '<div style="display:'+v_disp+';height:20%;width:100%;overflow:auto;">Tel: ____________________________</div>'+
        '</div>';
        
      if(i==1){
        main_dtl+=
          '<div class="fs11" style="display:none;position:absolute;width:125px;border:0px solid blue; top:29px;left:29.3%;font-size:11px;font-weight:bold;color:blue;">'+            
            '<div>'+DB_SIG[0].approved+'</div>'+
            '<div style="margin-top:13px;margin-left:10px;">'+DB_SIG[0].approvedJob+'</div>'+
          '</div>';
        main_dtl+=
          '<div class="fs11" style="display:block;position:absolute;width:auto;height:auto;text-align:left;border:0px solid blue; top:40px;left:55%;font-size:11px;font-weight:bold;color:blue;">'+            
            '<div>'+DB_SIG[0].issued+'</div>'+
            '<div style="margin-top:12px;margin-left:0px;">'+DB_SIG[0].issuedJob+'</div>'+
          '</div>';
        main_dtl+=
          '<div class="fs11" style="position:absolute;width:auto;height:auto;text-align:left;color:blue;border:0px solid blue; top:40px;left:5%;font-size:11px;font-weight:bold;">'+            
            '<div id="fs_name'+v+'">'+document.getElementById("rcvd_name").innerHTML+'</div>'+
            '<div id="fs_pos'+v+'" style="margin-top:13px;margin-left:10px;">'+document.getElementById("rcvd_pos").innerHTML+'</div>'+
            '<div id="fs_tel'+v+'" style="margin-top:30px;margin-left:0px;">'+document.getElementById("rcvd_tel").innerHTML+'</div>'+
          '</div>';
      }
      
    }
    main_dtl+=
    '</div>'+
  '</div>';
  return main_dtl;
}

function close_ret_print(f_data){  
  if(f_data){
    //alert('ako close ret print');
    JBE_SHOW_MODULE(false);
    FM_fm_menu();
    FM_MAIN_BOX(1); //display mode
    disp_fm_ret();
  }else{
    JBE_CLOSE_VIEW2();
  }
}

function disp_ret_prn_dtls(v){
  var len_dtls=document.querySelectorAll('.dtls').length;  
  document.getElementById('pRETNO'+v).innerHTML=document.getElementById('tx_trano').value;  
  document.getElementById('pRETDATE'+v).innerHTML=JBE_DATE_FORMAT(document.getElementById('tx_date').value,'DD-MMM-YYYY');
  document.getElementById('pSUB_AREA'+v).innerHTML=document.getElementById('tx_areaname').value.toUpperCase();
  for(var i=1;i<=len_dtls;i++){    
    let stockno=document.getElementById('dtl_stockno_'+i).innerHTML;
    let unit=JBE_GETFLD('unit',DB_STOCK,'stockno',stockno);
    document.getElementById('pDescrp'+v+i).innerHTML=document.getElementById('dtl_descrp_'+i).innerHTML;
    document.getElementById('pUnit'+v+i).innerHTML=unit;
    document.getElementById('pLotNo'+v+i).innerHTML=document.getElementById('dtl_lotno_'+i).innerHTML;
    document.getElementById('pExpiry'+v+i).innerHTML=document.getElementById('dtl_expiry_'+i).innerHTML;
    document.getElementById('pQty'+v+i).innerHTML=document.getElementById('dtl_qty_'+i).innerHTML;
  }
}

function mnu_prn_ret(jFunc,f_data){
  var jmenu=  
  '<div style="width:100%;height:100%;">'+
    '<div onclick="printRET()" style="float:left;width:30%;height:100%;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jprn.png" alt="call image" />'+
        '<span>Print Now</span>'+
      '</div>'+
    '</div>'+ 
    '<div id="dvReturnee" onclick="showReturnee()" style="display:'+iif(f_data,'block','none')+';float:left;width:40%;height:100%;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jproduct.png" alt="call image" />'+
        '<span>Returns Info</span>'+
      '</div>'+
    '</div>'+
    '<div onclick="'+jFunc+'('+f_data+');" style="float:right;width:30%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jclose.png"  alt="home image" />'+
        '<span>Close</span>'+
      '</div>'+
    '</div>'+    
  '</div>';
  dispMenu('FM_FOOT',jmenu);  
}

function printRET(){
  //JBE_PRINT_PDF('printableArea');
  //return;
  document.querySelectorAll('.pBoxSubArea').forEach(function(el) {
    //el.style.color='violet';        
    el.style.backgroundColor='violet';        
    el.style.width='50%';    
  });
  JBE_PRINTDIV('printableArea','RET Printing');
}

