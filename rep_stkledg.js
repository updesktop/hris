function rp_stkledg(){
  f_MainPage=false;
  var jmode=0;
  var repTilt='STOCK LEDGER';
    
  document.getElementById('back_view2').style.display='none';  
  document.getElementById('cap_viewMid2').innerHTML=repTilt;

  var dtl=  
  '<div id="div_opt" data-mode='+jmode+' data-opt=0 style="height:100%;width:100%;font-family:Arial Narrow,Arial,sans-serif;font-size:12px;padding:2%;border:1px solid blue;background:white;">'+

    '<div id="div_stkledg" style="width:100%;border:1px solid lightgray;">'+              
      '<div class="cls_stkledg" style="float:left;width:35%;padding:5px;">'+      
        '<span style="float:left;padding:3px 0 0 0;font-size:14px;font-weight:bold;">Product:</span>'+
        '<input type="text" id="fil_vax" data-prodno="" name="filter_opt" readonly onclick="sel_prod_stkledg(this.id)" '+
          'style="float:left;cursor:pointer;text-align:center;" placeholder="Select Product..." value="" />'+
        '<label for="fil_vax"></label>'+          
      '</div>'+
      '<div class="cls_stkledg" style="float:left;width:35%;padding:5px;">'+      
        '<span style="float:left;padding:3px 0 0 0;font-size:14px;font-weight:bold;">Stock:</span>'+
        '<input type="text" id="fil_vax" data-prodno="" name="filter_opt" readonly onclick="sel_stock_stkledg(this.id)" '+
          'style="float:left;cursor:pointer;text-align:center;" placeholder="Select Stock..." value="" />'+
        '<label for="fil_vax"></label>'+          
      '</div>'+
      '<div class="cls_stkledg" style="float:right;width:30%;padding:5px;border:0px solid green;">'+  
        '<span style="">Date To: </span>'+  
        '<input id="date_to" onchange="chg_date_stkledg()" type="date" value=""  placeholder="Date To" />'+        
      '</div>'+
    '</div>'+    

    '<div id="printableArea" data-print="JEFF" style="margin-top:0px;height:'+(H_VIEW-53-0)+'px;width:100%;font-family:Arial Narrow,Arial,sans-serif;font-size:10px;padding:2%;overflow:auto;border:1px solid lightgray;background:white;">'+
      reportHead('Stock Ledger',new Date())+

      '<div style="width:100%;height:30px;margin-top:30px;font-size:14px;font-weight:bold;padding:5px 0 0 0;text-align:center;border:1px solid black;">'+      
        '<div style="float:left;width:40%;height:100%;">Description</div>'+
        '<div style="float:left;width:20%;height:100%;">In</div>'+
        '<div style="float:left;width:20%;height:100%;">Out</div>'+
        '<div style="float:left;width:19%;height:100%;">Balance</div>'+
      '</div>'+
      '<div id="pa_dtl" style="font-family:Times New Roman, Times, serif;font-size:16px;">'+
      '<div style="height:1000px;border:1px solid red;width:100%;margin:0 auto;margin-top:0%;border:0px solid black;">'+
        
      '</div>'+
    '</div>'+
        
  '</div>';
  
  JBE_OPEN_VIEW(dtl,'PRINTER','');
  mnu_stkledg();
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
  show_datefrom_stkledg(true);
}

