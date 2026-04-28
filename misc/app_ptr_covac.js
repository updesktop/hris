function main_ptr(vType){
  var aryType=['NIP','COVAC'];
  var aryPrefix=['NIP ','C19 '];
  var dtl=
  '<div style="width:100%;height:100%;font-size:12px;text-align:center;padding:0px;border:0px solid black;background:white;">'+  

    '<div id="ptr_head" data-trano="" data-ptrType='+vType+' data-mode=0 style="width:100%;height:130px;text-align:center;padding:10px 5px 0px 5px;background:	#808080;border:1px solid lightgray;background:none;">'+  

      '<div style="width:100%;height:50%;border:0px solid red;">'+

        '<div class="class_mtr0" style="float:left;width:43%;">'+        
          '<span class="class_mtr1" style="width:25%;">Date:</span>'+        
          '<input id="ptrdate" onchange="chg_date()" type="date" style="width:75%;height:100%;" value="" placeholder="Date" />'+
          '</span>'+
        '</div>'+

        '<div class="class_mtr0" style="float:right;width:55%;">'+        
          '<span class="class_mtr1">PTR#:</span>'+        
            '<input type="text" id="trano" class="class_mtr2" onchange="chk_trano(this.value,'+vType+')" style="width:55%;text-align:center;color:red;" value="'+aryPrefix[vType]+'" />'+
            '<button id="btn_trano" style="float:right;width:40px;height:100%;font-weight:bold;margin-right:3px;border-radius:5px;color:white;background:'+JBE_CLOR+';" onclick="sel_trano()">...</button>'+
          '</span>'+
        '</div>'+     

      '</div>'+

      '<div class="class_mtr0">'+        
        '<span class="class_mtr1">Sub Area:</span>'+        
          '<span id="sub_area" data-areano="" class="class_mtr2" style="width:50%;color:black;"></span>'+
          '<button id="btn_name" style="float:right;width:40px;height:100%;font-weight:bold;margin-right:3px;border-radius:5px;color:white;background:'+JBE_CLOR+';" onclick="sel_sub_area()">...</button>'+
        '</span>'+
      '</div>'+ 

    '</div>'+

    '<div id="ptr_body" style="display:block;width:100%;height:240px;text-align:center;padding:5px;background:none;">'+            

      //'<div id="ptr_div1" style="width:100%;height:40px;font-size:11px;color:navy;border:1px solid lightgray;padding:0px;color:white;background:#36454F;">'+
      '<div id="ptr_div1" style="width:100%;height:40px;font-size:11px;color:navy;border:1px solid lightgray;padding:0px;color:white;background:'+JBE_CLOR2+';">'+
      
        '<div class="class_mtr0" style="float:left;width:15%;height:100%;">'+        
          '<span class="class_mtr1" style="width:100%;">Date Acquired</span>'+
        '</div>'+
        '<div class="class_mtr0" style="float:left;width:21%;height:100%;">'+        
          '<span class="class_mtr1" style="width:100%;">Description</span>'+
        '</div>'+
        '<div class="class_mtr0" style="float:left;width:19%;height:100%;">'+        
          '<span class="class_mtr1" style="width:100%;">Lot Number</span>'+
        '</div>'+
        '<div class="class_mtr0" style="float:left;width:10%;height:100%;">'+        
          '<span class="class_mtr1" style="width:100%;">QTY</span>'+
        '</div>'+
        '<div class="class_mtr0" style="float:left;width:16%;height:100%;">'+        
          '<span class="class_mtr1" style="width:100%;">Unit Cost</span>'+
        '</div>'+
        '<div class="class_mtr0" style="float:left;width:19%;height:100%;">'+        
          '<span class="class_mtr1" style="width:100%;text-align:center;">Total</span>'+
        '</div>'+

      '</div>'+

      //details item
      '<div id="ptr_dtl" data-row=0 style="width:100%;height:100px;margin-top:5px;overflow:auto;border:1px solid lightgray;padding:0px;background:none;">'+

      '</div>'+

    '</div>'+

  '</div>';
                          // 0123456789012
  JBE_OPEN_VIEW(dtl,aryType[vType],'close_ptr');    
  let h_ptr_body=(H_VIEW-parseInt(document.getElementById('ptr_head').style.height)+25);+'px';
  document.getElementById('ptr_body').style.height=h_ptr_body+'px';
  document.getElementById('ptr_dtl').style.height=(h_ptr_body-55)+'px';      
  init_ptr();  
}

