function rp_daily(){
  f_MainPage=false;
  var jmode=0;
  var repTilt='DAILY INVENTORY';

  let vdtl=  
  '<div id="div_opt" data-mode='+jmode+' data-opt=0 style="height:100%;width:100%;font-family:Arial Narrow,Arial,sans-serif;font-size:12px;padding:0px;border:1px solid black;background:none;">'+

    '<div style="height:100%;width:100%;border:0px solid lightgray;background:none;">'+              
      '<div class="cls_daily" style="float:left;width:180px;height:100%;padding:5px;border:0px solid orange;">'+      
        '<span style="float:left;width:35%;height:100%;padding:3px 0 0 0;font-size:14px;font-weight:bold;background:none;">Product:</span>'+
        '<input type="text" id="fil_vax" data-prodno="" name="filter_opt" readonly onclick="sel_prod_daily(this.id)" '+
          'style="float:left;width:55%;height:100%;cursor:pointer;text-align:center;cursor:pointer;" readonly placeholder="Select Product..." value="" />'+
        '<label for="fil_vax"></label>'+
      '</div>'+
      '<div class="cls_daily" style="float:right;width:155px;height:100%;padding:5px;border:0px solid green;">'+  
        '<span style="float:left;width:25%;height:100%;padding:3px 0 0 0;font-size:14px;font-weight:bold;background:none;">Date:</span>'+  
        '<input id="date_to" style="width:75%;height:100%;" onchange="chg_date_daily()" type="date" value=""  placeholder="Date" />'+        
      '</div>'+
    '</div>'+    

  '</div>';
  
  let dtl=init_report(repTilt,35,vdtl);
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
  s_date=JBE_DATE_FORMAT('2000/01/31','YYYY-MM-DD');
  //var e_date=JBE_DATE_FORMAT(dum2_date,'YYYY-MM-DD');
  var e_date=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');

  document.getElementById('date_to').value=e_date;
  show_datefrom_daily(true);
}

function show_datefrom_daily(f){
  let date=new Date();
  let v_month=date.getMonth()+1;
  let s_date='2000/01/31';
  let e_date=document.getElementById('date_to').value;
  let vdisp='none';
  if(f){ vdisp='block'; s_date=v_month.toString().padStart(2, '0')+'-01-'+date.getFullYear(); }
  s_date=JBE_DATE_FORMAT(s_date,'YYYY-MM-DD');
  e_date=JBE_DATE_FORMAT(e_date,'YYYY-MM-DD');
  //document.getElementById('dv_datefrom').style.display=vdisp;  
  //alert(s_date);
  //prn_daily(e_date);
  let val='ALL';
  document.getElementById('fil_vax').setAttribute('data-prodno',val);
  //let d2=JBE_DATE_FORMAT(document.getElementById('date_to').value,'YYYY-MM-DD');  
  document.getElementById('fil_vax').value=val;
  prn_daily(e_date);
}

//////
function sel_prod_daily(){
  var newArr = DB_PRODUCT.filter(function(DB_PRODUCT) {
    //return DB_PRODUCT.type == ptrType;
    return DB_PRODUCT;
  });
  let bb={
    "prodno":"ALL",
    "prodname":"ALL",
    "type":""
  };
  newArr[newArr.length]=bb;
  var flds=[    
    { title:"Product Description", fld:"prodname", type:"text", width:"50%", align:"center" },
    { title:"Product", fld:"prodno", type:"text", width:"50%", align:"center" }
  ];
  //FM_LOOKUP(true,fil_vax.value,newArr,[],'LOOKUP3','do_lu_prod_daily','prodname',flds,'prodno');
  var ob=[
    { val:fil_vax.value, fld:"stockno" }
  ];
  FM_LOOKUP2(true,fil_vax.value,ob,newArr,['*descrp'],'LOOKUP','do_lu_prod_daily',flds);
}
function do_lu_prod_daily(ndx){	
  if(ndx == -1){ 
    document.getElementById('fil_vax').value='';
    return; 
  }
  let val=document.getElementById('dd_prodno'+ndx).innerHTML;
  document.getElementById('fil_vax').setAttribute('data-prodno',val);
  let d2=JBE_DATE_FORMAT(document.getElementById('date_to').value,'YYYY-MM-DD');  
  document.getElementById('fil_vax').value=document.getElementById('dd_prodname'+ndx).innerHTML;
  prn_daily(d2);
}

function chg_date_daily(){
  let d2=JBE_DATE_FORMAT(document.getElementById('date_to').value,'YYYY-MM-DD');
  if(!d2){ return; }  
  prn_daily(d2);
}

