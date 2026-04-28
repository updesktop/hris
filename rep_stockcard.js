function rp_stockcard(){
  f_MainPage=false;
  var repTilt='STOCK CARD';
    
  var vdtl=    
  '<div id="div_opt" style="height:100%;width:100%;text-align:left;border:0px solid black;background:none;">'+

    '<div style="height:35px;width:100%;background:none;">'+              
      '<div class="cls_stockcard_vax" style="width:100%;">'+      
        '<span">Vaccine: </span>'+
        '<input type="text" id="fil_vax" style="cursor:pointer;" data-stockno="" name="filter_opt" readonly onclick="sel_vax_stockcard()" '+
          'readonly placeholder="Select Vaccine..." value="" />'+
        '<label for="fil_vax"></label>'+          
      '</div>'+
    '</div>'+
    
    '<div id="div_stockcard" style="border:1px solid black;">'+    
    
      '<div class="cls_stockcard_range">'+ 
        '<span>Date Range:</span>'+ 
        '<input id="dvRange" checked onchange="show_datefrom(this.checked)" type="checkbox" value=true />'+
      '</div>'+ 

      '<div class="cls_stockcard_date">'+ 
        '<span>Date To:</span>'+
        '<input id="date_to" onchange="chg_dateStockcard()" type="date" value="" placeholder="Date To" />'+                 
      '</div>'+

      '<div id="dv_datefrom" class="cls_stockcard_date">'+ 
        '<span>Date From:</span>'+  
        '<input id="date_from" onchange="chg_dateStockcard()" type="date" value="" placeholder="Date From" />'+         
      '</div>'+

    '</div>'+

  '</div>';

  let h_head=70;
  if(JBE_MOBILE){ h_head=70; }
  let dtl=init_report(repTilt,h_head,vdtl);
  JBE_OPEN_VIEW2(dtl,'PRINTER','');
  mnu_repo(repTilt);
  var date=new Date();
  let v_month=date.getMonth()+1;
  var s_date=v_month.toString().padStart(2, '0')+'-01-'+date.getFullYear();
  var dum_date=(v_month+1).toString().padStart(2, '0')+'-01-'+date.getFullYear();
  if(v_month==12){ dum_date='01-01-'+(date.getFullYear()+1); }
  var dum2_date = new Date(dum_date);
  dum2_date.setDate(dum2_date.getDate()-1);  
  s_date=JBE_DATE_FORMAT(s_date,'YYYY-MM-DD');
  s_date=JBE_DATE_FORMAT('2000./01/31','YYYY-MM-DD');
  var e_date=JBE_DATE_FORMAT(dum2_date,'YYYY-MM-DD');

  document.getElementById('date_from').value=s_date;
  document.getElementById('date_to').value=e_date;
  //document.getElementById('dvRange').value=true;  
  show_datefrom(true);
}

function mnu_stockcard(){  
  var jmenu=  
  '<div style="width:100%;height:100%;">'+
    '<div onclick="JBE_PRINTDIV(&quot;printableArea&quot;,&quot;REPORT&quot;)" style="float:left;width:30%;height:100%;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jprn.png" alt="call image" />'+
        '<span>Print Now</span>'+
      '</div>'+
    '</div>'+       
    '<div onclick="refresh_stockcard()" style="float:left;width:34%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jrefresh.png" alt="call image" />'+
        '<span>Refresh</span>'+
      '</div>'+
    '</div>'+       
    '<div onclick="closeREPO();" style="float:right;width:30%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jclose.png"  alt="home image" />'+
        '<span>Close</span>'+
      '</div>'+
    '</div>'+
  '</div>';
  dispMenu(false,jmenu);  
}

//===============================================================================
function refresh_stockcard(){
  refresh_all_db();
  chg_dateStockcard(); 
}
//===============================================================================