function close_ptr(){
  //alert('going to close:'+p);
  pmode=document.getElementById('ptr_head').getAttribute('data-mode');
  if(pmode==1){ return false; }
  mnu_fm_ptr();
}

function chk_trano(trano,ptrType){
  var aryPrefix=['NIP ','C19 '];
  //alert('trano.substring(0,4):'+trano.substring(0,4));
  //alert('aryPrefix[ptrType]:'+aryPrefix[ptrType]);
  //alert(ptrType);
  if(trano.substring(0,4) != aryPrefix[ptrType]){
    snackBar('ERROR: Prefix should be '+aryPrefix[ptrType]);
    document.getElementById('trano').value=aryPrefix[ptrType];
    document.getElementById('trano').focus();
    //init_ptr();
    return;
  }

  let f_found=false;
  let v_type=0;
  for(var i=0;i<DB_PTR.length;i++){
    if(trano==DB_PTR[i].trano){
      v_type=DB_PTR[i].type;
      f_found=true;
      break;
    }
  }
  if(f_found){
    if(ptrType != v_type){
      //alert('dili mao'); 
      document.getElementById('trano').value='';
      init_ptr();
      return;
    }
    
    

    document.getElementById('ptr_head').setAttribute('data-trano',trano);  
    //document.getElementById('trano').value=v;  
    disp_ptr();
  }else{
    document.getElementById('ptr_head').setAttribute('data-mode',1);
    edit_ptr();
  }
}

function chg_date(){
  var dataMode=document.getElementById('ptr_head').getAttribute('data-mode');
  alert('change activated '+dataMode);
}


function init_ptr(){
  document.getElementById('back_view2').style.display='block';
  document.getElementById('cap_viewMid2').innerHTML='';
  document.getElementById('ptr_head').setAttribute('data-mode',0);
  document.getElementById('ptrdate').value=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');
  document.getElementById('ptrdate').disabled=true;
  document.getElementById('trano').value='';
  document.getElementById('trano').disabled=false;
  document.getElementById('ptr_head').setAttribute('data-trano','');
  document.getElementById('sub_area').innerHTML='';
  document.getElementById('btn_trano').disabled=false;  
  document.getElementById('btn_name').disabled=true;
  document.getElementById('ptr_dtl').innerHTML='';
  mnu_init_ptr();
}
function mnu_init_ptr(){
  var jmenu=  
  '<div style="width:100%;height:100%;">'+
    '<div onclick="new_ptr()" style="float:left;width:33%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jadd.png" alt="call image" />'+
        '<span>New</span>'+
      '</div>'+
    '</div>'+       
    '<div onclick="refresh_ptr()" style="float:left;width:34%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jrefresh.png" alt="call image" />'+
        '<span>Refresh</span>'+
      '</div>'+
    '</div>'+       
    '<div onclick="JBE_CLOSE_VIEW()" style="float:right;width:33%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jclose.png"  alt="home image" />'+
        '<span>Close</span>'+
      '</div>'+
    '</div>'+    
  '</div>';
  dispMenu(false,jmenu);  
}

function refresh_ptr(){
  get_app_default();
  snackBar('Refresh...');
}

