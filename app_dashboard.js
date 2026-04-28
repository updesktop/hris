function fm_dashboard(f_clear){   
  console.log('fm_dashboard');
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=true;
  get_app_default();
  let h_dashboard=22;
  let h_box1=350;
  //h_box1=window.innerHeight/2;
  //if(JBE_MOBILE){ h_box1=350; }
  let h_spaces=40;
  let h_box2=H_BODY-(h_dashboard+h_box1+h_spaces+10);

  let ddate=document.getElementById('hd_date').innerHTML;
  //let cb='JBE_CLOSE_VIEW2';
  let dtl=
  '<div style="display:block;width:100%;height:100%;font-size:18px;text-align:center;padding:10px;border:0px solid orange;background:	#d9e0e7;">'+  

    '<div style="width:100%;height:'+h_dashboard+'px;font-size:18px;padding:0px;font-weight:bold;text-align:left;border:0px solid gainsboro;background:none;">'+  
      '<div id="menu_open"" data-mode=0 onclick="openNav()" style="float:left;width:30px;height:100%;"><img src="gfx/ham.png" style="height:100%;" /></div>'+
      '<div  style="float:left;width:auto;height:100%;">DASHBOARD</div>'+
    '</div>'+
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    '<div style="display:block;width:100%;height:'+h_box1+'px;margin-top:15px;text-align:center;padding:0%;border:0px solid red;background:none;">'+

      '<div class="dash_box" style="margin-left:0px;background:none;">'+   //mediumaquamarine
        '<div style="border-radius:10px 10px 0 0;margin-left:0px;color:black;background:orange;">'+
          '<p id="id_row1_col1">0</p>'+   
          '<h1 onclick="">'+
            '<b id="lbl_row1_col1">Total Employees</b>'+
          '</h1>'+  
        '</div>'+  
        '<h2 style=""></h2>'+
        '<h3 id="dtl_row1_col1" data-row=0></h3>'+   
      '</div>'+

      '<div class="dash_box">'+
        '<div style="border-radius:10px 10px 0 0;background:#039be5;">'+
          '<p id="id_row1_col2">0</p>'+ 
          '<h1 onclick="disp_emptot(true)">'+
            '<b id="lbl_row1_col2">Male</b>'+
          '</h1>'+  
        '</div>'+  
        '<h2 style=""></h2>'+
        '<h3 id="dtl_row1_col2" data-row=0></h3>'+  
      '</div>'+

      '<div id="div_row1_col3" class="dash_box">'+
        '<div style="border-radius:10px 10px 0 0;background:#f000ff;">'+
          '<p id="id_row1_col3">0</p>'+   
          '<h1 onclick="disp_emptot(true)">'+
            '<b id="lbl_row1_col3">Female</b>'+
          '</h1>'+  
        '</div>'+  
        '<h2 style=""></h2>'+
        '<h3 id="dtl_row1_col3" data-row=0></h3>'+  
      '</div>'+

      '<div class="dash_box" style="float:right;">'+
        '<div style="border-radius:10px 10px 0 0;background:lightgreen;">'+
          '<p id="id_row1_col4">0</p>'+   
          '<h1 onclick="disp_emptot(true)">'+
            '<b id="lbl_row1_col4">New Employees</b>'+
          '</h1>'+  
        '</div>'+  
        '<h2 style=""></h2>'+
        '<h3 id="dtl_row1_col4" data-row=0></h3>'+ 
      '</div>'+

    '</div>'+

    '<div id="div_command" style="display:block;width:100%;height:'+h_box2+'px;margin-top:10px;font-size:14px;text-align:center;padding:5px;border:0px solid blue;background:white;">'+
      
    '</div>'+

  '</div>';
  document.getElementById('div_right').innerHTML=dtl;
  if(f_clear){
    document.getElementById('div_body').setAttribute('data-row',0);
    document.getElementById('div_body').setAttribute('data-row2',0);
  }
  disp_dashboard();
}

