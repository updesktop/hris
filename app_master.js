function fm_master(){
  if(!CURR_USER){
    snackBar("Please Log In");
    return;
  }
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;
  
  var dtl=
  '<div data-mode=0 style="width:100%;height:100%;font-size:18px;text-align:center;padding:0px;border:0px solid orange;background:white;">'+  

    '<div id="ptr_box" style="width:100%;height:25px;font-size:14px;text-align:center;padding:5px;background:'+JBE_CLOR2+';">'+  
      'Select Master File'+
    '</div>'+


    '<div id="ptr_dtl_box" style="width:100%;height:'+(H_VIEW-0)+'px;margin-top:0px;text-align:center;padding:2%;border:1px solid lightgray;background:white;">'+
      
      '<div id="btn_1" onclick="fm_stock()" style="float:left;width:46%;cursor:pointer;border-radius:10px;padding:5px;margin:2%;background:'+arySysColors[0]+';">'+
        '<input type="image" src="gfx/jfolder.png"  style="height:80%;"/>'+
        '<div style="height:20%;color:white">Stock</div>'+
      '</div>'+
      '<div id="btn_2" onclick="fm_product()" style="float:left;width:46%;cursor:pointer;border-radius:10px;padding:5px;margin:2%;background:'+arySysColors[1]+';">'+
        '<input type="image" src="gfx/jfolder.png"  style="height:80%;"/>'+
        '<div style="height:20%;color:white">Product</div>'+
      '</div>'+
      '<div id="btn_3" onclick="fm_area()" style="float:left;width:46%;cursor:pointer;border-radius:10px;padding:5px;margin:2%;background:'+arySysColors[2]+';">'+
        '<input type="image" src="gfx/jfolder.png"  style="height:80%;"/>'+
        '<div style="height:20%;color:white">Sub Area</div>'+
      '</div>'+
      '<div id="btn_4" onclick="fm_supplier()" style="float:left;width:46%;cursor:pointer;border-radius:10px;padding:5px;margin:2%;background:'+arySysColors[3]+';">'+
        '<input type="image" src="gfx/jfolder.png"  style="height:80%;"/>'+
        '<div style="height:20%;color:white">Supplier</div>'+
      '</div>'+
      '<div id="btn_5" onclick="fm_wh()" style="float:left;width:46%;cursor:pointer;border-radius:10px;padding:5px;margin:2%;background:'+arySysColors[4]+';">'+
        '<input type="image" src="gfx/jfolder.png"  style="height:80%;"/>'+
        '<div style="height:20%;color:white">Storage/Location</div>'+
      '</div>'+      
      
    '</div>'+
    
  '</div>';

  JBE_OPEN_VIEW(dtl,'Master Files','closeMAST');  
  mnu_fm_mast();
}

function closeMAST(){
  showMainPage();
}
function mnu_fm_mast(){
  var jmenu=
  '<div style="width:100%;height:100%;text-align:center;background:none;">'+
    '<div class="class_footer" onclick="showMainPage();" style="float:right;width:'+iif(JBE_MOBILE,'60','150')+'px;background:none;">'+
      '<img src="gfx/jclose.png"  alt="home image" />'+
      '<span>Exit</span>'+
    '</div>'+
  '</div>';
  dispMenu(false,jmenu);
}