function disp_ptr(){  
  document.getElementById('back_view2').style.display='none';
  document.getElementById('cap_viewMid2').innerHTML='Display';
  document.getElementById('trano').disabled=true;  
  document.getElementById('btn_trano').disabled=false;  
  document.getElementById('ptrdate').disabled=true;  
  document.getElementById('btn_name').disabled=true;  
  document.getElementById('ptr_head').setAttribute('data-mode',0);
  document.getElementById('ptr_dtl').setAttribute('data-row',0);  

  //var trano=document.getElementById('ptr_head').getAttribute('data-trano');
  var trano=document.getElementById('trano').value;
  
  var aryDB=JBE_GETARRY(DB_PTR,'trano',trano);hl_row
  var ptrdate=JBE_DATE_FORMAT(aryDB.ptrdate,'MM-DD-YYYY');  
  var sub_area=JBE_GETFLD('name',DB_AREA,'areano',aryDB.areano);
  document.getElementById('ptrdate').value=JBE_DATE_FORMAT(ptrdate,'YYYY-MM-DD');    
  document.getElementById('sub_area').innerHTML=sub_area;
  document.getElementById('sub_area').setAttribute('data-areano',aryDB.areano);

  var dtl='';
  var line_ctr=0;
  
  for(var i=0;i<DB_PTR2.length;i++){
    if(DB_PTR2[i].trano != trano){ continue; }
    
    let v_date=JBE_DATE_FORMAT(DB_PTR2[i].date,'MM-DD-YYYY');    
    let v_descrp=JBE_GETFLD('descrp',DB_STOCK,'stockno',DB_PTR2[i].stockno);
    var v_expiry=JBE_GETFLD2('expiry',DB_RECEIVE2,
      [
        { "fld":"stockno","val":DB_PTR2[i].stockno },
        { "fld":"lotno","val":DB_PTR2[i].lotno }
      ]
    );    
    v_expiry=JBE_DATE_FORMAT(v_expiry,'MM-DD-YYYY');
    
    line_ctr++;    
    //alert(DB_PTR2[i].stockno+' lotno '+DB_PTR2[i].lotno+' vs '+v_expiry);
    var fg='black';
    //if(DB_RECEIVE2[i].running=='1'){ fg='red'; }
    dtl+=
    '<div id="dtl_'+line_ctr+'" data-running='+0+' class="dtls" onclick="hl_row('+line_ctr+')" style="display:block;width:100%;height:40px;margin-top:0px;border:0px solid red;padding:0px;background:none;">'+

      '<div class="class_mtr0" style="display:none;float:left;width:19%;height:100%;">'+        
        '<span id="dtl_expiry_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+v_expiry+'</span>'+
        '<span id="dtl_stockno_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+DB_PTR2[i].stockno+'</span>'+
      '</div>'+

      '<div class="class_mtr0" style="float:left;width:15%;height:100%;">'+        
        '<span id="dtl_date_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+v_date+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:21%;height:100%;">'+        
        '<span id="dtl_vax_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;overflow:auto;">'+v_descrp+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:19%;height:100%;">'+        
        '<span id="dtl_lotno_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;overflow:auto;">'+DB_PTR2[i].lotno+'</span>'+
      '</div>'+      
      '<div class="class_mtr0" style="float:left;width:10%;height:100%;">'+        
        '<span id="dtl_qty_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:center;padding:6px 0 0 0;">'+JBE_FORMAT_INT_TO_STR(DB_PTR2[i].qty)+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:16%;height:100%;">'+        
        '<span id="dtl_cost_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:right;padding:6px 0 0 0;">'+JBE_FORMAT_DOUBLE_TO_STR(DB_PTR2[i].cost)+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:19%;height:100%;">'+        
        '<span id="dtl_amount_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:right;padding:6px 0 0 0;">'+JBE_FORMAT_DOUBLE_TO_STR(DB_PTR2[i].amount)+'</span>'+
      '</div>'+

    '</div>';
    
  }
  document.getElementById('ptr_dtl').innerHTML=dtl;
  mnu_disp_ptr();
}
function mnu_disp_ptr(){
  var jmenu=  
  '<div style="width:100%;height:100%;">'+
    '<div onclick="edit_ptr()" style="float:left;width:25%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jedit.png" alt="call image" />'+
        '<span>Edit</span>'+
      '</div>'+
    '</div>'+       
    '<div onclick="del_ptr()" style="float:left;width:25%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jdele.png" alt="call image" />'+
        '<span>Delete</span>'+
      '</div>'+
    '</div>'+       
    '<div onclick="init_ptr()" style="float:right;width:25%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jclose.png"  alt="home image" />'+
        '<span>Close</span>'+
      '</div>'+
    '</div>'+
    '<div onclick="prn_ptr()" style="float:right;width:25%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jprn.png"  alt="home image" />'+
        '<span>Print</span>'+
      '</div>'+
    '</div>'+
  '</div>';
  dispMenu(false,jmenu);
}
function hl_row(v){  
  if(v==0){ return; }
  
  if(document.getElementById('cap_viewMid2').innerHTML != 'Edit'){ return; }

  var curRow=document.getElementById('ptr_dtl').getAttribute('data-row');  
    
  if(curRow > 0){ 
    var fg='black';
    //if(DB_RECEIVE2[i].running=='1'){ fg='red'; }
    document.getElementById('dtl_'+curRow).style.color='black'; 
    document.getElementById('dtl_'+curRow).style.background='none'; 
  }
  document.getElementById('dtl_'+v).style.color='white';
  document.getElementById('dtl_'+v).style.background='black';
  document.getElementById('ptr_dtl').setAttribute('data-row',v);  
}