function disp_dashboard(){
  console.log('disp_dashboard >>>> '+DB_EMPLOYEE.length);
  let clor='black';
  let tot_emp=0; let tot_male=0; let tot_female=0; let tot_new=0;
  let arr_emp=[...DB_EMPLOYEE];
  //DB_TRANSFER2.sort(JBE_SORT_ARRAY(['type','descrp','expiry']));
  arr_emp.sort(JBE_SORT_ARRAY(['lname']));
  //alert(arr_emp.length);
  let arr_male=[]; let arr_female=[];
  let ctr_arr_male=0; let ctr_arr_female=0;
  let dtl_emp='<div id="dtl_emp_div" data-sv_row=0 data-sv_fg="" data-sv_bg="" style="width:100%;height:100%;padding:0px;overflow:auto;border:0px solid lightgray;">'; 
  let dtl_male=''; let dtl_female=''; let vname='';
  for(var i=0;i<arr_emp.length;i++){
    tot_emp++;
    vname=arr_emp[i].lname.trim()+', '+arr_emp[i].fname.trim()+' '+arr_emp[i].mname.slice(0,1)+'.';
    //'<div id="dtl_st_'+line_ctr+'" class="dtls_storage" data-clor="black" data-bg="none" onclick="JBE_HL_ROW('+line_ctr+',`dtl_location`,`dtl_st_`,`white`,`black`); document.getElementById(&quot;div_body&quot;).setAttribute(&quot;data-row2&quot;,'+line_ctr+');" ondblclick="launch_transfer(&quot;'+DB_TRANSFER2[k].stockno+'&quot;,&quot;'+DB_TRANSFER2[k].lotno+'&quot;,&quot;'+DB_TRANSFER2[k].loc+'&quot;)" style="width:100%;height:20px;text-align:center;cursor:context-menu;font-size:11px;padding:3px;font-weight:'+v_style+';font-size:'+v_fsize+'px;font-style:'+v_italic+';border:1px solid gray;color:black;background-color:'+bg+';">'+      
    dtl_emp+=
      '<div id="dtl_emp_'+tot_emp+'" class="dtls_storage" data-clor="black" data-bg="none" onclick="JBE_HL_ROW('+tot_emp+',`dtl_emp_div`,`dtl_emp_`,`white`,`black`); document.getElementById(&quot;div_body&quot;).setAttribute(&quot;data-row&quot;,'+tot_emp+');" ondblclick="launch_emp(&quot;'+arr_emp[i].empno+'&quot;)" style="width:100%;height:20px;text-align:left;cursor:pointer;padding:3px;font-size:11px;border-radius:0px;border:1px solid lightgray;">'+      
        '<div style="width:100%;height:100%;background:none;">'+vname+'</div>'+ 
      '</div>';

    if(arr_emp[i].gender==0){ 
      tot_male++;
      arr_male[ctr_arr_male]=arr_emp[i]; ctr_arr_male++;
      vname=arr_emp[i].lname.trim()+', '+arr_emp[i].fname.trim()+' '+arr_emp[i].mname.slice(0,1)+'.';
      dtl_male+=
      '<div style="width:100%;height:20px;text-align:left;padding:3px;font-size:11px;border-radius:0px;border:1px solid lightgray;">'+      
        '<div style="width:100%;height:100%;overflow:auto;background:none;">'+vname+'</div>'+ 
      '</div>';
    }else{
      tot_female++;
      arr_female[ctr_arr_female]=arr_emp[i]; ctr_arr_female++;
      vname=arr_emp[i].lname.trim()+', '+arr_emp[i].fname.trim()+' '+arr_emp[i].mname.slice(0,1)+'.';
      dtl_female+=
      '<div style="width:100%;height:20px;text-align:left;padding:3px;font-size:11px;border-radius:0px;border:1px solid lightgray;">'+      
        '<div style="width:100%;height:100%;overflow:auto;background:none;">'+vname+'</div>'+ 
      '</div>';
    }
  }
  dtl_emp+='</div>';

  if(!document.getElementById('id_row1_col1')){ return; }
  document.getElementById('id_row1_col1').innerHTML=tot_emp;
  document.getElementById('id_row1_col2').innerHTML=tot_male;
  document.getElementById('id_row1_col3').innerHTML=tot_female; 

  document.getElementById('dtl_row1_col1').innerHTML=dtl_emp; 
  document.getElementById('dtl_row1_col2').innerHTML=dtl_male; 
  document.getElementById('dtl_row1_col3').innerHTML=dtl_female; 
}

