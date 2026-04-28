function rp_ptr_summ(jmode){
  //alert('here');
  var repTilt='Summary of PTRs - '+iif(jmode==0,'NIP','COVAC');
  //document.getElementById('back_view2').style.display='none';  
  //document.getElementById('cap_viewMid2').innerHTML=repTilt;
    
  let vdtl=   
  '<div id="div_opt" data-mode='+jmode+' data-opt=0 style="height:30px;width:100%;font-family:Arial Narrow,Arial,sans-serif;font-size:12px;padding:0px;border:1px solid black;background:none;">'+         
    '<div class="cls_ptr_summ" style="width:100%;background:none;border:0px solid red;">'+
      '<div style="text-align:left;padding:2px;border:1px solid lightgray;background:none;">'+      
        '<span>Report Option:</span>'+
        '<input type="radio" id="rad1" name="fav_language" onclick="get_radio(1)" style="margin-left:20px;" value="CSS">'+
          '<label for="rad1">Today</label>'+
        '<input type="radio" id="rad2" checked name="fav_language" onclick="get_radio(2)" style="margin-left:10px;" value="HTML">'+
          '<label for="rad2">This Month</label>'+      
        '<input type="radio" id="rad3" name="fav_language" onclick="get_radio(3)" style="margin-left:20px;" value="JavaScript">'+
          '<label for="rad3">Others</label>'+
      '</div>'+
      '<div style="padding:5px;border:'+iif(JBE_MOBILE,1,0)+'px solid black;background:none;">'+      
        '<span style="float:left;">Filter:</span>'+        
        '<input type="text" id="fil_area" name="filter_opt" readonly style="margin-left:2%;" onclick="sel_filter(this.id)" placeholder="Sub-Area" value="">'+
          '<label for="fil_area"></label>'+
        '<input type="text" id="fil_vax" checked name="filter_opt" readonly onclick="sel_filter(this.id)" placeholder="Vaccine" value="">'+
          '<label for="fil_vax"></label>'+      
        '<input type="text" id="fil_lotno" name="filter_opt" readonly onclick="sel_filter(this.id)" placeholder="Lot No." value="">'+
          '<label for="fil_lotno"></label>'+      
      '</div>'+
    '</div>'+
  

    '<div style="margin-top:0px;height:30px;width:100%;font-family:Arial Narrow,Arial,sans-serif;font-size:12px;padding:5px;border:1px solid black;background:none;">'+          
      '<div style="float:left;height:100%;width:49%;border:0px solid green;">'+        
        '<span style="float:left;height:100%;width:auto;padding:3px 5px 0 0;">Date From:</span>'+        
        '<input id="date_from" disabled onchange="chg_dateRange()" type="date" style="float:left;width:auto;height:100%;" value="" placeholder="Date From" />'+        
      '</div>'+
      '<div style="float:right;height:100%;width:49%;border:0px solid green;">'+                   
        '<input id="date_to" disabled onchange="chg_dateRange()" type="date" style="float:right;width:auto;height:100%;" value=""  placeholder="Date To" />'+        
        '<span style="float:right;text-align:right;padding:3px 5px 0 0;height:100%;width:auto;">Date To:</span>'+     
      '</div>'+
    '</div>'+
  '</div>';
  
  let h_head=60;
  if(JBE_MOBILE){ h_head=90; }
  let dtl=init_report(repTilt,h_head,vdtl);
  JBE_OPEN_VIEW2(dtl,'PRINTER','');
  mnu_repo();
  get_radio(2);  
}

