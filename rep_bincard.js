function rp_bincard(stockno,lotno,loc){
  //alert(stockno+' lotno:'+lotno);
  f_MainPage=false;
  var jmode=0;
  var repTilt='BIN CARD';
    
  document.getElementById('back_view2').style.display='none';  
  document.getElementById('cap_viewMid2').innerHTML=repTilt;
  let pa_height=H_VIEW-65;
  let h_head=35;
  if(JBE_MOBILE){ pa_height=H_VIEW-80; h_head=50;}

  var vdtl=    
  '<div id="div_opt" data-mode='+jmode+' data-opt=0 style="height:100%;width:100%;font-family:Arial Narrow,Arial,sans-serif;font-size:12px;padding:0px;border:0px solid lightgray;background:white;">'+
    
    '<div style="height:'+h_head+'px;width:100%;border:1px solid black;">'+              
      '<div class="cls_stockcard_vax" style="float:left;width:33%;text-align:left;border:0px solid black;">'+ 
        '<span>Location: </span>'+
        '<input type="text" id="fil_loc" style="cursor:pointer;" data-loc="" name="filter_opt" readonly onclick="sel_loc_bincard()" '+
          'readonly placeholder="Select Location..." value="" />'+
        '<label for="fil_loc"></label>'+          
      '</div>'+
      '<div class="cls_stockcard_vax" style="float:left;width:33%;text-align:left;border:0px solid black;">'+ 
        '<span>Lot No.: </span>'+
        '<input type="text" id="fil_lotno" style="cursor:pointer;" data-lotno="" name="filter_opt" readonly onclick="sel_lotno_bincard()" '+
          'readonly placeholder="Select Lot No..." value="" />'+
        '<label for="fil_lotno"></label>'+          
      '</div>'+
      '<div class="cls_stockcard_vax" style="float:left;width:34%;text-align:right;border:0px solid black;">'+      
        '<span>Vaccine: </span>'+
        '<input type="text" id="fil_vax" style="cursor:pointer;" data-stockno="" name="filter_opt" onclick="sel_vax_bincard()" '+
          'readonly placeholder="Select Vaccine..." value="" />'+
        '<label for="fil_vax"></label>'+
      '</div>'+
      //'<div id="fil_lotno" class="cls_stockcard_vax" style="display:none;float:left;width:50%;border:1px solid lightgray;background:red;"></div>'+      
    '</div>'+
    
    '<div id="div_stockcard" style="border:1px solid black;background:none;">'+              
    
      '<div class="cls_stockcard_range">'+ 
        '<span>Date Range:</span>'+ 
        '<input id="dvRange" onchange="show_datefrom_bincard(this.checked)" type="checkbox" value=0 />'+
      '</div>'+ 

      '<div class="cls_stockcard_date">'+ 
        '<span>Date To:</span>'+
        '<input id="date_to" onchange="chg_datebincard()" type="date" value="" placeholder="Date To" />'+                 
      '</div>'+

      '<div id="dv_datefrom" class="cls_stockcard_date">'+ 
        '<span>Date From:</span>'+  
        '<input id="date_from" onchange="chg_datebincard()" type="date" value="" placeholder="Date From" />'+         
      '</div>'+

    '</div>'+
        
  '</div>';
  
  //JBE_OPEN_VIEW(dtl,'PRINTER','');
  //mnu_bincard();
  let vhead=70;
  if(JBE_MOBILE){ vhead=90; }
  let dtl=init_report(repTilt,vhead,vdtl);
  JBE_OPEN_VIEW2(dtl,'PRINTER','');
  mnu_repo();
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
  if(!stockno){ show_datefrom_bincard(false); }
}