function launch_emp(empno){
  fm_employee('JBE_CLOSE_VIEW2');
  document.getElementById('tx_empno').value=empno;
  FM_DISP_REC(empno);
}

function get_employee_table(){
  let tbl='';
  axios.get('/api/get_all', { params: {tbl:'employee'} })
  .then(function (response) { 
    console.log('get_employee_table',response.data); 
    DB_EMPLOYEE = response.data; 
    })    
  .catch(function (error) { console.log(error); });
}

function get_storage_bal(stockno){
  let tot=0;
  for(var z=0;z<DB_TRANSFER2.length;z++){
    if(DB_TRANSFER2[z].stockno != stockno){ continue; }
    tot+=DB_TRANSFER2[z].balance;
  }
  return tot;
}

function launch_stockcard(v){
  rp_stockcard();
  let vname=JBE_GETFLD('descrp',DB_STOCK,'stockno',v);
  document.getElementById('fil_vax').setAttribute('data-stockno',v);  
  document.getElementById('fil_vax').value=vname;
  let d1=JBE_DATE_FORMAT(document.getElementById('date_from').value,'YYYY-MM-DD');
  let d2=JBE_DATE_FORMAT(document.getElementById('date_to').value,'YYYY-MM-DD');  
  prn_stockcard(d1,d2);
}

function disp_male_emp(n){
  //alert('n:'+n);
  let arr=[]; let ctr_arr=0;
  let v_total=0;  
  let v_amount=0; let v_totqty=0;
  DB_TRANSFER2.sort(JBE_SORT_ARRAY(['type','descrp','expiry']));
  if(DB_TRANSFER2.length==0){ return; }

  let v_type=0;
  let curdate=JBE_DATE_FORMAT(document.getElementById('hd_date').innerHTML,'YYYY-MM-DD');  
    
  for(var k=0;k<DB_TRANSFER2.length;k++){  
    if(DB_TRANSFER2[k].type != v_type){ continue; }    

    let stockno=DB_TRANSFER2[k].stockno;   
    let descrp=JBE_GETFLD('descrp',DB_STOCK,'stockno',stockno); 
    
    if(DB_TRANSFER2[k].balance <= 0){ continue; }

    let exdate=JBE_DATE_FORMAT(DB_TRANSFER2[k].expiry,'YYYY-MM-DD');   
    if(exdate < curdate){ continue; }
    let result=subtractDates(new Date(curdate),new Date(exdate));    
    //console.log(`${descrp} Difference: ${result.months} months and ${result.days} days`);
    if(result.months > n){ continue; }

    let rez=result.months+'m/'+result.days+'d';
    if(result.months==0){ rez=result.days+'d'; }

    arr[ctr_arr]={
      "stockno":stockno,
      "descrp":descrp,
      "months":result.months,
      "days":result.days,
      "rez":rez,

      "lotno":DB_TRANSFER2[k].lotno,
      "locname":DB_TRANSFER2[k].locname,
      "expiry":DB_TRANSFER2[k].expiry,
      "date_tf":DB_TRANSFER2[k].date_tf,
      "balance":DB_TRANSFER2[k].balance,
      "refno":DB_TRANSFER2[k].refno
    }
    ctr_arr++;
    v_amount+=Number(DB_TRANSFER2[k].balance) * Number(DB_TRANSFER2[k].cost);
    v_totqty+=Number(DB_TRANSFER2[k].balance);
  }

  let dtl='<div style="width:100%;height:100%;padding:0px;overflow:auto;border:0px solid lightgray;background:none;">';
  arr.sort(JBE_SORT_ARRAY(['months','days']));
  for(var k=0;k<arr.length;k++){
    let clor='gray';
    if(arr[k].months==0){
      if(arr[k].days > 14){ 
        clor='brown'; 
      }else if(arr[k].days > 7){ 
        clor='coral'; 
      }else{
        clor='red'; 
      }
    }
    let tooltip='Lot No. : [ '+arr[k].lotno+' ]\n'+                
                'Expiry &nbsp; : [ '+JBE_DATE_FORMAT(arr[k].expiry,'MMM DD, YYYY')+' ]\n'+
                'Location: [ '+arr[k].locname+' ]\n'+
                'Balance : [ '+JBE_FORMAT_INT_TO_STR(arr[k].balance)+' ]\n'+
                'Ref No. : [ '+arr[k].refno+' ]\n'+
                'TF-Date : [ '+JBE_DATE_FORMAT(arr[k].date_tf,'MMM DD, YYYY')+' ]';
    dtl+=
    '<div title="'+tooltip+'" style="width:100%;height:20px;cursor:context-menu;text-align:left;font-size:11px;padding:3px;border:1px solid lightgray;">'+      
      '<div style="float:left;width:50%;height:100%;overflow:auto;padding:0px;background:none;">'+arr[k].descrp+'</div>'+
      '<div style="float:left;width:18%;height:100%;text-align:center;color:'+clor+';background:none;">'+arr[k].rez+'</div>'+      
      '<div style="float:left;width:16%;height:100%;padding:0px;text-align:right;background:none;">'+JBE_FORMAT_INT_TO_STR(arr[k].balance)+'</div>'+
      '<div style="float:right;width:16%;height:100%;overflow:auto;padding:0px;text-align:right;background:none;">'+arr[k].locname+'</div>'+      
    '</div>';
    v_total++;    
  }
  dtl+='</div>';

  document.getElementById('id_male_emp').innerHTML=JBE_FORMAT_INT_TO_STR(v_total);  
  document.getElementById('dtl_male_emp').innerHTML=dtl;
  document.getElementById('dtl_total_a').innerHTML='Amount: '+JBE_FORMAT_DOUBLE_TO_STR(v_amount);
  document.getElementById('dtl_total_q').innerHTML='Qty: '+JBE_FORMAT_INT_TO_STR(v_totqty);
  //let vborder=1; 
  //if(v_total>0){ vborder=1; }
  //document.getElementById('dtl_male_emp').style.border=vborder+'px solid lightgray'; 
}