function prn_daily(e_date){  
  var dtl='';
  var s_prodno=document.getElementById('fil_vax').getAttribute('data-prodno');
  var v_prodno=s_prodno;   

  for(var i=0;i<DB_PRODUCT.length;i++){
    if(s_prodno!='ALL' && DB_PRODUCT[i].prodno != v_prodno){ 
      continue; 
    }else{
      v_prodno=DB_PRODUCT[i].prodno;
    }
    //alert(i+' prodname:'+DB_PRODUCT[i].prodname);

    dtl+='<div style="width:100%;height:auto;margin-top:20px;padding:2px;text-align:left;color:black;font-weight:bold;">'+'*** ('+DB_PRODUCT[i].prodno+') '+DB_PRODUCT[i].prodname+'</div>';
    //console.log(DB_PRODUCT[i].prodname);
    
    for(var k=0;k<DB_STOCK.length;k++){
      if(DB_STOCK[k].prodno != v_prodno){ continue; }

      let stockno=DB_STOCK[k].stockno;   
      let stockBal=getStockBal(stockno,'',e_date);
      
      let bal=stockBal[0];
      let debit=stockBal[1];
      let credit=stockBal[2];

      let aryTrans=get_prn_freezer(stockno,e_date);
      let locs=aryTrans[0];
      let bal2=aryTrans[1];
      let varz=bal-bal2;
      let clr='black';
      let vdisp='block';
      if(varz < 0){ clr='red'; }else if(varz > 0){ clr='blue'; }else{ vdisp='none'; }
      
      dtl+=
      '<div style="width:100%;height:25px;padding:5px 0 0 0;margin-top:0px;font-size:11px;text-align:center;border:1px solid lightgray;background:none;">'+              
        '<div style="float:left;width:25%;height:100%;overflow:auto;">'+DB_STOCK[k].descrp+'</div>'+
        '<div style="float:left;width:13%;height:100%;">'+JBE_FORMAT_INT_TO_STR(debit)+'</div>'+
        '<div style="float:left;width:13%;height:100%;">'+JBE_FORMAT_INT_TO_STR(credit)+'</div>'+
        '<div style="float:left;width:13%;height:100%;font-weight:bold;">'+iif(!bal,'0',JBE_FORMAT_INT_TO_STR(bal))+'</div>'+
        //'<div style="float:left;width:13%;height:100%;overflow:hidden;color:navy;background:none;">'+locs+'</div>'+
        //'<div style="float:left;width:13%;height:100%;overflow-x:hidden;overflow-y:scroll;color:navy;background:none;">'+locs+'</div>'+
        '<div style="float:left;width:13%;height:auto;margin:0;overflow-y:hidden;overflow-x:auto;color:navy;background:none;">'+locs+'</div>'+
        //'<div style="float:left;width:13%;height:auto;font-size:8px;overflow:auto;color:navy;background:none;">'+locs+'</div>'+
        '<div style="float:left;width:13%;height:100%;font-weight:bold;color:navy;">'+iif(!bal2,'0',JBE_FORMAT_INT_TO_STR(bal2))+'</div>'+
        '<div style="display:'+vdisp+';float:left;width:9%;height:100%;font-weight:bold;color:'+clr+';">'+JBE_FORMAT_INT_TO_STR(varz)+'</div>'+
      '</div>';    
    }

  }

  document.getElementById('pa_dtl').innerHTML=reportHead('Daily Inventory Report',e_date)+
  '<div style="width:100%;height:30px;margin-top:30px;font-size:14px;font-weight:bold;padding:5px 0 0 0;text-align:center;border:1px solid black;">'+      
    '<div style="float:left;width:25%;height:100%;border:0px solid red;">Description</div>'+
    '<div style="float:left;width:13%;height:100%;border:0px solid red;">Received</div>'+
    '<div style="float:left;width:13%;height:100%;border:0px solid red;">Issued</div>'+
    '<div style="float:left;width:13%;height:100%;border:0px solid red;">Balance</div>'+
    '<div style="float:left;width:13%;height:100%;border:0px solid red;">Location</div>'+
    '<div style="float:left;width:13%;height:100%;border:0px solid red;">Loc-Bal</div>'+
    '<div style="float:left;width:10%;height:100%;border:0px solid red;">(+/-)</div>'+
  '</div>'+dtl;
}

function get_prn_freezer(s_stockno,e_date){
  let ary=[];  
  let bal=0;
  let tmpLocs=[]; let ctr_tmpLocs=0; 

  for(var i = 0; i < DB_TRANSFER2.length; i++){    
    var v_stockno=DB_TRANSFER2[i].stockno;
    if(v_stockno != s_stockno){ continue; }

    var v_date=JBE_DATE_FORMAT(DB_TRANSFER2[i].date_tf,'YYYY-MM-DD');     
    if(v_date > e_date){ continue; }
    
    tmpLocs[ctr_tmpLocs]=DB_TRANSFER2[i].locname;
    ctr_tmpLocs++;    
    bal+=parseInt(DB_TRANSFER2[i].balance);
  }     
  
  // Remove duplicates
  let uniqueArray = [...new Set(tmpLocs)];
  //console.log(s_stockno+' uniqueArray:'+uniqueArray); // Output: [1, 2, 3, 4, 5]
  if(uniqueArray.length==0){ uniqueArray=['-']; }
  
  ary[0]=uniqueArray; ary[1]=bal;
  return ary;
}