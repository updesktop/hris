function fm_repo(){
  if(!JBE_CHK_USER(1)){ return; }
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;
  get_app_default();
  var dtl=
  '<div data-mode=0 style="width:100%;height:100%;font-size:18px;text-align:center;padding:0px;border:0px solid orange;background:white;">'+  

    '<div id="ptr_box" style="width:100%;height:25px;font-size:14px;text-align:center;padding:5px;background:'+JBE_CLOR2+';">'+  
      'Reports Facility'+
    '</div>'+

    '<div id="ptr_dtl_box" style="width:100%;height:'+(H_VIEW-0)+'px;margin-top:0px;text-align:center;padding:2%;border:1px solid lightgray;background:white;">'+
      
      '<div id="btn_8" onclick="fm_repo1()" class="btn_image2" style="background:'+arySysColors[6]+';">'+
        '<input type="image" src="gfx/jprn.png" />'+
        '<div>Master File Listing</div>'+
      '</div>'+
      '<div id="btn_9" onclick="fm_repo2()" class="btn_image2" style="background:'+arySysColors[7]+';">'+
        '<input type="image" src="gfx/jprn.png" />'+
        '<div>Summary Reports</div>'+
      '</div>'+
      
      '<div id="btn_1"  onclick="rp_ptr_summ(0)" class="btn_image2" style="background:'+arySysColors[0]+';">'+
        '<input type="image" src="gfx/jprn.png" />'+
        '<div>NIP Dispensed Summary</div>'+
      '</div>'+
      '<div id="btn_2"  onclick="rp_ptr_summ(1)" class="btn_image2" style="background:'+arySysColors[1]+';">'+
        '<input type="image" src="gfx/jprn.png" />'+
        '<div>COVAC Dispensed Summary</div>'+
      '</div>'+
      '<div id="btn_3" onclick="rp_stockcard()" class="btn_image2" style="background:'+arySysColors[2]+';">'+
        '<input type="image" src="gfx/jprn.png" />'+
        '<div>Stock Card</div>'+
      '</div>'+
      '<div id="btn_4" onclick="rp_bincard()" class="btn_image2" style="background:'+arySysColors[3]+';">'+
        '<input type="image" src="gfx/jprn.png" />'+
        '<div>BIN Card</div>'+
      '</div>'+
      '<div id="btn_5" onclick="rp_daily()" class="btn_image2" style="background:'+arySysColors[4]+';">'+
        '<input type="image" src="gfx/jprn.png" />'+
        '<div>Daily Inventory</div>'+
      '</div>'+
      '<div id="btn_6" onclick="rp_daily()" class="btn_image2" style="background:'+arySysColors[5]+';">'+
        '<input type="image" src="gfx/jprn.png" />'+
        '<div>Stock Ledger</div>'+
      '</div>'+
      
      
      
    '</div>'+

  '</div>';

  JBE_OPEN_VIEW2(dtl,'REPORTS','close_main_repo');  
  mnu_main_repo(0);
}

function close_main_repo(){
  alert(' bye report');
  JBE_CLOSE_VIEW2();
  //showMainPage();
}

function init_report(tilt,vhead,vhtml){
  let pa_height=H_BODY-(30+50+vhead+14);
  //if(JBE_MOBILE){ pa_height=H_BODY-250; }

  var dtl=  
  '<div style="height:100%;width:100%;border:1px solid lightgray;padding:5px;">'+

    '<div style="height:100%;width:100%;border:1px solid black;padding:0px;">'+

      '<div id="div_rep_hd" data-mode=0 data-opt=0 style="height:30px;width:100%;font-size:14px;font-weight:bold;border:1px solid black;background:'+JBE_CLOR2+';">'+
        '<span id="div_rep_BACK" style="float:left;width:30px;height:100%;cursor:pointer;padding:0px;text-align:left;">'+
          '<img src="gfx/jprev.png" onclick="JBE_CLOSE_VIEW2()" style="height:100%;" alt="call image" />'+
        '</span>'+         
        '<span style="float:left;width:auto;height:100%;text-align:left;padding:5px;color:white;background:none;">'+tilt+'</span>'+
        '<span style="float:right;width:auto;height:100%;text-align:right;padding:5px;background:none;">PRINTER</span>'+
      '</div>'+

      '<div id="div_init_report_head" style="height:'+vhead+'px;width:100%;padding:0px;border:0px solid black;background:none;">'+vhtml+'</div>'+

      '<div id="printableBorder" style="height:'+pa_height+'px;border:1px solid black;">'+      
        '<div id="printableArea">'+
          '<div id="pa_dtl">'+
          '</div>'+
        '</div>'+
      '</div>'+

      '<div id="div_repo" style="height:50px;width:100%;font-family:Arial Narrow,Arial,sans-serif;font-size:12px;font-weight:bold;padding:5px;border:1px solid black;background:'+JBE_CLOR2+';">'+
      '</div>'+

    '</div>'+

  '</div>';
  return dtl;
}

function mnu_main_repo(v){
  //alert('v:'+v);
  let jfunc='close_main_repo()';
  if(v==1){ jfunc='JBE_CLOSE_VIEW2()'; }
  var jmenu=
    '<div style="width:100%;height:100%;text-align:center;background:none;">'+
      //'<div class="class_footer" onclick="close_main_repo();" style="float:right;width:'+iif(JBE_MOBILE,'60','150')+'px;background:none;">'+
      '<div class="class_footer" onclick="'+jfunc+';" style="float:right;width:'+iif(JBE_MOBILE,'60','150')+'px;background:none;">'+
        '<img src="gfx/jclose.png"  alt="home image" />'+
        '<span>Exit</span>'+
      '</div>'+
    '</div>';
  dispMenu('div_repo',jmenu);
}