function subtractDates(date1, date2) {
  // Ensure date1 is the later date
  if (date1 < date2) {
    [date1, date2] = [date2, date1];
  }

  const yearsDiff = date1.getFullYear() - date2.getFullYear();
  const monthsDiff = date1.getMonth() - date2.getMonth();
  const daysDiff = date1.getDate() - date2.getDate();

  // Calculate total months difference
  let totalMonths = yearsDiff * 12 + monthsDiff;
  let remainingDays = daysDiff;

  // Adjust days if negative
  if (remainingDays < 0) {
    totalMonths -= 1; // Borrow one month
    const prevMonth = new Date(date1.getFullYear(), date1.getMonth() - 1, 1);
    remainingDays += new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).getDate(); // Days in the previous month
  }

  return { months: totalMonths, days: remainingDays };
}

function disp_storage(v_stockno,v_qty){    
  //alert('disp_storage: v_stockno: '+v_stockno);
  DB_TRANSFER2.sort(JBE_SORT_ARRAY(['type','stockno','expiry','lotno','loc']));
  if(DB_TRANSFER2.length==0){ return; }

  let v_type=document.getElementById('div_body').getAttribute('data-invty'); 
  let curdate=JBE_DATE_FORMAT(document.getElementById('hd_date').innerHTML,'YYYY-MM-DD');  
  
  let line_ctr=0;
  let tot_summ=0; let tot_var=0;
  let dtl_storage='';
  let bg='white'; let sv_stockno='';  let flag=0;

  document.getElementById('dtl_location').setAttribute('data-sv_row',0);
  //let dtl='<div id="dtl_box" data-sv_row=0 data-sv_fg="" data-sv_bg="" style="width:100%;height:100%;padding:0px;overflow:auto;border:0px solid lightgray;background:none;">';
  let dtl='<div id="dtl_box_st" data-sv_row=0 data-sv_fg="" data-sv_bg="" style="width:100%;height:100%;padding:0px;overflow:auto;border:0px solid lightgray;background:none;">';
  
  for(var k=0;k<DB_TRANSFER2.length;k++){  
    let stockno=DB_TRANSFER2[k].stockno;   
    let type=JBE_GETFLD('type',DB_STOCK,'stockno',stockno);  
    let descrp=JBE_GETFLD('descrp',DB_STOCK,'stockno',stockno);  
    let lotno=JBE_GETFLD('lotno',DB_STOCK,'stockno',stockno);
    let loc=JBE_GETFLD('loc',DB_STOCK,'stockno',stockno);
    if(type != v_type){ continue; }    
    if(v_stockno && v_stockno != stockno){ continue; }
    
    let clor='lightgray'; 
    let v_style='normal';
    let v_italic='normal';
    let v_fsize=10;
    if(DB_TRANSFER2[k].lotno==lotno && DB_TRANSFER2[k].loc==loc){ clor='green'; v_style='bold'; v_italic='italic'; v_fsize=11; }

    line_ctr++;

    if(sv_stockno != stockno){ 
      sv_stockno=stockno;
      if(flag==0){ 
        bg='white'; flag=1; 
      }else{ 
        bg='gray'; flag=0; 
      }
    }

    let v_expiry=JBE_DATE_FORMAT(DB_TRANSFER2[k].expiry,'YYYY-MM-DD');
    if(JBE_MOBILE){ v_expiry=v_expiry.substring(0,7); }

    dtl_storage+=
    '<div id="dtl_st_'+line_ctr+'" class="dtls_storage" data-clor="black" data-bg="none" onclick="JBE_HL_ROW('+line_ctr+',`dtl_location`,`dtl_st_`,`white`,`black`); document.getElementById(&quot;div_body&quot;).setAttribute(&quot;data-row2&quot;,'+line_ctr+');" ondblclick="launch_transfer(&quot;'+DB_TRANSFER2[k].stockno+'&quot;,&quot;'+DB_TRANSFER2[k].lotno+'&quot;,&quot;'+DB_TRANSFER2[k].loc+'&quot;)" style="width:100%;height:20px;text-align:center;cursor:context-menu;font-size:11px;padding:3px;font-weight:'+v_style+';font-size:'+v_fsize+'px;font-style:'+v_italic+';border:1px solid gray;color:black;background-color:'+bg+';">'+      
      '<div style="float:left;width:25%;height:100%;overflow:auto;padding:0px;background:none;margin:0;text-align:left;">'+descrp+'</div>'+
      '<div style="float:left;width:18%;height:100%;padding:0px;margin:0;background:none;color:cyan;"><a href="javascript:launch_bincard(&quot;'+DB_TRANSFER2[k].stockno+'&quot;,&quot;'+DB_TRANSFER2[k].lotno+'&quot;,&quot;&quot;);" style="color:blue;">'+DB_TRANSFER2[k].lotno+'</a></div>'+
      '<div style="float:left;width:17%;height:100%;padding:0px;margin:0;background:none;">'+v_expiry+'</div>'+
      '<div style="float:left;width:15%;height:100%;padding:0px;margin:0;background:none;"><a href="javascript:launch_rr(&quot;'+DB_TRANSFER2[k].refno+'&quot;);" style="color:magenta;">'+DB_TRANSFER2[k].refno+'</a></div>'+
      '<div style="float:left;width:10%;height:100%;padding:0px;margin:0;background:none;"><a href="javascript:launch_bincard(&quot;'+DB_TRANSFER2[k].stockno+'&quot;,&quot;'+DB_TRANSFER2[k].lotno+'&quot;,&quot;'+DB_TRANSFER2[k].loc+'&quot;);" style="color:orange;">'+DB_TRANSFER2[k].locname+'</a></div>'+
      '<div id="dtl_qty_st_'+line_ctr+'" style="float:right;width:15%;height:100%;text-align:right;background:none;">'+JBE_FORMAT_INT_TO_STR(DB_TRANSFER2[k].balance)+'</div>'+
    '</div>';
    tot_summ+=DB_TRANSFER2[k].balance;    
  }
  dtl+='</div>';
  //tot_var=v_qty-tot_summ;
  let lbl_var='';
  //if(tot_var){ lbl_var='{ '+JBE_FORMAT_INT_TO_STR(tot_var)+' }'; }
  document.getElementById('dtl_location').innerHTML=dtl_storage;
  document.getElementById('tot_summ').innerHTML='[ '+JBE_FORMAT_INT_TO_STR(tot_summ)+' ]';
  //document.getElementById('tot_var').innerHTML=lbl_var;
  let dv_hd=document.getElementById('hd_location');
  let dv_dt=document.getElementById('dtl_location');
  dv_hd.style.width=dv_dt.clientWidth+'px';
  show_tot_var(v_stockno);
}