function mnu_stkledg(){  
  var jmenu=  
  '<div style="width:100%;height:100%;">'+
    '<div onclick="JBE_PRINTDIV(&quot;printableArea&quot;,&quot;REPORT&quot;)" style="float:left;width:30%;height:100%;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jprn.png" alt="call image" />'+
        '<span>Print Now</span>'+
      '</div>'+
    '</div>'+       
    '<div onclick="refresh_stkledg()" style="float:left;width:34%;height:100%;background:none;">'+
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
function refresh_stkledg(){
  refresh_all_db();
  chg_date_stkledg(); 
}
//===============================================================================

function show_datefrom_stkledg(f){
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
  prn_stkledg(e_date);
}

function sel_prod_stkledg(id){    
  var box1=H_VIEW-(30);
  var jmode=document.getElementById('div_opt').getAttribute('data-mode');  

  var tilt='Select Product';  
   
  var dtl=          
    '<div id="div_name" data-code="" data-zoom=0 style="width:100%;height:'+box1+'px;font-text:14px;padding:0px;background-color:white;">'+         
      '<div style="width:100%;height:40px;padding:2px;text-align:center;color:'+JBE_TXCLOR1+';background:'+JBE_CLOR+';">'+
         '<input id="filterInput" type="text" style="float:left;width:100%;height:100%;text-align:center;" value="" placeholder="Search here..."/>'+      
      '</div>'+    
      '<div style="margin-top:5px;width:100%;height:25px;padding:0px;text-align:center;color:'+JBE_TXCLOR1+';background:'+JBE_CLOR+';">'+            
        '<div style="float:left;width:100%;height:100%;padding:3px;border:1px solid black;">Vaccine</div>'+
      '</div>'+    
      '<div style="width:100%;height:'+(box1-77)+'px;padding:5px;border:0px solid red;overflow:auto;">';
        var ddd='';
        
        DB_PRODUCT.sort(JBE_SORT_ARRAY(['prodno']));

        var newArr = DB_PRODUCT.filter(function(DB_PRODUCT) {
          //return DB_PRODUCT.type == ptrType;
          return DB_PRODUCT;
        });
        let ob={
          "prodno":"ALL",
          "prodname":"< Select All >",
          "type":""
        };
        newArr[newArr.length]=ob;
        newArr.sort(JBE_SORT_ARRAY(['prodno']));
        //return;

        for(var i=0;i<newArr.length;i++){
          //if(id=='fil_lotno' && document.getElementById('fil_vax').value && (DB_PRODUCT[i]['descrp'] != document.getElementById('fil_vax').value)){ continue; }
          ddd+=
          '<div id="d_'+i+'" class="cls_names" onclick="do_sel_prod_stkledg(&quot;'+newArr[i]['prodno']+'&quot;,&quot;'+newArr[i]['prodname']+'&quot;)" style="width:100%;height:30px;padding:5px;border:1px solid gray;cursor:pointer;">'+                        
            '<div id="dd_'+i+'" style="float:left;width:50%;">'+newArr[i]['prodname']+'</div>'+
          '</div>';
        }
        dtl+=ddd+
      '</div>'+    
    '</div>';
      
  var dtl2=    
    '<div style="width:100%;height:100%;padding:5px;text-align:center;background:none;">'+      
      '<input type="button" onclick="JBE_CLOSEBOX()" style="float:right;width:100px;height:100%;" value="Close">'+   
    '</div>';

  JBE_OPENBOX('div_name',tilt,dtl,dtl2); 
  JBE_SEARCH_BOX('filterInput','cls_names',document.getElementById('fil_vax').value);
}
function do_sel_prod_stkledg(prodno,prodname){    
  //alert(prodno);
  let d2=JBE_DATE_FORMAT(document.getElementById('date_to').value,'YYYY-MM-DD');
  document.getElementById('fil_vax').value=prodname;  
  document.getElementById('fil_vax').setAttribute('data-prodno',prodno);
  JBE_CLOSEBOX();
  prn_stkledg(d2);
}

function chg_date_stkledg(){
  let d2=JBE_DATE_FORMAT(document.getElementById('date_to').value,'YYYY-MM-DD');
  if(!d2){ return; }  
  prn_stkledg(d2);
}

function getStockBal_stk(s_stockno){
  //=================================================================================================    
  //================BEGIN PREPARE DIS ARRAY
  //=================================================================================================    
    
  //je_msg('watch',0);
  //================ all used
  var v_returned=0;
  var v_dispensed=0;
  var v_bal=0;
  let e_date=JBE_DATE_FORMAT(document.getElementById('date_to').value,'YYYY-MM-DD');

  //=================================================================================================    
  //================RECEIVAL
  //=================================================================================================    
  //je_msg('w',0);
  for(var i = 0; i < DB_RECEIVE2.length; i++){
    var v_stockno=DB_RECEIVE2[i].stockno;
    if(v_stockno != s_stockno){ continue; }
    
    var v_date=JBE_DATE_FORMAT(DB_RECEIVE2[i].date,'YYYY-MM-DD');  
    if(v_date > e_date){ continue; }
    
    var v_received=DB_RECEIVE2[i].qty;
    v_bal+=v_received;
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

    var v_sub_area=JBE_GETFLD('name',DB_AREA,'areano',DB_PTR2[i].areano);
    var v_dispensed=DB_PTR2[i].qty;
    var v_lotno=DB_PTR2[i].lotno;
    
    v_returned=0;
    v_wastage=0;
    
    v_bal-=(v_dispensed-v_returned);
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
    if(v_date > e_date){ continue; }
    
    var v_returned=DB_RETURNS2[i].qty;

    v_bal+=v_returned;          
  }      

  //=================================================================================================    
  //================ADJUSTMENTS
  //=================================================================================================    
  //je_msg('w',0);
  for(var i = 0; i < DB_ADJ2.length; i++){
    //if(chk_cancelPTR(DB_PTR2[i].trano)){ continue; }   
     
    var v_stockno=DB_ADJ2[i].stockno;
    if(v_stockno != s_stockno){ continue; }   

    var v_date=JBE_DATE_FORMAT(DB_ADJ2[i].date,'YYYY-MM-DD');
    if(v_date > e_date){ continue; }
    
    let v_debit=DB_ADJ2[i].qty;
    let v_credit=0;
    let v_drcr=1;
    var v_mode=DB_ADJ2[i].drcr;
    
    if(v_mode != 'Debit'){ 
      v_debit=0;
      v_credit=DB_ADJ2[i].qty;
      v_drcr=2;
    }

    v_bal+=(v_debit-v_credit);
  }
  
  return v_bal;
}

function prn_stkledg(e_date){  
  var repTilt=document.getElementById('fil_vax').value;

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

    dtl+='<div style="width:100%;height:auto;margin-top:20px;padding:2px;color:black;font-weight:bold;">'+'*** ('+DB_PRODUCT[i].prodno+') '+DB_PRODUCT[i].prodname+'</div>';
    //console.log(DB_PRODUCT[i].prodname);

    
    for(var k=0;k<DB_STOCK.length;k++){
      if(DB_STOCK[k].prodno != v_prodno){ continue; }

      let stockno=DB_STOCK[k].stockno;         
      let bal=getStockBal_stk(stockno);
      //console.log('>>>'+DB_STOCK[k].descrp+' bal:'+bal);
      dtl+=
      '<div style="width:100%;height:25px;padding:5px 0 0 0;margin-top:0px;font-size:11px;text-align:center;border:1px solid lightgray;background:none;">'+              
        '<div style="float:left;width:40%;height:100%;">'+DB_STOCK[k].descrp+'</p></div>'+
        '<div style="float:left;width:20%;height:100%;"></div>'+
        '<div style="float:left;width:20%;height:100%;"></div>'+
        '<div style="float:left;width:19%;">'+iif(!bal,'0',JBE_FORMAT_INT_TO_STR(bal))+'</div>'+
      '</div>';    
    }
    

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
  */
}

function chk_cancelPTR(trano){
  let xxx=JBE_GETFLD('trans',DB_PTR,'trano',trano);
  //alert('chk_cancelPTR:'+xxx);
  if(xxx=='XXX'){
    return true;
  }else{
    return false;
  }
}