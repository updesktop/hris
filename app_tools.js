function fm_tools(){ 
  if(!JBE_CHK_USER(1)){ return; }
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;
  
  var dtl=
  '<div data-mode=0 style="width:100%;height:100%;font-size:18px;text-align:center;padding:0px;border:0px solid orange;background:white;">'+  

    '<div id="ptr_box" style="width:100%;height:25px;font-size:14px;text-align:center;padding:5px;background:'+JBE_CLOR2+';">'+  
      'Select Tools'+
    '</div>'+

    '<div id="ptr_dtl_box" style="width:100%;height:'+(H_VIEW-0)+'px;margin-top:0px;text-align:center;padding:2%;border:0px solid violet;background:white;">'+
      
      '<div id="btn_1"  onclick="fm_signatories()" class="btn_image2" style="background:'+arySysColors[0]+';">'+
        '<input type="image" src="gfx/jsig.png" />'+
        '<div>Signatories</div>'+
      '</div>'+
      '<div id="btn_4"  onclick="fm_returns(1)" class="btn_image2" style="background:'+arySysColors[1]+';">'+
        '<input type="image" src="gfx/jsetting.png" />'+
        '<div>Returns (Multi-Entry)</div>'+
      '</div>'+
      
    '</div>'+

  '</div>';

  JBE_OPEN_VIEW(dtl,'TOOLS','closeTOOLS');  
  mnu_fm_tools();
}

function fm_templates(){ 
  if(!JBE_CHK_USER(1)){ return; }
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;
  
  var dtl=
  '<div data-mode=0 style="width:100%;height:100%;font-size:18px;text-align:center;padding:0px;border:0px solid orange;background:white;">'+  

    '<div id="ptr_box" style="width:100%;height:25px;font-size:14px;text-align:center;padding:5px;background:'+JBE_CLOR2+';">'+  
      'Print Templates'+
    '</div>'+

    '<div id="ptr_dtl_box" style="width:100%;height:'+(H_VIEW-0)+'px;margin-top:0px;text-align:center;padding:2%;border:0px solid violet;background:white;">'+
      
      '<div id="btn_1"  onclick="prn_tmp_ptr(0)" class="btn_image2" style="background:'+arySysColors[0]+';">'+
        '<input type="image" src="gfx/jsetting.png" />'+
        '<div>Print RIS Template (NIP)</div>'+
      '</div>'+
      '<div id="btn_2"  onclick="prn_tmp_ptr(1)" class="btn_image2" style="background:'+arySysColors[1]+';">'+
        '<input type="image" src="gfx/jsetting.png" />'+
        '<div>Print RIS Template (COVAC)</div>'+
      '</div>'+
      '<div id="btn_2"  onclick="prn_tmp_ptr(3)" class="btn_image2" style="background:'+arySysColors[2]+';">'+
        '<input type="image" src="gfx/jsetting.png" />'+
        '<div>Print RIS Template (Long/Regular)</div>'+
      '</div>'+
            
      '<div id="btn_4"  onclick="prn_tmp_ret()" class="btn_image2" style="background:'+arySysColors[3]+';">'+
        '<input type="image" src="gfx/jsetting.png" />'+
        '<div>Print Return Slip Template</div>'+
      '</div>'+
      
    '</div>'+

  '</div>';

  JBE_OPEN_VIEW(dtl,'TOOLS','closeTOOLS');  
  mnu_fm_tools();
}

function repo_daily(){
  window.open('rep.html','_blank');
}

/*
function findWindowByName(windowName) {
  // Iterate through frames
  for (let i = 0; i < window.frames.length; i++) {
    console.log(windowName+'>>> '+window.frames[i].name);
    // Check if the frame has a name and it matches the desired name
    if (window.frames[i].name === windowName) {
      // Found the window, return the reference
      return window.frames[i];
    }
  }

  // Window not found
  return null;
}

// Example usage



  //alert(repo);


//function openOrFocusWindow() {
function show_repo(repo){  
  let wf=window.frames.length;
  console.log('window.frames.length:'+wf);
  let myWindow = findWindowByName(repo);
  console.log('repo:'+repo+' ==> '+myWindow);
  if (myWindow) {
    // Window found, do something with it
    myWindow.focus();
  } else {
    // Window not found, handle accordingly
    console.log("xWindow not found");
    window.open(repo);
  }
}
*/