function new_ptr(){  
  document.getElementById('ptr_head').setAttribute('data-mode',1); //add mode
  let ptrType=document.getElementById('ptr_head').getAttribute('data-ptrType');
  //alert(ptrType);
  let prfx='NIP ';
  if(ptrType==1){ prfx='C19 '; }

  var newArr = DB_PTR.filter(function(DB_PTR) {
    return DB_PTR.type == ptrType;
  });
  newArr.sort(JBE_SORT_ARRAY(['trano']));

  var last_trano='1';
  let last_date=new Date();
  let v_date=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');
  if(newArr.length > 0){ 
    last_trano=newArr[newArr.length-1].trano; 
    last_date=JBE_DATE_FORMAT(newArr[newArr.length-1].ptrdate,'YYYY-MM-DD');
    if(last_date > v_date){v_date=last_date; }
    document.getElementById('ptrdate').value=v_date;  
  }
  var new_trano=prfx+v_date;
  var v_num=0;
  
  if(last_trano.substring(0,14) == new_trano){
    v_num=parseInt(last_trano.substring(15,17))+1;
  }else{
    v_num=1;
  }
  new_trano=new_trano+'-'+v_num.toString().padStart(2,0);  
  document.getElementById('trano').value=new_trano;  
  document.getElementById('trano').disabled=false;
  document.getElementById('btn_name').disabled=false;
  edit_ptr();
}

function edit_ptr(){  
  var dataMode=document.getElementById('ptr_head').getAttribute('data-mode');
  var f_add=iif(dataMode==1,true,false);
  document.getElementById('back_view2').style.display='none';
  document.getElementById('cap_viewMid2').innerHTML=iif(f_add,'Add','Edit');
  document.getElementById('ptrdate').disabled=false;
  document.getElementById('trano').disabled=!f_add;
  document.getElementById('btn_name').disabled=false;
  
  //document.getElementById('trano').innerHTML=document.getElementById('ptr_head').getAttribute('data-trano');  
  mnu_edit_ptr(f_add);
  var len_dtls=document.querySelectorAll('.dtls').length;   
  if(len_dtls){ hl_row(1); }
}
function mnu_edit_ptr(f_add){  
  var jFunc='disp_ptr';
  if(f_add){ jFunc='init_ptr'; }  
  var jmenu=  
  '<div style="width:100%;height:100%;">'+

    '<div onclick="add_item_ptr(true)" style="float:left;width:15%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jadd2.png" alt="call image" />'+
        '<span>Add</span>'+
      '</div>'+
    '</div>'+       
    '<div id="div_edit_item" onclick="add_item_ptr(false)" style="float:left;width:15%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jedit.png" alt="call image" />'+
        '<span>Edit</span>'+
      '</div>'+
    '</div>'+       
    '<div id="div_edit_item" onclick="del_item_ptr()" style="float:left;width:15%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jdele.png" alt="call image" />'+
        '<span>Del</span>'+
      '</div>'+
    '</div>'+   
    '<div id="div_get_item" onclick="copy_items(false)" style="float:left;width:17%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jproduct.png" alt="call image" />'+
        '<span>Copy</span>'+
      '</div>'+
    '</div>'+       
    
    '<div onclick="'+jFunc+'()" style="float:right;width:20%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jcancel.png"  alt="home image" />'+
        '<span>Cancel</span>'+
      '</div>'+
    '</div>'+
    '<div onclick="save_ptr()" style="float:right;width:17%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jsave.png" alt="call image" />'+
        '<span>Save</span>'+
      '</div>'+
    '</div>'+           

  '</div>';
  dispMenu(false,jmenu);
  document.getElementById('btn_trano').disabled=true;
}