function show_tot_var(v_stockno){
  if(!v_stockno){ document.getElementById('tot_var').innerHTML=''; return; }

  let totvar=0;
  let row=document.getElementById('div_body').getAttribute('data-row'); 
  let div=document.getElementById('dtl2_bal_'+row);
  if(!div){ return; }

  let mqty=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl2_bal_'+row).innerHTML);   
  let li=document.getElementsByClassName('dtls_storage');   
  for(var i=1;i<=li.length;i++){
    totvar+=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_qty_st_'+i).innerHTML);
  }
  totvar=totvar-mqty;
  document.getElementById('tot_var').innerHTML=iif(totvar==0,'','{ '+JBE_FORMAT_INT_TO_STR(totvar)+' }');
}

function launch_bincard(stockno,lotno,loc){
  document.getElementById('div_body').setAttribute('data-lotno',lotno);  
  rp_bincard(stockno,lotno,loc);
  //console.log('launch loc:'+loc);  
  document.getElementById('fil_loc').setAttribute('data-loc',loc);
  document.getElementById('fil_loc').value=iif(loc,JBE_GETFLD('name',DB_WHOUSE,'whcode',loc),'');
  document.getElementById('fil_vax').setAttribute('data-stockno',stockno);
  document.getElementById('fil_vax').value=JBE_GETFLD('descrp',DB_STOCK,'stockno',stockno);
  document.getElementById('fil_lotno').setAttribute('data-lotno',lotno);
  document.getElementById('fil_lotno').value=lotno;
  document.getElementById('div_opt').setAttribute('data-opt',0);
  document.getElementById('dvRange').disabled=true;  
  show_datefrom_bincard(false);
}

