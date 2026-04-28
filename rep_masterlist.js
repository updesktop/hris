function rp_masterlist(v){
  document.getElementById('back_view2').style.display='none';  
  document.getElementById('cap_viewMid2').innerHTML='Master List';

  //let pa_height=H_VIEW-65;
  let pa_height=H_VIEW-30;
  if(JBE_MOBILE){ pa_height=H_VIEW-110; }

  var dtl=  
  '<div id="div_opt" data-mode='+v+' data-opt=0 style="height:100%;width:100%;font-family:Arial Narrow,Arial,sans-serif;font-size:12px;padding:10px;border:0px solid lightgray;background:white;">'+

    '<div class="cls_ptr_summ" style="width:100%;background:none;">'+        
      '<div style="padding:5px;border:1px solid lightgray;background:none;">'+      
        '<span>Report Option:</span>'+
        '<input type="radio" id="rad1" name="fav_language" onclick="get_radio_ml(1)" style="margin-left:20px;" value="CSS">'+
          '<label for="rad1">Today</label>'+
        '<input type="radio" id="rad2" checked name="fav_language" onclick="get_radio_ml(2)" style="margin-left:10px;" value="HTML">'+
          '<label for="rad2">This Month</label>'+      
        '<input type="radio" id="rad3" name="fav_language" onclick="get_radio_ml(3)" style="margin-left:20px;" value="JavaScript">'+
          '<label for="rad3">Others</label>'+
      '</div>'+
      '<div style="padding:5px;border:1px solid lightgray;background:none;">'+      
        '<span style="float:left;">Filter:</span>'+
        
        '<input type="text" id="fil_area" name="filter_opt" readonly style="margin-left:2%;" onclick="sel_filter_ml(this.id)" placeholder="Sub-Area" value="">'+
          '<label for="fil_area"></label>'+
        '<input type="text" id="fil_vax" checked name="filter_opt" readonly onclick="sel_filter_ml(this.id)" placeholder="Vaccine" value="">'+
          '<label for="fil_vax"></label>'+      
        '<input type="text" id="fil_lotno" name="filter_opt" readonly onclick="sel_filter_ml(this.id)" placeholder="Lot No." value="">'+
          '<label for="fil_lotno"></label>'+      
      '</div>'+
    '</div>'+
    
    '<div style="display:none;margin-top:0px;height:35px;width:100%;font-family:Arial Narrow,Arial,sans-serif;font-size:12px;padding:5px;border:1px solid lightgray;background:white;">'+    
    
      '<div style="float:left;height:100%;width:49%;border:0px solid green;">'+        
        '<span style="float:left;height:100%;width:auto;padding:3px 5px 0 0;">Date From:</span>'+        
        '<input id="date_from" disabled onchange="chg_dateRange_ml()" type="date" style="float:left;width:65%;height:100%;" value="" placeholder="Date From" />'+        
      '</div>'+
      '<div style="float:right;height:100%;width:49%;border:0px solid green;">'+        
        '<span style="float:left;text-align:right;padding:3px 5px 0 0;height:100%;width:30%;">Date To:</span>'+        
        '<input id="date_to" disabled onchange="chg_dateRange_ml()" type="date" style="float:right;width:70%;height:100%;" value=""  placeholder="Date To" />'+        
      '</div>'+
      
    '</div>'+

    '<div id="printableBorder" style="height:'+pa_height+'px;">'+      
      '<div id="printableArea">'+
        '<div id="pa_dtl">'+
        '</div>'+
      '</div>'+
    '</div>'+
        
  '</div>';
  
  JBE_OPEN_VIEW(dtl,'PRINTER','');
  mnu_repo();
  get_radio_ml(2);  
}

function mnu_rp_masterlist(){  
  var jmenu=
    '<div style="width:100%;height:100%;text-align:center;background:none;">'+      
      '<div class="class_footer" onclick="JBE_CLOSE_VIEW()" style="float:right;width:'+iif(JBE_MOBILE,'60','150')+'px;background:none;">'+
        '<img src="gfx/jclose.png"  alt="home image" />'+
        '<span>Exit</span>'+
      '</div>'+
    '</div>';
  dispMenu(false,jmenu);
}