function copy_items(){  
  let ptrType=document.getElementById('ptr_head').getAttribute('data-ptrType');
  var newArr = DB_PTR.filter(function(DB_PTR) {
    return DB_PTR.type == ptrType;
  });
  newArr.sort(JBE_SORT_ARRAY(['*trano']));
  //alert('ptrType:'+ptrType);
  var box2=0; 
  var box1=H_VIEW-(20+box2);
  var tilt='Copy PTR';  
  var dtl=          
    '<div id="div_name" data-zoom=0 style="width:100%;height:'+box1+'px;font-text:14px;padding:0px;background-color:white;overflow:none;">'+         
      '<div style="width:100%;height:40px;padding:2px;text-align:center;color:'+JBE_TXCLOR1+';background:'+JBE_CLOR+';">'+
          '<input id="filterInput" type="text" style="float:left;width:100%;height:100%;text-align:center;" value="" placeholder="Search here..."/>'+      
      '</div>'+    
      '<div style="width:100%;height:'+(box1-50)+'px;padding:5px;border:0px solid red;overflow:auto;">';
        var ddd='';
        for(var i=0;i<newArr.length;i++){
          if(newArr[i].type != ptrType){ continue; }
          
          var subname=JBE_GETFLD('name',DB_AREA,'areano',newArr[i]['areano']);
          ddd+=
          '<div id="d_'+i+'" class="cls_names" onclick="do_copy_items(&quot;'+newArr[i]['trano']+'&quot;)" style="width:100%;height:30px;padding:5px;border:1px solid gray;">'+            
            '<div style="float:left;width:50%;font-size:18px;font-weight:bold;">'+newArr[i]['trano']+'</div>'+
            '<div style="float:left;width:50%;">'+subname+'</div>'+
          '</div>';
        }
        dtl+=ddd+
      '</div>'+    
    '</div>';
  
  var dtl2=
    '<div style="width:100%;height:100%;padding:12px 0 0 0;text-align:center;background:none;">'+
      'Select PTR Number'+    
    '</div>';
  
  JBE_OPENBOX('div_name',tilt,dtl,dtl2); 
  JBE_SEARCH_BOX('filterInput','cls_names');  
}
function do_copy_items(trano){
  document.getElementById('cap_viewMid2').innerHTML='Edit';

  let line_ctr=0;
  let dtl='';
  for(var i=0;i<DB_PTR2.length;i++){
    if(DB_PTR2[i].trano != trano){ continue; }
    
    let v_date=JBE_DATE_FORMAT(DB_PTR2[i].date,'MM-DD-YYYY');    
    let v_descrp=JBE_GETFLD('descrp',DB_STOCK,'stockno',DB_PTR2[i].stockno);
    var v_expiry=JBE_GETFLD2('expiry',DB_RECEIVE2,
      [
        { "fld":"stockno","val":DB_PTR2[i].stockno },
        { "fld":"lotno","val":DB_PTR2[i].lotno }
      ]
    );    
    v_expiry=JBE_DATE_FORMAT(v_expiry,'MM-DD-YYYY');
    
    line_ctr++;    
    
    dtl+=
    '<div id="dtl_'+line_ctr+'" class="dtls" onclick="hl_row('+line_ctr+')" style="width:100%;height:40px;margin-top:0px;border:0px solid red;padding:0px;background:none;">'+        

      '<div class="class_mtr0" style="display:none;float:left;width:19%;height:100%;">'+        
        '<span id="dtl_expiry_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+v_expiry+'</span>'+
        '<span id="dtl_stockno_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+DB_PTR2[i].stockno+'</span>'+
      '</div>'+

      '<div class="class_mtr0" style="float:left;width:15%;height:100%;">'+        
        '<span id="dtl_date_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+v_date+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:21%;height:100%;">'+        
        '<span id="dtl_vax_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;overflow:auto;">'+v_descrp+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:19%;height:100%;">'+        
        '<span id="dtl_lotno_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;overflow:auto;">'+DB_PTR2[i].lotno+'</span>'+
      '</div>'+      
      '<div class="class_mtr0" style="float:left;width:10%;height:100%;">'+        
        '<span id="dtl_qty_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:center;padding:6px 0 0 0;">'+JBE_FORMAT_INT_TO_STR(DB_PTR2[i].qty)+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:16%;height:100%;">'+        
        '<span id="dtl_cost_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:center;padding:6px 0 0 0;">'+DB_PTR2[i].cost+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:19%;height:100%;">'+        
        '<span id="dtl_amount_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:center;padding:6px 0 0 0;">'+JBE_FORMAT_DOUBLE_TO_STR(DB_PTR2[i].amount)+'</span>'+
      '</div>'+

    '</div>';
    
  }

  JBE_CLOSEBOX();

  document.getElementById('ptr_dtl').innerHTML=dtl;   
  
  var len_dtls=document.querySelectorAll('.dtls').length;   
  //alert('do_copy_items '+len_dtls);
  if(len_dtls){ hl_row(1); }
}

function del_ptr(){
  MSG_SHOW(vbYesNo,"CONFIRM: ","Are you sure to Delete this Record?",function(){
    var trano=document.getElementById('trano').value;
    //alert(trano);
    axios.delete('/api/del_ptr', { params: { trano:trano } })
    .then(function (response) {
      //console.log(response.data[0]);        
      //console.log(response.data[1]);      
      DB_PTR=get_db_all('ptr');
      DB_PTR2=get_db_all('ptr2');
      init_ptr();
      snackBar('DELETED...');    
      console.log(response.data);
    })
    .catch(function (error) { console.log(error); });    
  },function(){return;}); 
}