function launch_rr(stockno){
  fm_receive('JBE_CLOSE_VIEW2');
  document.getElementById('tx_trano').value=stockno;
  FM_DISP_REC(stockno);
}

function launch_transfer(stockno,lotno,loc){
  document.getElementById('div_body').setAttribute('data-lotno',lotno);  
  fm_transfer('JBE_CLOSE_VIEW2');
  let li=document.getElementsByClassName('dtls');    
  for(var i=1;i<=li.length;i++){
    let li_stockno=document.getElementById('dtl_stockno_'+i).innerHTML;    
    let li_lotno=document.getElementById('dtl_lotno_'+i).innerHTML;    
    let li_loc=document.getElementById('dtl_loc_'+i).innerHTML;    
    //console.log(i+']   li_stockno : '+li_stockno+'  li_lotno:'+li_lotno);    
    //if(i>2){ break; }
    if(li_stockno == stockno && li_lotno==lotno && li_loc==loc){      
      let running=JBE_GETFLD('lotno',DB_STOCK,'stockno',stockno);
      //document.getElementById('dtl_'+i).style.color=iif(lotno==running,'black','white');
      document.getElementById('dtl_'+i).style.color='white';
      document.getElementById('dtl_'+i).style.backgroundColor='black';
      document.getElementById('dtl_'+i).scrollIntoView();    
      //FM_hl_row(i);
      
      FM_BTN_LEVEL=2;
      edit_fm_transfer(FM_BTN_LEVEL);
      document.getElementById('div_FM_dtl_div2').setAttribute('data-row',i);   
      FM_EDIT_REC();
      break;
    }    
  }
}

