//========================================= PRINTING =========================================
function prn_ptr(){  
  if(!JBE_CHK_USER(1)){ return; }
  
  let ptrType=document.getElementById('ptr_head').getAttribute('data-ptrType');  
  let ptrTrans=document.getElementById('ptr_head').getAttribute('data-trans');  
  if(!document.getElementById("rcvd_name").innerHTML && ptrTrans != 'XXX'){ 
    showReceiver(ptrType); 
  }
  do_prn_ptr(ptrType,'close_print',true);
}

function showReceiver(ptrType){
  let v_areano=sub_areano.innerHTML;
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
  let vParag=vHeight-75;
  var dtl=
    '<div id="dvReceiver" data-zoom=0 data-close="" style="width:100%;height:'+vHeight+'px;text-align:center;background-color:none;">';
      if(ptrType==3){
        vParag=vHeight-140;
        dtl+=
        '<div style="width:100%;height:25px;border:1px solid lightgray;padding:2px;color:white;background:'+JBE_CLOR3+';">'+
          '<div style="float:left;text-align:left;width:40%;height:100%;">Requester</div>'+
          '<div style="float:left;text-align:left;width:30%;height:100%;">Position</div>'+
          '<div style="float:left;text-align:left;width:30%;height:100%;">Contact No.</div>'+
        '</div>'+
        '<div style="width:100%;height:35px;margin-top:0px;padding:0px;border:2px solid black;">'+
          '<input id="dvRName" type="text" class="cls_rcvd" style="width:40%;" />'+
          '<input id="dvRPos" type="text" class="cls_rcvd" style="width:30%;" />'+
          '<label for="dvRTel"></label>'+
          '<input id="dvRTel" name="dvRTel" type="tel" class="cls_rcvd" onchange="chg_tel(this.value)" placeholder="xxxx-xxx-xxxx" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required style="width:30%;background:none;" />'+
        '</div>';
      }
      dtl+=
      '<div style="width:100%;height:25px;margin-top:'+iif(ptrType==3,5,0)+'px;border:1px solid lightgray;padding:2px;color:white;background:'+JBE_CLOR+';">'+
        '<div style="float:left;text-align:left;width:40%;height:100%;">Receiver</div>'+
        '<div style="float:left;text-align:left;width:30%;height:100%;">Position</div>'+
        '<div style="float:left;text-align:left;width:30%;height:100%;">Contact No.</div>'+
      '</div>'+
      '<div style="width:100%;height:35px;margin-top:0px;padding:0px;border:2px solid black;">'+
        '<input id="dvvName" type="text" class="cls_rcvd" style="width:40%;" />'+
        '<input id="dvvPos" type="text" class="cls_rcvd" style="width:30%;" />'+
        '<label for="dvvTel"></label>'+
        '<input id="dvvTel" name="dvvTel" type="tel" class="cls_rcvd" onchange="chg_tel(this.value)" placeholder="xxxx-xxx-xxxx" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required style="width:30%;background:none;" />'+
      '</div>'+

      '<div style="width:100%;height:'+vParag+'px;overflow:auto;padding:0px;border:1px solid lightgray;">';
      
        for(var i=0;i<arr.length;i++){
          dtl+=
          '<div onclick="sel_rcvd('+i+')" style="width:100%;height:25px;padding:0px;cursor:pointer;">'+
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
      '<input type="button" onclick="save_rcvd()" style="float:left;width:100px;height:100%;" value="Save Entry" />'+      
      '<input type="button" onclick="new_rcvd()" style="float:left;margin-left:50px;width:100px;height:100%;" value="New Entry" />'+      
    '</div>';   
  JBE_OPENBOX2('dvReceiver','Receivers Master List',dtl,dtl2); 
  dvvName.value=document.getElementById('rcvd_name').innerHTML;
  dvvPos.value=document.getElementById('rcvd_pos').innerHTML;
  dvvTel.value=document.getElementById('rcvd_tel').innerHTML;
}
function chg_tel(n){
  let nn=formatPhoneNumber(n);
  dvvTel.value=nn;
}

function sel_rcvd(v){
  dvvName.value=document.getElementById('dt_name_'+v).innerHTML;
  dvvPos.value=document.getElementById('dt_pos_'+v).innerHTML;
  dvvTel.value=document.getElementById('dt_tel_'+v).innerHTML;
}
function new_rcvd(){
  dvvName.value='';
  dvvPos.value='';
  dvvTel.value='';
  dvvName.focus();
}
function save_rcvd(){
  //alert('dvvName.value:'+dvvName.value);
  document.getElementById('rcvd_name').innerHTML=dvvName.value;
  document.getElementById('rcvd_pos').innerHTML=dvvPos.value;
  document.getElementById('rcvd_tel').innerHTML=dvvTel.value;

  for(var i=1;i<=2;i++){
    document.getElementById('fs_name'+i).innerHTML=dvvName.value;
    document.getElementById('fs_pos'+i).innerHTML=dvvPos.value;
    document.getElementById('fs_tel'+i).innerHTML=dvvTel.value;
  }
  JBE_CLOSEBOX();
  let trano=document.getElementById('trano').value;
  let r_name=document.getElementById('rcvd_name').innerHTML;
  let r_pos=document.getElementById('rcvd_pos').innerHTML;
  let r_tel=document.getElementById('rcvd_tel').innerHTML;
  axios.put('/api/upd_ptr_rcvd', {headers: { 'Content-Type': 'application/json' }}, { params: { trano:trano,name:r_name,pos:r_pos,tel:r_tel } })
  .then(function (response) {
    snackBar(response.data);
  })
  .catch(function (error) { console.log(error); });
}

function do_prn_ptr(ptrType,jFunc,f_data){
  console.log('jFunc:'+jFunc);
  var aryLabel=['Sinovac','Pfizer Purple 12 yrs above','Pfizer Orange 5-11 yrs old','BIVALENT',''];
  if(!f_data){  main_ptr(ptrType);  }
  document.getElementById('l_title').innerHTML='Ready';
  var dtl=
  '<div id="printableArea" data-print="JEFF" style="margin-top:0px;height:100%;width:100%;font-family:Arial Narrow,Arial,sans-serif;font-size:10px;padding:2%;overflow:auto;border:1px solid lightgray;background:white;">'+  
    //'<div style="height:1000px;width:100%;margin:0 auto;margin-top:0%;border:0px solid black;">';
    '<div id="pa_dtl" style="font-family:Times New Roman, Times, serif;font-size:16px;">';
                  
      var page_ptr_covac='<div style="width:100%;height:auto;margin-top:12px;border:1px dashed red;"></div>';
      if(ptrType==0){
        //main_dtl+='</div></div>';
        dtl+=ris_maker(f_data,ptrType,1)+page_ptr_covac+ris_maker(f_data,ptrType,2);
        dtl+='</div>';
      }else if(ptrType==3){
        dtl+=ris_maker(f_data,ptrType,1);
        dtl+='</div>';
      }else{
        page_ptr_covac=
        '<div style="width:100%;height:30px;margin-top:40px;text-align:left;font-size:20px;font-weight:bold;background:none;"><p>UTILIZATION SLIP</p></div>'+

        '<div style="width:100%;height:320px;font-size:12px;border:0px solid brown;">'+        

          '<div style="float:left;width:45%;height:100%;border:0px solid black;">'+        

            '<div style="width:100%;height:20px;padding:0px;background:none;text-align:center;border:1px solid black;border-bottom:none;"><b>IN VIALS</b></div>'+

            '<div style="width:100%;height:50px;text-align:center;border:1px solid black;">'+                        
              '<div class="pBox rightBox" style="width:20%;background:none;"><p>VACCINE BRAND</p></div>'+
              '<div class="pBox rightBox" style="width:20%;"><p>Received</p></div>'+

              '<div class="pBox rightBox" style="display:block;width:39%;height:50px;">'+
                '<div style="float:none;width:100%;height:50%;border-bottom:1px solid black;background:none;"><p>Return</p></div>'+ //1st row                
                '<div style="float:none;width:100%;height:50%;text-align:center;background:none;">'+ //2nd row
                  '<div class="pBox rightBox" style="width:51.5%;height:100%;text-align:center;"><p>Empty</p></div>'+ //2nd row col 1
                  '<div class="pBox" style="width:47%;height:100%;text-align:center;"><p>Unopened</p></div>'+ //2nd row col 2
                '</div>'+
              '</div>'+

              '<div class="pBox" style="width:19%;color:black;">TOTAL</div>'+
            '</div>';

            for(var k=0;k<5;k++){
              page_ptr_covac+=
                '<div style="width:100%;height:50px;margin-top:0px;font-size:11px;text-align:center;border:1px solid black;">'+                          
                  '<div class="pBox rightBox" style="width:20%;"><p>'+aryLabel[k]+'</p></div>'+
                  '<div class="pBox rightBox" style="width:20%;"><p></p></div>'+
                  '<div class="pBox rightBox" style="width:20%;"><p></p></div>'+
                  '<div class="pBox rightBox" style="width:19%;"><p></p></div>'+
                  '<div class="pBox" style="width:19%;"><p></p></div>'+
                '</div>';
            }
            page_ptr_covac+=

            //'</div>'+

          '</div>'+

          '<div style="display:block;float:right;width:54%;height:100%;border:0px solid black;">'+        
            
            '<div style="width:100%;height:20px;color:black;background:none;text-align:center;border:1px solid black;border-bottom:none;"><b>JAB ADMINISTERED</b></div>'+

            '<div style="width:100%;height:50px;text-align:center;border:1px solid black;">'+                        
              '<div class="pBox rightBox" style="width:17%;background:none;"><p>VACCINE BRAND</p></div>'+
              '<div class="pBox rightBox" style="width:13%;"><p>1st Dose</p></div>'+
              '<div class="pBox rightBox" style="width:13%;"><p>2nd Dose</p></div>'+
              '<div class="pBox rightBox" style="width:13%;"><p>1st Booster</p></div>'+
              '<div class="pBox rightBox" style="width:13%;"><p>2nd Booster</p></div>'+
              '<div class="pBox rightBox" style="width:15%;color:black;"><p>3rd Booster</p></div>'+
              '<div class="pBox" style="width:14%;"><p>TOTAL</p></div>'+
            '</div>';
            for(var k=0;k<5;k++){
              page_ptr_covac+=
                '<div style="width:100%;height:50px;margin-top:0px;font-size:11px;text-align:center;border:1px solid black;">'+                          
                  '<div class="pBox rightBox" style="width:17%;"><p>'+aryLabel[k]+'</p></div>'+
                  '<div class="pBox rightBox" style="width:13%;"><p></p></div>'+
                  '<div class="pBox rightBox" style="width:13%;"><p></p></div>'+
                  '<div class="pBox rightBox" style="width:13%;"><p></p></div>'+
                  '<div class="pBox rightBox" style="width:13%;"><p></p></div>'+                  
                  '<div class="pBox rightBox" style="width:15%;"><p></p></div>'+                  
                  '<div class="pBox" style="width:14%;"><p></p></div>'+
                '</div>';
            }
          '</div>'+

        '</div>';
        
        dtl+=ris_maker(f_data,ptrType,1)+page_ptr_covac;
        dtl+='</div>';
      }
     

    '</div>'+     

  '</div>';
  // 0123456789012
  //JBE_OPEN_VIEW2(dtl,'PRINTER','');
  PTR_SHOW_MODULE(true,dtl);
  
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
  
  mnu_prn_ptr(jFunc);  
  
  let vdisp='none';
  if(f_data){
    vdisp='block';    
    disp_prn_dtls(1);
    if(ptrType==0){ disp_prn_dtls(2); }
  }
  document.getElementById('dvReceiverBox').style.display=vdisp;
}
//========================================= End of PRINTING =========================================

function ris_maker(f_data,ptrType,v){
  let ptrTrans=document.getElementById('ptr_head').getAttribute('data-trans');
  //alert(ptrTrans);
  let ptrImg='gfx/imgNIP.jpg';
  if(ptrType==1){ ptrImg='gfx/imgCOVAX.jpg'; }
  //else if(ptrType==3){ ptrImg='gfx/imgRCP.jpg'; }
  else if(ptrType==3){ ptrImg='gfx/imgNIP.jpg'; }

  let max_line=10;
  let max_height=20;
  if(ptrType==3){ max_line=20; max_height=30; }

  var margTop=0; var cancel_top=300;
  if(v==2){ margTop=30; }
  var w_subArea=52.0;
  var w_stroke=0.4;
  if(JBE_MOBILE){ 
    w_subArea=53.8; 
    w_stroke=0.3;
  }
  
  var main_dtl=
  '<div style="position:relative;height:560px;width:100%;text-align:left;margin:0 auto;margin-top:0%;border:0px solid pink;">'+  

    '<div id="prnLogo" style="width:100%;height:60px;margin-top:'+margTop+'px;border:0px solid green;">'+
      '<div style="float:left;width:25%;height:100%;text-align:right;"><img src="gfx/logoCHO.png" style="height:100%;" /></div>'+
      '<div style="float:left;width:50%;height:100%;text-align:center;">'+
        '<div style="font-size:22px;font-weight:bold;padding:9px 0 0 0;">REQUISITION AND ISSUE SLIP</div>'+
        '<div style="font-size:16px;font-weight:bold;padding:0px 0 0 0;">DEPARTMENT OF HEALTH</div>'+
      '</div>'+       
      '<div style="float:left;width:24%;height:100%;text-align:left;"><img src="gfx/logoNGC.png" style="height:100%;" /></div>'+
    '</div>'+       

    '<div class="fs12" style="width:100%;height:20px;margin-top:20px;text-align:left;border:1px solid black;border-bottom:none;">'+
      '<div class="pBox rightBox" style="width:56%;height:100%;"><p>Entity Name:</p></div>'+
      '<div class="pBox" style="width:22%;"><p>Cluster Fund: </p></div>'+
      '<div class="pBox" style="width:21%;"></div>'+
    '</div>'+  
    '<div class="fs12" style="width:100%;height:20px;margin-top:0px;text-align:left;border:1px solid black;border-bottom:none;">'+
      '<div class="pBox rightBox" style="width:56%;overflow:auto;"><p>Office: <b>Bacolod City Health Office - Cold Chain Facility</b></p></div>'+
      '<div class="pBox" style="width:43%;"><p>Responsibility Center Code:</p></div>'+
    '</div>'+  

    '<div class="fs12" style="width:100%;height:15px;margin-top:0px;border:1px solid black;border-bottom:none;">'+
      '<div class="pBox rightBox" style="width:56%;margin-top:0px;"><p>Division / Health Center:</p></div>'+
      '<div class="pBox rightBox" style="width:22%;height:100%;"><img src='+ptrImg+' style="width:100%;height:100%;" /></div>'+  
      '<div class="pBox" style="width:21%;"><p>Date Prepared:</p></div>'+ 
    '</div>'+  
    '<div class="fs12" style="width:100%;height:20px;margin-top:0px;border:1px solid black;border-top:none;">'+
      '<div class="pBox rightBox" style="width:56%;font-weight:bold;"><span id="pSUB_AREA'+v+'" style="margin:0px;height:100%;font-size:16px;color:blue;padding:0 0 3px 5px;"></span></div>'+
      '<div class="pBox rightBox" style="width:22%;font-weight:bold;text-align:center;font-size:14px;color:black;background:none;"><p id="pRISNO'+v+'"></p></div>'+
      '<div class="pBox" style="width:21%;font-weight:bold;text-align:left;overflow:auto;"><p id="pRISDATE'+v+'"></p></div>'+
    '</div>'+ 

    '<div class="fs12" style="width:100%;height:35px;margin-top:0px;border:1px solid black;border-top:none;">'+
      //'<div class="pBox rightBox" style="width:56%;text-align:center;"><p>Requisitions</p></div>'+
      '<div class="pBox rightBox" style="width:56%;text-align:center;">'+
        '<p id="pDETAILS'+v+'" style="height:45%;border:0px solid blue;text-align:left;color:blue;font-style:italic;"></p>'+
        '<p style="height:50%;border:0px solid red;">Requisitions</p>'+
      '</div>'+
      '<div class="pBox rightBox" style="width:8.5%;text-align:center;"><p>Stock Available?</p></div>'+  
      '<div class="pBox " style="width:34.6%;text-align:center;"><p>Issuance</p></div>'+ 
    '</div>'+  

    '<div class="fs11" style="width:100%;height:35px;margin-top:0px;text-align:center;border:1px solid black;">'+        
      '<div class="pBox rightBox" style="width:3.8%;font-size:10px;"><p class="p_title">LOC Code</p></div>'+
      '<div class="pBox rightBox" style="width:17%;"><p class="p_title">Item Description</p></div>'+
      '<div class="pBox rightBox" style="width:7%;"><p class="p_title">Unit</p></div>';

      if(ptrType==3){
        main_dtl+=
        '<div class="pBox rightBox" style="width:19.2%;"><p class="p_title">Model/Serial No.</p></div>';        
      }else{
        main_dtl+=
        '<div class="pBox rightBox" style="width:10.5%;"><p class="p_title">Batch / Lot No.</p></div>'+
        '<div class="pBox rightBox" style="width:8.5%;"><p class="p_title">Expiration Date</p></div>';
      }  
      main_dtl+=
      '<div class="pBox rightBox" style="width:8.5%;"><p class="p_title">Quantity Requested</p></div>'+ 

      '<div class="pBox rightBox" style="width:4.2%;"><p class="p_title">Yes</p></div>'+ 
      '<div class="pBox rightBox" style="width:4.2%;"><p class="p_title">No</p></div>'+
      '<div class="pBox rightBox" style="width:7%;"><p class="p_title">Quantity Issued</p></div>'+

      '<div class="pBox rightBox" style="width:7%;"><p class="p_title">Cost</p></div>'+
      '<div class="pBox rightBox" style="width:9%;"><p class="p_title">Amount</p></div>'+
      '<div class="pBox" style="width:11.5%;"><p class="p_title">Received / Remarks</p></div>'+
    '</div>';
    let vdisp=iif(ptrTrans=='XXX','block','none');
    main_dtl+=
    '<div id="cancel_dtl" data-row=0 style="display:'+vdisp+';position:absolute;top:'+cancel_top+'px;left:0px;width:100%;height:auto;text-align:center;color:red;background:none;">'+        
      '<div style="margin:0 auto;width:80%;font-size:50px;border:1px solid red;">*** CANCELLED ***</div>'+        
    '</div>';

    for(var i=1;i<=max_line;i++){
      main_dtl+=
        '<div class="cls_prn fs11" style="width:100%;height:'+max_height+'px;margin-top:0px;font-size:11px;text-align:center;border:1px solid black;border-top:none;">'+        
          //'<div class="pBox rightBox" style="width:3.8%;"><p id="pNum'+v+i+'" style="display:none;">'+i+'</p></div>'+
          '<div class="pBox rightBox" style="width:3.8%;"><p id="pNum'+v+i+'" style="display:block;font-size:8px;"></p></div>'+
          '<div class="pBox rightBox" style="width:17%;"><p id="pDescrp'+v+i+'"></p></div>'+
          '<div class="pBox rightBox" style="width:7%;"><p id="pUnit'+v+i+'"></p></div>';
          if(ptrType==3){
            main_dtl+=
            '<div class="pBox rightBox" style="width:19.2%;"><p id="pLotNo'+v+i+'"></p></div>';
            '<div class="pBox rightBox" style="display:none;width:8.5%;"><p id="pExpiry'+v+i+'"></p></div>';
          }else{
            main_dtl+=
            '<div class="pBox rightBox" style="width:10.5%;"><p id="pLotNo'+v+i+'"></p></div>'+
            '<div class="pBox rightBox" style="width:8.5%;"><p id="pExpiry'+v+i+'"></p></div>';
          }
          main_dtl+=
          '<div class="pBox rightBox" style="width:8.5%;"><p id="pRQty'+v+i+'"></p></div>'+    
          '<div class="pBox rightBox" style="width:4.2%;"><p id="pYes'+v+i+'"></p></div>'+
          '<div class="pBox rightBox" style="width:4.2%;"><p id="pNo'+v+i+'"></p></div>'+
          '<div class="pBox rightBox" style="width:7%;"><p id="pQty'+v+i+'"></p></div>'+    
          '<div class="pBox rightBox" style="width:7%;"><p id="pCost'+v+i+'"></p></div>'+
          '<div class="pBox rightBox" style="width:9%;"><p id="pAmount'+v+i+'"></p></div>'+
          '<div class="pBox" style="width:9%;"><p id="pRemarks'+v+i+'"></p></div>'+
        '</div>';
    }
    main_dtl+=
    '<div class="fs12" style="position:relative;width:100%;height:80px;margin-top:20px;font-size:12px;border:0px solid black;">';
    let aryHeading=['Requested By:','Approved By:','Issued By:','Received By:'];
    
    for(var i=0;i<4;i++){
      let w_width=24.5;
      let v_disp='none';
      if(i==3){ w_width=26; v_disp='block'; }      
      main_dtl+=
        '<div class="fs11" style="float:left;width:'+w_width+'%;height:100%;font-size:12px;text-align:left;border:0px solid blue;background:none;">'+
          '<div style="height:20%;width:100%;font-size:11px;font-weight:bold;font-style:italic;overflow:auto;">'+aryHeading[i]+'</div>'+
          '<div style="height:20%;width:100%;overflow:auto;">Signature: __________________</div>'+
          '<div style="height:20%;width:100%;overflow:auto;">Name: _____________________</div>'+
          '<div style="height:20%;width:100%;overflow:auto;">Position: ___________________</div>'+          
          '<div style="height:20%;width:100%;overflow:auto;">Date: ______________________</div>'+
          '<div style="display:'+v_disp+';height:20%;width:100%;overflow:auto;">Tel: _______________________</div>'+
        '</div>';
      if(i==1){
        main_dtl+=
          '<div class="fs11" style="position:absolute;width:125px;border:0px solid blue; top:29px;left:29.3%;font-size:11px;font-weight:bold;color:blue;">'+            
            '<div>'+DB_SIG[0].approved+'</div>'+
            '<div style="margin-top:5px;margin-left:10px;">'+DB_SIG[0].approvedJob+'</div>'+
          '</div>';
        main_dtl+=
          '<div class="fs11" style="position:absolute;width:125px;border:0px solid blue; top:29px;left:53.8%;font-size:11px;font-weight:bold;color:blue;">'+            
            '<div>'+DB_SIG[0].issued+'</div>'+
            '<div style="margin-top:5px;margin-left:10px;">'+DB_SIG[0].issuedJob+'</div>'+
          '</div>';
        if(f_data){  
          main_dtl+=
            '<div class="fs11" style="position:absolute;width:170px;border:0px solid blue; top:24px;left:77.0%;font-size:11px;max-width:170px;overflow:auto;font-weight:bold;color:blue;background:none;">'+         
              '<div id="fs_name'+v+'" style="width:160px;height:12px;margin-top:5px;margin-left:10px;max-width:160px;overflow:auto;background:none;">'+document.getElementById("rcvd_name").innerHTML+'</div>'+
              '<div id="fs_pos'+v+'"  style="margin-top:5px;margin-left:22px;">'+document.getElementById("rcvd_pos").innerHTML+'</div>'+
              '<div id="fs_tel'+v+'"  style="margin-top:20px;margin-left:0px;background:none;">'+document.getElementById("rcvd_tel").innerHTML+'</div>'+
            '</div>';
        }
      }
    }
    main_dtl+=
    '</div>'+
  '</div>';
  return main_dtl;
}

function close_print(){
  //alert('closing...');
 //document.getElementById('printableArea').style.display='none';
 //document.getElementById("myView2").style.display='block';    
 //JBE_CLOSE_VIEW2();
 PTR_SHOW_MODULE(false);
 mnu_disp_ptr();
}

function disp_prn_dtls(v){  
  var len_dtls=document.querySelectorAll('.dtls').length;  
  let ptrType=document.getElementById('ptr_head').getAttribute('data-ptrType');
  let time_rel=document.getElementById('time_rel').value;

  var aryClor=[
    { "fg":"black","bg":"#FFD700" },
    { "fg":"white","bg":"green" },
    { "fg":"black","bg":"none" }
  ]; 
  
  //alert(len_dtls+' V is: '+v);
  document.getElementById('pRISNO'+v).innerHTML=document.getElementById('trano').value;
  document.getElementById('pDETAILS'+v).innerHTML=document.getElementById('details').value;
  //document.getElementById('pRISNO'+v).style.color=aryClor[ptrType].fg;  
  //document.getElementById('pRISNO'+v).style.backgroundColor=aryClor[ptrType].bg;
  //var time_rel=new Date(aryDB.date_rel).toLocaleTimeString('it-IT');
  document.getElementById('pRISDATE'+v).innerHTML=JBE_DATE_FORMAT(document.getElementById('ptrdate').value,'DD-MMM-YYYY')+'&nbsp;&nbsp;&nbsp;&nbsp;'+time_AmPm(time_rel);  
  //document.getElementById('pRISDATE'+v).innerHTML=formatDateTime(new Date(document.getElementById('ptrdate').value));
  document.getElementById('pSUB_AREA'+v).innerHTML=document.getElementById('sub_area').innerHTML.toUpperCase();
  for(var i=1;i<=len_dtls;i++){    
    var v_nostock=parseInt(document.getElementById('dtl_nostock_'+i).innerHTML);
    document.getElementById('pNum'+v+i).innerHTML=document.getElementById('dtl_locname_'+i).innerHTML;
    document.getElementById('pDescrp'+v+i).innerHTML=document.getElementById('dtl_vax_'+i).innerHTML;
    document.getElementById('pUnit'+v+i).innerHTML=document.getElementById('dtl_unit_'+i).innerHTML;    
    document.getElementById('pLotNo'+v+i).innerHTML=document.getElementById('dtl_lotno_'+i).innerHTML;
    if(ptrType !=3 ){
      document.getElementById('pExpiry'+v+i).innerHTML=document.getElementById('dtl_expiry_'+i).innerHTML;
    }    
    document.getElementById('pRQty'+v+i).innerHTML=document.getElementById('dtl_rqty_'+i).innerHTML;    
    document.getElementById('pYes'+v+i).innerHTML=iif(v_nostock==1,'','✔');
    document.getElementById('pNo'+v+i).innerHTML=iif(v_nostock==1,'✔','');
    document.getElementById('pQty'+v+i).innerHTML=document.getElementById('dtl_qty_'+i).innerHTML;
    document.getElementById('pCost'+v+i).innerHTML=document.getElementById('dtl_cost_'+i).innerHTML;
    document.getElementById('pAmount'+v+i).innerHTML=document.getElementById('dtl_amount_'+i).innerHTML;    
  }
}

function mnu_prn_ptr(jFunc){  
  jFunc=jFunc+'()';

  var jmenu=  
  '<div style="width:100%;height:100%;">'+
    '<div onclick="printRIS();'+jFunc+'" style="float:left;width:30%;height:100%;">'+    
    //'<div onclick="printRIS()" style="float:left;width:30%;height:100%;">'+    
      '<div class="class_footer">'+
        '<img src="gfx/jprn.png" alt="call image" />'+
        '<span>Print Now</span>'+
      '</div>'+
    '</div>'+ 
    '<div id="dvReceiverBox" onclick="showReceiver(0)" style="float:left;width:40%;height:100%;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jproduct.png" alt="call image" />'+
        '<span>Receiver</span>'+
      '</div>'+
    '</div>'+       
    '<div onclick="'+jFunc+'" style="float:right;width:30%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jclose.png"  alt="home image" />'+
        '<span>Close</span>'+
      '</div>'+
    '</div>'+    
  '</div>';
  dispMenu('div_footer',jmenu);  
}

function printRIS(){
  //JBE_PRINT_PDF('printableArea');
  //return;
  document.querySelectorAll('.pBoxSubArea').forEach(function(el) {
    //el.style.color='violet';        
    el.style.backgroundColor='violet';        
    el.style.width='50%';    
  });
  JBE_PRINTDIV('printableArea','RIS Printing');
}

function prn_rcv(){
  not_yet();
}