function show_datefrom(f){
  let date=new Date();
  let v_month=date.getMonth()+1;
  let s_date='2000/01/31';
  let e_date=document.getElementById('date_to').value;
  let vdisp='none';
  if(f){ vdisp='block'; s_date=v_month.toString().padStart(2, '0')+'-01-'+date.getFullYear(); }
  s_date=JBE_DATE_FORMAT(s_date,'YYYY-MM-DD');
  e_date=JBE_DATE_FORMAT(e_date,'YYYY-MM-DD');
  document.getElementById('dv_datefrom').style.display=vdisp;  
  document.getElementById('date_from').value=s_date;
  //alert(s_date);
  prn_stockcard(s_date,e_date);
}


///
function sel_vax_stockcard(){
  //alert('areano:'+areano);
  var flds=[    
    { title:"", fld:"stockno", type:"text", width:"0%", align:"center" },
    { title:"Stock Description", fld:"descrp", type:"text", width:"50%", align:"center" },
    { title:"Product", fld:"sel_vax_stockcard_prod|prodno", type:"text", width:"50%", align:"center" }
  ];
  //FM_LOOKUP(true,fil_vax.value,DB_STOCK,[],'LOOKUP','do_sel_vax_stockcard','descrp',flds,'stockno');
  var ob=[
    { val:fil_vax.value, fld:"descrp" }
  ];
  FM_LOOKUP2(true,fil_vax.value,ob,DB_STOCK,['descrp'],'LOOKUP','do_sel_vax_stockcard',flds);
}
function sel_vax_stockcard_prod(v){
  return JBE_GETFLD('prodname',DB_PRODUCT,'prodno',v);
}
function do_sel_vax_stockcard(ndx){	
  if(ndx == -1){ 
    document.getElementById('fil_vax').value='';
    return; 
  }
  let val=document.getElementById('dd_stockno'+ndx).innerHTML;
  document.getElementById('fil_vax').setAttribute('data-stockno',val);  
  document.getElementById('fil_vax').value=document.getElementById('dd_descrp'+ndx).innerHTML;
  let d1=JBE_DATE_FORMAT(document.getElementById('date_from').value,'YYYY-MM-DD');
  let d2=JBE_DATE_FORMAT(document.getElementById('date_to').value,'YYYY-MM-DD');  
  prn_stockcard(d1,d2);
}

function chg_dateStockcard(){
  let d1=JBE_DATE_FORMAT(document.getElementById('date_from').value,'YYYY-MM-DD');
  let d2=JBE_DATE_FORMAT(document.getElementById('date_to').value,'YYYY-MM-DD');
  console.log('chg_dateStockcard: '+d1,d2);
  if(!d1 || !d2){ return; }
  if(d1 > d2){ snackBar('ERROR: Invalid Dates'); return; }
  
  prn_stockcard(d1,d2);
}

function new_date(v_date,day){
  var v_new_date = new Date(v_date);
  v_new_date.setDate(v_new_date.getDate()+day);
  v_new_date=JBE_DATE_FORMAT(v_new_date,'YYYY-MM-DD');
  return v_new_date;
}