function mnu_bincard(){  
  var jmenu=  
  '<div style="width:100%;height:100%;">'+
    '<div onclick="JBE_PRINTDIV(&quot;printableArea&quot;,&quot;REPORT&quot;)" style="float:left;width:30%;height:100%;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jprn.png" alt="call image" />'+
        '<span>Print Now</span>'+
      '</div>'+
    '</div>'+       
    '<div onclick="refresh_bincard()" style="float:left;width:34%;height:100%;background:none;">'+
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
function refresh_bincard(){
  refresh_all_db();
  chg_datebincard(); 
}
//===============================================================================

function show_datefrom_bincard(f){
  //alert('show_datefrom_bincard');
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
  prn_bincard(s_date,e_date);
}

///
function sel_lotno_bincard(){
  let stockno=fil_vax.getAttribute('data-stockno');
  //alert('fil_vax.value:'+stockno);
  var flds=[
    { title:"", fld:"stockno", type:"text", width:"50%", align:"center" },
    { title:"", fld:"loc", type:"text", width:"25%", align:"center" },   
    { title:"Lot No.", fld:"lotno", type:"text", width:"25%", align:"center" }, 
    { title:"Stock Description", fld:"descrp", type:"text", width:"50%", align:"center" },
    { title:"Balance", fld:"balance", type:"text", width:"25%", align:"center" }
  ];

  var ob=[
    { val:fil_lotno.getAttribute('data-lotno'), fld:"lotno" },
    { val:fil_vax.getAttribute('data-stockno'), fld:"stockno" }
  ];
  
  let ctr_arr=0;
  let arr=[];
  for(var i=0;i<DB_TRANSFER2.length;i++){
    if(DB_TRANSFER2[i].stockno != stockno){ continue; }
    if(arr.find((r) => r.lotno === DB_TRANSFER2[i].lotno)){ continue; }

    let ob={
      lotno:DB_TRANSFER2[i].lotno,
      stockno:DB_TRANSFER2[i].stockno,
      descrp:DB_TRANSFER2[i].descrp
    };
    arr[ctr_arr]=ob; ctr_arr++;        
  }
    
  FM_LOOKUP2(true,fil_lotno.value,ob,arr,['lotno','descrp'],'LOOKUP','do_sel_lotno_bincard',flds,'by_lotno_balance');
}
function do_sel_lotno_bincard(ndx){	
  if(ndx == -1){ 
    document.getElementById('fil_lotno').value='';
    document.getElementById('fil_lotno').setAttribute('data-lotno','');
    return; 
  }
  let lotno=document.getElementById('dd_lotno'+ndx).innerHTML;
  let stockno=document.getElementById('dd_stockno'+ndx).innerHTML;  
  document.getElementById('fil_lotno').value=lotno;
  document.getElementById('fil_lotno').setAttribute('data-lotno',lotno);

  //document.getElementById('fil_loc').setAttribute('data-loc',loc);
  //document.getElementById('fil_loc').value=JBE_GETFLD('name',DB_WHOUSE,'whcode',loc);
  document.getElementById('fil_loc').setAttribute('data-loc','');
  document.getElementById('fil_loc').value='';

  document.getElementById('fil_vax').setAttribute('data-stockno',stockno);
  document.getElementById('fil_vax').value=document.getElementById('dd_descrp'+ndx).innerHTML;
  
  document.getElementById('div_opt').setAttribute('data-opt',0);
  let d1=JBE_DATE_FORMAT(document.getElementById('date_from').value,'YYYY-MM-DD');
  let d2=JBE_DATE_FORMAT(document.getElementById('date_to').value,'YYYY-MM-DD');
  //prn_bincard(d1,d2); //jbe
  show_datefrom_bincard(false);
}

function by_lotno_balance(){
  var len_look=document.querySelectorAll('.cls_names').length; 
  for(var i=0;i<len_look;i++){
    let v_stockno=document.getElementById('dd_stockno'+i).innerHTML;
    let v_lotno=document.getElementById('dd_lotno'+i).innerHTML;
    let v_loc=document.getElementById('dd_loc'+i).innerHTML;
    document.getElementById('dd_balance'+i).innerHTML=get_bin_lotno_balance(v_stockno,v_lotno);
  }
}

///
function sel_loc_bincard(){
  let stockno=fil_vax.getAttribute('data-stockno');
  var flds=[ 
    { title:"", fld:"stockno", type:"text", width:"50%", align:"center" },
    { title:"", fld:"loc", type:"text", width:"25%", align:"center" },    
    { title:"Location", fld:"get_locname_bincard|loc", type:"text", width:"20%", align:"center" },
    { title:"Stock Description", fld:"descrp", type:"text", width:"30%", align:"center" },
    { title:"Lot No.", fld:"lotno", type:"text", width:"30%", align:"center" },
    { title:"Balance", fld:"balance", type:"number", width:"20%", align:"center" }
  ];

  var ob=[
    { val:fil_loc.getAttribute('data-loc'), fld:"loc" },
    //{ val:fil_loc.value, fld:"loc" },
    { val:fil_vax.getAttribute('data-stockno'), fld:"stockno" },
    { val:fil_lotno.value, fld:"lotno" }
  ];
  
  let arr = DB_TRANSFER2.filter(function(DB_TRANSFER2) {    
    return DB_TRANSFER2.stockno == stockno;
  });    
  FM_LOOKUP2(true,fil_loc.value,ob,arr,['loc','descrp'],'LOOKUP','do_sel_loc_bincard',flds);
}

function do_sel_loc_bincard(ndx){	
  if(ndx == -1){ 
    document.getElementById('fil_loc').value='';
    document.getElementById('fil_loc').setAttribute('data-loc','');
    return; 
  }
  let loc=document.getElementById('dd_loc'+ndx).innerHTML;
  let stockno=document.getElementById('dd_stockno'+ndx).innerHTML; 
  document.getElementById('fil_loc').setAttribute('data-loc',loc);
  document.getElementById('fil_loc').value=JBE_GETFLD('name',DB_WHOUSE,'whcode',loc);
  document.getElementById('fil_vax').setAttribute('data-stockno',stockno);
  document.getElementById('fil_vax').value=document.getElementById('dd_descrp'+ndx).innerHTML;
  document.getElementById('fil_lotno').value=document.getElementById('dd_lotno'+ndx).innerHTML;
  document.getElementById('div_opt').setAttribute('data-opt',0);
  show_datefrom_bincard(false);
}

///
function sel_vax_bincard(){  
  var flds=[    
    { title:"", fld:"stockno", type:"text", width:"50%", align:"center" },
    { title:"", fld:"lotno", type:"text", width:"25%", align:"center" },
    { title:"Stock Description", fld:"descrp", type:"text", width:"50%", align:"center" },
    { title:"Balance", fld:"get_bin_balance|stockno", type:"text", width:"50%", align:"center" }
  ];
  
  var ob=[
    { val:fil_vax.getAttribute('data-stockno'), fld:"stockno" }
  ];
  
  let arr=[]; let ctr_arr=0;
  for(var i = 0; i < DB_TRANSFER2.length; i++){
    arr[ctr_arr]=DB_TRANSFER2[i]; ctr_arr++;    
  }  
  FM_LOOKUP2(true,fil_vax.value,ob,DB_STOCK,['descrp','loc'],'LOOKUP','do_sel_vax_bincard',flds);
}

function do_sel_vax_bincard(ndx){	
  if(ndx == -1){ 
    document.getElementById('fil_vax').value='';
    return; 
  }
  let val=document.getElementById('dd_stockno'+ndx).innerHTML;
  document.getElementById('fil_vax').setAttribute('data-stockno',val);
  document.getElementById('fil_vax').value=document.getElementById('dd_descrp'+ndx).innerHTML;  
  document.getElementById('div_opt').setAttribute('data-opt',1);
  document.getElementById('fil_loc').setAttribute('data-loc','');
  document.getElementById('fil_loc').value='';
  document.getElementById('fil_lotno').setAttribute('data-lotno','');
  document.getElementById('fil_lotno').value='';
  let d1=JBE_DATE_FORMAT(document.getElementById('date_from').value,'YYYY-MM-DD');
  let d2=JBE_DATE_FORMAT(document.getElementById('date_to').value,'YYYY-MM-DD');
  //prn_bincard(d1,d2);
  show_datefrom_bincard(false);
}

function get_bin_balance(stockno){
  bal=0;
  for(var i=0;i<DB_TRANSFER2.length;i++){   
    if(DB_TRANSFER2[i].stockno != stockno){ continue; }
    bal+=DB_TRANSFER2[i].balance;
  }
  return JBE_FORMAT_INT_TO_STR(bal);
}
function get_bin_lotno_balance(stockno,lotno){
  //console.log(stockno+'>>> '+stockno);
  //console.log(lotno+'>>> '+lotno);
  bal=0;
  for(var i=0;i<DB_TRANSFER2.length;i++){   
    if(DB_TRANSFER2[i].stockno == stockno && DB_TRANSFER2[i].lotno == lotno){ 
      bal+=DB_TRANSFER2[i].balance;
    }
  }
  return JBE_FORMAT_INT_TO_STR(bal);
}
function get_locname_bincard(v){
  return JBE_GETFLD('name',DB_WHOUSE,'whcode',v);
} 
function get_prodname_bincard(v){
  return JBE_GETFLD('prodname',DB_PRODUCT,'prodno',v);
}

function chg_datebincard(){
  //alert('chg_datebincard');
  let d1=JBE_DATE_FORMAT(document.getElementById('date_from').value,'YYYY-MM-DD');
  let d2=JBE_DATE_FORMAT(document.getElementById('date_to').value,'YYYY-MM-DD');
  if(!d1 || !d2){ return; }
  if(d1 > d2){ snackBar('ERROR: Invalid Dates'); return; }
  let opt=document.getElementById('div_opt').getAttribute('data-opt');
  let s_stockno=document.getElementById('fil_vax').getAttribute('data-stockno');
  let s_lotno=document.getElementById('fil_lotno').value;  
  //prn_bincard(d1,d2);
  show_datefrom_bincard(false);
}

function prn_bincard(s_date,e_date){    
  //snackBar('prn_bincard(s_date,e_date):'+s_date+'\n'+e_date);
  var repTilt=document.getElementById('fil_vax').value;
  var repTilt2=document.getElementById('fil_loc').value;

  var dtl=
    reportHead('BIN Card',e_date)+
    '<div style="margin-top:10px;width:100%;height:65px;font-family:Times New Roman, Times, serif;font-size:16px;border:1px solid black;">'+
      '<div style="float:left;width:60%;height:100%;padding:10px 0 0 0;font-size:25px;font-weight:bold;color:black;text-align:center;">'+repTilt+'</div>'+
      '<div style="float:left;width:20%;height:100%;border-left:1px solid black;"><p style="margin:0px;padding:10px;text-align:center;">Stock Keeping Unit (SKU) Code</p></div>'+
      '<div style="float:left;width:19%;height:100%;border-left:1px solid black;"><p style="margin:0px;padding:15px 0 0 0;font-size:25px;font-weight:bold;color:blue;text-align:center;">'+repTilt2+'</p></div>'+
    '</div>'+
   
    '<div style="width:100%;height:30px;margin-top:10px;font-size:14px;text-align:center;border:1px solid black;">'+      
      '<div style="float:left;height:100%;width:11%;padding:5px 0 0 0;">Date</div>'+
      '<div style="float:left;height:100%;width:8%;padding:5px 0 0 0;">Received</div>'+
      '<div style="float:left;height:100%;width:8%;padding:5px 0 0 0;">Issued</div>'+
      '<div style="float:left;height:100%;width:8%;padding:5px 0 0 0;">Balance</div>'+
      '<div style="float:left;height:100%;width:9%;padding:5px 0 0 0;">Batch No.</div>'+
      '<div style="float:left;height:100%;width:8%;padding:5px 0 0 0;">Expiry</div>'+
      '<div style="float:left;height:100%;width:8%;padding:5px 0 0 0;">Loc.</div>'+
      '<div style="float:left;height:100%;width:19%;padding:5px 0 0 0;">DR/SI/RIS/</div>'+
      '<div style="float:left;height:100%;width:19%;padding:5px 0 0 0;">Recipient/Remarks</div>'+
    '</div>';

  var s_stockno=document.getElementById('fil_vax').getAttribute('data-stockno');
  var s_loc=document.getElementById('fil_loc').getAttribute('data-loc');    
  var s_lotno=document.getElementById('fil_lotno').value;  
  
  //
  var aryDIS=get_AllBinCard(s_stockno,s_loc,s_lotno,s_date,e_date);  
  console.log('aryDIS.length : '+aryDIS.length);
  if(aryDIS < 0){ 
    //alert('aryDIS: '+aryDIS);
    if(aryDIS == -2){ MSG_SHOW(vbOk,"ERROR: ","Transfer Date Is Empty...,<br>Add Now at Freezer Facility.",function(){},function(){}); }
    document.getElementById('pa_dtl').innerHTML=dtl;
    return; 
  }
  
  var sv_lotno='';
  if(aryDIS.length>0){ sv_lotno=aryDIS[0].lotno; }  
  let runbal=0;//v_bal;
  let lctr=0;
  for(var i=0;i<aryDIS.length;i++){
    var v_date=JBE_DATE_FORMAT(aryDIS[i].date,'YYYY-MM-DD');
    if(v_date < s_date || v_date > e_date) { continue; }
    
    let vlotno=aryDIS[i].lotno;
    let vexpiry=JBE_DATE_FORMAT(aryDIS[i].expiry,'MM-DD-YYYY');
    let vloc=aryDIS[i].loc;
    let vdocno=aryDIS[i].docno;
    let vremarks=aryDIS[i].remarks;

    if(s_lotno && vlotno != s_lotno){ continue; }
    if(s_loc && vloc != s_loc){ continue; }
    
    lctr++;
    runbal+=(aryDIS[i].received-aryDIS[i].issued);
    dtl+=
    '<div style="width:100%;height:25px;padding:5px 0 0 0;margin-top:0px;font-size:11px;text-align:center;border:1px solid lightgray;background:none;">'+
      '<div style="float:left;height:100%;width:11%;">'+JBE_DATE_FORMAT(v_date,'DD-MMM-YYYY')+'</div>'+
      '<div style="float:left;height:100%;width:8%;">'+iif(!aryDIS[i].received,'&nbsp;',JBE_FORMAT_INT_TO_STR(aryDIS[i].received))+'</div>'+
      '<div style="float:left;height:100%;width:8%;">'+iif(!aryDIS[i].issued,'&nbsp;',JBE_FORMAT_INT_TO_STR(aryDIS[i].issued))+'</div>'+
      '<div id="dvBal'+lctr+'" style="float:left;height:100%;width:8%;">'+JBE_FORMAT_INT_TO_STR(runbal)+'</div>'+
      '<div style="float:left;height:100%;width:9%;">'+vlotno+'</div>'+
      '<div style="float:left;height:100%;width:8%;">'+vexpiry+'</div>'+
      '<div style="float:left;height:100%;width:8%;">'+get_locname_bincard(aryDIS[i].loc)+'</div>'+
      '<div style="float:left;height:100%;width:19%;">'+vdocno+'</div>'+
      '<div style="float:left;height:100%;width:19%;">'+vremarks+'</div>'+
    '</div>';
  }
  
  document.getElementById('pa_dtl').innerHTML=dtl;
  if(lctr>0){ document.getElementById('dvBal'+lctr).style.fontWeight='bold'; }
}

function get_AllBinCard(s_stockno,s_loc,s_lotno,s_date,e_date){
  //alert('sdate:'+s_date+' vs edate:'+e_date);
  //=================================================================================================    
  //================BEGIN PREPARE DIS ARRAY
  //=================================================================================================    
  var arrDIS=[];   
  if(!s_stockno){ return -1; } // -1 = no stock, -2 no date_tf
  
  //je_msg('watch',0);
  //================ all used
  var v_returned=0;
  var v_dispensed=0;
  var ctr_arrDIS=0;  
  var v_bal=0;
  let V_DATE_TF='';
  let ctr=0;
  //=================================================================================================    
  //================RECEIVAL/TRANSFER
  //=================================================================================================    
  DB_TRANSFER2.sort(JBE_SORT_ARRAY(['stockno','date_tf']));
  for(var i = 0; i < DB_TRANSFER2.length; i++){
    let v_stockno=DB_TRANSFER2[i].stockno;
    if(v_stockno != s_stockno){ continue; }

    let v_date=JBE_DATE_FORMAT(DB_TRANSFER2[i].date_tf,'YYYY-MM-DD');          
    if(!v_date){ return -1; }

    //console.log(v_stockno+' ::: v_date:'+v_date);

    let v_loc=DB_TRANSFER2[i].loc;
    let v_lotno=DB_TRANSFER2[i].lotno;
    if(s_lotno && v_lotno != s_lotno){ continue; }
    if(s_loc && v_loc != s_loc){ continue; }

    if(!V_DATE_TF){ V_DATE_TF=v_date; } //alert(v_date+':::ORIG vdate_tf:'+V_DATE_TF+' loc:'+get_locname_bincard(v_loc)+' :::v_stockno:'+v_stockno); }
    //if(!(v_stockno==s_stockno && v_loc==s_loc && v_lotno==s_lotno)){ continue; }

    /*
    ctr++;
    if(!V_DATE_TF){ 
      V_DATE_TF=JBE_DATE_FORMAT(DB_TRANSFER2[i].date_tf,'YYYY-MM-DD');
      console.log('s_date:'+s_date);
      console.log('ctr:'+ctr+' --- vdatetf:'+V_DATE_TF+' v_stockno:'+DB_TRANSFER2[i].refno); 
    }
    */

    if(V_DATE_TF > e_date){ continue; }
    
    console.log('::: date_tf:'+V_DATE_TF);

    let v_supplier=JBE_GETFLD('supplier',DB_RECEIVE,'trano',DB_TRANSFER2[i].refno);
    let v_received=DB_TRANSFER2[i].qty;
    //===============================================================================================      
    if(V_DATE_TF < s_date){ 
      v_bal+=v_received;
    }else{
      //add to DIS      
      let ob={
        "level":1,
        "stockno":v_stockno,
        "docno":DB_TRANSFER2[i].trano+'/'+DB_TRANSFER2[i].refno,
        "common":DB_TRANSFER2[i].trano,
        "date":V_DATE_TF,  
        "drcr":1, 
        "zindex":1,
        "received":v_received, 
        "issued":0, 
        "balance":0,
        "lotno":DB_TRANSFER2[i].lotno,
        "expiry":DB_TRANSFER2[i].expiry,
        "loc":v_loc,
        "remarks":v_supplier
      };
      arrDIS[ctr_arrDIS]=ob;
      ctr_arrDIS++;
    }
    if(s_loc){ break; }
  }      
  
  //alert(v_stockno+'::: V_DATE_TF:'+V_DATE_TF);
  if(!V_DATE_TF){
    arrDIS=[]; 
    return -2;
  }
  
  //=================================================================================================    
  //================WITHDRAWALS
  //=================================================================================================    
  //je_msg('w',0);
  for(var i = 0; i < DB_PTR2.length; i++){
    let v_stockno=DB_PTR2[i].stockno;    
    let v_loc=DB_PTR2[i].loc;
    let v_lotno=DB_PTR2[i].lotno;
    //if(!(v_stockno==s_stockno && v_loc==s_loc && v_lotno==s_lotno)){ continue; }
    

    let v_date=JBE_DATE_FORMAT(DB_PTR2[i].date_rel,'YYYY-MM-DD');
    let v_sub_area=JBE_GETFLD('name',DB_AREA,'areano',DB_PTR2[i].areano);
    let v_details=JBE_GETFLD('details',DB_PTR,'trano',DB_PTR2[i].trano);      
    if(v_details){ v_sub_area+=' / '+v_details; }
    
    let v_dispensed=DB_PTR2[i].qty;
    if(v_stockno != s_stockno){ continue; }
    
    if(v_date < V_DATE_TF || v_date > e_date){ continue; }

    if(DB_PTR2[i].trans=='XXX'){ continue; }  
    if(s_lotno && v_lotno != s_lotno){ continue; }
    //if(s_loc && v_loc != s_loc){ continue; }
    
    v_returned=0;
    v_wastage=0;
    
    if(v_date < s_date){ 
      v_bal-=(v_dispensed-v_returned);
    }else{
      //search date            
      var ob={
        "level":2,
        "stockno":v_stockno,
        "docno":DB_PTR2[i].trano,
        "common":DB_PTR2[i].refno,
        "date":v_date,  
        "drcr":2, 
        "zindex":2,
        "received":0, 
        "issued":v_dispensed, 
        "balance":0,
        "lotno":v_lotno,
        "expiry":DB_PTR2[i].expiry,
        "loc":v_loc,        
        "remarks":v_sub_area
      };
      arrDIS[ctr_arrDIS]=ob;
      ctr_arrDIS++;
    }
  }      
    
  //=================================================================================================    
  //================RETURNS
  //=================================================================================================    
  for(var i = 0; i < DB_RETURNS2.length; i++){
    if(DB_RETURNS2[i].rti != 'YES'){ continue; }

    var v_stockno=DB_RETURNS2[i].stockno;
    var v_loc=DB_RETURNS2[i].loc;
    let v_lotno=DB_RETURNS2[i].lotno;
    //if(!(v_stockno==s_stockno && v_loc==s_loc && v_lotno==s_lotno)){ continue; }
    if(v_stockno != s_stockno){ continue; }

    var v_date=JBE_DATE_FORMAT(DB_RETURNS2[i].ret_date,'YYYY-MM-DD'); 
    //var v_lotno=DB_RETURNS2[i].lotno;    
    //if(v_date < s_date || v_date > e_date){ continue; }    
    if(v_date < V_DATE_TF || v_date > e_date){ continue; }
    if(s_lotno && v_lotno != s_lotno){ continue; }
    if(s_loc && v_loc != s_loc){ continue; }

    var v_sub_area=JBE_GETFLD('name',DB_AREA,'areano',DB_RETURNS2[i].areano);
    var v_returned=DB_RETURNS2[i].qty;
    
    //===============================================================================================  

    if(v_date < s_date){ 
      v_bal+=v_returned;
    }else{
      var ob={        
        "level":2,
        "stockno":v_stockno,
        "docno":DB_RETURNS2[i].trano,
        "common":DB_RETURNS2[i].refno,
        "date":v_date,  
        "drcr":1, 
        "zindex":3,
        "received":v_returned, 
        "issued":0, 
        "balance":0,
        "lotno":v_lotno,
        "expiry":DB_RETURNS2[i].expiry,
        "loc":v_loc,        
        "remarks":v_sub_area
      };
      arrDIS[ctr_arrDIS]=ob;
      ctr_arrDIS++;
    }          
  }     
  //=================================================================================================
  //RETURNS 2 (RET2)
  //=================================================================================================
  for(var i = 0; i < DB_RET2.length; i++){
    if(DB_RET2[i].rti != 'YES'){ continue; }

    var v_stockno=DB_RET2[i].stockno;
    var v_loc=DB_RET2[i].loc;
    let v_lotno=DB_RET2[i].lotno;
    //if(!(v_stockno==s_stockno && v_loc==s_loc && v_lotno==s_lotno)){ continue; }
    if(v_stockno != s_stockno){ continue; }

    var v_date=JBE_DATE_FORMAT(DB_RET2[i].date,'YYYY-MM-DD'); 
    //var v_lotno=DB_RET2[i].lotno;    
    //if(v_date < s_date || v_date > e_date){ continue; }
    //if(v_date > e_date){ continue; }
    //if(v_date <= V_DATE_TF){ continue; }
    if(v_date < V_DATE_TF || v_date > e_date){ continue; }
    if(s_lotno && v_lotno != s_lotno){ continue; }
    if(s_loc && v_loc != s_loc){ continue; }

    var v_sub_area=JBE_GETFLD('name',DB_AREA,'areano',DB_RET2[i].areano);
    var v_returned=DB_RET2[i].qty;
    
    //===============================================================================================  

    if(v_date < s_date){ 
      v_bal+=v_returned;
    }else{
      var ob={        
        "level":2,
        "stockno":v_stockno,
        "docno":DB_RET2[i].trano,
        "common":DB_RET2[i].refno,
        "date":v_date,  
        "drcr":1, 
        "zindex":3,
        "received":v_returned, 
        "issued":0, 
        "balance":0,
        "lotno":v_lotno,
        "expiry":DB_RET2[i].expiry,
        "loc":v_loc,        
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
    var v_loc=DB_ADJ2[i].loc;
    let v_lotno=DB_ADJ2[i].lotno;
    //if(!(v_stockno==s_stockno && v_loc==s_loc && v_lotno==s_lotno)){ continue; }    
    if(v_stockno != s_stockno){ continue; }

    var v_date=JBE_DATE_FORMAT(DB_ADJ2[i].date,'YYYY-MM-DD');
    //if(v_date > e_date){ continue; }
    //if(v_date <= V_DATE_TF){ continue; }
    if(v_date < V_DATE_TF || v_date > e_date){ continue; }
    if(s_lotno && v_lotno != s_lotno){ continue; }
    if(s_loc && v_loc != s_loc){ continue; }

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
        "level":2,
        "stockno":v_stockno,
        "docno":DB_ADJ2[i].trano,
        "date":v_date,  
        "drcr":v_drcr, 
        "zindex":3,
        "received":v_debit, 
        "issued":v_credit, 
        "balance":0,
        "lotno":DB_ADJ2[i].lotno,
        "expiry":DB_ADJ2[i].expiry,
        "loc":v_loc,        
        "remarks":JBE_GETFLD('details',DB_ADJ,'trano',DB_ADJ2[i].trano)
      };
      arrDIS[ctr_arrDIS]=ob;
      ctr_arrDIS++;
    }

  }
  //alert('arrDIS:'+arrDIS.length);    
  arrDIS.sort(JBE_SORT_ARRAY(['lotno','drcr','date','docno']));
  //console.log(arrDIS);
  return arrDIS;
}