function chg_emptot(){
  var flds=[    
    { title:"Product Description", fld:"prodname", type:"text", width:"50%", align:"center" },
    { title:"Code", fld:"prodno", type:"text", width:"25%", align:"center" },
    { title:"Type", fld:"type", type:"text", width:"25%", align:"center" }
  ];
  //FM_LOOKUP(true,fil_vax.value,newArr,[],'LOOKUP3','do_lu_prod_daily','prodname',flds,'prodno');
  let v_desc=document.getElementById('lbl_emptot').innerHTML;
  var ob=[
    { val:v_desc, fld:"prodname" }
  ];
  
  FM_LOOKUP2(true,v_desc,ob,DB_PRODUCT,['*descrp'],'LOOKUP','do_lu_prod_emptot',flds);
}
function do_lu_prod_emptot(ndx){	
  if(ndx == -1){ 
    return; 
  }
  let val=document.getElementById('dd_type'+ndx).innerHTML;
  document.getElementById('div_body').setAttribute('data-invty',val);
  disp_emptot(false);
}

function retNDX(s,arr){
  //console.log('retNDX search:'+s+' arrname:'+arr.name);
  let rval=-1;
  for(var ii=0;ii<arr.length;ii++){
    if(arr[ii]==s){ rval=ii; break; }
  }  
  return rval;
}

function disp_new_empt(curdate){
  //let curdate=JBE_DATE_FORMAT(document.getElementById('hd_date').innerHTML,'YYYY-MM-DD');  
  //alert(curdate);
  let arr=[]; let ctr_arr=0;
  let arr_stock=[];
  let arr_descrp=[];
  let arr_qty=[];
  let arr_area=[]; let ctr_arr_area=0;

  for(var i=0;i<DB_PTR2.length;i++){
    let v_date=JBE_DATE_FORMAT(DB_PTR2[i].ptrdate,'YYYY-MM-DD');
    if(v_date != curdate) { continue; }
    
    let v_stockno=DB_PTR2[i].stockno;
    let v_descrp=JBE_GETFLD('descrp',DB_STOCK,'stockno',v_stockno);
    let v_qty=parseInt(DB_PTR2[i].qty);

    let v_areano=DB_PTR2[i].areano;
    let v_areaname=JBE_GETFLD('name',DB_AREA,'areano',v_areano);
    let ob={
      "stockno":v_stockno,
      "areano":v_areano,
      "areaname":v_areaname,
      "qty":v_qty
    }
    arr_area[ctr_arr_area]=ob; ctr_arr_area++;
    
    let v_ndx = retNDX(v_stockno,arr_stock);
    //console.log('v_ndx:'+v_ndx);
    if(v_ndx == -1){ //not found
      arr_stock[ctr_arr]=v_stockno; 
      arr_descrp[ctr_arr]=v_descrp; 
      arr_qty[ctr_arr]=v_qty; 
      ctr_arr++;          
    }else{    //found
      arr_qty[v_ndx]=parseInt(arr_qty[v_ndx])+v_qty; 
    }
  }

  let aryVax=[]; let ctr_aryVax=0;
  for(var i=0;i<arr_qty.length;i++){
    let ob={
      "stockno":arr_stock[i],
      "descrp":arr_descrp[i],
      "qty":arr_qty[i],
      "bg":colorScheme[i]
    };
    aryVax[ctr_aryVax]=ob; ctr_aryVax++;
  }

  aryVax.sort(JBE_SORT_ARRAY(['*qty']));
  //arr_qty.sort(sortByMultipleKey(['q','username']));
  //arr_qty.sort(function(a, b){return b - a});
  let dtl='<div style="width:100%;height:100%;padding:0px;overflow:auto;border:0px solid lightgray;background:none;">';
  let v_total=0;
  for(var j=0;j<aryVax.length;j++){
    let dumStockno=aryVax[j].stockno;
    let tooltip=get_ch_area(dumStockno,arr_area);
    dtl+=
    '<div title="'+tooltip+'"style="width:100%;height:20px;cursor:context-menu;text-align:left;font-size:11px;padding:3px;border:1px solid lightgray;background:'+aryVax[j].bg+';">'+            
      '<div style="float:left;width:70%;height:100%;overflow:auto;padding:0px;background:none;">'+aryVax[j].descrp+'</div>'+      
      '<div style="float:right;width:30%;height:100%;padding:0px;text-align:right;background:none;">'+JBE_FORMAT_INT_TO_STR(aryVax[j].qty)+'</div>'+
    '</div>';
    v_total++;
  }
  dtl+='</div>';
  document.getElementById('dtl_new_empt').innerHTML=dtl;
  //let vborder=1; 
  //if(v_total>0){ vborder=1; }
  //document.getElementById('dtl_new_empt').style.border=vborder+'px solid lightgray'; 

  document.querySelector("#id_new_emp").innerHTML = '<canvas id="myPieChart" width="150" height="100" style="margin:0 auto;border:0px solid red;"></canvas>';
  let ctx = document.getElementById('myPieChart').getContext('2d');
  let myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      //labels: ['Red', 'Blue'],
      labels: arr_descrp,
      datasets: [{
        //data: [12, 19],
        data: arr_qty,
        /*
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],       
        
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        */
        backgroundColor:colorScheme,
        borderColor:colorScheme,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'none',
        },
        tooltip: {
          enabled: true,
        },
      }
    }
  });
  /// sub func
  function get_ch_area(stockno,area_arr){    
    let rval='';
    for(var ix=0;ix<area_arr.length;ix++){      
      //console.log('>>> '+area_arr[ix].stockno);
      if(area_arr[ix].stockno != stockno){ continue; }

      rval+=area_arr[ix].areaname+' [ Qty: '+area_arr[ix].qty+' ]\n';
    }
    //rval=ptrno+' [ '+areaname+' ]\n\n'+rval;
    return rval;
  }
}