function sel_filter(id){    
  var box1=H_BODY-(60);
  var jmode=document.getElementById('div_opt').getAttribute('data-mode');  

  var tilt='Select Sub-Area';  
  var aryDB=[];
  let fld1='';
  if(id=='fil_area'){
    aryDB=DB_AREA;
    fld1='name';
    tilt='Select Sub-Area'; 
  }else if(id=='fil_vax'){
    aryDB = DB_STOCK.filter(function(DB_STOCK) {
      return DB_STOCK.type == jmode;
    });
    fld1='descrp';
    tilt='Select Vaccine'; 
  }else if(id=='fil_lotno'){
    aryDB = DB_RECEIVE2.filter(function(DB_RECEIVE2) {
      return DB_RECEIVE2.type == jmode && DB_RECEIVE2.lotno != '';
    });
    fld1='lotno';
    tilt='Select Lot No.'; 
  }

  var dtl=          
    '<div id="div_name" data-zoom=0 style="width:100%;height:'+box1+'px;font-text:14px;padding:0px;background-color:white;">'+         
      '<div style="width:100%;height:40px;padding:2px;text-align:center;color:'+JBE_TXCLOR1+';background:'+JBE_CLOR+';">'+
          '<input id="filterInput" type="text" style="float:left;width:100%;height:100%;text-align:center;" value="" placeholder="Search here..."/>'+      
      '</div>'+    
      '<div style="width:100%;height:'+(box1-50)+'px;padding:5px;border:0px solid red;overflow:auto;">';
        var ddd='';
        aryDB.sort(JBE_SORT_ARRAY([fld1]));
        for(var i=0;i<aryDB.length;i++){
          if(id=='fil_lotno' && document.getElementById('fil_vax').value && (aryDB[i]['descrp'] != document.getElementById('fil_vax').value)){ continue; }
          ddd+=
          '<div id="d_'+i+'" class="cls_names" onclick="do_sel_filter(&quot;'+id+'&quot;,&quot;'+aryDB[i][fld1]+'&quot;)" style="width:100%;height:30px;padding:5px;border:1px solid gray;">'+                        
            '<div style="float:left;width:50%;">'+aryDB[i][fld1]+'</div>'+
          '</div>';
        }
        dtl+=ddd+
      '</div>'+    
    '</div>';
      
  var dtl2=    
    '<div style="width:100%;height:100%;padding:5px;text-align:center;background:none;">'+
      '<input type="button" onclick="do_sel_filter_empty(&quot;'+id+'&quot;)" style="float:left;width:100px;height:100%;" value="Clear">'+ 
      '<input type="button" onclick="do_sel_filter_empty(&quot;CLEARALL&quot;)" style="float:left;width:100px;height:100%;margin-left:20px;" value="Clear All">'+ 
      '<input type="button" onclick="JBE_CLOSEBOX()" style="float:right;width:100px;height:100%;" value="Close">'+   
    '</div>';

  JBE_OPENBOX2('div_name',tilt,dtl,dtl2); 
  JBE_SEARCH_BOX('filterInput','cls_names');
}
function do_sel_filter(id,fld1){  
  document.getElementById(id).value=fld1;
  if(id=='fil_vax'){ document.getElementById('fil_lotno').value=''; }
  JBE_CLOSEBOX();
  get_ptr_summ();
}
function do_sel_filter_empty(id){ 
  if(id=='CLEARALL'){
    document.getElementById('fil_area').value='';
    document.getElementById('fil_vax').value='';
    document.getElementById('fil_lotno').value='';
  }else{
    document.getElementById(id).value='';
  }
  JBE_CLOSEBOX();
  get_ptr_summ();
}


function get_radio(v){
  //alert('get_radio '+v);
  document.getElementById('div_opt').setAttribute('data-opt',v);
  var date=new Date();
  let cur_date=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');
  let v_month=date.getMonth()+1;
  var s_date=v_month.toString().padStart(2, '0')+'-01-'+date.getFullYear();
  //je_msg('s_date',s_date);
  var dum_date=(v_month+1).toString().padStart(2, '0')+'-01-'+date.getFullYear();
  if(v_month==12){ dum_date='01-01-'+(date.getFullYear()+1); }
  //je_msg('dum_date',dum_date);
  var dum2_date = new Date(dum_date);
  dum2_date.setDate(dum2_date.getDate()-1);  
  s_date=JBE_DATE_FORMAT(s_date,'YYYY-MM-DD');
  var e_date=JBE_DATE_FORMAT(dum2_date,'YYYY-MM-DD');
  //alert('s_date:'+s_date+'  e_date:'+e_date);

  let f_disabled=true;
  if(v==3){ f_disabled=false; }  
  document.getElementById('date_from').disabled=f_disabled;
  document.getElementById('date_to').disabled=f_disabled;
  document.getElementById('rad'+v).checked=true;

  if(v==1){
    document.getElementById('date_from').value=cur_date;
    document.getElementById('date_to').value=cur_date;    
    get_ptr_summ();
  }else if(v==2){
    document.getElementById('date_from').value=s_date;
    document.getElementById('date_to').value=e_date;    
    get_ptr_summ();
  }else if(v==3){
    document.getElementById('date_from').value=s_date;
    document.getElementById('date_to').value=e_date;   
    //document.getElementById('pa_dtl').innerHTML='';
  }
}

function chg_dateRange(){
  let d1=document.getElementById('date_from').value;
  let d2=document.getElementById('date_to').value;
  if(!d1 || !d2){ return; }
  if(d1 > d2){ snackBar('ERROR: Invalid Dates'); return; }
  
  get_ptr_summ(); 
}