function sel_filter_ml(id){    
  var box1=H_VIEW-(30);
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
          '<div id="d_'+i+'" class="cls_names" onclick="do_sel_filter_ml(&quot;'+id+'&quot;,&quot;'+aryDB[i][fld1]+'&quot;)" style="width:100%;height:30px;padding:5px;border:1px solid gray;">'+                        
            '<div style="float:left;width:50%;">'+aryDB[i][fld1]+'</div>'+
          '</div>';
        }
        dtl+=ddd+
      '</div>'+    
    '</div>';
      
  var dtl2=    
    '<div style="width:100%;height:100%;padding:5px;text-align:center;background:none;">'+
      '<input type="button" onclick="do_sel_filter_ml_empty(&quot;'+id+'&quot;)" style="float:left;width:100px;height:100%;" value="Clear">'+ 
      '<input type="button" onclick="do_sel_filter_ml_empty(&quot;CLEARALL&quot;)" style="float:left;width:100px;height:100%;margin-left:20px;" value="Clear All">'+ 
      '<input type="button" onclick="JBE_CLOSEBOX()" style="float:right;width:100px;height:100%;" value="Close">'+   
    '</div>';

  JBE_OPENBOX('div_name',tilt,dtl,dtl2); 
  JBE_SEARCH_BOX('filterInput','cls_names');
}
function do_sel_filter_ml(id,fld1){  
  document.getElementById(id).value=fld1;
  if(id=='fil_vax'){ document.getElementById('fil_lotno').value=''; }
  JBE_CLOSEBOX();
  get_prn_summ_ml();
}
function do_sel_filter_ml_empty(id){ 
  if(id=='CLEARALL'){
    document.getElementById('fil_area').value='';
    document.getElementById('fil_vax').value='';
    document.getElementById('fil_lotno').value='';
  }else{
    document.getElementById(id).value='';
  }
  JBE_CLOSEBOX();
  get_prn_summ_ml();
}


function get_radio_ml(v){
  //alert('get_radio_ml '+v);
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
    get_prn_summ_ml();
  }else if(v==2){
    document.getElementById('date_from').value=s_date;
    document.getElementById('date_to').value=e_date;    
    get_prn_summ_ml();
  }else if(v==3){
    document.getElementById('date_from').value=s_date;
    document.getElementById('date_to').value=e_date;   
    //document.getElementById('pa_dtl').innerHTML='';
  }
}

function chg_dateRange_ml(){
  let d1=document.getElementById('date_from').value;
  let d2=document.getElementById('date_to').value;
  if(!d1 || !d2){ return; }
  if(d1 > d2){ snackBar('ERROR: Invalid Dates'); return; }
  
  get_prn_summ_ml(); 
}

