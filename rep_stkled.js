function rp_stkled(){
  //not_yet(); return;
  f_MainPage=false;
  var jmode=0;
  var repTilt='STOCK LEDGER';
    
  document.getElementById('back_view2').style.display='none';  
  document.getElementById('cap_viewMid2').innerHTML=repTilt;

  let pa_height=H_VIEW-30;
  if(JBE_MOBILE){ pa_height=H_VIEW-65; }

  var dtl=  
  '<div id="div_opt" data-mode='+jmode+' data-opt=0 style="height:100%;width:100%;font-family:Arial Narrow,Arial,sans-serif;font-size:12px;padding:10px;border:0px solid red;background:white;">'+

    '<div id="div_stk1" class="cls_div_stkled">'+

      '<div class="cls_stkled">'+      
        '<span>Product: </span>'+
        '<input type="text" id="fil_vax" data-prodno="" name="filter_opt" readonly onclick="sel_prod_stkled(this.id)" '+
          'placeholder="Select Product..." value="" />'+
        '<label for="fil_vax"></label>'+
      '</div>'+

      '<div class="cls_stkled">'+      
        '<span style="text-align:right;">Stock: </span>'+
        '<input type="text" id="fil_vax2" data-stockno="" name="filter_opt" readonly onclick="sel_stock_stkled(this.id)" '+
          'placeholder="Select Stock..." value="" />'+
        '<label for="fil_vax2"></label>'+
      '</div>'+

    '</div>'+

    '<div id="div_stk2" class="cls_div_stkled">'+
      /*
      '<div class="cls_stkled">'+      
        '<span>Lot No.: </span>'+
        '<input type="text" id="fil_vax3" data-stockno="" name="filter_opt" readonly onclick="sel_lotno_stkled(this.id)" '+
          'style="" placeholder="Select Lot No..." value="" />'+
        '<label for="fil_vax3"></label>'+
      '</div>'+
      */

      '<div class="cls_stkled" style="width:50%;float:right;">'+  
        '<input id="date_to" onchange="chg_date_stkled()" style="float:right;background:none;text-align:right;" type="date" value=""  placeholder="Date To" />'+        
        '<span style="float:right;text-align:right;">Date To: </span>'+
      '</div>'+
      
      
    '</div>'+

    '<div id="printableBorder" style="height:'+pa_height+'px;">'+     

      '<div id="printableArea">'+
        reportHead('Stock Ledger',new Date())+

        '<div style="width:100%;height:25px;margin-top:30px;font-size:14px;font-weight:bold;text-align:center;border:1px solid black;">'+      
          '<div style="float:left;width:12%;height:100%;padding:5px 0 0 5px;text-align:left;">Date</div>'+
          '<div style="float:left;width:15%;height:100%;padding:5px 0 0 0;text-align:left;">Ref. No.</div>'+
          '<div style="float:left;width:17%;height:100%;padding:5px 0 0 0;text-align:left;">Lot No.</div>'+
          '<div style="float:left;width:10%;height:100%;padding:5px 0 0 0;text-align:center;">In</div>'+
          '<div style="float:left;width:10%;height:100%;padding:5px 0 0 0;text-align:center;">Out</div>'+
          '<div style="float:left;width:12%;height:100%;padding:5px 0 0 0;text-align:center;">Balance</div>'+
          '<div style="float:left;width:23%;height:100%;padding:5px 0 0 0;text-align:center;">Remarks</div>'+
        '</div>'+
        '<div id="pa_dtl">'+
        '</div>'+
      '</div>'+

    '</div>'+
        
  '</div>';
  
  JBE_OPEN_VIEW(dtl,'PRINTER','');
  //mnu_stkled();
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
  //var e_date=JBE_DATE_FORMAT(dum2_date,'YYYY-MM-DD');
  var e_date=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');

  document.getElementById('date_to').value=e_date;
  //show_datefrom_stkled(true);
}