function orig_prn_stockcard(s_date,e_date){  
  let vdisp='block';
  if(s_date.substring(0,4)=='2000'){ vdisp='none'; }
  var repTilt=document.getElementById('fil_vax').value;

  var s_stockno=document.getElementById('fil_vax').getAttribute('data-stockno');  
  var v_bal=0;
  
  arySTK=get_AllStock(s_stockno,s_date,e_date);
  let theBal=arySTK[0];
  aryDIS=arySTK[1];
  aryDIS.sort(JBE_SORT_ARRAY(['date','drcr','zindex','docno']));

  var dtl=
    reportHead('Stock Card',e_date)+
    '<div style="margin-top:10px;width:100%;height:65px;font-family:Times New Roman, Times, serif;font-size:16px;border:1px solid black;">'+
      '<div style="float:left;width:60%;height:100%;padding:10px 0 0 0;font-size:25px;font-weight:bold;color:black;text-align:center;">'+repTilt+'</div>'+
      '<div style="float:left;width:20%;height:100%;border-left:1px solid black;"><p style="margin:0px;padding:10px;text-align:center;">Stock Keeping Unit (SKU) Code</p></div>'+
      '<div style="float:left;width:19%;height:100%;border-left:1px solid black;"><p style="margin:0px;padding:10px;text-align:center;"></p></div>'+
    '</div>'+

    '<div style="display:'+vdisp+';width:100%;height:30px;margin-top:10px;font-size:14px;text-align:left;border:0px solid black;">'+      
      '<div style="height:100%;width:100%;padding:5px 0 0 0;">Beginning Balance: '+JBE_FORMAT_INT_TO_STR(theBal)+'</div>'+      
    '</div>'+
   
    '<div style="width:100%;height:30px;margin-top:10px;font-size:14px;text-align:center;border:1px solid black;">'+      
      '<div style="float:left;height:100%;width:11%;padding:5px 0 0 0;border:0px solid black;">Date</div>'+
      '<div style="float:left;height:100%;width:8%;padding:5px 0 0 0;border:0px solid black;">Received</div>'+
      '<div style="float:left;height:100%;width:8%;padding:5px 0 0 0;border:0px solid black;">Issued</div>'+
      '<div style="float:left;height:100%;width:8%;padding:5px 0 0 0;border:0px solid black;">Balance</div>'+
      '<div style="float:left;height:100%;width:9%;padding:5px 0 0 0;border:0px solid black;">Batch No.</div>'+
      '<div style="float:left;height:100%;width:8%;padding:5px 0 0 0;border:0px solid black;">Expiry</div>'+
      '<div style="float:left;height:100%;width:8%;padding:5px 0 0 0;border:0px solid black;">Location</div>'+
      '<div style="float:left;height:100%;width:19%;padding:5px 0 0 0;border:0px solid black;">DR/SI/RIS/</div>'+
      '<div style="float:left;height:100%;width:19%;padding:5px 0 0 0;border:0px solid black;">Recipient/Remarks</div>'+
    '</div>';

  
  //alert('aryDIS:'+aryDIS.length);
  let border=0;
  let runbal=0;//v_bal;
  runbal=theBal;
  for(var i=0;i<aryDIS.length;i++){
    var v_date=JBE_DATE_FORMAT(aryDIS[i].date,'YYYY-MM-DD');
    if(v_date < s_date || v_date > e_date) { continue; }

    if(!aryDIS[i].received && !aryDIS[i].issued) { continue; }

    runbal+=(aryDIS[i].received-aryDIS[i].issued);
    let vlotno=aryDIS[i].lotno;//.substring(0,aryDIS[i].lotno.length-1);
    let vexpiry=JBE_DATE_FORMAT(aryDIS[i].expiry,'YYYY-MM-DD'); //aryDIS[i].expiry;//.substring(0,aryDIS[i].lotno.length-1);
    let vloc=aryDIS[i].loc;//.substring(0,aryDIS[i].lotno.length-1);
    let vdocno=aryDIS[i].docno;//.substring(0,aryDIS[i].docno.length-1);
    let vremarks=aryDIS[i].remarks;//.substring(0,aryDIS[i].remarks.length-1);
    dtl+=
    //'<div style="width:100%;height:30px;margin-top:0px;font-size:11px;text-align:center;border:1px solid black;">'+        
    '<div style="width:100%;height:25px;padding:5px 0 0 0;margin-top:0px;font-size:11px;text-align:center;border:1px solid lightgray;background:none;">'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:11%;">'+JBE_DATE_FORMAT(v_date,'DD-MMM-YYYY')+'</div>'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:8%;">'+iif(!aryDIS[i].received,'&nbsp;',JBE_FORMAT_INT_TO_STR(aryDIS[i].received))+'</div>'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:8%;">'+iif(!aryDIS[i].issued,'&nbsp;',JBE_FORMAT_INT_TO_STR(aryDIS[i].issued))+'</div>'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:8%;">'+JBE_FORMAT_INT_TO_STR(runbal)+'</div>'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:9%;">'+vlotno+'</div>'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:8%;">'+vexpiry+'</div>'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:8%;">'+vloc+'</div>'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:19%;">'+vdocno+'</div>'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:19%;">'+vremarks+'</div>'+
    '</div>';
  }

  document.getElementById('pa_dtl').innerHTML=dtl;
  
  /*
  //==================================================================
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
    //el.style.overflowY='hidden';  el.style.overflowX='auto';
    el.style.overflow=iif(JBE_MOBILE,'auto','none'); 
  });
  document.querySelectorAll('.pBox p').forEach(function(el) {
    //el.style.color='black';
    el.style.margin=0;
    //el.style.padding='1px 5px 0px 5px';
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
  //==================================================================
  //document.getElementById('pa_dtl').scrollIntoView();  
  */
}