function closeREPO(){
  JBE_CLOSE_VIEW2();
  //mnu_main_repo(0);
}
function mnu_repo(repTilt){  
  var jmenu=  
  '<div style="width:100%;height:100%;">'+
    '<div onclick="JBE_PRINTDIV(&quot;printableArea&quot;,&quot;REPORT&quot;)" style="float:left;width:20%;height:100%;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jprn.png" alt="call image" />'+
        '<span>Print</span>'+
      '</div>'+
    '</div>'+       
    '<div onclick="JBE_PRINT_PDF(&quot;printableArea&quot;,&quot;REPORT&quot;)" style="float:left;width:20%;height:100%;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jpdf.png" alt="call image" />'+
        '<span>PDF</span>'+
      '</div>'+
    '</div>'+  
    '<div onclick="JBE_EXPORT_XLS(&quot;printableArea&quot;,&quot;'+repTilt+'&quot;)" style="float:left;width:20%;height:100%;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jpdf.png" alt="call image" />'+
        '<span>Excel</span>'+
      '</div>'+
    '</div>'+       
    '<div onclick="get_app_default();snackBar(&quot;Refreshed...&quot;)" style="float:left;width:20%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jrefresh.png" alt="call image" />'+
        '<span>Refresh</span>'+
      '</div>'+
    '</div>'+       
    '<div onclick="closeREPO();" style="float:right;width:20%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jclose.png"  alt="home image" />'+
        '<span>Close</span>'+
      '</div>'+
    '</div>'+
  '</div>';
  dispMenu('div_repo',jmenu);  
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function fm_repo1(){
  if(!JBE_CHK_USER(1)){ return; }
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;
  //get_app_default();
  
  var dtl=
  '<div data-mode=0 style="width:100%;height:100%;font-size:18px;text-align:center;padding:0px;border:0px solid orange;background:white;">'+  

    '<div id="ptr_box" style="width:100%;height:25px;font-size:14px;text-align:center;padding:5px;background:'+JBE_CLOR2+';">'+  
      'Master List Reports'+
    '</div>'+

    '<div id="ptr_dtl_box" style="width:100%;height:'+(H_VIEW-0)+'px;margin-top:0px;text-align:center;padding:2%;border:1px solid lightgray;background:white;">'+
      
      '<div id="btn_1"  onclick="rp_masterlist(0)" class="btn_image2" style="background:'+arySysColors[2]+';">'+
        '<input type="image" src="gfx/jprn.png" />'+
        '<div>Stock Master List</div>'+
      '</div>'+
      '<div id="btn_2"  onclick="rp_masterlist(1)" class="btn_image2" style="background:'+arySysColors[3]+';">'+
        '<input type="image" src="gfx/jprn.png" />'+
        '<div>Product Master List</div>'+
      '</div>'+      
      '<div id="btn_3" onclick="rp_masterlist(2)" class="btn_image2" style="background:'+arySysColors[1]+';">'+
        '<input type="image" src="gfx/jprn.png" />'+
        '<div>Supplier Master List</div>'+
      '</div>'+
      '<div id="btn_4" onclick="rp_masterlist(3)" class="btn_image2" style="background:'+arySysColors[4]+';">'+
        '<input type="image" src="gfx/jprn.png" />'+
        '<div>Area Master List</div>'+
      '</div>'+
      '<div id="btn_5" onclick="rp_masterlist(4)" class="btn_image2" style="background:'+arySysColors[0]+';">'+
        '<input type="image" src="gfx/jprn.png" />'+
        '<div>Location Master List</div>'+
      '</div>'+
      
    '</div>'+

  '</div>';

  JBE_OPEN_VIEW2(dtl,'Master List Reports','');  
  mnu_main_repo(1);
}

function fm_repo2(){
  if(!JBE_CHK_USER(1)){ return; }
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;
  //get_app_default();
  var dtl=
  '<div data-mode=0 style="width:100%;height:100%;font-size:18px;text-align:center;padding:0px;border:0px solid orange;background:white;">'+  

    '<div id="ptr_box" style="width:100%;height:25px;font-size:14px;text-align:center;padding:5px;background:'+JBE_CLOR2+';">'+  
      'Summary Reports'+
    '</div>'+

    '<div id="ptr_dtl_box" style="width:100%;height:'+(H_VIEW-0)+'px;margin-top:0px;text-align:center;padding:2%;border:1px solid lightgray;background:white;">'+
      
      '<div id="btn_1"  onclick="rp_summary(1)" class="btn_image2" style="background:'+arySysColors[3]+';">'+
        '<input type="image" src="gfx/jprn.png" />'+
        '<div>Stock Receiving Summary</div>'+
      '</div>'+
      '<div id="btn_2"  onclick="rp_summary(2)" class="btn_image2" style="background:'+arySysColors[2]+';">'+
        '<input type="image" src="gfx/jprn.png" />'+
        '<div>PTR Summary</div>'+
      '</div>'+
      '<div id="btn_3" onclick="rp_summary(3)" class="btn_image2" style="background:'+arySysColors[1]+';">'+
        '<input type="image" src="gfx/jprn.png" />'+
        '<div>Returns Summary</div>'+
      '</div>'+
      '<div id="btn_4" onclick="rp_summary(4)" class="btn_image2" style="background:'+arySysColors[0]+';">'+
        '<input type="image" src="gfx/jprn.png" />'+
        '<div>Adjustments Summary</div>'+
      '</div>'+
      
    '</div>'+

  '</div>';

  JBE_OPEN_VIEW2(dtl,'Summary Reports','');  
  mnu_main_repo(1);
}
