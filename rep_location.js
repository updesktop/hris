function rp_location(stockno,lotno,loc){
  //alert(stockno+' lotno:'+lotno);
  f_MainPage=false;
  var jmode=0;
  var repTilt='VACCINES LOCATION';
  let v_prodname=get_prodname_location(DB_PRODUCT[0].prodno);
  //document.getElementById('back_view2').style.display='none';  
  //document.getElementById('cap_viewMid2').innerHTML=repTilt;
  let pa_height=H_VIEW-65;
  let h_head=35;
  if(JBE_MOBILE){ pa_height=H_VIEW-80; h_head=50;}

  var vdtl=    
  '<div id="div_opt" data-mode='+jmode+' data-opt=0 data-type=0 style="height:100%;width:100%;font-family:Arial Narrow,Arial,sans-serif;font-size:12px;padding:0px;border:0px solid lightgray;background:white;">'+
    
    '<div style="height:'+h_head+'px;width:100%;border:1px solid black;">'+                    
      '<div class="cls_daily" style="float:left;width:80%;height:100%;padding:5px;text-align:left;border:0px solid orange;">'+      
        '<span style="float:left;width:auto;height:100%;padding:3px 0 0 0;font-size:14px;font-weight:bold;background:none;">Category: </span>'+
        '<input type="text" id="fil_loc" data-prodno="" name="filter_opt" readonly onclick="sel_Location(this.id)" '+
          'style="float:left;margin-left:10px;width:55%;height:100%;cursor:pointer;cursor:pointer;" readonly placeholder="Select Product..." value="'+v_prodname+'" />'+
        '<label for="fil_loc"></label>'+
      '</div>'+      
    '</div>'+
        
  '</div>';
  
  //JBE_OPEN_VIEW(dtl,'PRINTER','');
  //mnu_location();
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
  
  prn_location();
}

//////
function sel_Location(){  
  var flds=[    
    { title:"Product Description", fld:"prodname", type:"text", width:"50%", align:"center" },
    { title:"Product", fld:"prodno", type:"text", width:"40%", align:"center" },
    { title:"Type", fld:"type", type:"text", width:"10%", align:"center" }
  ];
  //FM_LOOKUP(true,fil_vax.value,newArr,[],'LOOKUP3','do_lu_prod_daily','prodname',flds,'prodno');
  var ob=[
    { val:fil_loc.value, fld:"loc" }
  ];
  FM_LOOKUP2(true,fil_loc.value,ob,DB_PRODUCT,['prodno'],'LOOKUP','do_sel_Location',flds);
}

function do_sel_Location(ndx){
  if(ndx == -1){ 
    document.getElementById('fil_loc').value='';
    return; 
  }
  let val=document.getElementById('dd_type'+ndx).innerHTML;
  let prodname=document.getElementById('dd_prodname'+ndx).innerHTML;
  document.getElementById('div_opt').setAttribute('data-type',val);  
  document.getElementById('fil_loc').value=prodname;
  prn_location();
}