function get_AllStock(s_stockno,s_date,e_date){
  //=================================================================================================    
  //================BEGIN PREPARE DIS ARRAY
  //=================================================================================================    
  var arrDIS=[];   
 
  //je_msg('watch',0);
  //================ all used
  var v_returned=0;
  var v_dispensed=0;
  var ctr_arrDIS=0;  
  var v_bal=0;
  //=================================================================================================    
  //================RECEIVAL
  //=================================================================================================    
  //je_msg('w',0);
  for(var i = 0; i < DB_RECEIVE2.length; i++){
    var v_stockno=DB_RECEIVE2[i].stockno;
    if(v_stockno != s_stockno){ continue; }
    
    var v_date=JBE_DATE_FORMAT(DB_RECEIVE2[i].date,'YYYY-MM-DD');  
    if(v_date > e_date){ continue; }

    var v_supplier=JBE_GETFLD('name',DB_SUPPLIER,'suppno',DB_RECEIVE2[i].suppno);
    var v_received=DB_RECEIVE2[i].qty;
    
    //===============================================================================================  
    
    if(v_date < s_date){ 
      v_bal+=v_received;
    }else{
      //add to DIS      
      var ob={
        "stockno":v_stockno,
        "date":v_date,  
        "drcr":1, 
        "zindex":1,
        "received":v_received, 
        "issued":0, 
        "balance":0,
        "lotno":DB_RECEIVE2[i].lotno,
        "expiry":DB_RECEIVE2[i].expiry,
        "loc":JBE_GETFLD('name',DB_WHOUSE,'whcode',DB_RECEIVE2[i].loc),
        "docno":DB_RECEIVE2[i].trano,
        "remarks":v_supplier
      };
      arrDIS[ctr_arrDIS]=ob;
      ctr_arrDIS++;
    }

  }      

  //=================================================================================================    
  //================WITHDRAWALS
  //=================================================================================================    
  //je_msg('w',0);
  for(var i = 0; i < DB_PTR2.length; i++){
    //if(chk_cancelPTR(DB_PTR2[i].trano)){ continue; }   
     
    var v_stockno=DB_PTR2[i].stockno;
    if(v_stockno != s_stockno){ continue; }   

    var v_date=JBE_DATE_FORMAT(DB_PTR2[i].date_rel,'YYYY-MM-DD');
    if(v_date > e_date){ continue; }

    if(DB_PTR2[i].trans=='XXX'){ continue; }  

    let v_sub_area=JBE_GETFLD('name',DB_AREA,'areano',DB_PTR2[i].areano);
    let v_details=JBE_GETFLD('details',DB_PTR,'trano',DB_PTR2[i].trano);
      
    if(v_details){ v_sub_area+=' / '+v_details; }

    var v_dispensed=DB_PTR2[i].qty;
    var v_lotno=DB_PTR2[i].lotno;
    
    v_returned=0;
    v_wastage=0;
    
    if(v_date < s_date){ 
      v_bal-=(v_dispensed-v_returned);
    }else{
      //search date            
      var ob={
        "stockno":v_stockno,
        "date":v_date,  
        "drcr":2, 
        "zindex":2,
        "received":0, 
        "issued":v_dispensed, 
        "balance":0,
        "lotno":v_lotno,
        "expiry":DB_PTR2[i].expiry,
        "loc":JBE_GETFLD('name',DB_WHOUSE,'whcode',DB_PTR2[i].loc),
        "docno":DB_PTR2[i].trano,
        "remarks":v_sub_area
      };
      arrDIS[ctr_arrDIS]=ob;
      ctr_arrDIS++;
    }

  }      
  
  //=================================================================================================    
  //================RETURNS
  //=================================================================================================    
  //je_msg('w',0);
  //alert('date1:'+v_date+' less 1:'+new_date(v_date,-1));
  for(var i = 0; i < DB_RETURNS2.length; i++){
    if(DB_RETURNS2[i].rti != 'YES'){ continue; }

    var v_stockno=DB_RETURNS2[i].stockno;
    if(v_stockno != s_stockno){ continue; }

    var v_date=JBE_DATE_FORMAT(DB_RETURNS2[i].ret_date,'YYYY-MM-DD'); 
    var v_lotno=DB_RETURNS2[i].lotno;    
    //if(v_date < s_date || v_date > e_date){ continue; }
    if(v_date > e_date){ continue; }

    var v_sub_area=JBE_GETFLD('name',DB_AREA,'areano',DB_RETURNS2[i].areano);
    var v_returned=DB_RETURNS2[i].qty;
    
    //===============================================================================================  

    if(v_date < s_date){ 
      v_bal+=v_returned;
    }else{
      var ob={
        "stockno":v_stockno,
        "date":v_date,  
        "drcr":1, 
        "zindex":3,
        "received":v_returned, 
        "issued":0, 
        "balance":0,
        "lotno":v_lotno,
        "expiry":DB_RETURNS2[i].expiry,
        "loc":JBE_GETFLD('name',DB_WHOUSE,'whcode',DB_RETURNS2[i].loc),
        "docno":DB_RETURNS2[i].trano,
        "remarks":v_sub_area
      };
      arrDIS[ctr_arrDIS]=ob;
      ctr_arrDIS++;
    }
          
  }     

  //=================================================================================================    
  //================RETURNS II / Single per sub area
  //=================================================================================================    
  //je_msg('w',0);
  //alert('date1:'+v_date+' less 1:'+new_date(v_date,-1));
  for(var i = 0; i < DB_RET2.length; i++){
    if(DB_RET2[i].rti != 'YES'){ continue; }

    var v_stockno=DB_RET2[i].stockno;
    if(v_stockno != s_stockno){ continue; }

    var v_date=JBE_DATE_FORMAT(DB_RET2[i].date,'YYYY-MM-DD'); 
    var v_lotno=DB_RET2[i].lotno;    
    //if(v_date < s_date || v_date > e_date){ continue; }
    if(v_date > e_date){ continue; }

    var v_sub_area=JBE_GETFLD('name',DB_AREA,'areano',DB_RET2[i].areano);
    var v_returned=DB_RET2[i].qty;
    
    //===============================================================================================  

    if(v_date < s_date){ 
      v_bal+=v_returned;
    }else{
      var ob={
        "stockno":v_stockno,
        "date":v_date,  
        "drcr":1, 
        "zindex":3,
        "received":v_returned, 
        "issued":0, 
        "balance":0,
        "lotno":v_lotno,
        "expiry":DB_RET2[i].expiry,
        "loc":JBE_GETFLD('name',DB_WHOUSE,'whcode',DB_RET2[i].loc),
        "docno":DB_RET2[i].trano,
        "remarks":v_sub_area
      };
      arrDIS[ctr_arrDIS]=ob;
      ctr_arrDIS++;
    }
          
  }     
  
  //=================================================================================================    
  //================ADJUSTMENTS
  //=================================================================================================    
  //je_msg('w',0);
  for(var i = 0; i < DB_ADJ2.length; i++){
    var v_stockno=DB_ADJ2[i].stockno;
    if(v_stockno != s_stockno){ continue; }   

    //if(DB_ADJ2[i].trano=='1008'){ alert('yes:'+DB_ADJ2[i].trano); }
    //console.log('s_stockno:'+s_stockno);

    var v_date=JBE_DATE_FORMAT(DB_ADJ2[i].date,'YYYY-MM-DD');
    if(v_date > e_date){ continue; }

    var v_sub_area=JBE_GETFLD('name',DB_AREA,'areano',DB_ADJ2[i].areano);
    let v_debit=DB_ADJ2[i].qty;
    let v_credit=0;
    let v_drcr=1;
    var v_mode=DB_ADJ2[i].drcr;
    
    if(v_mode != 'Debit'){ 
      v_debit=0;
      v_credit=DB_ADJ2[i].qty;
      v_drcr=2;
    }
        
    if(v_date < s_date){ 
      v_bal+=(v_debit-v_credit);
    }else{
      //search date            
      var ob={
        "stockno":v_stockno,
        "date":v_date,  
        "drcr":v_drcr, 
        "zindex":3,
        "received":v_debit, 
        "issued":v_credit, 
        "balance":0,
        "lotno":DB_ADJ2[i].lotno,
        "expiry":DB_ADJ2[i].expiry,
        "loc":JBE_GETFLD('name',DB_WHOUSE,'whcode',DB_ADJ2[i].loc),
        "docno":DB_ADJ2[i].trano,
        "remarks":JBE_GETFLD('details',DB_ADJ,'trano',DB_ADJ2[i].trano)
      };
      arrDIS[ctr_arrDIS]=ob;
      ctr_arrDIS++;
    }

  }
  
  let retArr=[];
  retArr[0]=v_bal;
  retArr[1]=arrDIS;
  return retArr;
}