function show_notes(){
  let ctr_today=0;  let dtl_today='';
  let ctr_tomm=0;   let dtl_tomm='';
  let ctr_seven=0;  let dtl_seven='';
  let f_show=false;
  
  axios.get('/api/get_all', { params: {tbl:'notif2'} })
  .then(function (response) { 
    DB_NOTIF2=response.data;
    let curdate=JBE_DATE_FORMAT(document.getElementById('hd_date').innerHTML,'YYYY-MM-DD'); 
     
    for(var i=0;i<DB_NOTIF2.length;i++){  
      let vdate=JBE_DATE_FORMAT(DB_NOTIF2[i].date,'YYYY-MM-DD');
      if(!vdate || vdate < curdate){ continue; }

      let diff=JBE_DATE_SUBSTRACT_DAYS(vdate,curdate);
      if(diff > 7){ continue; }

      let wday = weekday[new Date(vdate).getDay()].substring(0,3);

      if(diff==0){         
        ctr_today++; 
        dtl_today+='\u25C6 '+DB_NOTIF2[i].msg+'\n';        
      }else if(diff==1){         
        ctr_tomm++; 
        //dtl_tomm+=ctr_tomm.toString().padStart(2,' ')+'.) '+DB_NOTIF2[i].msg+'\n\n';        
        dtl_tomm+='\u25C6 '+DB_NOTIF2[i].msg+'\n';        
      }else if(diff > 1 && diff <= 7){ 
        ctr_seven++; 
        dtl_seven+='\u25C6 '+JBE_DATE_FORMAT(DB_NOTIF2[i].date,'MMM DD, YYYY')+' ['+wday+'] \u2B9E\u2B9E '+DB_NOTIF2[i].msg+'\n';     
      }      
      //console.log(diff+'::: vdate:'+vdate+' curdate:'+curdate);
    }
    //console.log('ctr_today:'+ctr_today);
    //console.log('ctr_tomm:'+ctr_tomm);
    //console.log('ctr_seven:'+ctr_seven);
    document.getElementById('hd_num1').innerHTML=ctr_today;
    document.getElementById('hd_num2').innerHTML=ctr_tomm;
    document.getElementById('hd_num3').innerHTML=ctr_seven;
    document.getElementById('hd_num1').title='TODAY:\n'+dtl_today;
    document.getElementById('hd_num2').title='TOMORROW:\n'+dtl_tomm;
    document.getElementById('hd_num3').title='COMING:\n'+dtl_seven;
      
    document.getElementById('hd_num1').style.display=iif(ctr_today > 0,'block','none');
    document.getElementById('hd_num2').style.display=iif(ctr_tomm > 0,'block','none');
    document.getElementById('hd_num3').style.display=iif(ctr_seven > 0,'block','none');
    let ctr=ctr_today+ctr_tomm+ctr_seven;
    document.getElementById('hd_notif').style.display=iif(ctr > 0,'block','none');
  })    
  .catch(function (error) { console.log(error); });   
}