function mnu_location(){  
  var jmenu=  
  '<div style="width:100%;height:100%;">'+
    '<div onclick="JBE_PRINTDIV(&quot;printableArea&quot;,&quot;REPORT&quot;)" style="float:left;width:30%;height:100%;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jprn.png" alt="call image" />'+
        '<span>Print Now</span>'+
      '</div>'+
    '</div>'+       
    '<div onclick="refresh_location()" style="float:left;width:34%;height:100%;background:none;">'+
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
function refresh_location(){
  refresh_all_db();
  chg_datelocation(); 
}
//===============================================================================

///
function sel_vax_location(){  
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
  FM_LOOKUP2(true,fil_vax.value,ob,DB_STOCK,['descrp','loc'],'LOOKUP','do_sel_vax_location',flds);
}

function do_sel_vax_location(ndx){	
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
  prn_location();
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
function get_locname_location(v){
  return JBE_GETFLD('name',DB_WHOUSE,'whcode',v);
} 
function get_prodname_location(v){
  return JBE_GETFLD('prodname',DB_PRODUCT,'prodno',v);
}

function prn_location(){    
  var repTilt=document.getElementById('fil_loc').value;
  let curdate=JBE_DATE_FORMAT(document.getElementById('hd_date').innerHTML,'YYYY-MM-DD');  

  var dtl=
    reportHead('Vaccines Locations',curdate)+
    '<div style="width:100%;height:auto;text-align:left;margin-top:10px;font-weight:bold;margin-bottom:5px;font-family:Times New Roman, Times, serif;font-size:16px;">'+
      'Category: <span style="text-decoration:underline;">'+repTilt+
    '</div>';   

  DB_TRANSFER2.sort(JBE_SORT_ARRAY(['type','stockno','expiry','lotno','loc']));
  if(DB_TRANSFER2.length==0){ return; }

  let v_type=parseInt(document.getElementById('div_opt').getAttribute('data-type'));
  
  let v_stockno='';
  //let dtl='<div style="width:100%;height:100%;padding:0px;overflow:auto;border:0px solid lightgray;background:none;">';
  let aryLOCATION=[]; let aryLOCATION_ctr=0;  

  for(var k=0;k<DB_TRANSFER2.length;k++){  
    let stockno=DB_TRANSFER2[k].stockno;   
    let type=parseInt(DB_TRANSFER2[k].type);
    let loc=DB_TRANSFER2[k].loc;
    if(v_type && (type != v_type)){ continue; }    
    if(v_stockno && v_stockno != stockno){ continue; }    

    //create aryLOCATION ------------------------------------
    let f_found=false;
    for(var y=0;y<aryLOCATION.length;y++){
      if(aryLOCATION[y].loc==loc){ f_found=true; break; }
    }  
    if(!f_found){      
      let vlocname=get_locname_location(loc);
      let vlocsort=vlocname;
      if(vlocname.trim().length==2){
        vlocsort=vlocname.substring(0,1)+'0'+vlocname.substring(1);
        //console.log(vlocsort);
      }
      
      let ob={
        "loc":loc,
        "locname":vlocname,
        "locsort":vlocsort,
        "type":type
      }
      aryLOCATION[aryLOCATION_ctr]=ob;
      aryLOCATION_ctr++;
    }
  }
  aryLOCATION.sort(JBE_SORT_ARRAY(['locsort']));  
  //console.log(aryLOCATION);
    
  let ctr=0;
  while(ctr < (aryLOCATION.length)){
    dtl+='<div style="width:100%;height:100px;margin-top:5px;border:0px solid green;">';
    
    for(var k=0;k<3;k++){      
      let v_loc=aryLOCATION[ctr].loc;
      let v_locname=aryLOCATION[ctr].locname; 
      //console.log(ctr,v_locname);

      dtl+=
      '<div style="position:relative;float:left;width:33%;height:100%;font-size:14px;border:0px solid red;">'+
        '<div style="width:100%;height:15%;font-size:13px;font-weight:bold;text-align:center;border:1px solid lightgray;">'+v_locname+'</div>'+
        '<div style="width:100%;height:85%;font-size:10px;border:1px solid lightgray;">';
        
          //'10 Dose MR Diluent    068254001  10,000'+  
          for(var ii=0;ii<DB_TRANSFER2.length;ii++){
            if(DB_TRANSFER2[ii].locname != v_locname){ continue; }
            if(parseInt(DB_TRANSFER2[ii].balance)==0){ continue; }
            let v_title=DB_TRANSFER2[ii].descrp+'\nExpiry: '+JBE_DATE_FORMAT(DB_TRANSFER2[ii].expiry,'DD-MMM-YYYY');
            dtl+=
            '<div title="'+v_title+'" style="width:100%;height:10px;cursor:pointer;font-size:10px;text-align:center;border:0px solid lightgray;">'+
              '<div style="float:left;width:40%;height:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background:none;">'+DB_TRANSFER2[ii].descrp+'</div>'+
              '<div style="float:left;width:35%;height:100%;background:none;">'+DB_TRANSFER2[ii].lotno+'</div>'+
              '<div style="float:left;width:25%;height:100%;background:none;">'+JBE_FORMAT_INT_TO_STR(DB_TRANSFER2[ii].balance)+'</div>'+
            '</div>';
          }
        
        dtl+=
        '</div>'+
      '</div>';      
      ctr++;
      if(ctr==aryLOCATION.length){ break; }
    }
    
    dtl+='</div>';
  }

  document.getElementById('pa_dtl').innerHTML=dtl;
}

function get_Alllocation(s_stockno,s_loc,s_lotno,s_date,e_date){
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

    if(!V_DATE_TF){ V_DATE_TF=v_date; } //alert(v_date+':::ORIG vdate_tf:'+V_DATE_TF+' loc:'+get_locname_location(v_loc)+' :::v_stockno:'+v_stockno); }
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