function xxprn_stockcard(s_date,e_date){  
  let vdisp='block';
  if(s_date.substring(0,4)=='2000'){ vdisp='none'; }
  var repTilt=document.getElementById('fil_vax').value;

  var s_stockno=document.getElementById('fil_vax').getAttribute('data-stockno');  
  var v_bal=0;
  
  arySTK=get_AllStock(s_stockno,s_date,e_date);
  let theBal=arySTK[0];
  aryDIS=arySTK[1];
  aryDIS.sort(JBE_SORT_ARRAY(['date','drcr','zindex','docno']));

  var dtl=
    reportHead('Stock Card',e_date)+
    '<div style="margin-top:10px;width:100%;height:65px;font-family:Times New Roman, Times, serif;font-size:16px;border:1px solid black;">'+
      '<div style="float:left;width:60%;height:100%;padding:10px 0 0 0;font-size:25px;font-weight:bold;color:black;text-align:center;">'+repTilt+'</div>'+
      '<div style="float:left;width:20%;height:100%;border-left:1px solid black;"><p style="margin:0px;padding:10px;text-align:center;">Stock Keeping Unit (SKU) Code</p></div>'+
      '<div style="float:left;width:19%;height:100%;border-left:1px solid black;"><p style="margin:0px;padding:10px;text-align:center;"></p></div>'+
    '</div>'+

    '<div style="display:'+vdisp+';width:100%;height:30px;margin-top:10px;font-size:14px;text-align:left;border:0px solid black;">'+      
      '<div style="height:100%;width:100%;padding:5px 0 0 0;">Beginning Balance: '+JBE_FORMAT_INT_TO_STR(theBal)+'</div>'+      
    '</div>'+
   
    '<div style="width:100%;height:30px;margin-top:10px;font-size:14px;text-align:center;border:1px solid black;">'+      
      '<div style="float:left;height:100%;width:11%;padding:5px 0 0 0;border:0px solid black;">Date</div>'+
      '<div style="float:left;height:100%;width:8%;padding:5px 0 0 0;border:0px solid black;">Received</div>'+
      '<div style="float:left;height:100%;width:8%;padding:5px 0 0 0;border:0px solid black;">Issued</div>'+
      '<div style="float:left;height:100%;width:8%;padding:5px 0 0 0;border:0px solid black;">Balance</div>'+
      '<div style="float:left;height:100%;width:9%;padding:5px 0 0 0;border:0px solid black;">Batch No.</div>'+
      '<div style="float:left;height:100%;width:8%;padding:5px 0 0 0;border:0px solid black;">Expiry</div>'+
      '<div style="float:left;height:100%;width:8%;padding:5px 0 0 0;border:0px solid black;">Location</div>'+
      '<div style="float:left;height:100%;width:19%;padding:5px 0 0 0;border:0px solid black;">DR/SI/RIS/</div>'+
      '<div style="float:left;height:100%;width:19%;padding:5px 0 0 0;border:0px solid black;">Recipient/Remarks</div>'+
    '</div>';

  
  //alert('aryDIS:'+aryDIS.length);
  let border=0;
  let runbal=0;//v_bal;
  runbal=theBal;
  for(var i=0;i<aryDIS.length;i++){
    var v_date=JBE_DATE_FORMAT(aryDIS[i].date,'YYYY-MM-DD');
    if(v_date < s_date || v_date > e_date) { continue; }

    if(!aryDIS[i].received && !aryDIS[i].issued) { continue; }

    runbal+=(aryDIS[i].received-aryDIS[i].issued);
    let vlotno=aryDIS[i].lotno;//.substring(0,aryDIS[i].lotno.length-1);
    let vexpiry=JBE_DATE_FORMAT(aryDIS[i].expiry,'YYYY-MM-DD'); //aryDIS[i].expiry;//.substring(0,aryDIS[i].lotno.length-1);
    let vloc=aryDIS[i].loc;//.substring(0,aryDIS[i].lotno.length-1);
    let vdocno=aryDIS[i].docno;//.substring(0,aryDIS[i].docno.length-1);
    let vremarks=aryDIS[i].remarks;//.substring(0,aryDIS[i].remarks.length-1);
    dtl+=
    //'<div style="width:100%;height:30px;margin-top:0px;font-size:11px;text-align:center;border:1px solid black;">'+        
    '<div style="width:100%;height:25px;padding:5px 0 0 0;margin-top:0px;font-size:11px;text-align:center;border:1px solid lightgray;background:none;">'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:11%;">'+JBE_DATE_FORMAT(v_date,'DD-MMM-YYYY')+'</div>'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:8%;">'+iif(!aryDIS[i].received,'&nbsp;',JBE_FORMAT_INT_TO_STR(aryDIS[i].received))+'</div>'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:8%;">'+iif(!aryDIS[i].issued,'&nbsp;',JBE_FORMAT_INT_TO_STR(aryDIS[i].issued))+'</div>'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:8%;">'+JBE_FORMAT_INT_TO_STR(runbal)+'</div>'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:9%;">'+vlotno+'</div>'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:8%;">'+vexpiry+'</div>'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:8%;">'+vloc+'</div>'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:19%;">'+vdocno+'</div>'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:19%;">'+vremarks+'</div>'+
    '</div>';
  }

  document.getElementById('pa_dtl').innerHTML=dtl;  
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

function prn_stockcard(s_date,e_date){  
  let vdisp='block';
  if(s_date.substring(0,4)=='2000'){ vdisp='none'; }
  var repTilt=document.getElementById('fil_vax').value;

  var s_stockno=document.getElementById('fil_vax').getAttribute('data-stockno');  
  var v_bal=0;
  
  arySTK=get_AllStock(s_stockno,s_date,e_date);
  let theBal=arySTK[0];
  aryDIS=arySTK[1];
  aryDIS.sort(JBE_SORT_ARRAY(['date','drcr','zindex','docno']));

  var dtl=
    reportHead('Stock Card',e_date)+
    '<table>'+
    '<tr style="margin-top:10px;width:100%;height:65px;font-family:Times New Roman, Times, serif;font-size:16px;border:1px solid black;">'+
      '<td style="width:60%;height:100%;padding:10px 0 0 0;font-size:25px;font-weight:bold;color:black;text-align:center;">'+repTilt+'</td>'+
      '<td style="width:20%;height:100%;border-left:1px solid black;"><p style="margin:0px;padding:10px;text-align:center;">Stock Keeping Unit (SKU) Code</p></td>'+
      '<td style="width:20%;height:100%;border-left:1px solid black;"><p style="margin:0px;padding:10px;text-align:center;"></p></td>'+
    '</tr>'+

    '<tr style="display:'+vdisp+';width:100%;height:30px;margin-top:0px;font-size:14px;text-align:left;border:1px solid black;background:green;">'+      
      '<td style="width:100%;background:red;">Beginning Balance: '+JBE_FORMAT_INT_TO_STR(theBal)+'</td>'+      
    '</tr>'+
   
    '<tr style="width:100%;height:30px;margin-top:10px;font-size:14px;text-align:center;border:1px solid red;">'+      
      '<td style="height:100%;width:5%;border:1px solid red;">Date</td>'+
      '<td style="height:100%;width:8%;">Received</td>'+
      '<td style="height:100%;width:8%;">Issued</td>'+
      '<td style="height:100%;width:8%;">Balance</td>'+
      '<td style="height:100%;width:9%;">Batch No.</td>'+
      '<td style="height:100%;width:8%;">Expiry</td>'+
      '<td style="height:100%;width:8%;">Location</td>'+
      '<td style="height:100%;width:19%;">DR/SI/RIS/</td>'+
      '<td width="10%">Recipient/Remarks</td>'+
    '</tr>'+
    '</table>';

  
  //alert('aryDIS:'+aryDIS.length);
  let border=0;
  let runbal=0;//v_bal;
  runbal=theBal;
  for(var i=0;i<aryDIS.length;i++){
    var v_date=JBE_DATE_FORMAT(aryDIS[i].date,'YYYY-MM-DD');
    if(v_date < s_date || v_date > e_date) { continue; }

    if(!aryDIS[i].received && !aryDIS[i].issued) { continue; }

    runbal+=(aryDIS[i].received-aryDIS[i].issued);
    let vlotno=aryDIS[i].lotno;//.substring(0,aryDIS[i].lotno.length-1);
    let vexpiry=JBE_DATE_FORMAT(aryDIS[i].expiry,'YYYY-MM-DD'); //aryDIS[i].expiry;//.substring(0,aryDIS[i].lotno.length-1);
    let vloc=aryDIS[i].loc;//.substring(0,aryDIS[i].lotno.length-1);
    let vdocno=aryDIS[i].docno;//.substring(0,aryDIS[i].docno.length-1);
    let vremarks=aryDIS[i].remarks;//.substring(0,aryDIS[i].remarks.length-1);
    dtl+=
    //'<div style="width:100%;height:30px;margin-top:0px;font-size:11px;text-align:center;border:1px solid black;">'+        
    '<div style="width:100%;height:25px;padding:5px 0 0 0;margin-top:0px;font-size:11px;text-align:center;border:1px solid blue;background:none;">'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:11%;">'+JBE_DATE_FORMAT(v_date,'DD-MMM-YYYY')+'</div>'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:8%;">'+iif(!aryDIS[i].received,'&nbsp;',JBE_FORMAT_INT_TO_STR(aryDIS[i].received))+'</div>'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:8%;">'+iif(!aryDIS[i].issued,'&nbsp;',JBE_FORMAT_INT_TO_STR(aryDIS[i].issued))+'</div>'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:8%;">'+JBE_FORMAT_INT_TO_STR(runbal)+'</div>'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:9%;">'+vlotno+'</div>'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:8%;">'+vexpiry+'</div>'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:8%;">'+vloc+'</div>'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:19%;">'+vdocno+'</div>'+
      '<div style="float:left;border:'+border+'px solid lightgray;height:100%;width:19%;">'+vremarks+'</div>'+
    '</div>';
  }

  document.getElementById('pa_dtl').innerHTML=dtl;  
}