function del_ptr2(trano){  
  axios.delete('/api/del_ptr2', { params: { trano:trano } })
  .then(function (response) {
    console.log(response.data);        
    snackBar('DELETED...');    
  })
  .catch(function (error) { console.log(error); });      
}

function save_ptr(){
  let pmode=document.getElementById('ptr_head').getAttribute('data-mode');
  let ptrType=document.getElementById('ptr_head').getAttribute('data-ptrType');
  let trano=document.getElementById('trano').value;
  let ptrdate=document.getElementById('ptrdate').value;
  let sub_area=document.getElementById('sub_area').innerHTML;
  //let areano=document.getElementById('sub_area').getAttribute('data-areano');
  let areano=JBE_GETFLD('areano',DB_AREA,'name',sub_area);
  var len_dtls=document.querySelectorAll('.dtls').length;   
  
  if(!sub_area){
    snackBar('ERROR: No Sub Area to save.'); return;
  }
  if(!len_dtls){
    snackBar('ERROR: No items to save.'); return;
  }
  
  if(pmode==1){ //add
    axios.post('/api/save_ptr', {headers: { 'Content-Type': 'application/json' }}, { params: { trano:trano,ptrdate:ptrdate,ptrType:ptrType,areano:areano } })
    .then(function (response) {
      DB_PTR=response.data;
      console.log('add_ptr: '+DB_PTR.length);
      save_ptr2(trano,ptrdate,ptrType,areano);
    })
    .catch(function (error) { console.log(error); });
  }else{
    axios.put('/api/upd_ptr', {headers: { 'Content-Type': 'application/json' }}, { params: { trano:trano,ptrdate:ptrdate,ptrType:ptrType,areano:areano } })
    .then(function (response) {
      DB_PTR=response.data;   
      save_ptr2(trano,ptrdate,ptrType,areano);
    })    
    .catch(function (error) { console.log(error); });
  }
}
function save_ptr2(trano,ptrdate,ptrType,areano){
  var len_dtls=document.querySelectorAll('.dtls').length;   
  axios.delete('/api/del_ptr2', { params: { trano:trano } })
  .then(async function (response) {
    console.log(response.data);
    console.log('total len of dtls:'+len_dtls);

    for(var i=1;i<=len_dtls;i++){
      if(document.getElementById('dtl_'+i).style.display=='none'){ continue; }
      let v_date=document.getElementById('dtl_date_'+i).innerHTML;      
      let v_stockno=document.getElementById('dtl_stockno_'+i).innerHTML;
      let v_descrp=document.getElementById('dtl_vax_'+i).innerHTML;
      let v_lotno=document.getElementById('dtl_lotno_'+i).innerHTML;
      let v_qty=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_qty_'+i).innerHTML);
      let v_cost=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_cost_'+i).innerHTML);
      let v_amount=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_amount_'+i).innerHTML);
      
      await axios.post('/api/save_ptr2', {headers: { 'Content-Type': 'application/json' }}, { params: { 
        trano:trano,
        ptrdate:JBE_DATE_FORMAT(ptrdate,'YYYY-MM-DD'),  
        ptrType:ptrType,  
        areano:areano,  
        date:JBE_DATE_FORMAT(v_date,'YYYY-MM-DD'),      
        stockno:v_stockno, 
        descrp:v_descrp, 
        lotno:v_lotno, 
        qty:v_qty, 
        cost:v_cost, 
        amount:v_amount
      }})
      .catch(function (error) { console.log(error); });      
    }      
    
    axios.get('/api/get_all', { params: {tbl:'ptr2'} })
    .then(function (response) { 
      console.log(response.data); 
      DB_PTR2 = response.data; 
      disp_ptr();       
    })    
    .catch(function (error) { console.log(error); });
  })  
  .catch(function (error) { console.log(error); });
}