function get_ptr_summ(){
  var jmode=document.getElementById('div_opt').getAttribute('data-mode');  
  var repTilt='Summary of RIS - '+iif(jmode==0,'NIP','COVAC');
  var date_from=document.getElementById('date_from').value;
  var date_to=document.getElementById('date_to').value;

  var dtl=
    reportHead(repTilt,date_to)+
    
    //'<div style="width:100%;height:30px;padding:5px 0 0 0;margin-top:10px;font-size:12px;text-align:left;padding:5px;border:1px solid black;">'+
    '<div style="width:100%;height:30px;margin-top:10px;font-size:12px;text-align:left;border:1px solid black;">'+      
      '<div style="float:left;padding:5px 0 0 5px;height:100%;width:14%;background:none;">RIS No.</div>'+
      '<div style="float:left;padding:5px 0 0 0;height:100%;width:8%;background:none;">Date</div>'+
      '<div style="float:left;padding:5px 0 0 0;height:100%;width:17%;background:none;">Sub-Area</div>'+
      '<div style="float:left;padding:5px 0 0 0;height:100%;width:17%;background:none;">Vaccine</div>'+
      '<div style="float:left;padding:5px 0 0 0;height:100%;width:10%;background:none;">Lot Number</div>'+
      '<div style="float:left;padding:5px 0 0 0;height:100%;width:8%;text-align:right;background:none;">Cost</div>'+
      '<div style="float:left;padding:5px 0 0 0;height:100%;width:8%;text-align:right;background:none;">Qty</div>'+
      '<div style="float:left;padding:5px 0 0 0;height:100%;width:8%;text-align:right;background:none;">Doses</div>'+
      '<div style="float:left;padding:5px 2px 0 0;height:100%;width:9%;text-align:right;background:none;">Amount</div>'+
    '</div>';
  
  var line_ctr=0;
  var v_trano='';
  var sv_trano='';
  var sv_ptrdate='';
  var sv_sub_area='';
  //alert(document.getElementById('fil_area').value);
  var tot_qty=0;
  var tot_doses=0;
  var tot_amt=0;
  var vtop=0;
  DB_PTR2.sort(JBE_SORT_ARRAY(['trano']));
  for(var i=0;i<DB_PTR2.length;i++){
    if(DB_PTR2[i].type != jmode){ continue; }
    var v_date=JBE_DATE_FORMAT(DB_PTR2[i].ptrdate,'YYYY-MM-DD');
    if(v_date < date_from || v_date > date_to) { continue; }

    if(document.getElementById('fil_area').value && document.getElementById('fil_area').value != JBE_GETFLD('name',DB_AREA,'areano',DB_PTR2[i].areano)){ continue; }
    if(document.getElementById('fil_vax').value && document.getElementById('fil_vax').value != DB_PTR2[i].descrp){ continue; }
    if(document.getElementById('fil_lotno').value && document.getElementById('fil_lotno').value != DB_PTR2[i].lotno){ continue; }

    let v_details='';
    if(DB_PTR2[i].trano!=v_trano){
      sv_trano=DB_PTR2[i].trano;
      v_details=JBE_GETFLD('details',DB_PTR,'trano',sv_trano);
      sv_ptrdate=JBE_DATE_FORMAT(DB_PTR2[i].ptrdate,'MM-DD-YYYY');
      sv_sub_area=JBE_GETFLD('name',DB_AREA,'areano',DB_PTR2[i].areano);
      if(v_details){ sv_sub_area+=' / '+v_details; }
      v_trano=sv_trano;
      vtop=10;
    }else{
      sv_trano='';
      sv_ptrdate='';
      sv_sub_area='';
      vtop=0;
    }
    //sv_sub_area=JBE_GETFLD('name',DB_AREA,'areano',DB_PTR2[i].areano);

    if(DB_PTR2[i].type != jmode){ continue; }

    var v_trans=JBE_GETFLD('trans',DB_PTR,'trano',sv_trano);
    if(v_trans=='XXX'){
      //(sv_trano);
      //sv_sub_area='ATAY';
      continue;      
    }
    //let v_areaname=JBE_GETFLD('areaname',DB_PTR,'trano',sv_trano);
    //let v_areaname=sel_trano_name(DB_PTR2[i].trano);
    

    //if(JBE_GETFLD('trans',DB_PTR,'trano',sv_trano)=='XXX'){ sv_sub_area+'/CANCELLED'; }

    let dosage=parseInt(JBE_GETFLD('dosage',DB_STOCK,'stockno',DB_PTR2[i].stockno));
    if(!dosage){ dosage=1; }
    let doses=parseInt(DB_PTR2[i].qty) * dosage;
    dtl+=
      '<div style="width:100%;height:15px;margin-top:'+vtop+'px;font-size:11px;text-align:left;border:0px solid red;">'+        
        '<div style="float:left;padding:5px 0 0 5px;height:100%;width:14%;">'+sv_trano+'</div>'+
        '<div style="float:left;padding:5px 0 0 0;height:100%;width:8%;">'+sv_ptrdate+'</div>'+
        '<div title="'+v_details+'" style="float:left;padding:5px 0 0 0;height:100%;width:17%;color:'+iif(v_details,'blue','black')+';background:none;">'+sv_sub_area+'</div>'+
        '<div style="float:left;padding:5px 0 0 0;height:100%;width:17%;background:none;">'+DB_PTR2[i].descrp+'</div>'+
        '<div style="float:left;padding:5px 0 0 0;height:100%;width:10%;background:none;">'+DB_PTR2[i].lotno+'</div>'+
        '<div style="float:left;padding:5px 0 0 0;height:100%;width:8%;text-align:right;">'+JBE_FORMAT_DOUBLE_TO_STR(DB_PTR2[i].cost)+'</div>'+
        '<div style="float:left;padding:5px 0 0 0;height:100%;width:8%;text-align:right;">'+JBE_FORMAT_INT_TO_STR(DB_PTR2[i].qty)+'</div>'+
        '<div style="float:left;padding:5px 0 0 0;height:100%;width:8%;text-align:right;">'+JBE_FORMAT_INT_TO_STR(doses)+'</div>'+
        '<div style="float:left;padding:5px 0 0 0;height:100%;width:9%;text-align:right;">'+JBE_FORMAT_DOUBLE_TO_STR(DB_PTR2[i].amount)+'</div>'+
      '</div>';
    tot_qty+=DB_PTR2[i].qty;
    tot_doses+=doses;
    tot_amt+=DB_PTR2[i].amount;
    vtop=0;
  }

  dtl+=
  /*
    '<div style="width:100%;height:15px;margin-top:0px;font-size:11px;text-align:left;border:0px solid black;">'+        
      '<div style="float:left;padding:5px 0 0 0;width:82%;border:0px solid red;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>'+
      '<div style="float:left;padding:5px 0 0 0;width:8%;border:0px solid red;text-align:right;">---------</div>'+
      '<div style="float:left;padding:5px 0 0 0;width:9%;text-align:right;">----------------</div>'+
    '</div>'+
    */
    '<div style="width:100%;height:15px;margin-top:'+vtop+'px;font-size:11px;text-align:left;border:0px solid red;">'+        
      '<div style="float:left;padding:5px 0 0 5px;height:100%;width:14%;"></div>'+
      '<div style="float:left;padding:5px 0 0 0;height:100%;width:8%;"></div>'+
      '<div style="float:left;padding:5px 0 0 0;height:100%;width:17%;"></div>'+
      '<div style="float:left;padding:5px 0 0 0;height:100%;width:17%;"></div>'+
      '<div style="float:left;padding:5px 0 0 0;height:100%;width:10%;"></div>'+
      '<div style="float:left;padding:5px 0 0 0;height:100%;width:8%;text-align:right;"></div>'+
      '<div style="float:left;padding:5px 0 0 0;height:100%;width:8%;text-align:right;">---------</div>'+
      '<div style="float:left;padding:5px 0 0 0;height:100%;width:8%;text-align:right;">---------</div>'+
      '<div style="float:left;padding:5px 0 0 0;height:100%;width:9%;text-align:right;">----------------</div>'+
    '</div>'+
    '<div style="width:100%;height:15px;margin-top:0px;font-weight:bold;font-size:11px;text-align:left;border:0px solid black;">'+ 
      '<div style="float:left;padding:5px 0 0 5px;height:100%;width:14%;"></div>'+
      '<div style="float:left;padding:5px 0 0 0;height:100%;width:8%;"></div>'+
      '<div style="float:left;padding:5px 0 0 0;height:100%;width:17%;"></div>'+
      '<div style="float:left;padding:5px 0 0 0;height:100%;width:17%;"></div>'+
      '<div style="float:left;padding:5px 0 0 0;height:100%;width:10%;"></div>'+
      '<div style="float:left;padding:5px 0 0 0;height:100%;width:8%;text-align:right;">TOTALS:</div>'+
      '<div style="float:left;padding:5px 0 0 0;height:100%;width:8%;text-align:right;">'+JBE_FORMAT_INT_TO_STR(tot_qty)+'</div>'+
      '<div style="float:left;padding:5px 0 0 0;height:100%;width:8%;text-align:right;">'+JBE_FORMAT_INT_TO_STR(tot_doses)+'</div>'+
      '<div style="float:left;padding:5px 0 0 0;height:100%;width:9%;text-align:right;">'+JBE_FORMAT_DOUBLE_TO_STR(tot_amt)+'</div>'+  
    '</div>';

  document.getElementById('pa_dtl').innerHTML=dtl;
  
  //==================================================================  
}

function retDetails(trano){

  return rval;
}