function get_prn_summ_ml(){  
  var v=parseInt(document.getElementById('div_opt').getAttribute('data-mode'));  

  let jdata=[ 
    { title:"Stock Master List", DB:DB_STOCK },
    { title:"Product Master List", DB:DB_PRODUCT },
    { title:"Supplier Master List", DB:DB_SUPPLIER },
    { title:"Area Master List", DB:DB_AREA },
    { title:"Location Master List", DB:DB_WHOUSE }
  ];

  var flds=[
    { title:"", fld:"stockno", type:"text", width:"0%", align:"left" },
    { title:"", fld:"prodno", type:"text", width:"0%", align:"left" },
    { title:"", fld:"loc", type:"text", width:"0%", align:"left" },
    { title:"Description", fld:"descrp", type:"text", width:"35%", align:"left" },
    { title:"Product", fld:"get_prod|prodno", type:"text", width:"20%", align:"left" },    
    { title:"Location", fld:"get_loc|loc", type:"text", width:"10%", align:"left" },
    { title:"Lot No", fld:"lotno", type:"text", width:"15%", align:"left" },
    { title:"Expiry", fld:"expiry", type:"date", width:"10%", align:"left" },
    { title:"Bundle", fld:"bundle", type:"text", width:"8%", align:"center" }     
  ];

  let repTilt=jdata[v].title;
  let FM_newArr=jdata[v].DB;

  var box2=0; 
  var box1=H_VIEW-(20+box2);
  
  //alert(FM_newArr.length+' = '+repTilt);
  
  //FM_newArr.sort(JBE_SORT_ARRAY(arySort));

  if(!FM_newArr.length){ 
    MSG_SHOW(vbOk,"EMPTY: ","Nothing to show.",function(){},function(){}); 
    return;
  }
  
  var date_from=document.getElementById('date_from').value;
  var date_to=document.getElementById('date_to').value;

  var dtl=
    reportHead(repTilt,date_to)+
        
    '<div id="div_name2" data-zoom=0 style="width:100%;height:100%;font-text:14px;padding:0px;background-color:white;">'+         
         
      '<div style="width:100%;height:30px;border:1px solid black;margin-top:5px;margin-bottom:5px;color:black;background:none;">'+
        '<div id="dv_hd" style="margin-top:0px;width:100%;height:100%;padding:5px;text-align:center;">';          
          for(var i=0;i<flds.length;i++){
            let m_disp='block';
            if(!flds[i].title){ m_disp='none'; }
            dtl+='<div style="display:'+m_disp+';float:left;width:'+flds[i].width+';height:100%;text-align:'+flds[i].align+';margin:0px;padding:0px;border:0px solid black;">'+flds[i].title+'</div>';
          }
          dtl+=
        '</div>'+
      '</div>'+          

      '<div id="dv_dt" data-line=0 style="width:100%;height:'+(box1-87+5)+'px;padding:0px;border:0px solid red;">';
        var ddd='';
        
        let sel_color='black';
        //let max_arySearch_len=div_Search.length;
        //alert('ob len:'+max_arySearch_len);
        //console.clear();
        for(var i=0;i<FM_newArr.length;i++){   
          ddd+=
          '<div id="d_'+i+'" class="cls_names" style="font-size:12px;width:100%;height:25px;padding:0px;border:1px solid gray;">';
            
            let z_dtl='';
            let cntr_fld=0;
            for(var z=0;z<flds.length;z++){
              //console.log('tulok:'+flds[z].fld);
              let fld=flds[z].fld;
              let fld_type=flds[z].type;
              let fld_val=FM_newArr[i][fld];

              
              //////////////////////////
              var ndx=fld.indexOf('|');
              var param='';
              if(ndx >= 0){
                param=fld.substr(ndx+1);
                fld=fld.substr(0,ndx);
              }      
              //console.log('the_fld:'+fld+'  the_val:'+fld_val);
              var fn = window[fld];
              let f_fn=false;
              if (typeof fn === "function"){ f_fn=true; fld_val=fn(FM_newArr[i][param]); }
              //////////////////////////
              
              
              //console.log('>>>  fld_val:'+fld_val+'   fld_type:'+fld_type);
              if(fld_type=='date'){ fld_val=JBE_DATE_FORMAT(fld_val,'YYYY-MM-DD'); }
              else if(fld_type=='double'){ fld_val=iif(fld_val,JBE_FORMAT_DOUBLE_TO_STR(fld_val),'0.00'); }
              else if(fld_type=='number'){ fld_val=iif(fld_val,JBE_FORMAT_INT_TO_STR(fld_val),'0'); }
              else if(fld_val==undefined){ fld_val=''; }

              let v_id='id="dd_'+fld+i+'"';
              sel_color='black';
              
              let m_disp='block';
              if(!flds[z].title){ m_disp='none'; }
              z_dtl+='<div '+v_id+' style="display:'+m_disp+';float:left;width:'+flds[z].width+';height:100%;padding:4px;border:0px solid red;overflow:auto;text-align:'+flds[z].align+';background:none;">'+fld_val+'</div>';
              
            }
                                      
            ddd+=z_dtl+
          '</div>';          
        }
        dtl+=ddd+
      '</div>'+    
    '</div>';

  document.getElementById('pa_dtl').innerHTML=dtl;
  //let dv_hd=document.getElementById('dv_hd');
  //let dv_dt=document.getElementById('dv_dt');
  //dv_hd.style.width=dv_dt.clientWidth+'px';
}
  