function add_item_ptr(f_add){ 
  var len_dtls=document.querySelectorAll('.dtls').length;   
  if(len_dtls==0 && !f_add){ 
    snackBar('Cannot Edit empty record');
    return;
  }
  let row=document.getElementById('ptr_dtl').getAttribute('data-row');  
  if(f_add){ row=0; }
  var tilt=iif(f_add,'Add Item','Edit Item');  
  document.getElementById('back_view3').style.display='none';
  document.getElementById('cap_viewMid3').innerHTML='Item';
  var v_row=document.getElementById('ptr_dtl').getAttribute('data-row'); 

  var v_vax='';
  var v_date='';
  var v_lotno='';  
  var v_qty=0;
  var v_expiry='';
  var v_stockno='';
  var v_cost=0;
  var v_amount=0;
  
  if(!f_add){ 
    v_date=document.getElementById('dtl_date_'+v_row).innerHTML;    
    v_vax=document.getElementById('dtl_vax_'+v_row).innerHTML;
    v_lotno=document.getElementById('dtl_lotno_'+v_row).innerHTML;    
    v_qty=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_qty_'+v_row).innerHTML);
    v_expiry=document.getElementById('dtl_expiry_'+v_row).innerHTML;
    v_cost=document.getElementById('dtl_cost_'+v_row).innerHTML;
    v_amount=document.getElementById('dtl_amount_'+v_row).innerHTML;
    v_stockno=document.getElementById('dtl_stockno_'+v_row).innerHTML;    
  }
 
  var dtl=          
    '<div id="div_name" data-zoom=0 style="width:100%;height:100%;font-text:14px;padding:5px;background-color:white;">'+         
      '<div style="width:100%;height:55px;font-size:25px;font-weight:bold;padding:15px 0 0 0;text-align:center;background:'+JBE_CLOR2+';">'+tilt+'</div>'+

      '<div class="class_mtr0" style="display:none;margin-top:5px;">'+        
        '<span class="class_mtr1">Date:</span>'+        
          //'<span id="txt_date" class="class_mtr2" style="width:50%;color:red;">'+v_date+'</span>'+          
          '<span id="txt_stockno" class="class_mtr2" style="width:50%;color:red;">'+v_stockno+'</span>'+          
        '</span>'+
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Vaccine:</span>'+        
          '<span id="txt_vax" data-stockno="" class="class_mtr2" style="width:50%;color:red;overflow:auto;">'+v_vax+'</span>'+
          '<button id="btn_vax" style="float:right;width:40px;height:100%;font-weight:bold;margin-right:3px;border-radius:5px;color:white;background:'+JBE_CLOR+';" onclick="sel_vax('+f_add+')">...</button>'+
        '</span>'+
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:2px;">'+        
        '<span class="class_mtr1">Lot No. :</span>'+        
          '<span id="txt_lotno" class="class_mtr2" style="width:50%;color:red;overflow:auto;">'+v_lotno+'</span>'+
        '</span>'+
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:2px;">'+        
        '<span class="class_mtr1">Expiry Date :</span>'+        
          '<span id="txt_expiry" class="class_mtr2" style="color:red;">'+v_expiry+'</span>'+          
        '</span>'+
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:2px;">'+        
        '<span class="class_mtr1">Cost :</span>'+        
          '<span id="txt_cost" class="class_mtr2" style="color:red;">'+v_cost+'</span>'+          
        '</span>'+
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:2px;">'+        
        '<span class="class_mtr1">Acquired Date :</span>'+        
          '<span id="txt_date" class="class_mtr2" style="color:red;">'+v_date+'</span>'+          
        '</span>'+
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:10px;">'+        
        '<span class="class_mtr1">Quantity:</span>'+        
          '<input id="txt_qty" type="number" onkeyup="chg_qty(this.value)" class="class_mtr2" style="text-align:center;color:red;" value="'+v_qty+'" />'+          
        '</span>'+
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:10px;">'+        
        '<span class="class_mtr1">Amount:</span>'+        
          '<span id="txt_amount" class="class_mtr2" style="color:blue;">'+v_amount+'</span>'+          
        '</span>'+
      '</div>'+ 

    '</div>';
  //JBE_OPENBOX('div_name',tilt,dtl,dtl2); 
  JBE_OPEN_VIEW(dtl,tilt.toUpperCase(),'');  
  mnu_add_item_ptr(f_add);
}



function mnu_add_item_ptr(f_add){
  var jmenu=  
  '<div style="width:100%;height:100%;">'+

    '<div onclick="save_item_ptr('+f_add+')" style="float:left;width:25%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jdown.png" alt="call image" />'+
        '<span>OK</span>'+
      '</div>'+
    '</div>'+
    '<div onclick="JBE_CLOSE_VIEW(); mnu_edit_ptr();" style="float:right;width:25%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jcancel.png"  alt="home image" />'+
        '<span>Cancel</span>'+
      '</div>'+
    '</div>'+
    

  '</div>';
  dispMenu(false,jmenu);
  document.getElementById('btn_trano').disabled=true;
}