function findWindowByName(windowName) {
  // Get a list of all open windows
  const windows = window.open('', '_blank');
  windows.document.write('<p>Checking windows...</p>');
  var windowList = windows.window.open('', '_blank');

  // Iterate through the list and search for the window with the given name
  for (let i = 0; i < windowList.length; i++) {
      if (windowList[i].name === windowName) {
          windows.document.write(`<p>Found window with name "${windowName}"</p>`);
          return windowList[i];
      }
  }
  windows.document.write(`<p>No window found with name "${windowName}"</p>`);
  return null;
}

function oshow_repo(repo){
// Example usage
  const windowToFind = findWindowByName(repo);
  console.log('windowToFind: '+windowToFind);
  if (windowToFind) {
    // The window was found, do something with it
    windowToFind.focus();
  } else {
    // The window was not found, handle accordingly
    alert('Window not found!');
  }
}

function show_repo(repo){
  window.open(repo,'_blank');
}
  
function test(){
  if(!confirm('Proceed?')){ return; }
  //alert(1);
  repl_fld_data('sysfile','appname','ENAD','clientno','RPD');
}

function closeTOOLS(){
  showMainPage();
}

function mnu_fm_tools(){
  var jmenu=
  '<div style="width:100%;height:100%;text-align:center;background:none;">'+
    '<div class="class_footer" onclick="showMainPage();" style="float:right;width:150px;background:none;">'+
      '<img src="gfx/jclose.png"  alt="home image" />'+
      '<span>Exit</span>'+
    '</div>'+
  '</div>';
  dispMenu(false,jmenu);
}

function prn_tmp_ptr(m){
  do_prn_ptr(m,'close_tmp_ptr',false);
}
function close_tmp_ptr(){   
  JBE_CLOSE_VIEW2();
  //mnu_fm_tools();
}

function prn_tmp_ret(){
  do_prn_ret('close_tmp_ret',false);
}
function close_tmp_ret(){   
  JBE_CLOSE_VIEW2();
  //mnu_fm_tools();
}

function newtab(){
  let jmode=1;
  let pa_height=H_VIEW-30;
  var dtl=  
  '<div id="div_opt" data-mode='+jmode+' data-opt=0 style="height:100%;width:100%;font-family:Arial Narrow,Arial,sans-serif;font-size:12px;padding:0px;border:1px solid blue;background:white;">'+

    '<div style="height:35px;width:100%;border:1px solid lightgray;background:none;">'+              
      '<div class="cls_daily" style="float:left;width:180px;height:100%;padding:5px;border:0px solid orange;">'+      
        '<span style="float:left;width:35%;height:100%;padding:3px 0 0 0;font-size:14px;font-weight:bold;background:none;">Product:</span>'+
        '<input type="text" id="fil_vax" data-prodno="" name="filter_opt" readonly onclick="sel_prod_daily(this.id)" '+
          'style="float:left;width:65%;height:100%;cursor:pointer;text-align:center;" placeholder="Select Product..." value="" />'+
        '<label for="fil_vax"></label>'+
      '</div>'+
      '<div class="cls_daily" style="float:right;width:155px;height:100%;padding:5px;border:0px solid green;">'+  
        '<span style="float:left;width:25%;height:100%;padding:3px 0 0 0;font-size:14px;font-weight:bold;background:none;">Date:</span>'+  
        '<input id="date_to" style="width:75%;" onchange="chg_date_daily()" type="date" value=""  placeholder="Date" />'+        
      '</div>'+
    '</div>'+    

    '<div id="printableBorder" style="height:'+pa_height+'px;">'+
      '<div id="printableArea">'+
        reportHead('Daily Inventory Report',new Date())+

        '<div style="width:100%;height:30px;margin-top:30px;font-size:14px;font-weight:bold;padding:5px 0 0 0;text-align:center;border:1px solid black;">'+      
          '<div style="float:left;width:40%;height:100%;">Description</div>'+
          '<div style="float:left;width:20%;height:100%;">Received</div>'+
          '<div style="float:left;width:20%;height:100%;">Issued</div>'+
          '<div style="float:left;width:20%;height:100%;">Balance</div>'+
        '</div>'+
        '<div id="pa_dtl">'+        
        '</div>'+
      '</div>'+
    '</div>'+
        
  '</div>';

  //JBE_OPEN_VIEW(dtl,'PRINTER','');
    
  
  JBE_REPORT(dtl);
  let f_main=true;
  //mnu_repo();
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
  show_datefrom_daily(true);
}