function mnu_stkled(){  
  var jmenu=  
  '<div style="width:100%;height:100%;">'+
    '<div onclick="JBE_PRINTDIV(&quot;printableArea&quot;,&quot;REPORT&quot;)" style="float:left;width:30%;height:100%;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jprn.png" alt="call image" />'+
        '<span>Print Now</span>'+
      '</div>'+
    '</div>'+       
    '<div onclick="refresh_stkled()" style="float:left;width:34%;height:100%;background:none;">'+
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
function refresh_stkled(){
  refresh_all_db();
  chg_date_stkled(); 
}
//===============================================================================

function show_datefrom_stkled(f){
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
  prn_stkled(e_date);
}

//////
function sel_prod_stkled(){
  /*
  var newArr = DB_PRODUCT.filter(function(DB_PRODUCT) {
    //return DB_PRODUCT.type == ptrType;
    return DB_PRODUCT;
  });
  let ob={
    "prodno":"ALL",
    "prodname":"-- Select All --",
    "type":""
  };
  

  newArr[newArr.length]=ob;
  */
  
  var flds=[    
    { title:"Product Description", fld:"prodname", type:"text", width:"50%", align:"center" },
    { title:"Product", fld:"prodno", type:"text", width:"50%", align:"center" }
  ];
  
  FM_LOOKUP(true,fil_vax.value,DB_PRODUCT,[],'LOOKUP3','do_lu_prod_stkled','prodname',flds,'prodno');
}
function do_lu_prod_stkled(ndx,val){	
  document.getElementById('fil_vax').setAttribute('data-prodno',val);
  document.getElementById('fil_vax2').value='';
  document.getElementById('fil_vax2').setAttribute('data-stockno','');
  if(ndx == -1){ 
    document.getElementById('fil_vax').value='';
    return; 
  }
  document.getElementById('fil_vax').value=document.getElementById('dd_'+ndx).innerHTML;
  let d2=JBE_DATE_FORMAT(document.getElementById('date_to').value,'YYYY-MM-DD');
  prn_stkled(d2);
}

///
function sel_stock_stkled(){
  //alert('areano:'+areano);
  let prodno=document.getElementById('fil_vax').getAttribute('data-prodno');
  var newArr = DB_STOCK.filter(function(DB_STOCK) {
    if(prodno && prodno != 'ALL'){
      return DB_STOCK.prodno == prodno;
    }else{
      return DB_STOCK;
    }    
  });  

  var flds=[    
    { title:"Stock Description", fld:"descrp", type:"text", width:"50%", align:"center" },
    { title:"Stock No.", fld:"stockno", type:"text", width:"25%", align:"center" },
    { title:"Product", fld:"prodno", type:"text", width:"25%", align:"center" }
  ];
  FM_LOOKUP(true,fil_vax2.value,newArr,[],'LOOKUP','do_lu_stock_stkled','descrp',flds,'stockno');
}
function do_lu_stock_stkled(ndx,val){	
  document.getElementById('fil_vax2').setAttribute('data-stockno',val);
  if(ndx == -1){ 
    document.getElementById('fil_vax2').value='';
    document.getElementById('fil_vax').setAttribute('data-prodno','');
    document.getElementById('fil_vax').value='';
    return; 
  }
  document.getElementById('fil_vax2').value=document.getElementById('dd_'+ndx).innerHTML;
  let prodno=document.getElementById('dd_prodno'+ndx).innerHTML;
  document.getElementById('fil_vax').setAttribute('data-prodno',prodno);
  document.getElementById('fil_vax').value=JBE_GETFLD('prodname',DB_PRODUCT,'prodno',prodno);
  let d2=JBE_DATE_FORMAT(document.getElementById('date_to').value,'YYYY-MM-DD');
  prn_stkled(d2);
}

function chg_date_stkled(){
  let d2=JBE_DATE_FORMAT(document.getElementById('date_to').value,'YYYY-MM-DD');
  if(!d2){ return; }  
  prn_stkled(d2);
}

function prn_stkled(e_date){
  var repTilt=document.getElementById('fil_vax').value;
  var dtl='';
  var s_prodno=document.getElementById('fil_vax').getAttribute('data-prodno');
  var s_stockno=document.getElementById('fil_vax2').getAttribute('data-stockno');
  
  let aryDB=[];
  let v_stockno='';
  let s_date='2000/01/31';

  var tmp_product = DB_PRODUCT.filter(function(DB_PRODUCT) {   
    if(s_prodno=='ALL'){
      return DB_PRODUCT; 
    }else{
      return DB_PRODUCT.prodno == s_prodno; 
    }
  });

  let v_prodno='';
  for(var i=0;i<tmp_product.length;i++){    
    v_prodno=tmp_product[i].prodno;

    //alert('DB_PRODUCT[i].prodno:'+DB_PRODUCT[i].prodno);

    dtl+=
    '<div style="width:100%;height:auto;margin-top:20px;padding:2px;color:black;font-weight:bold;">'+tmp_product[i].prodname+' ['+tmp_product[i].prodno+']</div>';
    
    for(var k=0;k<DB_STOCK.length;k++){
      if(DB_STOCK[k].prodno != v_prodno){ continue; }
      if(s_stockno && DB_STOCK[k].stockno != s_stockno){ continue; }

      v_stockno=DB_STOCK[k].stockno;    
      let aryDB=get_AllStock(DB_STOCK[k].stockno,s_date,e_date);
      aryDB.sort(JBE_SORT_ARRAY(['stockno','date','zindex','drcr','docno']));
      let bal=0;
      dtl+=
      '<div style="width:100%;height:auto;margin-top:20px;padding:2px;color:black;font-weight:bold;">'+'*** ('+DB_STOCK[k].stockno+') '+DB_STOCK[k].descrp+'</div>';
      console.log('>>>'+DB_STOCK[k].descrp+' bal:'+bal);

      for(var j=0;j<aryDB.length;j++){
        if(aryDB[j].stockno != v_stockno){ continue; }

        bal+=aryDB[j].received-aryDB[j].issued;
        dtl+=
        '<div style="width:100%;height:25px;padding:5px 0 0 0;margin-top:0px;font-size:11px;border:1px solid lightgray;background:none;">'+              
          '<div style="float:left;width:12%;height:100%;text-align:left;padding:0 0 0 5px;">'+aryDB[j].date+'</p></div>'+
          '<div style="float:left;width:15%;height:100%;text-align:left;">'+aryDB[j].docno+'</p></div>'+
          '<div style="float:left;width:17%;height:100%;text-align:left;">'+aryDB[j].lotno+'</p></div>';
          if(aryDB[j].drcr==1){
            dtl+= '<div style="float:left;width:10%;height:100%;text-align:center;">'+JBE_FORMAT_INT_TO_STR(aryDB[j].received)+'</div>'+
                  '<div style="float:left;width:10%;height:100%;text-align:center;"></div>';
            //bal+=aryDB[j].received;
          }else{
            dtl+= '<div style="float:left;width:10%;height:100%;text-align:center;"></div>'+
                  '<div style="float:left;width:10%;height:100%;text-align:center;">'+JBE_FORMAT_INT_TO_STR(aryDB[j].issued)+'</div>';
            //bal-=aryDB[j].issued;
          }
          dtl+=
          '<div style="float:left;width:12%;text-align:center;">'+iif(!bal,'0',JBE_FORMAT_INT_TO_STR(bal))+'</div>'+
          '<div style="float:left;width:23%;height:100%;text-align:center;">'+aryDB[j].remarks+'</div>'+
        '</div>';  
      }  
      
      if(s_stockno){ break; }
    }        
    
  }

  document.getElementById('pa_dtl').innerHTML=dtl;
}