function chk_item_exist(stockno,lotno){
  //alert(stockno+' vs '+lotno);
  let ctr=0;
  let len_dtls=document.querySelectorAll('.dtls').length;     
  for(var i=1;i<=len_dtls;i++){
    let d_stockno=document.getElementById('dtl_stockno_'+i).innerHTML;
    let d_lotno=document.getElementById('dtl_lotno_'+i).innerHTML;
    let d_dtl=document.getElementById('dtl_'+i).style.display;

    if(d_stockno==stockno && d_lotno==lotno && d_dtl!='none'){    
      ctr++;
    }
  }
  return ctr;
}

function save_item_ptr(f_add){
  var curRow=document.getElementById('ptr_dtl').getAttribute('data-row');    
  var v_date=document.getElementById('txt_date').innerHTML;
  var v_vax=document.getElementById('txt_vax').innerHTML;
  var v_lotno=document.getElementById('txt_lotno').innerHTML;
  var v_qty=parseInt(document.getElementById('txt_qty').value);
  var v_cost=document.getElementById('txt_cost').innerHTML;
  var v_amount=document.getElementById('txt_amount').innerHTML;

  var v_expiry=document.getElementById('txt_expiry').innerHTML;
  var v_stockno=document.getElementById('txt_stockno').innerHTML;
  if(!v_vax){ snackBar('Please enter an Item.'); return; }
  if(v_qty==0){ snackBar('Please enter Quantity'); return; }
  
  /*
  let ctr_exits=chk_item_exist(v_stockno,v_lotno);
  //alert('ctr_exits '+ctr_exits);  

  if(ctr_exits > 0){ 
    let x=iif(f_add,0,1);
    if(ctr_exits>x){
      snackBar('ERROR: save Item already exist...');
      return;
    }
  }
  */

  if(f_add){         
    curRow=document.querySelectorAll('.dtls').length; 
    
    var line_ctr=curRow+1;
    var dtl=
    '<div id="dtl_'+line_ctr+'" class="dtls" onclick="hl_row('+line_ctr+')" style="width:100%;height:40px;margin-top:0px;border:0px solid red;padding:0px;background:none;">'+        

      '<div class="class_mtr0" style="display:none;float:left;width:19%;height:100%;">'+        
        '<span id="dtl_expiry_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+v_expiry+'</span>'+
        '<span id="dtl_stockno_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+v_stockno+'</span>'+
      '</div>'+

      '<div class="class_mtr0" style="float:left;width:15%;height:100%;">'+        
        '<span id="dtl_date_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;">'+v_date+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:21%;height:100%;">'+        
        '<span id="dtl_vax_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;overflow:auto;">'+v_vax+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:19%;height:100%;">'+        
        '<span id="dtl_lotno_'+line_ctr+'" class="class_mtr1" style="width:100%;padding:0px 0 0 0;overflow:auto;">'+v_lotno+'</span>'+
      '</div>'+
      
      '<div class="class_mtr0" style="float:left;width:10%;height:100%;">'+        
        '<span id="dtl_qty_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:center;padding:6px 0 0 0;">'+v_qty+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:16%;height:100%;">'+        
        '<span id="dtl_cost_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:center;padding:6px 0 0 0;">'+v_cost+'</span>'+
      '</div>'+
      '<div class="class_mtr0" style="float:left;width:19%;height:100%;">'+        
        '<span id="dtl_amount_'+line_ctr+'" class="class_mtr1" style="width:100%;text-align:center;padding:6px 0 0 0;">'+v_amount+'</span>'+
      '</div>'+
    '</div>';
    document.getElementById('ptr_dtl').innerHTML+=dtl;
    hl_row(line_ctr);
  }else{
    document.getElementById('dtl_stockno_'+curRow).innerHTML=v_stockno;
    document.getElementById('dtl_date_'+curRow).innerHTML=v_date;
    document.getElementById('dtl_vax_'+curRow).innerHTML=v_vax;
    document.getElementById('dtl_expiry_'+curRow).innerHTML=v_expiry;
    document.getElementById('dtl_lotno_'+curRow).innerHTML=v_lotno;
    document.getElementById('dtl_qty_'+curRow).innerHTML=v_qty;
    document.getElementById('dtl_cost_'+curRow).innerHTML=v_cost;
    document.getElementById('dtl_amount_'+curRow).innerHTML=v_amount;
  }
  JBE_CLOSE_VIEW();
  mnu_edit_ptr();
  //alert('going to save to row:'+curRow);
}

function del_item_ptr(){
  row=document.getElementById('ptr_dtl').getAttribute('data-row');  
  //alert('row:'+row);
  document.getElementById('dtl_'+row).style.display='none';
  
}
